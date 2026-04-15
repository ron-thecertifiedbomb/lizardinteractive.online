"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StringConfig {
    name: string;
    note: string;
    frequency: number;
}

const strings: StringConfig[] = [
    { name: 'High E', note: 'E4', frequency: 329.63 },
    { name: 'B', note: 'B3', frequency: 246.94 },
    { name: 'G', note: 'G3', frequency: 196.00 },
    { name: 'D', note: 'D3', frequency: 146.83 },
    { name: 'A', note: 'A2', frequency: 110.00 },
    { name: 'Low E', note: 'E2', frequency: 82.41 }
];

const Tuner: React.FC = () => {
    const [selectedString, setSelectedString] = useState<StringConfig>(strings[0]);
    const [currentFrequency, setCurrentFrequency] = useState<number>(0);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [cents, setCents] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationRef = useRef<number>();

    // CLEANUP: Kill mic and animation on unmount
    useEffect(() => {
        return () => {
            stopListening();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const ensureAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const startListening = async () => {
        try {
            ensureAudioContext();
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
            });
            streamRef.current = stream;

            const ctx = audioContextRef.current!;
            analyserRef.current = ctx.createAnalyser();
            const source = ctx.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;

            setIsListening(true);
            updateTuner();
        } catch (error) {
            console.error('Mic Access Denied', error);
        }
    };

    const stopListening = () => {
        setIsListening(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCurrentFrequency(0);
        setCents(0);
    };

    // PITCH DETECTION: Autocorrelation Algorithm
    const autoCorrelate = (buffer: Float32Array, sampleRate: number) => {
        let size = buffer.length;
        let rms = 0;
        for (let i = 0; i < size; i++) rms += buffer[i] * buffer[i];
        rms = Math.sqrt(rms / size);

        if (rms < 0.01) return -1; // Ignore background noise

        let r1 = 0, r2 = size - 1, threshold = 0.2;
        for (let i = 0; i < size / 2; i++) if (Math.abs(buffer[i]) < threshold) { r1 = i; break; }
        for (let i = 1; i < size / 2; i++) if (Math.abs(buffer[size - i]) < threshold) { r2 = size - i; break; }

        const buf = buffer.slice(r1, r2);
        const bufSize = buf.length;
        const correlations = new Float32Array(bufSize);

        for (let i = 0; i < bufSize; i++) {
            for (let j = 0; j < bufSize - i; j++) {
                correlations[i] = correlations[i] + buf[j] * buf[j + i];
            }
        }

        let d = 0;
        while (correlations[d] > correlations[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < bufSize; i++) {
            if (correlations[i] > maxval) {
                maxval = correlations[i];
                maxpos = i;
            }
        }

        let T0 = maxpos;
        return sampleRate / T0;
    };

    const updateTuner = () => {
        if (!analyserRef.current) return;
        const dataArray = new Float32Array(analyserRef.current.fftSize);

        const detect = () => {
            if (!isListening) return;
            analyserRef.current!.getFloatTimeDomainData(dataArray);
            const freq = autoCorrelate(dataArray, audioContextRef.current!.sampleRate);

            if (freq !== -1 && isFinite(freq)) {
                setCurrentFrequency(freq);
                const centsDiff = 1200 * Math.log2(freq / selectedString.frequency);

                // Exponential Smoothing for the UI needle
                setCents(prev => (prev * 0.8) + (centsDiff * 0.2));

                // Signal Volume calculation
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) sum += dataArray[i] * dataArray[i];
                setVolume(Math.floor(Math.sqrt(sum / dataArray.length) * 500));
            }

            animationRef.current = requestAnimationFrame(detect);
        };
        detect();
    };

    const tuningStatus = Math.abs(cents) < 2.5 ? 'perfect' : Math.abs(cents) < 10 ? 'near' : 'out';

    return (
        <div className="w-full max-w-md mx-auto bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group">
            {/* HUD Header */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Activity className={`w-3 h-3 ${isListening ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">System.Tuning_v1</h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter">
                        {isListening ? 'Input: Active_Signal' : 'Input: Standby'}
                    </p>
                </div>
                <div className="text-right font-mono">
                    <div className="text-2xl font-black text-white tabular-nums tracking-tighter">
                        {currentFrequency > 0 ? currentFrequency.toFixed(1) : '000.0'}
                    </div>
                    <div className="text-[8px] text-zinc-700 uppercase">Hz_Frequency</div>
                </div>
            </div>

            {/* Tuning Gauge */}
            <div className="relative h-36 bg-black border border-zinc-900 mb-8 flex flex-col items-center justify-center">
                <motion.div
                    animate={{ color: tuningStatus === 'perfect' ? '#10b981' : '#ffffff' }}
                    className="text-7xl font-black mb-2"
                >
                    {selectedString.note}
                </motion.div>

                {/* Meter Scale */}
                <div className="absolute inset-x-8 bottom-6 h-[2px] bg-zinc-900 rounded-full">
                    <motion.div
                        initial={false}
                        animate={{
                            left: `${50 + (cents)}%`,
                            backgroundColor: tuningStatus === 'perfect' ? '#10b981' : tuningStatus === 'near' ? '#f59e0b' : '#ef4444'
                        }}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-6 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                </div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-emerald-500/20" />
                <div className="absolute top-2 right-4 font-mono text-[9px]">
                    <span className={tuningStatus === 'perfect' ? 'text-emerald-500' : 'text-zinc-800'}>
                        {cents > 0 ? '+' : ''}{cents.toFixed(0)} Cts
                    </span>
                </div>
            </div>

            {/* Signal Strength */}
            <div className="mb-10 space-y-2">
                <div className="flex justify-between text-[8px] uppercase font-mono text-zinc-700">
                    <span>Input_Gain</span>
                    <span>{Math.min(volume, 100)}%</span>
                </div>
                <div className="h-0.5 w-full bg-zinc-950">
                    <motion.div
                        animate={{ width: `${Math.min(volume, 100)}%` }}
                        className="h-full bg-emerald-500/50"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 mb-8">
                <button
                    onClick={isListening ? stopListening : startListening}
                    className={`flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${isListening
                            ? 'bg-red-950/10 text-red-500 border-red-900/40'
                            : 'bg-white text-black hover:bg-emerald-500 border-white'
                        }`}
                >
                    {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    {isListening ? 'Terminate' : 'Initialize'}
                </button>
                <button className="flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] bg-[#0c0c0c] text-zinc-600 border border-zinc-900 cursor-not-allowed">
                    <Volume2 size={14} /> Audio_Ref
                </button>
            </div>

            {/* String Selector */}
            <div className="grid grid-cols-3 gap-2">
                {strings.map((s) => (
                    <button
                        key={s.name}
                        onClick={() => {
                            setSelectedString(s);
                            setCents(0);
                        }}
                        className={`p-3 border transition-all text-left ${selectedString.name === s.name
                                ? 'border-emerald-500/50 bg-emerald-500/[0.04]'
                                : 'border-zinc-900 bg-black hover:border-zinc-800'
                            }`}
                    >
                        <div className={`text-[11px] font-black ${selectedString.name === s.name ? 'text-emerald-500' : 'text-zinc-400'}`}>
                            {s.note}
                        </div>
                        <div className="text-[8px] text-zinc-700 font-mono tracking-tighter">
                            {s.frequency.toFixed(2)}Hz
                        </div>
                    </button>
                ))}
            </div>

            {/* Footer Diagnostic */}
            <div className="mt-8 pt-4 border-t border-zinc-900/50 flex justify-between items-center opacity-40">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Proc: ACF_Time_Domain</span>
                <Zap size={10} className="text-emerald-500" />
            </div>
        </div>
    );
};

export default Tuner;