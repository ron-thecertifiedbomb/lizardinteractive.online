'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Standard tuning notes for guitar
const STANDARD_TUNING = [
    { string: '6', note: 'E', octave: 2, frequency: 82.41, displayNote: 'E2' },
    { string: '5', note: 'A', octave: 2, frequency: 110.00, displayNote: 'A2' },
    { string: '4', note: 'D', octave: 3, frequency: 146.83, displayNote: 'D3' },
    { string: '3', note: 'G', octave: 3, frequency: 196.00, displayNote: 'G3' },
    { string: '2', note: 'B', octave: 3, frequency: 246.94, displayNote: 'B3' },
    { string: '1', note: 'E', octave: 4, frequency: 329.63, displayNote: 'E4' }
];

// YIN Pitch Detection Algorithm
class YINPitchDetector {
    private threshold: number = 0.1;

    detect(buffer: Float32Array, sampleRate: number): number {
        if (buffer.length < 2048) return -1;

        const windowedBuffer = new Float32Array(buffer.length);
        let maxVal = 0;
        for (let i = 0; i < buffer.length; i++) {
            maxVal = Math.max(maxVal, Math.abs(buffer[i]));
        }
        if (maxVal < 0.005) return -1;

        const hannWindow = (i: number, N: number) => 0.5 * (1 - Math.cos(2 * Math.PI * i / (N - 1)));
        for (let i = 0; i < buffer.length; i++) {
            windowedBuffer[i] = (buffer[i] / maxVal) * hannWindow(i, buffer.length);
        }

        const diff = new Float32Array(buffer.length / 2);
        let runningSum = 0;

        for (let tau = 0; tau < diff.length; tau++) {
            let sum = 0;
            for (let i = 0; i < buffer.length - tau; i++) {
                const delta = windowedBuffer[i] - windowedBuffer[i + tau];
                sum += delta * delta;
            }
            diff[tau] = sum;
            if (tau > 0) {
                runningSum += diff[tau];
                const cmndf = diff[tau] * tau / runningSum;
                if (cmndf < this.threshold && tau > 15) {
                    return this.parabolicInterpolation(diff, tau, sampleRate);
                }
            }
        }

        return this.autocorrelationMethod(windowedBuffer, sampleRate);
    }

    private parabolicInterpolation(diff: Float32Array, tau: number, sampleRate: number): number {
        if (tau < 1 || tau >= diff.length - 1) return sampleRate / tau;

        const s0 = diff[tau - 1];
        const s1 = diff[tau];
        const s2 = diff[tau + 1];

        const correction = (s2 - s0) / (2 * (2 * s1 - s2 - s0));
        const exactTau = tau + correction;

        return sampleRate / exactTau;
    }

    private autocorrelationMethod(buffer: Float32Array, sampleRate: number): number {
        const autoCorr = new Float32Array(buffer.length / 2);

        for (let lag = 0; lag < autoCorr.length; lag++) {
            let sum = 0;
            for (let i = 0; i < buffer.length - lag; i++) {
                sum += buffer[i] * buffer[i + lag];
            }
            autoCorr[lag] = sum / (buffer.length - lag);
        }

        let maxVal = -1;
        let maxPos = -1;
        let startLag = Math.floor(sampleRate / 2000);

        for (let lag = startLag; lag < autoCorr.length - 1; lag++) {
            if (autoCorr[lag] > maxVal && autoCorr[lag] > autoCorr[lag - 1] && autoCorr[lag] > autoCorr[lag + 1]) {
                maxVal = autoCorr[lag];
                maxPos = lag;
            }
        }

        if (maxPos === -1) return -1;
        return sampleRate / maxPos;
    }
}

export default function PolytuneTuner() {
    const [targetNote, setTargetNote] = useState('E2');
    const [cents, setCents] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [isDetected, setIsDetected] = useState(false);
    const [active, setActive] = useState(false);
    const [volume, setVolume] = useState(0);
    const [detectedString, setDetectedString] = useState<number>(-1);
    const [smoothCents, setSmoothCents] = useState(0);

    const audioCtx = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const pitchDetector = useRef(new YINPitchDetector());
    const pitchHistory = useRef<number[]>([]);
    const centsHistory = useRef<number[]>([]);
    const smoothWindow = 3;
    const centsSmoothWindow = 5;

    const startTuning = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });
            streamRef.current = stream;

            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser.current = audioCtx.current.createAnalyser();
            analyser.current.fftSize = 4096;

            const source = audioCtx.current.createMediaStreamSource(stream);
            source.connect(analyser.current);

            await audioCtx.current.resume();
            setActive(true);
            updatePitch();
        } catch (err) {
            console.error("Microphone access error:", err);
            alert("Unable to access microphone. Please check permissions.");
        }
    };

    const stopTuning = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioCtx.current) {
            audioCtx.current.close();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setActive(false);
        setIsDetected(false);
        setDetectedString(-1);
        pitchHistory.current = [];
        centsHistory.current = [];
    };

    const findClosestStandardNote = (freq: number) => {
        let closestIndex = 0;
        let minDiff = Infinity;

        for (let i = 0; i < STANDARD_TUNING.length; i++) {
            const diff = Math.abs(Math.log2(freq / STANDARD_TUNING[i].frequency));
            if (diff < minDiff) {
                minDiff = diff;
                closestIndex = i;
            }
        }

        return closestIndex;
    };

    const getCentsFromFrequency = (freq: number, targetFreq: number): number => {
        return 1200 * Math.log2(freq / targetFreq);
    };

    const updatePitch = () => {
        if (!analyser.current || !audioCtx.current) {
            animationRef.current = requestAnimationFrame(updatePitch);
            return;
        }

        const buffer = new Float32Array(analyser.current.fftSize);
        analyser.current.getFloatTimeDomainData(buffer);

        let rms = 0;
        for (let i = 0; i < buffer.length; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / buffer.length);
        setVolume(rms);

        let detectedPitch = -1;

        if (rms > 0.008) {
            detectedPitch = pitchDetector.current.detect(buffer, audioCtx.current.sampleRate);
        }

        if (detectedPitch > 0 && detectedPitch < 2500) {
            pitchHistory.current.push(detectedPitch);
            if (pitchHistory.current.length > smoothWindow) {
                pitchHistory.current.shift();
            }

            const sortedPitches = [...pitchHistory.current].sort((a, b) => a - b);
            const smoothedPitch = sortedPitches[Math.floor(sortedPitches.length / 2)];

            setFrequency(smoothedPitch);

            const closestIndex = findClosestStandardNote(smoothedPitch);
            const targetFreq = STANDARD_TUNING[closestIndex].frequency;
            let rawCents = getCentsFromFrequency(smoothedPitch, targetFreq);

            // Constrain to reasonable range
            rawCents = Math.min(Math.max(rawCents, -50), 50);

            // Smooth the cents value for stable meter display
            centsHistory.current.push(rawCents);
            if (centsHistory.current.length > centsSmoothWindow) {
                centsHistory.current.shift();
            }

            // Weighted moving average - more weight to recent values
            let weightedSum = 0;
            let weightSum = 0;
            for (let i = 0; i < centsHistory.current.length; i++) {
                const weight = i + 1;
                weightedSum += centsHistory.current[i] * weight;
                weightSum += weight;
            }
            const smoothedCentsValue = weightedSum / weightSum;

            setSmoothCents(smoothedCentsValue);
            const displayCents = Math.round(smoothedCentsValue);
            setCents(displayCents);
            setTargetNote(STANDARD_TUNING[closestIndex].displayNote);
            setDetectedString(closestIndex);
            setIsDetected(true);
        } else {
            setIsDetected(false);
            setDetectedString(-1);
            centsHistory.current = [];
        }

        animationRef.current = requestAnimationFrame(updatePitch);
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioCtx.current) {
                audioCtx.current.close();
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Create 61 segments for finer granularity (0.5 cent per segment)
    const segments = Array.from({ length: 61 });

    return (
        <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-6 border border-zinc-800 shadow-2xl relative overflow-hidden group font-sans rounded-2xl">
            {!active && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/90 backdrop-blur-md rounded-2xl">
                    <button
                        onClick={startTuning}
                        className="bg-emerald-500 text-black px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-emerald-400 transition-all rounded-full shadow-lg"
                    >
                        Start Tuning
                    </button>
                    <p className="text-[10px] text-zinc-500 font-mono">Standard Tuning • E A D G B E</p>
                </div>
            )}

            {/* Header - Fixed height */}
            <div className="h-16 mb-2 text-center">
                <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider">Standard Tuning</span>
                <div className="flex justify-center gap-3 mt-2 text-[11px] font-mono text-zinc-600">
                    <span>E2</span>
                    <span>A2</span>
                    <span>D3</span>
                    <span>G3</span>
                    <span>B3</span>
                    <span>E4</span>
                </div>
            </div>

            {/* Main Display - Fixed size container, no layout shift */}
            <div className="relative flex flex-col items-center justify-center bg-black/30 rounded-2xl p-4 min-h-[280px]">
                {/* Fixed height container for note display */}
                <div className="h-32 flex items-center justify-center">
                    <div className="text-8xl font-black tabular-nums">
                        {isDetected ? (
                            <motion.span
                                key={targetNote}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`transition-colors duration-150 ${Math.abs(cents) < 3 ? 'text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]' :
                                        Math.abs(cents) < 10 ? 'text-yellow-500' : 'text-white'
                                    }`}
                            >
                                {targetNote}
                            </motion.span>
                        ) : (
                            <span className="text-white/30">--</span>
                        )}
                    </div>
                </div>

                {/* Frequency and string info - Fixed height */}
                <div className="h-12 text-center">
                    {isDetected && (
                        <div>
                            <div className="text-[11px] text-zinc-500 font-mono">
                                {frequency.toFixed(1)} Hz
                            </div>
                            {detectedString >= 0 && (
                                <div className="text-[9px] text-zinc-600 font-mono mt-1">
                                    String {STANDARD_TUNING[detectedString].string}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Tuning Meter - More segments for better sensitivity */}
                <div className="w-full mt-4 flex items-end justify-center gap-[2px] h-20">
                    {segments.map((_, i) => {
                        // Map segment index to cents value (-30 to +30 cents range)
                        const segmentCents = (i - 30) * 1; // Each segment = 1 cent
                        const isActive = isDetected && Math.abs(smoothCents - segmentCents) < 0.8;
                        const distanceFromCenter = Math.abs(segmentCents);
                        const isInTuneZone = Math.abs(segmentCents) <= 3;

                        // Calculate height based on distance from center (center is tallest)
                        let height = 12;
                        if (isActive) {
                            height = 56;
                        } else if (distanceFromCenter < 5) {
                            height = 20;
                        } else if (distanceFromCenter < 15) {
                            height = 14;
                        } else {
                            height = 8;
                        }

                        // Color based on position and tuning status
                        let color = '#1f1f1f';
                        if (isActive) {
                            if (isInTuneZone) {
                                color = '#10b981'; // Green - in tune
                            } else if (Math.abs(segmentCents) <= 10) {
                                color = '#f59e0b'; // Yellow - close
                            } else {
                                color = '#ef4444'; // Red - far
                            }
                        } else if (distanceFromCenter < 3) {
                            color = '#2a2a2a'; // Slightly visible center
                        }

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    height: height,
                                    backgroundColor: color,
                                    opacity: isActive ? 1 : (distanceFromCenter < 3 ? 0.3 : 0.15)
                                }}
                                transition={{ duration: 0.03, ease: "linear" }}
                                className="w-1 rounded-full"
                            />
                        );
                    })}
                </div>

                {/* Cents indicator - Fixed height with more precise display */}
                <div className="mt-3 w-full h-8 flex justify-between px-3 items-center">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wide">Flat (-)</span>
                    <div className={`text-sm font-black font-mono transition-colors ${isDetected && Math.abs(cents) < 3 ? 'text-emerald-500' :
                            isDetected && Math.abs(cents) < 10 ? 'text-yellow-500' : 'text-zinc-500'
                        }`}>
                        {isDetected ? (
                            <>
                                {cents > 0 ? `+${cents}` : `${cents}`}¢
                                {Math.abs(cents) < 0.5 && <span className="ml-2 text-emerald-500">✓ IN TUNE</span>}
                            </>
                        ) : '0¢'}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wide">Sharp (+)</span>
                </div>

                {/* Volume meter - Shows input sensitivity */}
                <div className="mt-4 w-full h-6 flex items-center">
                    {active && (
                        <div className="w-full">
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                    animate={{ width: `${Math.min(volume * 100, 100)}%` }}
                                    transition={{ duration: 0.05 }}
                                />
                            </div>
                            <div className="text-[7px] text-zinc-700 text-center mt-1 font-mono">
                                Input Level
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* String indicators - Fixed height */}
            <div className="mt-6 pt-4 border-t border-zinc-800 h-20">
                <div className="flex justify-between gap-1">
                    {STANDARD_TUNING.map((string, idx) => (
                        <div key={idx} className="flex-1 text-center">
                            <div className={`text-[9px] font-mono transition-all ${detectedString === idx ? 'text-emerald-500' : 'text-zinc-700'
                                }`}>
                                String {string.string}
                            </div>
                            <div className={`text-[11px] font-bold transition-all ${detectedString === idx ? 'text-emerald-500' : 'text-zinc-700'
                                }`}>
                                {string.displayNote}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status indicator - Fixed height */}
            <div className="mt-2 h-8 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${isDetected && Math.abs(cents) < 3 ? 'bg-emerald-500 animate-pulse' : isDetected ? 'bg-yellow-500' : 'bg-zinc-800'}`} />
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${active ? 'bg-emerald-500/50' : 'bg-zinc-800'}`} />
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${active && volume > 0.015 ? 'bg-emerald-500/30' : 'bg-zinc-800'}`} />
                </div>
                <span className="text-[8px] text-zinc-700 uppercase font-mono tracking-wider">
                    {active ? (isDetected ? '▶ SIGNAL DETECTED' : '● AWAITING INPUT') : '○ READY'}
                </span>
                {active && (
                    <button
                        onClick={stopTuning}
                        className="text-[8px] text-red-500/50 hover:text-red-500 uppercase font-mono tracking-wider transition-colors"
                    >
                        Stop
                    </button>
                )}
            </div>
        </div>
    );
}