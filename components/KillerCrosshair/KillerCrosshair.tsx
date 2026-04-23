"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

export default function KillerCrosshair() {
    const [targetX, setTargetX] = useState(50);
    const [targetY, setTargetY] = useState(50);
    const [isHunting, setIsHunting] = useState(false);
    const [accuracy, setAccuracy] = useState(100);
    const [kills, setKills] = useState(0);
    const [headshots, setHeadshots] = useState(0);
    const [isShooting, setIsShooting] = useState(false);

    // Refs for performance

    const frameRef = useRef<number>(0);
    const huntingIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const recoilTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const lastTimeRef = useRef<number>(0);

    // Motion values (optimized)
    const crosshairX = useMotionValue(50);
    const crosshairY = useMotionValue(50);
    const recoilValue = useMotionValue(0);

    // Optimized mouse tracking with throttling
    useEffect(() => {
        let lastTime = 0;
        const throttleDelay = 16; // ~60fps

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastTime < throttleDelay) return;
            lastTime = now;

            if (!isHunting) {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                setTargetX(Math.min(Math.max(x, 5), 95));
                setTargetY(Math.min(Math.max(y, 5), 95));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHunting]);

    // Optimized animation with RAF
    useEffect(() => {
        const animateToTarget = () => {
            animate(crosshairX, targetX, {
                type: "spring",
                stiffness: 400, // Increased for faster response
                damping: 30,
                duration: 0.15
            });
            animate(crosshairY, targetY, {
                type: "spring",
                stiffness: 400,
                damping: 30,
                duration: 0.15
            });
        };

        animateToTarget();
    }, [targetX, targetY, crosshairX, crosshairY]);

    // Optimized hunting mode with cleanup
    useEffect(() => {
        if (isHunting) {
            huntingIntervalRef.current = setInterval(() => {
                // Use requestAnimationFrame for smooth updates
                requestAnimationFrame(() => {
                    const randomX = Math.random() * 90 + 5;
                    const randomY = Math.random() * 90 + 5;
                    setTargetX(randomX);
                    setTargetY(randomY);

                    const distance = Math.hypot(randomX - targetX, randomY - targetY);
                    setAccuracy(prev => Math.max(prev - distance / 15, 0));
                });
            }, 1000); // Slower updates for better performance
        }

        return () => {
            if (huntingIntervalRef.current) {
                clearInterval(huntingIntervalRef.current);
            }
        };
    }, [isHunting, targetX, targetY]);

    // Optimized shooting handler
    const handleShoot = useCallback(() => {
        if (isShooting) return;

        setIsShooting(true);

        // Calculate hit
        const hit = accuracy > 70;
        const isHeadshot = hit && accuracy > 85 && Math.random() > 0.6;

        // Batch state updates
        if (hit) {
            setKills(prev => prev + 1);
            if (isHeadshot) setHeadshots(prev => prev + 1);
            setAccuracy(prev => Math.min(prev + (isHeadshot ? 5 : 2), 100));
        } else {
            setAccuracy(prev => Math.max(prev - 8, 0));
        }

        // Recoil animation
        recoilValue.set(100);
        recoilTimeoutRef.current = setTimeout(() => {
            recoilValue.set(0);
        }, 150);

        // Reset shooting state
        setTimeout(() => setIsShooting(false), 100);
    }, [accuracy, isShooting, recoilValue]);

    // Optimized reset function
    const resetGame = useCallback(() => {
        setKills(0);
        setHeadshots(0);
        setAccuracy(100);
        recoilValue.set(0);
        if (!isHunting) {
            setTargetX(50);
            setTargetY(50);
        }
    }, [isHunting, recoilValue]);

    // Cleanup timeouts
    useEffect(() => {
        return () => {
            if (recoilTimeoutRef.current) clearTimeout(recoilTimeoutRef.current);
            if (huntingIntervalRef.current) clearInterval(huntingIntervalRef.current);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, []);

    // Transform recoil value
    const recoilOffset = useTransform(recoilValue, [0, 100], [0, 8]);

    return (
        <div className="relative w-full h-[50vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden cursor-none">
            {/* Static overlays (no animations for performance) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/3 to-transparent bg-[length:100%_4px] pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Optimized recoil overlay - using opacity instead of complex animations */}
            <motion.div
                animate={{ opacity: isShooting ? 0.15 : 0 }}
                transition={{ duration: 0.05 }}
                className="absolute inset-0 bg-white pointer-events-none"
            />

            {/* Main Crosshair Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Accuracy ring - simplified animation */}
                <div
                    className="absolute rounded-full border-2 border-red-500/40 transition-all duration-75"
                    style={{
                        width: `${200 - accuracy}px`,
                        height: `${200 - accuracy}px`,
                        boxShadow: `0 0 ${30 - accuracy / 3}px rgba(239,68,68,${accuracy / 150})`
                    }}
                />

                {/* THE CROSSHAIR - Optimized */}
                <motion.div
                    style={{
                        left: crosshairX.get() + "%",
                        top: crosshairY.get() + "%",
                        x: "-50%",
                        y: `calc(-50% + ${recoilOffset.get()}px)`
                    }}
                    className="absolute z-20 will-change-transform"
                >
                    <div className="relative w-14 h-14">
                        {/* Crosshair lines - static with minimal animation */}
                        <div className="absolute left-1/2 top-0 w-0.5 bg-red-500 transform -translate-x-1/2 transition-all duration-75" style={{ height: "35px" }} />
                        <div className="absolute left-1/2 bottom-0 w-0.5 bg-red-500 transform -translate-x-1/2 transition-all duration-75" style={{ height: "35px" }} />
                        <div className="absolute top-1/2 left-0 h-0.5 bg-red-500 transform -translate-y-1/2 transition-all duration-75" style={{ width: "35px" }} />
                        <div className="absolute top-1/2 right-0 h-0.5 bg-red-500 transform -translate-y-1/2 transition-all duration-75" style={{ width: "35px" }} />

                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                        {/* Diagonal lines - static */}
                        <div className="absolute top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                            <div className="absolute left-1/2 top-0 w-0.5 bg-red-500/40 transform -translate-x-1/2" style={{ height: "20px" }} />
                            <div className="absolute left-1/2 bottom-0 w-0.5 bg-red-500/40 transform -translate-x-1/2" style={{ height: "20px" }} />
                            <div className="absolute top-1/2 left-0 h-0.5 bg-red-500/40 transform -translate-y-1/2" style={{ width: "20px" }} />
                            <div className="absolute top-1/2 right-0 h-0.5 bg-red-500/40 transform -translate-y-1/2" style={{ width: "20px" }} />
                        </div>

                        {/* Outer ring - simple pulse */}
                        {isHunting && (
                            <div className="absolute inset-[-15px] rounded-full border border-red-500/30 animate-pulse" />
                        )}
                    </div>

                    {/* Hit marker - simple scale animation */}
                    {isShooting && (
                        <div className="absolute top-1/2 left-1/2 w-10 h-10 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-150 opacity-0 animate-ping" />
                    )}
                </motion.div>

                {/* HUD Elements - Static with minimal updates */}
                <div className="absolute top-4 left-4 z-30 space-y-2">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-red-500/40 min-w-[80px]">
                        <div className="text-[10px] text-gray-400">KILLS</div>
                        <div className="text-2xl font-bold text-red-500 tabular-nums">{kills}</div>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-red-500/40 min-w-[80px]">
                        <div className="text-[10px] text-gray-400">HEADSHOTS</div>
                        <div className="text-xl font-bold text-orange-500 tabular-nums">{headshots}</div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-30">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-red-500/40 min-w-[100px]">
                        <div className="text-[10px] text-gray-400 text-center">ACCURACY</div>
                        <div className="text-2xl font-bold text-yellow-500 text-center tabular-nums">{Math.floor(accuracy)}%</div>
                        <div className="w-full h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-150"
                                style={{ width: `${accuracy}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Static HUD elements - no animations */}
                <div className="absolute bottom-4 right-4 z-30">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-red-500/40 min-w-[80px]">
                        <div className="text-[8px] text-gray-400 text-center">AMMO</div>
                        <div className="text-xl font-mono font-bold text-green-500 text-center tabular-nums">
                            {isHunting ? "∞" : "30"}
                            <span className="text-xs text-gray-400">/{isHunting ? "∞" : "90"}</span>
                        </div>
                    </div>
                </div>

                {/* Mini-map - static */}
                <div className="absolute bottom-4 left-4 z-30">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-red-500/40 w-20 h-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 to-transparent" />
                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        {isHunting && (
                            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
                        )}
                        <div className="absolute bottom-1 left-1/2 w-0.5 h-2 bg-green-500 transform -translate-x-1/2" />
                        <div className="absolute top-1 left-1/2 w-0.5 h-2 bg-green-500 transform -translate-x-1/2" />
                        <div className="absolute left-1 top-1/2 w-2 h-0.5 bg-green-500 transform -translate-y-1/2" />
                        <div className="absolute right-1 top-1/2 w-2 h-0.5 bg-green-500 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                    <button
                        onClick={() => setIsHunting(true)}
                        disabled={isHunting}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs transition-colors ${isHunting
                                ? "bg-red-600 text-white cursor-default"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            } shadow-lg disabled:opacity-50`}
                    >
                        {isHunting ? "HUNTING" : "START HUNT"}
                    </button>

                    <button
                        onClick={() => setIsHunting(false)}
                        disabled={!isHunting}
                        className="px-4 py-1.5 rounded-full font-bold text-xs bg-gray-700 hover:bg-gray-600 text-white shadow-lg disabled:opacity-50 transition-colors"
                    >
                        STOP
                    </button>

                    <button
                        onClick={resetGame}
                        className="px-4 py-1.5 rounded-full font-bold text-xs bg-gray-700 hover:bg-gray-600 text-white shadow-lg transition-colors"
                    >
                        RESET
                    </button>
                </div>
            </div>

            {/* Click handler */}
            <div
                className="absolute inset-0 z-10"
                onClick={handleShoot}
                role="button"
                tabIndex={0}
            />
        </div>
    );
}