"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Activity, Hash, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StringConfig {
    name: string;
    note: string;
    frequency: number;
}

const Tuner: React.FC = () => {
    const strings: StringConfig[] = [
        { name: 'High E', note: 'E4', frequency: 329.63 },
        { name: 'B', note: 'B3', frequency: 246.94 },
        { name: 'G', note: 'G3', frequency: 196.00 },
        { name: 'D', note: 'D3', frequency: 146.83 },
        { name: 'A', note: 'A2', frequency: 110.00 },
        { name: 'Low E', note: 'E2', frequency: 82.41 }
    ];

    const [selectedString, setSelectedString] = useState<StringConfig>(strings[0]);
    const [currentFrequency, setCurrentFrequency] = useState<number>(0);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [cents, setCents] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number>();

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
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    };

    const updateTuner = () => {
        if (!analyserRef.current) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        const detect = () => {
            analyserRef.current!.getFloatFrequencyData(dataArray);

            // Basic Peak Detection
            let maxVal = -Infinity;
            let maxIdx = -1;
            for (let i = 0; i < bufferLength; i++) {
                if (dataArray[i] > maxVal) {
                    maxVal = dataArray[i];
                    maxIdx = i;
                }
            }

            const freq = maxIdx * (audioContextRef.current!.sampleRate / analyserRef.current!.fftSize);

            if (maxVal > -100) { // Signal threshold
                setCurrentFrequency(freq);
                const centsDiff = 1200 * Math.log2(freq / selectedString.frequency);
                setCents(Math.max(-50, Math.min(50, centsDiff)));
                setVolume(Math.floor(((maxVal + 100) / 100) * 100));
            }

            animationRef.current = requestAnimationFrame(detect);
        };
        detect();
    };

    const tuningStatus = Math.abs(cents) < 3 ? 'perfect' : Math.abs(cents) < 12 ? 'near' : 'out';

    return (
        <div className="w-full max-w-md mx-auto bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group">
            {/* HUD Header */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Activity className={`w-3 h-3 ${isListening ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">System.Tuning_v1</h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter italic">
                        {isListening ? 'Input: Active_Signal' : 'Input: Standby'}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white tabular-nums tracking-tighter">
                        {currentFrequency > 0 ? currentFrequency.toFixed(1) : '000.0'}
                    </div>
                    <div className="text-[8px] text-zinc-700 uppercase font-mono">Hz_Frequency</div>
                </div>
            </div>

            {/* Tuning Gauge */}
            <div className="relative h-32 bg-black border border-zinc-900 mb-8 flex flex-col items-center justify-center">
                <div className="text-6xl font-black text-white mb-2">{selectedString.note}</div>

                {/* Meter Scale */}
                <div className="absolute inset-x-4 bottom-4 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                        animate={{
                            x: `${cents}%`,
                            backgroundColor: tuningStatus === 'perfect' ? '#10b981' : tuningStatus === 'near' ? '#f59e0b' : '#ef4444'
                        }}
                        className="absolute inset-0 w-1 mx-auto bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    />
                </div>

                {/* Dead Center Notch */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-emerald-500/30" />

                {/* Cents HUD */}
                <div className="absolute top-2 right-2 font-mono text-[10px]">
                    <span className={tuningStatus === 'perfect' ? 'text-emerald-500' : 'text-zinc-700'}>
                        {cents > 0 ? '+' : ''}{cents.toFixed(0)} Cents
                    </span>
                </div>
            </div>

            {/* Volume Input HUD */}
            <div className="mb-8 space-y-2">
                <div className="flex justify-between text-[8px] uppercase font-mono text-zinc-600">
                    <span>Signal_Strength</span>
                    <span>{volume}%</span>
                </div>
                <div className="h-0.5 w-full bg-zinc-900">
                    <motion.div
                        animate={{ width: `${Math.min(volume, 100)}%` }}
                        className="h-full bg-zinc-700"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                    onClick={isListening ? stopListening : startListening}
                    className={`flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${isListening ? 'bg-red-950/20 text-red-500 border border-red-900/30' : 'bg-white text-black hover:bg-emerald-500'
                        }`}
                >
                    {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    {isListening ? 'Terminate' : 'Initialize'}
                </button>
                <button className="flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] bg-zinc-900 text-zinc-400 hover:text-white transition-all border border-zinc-800">
                    <Volume2 size={14} /> Ref_Tone
                </button>
            </div>

            {/* String Grid */}
            <div className="grid grid-cols-3 gap-2">
                {strings.map((s) => (
                    <button
                        key={s.name}
                        onClick={() => setSelectedString(s)}
                        className={`p-3 border transition-all text-left space-y-1 ${selectedString.name === s.name
                                ? 'border-emerald-500/50 bg-emerald-500/[0.03]'
                                : 'border-zinc-900 bg-black hover:border-zinc-700'
                            }`}
                    >
                        <div className={`text-[10px] font-black ${selectedString.name === s.name ? 'text-emerald-500' : 'text-white'}`}>
                            {s.note}
                        </div>
                        <div className="text-[8px] text-zinc-600 uppercase font-mono tracking-tighter">
                            {s.frequency}Hz
                        </div>
                    </button>
                ))}
            </div>

            {/* System Footnote */}
            <div className="mt-8 pt-4 border-t border-zinc-900/50 flex justify-between items-center opacity-30">
                <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Proc: WebAudio_Pitch</span>
                <Zap size={10} />
            </div>
        </div>
    );
};

export default Tuner;