/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from "react";
import {
    Activity,
    Download,
    Upload,
    Clock,
    Wifi,
    Zap,
    Gauge,
    Play,
    RotateCcw,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Minus
} from "lucide-react";

type TestResult = {
    downloadSpeed: number | null;
    uploadSpeed: number | null;
    ping: number | null;
    jitter: number | null;
    timestamp: number;
};

type Rating = {
    label: string;
    color: string;
    bg: string;
    icon: any;
    description: string;
};

export function SpeedTest() {
    const [testing, setTesting] = useState(false);
    const [results, setResults] = useState<TestResult>({
        downloadSpeed: null,
        uploadSpeed: null,
        ping: null,
        jitter: null,
        timestamp: 0
    });
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"idle" | "ping" | "download" | "upload">("idle");

    // Test file URLs (using Cloudflare's speed test files)
    const downloadFileSizes = [1, 5, 10, 25]; // MB
    const uploadFileSizes = [1, 5]; // MB

    const measurePing = useCallback(async (): Promise<{ ping: number; jitter: number }> => {
        const pings: number[] = [];
        const pingCount = 5;

        for (let i = 0; i < pingCount; i++) {
            const start = performance.now();
            try {
                await fetch(`https://cdn.cloudflare.com/cdn-cgi/trace?_=${Date.now()}`, {
                    method: 'HEAD',
                    cache: 'no-store'
                });
                const end = performance.now();
                pings.push(end - start);
            } catch (error) {
                pings.push(100);
            }
        }

        const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
        const variance = pings.map(p => Math.pow(p - avgPing, 2)).reduce((a, b) => a + b, 0) / pings.length;
        const jitter = Math.sqrt(variance);

        return { ping: Math.round(avgPing), jitter: Math.round(jitter) };
    }, []);

    const measureDownloadSpeed = useCallback(async (): Promise<number> => {
        let totalBytes = 0;
        const startTime = performance.now();

        for (const sizeMB of downloadFileSizes) {
            const sizeBytes = sizeMB * 1024 * 1024;
            const url = `https://speed.cloudflare.com/__down?bytes=${sizeBytes}&_=${Date.now()}`;

            try {
                const response = await fetch(url, { cache: 'no-store' });
                const blob = await response.blob();
                totalBytes += blob.size;
            } catch (error) {
                console.error('Download test failed:', error);
            }
        }

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        const speedMbps = (totalBytes * 8) / (durationSeconds * 1024 * 1024);

        return Math.round(speedMbps);
    }, []);

    const measureUploadSpeed = useCallback(async (): Promise<number> => {
        let totalBytes = 0;
        const startTime = performance.now();

        for (const sizeMB of uploadFileSizes) {
            const sizeBytes = sizeMB * 1024 * 1024;
            // Generate random data for upload test
            const data = new Uint8Array(sizeBytes);
            for (let i = 0; i < sizeBytes; i++) {
                data[i] = Math.floor(Math.random() * 256);
            }
            const blob = new Blob([data]);

            try {
                const formData = new FormData();
                formData.append('file', blob);

                await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: formData,
                    cache: 'no-store'
                });
                totalBytes += sizeBytes;
            } catch (error) {
                console.error('Upload test failed:', error);
            }
        }

        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        const speedMbps = (totalBytes * 8) / (durationSeconds * 1024 * 1024);

        return Math.round(speedMbps);
    }, []);

    const getSpeedRating = (speed: number | null, type: "download" | "upload"): Rating => {
        if (!speed) return {
            label: "N/A",
            color: "text-zinc-500",
            bg: "bg-zinc-500/20",
            icon: Minus,
            description: "No data available"
        };

        if (type === "download") {
            if (speed >= 200) return {
                label: "EXCELLENT",
                color: "text-emerald-500",
                bg: "bg-emerald-500/20",
                icon: TrendingUp,
                description: "Ultra-fast fiber optic speeds. Perfect for 8K streaming, competitive gaming, and large file transfers."
            };
            if (speed >= 100) return {
                label: "VERY FAST",
                color: "text-emerald-400",
                bg: "bg-emerald-400/20",
                icon: TrendingUp,
                description: "Great for 4K streaming on multiple devices, online gaming, and remote work."
            };
            if (speed >= 50) return {
                label: "FAST",
                color: "text-green-500",
                bg: "bg-green-500/20",
                icon: TrendingUp,
                description: "Good for HD streaming, video calls, and fast downloads."
            };
            if (speed >= 25) return {
                label: "VERY FAIR",
                color: "text-blue-500",
                bg: "bg-blue-500/20",
                icon: TrendingUp,
                description: "Suitable for HD streaming on one device, browsing, and social media."
            };
            if (speed >= 10) return {
                label: "FAIR",
                color: "text-yellow-500",
                bg: "bg-yellow-500/20",
                icon: Minus,
                description: "Basic browsing, email, and standard definition video."
            };
            if (speed >= 5) return {
                label: "POOR",
                color: "text-orange-500",
                bg: "bg-orange-500/20",
                icon: TrendingDown,
                description: "Slow speeds. May buffer on video streaming and struggle with multiple devices."
            };
            return {
                label: "VERY POOR",
                color: "text-red-500",
                bg: "bg-red-500/20",
                icon: TrendingDown,
                description: "Very slow connection. Only suitable for basic messaging and light browsing."
            };
        } else {
            if (speed >= 100) return {
                label: "EXCELLENT",
                color: "text-emerald-500",
                bg: "bg-emerald-500/20",
                icon: TrendingUp,
                description: "Perfect for cloud backups, 4K video calls, and large file sharing."
            };
            if (speed >= 50) return {
                label: "VERY FAST",
                color: "text-emerald-400",
                bg: "bg-emerald-400/20",
                icon: TrendingUp,
                description: "Great for HD video calls, streaming, and fast file uploads."
            };
            if (speed >= 25) return {
                label: "FAST",
                color: "text-green-500",
                bg: "bg-green-500/20",
                icon: TrendingUp,
                description: "Good for video conferencing and photo sharing."
            };
            if (speed >= 10) return {
                label: "VERY FAIR",
                color: "text-blue-500",
                bg: "bg-blue-500/20",
                icon: TrendingUp,
                description: "Adequate for standard video calls and social media uploads."
            };
            if (speed >= 5) return {
                label: "FAIR",
                color: "text-yellow-500",
                bg: "bg-yellow-500/20",
                icon: Minus,
                description: "Basic upload speeds for messaging and email attachments."
            };
            if (speed >= 2) return {
                label: "POOR",
                color: "text-orange-500",
                bg: "bg-orange-500/20",
                icon: TrendingDown,
                description: "Slow uploads. May experience lag in video calls."
            };
            return {
                label: "VERY POOR",
                color: "text-red-500",
                bg: "bg-red-500/20",
                icon: TrendingDown,
                description: "Very slow upload. Not recommended for video calls or cloud backups."
            };
        }
    };

    const getPingRating = (ping: number | null): Rating => {
        if (!ping) return {
            label: "N/A",
            color: "text-zinc-500",
            bg: "bg-zinc-500/20",
            icon: Minus,
            description: "No data available"
        };

        if (ping < 20) return {
            label: "EXCELLENT",
            color: "text-emerald-500",
            bg: "bg-emerald-500/20",
            icon: TrendingUp,
            description: "Pro-level gaming performance. Instant response time."
        };
        if (ping < 50) return {
            label: "VERY GOOD",
            color: "text-emerald-400",
            bg: "bg-emerald-400/20",
            icon: TrendingUp,
            description: "Great for competitive gaming and real-time applications."
        };
        if (ping < 100) return {
            label: "GOOD",
            color: "text-green-500",
            bg: "bg-green-500/20",
            icon: Minus,
            description: "Suitable for casual gaming and video calls."
        };
        if (ping < 150) return {
            label: "VERY FAIR",
            color: "text-blue-500",
            bg: "bg-blue-500/20",
            icon: Minus,
            description: "Noticeable delay but acceptable for most activities."
        };
        if (ping < 200) return {
            label: "FAIR",
            color: "text-yellow-500",
            bg: "bg-yellow-500/20",
            icon: TrendingDown,
            description: "Higher latency. May affect gaming and real-time applications."
        };
        return {
            label: "POOR",
            color: "text-red-500",
            bg: "bg-red-500/20",
            icon: TrendingDown,
            description: "High latency. Poor experience for gaming and video calls."
        };
    };

    const startTest = async () => {
        // Reset results and show testing UI immediately
        setResults({
            downloadSpeed: null,
            uploadSpeed: null,
            ping: null,
            jitter: null,
            timestamp: 0
        });
        setTesting(true);
        setProgress(0);
        setPhase("ping");

        try {
            // Phase 1: Ping Test
            setPhase("ping");
            setProgress(10);
            const { ping, jitter } = await measurePing();
            setProgress(30);

            // Phase 2: Download Test
            setPhase("download");
            const downloadSpeed = await measureDownloadSpeed();
            setProgress(65);

            // Phase 3: Upload Test
            setPhase("upload");
            const uploadSpeed = await measureUploadSpeed();
            setProgress(100);

            setResults({
                downloadSpeed,
                uploadSpeed,
                ping,
                jitter,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error('Speed test failed:', error);
        } finally {
            setTesting(false);
            setPhase("idle");
            setProgress(0);
        }
    };

    const resetTest = () => {
        setResults({
            downloadSpeed: null,
            uploadSpeed: null,
            ping: null,
            jitter: null,
            timestamp: 0
        });
        setTesting(false);
        setProgress(0);
        setPhase("idle");
    };

    const formatTime = (timestamp: number) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    const downloadRating = getSpeedRating(results.downloadSpeed, "download");
    const uploadRating = getSpeedRating(results.uploadSpeed, "upload");
    const pingRating = getPingRating(results.ping);
    const DownloadIcon = downloadRating.icon;
    const UploadIcon = uploadRating.icon;
    const PingIcon = pingRating.icon;

    return (
        <div className="space-y-4">
            {/* Main Speed Gauge - Show testing UI when testing OR when no results */}
            {(testing || !results.downloadSpeed) ? (
                <div className="bg-gradient-to-br from-emerald-950/30 to-zinc-950 border border-emerald-500/20 rounded-2xl p-8 text-center">
                    <div className="mb-4">
                        <div className="inline-flex p-4 rounded-full bg-emerald-500/20 mb-4">
                            <Gauge size={48} className="text-emerald-500" />
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">Internet Speed Test</h3>
                    <p className="text-xs font-mono text-zinc-500 mb-6">
                        Test your download, upload speed and ping
                    </p>

                    {!testing ? (
                        <button
                            onClick={startTest}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-black font-black text-sm uppercase tracking-wider active:scale-95 transition"
                        >
                            <Play size={18} /> START TEST
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2">
                                <Activity size={20} className="text-emerald-500 animate-pulse" />
                                <span className="text-sm font-mono text-emerald-500 uppercase">
                                    {phase === "ping" && "MEASURING PING..."}
                                    {phase === "download" && "TESTING DOWNLOAD..."}
                                    {phase === "upload" && "TESTING UPLOAD..."}
                                </span>
                            </div>
                            <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Results Dashboard - Only shown when testing is complete AND we have results */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Download Speed */}
                        <div className={`rounded-2xl p-4 border ${downloadRating.bg} border-emerald-500/20`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Download size={16} className={downloadRating.color} />
                                    <span className="text-[10px] font-mono text-zinc-500">DOWNLOAD</span>
                                </div>
                                <DownloadIcon size={14} className={downloadRating.color} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white">{results.downloadSpeed}</span>
                                <span className="text-sm font-mono text-zinc-500">Mbps</span>
                            </div>
                            <div className="mt-2">
                                <span className={`text-[11px] font-black ${downloadRating.color}`}>
                                    {downloadRating.label}
                                </span>
                            </div>
                        </div>

                        {/* Upload Speed */}
                        <div className={`rounded-2xl p-4 border ${uploadRating.bg} border-emerald-500/20`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Upload size={16} className={uploadRating.color} />
                                    <span className="text-[10px] font-mono text-zinc-500">UPLOAD</span>
                                </div>
                                <UploadIcon size={14} className={uploadRating.color} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white">{results.uploadSpeed}</span>
                                <span className="text-sm font-mono text-zinc-500">Mbps</span>
                            </div>
                            <div className="mt-2">
                                <span className={`text-[11px] font-black ${uploadRating.color}`}>
                                    {uploadRating.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ping & Jitter */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`rounded-2xl p-4 border ${pingRating.bg} border-zinc-900`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className={pingRating.color} />
                                    <span className="text-[9px] font-mono text-zinc-500">PING</span>
                                </div>
                                <PingIcon size={12} className={pingRating.color} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white">{results.ping}</span>
                                <span className="text-xs font-mono text-zinc-500">ms</span>
                            </div>
                            <span className={`text-[9px] font-mono ${pingRating.color} mt-1 block`}>
                                {pingRating.label}
                            </span>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-emerald-500" />
                                <span className="text-[9px] font-mono text-zinc-500">JITTER</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white">{results.jitter}</span>
                                <span className="text-xs font-mono text-zinc-500">ms</span>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-600 mt-1 block">
                                {results.jitter && results.jitter < 10 ? "✓ Stable" : results.jitter && results.jitter < 30 ? "◔ Moderate" : "⚠ Unstable"}
                            </span>
                        </div>
                    </div>

                    {/* Rating Descriptions */}
                    <div className="space-y-2">
                        <div className={`rounded-xl p-3 border ${downloadRating.bg}`}>
                            <p className="text-[10px] font-mono text-zinc-400">
                                📥 <span className="text-white">Download:</span> {downloadRating.description}
                            </p>
                        </div>
                        <div className={`rounded-xl p-3 border ${uploadRating.bg}`}>
                            <p className="text-[10px] font-mono text-zinc-400">
                                📤 <span className="text-white">Upload:</span> {uploadRating.description}
                            </p>
                        </div>
                        <div className={`rounded-xl p-3 border ${pingRating.bg}`}>
                            <p className="text-[10px] font-mono text-zinc-400">
                                🎮 <span className="text-white">Ping:</span> {pingRating.description}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={startTest}
                            disabled={testing}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase tracking-wider active:scale-95 transition disabled:opacity-50"
                        >
                            <RotateCcw size={14} /> TEST AGAIN
                        </button>

                        <button
                            onClick={resetTest}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 active:scale-95 transition text-xs font-mono"
                        >
                            <RotateCcw size={14} /> RESET
                        </button>
                    </div>

                    {/* Timestamp */}
                    <div className="text-center">
                        <p className="text-[8px] font-mono text-zinc-600">
                            Last tested: {formatTime(results.timestamp)}
                        </p>
                    </div>
                </>
            )}

            {/* Info Box - Always visible */}
            <div className="bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-blue-500 mt-0.5" />
                    <div>
                        <h4 className="text-[10px] font-black text-blue-500 uppercase mb-1">SPEED RATINGS GUIDE</h4>
                        <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-zinc-500">
                            <div>⚡ <span className="text-emerald-500">Excellent</span> 200+ Mbps</div>
                            <div>🚀 <span className="text-emerald-400">Very Fast</span> 100-199 Mbps</div>
                            <div>✅ <span className="text-green-500">Fast</span> 50-99 Mbps</div>
                            <div>👍 <span className="text-blue-500">Very Fair</span> 25-49 Mbps</div>
                            <div>👌 <span className="text-yellow-500">Fair</span> 10-24 Mbps</div>
                            <div>⚠️ <span className="text-orange-500">Poor</span> 5-9 Mbps</div>
                            <div>❌ <span className="text-red-500">Very Poor</span> 0-4 Mbps</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Speed Recommendations */}
            <details className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                <summary className="px-4 py-3 flex items-center gap-2 cursor-pointer list-none">
                    <Wifi size={14} className="text-emerald-500" />
                    <span className="text-xs font-mono text-zinc-500 flex-1">RECOMMENDED SPEEDS BY ACTIVITY</span>
                    <span className="text-zinc-600 text-xs">▼</span>
                </summary>
                <div className="p-4 border-t border-zinc-900 space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">📧 Email / Basic Browsing</span>
                        <span className="text-emerald-500">5+ Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">🎵 Music Streaming</span>
                        <span className="text-emerald-500">10+ Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">📺 HD Video (1080p)</span>
                        <span className="text-emerald-500">25+ Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">🎮 Online Gaming</span>
                        <span className="text-emerald-500">50+ Mbps / &lt;50ms ping</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">🎬 4K Streaming</span>
                        <span className="text-emerald-500">50+ Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">🏢 Remote Work / Zoom</span>
                        <span className="text-emerald-500">25+ Mbps</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600">📁 Cloud Backups</span>
                        <span className="text-emerald-500">100+ Mbps upload</span>
                    </div>
                </div>
            </details>
        </div>
    );
}