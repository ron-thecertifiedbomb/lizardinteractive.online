/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Clock, RefreshCw, Play, Server } from "lucide-react";
import { ToolHeader } from "../shared/ToolHeader/ToolHeader";

const MAX_SPEED = 1000;

export function SpeedTest() {
    const [testing, setTesting] = useState(false);
    const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload">("idle");
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [results, setResults] = useState({ download: null, upload: null, ping: null } as any);

    // Updated initial state
    const [networkData, setNetworkData] = useState({
        ip: "IDENTIFYING...",
        isp: "LOCALIZING...",
        location: "OPTIMAL",
        server: "GLOBAL_EDGE"
    });

    const progress = useMemo(() => {
        const logVal = Math.log10(currentSpeed + 1) / Math.log10(MAX_SPEED + 1);
        return Math.min(logVal, 1);
    }, [currentSpeed]);

    const startTest = async () => {
        if (testing) return;
        setTesting(true);
        setCurrentSpeed(0);
        setResults({ download: null, upload: null, ping: null });

        try {
            // 1. PING & NETWORK DATA (FETCHING REAL ISP/IP)
            setPhase("ping");
            const start = performance.now();

            // We fetch from ip-api for better ISP naming
            const [traceRes, geoRes] = await Promise.all([
                fetch("https://1.1.1.1/cdn-cgi/trace", { cache: 'no-store' }),
                fetch("http://ip-api.com/json/").catch(() => null) // Fallback handled below
            ]);

            const traceText = await traceRes.text();
            const geoData = geoRes ? await geoRes.json() : null;

            // Parse Cloudflare Trace for Server/Location info
            const traceMap: any = {};
            traceText.split("\n").forEach(line => {
                const [k, v] = line.split("=");
                if (k && v) traceMap[k] = v;
            });

            // Set Network Details using the better API data
            setNetworkData({
                ip: geoData?.query || traceMap.ip || "UNKNOWN",
                isp: geoData?.isp || traceMap.aslo || "DETECTED",
                location: geoData?.city || traceMap.loc || "OPTIMAL",
                server: traceMap.colo || "GLOBAL_EDGE"
            });

            const pingTime = (performance.now() - start).toFixed(2);
            setResults((prev: any) => ({ ...prev, ping: pingTime }));

            // 2. DOWNLOAD
            setPhase("download");
            const downStart = performance.now();
            const resDown = await fetch(`https://speed.cloudflare.com/__down?bytes=25000000&_=${Date.now()}`);
            const reader = resDown.body?.getReader();
            let downBytes = 0;
            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    downBytes += value.length;
                    const elapsed = (performance.now() - downStart) / 1000;
                    setCurrentSpeed((downBytes * 8) / elapsed / 1000000);
                }
            }
            const finalDown = ((downBytes * 8) / ((performance.now() - downStart) / 1000) / 1000000).toFixed(2);
            setResults((prev: any) => ({ ...prev, download: finalDown }));

            // 3. UPLOAD
            setPhase("upload");
            const upStart = performance.now();
            const body = new Uint8Array(5 * 1024 * 1024);
            const resUp = await fetch("https://speed.cloudflare.com/__up", { method: "POST", body });

            if (resUp.ok) {
                const elapsed = (performance.now() - upStart) / 1000;
                const finalUp = ((body.length * 8) / elapsed / 1000000).toFixed(2);
                setCurrentSpeed(parseFloat(finalUp));
                setResults((prev: any) => ({ ...prev, upload: finalUp }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setTesting(false);
            setPhase("idle");
            setCurrentSpeed(0);
        }
    };

    // ... The rest of your return() and StatBox components remain exactly the same
    return (
        <div className="w-full max-w-6xl grid lg:grid-cols-[1fr_300px] gap-6">
            <main className="bg-white/5 relative space-y-6">
                <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl px-4 py-4 flex flex-col items-center">
                    <ToolHeader title="SpeedTest Analyzer" />
                    <div className="relative w-72 h-72 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full rotate-[90deg]" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#27272a" strokeWidth="8" />
                            <motion.circle
                                cx="100" cy="100" r="90" fill="none" stroke="url(#arcGradient)"
                                strokeWidth="8" strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress }}
                                transition={{ ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#4ade80" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center z-10">
                            <div className="text-6xl font-black text-white">
                                {testing || currentSpeed > 0 ? currentSpeed.toFixed(2) : "GO"}
                            </div>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">
                                {phase === "idle" ? "System Ready" : phase}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full mt-8 max-w-lg h-[96px] overflow-hidden">
                        <StatBox label="Ping" value={results.ping} unit="ms" icon={Clock} />
                        <StatBox label="Download" value={results.download} unit="Mbps" icon={Download} />
                        <StatBox label="Upload" value={results.upload} unit="Mbps" icon={Upload} />
                    </div>
                </div>
                <button onClick={startTest} disabled={testing} className="w-full h-16 rounded-2xl border border-white/10 bg-zinc-900/20 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-3">
                    {testing ? <RefreshCw className="animate-spin w-5 h-5 text-emerald-500" /> : <Play className="w-5 h-5" />}
                    <span className="font-bold tracking-widest uppercase">{testing ? "Analyzing..." : "Start Diagnostic"}</span>
                </button>
            </main>
            <aside className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-[10px] font-mono text-zinc-500 mb-4 flex items-center gap-2"><Server className="w-3 h-3" /> NETWORK_DETAILS</h3>
                    <IdentityItem label="ISP" value={networkData.isp} />
                    <IdentityItem label="IP" value={networkData.ip} />
                </div>
            </aside>
        </div>
    );
}

function StatBox({ label, value, unit, icon: Icon }: any) {
    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-zinc-500"><Icon className="w-3 h-3" /><span className="text-[9px] uppercase">{label}</span></div>
            <div className="font-bold text-lg">{value || '--'} <span className="text-[10px] text-zinc-600">{unit}</span></div>
        </div>
    );
}

function IdentityItem({ label, value }: any) {
    return (
        <div className="flex justify-between py-2 border-b border-white/5 last:border-0"><span className="text-[10px] text-zinc-600 uppercase">{label}</span><span className="text-xs font-medium text-zinc-300">{value}</span></div>
    );
}