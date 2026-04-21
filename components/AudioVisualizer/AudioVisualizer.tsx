'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Upload, ShieldAlert } from 'lucide-react';

type VisualMode = 'bars' | 'wave' | 'radial';

export default function AudioVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visualMode, setVisualMode] = useState<VisualMode>('bars');
    const [fileName, setFileName] = useState<string | null>(null);

    // Use a Ref for the mode so the drawing loop sees the change instantly without re-initializing
    const modeRef = useRef<VisualMode>('bars');

    useEffect(() => {
        modeRef.current = visualMode;
    }, [visualMode]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && audioRef.current) {
            const url = URL.createObjectURL(file);
            audioRef.current.src = url;
            setFileName(file.name);
            setIsPlaying(false);
        }
    };

    const startAudio = async () => {
        if (!audioRef.current?.src) return alert("INPUT_REQUIRED");

        if (!audioCtx) {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = context.createAnalyser();
            const source = context.createMediaElementSource(audioRef.current!);

            source.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;
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
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);

            // CRITICAL: Check the current mode inside the loop
            const currentMode = modeRef.current;

            if (currentMode === 'wave') {
                analyser.getByteTimeDomainData(dataArray);
            } else {
                analyser.getByteFrequencyData(dataArray);
            }

            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#10b981';
            ctx.fillStyle = '#10b981';

            if (currentMode === 'bars') {
                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] / 255) * canvas.height;
                    ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
                    x += barWidth;
                }
            }

            else if (currentMode === 'wave') {
                ctx.beginPath();
                const sliceWidth = canvas.width / bufferLength;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = (v * canvas.height) / 2;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                    x += sliceWidth;
                }
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
            }

            else if (currentMode === 'radial') {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = canvas.height / 5;
                for (let i = 0; i < bufferLength; i++) {
                    const angle = (i / bufferLength) * Math.PI * 2;
                    const v = dataArray[i] / 255;
                    const h = v * (canvas.height / 2);
                    const x1 = centerX + Math.cos(angle) * radius;
                    const y1 = centerY + Math.sin(angle) * radius;
                    const x2 = centerX + Math.cos(angle) * (radius + h);
                    const y2 = centerY + Math.sin(angle) * (radius + h);
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        };
        renderFrame();
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 border border-white/10 rounded-2xl bg-zinc-950 font-sans shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="space-y-4">
                    <div>
                        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] block mb-2">// Select_Protocol</span>
                        <div className="flex gap-1">
                            {(['bars', 'wave', 'radial'] as const).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setVisualMode(mode)}
                                    className={`text-[9px] px-3 py-1.5 border font-black uppercase tracking-tighter transition-all ${visualMode === mode
                                            ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10'
                                            : 'border-zinc-800 text-zinc-600 hover:border-zinc-700 active:bg-zinc-900'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest truncate max-w-[200px]">
                        {fileName || 'Signal_Idle'}
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                    <label className="flex items-center justify-center gap-2 px-4 py-3 border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-all">
                        <Upload className="w-3 h-3" />
                        Load
                        <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                    </label>

                    <button
                        onClick={startAudio}
                        className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isPlaying ? "bg-red-600 text-white" : "bg-emerald-500 text-black hover:bg-white"
                            }`}
                    >
                        {isPlaying ? "Halt" : "Init"}
                    </button>
                </div>
            </div>

            <div className="relative border border-zinc-900 bg-black aspect-video md:aspect-[3/1] mb-6">
                <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
                {!fileName && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20">
                        <ShieldAlert className="w-5 h-5 text-emerald-500" />
                        <span className="text-[8px] font-mono text-emerald-500 tracking-[0.5em]">Waiting_Signal</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                {['Sub', 'Mid', 'High'].map((label) => (
                    <div key={label} className="space-y-2">
                        <p className="text-[8px] font-mono text-zinc-600 uppercase">{label}_Range</p>
                        <div className="h-[1px] w-full bg-zinc-900">
                            {isPlaying && <div className="h-full bg-emerald-500/40 animate-pulse w-full" />}
                        </div>
                    </div>
                ))}
            </div>

            <audio ref={audioRef} hidden />
        </div>
    );
}