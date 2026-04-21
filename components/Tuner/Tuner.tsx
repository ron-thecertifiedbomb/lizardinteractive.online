'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PolytuneTuner() {
    const [note, setNote] = useState('--');
    const [cents, setCents] = useState(0);
    const [isDetected, setIsDetected] = useState(false);

    // Simulated tuning data (Replace with your actual FFT logic)
    useEffect(() => {
        const interval = setInterval(() => {
            setIsDetected(true);
            setNote('A');
            // Simulated jitter for the "strobe" effect
            setCents((Math.sin(Date.now() / 500) * 15));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Calculate LED segment positions (mimicking the 108-LED matrix)
    const segments = Array.from({ length: 21 }); // Central focus + 10 each side

    return (
        <div className="w-full max-w-sm mx-auto bg-[#080808] p-8 border border-zinc-900 shadow-2xl relative overflow-hidden group font-sans">

            {/* HUD Metadata */}
            <div className="flex justify-between items-start mb-12 opacity-40">
                <div className="space-y-1">
                    <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest block">// Signal_Processor</span>
                    <span className="text-[7px] text-zinc-500 font-mono uppercase italic">Ref: 440Hz / Strobe_V3</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">UniTune_Logic</span>
                </div>
            </div>

            {/* Main Tuning Display */}
            <div className="relative flex flex-col items-center">

                {/* BIG NOTE - The TC Electronic Signature */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={note}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-9xl font-black tabular-nums transition-colors duration-300 ${Math.abs(cents) < 2 ? 'text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]' : 'text-white'
                            }`}
                    >
                        {note}
                    </motion.div>
                </AnimatePresence>

                {/* LED Matrix Strobe */}
                <div className="w-full mt-10 flex items-end justify-center gap-1.5 h-12">
                    {segments.map((_, i) => {
                        const offset = i - 10; // -10 to +10
                        const isActive = Math.round(cents / 5) === offset;
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

                {/* Accuracy Gauge */}
                <div className="mt-4 w-full flex justify-between px-2">
                    <span className="text-[8px] font-mono text-zinc-700 uppercase">Flat</span>
                    <div className={`text-[10px] font-black font-mono transition-colors ${Math.abs(cents) < 2 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                        {cents > 0 ? `+${cents.toFixed(1)}` : cents.toFixed(1)}
                    </div>
                    <span className="text-[8px] font-mono text-zinc-700 uppercase">Sharp</span>
                </div>
            </div>

            {/* Decorative "Pedal" Hardware Details */}
            <div className="mt-12 pt-6 border-t border-zinc-900/50 flex justify-between items-center">
                <div className="flex gap-1">
                    <div className={`w-1 h-1 rounded-full ${isDetected ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-zinc-800'}`} />
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[7px] text-zinc-800 uppercase font-mono">Lizard_Interactive_Hardware_Serial: UT-409</span>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <div className="border-t border-r border-white w-4 h-4" />
            </div>
            <div className="absolute bottom-0 left-0 p-2 opacity-10">
                <div className="border-b border-l border-white w-4 h-4" />
            </div>
        </div>
    );
}