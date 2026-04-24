/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Download, RefreshCcw, Terminal, Activity, Zap, ShieldCheck } from "lucide-react";
import { generateMeshCSS } from '../../utils/gradientEngine';
import { AnimatePresence, motion } from 'framer-motion';
import { Panel } from "../shared/Panel/Panel";
import { ToolHeader } from "../shared/ToolHeader/ToolHeader";

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
        const link = document.createElement('a');
        link.download = `Lizard_Signal_8K_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        setIsRendering(false);
    };

    return (
        <Panel as="main" className="p-0 flex flex-col h-[92vh] max-w-xl mx-auto overflow-hidden border-none sm:border sm:p-4">
            <div className="p-4 sm:p-0">
                <ToolHeader title="Mesh Engine" />
            </div>

            {/* STICKY MONITOR ZONE */}
            <div className="sticky top-0 z-30 p-4 space-y-4 border-b border-zinc-900/50 ">
                {/* HUD STATUS */}
                <div className="w-full bg-gradient-to-r from-emerald-950/30 to-zinc-950 border border-emerald-500/20 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Synthesis</span>
                            <span className="text-lg font-black text-white tabular-nums tracking-tighter">
                                {isRendering ? "RENDER" : "LIVE_FIELD"}
                            </span>
                        </div>
                        <Activity className={`w-5 h-5 ${isRendering ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                    </div>
                </div>

                {/* CANVAS WORKBENCH */}
                <div className="w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                        <div style={meshStyle as any} className="w-full h-full transition-all duration-700 ease-in-out" />
                        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Frame Accents */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20" />
                    </div>
                </div>

                {/* QUICK ACTIONS GRID */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => {
                        navigator.clipboard.writeText(`background-color: ${meshStyle.backgroundColor};\nbackground-image: ${meshStyle.backgroundImage};\nbackground-blend-mode: ${meshStyle.backgroundBlendMode};`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }} className="flex items-center justify-center gap-2 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 active:scale-95 transition-all">
                        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        {copied ? "COPIED" : "Copy_CSS"}
                    </button>
                    <button onClick={handleExport8K} disabled={isRendering} className="flex items-center justify-center gap-2 py-3 bg-emerald-500 text-black rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 disabled:bg-zinc-800 transition-all">
                        {isRendering ? <RefreshCcw size={12} className="animate-spin" /> : <Download size={12} />}
                        {isRendering ? "ENCODING" : "Export_8K"}
                    </button>
                </div>
            </div>

            {/* SCROLLABLE CONTROL ZONE */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 pb-24">
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal size={14} className="text-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Base_Void</span>
                    </div>
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-6 bg-transparent border-none cursor-pointer" />
                </div>

                <div className="space-y-3">
                    <AnimatePresence>
                        {points.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden focus-within:border-emerald-500/30 transition-colors"
                            >
                                <div className="flex justify-between items-center mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[10px] font-mono text-white uppercase font-bold">Signal_Node_0{i + 1}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={p.color} onChange={(e) => updatePoint(p.id, { color: e.target.value })} className="w-5 h-5 bg-transparent cursor-pointer" />
                                        <button onClick={() => setPoints(points.filter(pt => pt.id !== p.id))} className="text-zinc-700 hover:text-red-500"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase font-bold"><span>Vector_X</span><span className="text-emerald-500">{p.x}%</span></div>
                                        <input type="range" min="0" max="100" value={p.x} onChange={(e) => updatePoint(p.id, { x: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-900 appearance-none rounded-full cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase font-bold"><span>Vector_Y</span><span className="text-emerald-500">{p.y}%</span></div>
                                        <input type="range" min="0" max="100" value={p.y} onChange={(e) => updatePoint(p.id, { y: parseInt(e.target.value) })} className="w-full accent-emerald-500 h-1 bg-zinc-900 appearance-none rounded-full cursor-pointer" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => setPoints([...points, { id: Date.now().toString(), color: '#ffffff', x: 50, y: 50, size: 100 }])}
                    className="w-full py-5 border border-dashed border-zinc-800 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/30 transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] active:scale-95"
                >
                    <Plus size={14} className="inline mr-2" /> Inject_Signal_Node
                </button>
            </div>

            {/* FIXED FOOTER */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <div className="flex justify-between items-center opacity-30 pt-4 border-t border-zinc-900">
                    <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest italic">Lizard.Mesh_Engine.v4</span>
                    <ShieldCheck size={12} className="text-zinc-800" />
                </div>
            </div>
        </Panel>
    );
}