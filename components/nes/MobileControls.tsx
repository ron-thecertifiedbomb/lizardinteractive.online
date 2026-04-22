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

        // Reduced threshold for a smaller physical stick range
        const threshold = 10;
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
        <div className="mt-4 w-full lg:hidden select-none touch-none pb-8 px-6">
            <div className="flex flex-col gap-8">

                {/* --- MAIN CONTROL DECK --- */}
                <div className="flex items-center justify-between px-2">

                    {/* LEFT: SMALLER ANALOG STICK */}
                    <div className="relative">
                        <div
                            ref={joystickRef}
                            onPointerMove={handleJoystickMove}
                            onPointerUp={resetJoystick}
                            onPointerLeave={resetJoystick}
                            // Scaled from w-40 to w-24
                            className="w-24 h-24 rounded-full bg-zinc-950 border-2 border-zinc-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ x: stickPos.x, y: stickPos.y }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                // Scaled from w-16 to w-10
                                className="w-10 h-10 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600 shadow-xl z-10 flex items-center justify-center pointer-events-none"
                            >
                                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${activeDir ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />
                            </motion.div>
                        </div>
                        <span className="absolute -bottom-4 left-0 text-[5px] font-black tracking-[0.3em] text-zinc-800 uppercase">Input_01</span>
                    </div>

                    {/* RIGHT: ACTION BUTTONS WITH MODERATELY LARGER RED BUTTONS */}
                    <div className="relative bg-zinc-900/20 p-3 rounded-lg border border-zinc-800/50 flex flex-col items-center gap-1 shadow-inner">
                        <div className="flex items-center gap-5">
                            {/* BUTTON B - MODERATELY LARGER */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onPointerDown={() => onPress("B")}
                                    onPointerUp={() => onRelease("B")}
                                    className="w-16 h-16 rounded-full bg-[#8b1d1d] border-b-[4px] border-black active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-black/50 font-black text-lg shadow-md"
                                >
                                    B
                                </button>
                            </div>

                            {/* BUTTON A - MODERATELY LARGER */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onPointerDown={() => onPress("A")}
                                    onPointerUp={() => onRelease("A")}
                                    className="w-16 h-16 rounded-full bg-[#8b1d1d] border-b-[4px] border-black active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center text-black/50 font-black text-lg shadow-md"
                                >
                                    A
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CENTER SYSTEM CONTROLS (Slimmer) --- */}
                <div className="flex justify-center items-center gap-3 py-4 border-y border-zinc-900/30">
                    <div className="flex flex-col items-center gap-1">
                        <button
                            onPointerDown={() => onPress("SELECT")}
                            onPointerUp={() => onRelease("SELECT")}
                            // Scaled from w-24 to w-16
                            className="w-16 h-4 bg-zinc-900 border border-zinc-800 rounded-full active:bg-zinc-700 transition-colors"
                        />
                        <span className="text-[6px] font-black text-rose-900/60 tracking-widest uppercase">Select</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <button
                            onPointerDown={() => onPress("START")}
                            onPointerUp={() => onRelease("START")}
                            // Scaled from w-24 to w-16
                            className="w-16 h-4 bg-zinc-900 border border-zinc-800 rounded-full active:bg-zinc-700 transition-colors"
                        />
                        <span className="text-[6px] font-black text-rose-900/60 tracking-widest uppercase">Start</span>
                    </div>
                </div>

                <div className="text-center opacity-5">
                    <span className="text-[6px] font-mono tracking-[0.8em]">LIZARD INTERACTIVE ONLINE</span>
                </div>
            </div>
        </div>
    );
}