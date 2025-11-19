"use client";

import React, { useEffect, useRef, useState } from "react";

type SchedulerState = {
    nextNoteTime: number;
    currentBeat: number;
};

export default function Metronome() {
    const [bpm, setBpm] = useState(100);
    const [beatsPerBar, setBeatsPerBar] = useState(4);
    const [isRunning, setIsRunning] = useState(false);
    const [tapTimes, setTapTimes] = useState<number[]>([]);
    const [visualBeat, setVisualBeat] = useState<number>(-1);
    const [subdivision, setSubdivision] = useState(1);
    const [audioContextError, setAudioContextError] = useState<string | null>(null);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const schedulerStateRef = useRef<SchedulerState>({ nextNoteTime: 0, currentBeat: 0 });
    const timerIdRef = useRef<number | null>(null);

    const ensureAudioContext = () => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioCtxRef.current?.state === "suspended") {
                audioCtxRef.current.resume().catch(err => {
                    console.error("Failed to resume audio context:", err);
                    setAudioContextError("Audio context suspended. Click to activate.");
                });
            }
            setAudioContextError(null);
        } catch (error) {
            console.error("Audio context error:", error);
            setAudioContextError("Audio not supported in this browser");
            return false;
        }
        return true;
    };

    const scheduleClick = (time: number, isAccent: boolean) => {
        if (!audioCtxRef.current) {
            if (!ensureAudioContext()) return;
        }

        try {
            const ctx = audioCtxRef.current!;

            // Create a more pleasant metronome sound
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            // Base tone
            osc1.type = "sine";
            osc1.frequency.value = isAccent ? 1000 : 800;

            // Overtones for click sound
            osc2.type = "triangle";
            osc2.frequency.value = isAccent ? 1200 : 1000;

            // Sharper envelope
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(time);
            osc2.start(time);
            osc1.stop(time + 0.1);
            osc2.stop(time + 0.1);
        } catch (error) {
            console.error("Audio scheduling error:", error);
            setAudioContextError("Audio playback failed");
        }
    };

    const spb = 60 / bpm / subdivision;
    const lookaheadMs = 25;
    const scheduleAheadTime = 0.1;
    const totalBeats = beatsPerBar * subdivision;

    const schedulerTick = () => {
        if (!audioCtxRef.current) return;

        try {
            const ctx = audioCtxRef.current;
            while (schedulerStateRef.current.nextNoteTime < ctx.currentTime + scheduleAheadTime) {
                const beat = schedulerStateRef.current.currentBeat;
                const isAccent = beat % totalBeats === 0;
                scheduleClick(schedulerStateRef.current.nextNoteTime, isAccent);

                setTimeout(
                    () => setVisualBeat(beat),
                    Math.max(0, (schedulerStateRef.current.nextNoteTime - ctx.currentTime) * 1000)
                );

                schedulerStateRef.current.currentBeat += 1;
                schedulerStateRef.current.nextNoteTime += spb;
            }
        } catch (error) {
            console.error("Scheduler error:", error);
            stop();
        }
    };

    const start = () => {
        if (!ensureAudioContext()) {
            return;
        }

        try {
            const ctx = audioCtxRef.current!;
            schedulerStateRef.current = {
                nextNoteTime: ctx.currentTime + 0.05,
                currentBeat: 0,
            };
            setIsRunning(true);
            timerIdRef.current = window.setInterval(schedulerTick, lookaheadMs);
        } catch (error) {
            console.error("Start error:", error);
            setAudioContextError("Failed to start metronome");
        }
    };

    const stop = () => {
        setIsRunning(false);
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
        setVisualBeat(-1);
    };

    // Safe cleanup
    useEffect(() => {
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
            // Don't close audio context immediately as it might be reused
        };
    }, []);

    // Reset scheduler when parameters change
    useEffect(() => {
        if (!isRunning || !audioCtxRef.current) return;

        try {
            const ctx = audioCtxRef.current;
            schedulerStateRef.current.nextNoteTime = ctx.currentTime + 0.05;
            schedulerStateRef.current.currentBeat = 0;
        } catch (error) {
            console.error("Parameter change error:", error);
        }
    }, [bpm, beatsPerBar, isRunning, subdivision]);

    const onTap = () => {
        const now = performance.now();
        const updated = [...tapTimes, now].filter((t) => now - t < 3000);
        setTapTimes(updated);

        if (updated.length >= 2) {
            const intervals: number[] = [];
            for (let i = 1; i < updated.length; i++) intervals.push(updated[i] - updated[i - 1]);
            const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
            const candidateBpm = Math.max(20, Math.min(300, Math.round(60000 / avgMs)));
            setBpm(candidateBpm);
        }
    };

    // Keyboard shortcuts with safe event handling
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle if not focused on input elements
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                isRunning ? stop() : start();
            }
            if (e.code === 'KeyT') {
                e.preventDefault();
                onTap();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isRunning]);

    const progressWidth =
        visualBeat >= 0 && totalBeats > 1
            ? ((visualBeat % totalBeats) / (totalBeats - 1)) * 100
            : 0;

    return (
        <div className="bg-slate-800 rounded-lg p-5 max-w-md mx-auto">
            {audioContextError && (
                <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md text-red-200 text-sm">
                    {audioContextError}
                    {audioContextError.includes("suspended") && (
                        <button
                            onClick={ensureAudioContext}
                            className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-600"
                        >
                            Activate
                        </button>
                    )}
                </div>
            )}

            <div className="flex gap-4 items-end mb-4">
                <div className="flex-1">
                    <label className="block text-xs uppercase tracking-wide text-slate-300 mb-2">BPM</label>
                    <input
                        type="range"
                        min={30}
                        max={240}
                        value={bpm}
                        onChange={(e) => setBpm(parseInt(e.target.value, 10))}
                        className="w-full accent-sky-500"
                    />
                    <div className="flex gap-2 items-center mt-2">
                        <input
                            type="number"
                            min="30"
                            max="240"
                            value={bpm}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (!isNaN(value) && value >= 30 && value <= 240) {
                                    setBpm(value);
                                }
                            }}
                            className="w-20 bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-center text-white focus:outline-none focus:border-sky-500"
                        />
                        <span className="text-sm text-slate-300">BPM</span>
                    </div>
                </div>

                <div className="w-28">
                    <label className="block text-xs uppercase tracking-wide text-slate-300 mb-2">Beats</label>
                    <select
                        value={beatsPerBar}
                        onChange={(e) => setBeatsPerBar(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-sky-500"
                    >
                        {[2, 3, 4, 5, 6, 7].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-28">
                    <label className="block text-xs uppercase tracking-wide text-slate-300 mb-2">Subdivision</label>
                    <select
                        value={subdivision}
                        onChange={(e) => setSubdivision(parseInt(e.target.value, 10))}
                        className="w-full bg-slate-900 text-slate-100 border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-sky-500"
                    >
                        <option value={1}>¼ notes</option>
                        <option value={2}>⅛ notes</option>
                        <option value={3}>⅛ triplets</option>
                        <option value={4}>⅟₁₆ notes</option>
                    </select>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-1 mb-4">
                <div
                    className="bg-sky-500 h-1 rounded-full transition-all duration-100"
                    style={{ width: `${progressWidth}%` }}
                />
            </div>

            {/* BPM Presets */}
            {/* <div className="flex gap-2 mb-4 flex-wrap">
                {[60, 80, 100, 120, 140, 160].map((presetBpm) => (
                    <button
                        key={presetBpm}
                        onClick={() => setBpm(presetBpm)}
                        className={`px-3 py-1 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${bpm === presetBpm
                            ? 'bg-sky-600 text-white'
                            : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                            }`}
                    >
                        {presetBpm}
                    </button>
                ))}
            </div> */}

            <div className="flex gap-3 mb-4">
                <button
                    onClick={isRunning ? stop : start}
                    className={`flex-1 py-2 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ${isRunning
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-sky-500 hover:bg-sky-600"
                        }`}
                >
                    {isRunning ? "Stop" : "Start"}
                </button>

                <button
                    onClick={onTap}
                    className="px-4 py-2 rounded-md bg-slate-700 text-slate-100 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    Tap
                </button>
            </div>

            {/* Visual Beat Indicator */}
            <div className="flex gap-3 justify-between mb-4">
                {Array.from({ length: totalBeats }).map((_, i) => {
                    const isActive = visualBeat % totalBeats === i && isRunning;
                    const isAccent = i % beatsPerBar === 0;
                    const isSubdivision = i % subdivision === 0;

                    return (
                        <div
                            key={i}
                            className={`flex-shrink-0 transition-all duration-100 ${isActive
                                ? "scale-110 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                                : "scale-100"
                                } ${isAccent
                                    ? (isActive ? "bg-sky-400" : "bg-sky-600")
                                    : isSubdivision
                                        ? (isActive ? "bg-emerald-400" : "bg-slate-600")
                                        : (isActive ? "bg-amber-400" : "bg-slate-700")
                                } ${isSubdivision ? "w-8 h-8 rounded-full" : "w-2 h-8 rounded-sm"
                                }`}
                        />
                    );
                })}
            </div>

            <p className="mt-4 text-sm text-slate-400 text-center">
                Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Space</kbd> to start/stop •
                Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">T</kbd> to tap tempo
            </p>

            <p className="mt-2 text-xs text-slate-500 text-center">
               Lizard Interactive Online.
            </p>
        </div>
    );
}