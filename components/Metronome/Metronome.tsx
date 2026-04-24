"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Square, Activity, Clock, Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Panel } from "../shared/Panel/Panel";
import { ToolHeader } from "../shared/ToolHeader/ToolHeader";

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

    const bpmRef = useRef(bpm);
    const subdivisionRef = useRef(subdivision);

    useEffect(() => {
        bpmRef.current = bpm;
        subdivisionRef.current = subdivision;
    }, [bpm, subdivision]);

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
        <Panel as="main" className="p-4 sm:p-6 md:p-8 flex flex-col items-center space-y-6 max-w-xl mx-auto">
            <ToolHeader title="METRONOME" />

            {/* BPM HUD Section (Matches Unit Converter Result Area) */}
            <div className="w-full bg-gradient-to-r from-emerald-950/30 to-zinc-950 border border-emerald-500/20 rounded-2xl p-6">
                <p className="text-[10px] font-mono text-emerald-500 mb-2 tracking-widest uppercase">Beats Per Minute</p>
                <div className="flex items-baseline justify-between flex-wrap gap-4">
                    <div className="flex items-baseline overflow-hidden">
                        <span className="text-6xl font-black text-white tabular-nums tracking-tighter">
                            {bpm}
                        </span>
                        <span className="text-xl font-black text-zinc-500 ml-3 uppercase tracking-tighter">BPM</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Activity className={`w-4 h-4 ${isRunning ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                            {isRunning ? 'Sync_Active' : 'Engine_Idle'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-8">
                {/* Visual Beat Track */}
                <div className="flex gap-2 justify-between h-14 items-end">
                    {Array.from({ length: beatsPerBar }).map((_, i) => {
                        const isActive = Math.floor(visualBeat / subdivision) % beatsPerBar === i;
                        return (
                            <div key={i} className="flex-1 flex flex-col gap-2 items-center">
                                <motion.div
                                    animate={{
                                        backgroundColor: isActive ? (i === 0 ? "#ef4444" : "#10b981") : "#18181b",
                                        height: isActive ? "24px" : "8px",
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="w-full rounded-sm"
                                />
                                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white' : 'text-zinc-800'}`}>0{i + 1}</span>
                            </div>
                        );
                    })}
                </div>

                {/* BPM Slider (Customized for VOID UI) */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-zinc-500 uppercase">Tempo Control</span>
                        <span className="text-xs font-mono text-emerald-500">{bpm}</span>
                    </div>
                    <input
                        type="range" min={30} max={240} value={bpm}
                        onChange={(e) => setBpm(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-900 appearance-none cursor-pointer rounded-full accent-emerald-500"
                    />
                </div>

                {/* Grid Controls (Matching Unit Converter Unit Selectors) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                        <div className="border-b border-zinc-900 px-3 py-2">
                            <span className="text-[8px] font-mono text-zinc-600 uppercase">Signature</span>
                        </div>
                        <select
                            value={beatsPerBar}
                            onChange={(e) => setBeatsPerBar(parseInt(e.target.value))}
                            className="w-full bg-transparent px-3 py-4 text-white font-mono text-sm focus:outline-none cursor-pointer appearance-none"
                        >
                            {[2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n} className="bg-zinc-900">{n}/4 TIME</option>)}
                        </select>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                        <div className="border-b border-zinc-900 px-3 py-2">
                            <span className="text-[8px] font-mono text-zinc-600 uppercase">Division</span>
                        </div>
                        <select
                            value={subdivision}
                            onChange={(e) => setSubdivision(parseInt(e.target.value))}
                            className="w-full bg-transparent px-3 py-4 text-white font-mono text-sm focus:outline-none cursor-pointer appearance-none"
                        >
                            <option value={1} className="bg-zinc-900">1/4 NOTES</option>
                            <option value={2} className="bg-zinc-900">1/8 NOTES</option>
                            <option value={3} className="bg-zinc-900">TRIPLETS</option>
                            <option value={4} className="bg-zinc-900">1/16 NOTES</option>
                        </select>
                    </div>
                </div>

                {/* Primary Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={toggleMetronome}
                        className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all active:scale-95 ${isRunning
                                ? 'bg-zinc-900 border border-red-500/50 text-red-500 hover:bg-red-500/10'
                                : 'bg-emerald-500 text-black hover:bg-emerald-400'
                            }`}
                    >
                        {isRunning ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        {isRunning ? 'Kill_Engine' : 'Ignite'}
                    </button>
                    <button
                        onClick={onTap}
                        className="px-8 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500 hover:text-white hover:border-zinc-700 transition-all text-xs font-black uppercase tracking-widest active:scale-95"
                    >
                        Tap
                    </button>
                </div>
            </div>
        </Panel>
    );
}