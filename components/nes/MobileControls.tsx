/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
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

        // Calculate distance from center
        let dx = e.clientX - centerX;
        let dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = rect.width / 2;

        // Clamp stick movement
        if (distance > maxRadius) {
            dx = (dx / distance) * maxRadius;
            dy = (dy / distance) * maxRadius;
        }

        setStickPos({ x: dx, y: dy });

        // Logic to trigger NES buttons based on stick angle
        const threshold = 15; // sensitivity
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
        <div className="mt-6 w-full lg:hidden select-none touch-none pb-12">
            <div className="flex items-center justify-between px-10">

                {/* --- ANALOG STYLE THUMBSTICK --- */}
                <div className="relative group">
                    {/* Outer Ring */}
                    <div
                        ref={joystickRef}
                        onPointerMove={handleJoystickMove}
                        onPointerUp={resetJoystick}
                        onPointerLeave={resetJoystick}
                        className="w-44 h-44 rounded-full bg-zinc-950 border-2 border-zinc-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden"
                    >
                        {/* Decorative Axes */}
                        <div className="absolute w-full h-[1px] bg-zinc-900/50" />
                        <div className="absolute h-full w-[1px] bg-zinc-900/50" />

                        {/* The Actual Moving Stick (The "Nub") */}
                        <motion.div
                            animate={{ x: stickPos.x, y: stickPos.y }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 shadow-2xl z-10 flex items-center justify-center pointer-events-none"
                        >
                            {/* Inner thumb grip texture */}
                            <div className="w-14 h-14 rounded-full border border-zinc-800 bg-zinc-900/50 shadow-inner flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${activeDir ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />
                            </div>
                        </motion.div>

                        {/* Visual Feedback Ring */}
                        <div className={`absolute inset-4 rounded-full border border-emerald-500/10 transition-opacity duration-300 ${activeDir ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] font-black tracking-[0.4em] text-zinc-700 uppercase">Analog_Signal_Input</span>
                </div>

                {/* --- ACTION BUTTONS (XBOX STYLE OFFSET) --- */}
                <div className="flex flex-col gap-6 transform -rotate-12">
                    <div className="flex gap-4">
                        {/* Rapid B */}
                        <div className="flex flex-col items-center gap-2 translate-y-4">
                            <button
                                onPointerDown={() => onPress("B")}
                                onPointerUp={() => onRelease("B")}
                                className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 text-rose-600 font-black text-xl shadow-xl active:bg-rose-600 active:text-white transition-all active:scale-90"
                            >
                                B
                            </button>
                        </div>
                        {/* Rapid A */}
                        <div className="flex flex-col items-center gap-2 -translate-y-4">
                            <button
                                onPointerDown={() => onPress("A")}
                                onPointerUp={() => onRelease("A")}
                                className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-800 text-emerald-500 font-black text-xl shadow-xl active:bg-emerald-500 active:text-black transition-all active:scale-90"
                            >
                                A
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SYSTEM BUTTONS --- */}
            <div className="flex justify-center gap-10 mt-16 px-10">
                <button
                    onPointerDown={() => onPress("SELECT")}
                    onPointerUp={() => onRelease("SELECT")}
                    className="flex-1 py-3 bg-zinc-950 border border-zinc-900 rounded-sm text-[8px] tracking-[0.3em] font-black text-zinc-600 uppercase active:text-white active:border-zinc-700 transition-colors"
                >
                    Select
                </button>
                <button
                    onPointerDown={() => onPress("START")}
                    onPointerUp={() => onRelease("START")}
                    className="flex-1 py-3 bg-zinc-950 border border-zinc-900 rounded-sm text-[8px] tracking-[0.3em] font-black text-zinc-600 uppercase active:text-white active:border-zinc-700 transition-colors"
                >
                    Start
                </button>
            </div>
        </div>
    );
}