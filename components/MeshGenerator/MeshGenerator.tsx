"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Zap, Download, RefreshCcw } from "lucide-react";
import { generateMeshCSS } from '../../utils/gradientEngine';

export default function MeshGenerator() {
    // --- STATE ---
    const [bgColor, setBgColor] = useState("#080808");
    const [copied, setCopied] = useState(false);
    const [isRendering, setIsRendering] = useState(false);
    const [points, setPoints] = useState([
        { id: '1', color: '#10b981', x: 0, y: 0, size: 100 },
        { id: '2', color: '#3b82f6', x: 100, y: 0, size: 100 },
        { id: '3', color: '#8b5cf6', x: 100, y: 100, size: 100 },
        { id: '4', color: '#f59e0b', x: 0, y: 100, size: 100 },
    ]);

    const meshStyle = generateMeshCSS(points, bgColor);

    // --- LOGIC: UPDATE NODE ---
    const updatePoint = (id: string, updates: any) => {
        setPoints(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    // --- LOGIC: 8K CANVAS RENDERER ---
    const handleExport8K = async () => {
        setIsRendering(true);
        // Small delay to allow the UI "Rendering" state to trigger
        await new Promise(r => setTimeout(r, 100));

        const canvas = document.createElement('canvas');
        canvas.width = 7680;
        canvas.height = 4320;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 1. Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Blend Layer (Simulating CSS hard-light)
        ctx.globalCompositeOperation = 'hard-light';
        points.forEach(p => {
            const angle = Math.atan2(p.y - 50, p.x - 50);
            const x2 = canvas.width / 2 + Math.cos(angle) * canvas.width;
            const y2 = canvas.height / 2 + Math.sin(angle) * canvas.height;

            const gradient = ctx.createLinearGradient(
                (p.x / 100) * canvas.width,
                (p.y / 100) * canvas.height,
                x2, y2
            );
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        // 3. 8K Grain Overlay
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        for (let i = 0; i < 100000; i++) {
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }

        // 4. Download Trigger
        const link = document.createElement('a');
        link.download = `Lizard_Signal_8K_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        setIsRendering(false);
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(`background-color: ${meshStyle.backgroundColor};\nbackground-image: ${meshStyle.backgroundImage};\nbackground-blend-mode: ${meshStyle.backgroundBlendMode};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 font-mono selection:bg-emerald-500 selection:text-black">
            <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* --- PREVIEW SECTION --- */}
                <div className="flex-1 w-full space-y-6">
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                        <div
                            style={meshStyle as any}
                            className="w-full aspect-video transition-all duration-1000 ease-in-out"
                        />
                        {/* NOISE TEXTURE */}
                        <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay bg-[url('/noise.svg')]" />

                        <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5 shadow-2xl">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">System.Full_Field_Synthesis</span>
                        </div>
                    </div>

                    {/* DUAL ACTION BUTTONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={copyCSS}
                            className="flex items-center justify-center gap-3 py-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? "BUFFER_COPIED" : "COPY_SYSTEM_CSS"}
                        </button>

                        <button
                            onClick={handleExport8K}
                            disabled={isRendering}
                            className="flex items-center justify-center gap-3 py-5 bg-emerald-600 text-black rounded-2xl hover:bg-emerald-400 disabled:bg-zinc-900 disabled:text-zinc-700 transition-all text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                        >
                            {isRendering ? <RefreshCcw className="animate-spin" size={16} /> : <Download size={16} />}
                            {isRendering ? "RENDERING_8K_BUFFER..." : "EXPORT_HIGH_RES_8K"}
                        </button>
                    </div>

                    {/* CODE DEBUG VIEW */}
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900 shadow-inner group">
                        <p className="text-zinc-700 text-[9px] mb-4 uppercase font-black tracking-[0.4em]">Matrix_Debug_Output</p>
                        <pre className="text-[10px] font-mono text-zinc-600 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-32 scrollbar-hide">
                            {meshStyle.backgroundImage}
                        </pre>
                    </div>
                </div>

                {/* --- CONTROLS SECTION --- */}
                <div className="w-full lg:w-[400px] space-y-4">
                    <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl mb-6">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">Master_Void_Level</span>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 bg-transparent cursor-pointer rounded-lg overflow-hidden border-none" />
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {points.map((p, i) => (
                            <div key={p.id} className="p-5 bg-black/40 border border-zinc-900 rounded-2xl hover:border-emerald-500/30 transition-all group">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500" />
                                        <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">SIGNAL_NODE_0{i + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <input type="color" value={p.color} onChange={(e) => updatePoint(p.id, { color: e.target.value })} className="w-6 h-6 bg-transparent cursor-pointer" />
                                        {points.length > 1 && (
                                            <button onClick={() => setPoints(points.filter(pt => pt.id !== p.id))} className="text-zinc-800 hover:text-rose-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[8px] text-zinc-600 uppercase"><span>Vector_X</span><span>{p.x}%</span></div>
                                        <input type="range" min="0" max="100" value={p.x} onChange={(e) => updatePoint(p.id, { x: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-900 appearance-none rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[8px] text-zinc-600 uppercase"><span>Vector_Y</span><span>{p.y}%</span></div>
                                        <input type="range" min="0" max="100" value={p.y} onChange={(e) => updatePoint(p.id, { y: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-900 appearance-none rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setPoints([...points, { id: Date.now().toString(), color: '#ffffff', x: 50, y: 50, size: 100 }])}
                        className="w-full py-4 mt-4 border border-dashed border-zinc-800 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/50 transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2"
                    >
                        <Plus size={14} /> Inject_Signal_Point
                    </button>
                </div>
            </div>
        </div>
    );
}