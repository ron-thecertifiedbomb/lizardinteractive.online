"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Square, Activity, Clock, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

type SchedulerState = { nextNoteTime: number; currentBeat: number; };

export default function Metronome() {
    const [bpm, setBpm] = useState(100);
    const [beatsPerBar, setBeatsPerBar] = useState(4);
    const [isRunning, setIsRunning] = useState(false);
    const [tapTimes, setTapTimes] = useState<number[]>([]);
    const [visualBeat, setVisualBeat] = useState<number>(-1);
    const [subdivision, setSubdivision] = useState(1);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const schedulerStateRef = useRef<SchedulerState>({ nextNoteTime: 0, currentBeat: 0 });
    const timerIdRef = useRef<number | null>(null);

    // CRITICAL: Use a ref for BPM so the scheduler can see changes mid-stream
    const bpmRef = useRef(bpm);
    const subdivisionRef = useRef(subdivision);

    useEffect(() => {
        bpmRef.current = bpm;
        subdivisionRef.current = subdivision;
    }, [bpm, subdivision]);

    // FIX: Cleanup when navigating away
    useEffect(() => {
        return () => {
            if (timerIdRef.current) clearInterval(timerIdRef.current);
            if (audioCtxRef.current) audioCtxRef.current.close();
        };
    }, []);

    const ensureAudioContext = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
        return true;
    };

    const scheduleClick = (time: number, isAccent: boolean) => {
        const ctx = audioCtxRef.current!;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = isAccent ? "triangle" : "sine";
        osc.frequency.setValueAtTime(isAccent ? 1200 : 800, time);

        gain.gain.setValueAtTime(0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.1);
    };

    const schedulerTick = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;

        // Use Ref values to ensure the click follows the slider immediately
        const currentBpm = bpmRef.current;
        const currentSub = subdivisionRef.current;
        const spb = 60 / currentBpm / currentSub;

        while (schedulerStateRef.current.nextNoteTime < ctx.currentTime + 0.1) {
            const beat = schedulerStateRef.current.currentBeat;
            const totalBeats = beatsPerBar * currentSub;
            const isAccent = beat % totalBeats === 0;

            scheduleClick(schedulerStateRef.current.nextNoteTime, isAccent);

            const delay = Math.max(0, (schedulerStateRef.current.nextNoteTime - ctx.currentTime) * 1000);
            setTimeout(() => setVisualBeat(beat), delay);

            schedulerStateRef.current.currentBeat += 1;
            schedulerStateRef.current.nextNoteTime += spb;
        }
    };

    const toggleMetronome = () => {
        if (isRunning) {
            setIsRunning(false);
            if (timerIdRef.current) clearInterval(timerIdRef.current);
            timerIdRef.current = null;
            setVisualBeat(-1);
        } else {
            ensureAudioContext();
            const ctx = audioCtxRef.current!;
            schedulerStateRef.current = { nextNoteTime: ctx.currentTime + 0.05, currentBeat: 0 };
            setIsRunning(true);
            timerIdRef.current = window.setInterval(schedulerTick, 25);
        }
    };

    const onTap = () => {
        const now = performance.now();
        const updated = [...tapTimes, now].filter(t => now - t < 2000);
        setTapTimes(updated);
        if (updated.length >= 2) {
            const avg = (updated[updated.length - 1] - updated[0]) / (updated.length - 1);
            const newBpm = Math.max(30, Math.min(280, Math.round(60000 / avg)));
            setBpm(newBpm);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group">
            {/* HUD Status */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Activity className={`w-3 h-3 ${isRunning ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Metronome.sys</h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono">Engine: WebAudio_V2 // {isRunning ? 'Sync_Active' : 'Idle'}</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-white tabular-nums tracking-tighter">{bpm}</div>
                    <div className="text-[8px] text-zinc-700 uppercase font-mono">Beats_Per_Minute</div>
                </div>
            </div>

            {/* Visual Beat Track */}
            <div className="flex gap-2 justify-between mb-10 h-12 items-center">
                {Array.from({ length: beatsPerBar }).map((_, i) => {
                    const isActive = Math.floor(visualBeat / subdivision) % beatsPerBar === i;
                    return (
                        <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                            <motion.div
                                animate={{
                                    backgroundColor: isActive ? (i === 0 ? "#ef4444" : "#10b981") : "#18181b",
                                    scale: isActive ? 1.1 : 1
                                }}
                                className="w-full h-1.5 rounded-none"
                            />
                            <span className={`text-[8px] font-mono ${isActive ? 'text-white' : 'text-zinc-800'}`}>0{i + 1}</span>
                        </div>
                    );
                })}
            </div>

            {/* Primary Controls */}
            <div className="space-y-8">
                <div className="relative group/slider">
                    <input
                        type="range" min={30} max={240} value={bpm}
                        onChange={(e) => setBpm(parseInt(e.target.value))}
                        className="w-full h-1 bg-zinc-900 appearance-none cursor-crosshair accent-emerald-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[8px] uppercase tracking-widest text-zinc-600 flex items-center gap-2"><Settings2 className="w-3 h-3" /> Signature</label>
                        <select
                            value={beatsPerBar}
                            onChange={(e) => setBeatsPerBar(parseInt(e.target.value))}
                            className="w-full bg-black border border-zinc-900 p-3 text-[10px] uppercase tracking-widest text-zinc-400 outline-none focus:border-emerald-500/50"
                        >
                            {[2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}/4 Time</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[8px] uppercase tracking-widest text-zinc-600 flex items-center gap-2"><Clock className="w-3 h-3" /> Division</label>
                        <select
                            value={subdivision}
                            onChange={(e) => setSubdivision(parseInt(e.target.value))}
                            className="w-full bg-black border border-zinc-900 p-3 text-[10px] uppercase tracking-widest text-zinc-400 outline-none focus:border-emerald-500/50"
                        >
                            <option value={1}>1/4 Notes</option>
                            <option value={2}>1/8 Notes</option>
                            <option value={3}>Triplets</option>
                            <option value={4}>1/16 Notes</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={toggleMetronome}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${isRunning ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-black hover:bg-emerald-500'}`}
                    >
                        {isRunning ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        {isRunning ? 'Terminate' : 'Initialize'}
                    </button>
                    <button
                        onClick={onTap}
                        className="px-6 bg-[#0c0c0c] border border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        Tap
                    </button>
                </div>
            </div>

            {/* Shortcuts Guide */}
            <div className="mt-8 pt-6 border-t border-zinc-900/50 flex justify-between items-center">
                <span className="text-[8px] text-zinc-800 uppercase font-mono tracking-tighter">Keyboard_Mapped: [SPACE] [T]</span>
                <div className="flex gap-1">
                    <div className={`w-1 h-1 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-zinc-900'}`} />
                </div>
            </div>
        </div>
    );
}