'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const startAudio = () => {
        if (!audioCtx) {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = context.createAnalyser();
            const source = context.createMediaElementSource(audioRef.current!);

            source.connect(analyser);
            analyser.connect(context.destination);

            // Set precision: higher = more bars
            analyser.fftSize = 256;
            setAudioCtx(context);
            draw(analyser);
        }

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const draw = (analyser: AnalyserNode) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            // Deep Space background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;

                // Lizard Green gradient logic
                ctx.fillStyle = `rgb(0, ${dataArray[i] + 100}, 65)`;

                // Surgical Precision rendering (1px gaps)
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
                x += barWidth;
            }
        };
        renderFrame();
    };

    return (
        <div className="p-8 border border-white/10 rounded-3xl bg-zinc-950 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">// Input Monitoring</span>
                    <h2 className="text-xl font-bold text-white uppercase">Frequency Analysis</h2>
                </div>
                <button
                    onClick={startAudio}
                    className="px-6 py-2 bg-emerald-500 text-black text-xs font-black uppercase rounded-full hover:bg-white transition-colors"
                >
                    {isPlaying ? "HALT SYSTEM" : "INITIALIZE"}
                </button>
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="w-full h-40 rounded-xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
            />

            <audio ref={audioRef} src="/your-audio-file.mp3" />

            <div className="mt-4 grid grid-cols-3 gap-4">
                {['Sub-Bass', 'Mid-Range', 'High-Freq'].map((label) => (
                    <div key={label} className="border-t border-white/5 pt-2">
                        <p className="text-[8px] font-mono text-zinc-500 uppercase">{label}</p>
                        <div className="h-1 w-full bg-zinc-900 mt-1 overflow-hidden">
                            <div className="h-full bg-emerald-500/50 animate-pulse w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}