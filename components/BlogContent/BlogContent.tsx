"use client";

import { Activity } from "lucide-react";

interface BlogContentProps {
    content: any;
    ogImage?: string; // layoutType is GONE
}

export default function BlogContent({ content, ogImage }: BlogContentProps) {
    const { contentBlocks, hooks } = content;

    return (
        <div className="space-y-16 md:space-y-24">
            {/* --- 1. UNIFORM VISUAL ASSET --- 
                 Renders for ANY post that has an image
            */}
            {ogImage && (
                <div className="relative group overflow-hidden border border-zinc-900 bg-[#050505] p-2 md:p-4 mb-12">
                    <div className="flex items-center justify-between mb-3 font-mono text-[8px] text-emerald-500/50 uppercase tracking-[0.3em]">
                        <span>[ visual_identity_stream ]</span>
                        <span className="animate-pulse text-emerald-400">active_feed</span>
                    </div>
                    <img
                        src={`/${ogImage}`}
                        alt="Process visual"
                        className="w-full h-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 border border-zinc-800/50"
                    />
                </div>
            )}

            {/* --- 2. DYNAMIC CONTENT ENGINE --- */}
            <div className="space-y-16 md:space-y-20">
                {contentBlocks?.map((block: any, idx: number) => (
                    <section key={block.id || idx} className="group scroll-mt-20">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <div className="h-[1.5px] w-8 bg-emerald-500 group-hover:w-16 transition-all duration-500" />
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                                {block.title}
                            </h3>
                        </div>

                        <div className="max-w-2xl">
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light italic mb-8">
                                {block.text}
                            </p>
                        </div>

                        {block.protocols && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                                {block.protocols.map((protocol: string, pIdx: number) => (
                                    <div key={pIdx} className="flex items-start gap-4 p-4 bg-[#080808] border border-zinc-900 hover:border-emerald-500/20 transition-all group/item">
                                        <span className="text-emerald-500 font-mono text-[10px] mt-0.5">
                                            [{String(pIdx + 1).padStart(2, '0')}]
                                        </span>
                                        <span className="text-zinc-300 uppercase tracking-widest text-[9px] font-bold leading-tight group-hover/item:text-white transition-colors">
                                            {protocol}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* --- 3. SYSTEM CONCLUSION --- */}
            {hooks?.conclusion && (
                <div className="mt-24 md:mt-32 p-8 border border-zinc-900 bg-zinc-900/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                    <p className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] leading-loose">
                        <Activity size={12} className="inline-block mr-3 mb-1 text-emerald-500/50" />
                        {hooks.conclusion}
                    </p>
                </div>
            )}
        </div>
    );
}