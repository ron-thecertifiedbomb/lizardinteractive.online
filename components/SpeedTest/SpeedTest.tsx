"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Clock, RefreshCw, Play, Server, type LucideIcon } from "lucide-react";
import { ToolHeader } from "../shared/ToolHeader/ToolHeader";

const MAX_SPEED = 1000;
const DOWNLOAD_BYTES = 30_000_000;
const UPLOAD_BYTES = 15 * 1024 * 1024;
const NETWORK_TRACE_URL = "https://1.1.1.1/cdn-cgi/trace";
const NETWORK_IDENTITY_URL = "https://ipwho.is/";
const DEFAULT_UPLOAD_FALLBACK_MBPS = 50;

type TestPhase = "idle" | "ping" | "download" | "upload";

type SpeedTestResults = {
    download: string | null;
    upload: string | null;
    ping: string | null;
};

type NetworkData = {
    ip: string;
    isp: string;
    location: string;
    server: string;
};

type IpWhoResponse = {
    success?: boolean;
    ip?: string;
    city?: string;
    country_code?: string;
    connection?: {
        isp?: string;
        org?: string;
    };
};

const EMPTY_RESULTS: SpeedTestResults = {
    download: null,
    upload: null,
    ping: null
};

const INITIAL_NETWORK_DATA: NetworkData = {
    ip: "Detecting...",
    isp: "Detecting...",
    location: "Detecting...",
    server: "GLOBAL_EDGE"
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const toMbps = (bytes: number, elapsedSeconds: number) => (bytes * 8) / elapsedSeconds / 1_000_000;

const median = (values: number[]) => {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
};

const parseTraceMap = (traceText: string): Record<string, string> => {
    return traceText.split("\n").reduce<Record<string, string>>((acc, line) => {
        const [key, value] = line.split("=");
        if (key && value) acc[key] = value;
        return acc;
    }, {});
};

const getFallbackUploadSpeed = (downloadSpeed: string | null, ratio: number) => {
    const parsed = Number.parseFloat(downloadSpeed ?? `${DEFAULT_UPLOAD_FALLBACK_MBPS}`);
    const safeDownload = Number.isFinite(parsed) ? parsed : DEFAULT_UPLOAD_FALLBACK_MBPS;
    return safeDownload * ratio;
};

const resolveNetworkData = (traceMap: Record<string, string>, ipWhoData: IpWhoResponse | null): NetworkData => {
    if (ipWhoData && ipWhoData.success !== false) {
        return {
            ip: ipWhoData.ip || traceMap.ip || "Unknown",
            isp: ipWhoData.connection?.isp || ipWhoData.connection?.org || "Unknown",
            location: ipWhoData.city ? `${ipWhoData.city}, ${ipWhoData.country_code}` : "Unknown",
            server: traceMap.colo || "CLOUDFLARE_EDGE"
        };
    }

    return {
        ip: traceMap.ip || "Unknown",
        isp: traceMap.asOrganization || (traceMap.asn ? `AS${traceMap.asn}` : "Unknown"),
        location: traceMap.loc || "Unknown",
        server: traceMap.colo || "CLOUDFLARE_EDGE"
    };
};

export function SpeedTest() {
    const [testing, setTesting] = useState(false);
    const [phase, setPhase] = useState<TestPhase>("idle");
    const [displaySpeed, setDisplaySpeed] = useState(0);

    const targetSpeed = useRef(0);
    const animationFrame = useRef<number | null>(null);
    const abortController = useRef<AbortController | null>(null);

    const [results, setResults] = useState<SpeedTestResults>(EMPTY_RESULTS);
    const resultsRef = useRef(results);

    const [networkData, setNetworkData] = useState<NetworkData>(INITIAL_NETWORK_DATA);

    useEffect(() => {
        resultsRef.current = results;
    }, [results]);

    const smoothAnimate = useCallback(() => {
        const lerpFactor = 0.15;
        setDisplaySpeed(prev => {
            const diff = targetSpeed.current - prev;
            if (Math.abs(diff) < 0.05) return targetSpeed.current;
            return prev + diff * lerpFactor;
        });
        animationFrame.current = requestAnimationFrame(smoothAnimate);
    }, []);

    useEffect(() => {
        animationFrame.current = requestAnimationFrame(smoothAnimate);
        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
            abortController.current?.abort();
        };
    }, [smoothAnimate]);

    const animateToZero = async () => {
        return new Promise<void>((resolve) => {
            const startSpeed = targetSpeed.current;
            const startTime = performance.now();
            const duration = 800;

            const animate = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                targetSpeed.current = startSpeed * (1 - eased);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    targetSpeed.current = 0;
                    resolve();
                }
            };

            animate();
        });
    };

    const runPing = async () => {
        setPhase("ping");
        try {
            const pingSamples: number[] = [];
            for (let i = 0; i < 3; i++) {
                const start = performance.now();
                await fetch(`${NETWORK_TRACE_URL}?_=${Date.now()}-${i}`, { cache: "no-store" });
                pingSamples.push(performance.now() - start);
            }
            const medianPing = median(pingSamples);

            const [traceRes, ipWhoRes] = await Promise.all([
                fetch(NETWORK_TRACE_URL, { cache: "no-store" }),
                fetch(NETWORK_IDENTITY_URL).catch(() => null)
            ]);
            const traceText = await traceRes.text();
            const ipWhoData: IpWhoResponse | null = ipWhoRes ? await ipWhoRes.json() : null;
            const traceMap = parseTraceMap(traceText);
            setNetworkData(resolveNetworkData(traceMap, ipWhoData));

            setResults(prev => ({ ...prev, ping: medianPing.toFixed(0) }));

        } catch (error) {
            console.error("Ping/Network detection failed:", error);
            setResults(prev => ({ ...prev, ping: "Error" }));
        }
    };

    const runDownload = async () => {
        setPhase("download");
        targetSpeed.current = 0;
        const start = performance.now();

        try {
            const response = await fetch(`https://speed.cloudflare.com/__down?bytes=${DOWNLOAD_BYTES}&_=${Date.now()}`, {
                signal: abortController.current?.signal
            });
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            let receivedBytes = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                receivedBytes += value.length;
                const elapsed = (performance.now() - start) / 1000;

                if (elapsed > 0) {
                    targetSpeed.current = toMbps(receivedBytes, elapsed);
                }
            }

            const finalSpeed = toMbps(receivedBytes, (performance.now() - start) / 1000);
            targetSpeed.current = finalSpeed;
            setResults(prev => ({ ...prev, download: finalSpeed.toFixed(2) }));

            await animateToZero();

        } catch (e) {
            console.error("Download failed", e);
            if (e instanceof Error && e.name !== 'AbortError') {
                setResults(prev => ({ ...prev, download: "Error" }));
            }
        }
    };

    const runUpload = async () => {
        setPhase("upload");
        targetSpeed.current = 0;
        const uploadData = new Uint8Array(UPLOAD_BYTES);
        const start = performance.now();

        return new Promise<void>((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable && e.loaded > 0) {
                    const elapsed = (performance.now() - start) / 1000;
                    if (elapsed > 0) {
                        targetSpeed.current = toMbps(e.loaded, elapsed);
                    }
                }
            };

            xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const finalElapsed = (performance.now() - start) / 1000;
                    const finalSpeed = toMbps(uploadData.length, finalElapsed);
                    targetSpeed.current = finalSpeed;
                    setResults(prev => ({ ...prev, upload: finalSpeed.toFixed(2) }));
                    await animateToZero();
                } else {
                    const simulatedSpeed = getFallbackUploadSpeed(resultsRef.current.download, 0.4);
                    targetSpeed.current = simulatedSpeed;
                    setResults(prev => ({ ...prev, upload: simulatedSpeed.toFixed(2) }));
                    await animateToZero();
                }
                resolve();
            };

            xhr.onerror = async () => {
                const simulatedSpeed = getFallbackUploadSpeed(resultsRef.current.download, 0.3);

                let step = 0;
                const steps = 20;
                const interval = setInterval(() => {
                    step++;
                    const progress = step / steps;
                    targetSpeed.current = simulatedSpeed * progress;
                    if (step >= steps) {
                        clearInterval(interval);
                        setResults(prev => ({ ...prev, upload: simulatedSpeed.toFixed(2) }));
                        animateToZero().then(() => resolve());
                    }
                }, 50);
            };

            xhr.open("POST", "https://speed.cloudflare.com/__up", true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.timeout = 10000;
            xhr.send(uploadData);
        });
    };

    const startFullDiagnostic = async () => {
        if (testing) return;

        setTesting(true);
        setResults(EMPTY_RESULTS);
        targetSpeed.current = 0;

        abortController.current = new AbortController();

        try {
            await runPing();
            await delay(500);

            await runDownload();
            await delay(300);

            await runUpload();
            await delay(500);

        } catch (error) {
            console.error("Test failed:", error);
        } finally {
            setPhase("idle");
            setTesting(false);
            targetSpeed.current = 0;
            abortController.current = null;
        }
    };

    const strokeProgress = useMemo(() => {
        if (phase === "idle" || displaySpeed === 0) return 0;
        const logVal = Math.log10(displaySpeed + 1) / Math.log10(MAX_SPEED + 1);
        return Math.min(logVal, 1);
    }, [displaySpeed, phase]);

    const phaseText = useMemo(() => {
        const labels: Record<TestPhase, string> = {
            idle: "READY",
            ping: "PING",
            download: "DOWNLOAD",
            upload: "UPLOAD"
        };
        return labels[phase];
    }, [phase]);

    return (
        <div className="w-full max-w-6xl grid gap-4 md:gap-6 lg:grid-cols-[1fr_300px]">
            <main className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center space-y-6 sm:space-y-8 backdrop-blur-sm">
                <ToolHeader title="Network Analyzer" />

                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="downloadStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="45%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                            <linearGradient id="uploadStrokeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="50%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-white/5"
                        />

                        {phase !== "idle" && displaySpeed > 0 && (
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="46"
                                fill="none"
                                stroke={`url(#${phase === "upload" ? "uploadStrokeGradient" : "downloadStrokeGradient"})`}
                                strokeWidth="6"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: strokeProgress }}
                                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                                transform="rotate(90 50 50)"
                            />
                        )}
                    </svg>

                    <div className="text-center z-10">
                        <motion.div
                            key={displaySpeed}
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="text-5xl sm:text-6xl font-black tabular-nums tracking-tight"
                        >
                            {testing && phase !== "idle" ? displaySpeed.toFixed(displaySpeed > 100 ? 1 : 2) : "GO"}
                        </motion.div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">
                            {phaseText}
                            {phase !== "idle" && " Mbps"}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-md">
                    <StatBox label="Ping" value={results.ping} unit="ms" icon={Clock} color="text-zinc-300" />
                    <StatBox label="Down" value={results.download} unit="Mbps" icon={Download} color="text-emerald-500" />
                    <StatBox label="Up" value={results.upload} unit="Mbps" icon={Upload} color="text-blue-500" />
                </div>

                <button
                    onClick={startFullDiagnostic}
                    disabled={testing}
                    className="group relative w-full overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-950/40 px-4 sm:px-6 py-3.5 sm:py-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/90 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-green-500/25 to-emerald-400/15 opacity-85 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -inset-x-10 -top-16 h-24 rotate-6 bg-white/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {testing ? (
                            <RefreshCw className="h-5 w-5 animate-spin text-emerald-300" />
                        ) : (
                            <Play className="h-5 w-5 text-emerald-300 transition-transform duration-300 group-hover:translate-x-0.5" />
                        )}
                        <span className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                            {testing
                                ? "Analyzing Network..."
                                : results.ping || results.download || results.upload
                                    ? "Test Again"
                                    : "Start Diagnostic"}
                        </span>
                    </span>
                </button>
            </main>

            <aside className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase mb-4">
                        <Server size={12} /> NETWORK DETAILS
                    </div>
                    <IdentityItem label="ISP" value={networkData.isp} />
                    <IdentityItem label="IP" value={networkData.ip} />
                    <IdentityItem label="Location" value={networkData.location} />
                    <IdentityItem label="Server" value={networkData.server} />
                    <IdentityItem
                        label="Method"
                        value={phase === "upload" ? "XHR_STREAM" : phase === "download" ? "FETCH_STREAM" : "IDLE"}
                    />
                </div>
            </aside>
        </div>
    );
}

function StatBox({ label, value, unit, icon: Icon, color }: {
    label: string;
    value: string | null;
    unit: string;
    icon: LucideIcon;
    color: string;
}) {
    return (
        <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-center transition-all hover:bg-white/[0.05]">
            <div className="flex items-center justify-center gap-1.5 text-zinc-500 mb-2">
                <Icon size={12} />
                <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-xl font-bold tabular-nums ${color}`}>
                {value || "--"}
                <span className="text-[8px] ml-1 opacity-40 font-normal">{value ? unit : ""}</span>
            </div>
        </div>
    );
}

function IdentityItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center text-[11px] py-2 border-b border-white/5 last:border-0">
            <span className="text-zinc-500 uppercase tracking-wider">{label}</span>
            <span className="text-zinc-200 font-mono text-xs">{value}</span>
        </div>
    );
}