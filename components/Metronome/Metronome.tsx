"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Square, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function MetronomeProcessor() {
    const [bpm, setBpmState] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioContext = useRef<AudioContext | null>(null);
    const nextNoteTime = useRef(0.0);
    const timerID = useRef<number | null>(null);
    const bpmRef = useRef(100);

    // Beat tracking for 4/4
    const currentBeat = useRef(0);

    const updateBpm = (val: number) => {
        const cappedVal = val > 300 ? 300 : val;
        setBpmState(cappedVal);
        if (cappedVal >= 10) {
            bpmRef.current = cappedVal;
        }
    };

    const scheduleNote = (time: number, beatIndex: number) => {
        if (!audioContext.current) return;

        const osc = audioContext.current.createOscillator();
        const envelope = audioContext.current.createGain();

        // ACCENT LOGIC: Beat 0 of the measure is higher (1600Hz), others are 1200Hz
        const isAccent = beatIndex === 0;
        osc.frequency.setValueAtTime(isAccent ? 1600 : 1200, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);

        envelope.gain.setValueAtTime(isAccent ? 1.8 : 1.4, time);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(envelope);
        envelope.connect(audioContext.current.destination);

        osc.start(time);
        osc.stop(time + 0.05);
    };

    const scheduler = () => {
        const lookahead = 25.0;
        const scheduleAheadTime = 0.1;

        while (nextNoteTime.current < audioContext.current!.currentTime + scheduleAheadTime) {
            // Pass the current beat to the scheduler
            scheduleNote(nextNoteTime.current, currentBeat.current);

            const secondsPerBeat = 60.0 / (bpmRef.current || 100);
            nextNoteTime.current += secondsPerBeat;

            // Increment beat and reset every 4 beats (4/4 time)
            currentBeat.current = (currentBeat.current + 1) % 4;
        }
        timerID.current = window.setTimeout(scheduler, lookahead);
    };

    const toggleMetronome = () => {
        if (!audioContext.current) {
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        if (!isPlaying) {
            setIsPlaying(true);
            currentBeat.current = 0; // Always start on the "1"
            nextNoteTime.current = audioContext.current.currentTime + 0.05;
            scheduler();
        } else {
            setIsPlaying(false);
            if (timerID.current) clearTimeout(timerID.current);
        }
    };

    useEffect(() => {
        return () => { if (timerID.current) clearTimeout(timerID.current); };
    }, []);

    return (
        <div className="w-full flex justify-center items-center py-10 selection:bg-emerald-500 selection:text-black font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-zinc-800'}`} />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                                Metronome
                            </h2>
                        </div>
                    </div>
                    <Activity className={`w-4 h-4 ${isPlaying ? 'text-emerald-500' : 'text-zinc-800'} transition-colors`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-emerald-500/5 blur-xl transition-all rounded-full" />
                            <div className="relative flex flex-col items-center justify-center border border-zinc-900 bg-black/50 py-10 rounded-sm shadow-inner">
                               
                                <div className="flex items-baseline justify-center gap-2">
                                    <input
                                        type="number"
                                        value={bpm || ""}
                                        onChange={(e) => updateBpm(parseInt(e.target.value))}
                                        className="bg-transparent text-7xl font-black text-white tracking-tighter w-[160px] text-center outline-none focus:text-emerald-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="0"
                                    />
                                    <span className="text-xs text-emerald-500 font-mono tracking-normal italic uppercase">BPM</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 font-mono">
                                <span>LOCKED_4/4</span>
                                <span>MAX_300</span>
                            </div>
                            <input
                                type="range"
                                min="40"
                                max="300"
                                value={bpm || 100}
                                onChange={(e) => updateBpm(parseInt(e.target.value))}
                                className="w-full h-1 bg-zinc-900 appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={toggleMetronome}
                            className={`group relative flex items-center justify-center gap-3 w-full py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all border ${isPlaying
                                ? 'bg-red-500/10 border-red-500/50 text-red-500'
                                : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
                                } hover:scale-[1.02] active:scale-95`}
                        >
                            {isPlaying ? (
                                <><Square className="w-4 h-4 fill-current" /> Stop</>
                            ) : (
                                <><Play className="w-4 h-4 fill-current" /> Start</>
                            )}
                            <div className={`absolute inset-0 opacity-10 blur-lg ${isPlaying ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        </button>
            
                    </div>
                </div>

                <div className="mt-12 flex justify-between items-center opacity-30">
                    <div className="text-[8px] font-mono text-zinc-500 tracking-[0.2em]">LIZARD INTERACTIVE ONLINE // {new Date().getFullYear()}</div>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-1 h-1 rounded-full ${isPlaying ? 'bg-emerald-500 animate-bounce shadow-[0_0_5px_#10b981]' : 'bg-zinc-800'}`} style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}