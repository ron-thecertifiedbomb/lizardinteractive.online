/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download, Upload, Clock, Zap, Play,
    Shield, Award, Server, Globe,
    Gauge, Signal, Cpu, RefreshCw,
    ChevronRight, Activity, Info
} from "lucide-react";

// --- CONSTANTS ---
const COLOR_PALETTE = [
    { name: 'Volt', hex: '#CEFF00', shadow: 'rgba(206, 255, 0, 0.3)' },
    { name: 'Cyan', hex: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.3)' },
    { name: 'Emerald', hex: '#10b981', shadow: 'rgba(16, 185, 129, 0.3)' },
    { name: 'Violet', hex: '#8b5cf6', shadow: 'rgba(139, 92, 246, 0.3)' },
];

const MAX_SPEED = 1000; // Mbps

export function SpeedTest() {
    const [testing, setTesting] = useState(false);
    const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload">("idle");
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [accentColor, setAccentColor] = useState(COLOR_PALETTE[0]);
    const [results, setResults] = useState({
        download: null as number | null,
        upload: null as number | null,
        ping: null as number | null,
        jitter: null as number | null,
    });

    // Calculate rotation for the needle (Logarithmic feels more professional)
    // 0 Mbps = -90deg, 1000 Mbps = 90deg
    const needleRotation = useMemo(() => {
        const val = Math.min(currentSpeed, MAX_SPEED);
        return (val / MAX_SPEED) * 180 - 90;
    }, [currentSpeed]);

    const startTest = async () => {
        setTesting(true);
        setResults({ download: null, upload: null, ping: null, jitter: null });

        // Mocking the sequence for UI demonstration
        setPhase("ping");
        await new Promise(r => setTimeout(r, 1500));
        setResults(prev => ({ ...prev, ping: 12, jitter: 2 }));

        setPhase("download");
        for (let i = 0; i <= 450; i += 15) {
            setCurrentSpeed(i + Math.random() * 50);
            await new Promise(r => setTimeout(r, 50));
        }
        setResults(prev => ({ ...prev, download: 482 }));

        setPhase("upload");
        for (let i = 0; i <= 150; i += 10) {
            setCurrentSpeed(i + Math.random() * 20);
            await new Promise(r => setTimeout(r, 50));
        }
        setResults(prev => ({ ...prev, upload: 156 }));

        setTesting(false);
        setPhase("idle");
        setCurrentSpeed(0);
    };

    return (
        <div className=" text-zinc-300 font-sans p-4 lg:p-6 flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_300px] gap-6">

                {/* Left Column: The Action Center */}
                <main className="relative space-y-6">
                    <header className="flex justify-between items-center">
                        <div>
                            <h1 className="text-md font-bold tracking-tighter text-white flex items-center gap-2">
                                <Activity className="w-5 h-5" style={{ color: accentColor.hex }} />
                               LIZARD INTERACTIVE ONLINE  
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            {COLOR_PALETTE.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setAccentColor(c)}
                                    className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                                    style={{ backgroundColor: c.hex, border: accentColor.name === c.name ? '2px solid white' : 'none' }}
                                />
                            ))}
                        </div>
                    </header>

                    <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                        {/* The Gauge */}
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="relative w-full max-w-[450px] aspect-[16/10] flex items-end justify-center overflow-hidden">
                                {/* Outer Arch */}
                                <div className="absolute inset-0 border-[4px] border-white/5 rounded-t-full" />

                                {/* Progress Arch (SVG for precision) */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                                    <path
                                        d="M 20 90 A 80 80 0 0 1 180 90"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="text-zinc-800"
                                    />
                                    <motion.path
                                        d="M 20 90 A 80 80 0 0 1 180 90"
                                        fill="none"
                                        stroke={accentColor.hex}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeDasharray="251.2"
                                        animate={{ strokeDashoffset: 251.2 - (251.2 * (currentSpeed / MAX_SPEED)) }}
                                        style={{ filter: `drop-shadow(0 0 12px ${accentColor.shadow})` }}
                                    />
                                </svg>

                                {/* Needle */}
                                <motion.div
                                    className="absolute bottom-0 w-1 h-[70%] origin-bottom z-10"
                                    animate={{ rotate: needleRotation }}
                                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                                >
                                    <div className="h-full w-full bg-gradient-to-t from-[#10b981] via-[#3f3f46] to-transparent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                                </motion.div>

                                {/* Center Hub */}
                                <div className="absolute bottom-[-10px] w-8 h-8 rounded-full bg-zinc-900 border-4 border-white/20 z-20" />

                                {/* Speed Text */}
                                <div className="z-30 text-center mb-4">
                                    <motion.span className="block text-8xl font-black text-white tabular-nums tracking-tighter">
                                        {Math.round(currentSpeed)}
                                    </motion.span>
                                    <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase">Mbps _{phase}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <StatBox label="Latency" value={results.ping} unit="ms" icon={Clock} color={accentColor.hex} />
                            <StatBox label="Download" value={results.download} unit="Mbps" icon={Download} color={accentColor.hex} />
                            <StatBox label="Upload" value={results.upload} unit="Mbps" icon={Upload} color={accentColor.hex} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={startTest}
                            disabled={testing}
                            className="flex-1 h-16 bg-zinc-900 text-zinc-600 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all disabled:opacity-50"
                        >
                            {testing ? <RefreshCw className="animate-spin" /> : <Play className="fill-current" />}
                            {testing ? "RUNNING_DIAGNOSTICS" : "START"}
                        </button>
               
                    </div>
                </main>

                {/* Right Column: Metadata & Details */}
                <aside className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2">
                            <Server className="w-3 h-3" /> NETWORK_DETAILS
                        </h3>
                        <div className="space-y-4">
                            <IdentityItem label="Provider" value="Lizard Interactive" />
                            <IdentityItem label="IP_Address" value="192.168.1.XX" />
                            <IdentityItem label="Location" value="Manila, PH" />
                            <IdentityItem label="Server" value="Cloudflare - SG" />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex-1">
                        <h3 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 mb-6">QUALITY_METRICS</h3>
                        <div className="space-y-3">
                            <MetricRow label="Jitter" value={`${results.jitter || '--'} ms`} />
                            <MetricRow label="Stability" value="99.9%" />
                            <MetricRow label="Grade" value={results.download ? "A+" : "--"} highlight />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function StatBox({ label, value, unit, icon: Icon, color }: any) {
    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.05]">
            <div className="flex items-center gap-2 mb-2 text-zinc-500">
                <Icon className="w-4 h-4" style={{ color: value ? color : 'inherit' }} />
                <span className="text-[10px] font-mono uppercase tracking-wider">{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{value || '--'}</span>
                <span className="text-[10px] font-mono text-zinc-600">{unit}</span>
            </div>
        </div>
    );
}

function IdentityItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[10px] font-mono text-zinc-600">{label}</span>
            <span className="text-xs font-medium text-zinc-300">{value}</span>
        </div>
    );
}

function MetricRow({ label, value, highlight }: any) {
    return (
        <div className={`flex justify-between p-3 rounded-xl ${highlight ? 'bg-white/10 text-white' : 'bg-white/[0.02] text-zinc-400'}`}>
            <span className="text-xs font-mono">{label}</span>
            <span className="text-xs font-bold">{value}</span>
        </div>
    );
}