'use client';

import React, { useState, useCallback } from "react";
import { Copy, RefreshCcw, Layers, Palette, Terminal, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BoxShadowGenerator() {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(0);

    // RGB & Alpha
    const [r, setR] = useState(16);
    const [g, setG] = useState(185);
    const [b, setB] = useState(129); // Default to Emerald 500
    const [a, setA] = useState(0.4);

    const [copied, setCopied] = useState(false);

    const shadow = `${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${a})`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${shadow};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group selection:bg-emerald-500 selection:text-black">

            {/* HUD HEADER */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3 text-emerald-500" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                            Shadow.Engine_v2
                        </h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter italic">
                        Real-time Rasterization // Buffer: {blur}px_BLUR
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT: SLIDERS & CALIBRATION */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Terminal className="w-3 h-3" /> Geometry_Params
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Range label="X_OFFSET" value={hOffset} min={-100} max={100} onChange={setHOffset} />
                            <Range label="Y_OFFSET" value={vOffset} min={-100} max={100} onChange={setVOffset} />
                            <Range label="BLUR_RADIUS" value={blur} min={0} max={200} onChange={setBlur} />
                            <Range label="SPREAD_FIELD" value={spread} min={-50} max={100} onChange={setSpread} />
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-zinc-900/50">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Palette className="w-3 h-3" /> Chroma_Data
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <Range label="R" value={r} min={0} max={255} onChange={setR} />
                            <Range label="G" value={g} min={0} max={255} onChange={setG} />
                            <Range label="B" value={b} min={0} max={255} onChange={setB} />
                            <Range label="A" value={Math.round(a * 100)} min={0} max={100} onChange={(val) => setA(val / 100)} />
                        </div>
                    </div>
                </div>

                {/* RIGHT: PREVIEW & EXPORT */}
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-1">Live_Render</span>

                    {/* PREVIEW BOX: Transparency checkerboard background */}
                    <div className="relative w-full aspect-square md:aspect-video bg-black border border-zinc-900 flex items-center justify-center overflow-hidden bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:16px_16px]">
                        <div
                            className="w-32 h-32 bg-white transition-all duration-300"
                            style={{ boxShadow: shadow }}
                        />
                        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                            <Layers className="w-16 h-16 text-white" />
                        </div>
                    </div>

                    {/* CODE EXPORT */}
                    <div className="relative bg-black border border-zinc-900 p-6 group/code">
                        <div className="text-[8px] font-mono text-zinc-700 uppercase mb-4 tracking-tighter">CSS_EXPORT_BUFFER</div>
                        <code className="block font-mono text-[11px] text-emerald-500/80 leading-relaxed whitespace-pre-wrap break-all">
                            box-shadow: {shadow};
                        </code>

                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 flex items-center gap-2 bg-zinc-900 hover:bg-emerald-600 hover:text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>

            {/* BACKGROUND DECOR */}
            <div className="absolute -bottom-6 -right-6 text-9xl font-black text-white/[0.02] select-none uppercase italic pointer-events-none">
                ELV_MOD
            </div>
        </div>
    );
}

function Range({ label, value, min, max, onChange }: any) {
    return (
        <label className="flex flex-col gap-2 group/range">
            <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover/range:text-zinc-400 transition-colors">{label}</span>
                <span className="text-[9px] font-mono text-emerald-500/50">{value}</span>
            </div>
            <input
                type="range" min={min} max={max} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-0.5 bg-zinc-900 appearance-none cursor-crosshair accent-emerald-500"
            />
        </label>
    );
}