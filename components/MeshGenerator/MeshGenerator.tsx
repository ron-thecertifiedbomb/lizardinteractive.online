"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Download, RefreshCcw, Terminal, Activity } from "lucide-react";
import { generateMeshCSS } from '../../utils/gradientEngine';
import { motion, AnimatePresence } from 'framer-motion';

export default function MeshGenerator() {
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

    const updatePoint = (id: string, updates: any) => {
        setPoints(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const handleExport8K = async () => {
        setIsRendering(true);
        await new Promise(r => setTimeout(r, 100));
        const canvas = document.createElement('canvas');
        canvas.width = 7680; canvas.height = 4320;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'hard-light';
        points.forEach(p => {
            const angle = Math.atan2(p.y - 50, p.x - 50);
            const x2 = canvas.width / 2 + Math.cos(angle) * canvas.width;
            const y2 = canvas.height / 2 + Math.sin(angle) * canvas.height;
            const gradient = ctx.createLinearGradient((p.x / 100) * canvas.width, (p.y / 100) * canvas.height, x2, y2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        for (let i = 0; i < 50000; i++) {
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }

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
        <div className="min-h-screen bg-black text-zinc-400 font-mono selection:bg-emerald-500 selection:text-black">
            {/* MOBILE-FIRST CONTAINER */}
            <main className="max-w-2xl mx-auto flex flex-col">

                {/* 1. VISUAL FIELD (TOP STICKY-READY) */}
                <section className="relative w-full aspect-square md:aspect-video bg-[#050505] border-b border-zinc-900 overflow-hidden shadow-2xl">
                    <div style={meshStyle as any} className="w-full h-full transition-all duration-700 ease-in-out" />
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* HUD OVERLAY */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/5">
                        <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Live_Field_Synthesis</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/5">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">8K_READY</span>
                    </div>

                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
                </section>

                {/* 2. CORE ACTIONS (QUICK ACCESS) */}
                <section className="p-4 grid grid-cols-2 gap-3 bg-zinc-950/50 border-b border-zinc-900">
                    <button onClick={copyCSS} className="flex items-center justify-center gap-2 py-4 bg-zinc-900 border border-zinc-800 rounded-sm text-[9px] font-black uppercase tracking-widest hover:border-emerald-500/50 transition-all">
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        {copied ? "COPIED" : "Copy_CSS"}
                    </button>
                    <button onClick={handleExport8K} disabled={isRendering} className="flex items-center justify-center gap-2 py-4 bg-emerald-600 text-black rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-emerald-400 disabled:bg-zinc-800 transition-all shadow-lg">
                        {isRendering ? <RefreshCcw size={14} className="animate-spin" /> : <Download size={14} />}
                        {isRendering ? "RENDER" : "Export_8K"}
                    </button>
                </section>

                {/* 3. PARAMETER CONTROL CENTER */}
                <section className="p-6 space-y-8">
                    {/* MASTER VOID CONTROL */}
                    <div className="bg-zinc-900/20 border border-zinc-800 p-4 rounded-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3 h-3 text-zinc-600" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Master_Void_Color</span>
                        </div>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-6 bg-transparent border-none cursor-pointer" />
                    </div>

                    {/* SIGNAL NODES */}
                    <div className="space-y-4">
                        <AnimatePresence>
                            {points.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-sm group hover:border-zinc-700 transition-colors"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <span className="text-[9px] font-black tracking-tighter uppercase">Signal_Node_0{i + 1}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input type="color" value={p.color} onChange={(e) => updatePoint(p.id, { color: e.target.value })} className="w-5 h-5 bg-transparent cursor-pointer" />
                                            {points.length > 1 && (
                                                <button onClick={() => setPoints(points.filter(pt => pt.id !== p.id))} className="text-zinc-700 hover:text-red-500 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[7px] text-zinc-600 uppercase tracking-widest font-bold">
                                                <span>Vector_X_Axis</span>
                                                <span className="text-zinc-400">{p.x}%</span>
                                            </div>
                                            <input type="range" min="0" max="100" value={p.x} onChange={(e) => updatePoint(p.id, { x: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-800 appearance-none rounded-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[7px] text-zinc-600 uppercase tracking-widest font-bold">
                                                <span>Vector_Y_Axis</span>
                                                <span className="text-zinc-400">{p.y}%</span>
                                            </div>
                                            <input type="range" min="0" max="100" value={p.y} onChange={(e) => updatePoint(p.id, { y: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-800 appearance-none rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ADD NODE BUTTON */}
                    <button
                        onClick={() => setPoints([...points, { id: Date.now().toString(), color: '#ffffff', x: 50, y: 50, size: 100 }])}
                        className="w-full py-5 border border-dashed border-zinc-800 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2"
                    >
                        <Plus size={14} /> Inject_Signal_Point
                    </button>
                </section>

                {/* FOOTER METRICS */}
                <footer className="p-12 border-t border-zinc-900 flex flex-col items-center gap-4 opacity-30">
                    <div className="text-[7px] font-mono tracking-[0.5em] text-zinc-500 uppercase">System.Lizard.Mesh_Engine v4.0.2</div>
                </footer>
            </main>
        </div>
    );
}