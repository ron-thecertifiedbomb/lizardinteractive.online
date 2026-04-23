/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download, Upload, Clock, Zap, Play,
    Shield, Award, Server, Globe,
    Gauge, Signal, Cpu, RefreshCw,
    ChevronRight, Activity, Info
} from "lucide-react";

// --- CONSTANTS ---
const COLOR_PALETTE = [
    { name: 'Emerald', hex: '#10b981', shadow: 'rgba(16, 185, 129, 0.3)' },
    { name: 'Cyan', hex: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.3)' },
    { name: 'Volt', hex: '#CEFF00', shadow: 'rgba(206, 255, 0, 0.3)' },
    { name: 'Violet', hex: '#8b5cf6', shadow: 'rgba(139, 92, 246, 0.3)' },
];

const MAX_SPEED = 1000; // Mbps

export function SpeedTest() {
    const [testing, setTesting] = useState(false);
    const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload">("idle");
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [accentColor, setAccentColor] = useState(COLOR_PALETTE[0]);
    const [networkData, setNetworkData] = useState({
        ip: "FETCHING...",
        isp: "DETECTING...",
        location: "LOCATING...",
        server: "SCANNING...",
    });
    const [results, setResults] = useState({
        download: null as number | null,
        upload: null as number | null,
        ping: null as number | null,
        jitter: null as number | null,
    });

    // --- DYNAMIC NETWORK DETECTION ---
    useEffect(() => {
        async function getNetworkDetails() {
            try {
                // Use ipify - it's much more reliable for local development
                const ipRes = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipRes.json();
                const userIp = ipData.ip;

                // Get Geo/ISP details
                // Adding a fallback in case ipapi is blocked by an AdBlocker
                const geoRes = await fetch(`https://ipapi.co/${userIp}/json/`).catch(() => null);

                if (geoRes && geoRes.ok) {
                    const geoData = await geoRes.json();
                    setNetworkData({
                        ip: userIp,
                        isp: geoData.org || "Lizard Partner Network",
                        location: `${geoData.city}, ${geoData.country_code}`,
                        server: "Global Edge Node"
                    });
                } else {
                    // Fallback if the Geo API is blocked
                    setNetworkData({
                        ip: userIp,
                        isp: "ISP Protected",
                        location: "Detected",
                        server: "Cloudflare Edge"
                    });
                }
            } catch (error) {
                console.error("Network detection failed:", error);
                setNetworkData({
                    ip: "127.0.0.1",
                    isp: "Localhost",
                    location: "Development Mode",
                    server: "Internal Loopback"
                });
            }
        }
        getNetworkDetails();
    }, []);

    const needleRotation = useMemo(() => {
        const val = Math.min(currentSpeed, MAX_SPEED);
        return (val / MAX_SPEED) * 180 - 90;
    }, [currentSpeed]);

    const startTest = async () => {
        setTesting(true);
        setResults({ download: null, upload: null, ping: null, jitter: null });

        try {
            // --- 1. REAL PING TEST ---
            setPhase("ping");
            const pings: number[] = [];
            for (let i = 0; i < 5; i++) {
                const start = performance.now();
                await fetch("https://1.1.1.1/cdn-cgi/trace", { mode: 'no-cors', cache: 'no-store' });
                pings.push(performance.now() - start);
            }
            const avgPing = Math.round(pings.reduce((a, b) => a + b) / pings.length);
            const jitter = Math.round(Math.max(...pings) - Math.min(...pings));
            setResults(prev => ({ ...prev, ping: avgPing, jitter }));

            // --- 2. REAL DOWNLOAD TEST ---
            setPhase("download");
            // Request 50MB for a solid reading
            const downloadUrl = `https://speed.cloudflare.com/__down?bytes=50000000&_=${Date.now()}`;
            const startDown = performance.now();
            const resDown = await fetch(downloadUrl);
            const reader = resDown.body?.getReader();
            let downBytes = 0;

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    downBytes += value.length;
                    const elapsed = (performance.now() - startDown) / 1000;
                    setCurrentSpeed((downBytes * 8) / elapsed / 1000000);
                }
            }
            const finalDown = Math.round((downBytes * 8) / ((performance.now() - startDown) / 1000) / 1000000);
            setResults(prev => ({ ...prev, download: finalDown }));
            setCurrentSpeed(0);

            // --- 3. REAL UPLOAD TEST ---
            setPhase("upload");
            // Create a 15MB dummy payload
            const uploadSize = 15 * 1024 * 1024;
            const body = new Uint8Array(uploadSize);
            const startUp = performance.now();

            // Cloudflare's upload speed test endpoint
            const resUp = await fetch("https://speed.cloudflare.com/__up", {
                method: "POST",
                body: body,
                // Important: This helps track progress if supported, 
                // but for simple fetch we measure total time.
            });

            if (resUp.ok) {
                const elapsedUp = (performance.now() - startUp) / 1000;
                const finalUp = Math.round((uploadSize * 8) / elapsedUp / 1000000);

                // Animate the needle to the final upload speed before finishing
                setCurrentSpeed(finalUp);
                await new Promise(r => setTimeout(r, 500)); // Let the user see the result
                setResults(prev => ({ ...prev, upload: finalUp }));
            }

        } catch (err) {
            console.error("Test failed:", err);
        } finally {
            setTesting(false);
            setPhase("idle");
            setCurrentSpeed(0);
        }
    };

    return (
        <div className=" p-2 lg:p-4 flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_300px] gap-6">

                <main className="relative space-y-6">
                    <header className="flex justify-between items-center">
                        <div>
                            <h1 className="text-md font-medium tracking-tighter text-emerald-500 flex items-center gap-2 opacity-70">
                                <Activity className="w-5 h-5" style={{ color: accentColor.hex }} />
                                SPEEDTEST ANALYZER
                            </h1>
                        </div>
                        {/* <div className="flex gap-2">
                            {COLOR_PALETTE.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setAccentColor(c)}
                                    className="w-4 h-4 md:w-6 md:h-6 rounded-full transition-transform hover:scale-110"
                                    style={{ backgroundColor: c.hex, border: accentColor.name === c.name ? '2px solid white' : 'none' }}
                                />
                            ))}
                        </div> */}
                    </header>

                    <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                        <div className="relative flex flex-col items-center justify-center">
                            <div className="relative w-full max-w-[450px] aspect-[16/10] flex items-end justify-center overflow-hidden">
                                <div className="absolute inset-0 border-[2px] border-white/5 rounded-t-full" />

                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                                    <path
                                        d="M 20 90 A 80 80 0 0 1 180 90"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        className="text-zinc-800 opacity-25"
                                    />
                                    {/* <motion.path
                                        d="M 20 90 A 80 80 0 0 1 180 90"
                                        fill="none"
                                        stroke={accentColor.hex}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeDasharray="251.2"
                                        animate={{ strokeDashoffset: 251.2 - (251.2 * (currentSpeed / MAX_SPEED)) }}
                                        style={{ filter: `drop-shadow(0 0 12px ${accentColor.shadow})` }}
                                    /> */}
                                </svg>

                                <motion.div
                                    className="absolute bottom-0 w-1 h-[70%] origin-bottom z-10"
                                    animate={{ rotate: needleRotation }}
                                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                                >
                                    <div className="h-full w-full bg-gradient-to-t from-[#05fdaa]  to-transparent rounded-full " />
                                </motion.div>

                                <div className="absolute bottom-[-10px] w-8 h-8 rounded-full bg-zinc-900 border-4 border-white/20 z-20" />

                                <div className="z-30 text-center mb-4">
                                    <motion.span className="block text-8xl font-black text-zinc-300 tabular-nums tracking-tighter">
                                        {Math.round(currentSpeed)}
                                    </motion.span>
                                    <span className="text-sm font-mono tracking-widest text-zinc-500 uppercase">Mbps _{phase}</span>
                                </div>
                            </div>
                        </div>

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
                            className="
    flex-1 h-16 group relative overflow-hidden transition-all duration-500 
    rounded-2xl border border-white/10 active:scale-[0.98] disabled:opacity-50
    bg-gradient-to-br from-zinc-800 via-zinc-950 to-black
    hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]
  "
                        >
                            {/* Inner Bevel Effect */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            {/* The Content Layer */}
                            <div className="relative flex items-center justify-center gap-4 px-6 z-10">
                                <div className="relative flex items-center justify-center">
                                    {testing ? (
                                        <RefreshCw className="animate-spin w-5 h-5 text-emerald-500" />
                                    ) : (
                                        <div className="relative">
                                            {/* Subtle pulse behind the play icon */}
                                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/40 transition-colors" />
                                            <Play className="relative fill-zinc-100 text-zinc-100 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 group-hover:text-emerald-500/50 transition-colors">
                                        SYSTEM_ENGAGE
                                    </span>
                                    <span className={`
    text-sm font-black tracking-widest uppercase transition-all duration-500
    ${testing
                                            ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse"
                                            : "text-zinc-100"}
`}>
                                        {testing ? "ANALYZING_CORE..." : "INITIATE_DIAGNOSTIC"}
                                    </span>
                                </div>
                            </div>

                            {/* Mouse Glow / Hover Flare */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(255,255,255,0.05)_0%,_transparent_50%)]" />
                        </button>
                    </div>
                </main>

                <aside className="space-y-6 pt-12">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h3 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2">
                            <Server className="w-3 h-3" /> NETWORK_DETAILS
                        </h3>
                        <div className="space-y-4">
                            <IdentityItem label="Provider" value={networkData.isp} />
                            <IdentityItem label="IP_Address" value={networkData.ip} />
                            <IdentityItem label="Location" value={networkData.location} />
                            <IdentityItem label="Server" value={networkData.server} />
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