/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import type { NesButton } from "@/lib/nes/input";
import { motion } from "framer-motion";

type Props = {
    onPress: (b: NesButton) => void;
    onRelease: (b: NesButton) => void;
};

export function NesMobileControls({ onPress, onRelease }: Props) {
    const joystickRef = useRef<HTMLDivElement>(null);
    const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
    const [activeDir, setActiveDir] = useState<NesButton | null>(null);

    const handleJoystickMove = (e: React.PointerEvent) => {
        if (!joystickRef.current) return;

        const rect = joystickRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = e.clientX - centerX;
        let dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = rect.width / 2;

        if (distance > maxRadius) {
            dx = (dx / distance) * maxRadius;
            dy = (dy / distance) * maxRadius;
        }

        setStickPos({ x: dx, y: dy });

        const threshold = 15;
        let newDir: NesButton | null = null;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > threshold) newDir = "RIGHT";
            else if (dx < -threshold) newDir = "LEFT";
        } else {
            if (dy > threshold) newDir = "DOWN";
            else if (dy < -threshold) newDir = "UP";
        }

        if (newDir !== activeDir) {
            if (activeDir) onRelease(activeDir);
            if (newDir) onPress(newDir);
            setActiveDir(newDir);
        }
    };

    const resetJoystick = () => {
        if (activeDir) onRelease(activeDir);
        setActiveDir(null);
        setStickPos({ x: 0, y: 0 });
    };

    return (
        <div className="mt-8 w-full lg:hidden select-none touch-none pb-12 px-6">
            <div className="flex flex-col gap-12">

                {/* --- MAIN CONTROL DECK --- */}
                <div className="flex items-center justify-between">

                    {/* LEFT: ANALOG STICK (Famicom-style colors) */}
                    <div className="relative">
                        <div
                            ref={joystickRef}
                            onPointerMove={handleJoystickMove}
                            onPointerUp={resetJoystick}
                            onPointerLeave={resetJoystick}
                            className="w-40 h-40 rounded-full bg-zinc-950 border-[3px] border-zinc-900 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ x: stickPos.x, y: stickPos.y }}
                                transition={{ type: "spring", damping: 20, stiffness: 250 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600 shadow-2xl z-10 flex items-center justify-center pointer-events-none"
                            >
                                <div className={`w-3 h-3 rounded-full transition-all duration-200 ${activeDir ? 'bg-emerald-400 shadow-[0_0_15px_#10b981]' : 'bg-zinc-800'}`} />
                            </motion.div>
                        </div>
                        <span className="absolute -bottom-6 left-0 text-[6px] font-black tracking-[0.5em] text-zinc-800 uppercase">Input_Unit_01</span>
                    </div>

                    {/* RIGHT: ACTION BUTTONS (Aligned like NES/Famicom) */}
                    <div className="relative bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 flex flex-col items-center gap-1 shadow-inner">
                        <div className="flex items-center gap-6">
                            {/* BUTTON B */}
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onPointerDown={() => onPress("B")}
                                    onPointerUp={() => onRelease("B")}
                                    className="w-16 h-16 rounded-full bg-[#8b1d1d] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-black/50 font-black text-xl shadow-lg"
                                >
                                    B
                                </button>
                                <span className="text-[8px] font-black text-zinc-600 tracking-widest">SIGNAL_B</span>
                            </div>

                            {/* BUTTON A */}
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onPointerDown={() => onPress("A")}
                                    onPointerUp={() => onRelease("A")}
                                    className="w-16 h-16 rounded-full bg-[#8b1d1d] border-b-4 border-black active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-black/50 font-black text-xl shadow-lg"
                                >
                                    A
                                </button>
                                <span className="text-[8px] font-black text-zinc-600 tracking-widest">SIGNAL_A</span>
                            </div>
                        </div>
                        {/* Decorative Stripe */}
                        <div className="w-full h-[1px] bg-zinc-800 mt-2" />
                    </div>
                </div>

                {/* --- CENTER SYSTEM CONTROLS (Pill style) --- */}
                <div className="flex justify-center items-center gap-4 py-6 border-y border-zinc-900/50">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onPointerDown={() => onPress("SELECT")}
                            onPointerUp={() => onRelease("SELECT")}
                            className="w-24 h-6 bg-zinc-900 border border-zinc-800 rounded-full active:bg-zinc-700 transition-colors"
                        />
                        <span className="text-[7px] font-black text-rose-900/80 tracking-[0.2em] uppercase">Select</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onPointerDown={() => onPress("START")}
                            onPointerUp={() => onRelease("START")}
                            className="w-24 h-6 bg-zinc-900 border border-zinc-800 rounded-full active:bg-zinc-700 transition-colors"
                        />
                        <span className="text-[7px] font-black text-rose-900/80 tracking-[0.2em] uppercase">Start</span>
                    </div>
                </div>

                <div className="text-center opacity-10">
                    <span className="text-[8px] font-mono tracking-[1em]">LIZARD INTERACTIVE ONLINE</span>
                </div>
            </div>
        </div>
    );
}