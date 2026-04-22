'use client';

import React, { useState } from "react";
import { Copy, Layers, Palette, Terminal, Check, Activity } from "lucide-react";


export default function BoxShadowGenerator() {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(0);
    const [r, setR] = useState(16);
    const [g, setG] = useState(185);
    const [b, setB] = useState(129);
    const [a, setA] = useState(0.4);
    const [copied, setCopied] = useState(false);

    const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${a})`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${shadow};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-screen bg-black text-zinc-400 font-sans overflow-hidden">

            {/* 1. FIXED VIEWPORT (TOP 40%) */}
            <div className="h-[40vh] min-h-[280px] w-full bg-[#050505] border-b border-zinc-900 flex flex-col relative shrink-0">
                <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                           Box Shadow Generator
                        </h2>
                    </div>
                    <Activity className="w-4 h-4 text-emerald-500 opacity-50" />
                </div>

                <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:24px_24px]">
                    <div
                        className="w-24 h-24 bg-white rounded-sm transition-all duration-75"
                        style={{ boxShadow: shadow }}
                    />

                    {/* Decorative HUD corners */}
                    <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-zinc-800" />
                    <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-zinc-800" />
                </div>
            </div>

            {/* 2. SCROLLABLE CONTROLS (BOTTOM 60%) */}
            <div className="flex-1 overflow-y-auto bg-black custom-scrollbar">
                <div className="max-w-2xl mx-auto p-6 space-y-12 pb-32">

                    {/* GEOMETRY BLOCK */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                            <Terminal className="w-3 h-3 text-emerald-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-200">
                                Geometry_Parameters
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                            <Range label="X_Offset" value={hOffset} min={-100} max={100} onChange={setHOffset} unit="px" />
                            <Range label="Y_Offset" value={vOffset} min={-100} max={100} onChange={setVOffset} unit="px" />
                            <Range label="Blur_Radius" value={blur} min={0} max={200} onChange={setBlur} unit="px" />
                            <Range label="Spread_Field" value={spread} min={-50} max={100} onChange={setSpread} unit="px" />
                        </div>
                    </div>

                    {/* CHROMA BLOCK */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                            <Palette className="w-3 h-3 text-emerald-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-200">
                                Chroma_Data
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                            <Range label="Red" value={r} min={0} max={255} onChange={setR} />
                            <Range label="Green" value={g} min={0} max={255} onChange={setG} />
                            <Range label="Blue" value={b} min={0} max={255} onChange={setB} />
                            <Range label="Alpha" value={Math.round(a * 100)} min={0} max={100} onChange={(val) => setA(val / 100)} unit="%" />
                        </div>
                    </div>

                    {/* EXPORT UNIT */}
                    <div className="space-y-4 pt-4">
                        <div className="bg-[#050505] border border-zinc-900 p-6 rounded-sm relative group">
                            <div className="text-[8px] font-mono text-zinc-700 uppercase mb-3 tracking-widest">CSS_Buffer</div>
                            <code className="text-[11px] text-emerald-400 font-mono break-all block pr-12">
                                box-shadow: {shadow};
                            </code>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all rounded-sm border ${copied ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-zinc-900 border-zinc-800 text-emerald-500 hover:border-emerald-500'
                                    }`}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="opacity-10 text-center py-10">
                        <p className="text-[8px] font-mono tracking-[0.5em] uppercase">Lizard Interactive // Kernel_v2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Range({ label, value, min, max, onChange, unit = "" }: any) {
    return (
        <label className="flex flex-col gap-5 group/range">
            <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
                    {label}
                </span>
                <span className="text-[10px] font-mono text-white px-2 py-1 bg-zinc-900 rounded-sm">
                    {value}{unit}
                </span>
            </div>
            <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-900 appearance-none cursor-pointer accent-emerald-500 rounded-full"
            />
        </label>
    );
}