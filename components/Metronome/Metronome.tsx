"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Square, Activity, Waves, Cpu, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioVisualizer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const animationRef = useRef<number>();

    // Design Constants
    const ACCENT_COLOR = "#10b981"; // Emerald-500
    const BG_COLOR = "#080808";

    const startVisualizer = async () => {
        if (!audioCtx) {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = context.createAnalyser();
            const source = context.createMediaElementSource(audioRef.current!);

            analyser.fftSize = 128; // Lower for thicker, "brutalist" bars
            source.connect(analyser);
            analyser.connect(context.destination);

            setAudioCtx(context);
            draw(analyser);
        } else if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const draw = (analyser: AnalyserNode) => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationRef.current = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Clear with slight trail effect
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

                // Gradient logic: Dark emerald to bright volt
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, "#064e3b");
                gradient.addColorStop(1, ACCENT_COLOR);

                ctx.fillStyle = gradient;

                // Surgical Precision: Render bars with 2px gaps
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

                // Add a "cap" to each bar for a technical look
                if (barHeight > 5) {
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(x, canvas.height - barHeight - 2, barWidth - 2, 1);
                }

                x += barWidth;
            }
        };
        renderFrame();
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group font-sans">
            {/* HUD Status Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Cpu className={`w-3 h-3 ${isPlaying ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Visualizer.sys</h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter">
                        Input: {isPlaying ? 'Frequency_Stream' : 'Waiting_For_Signal'}
                    </p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Gain</span>
                        <div className="text-xl font-black text-white tabular-nums tracking-tighter">0.82</div>
                    </div>
                    <div className="text-[8px] text-zinc-700 uppercase font-mono">Decibel_Range_Calibration</div>
                </div>
            </div>

            {/* Main Visualizer Area */}
            <div className="relative mb-10 group/canvas">
                <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={160}
                    className="w-full h-40 bg-black/40 border border-zinc-800/50 rounded-sm relative z-10"
                />

                {/* Visual Metadata Overlays */}
                <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
                    <div className="h-0.5 w-4 bg-emerald-500/40" />
                    <div className="h-0.5 w-2 bg-emerald-500/20" />
                </div>
                <BarChart3 className="absolute bottom-2 right-2 w-4 h-4 text-emerald-500/20 z-20" />
            </div>

            {/* Controls */}
            <div className="space-y-6">
                <div className="flex gap-2">
                    <button
                        onClick={startVisualizer}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${isPlaying
                                ? 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                                : 'bg-white text-black hover:bg-emerald-500'
                            }`}
                    >
                        {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        {isPlaying ? 'Terminate_Stream' : 'Initialize_Signal'}
                    </button>
                </div>

                {/* Technical Diagnostics Footer */}
                <div className="grid grid-cols-3 gap-2 pt-6 border-t border-zinc-900/50">
                    {['Amplitude', 'Frequency', 'Latency'].map((stat) => (
                        <div key={stat} className="space-y-1">
                            <p className="text-[8px] text-zinc-600 uppercase font-mono">{stat}</p>
                            <div className="h-[2px] bg-zinc-900 w-full overflow-hidden">
                                <motion.div
                                    animate={isPlaying ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="h-full bg-emerald-500/40 w-1/2"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <audio ref={audioRef} src="/your-audio-file.mp3" crossOrigin="anonymous" />
        </div>
    );
}