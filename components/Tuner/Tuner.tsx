'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// High-fidelity pitch to note mapping
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function PolytuneTuner() {
    const [note, setNote] = useState('--');
    const [cents, setCents] = useState(0);
    const [isDetected, setIsDetected] = useState(false);
    const [active, setActive] = useState(false);

    const audioCtx = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startTuning = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyser.current = audioCtx.current.createAnalyser();
            analyser.current.fftSize = 2048;
            
            const source = audioCtx.current.createMediaElementSource(new Audio()); // Placeholder
            const input = audioCtx.current.createMediaStreamSource(stream);
            input.connect(analyser.current);
            
            setActive(true);
            updatePitch();
        } catch (err) {
            alert("MIC_ACCESS_DENIED");
        }
    };

    const updatePitch = () => {
        if (!analyser.current) return;
        const buffer = new Float32Array(analyser.current.fftSize);
        analyser.current.getFloatTimeDomainData(buffer);

        // Autocorrelation algorithm (YIN-lite) for surgical precision
        const pitch = autoCorrelate(buffer, audioCtx.current!.sampleRate);

        if (pitch !== -1) {
            const { noteName, centsOff } = getNoteFromFrequency(pitch);
            setNote(noteName);
            setCents(centsOff);
            setIsDetected(true);
        } else {
            setIsDetected(false);
        }

        requestAnimationFrame(updatePitch);
    };

    const autoCorrelate = (buffer: Float32Array, sampleRate: number) => {
        // Basic Root Mean Square to filter out background noise
        let rms = 0;
        for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
        if (Math.sqrt(rms / buffer.length) < 0.01) return -1; // Too quiet

        let r1 = 0, r2 = buffer.length - 1, thres = 0.2;
        for (let i = 0; i < buffer.length / 2; i++) {
            if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
        }
        for (let i = 1; i < buffer.length / 2; i++) {
            if (Math.abs(buffer[buffer.length - i]) < thres) { r2 = buffer.length - i; break; }
        }

        const trimmedBuffer = buffer.slice(r1, r2);
        const c = new Float32Array(trimmedBuffer.length).fill(0);
        for (let i = 0; i < trimmedBuffer.length; i++) {
            for (let j = 0; j < trimmedBuffer.length - i; j++) {
                c[i] = c[i] + trimmedBuffer[j] * trimmedBuffer[j + i];
            }
        }

        let d = 0; while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < trimmedBuffer.length; i++) {
            if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
        }
        return sampleRate / maxpos;
    };

    const getNoteFromFrequency = (freq: number) => {
        const h = Math.round(12 * Math.log2(freq / 440)) + 69;
        const noteName = NOTES[h % 12];
        const centsOff = Math.floor(1200 * Math.log2(freq / (440 * Math.pow(2, (h - 69) / 12))));
        return { noteName, centsOff };
    };

    const segments = Array.from({ length: 21 });

    return (
        <div className="w-full max-w-sm mx-auto bg-[#080808] p-8 border border-zinc-900 shadow-2xl relative overflow-hidden group font-sans">
            {!active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <button onClick={startTuning} className="bg-emerald-500 text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                        Initialize_Mic
                    </button>
                </div>
            )}

            <div className="flex justify-between items-start mb-12 opacity-40">
                <div className="space-y-1">
                    <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest block">// Signal_Processor</span>
                    <span className="text-[7px] text-zinc-500 font-mono uppercase italic">Autocorrelation_V4</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">UniTune_Logic</span>
                </div>
            </div>

            <div className="relative flex flex-col items-center min-h-[160px] justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={note}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-9xl font-black tabular-nums transition-colors duration-300 ${
                            isDetected && Math.abs(cents) < 3 ? 'text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'text-white'
                        }`}
                    >
                        {isDetected ? note : '--'}
                    </motion.div>
                </AnimatePresence>

                <div className="w-full mt-10 flex items-end justify-center gap-1.5 h-12">
                    {segments.map((_, i) => {
                        const offset = i - 10;
                        const isActive = isDetected && Math.round(cents / 5) === offset;
                        const isInTuneZone = Math.abs(offset) <= 1;

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    height: isActive ? (isInTuneZone ? 40 : 25) : 12,
                                    backgroundColor: isActive
                                        ? (isInTuneZone ? '#10b981' : '#f59e0b')
                                        : '#18181b',
                                    boxShadow: isActive
                                        ? `0 0 15px ${isInTuneZone ? '#10b981' : '#f59e0b'}44`
                                        : 'none'
                                }}
                                className="w-1.5 rounded-full transition-colors"
                            />
                        );
                    })}
                </div>

                <div className="mt-4 w-full flex justify-between px-2">
                    <span className="text-[8px] font-mono text-zinc-700 uppercase">Flat</span>
                    <div className={`text-[10px] font-black font-mono transition-colors ${isDetected && Math.abs(cents) < 3 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                        {isDetected ? (cents > 0 ? `+${cents}` : cents) : '0.0'}
                    </div>
                    <span className="text-[8px] font-mono text-zinc-700 uppercase">Sharp</span>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-zinc-900/50 flex justify-between items-center">
                <div className="flex gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${isDetected ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-zinc-800'}`} />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[7px] text-zinc-800 uppercase font-mono">Lizard_Interactive_Hardware_Serial: UT-409</span>
            </div>
        </div>
    );
}