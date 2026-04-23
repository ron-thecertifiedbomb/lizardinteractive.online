"use client";

import { motion, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RacingSpeedometer() {
    const [speed, setSpeed] = useState(0);
    const [maxSpeed, setMaxSpeed] = useState(0);
    const [isRacing, setIsRacing] = useState(false);
    const [gear, setGear] = useState(1);

    // Motion values for smooth needle animation
    const speedValue = useMotionValue(0);
    const rotateValue = useTransform(speedValue, [0, 320], [-90, 90]);

    // Simulate racing speed
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRacing) {
            interval = setInterval(() => {
                setSpeed(prev => {
                    const newSpeed = Math.min(prev + Math.random() * 15, 320);
                    if (newSpeed >= 320) {
                        setIsRacing(false);
                        setMaxSpeed(prev => Math.max(prev, 320));
                    }
                    return newSpeed;
                });
            }, 50);
        } else if (speed > 0 && !isRacing) {
            interval = setInterval(() => {
                setSpeed(prev => {
                    const newSpeed = Math.max(prev - Math.random() * 10, 0);
                    if (newSpeed === 0) {
                        clearInterval(interval);
                    }
                    return newSpeed;
                });
            }, 30);
        }

        return () => clearInterval(interval);
    }, [isRacing, speed]);

    // Update motion value smoothly
    useEffect(() => {
        animate(speedValue, speed, {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.3
        });
    }, [speed, speedValue]);

    // Update gear based on speed
    useEffect(() => {
        if (speed < 40) setGear(1);
        else if (speed < 80) setGear(2);
        else if (speed < 120) setGear(3);
        else if (speed < 160) setGear(4);
        else if (speed < 220) setGear(5);
        else setGear(6);
    }, [speed]);

    // Calculate RPM (simulated)
    const rpm = Math.min(Math.floor((speed / 320) * 8000), 8000);
    const rpmPercent = (rpm / 8000) * 100;

    // Nitro effect
    const [nitro, setNitro] = useState(false);
    const activateNitro = () => {
        if (!nitro && isRacing) {
            setNitro(true);
            setSpeed(prev => Math.min(prev + 50, 320));
            setTimeout(() => setNitro(false), 2000);
        }
    };

    return (
        <div className="relative w-full h-[50vh] min-h-[500px] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden rounded-2xl">
            {/* KILLER OVERLAY - Racing Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent" />

            {/* Racing stripes overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-red-600 via-transparent to-red-600 transform -skew-y-6" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-red-600 via-transparent to-red-600 transform skew-y-6" />
            </div>

            {/* Motion blur lines */}
            <motion.div
                animate={{ opacity: isRacing ? [0.2, 0.6, 0.2] : 0 }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
            >
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ x: isRacing ? [-100, window.innerWidth + 100] : 0 }}
                        transition={{ duration: 0.6, delay: i * 0.05, repeat: Infinity }}
                        className="absolute h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        style={{ top: `${i * 10}%`, width: "150px" }}
                    />
                ))}
            </motion.div>

            {/* Main Speedometer Container - CENTERED */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
                {/* Glow behind speedometer */}
                <motion.div
                    animate={{
                        scale: isRacing ? [1, 1.1, 1] : 1,
                        opacity: nitro ? [0.2, 0.6, 0.2] : 0.15
                    }}
                    transition={{ duration: 0.5, repeat: isRacing ? Infinity : 0 }}
                    className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-2xl"
                />

                {/* Speedometer Circle */}
                <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px]">
                    {/* Outer carbon fiber ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl" />

                    {/* Outer chrome border */}
                    <div className="absolute inset-1.5 rounded-full border-2 border-gradient-to-r from-yellow-500 via-red-500 to-orange-500" />

                    {/* Speedometer face */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-inner">
                        {/* Tick marks */}
                        {[...Array(17)].map((_, i) => {
                            const angle = -90 + (i * 11.25);
                            const isMajor = i % 4 === 0;
                            const isRedZone = i >= 12;
                            return (
                                <div
                                    key={i}
                                    className="absolute left-1/2 top-0 origin-bottom transform -translate-x-1/2"
                                    style={{
                                        transform: `rotate(${angle}deg)`,
                                        height: "100%"
                                    }}
                                >
                                    <div className={`absolute left-[-1.5px] top-4 w-0.5 ${isMajor ? 'w-1' : 'w-0.5'} ${isRedZone ? 'bg-red-500' : 'bg-gray-400'} ${isMajor ? 'h-3.5' : 'h-2'}`} />
                                </div>
                            );
                        })}

                        {/* Speed numbers */}
                        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((speedNum, idx) => {
                            const angle = -90 + (idx * 22.5);
                            const radius = 105;
                            const x = 50 + (radius * Math.cos(angle * Math.PI / 180)) / 2.8;
                            const y = 50 + (radius * Math.sin(angle * Math.PI / 180)) / 2.8;
                            const isRed = speedNum >= 240;
                            return (
                                <div
                                    key={speedNum}
                                    className="absolute text-white font-bold text-[10px] md:text-xs"
                                    style={{
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        transform: "translate(-50%, -50%)",
                                        color: isRed ? "#ef4444" : "#fff",
                                        textShadow: isRed ? "0 0 5px rgba(239,68,68,0.5)" : "none"
                                    }}
                                >
                                    {speedNum}
                                </div>
                            );
                        })}

                        {/* Speedometer Center */}
                        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-700">
                            {/* Digital Speed Display */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.div
                                    animate={{ scale: nitro ? [1, 1.05, 1] : 1 }}
                                    className="text-center"
                                >
                                    <div className="text-xl md:text-2xl font-bold text-red-500 font-mono tabular-nums">
                                        {Math.floor(speed)}
                                    </div>
                                    <div className="text-[8px] text-gray-400 mt-0.5">KM/H</div>
                                </motion.div>

                                {/* Gear indicator */}
                                <div className="mt-1 text-[10px] text-gray-400">
                                    GEAR {gear}
                                </div>

                                {/* RPM Bar */}
                                <div className="mt-1.5 w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${rpmPercent}%` }}
                                        transition={{ duration: 0.1 }}
                                        className={`h-full rounded-full ${rpm > 6000 ? 'bg-red-500' : 'bg-green-500'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* THE NEEDLE */}
                        <motion.div
                            style={{ rotate: rotateValue }}
                            className="absolute left-1/2 bottom-1/2 origin-bottom transform -translate-x-1/2"
                        >
                            {/* Needle shadow */}
                            <div className="absolute left-[-2px] top-[-20px] w-1 h-[105px] bg-black/50 blur-sm" />

                            {/* Main needle */}
                            <div className="relative w-1.5 h-[105px] bg-gradient-to-t from-red-600 via-red-500 to-yellow-400 rounded-full">
                                {/* Needle tip glow */}
                                <motion.div
                                    animate={{ opacity: isRacing ? [0.5, 1, 0.5] : 0.3 }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="absolute -top-1 left-[-2.5px] w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                                />
                            </div>

                            {/* Center cap */}
                            <div className="absolute bottom-[-12px] left-[-9px] w-4.5 h-4.5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border border-red-500 shadow-lg" />
                            <div className="absolute bottom-[-7px] left-[-4px] w-2 h-2 bg-red-500 rounded-full" />
                        </motion.div>
                    </div>
                </div>

                {/* Racing Controls - COMPACT */}
                <div className="mt-4 flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsRacing(!isRacing)}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${isRacing
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            } shadow-lg`}
                    >
                        {isRacing ? "BRAKE" : "START"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={activateNitro}
                        disabled={!isRacing || nitro}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all ${nitro
                                ? "bg-blue-600 animate-pulse"
                                : !isRacing
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } text-white shadow-lg`}
                    >
                        {nitro ? "NITRO!" : "💨 NOS"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setSpeed(0);
                            setMaxSpeed(0);
                            setIsRacing(false);
                            setNitro(false);
                        }}
                        className="px-4 py-1.5 rounded-full font-bold text-xs bg-gray-700 hover:bg-gray-600 text-white shadow-lg"
                    >
                        RESET
                    </motion.button>
                </div>

                {/* Stats Panel - COMPACT */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 border border-red-500/30 min-w-[70px]">
                        <div className="text-[8px] text-gray-400">MAX</div>
                        <div className="text-base font-bold text-red-500">{Math.floor(maxSpeed)}</div>
                        <div className="text-[6px] text-gray-500">KM/H</div>
                    </div>
                    <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 border border-red-500/30 min-w-[70px]">
                        <div className="text-[8px] text-gray-400">RPM</div>
                        <div className="text-base font-bold text-orange-500">{Math.floor(rpm / 1000)}</div>
                        <div className="text-[6px] text-gray-500">x1000</div>
                    </div>
                    <div className="bg-black/50 backdrop-blur-md rounded-lg p-1.5 border border-red-500/30 min-w-[70px]">
                        <div className="text-[8px] text-gray-400">POWER</div>
                        <div className="text-base font-bold text-yellow-500">
                            {Math.floor((speed / 320) * 100)}
                        </div>
                        <div className="text-[6px] text-gray-500">%</div>
                    </div>
                </div>

                {/* Racing Logo */}
                <div className="absolute top-2 left-2 z-20">
                    <div className="flex items-center gap-1">
                        <Image
                            src="/lizard/lizardlogo.png"
                            alt="Lizard Interactive"
                            width={45}
                            height={45}
                            className="opacity-30"
                        />
                        <span className="text-white font-bold tracking-wider text-[14px] opacity-30">LIZARD INTERACTIVE ONLINE</span>
                    </div>
                </div>

                {/* Speed Warning */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: speed > 240 ? 1 : 0,
                        scale: speed > 240 ? [1, 1.05, 1] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-2 right-2 z-20 bg-red-600/90 backdrop-blur-md rounded-lg p-1 border border-yellow-500"
                >
                    <div className="text-white font-bold text-[8px] animate-pulse whitespace-nowrap">
                        ⚠️ OVERSPEED!
                    </div>
                </motion.div>
            </div>
        </div>
    );
}