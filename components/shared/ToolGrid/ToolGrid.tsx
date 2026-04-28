import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export interface ToolItem {
    slug: string;
    name: string;
    description: string;
    icon: React.ReactNode | string;
}

interface ToolGridProps {
    tools: ToolItem[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-0">
            {tools.map((tool, index) => (
                <motion.div
                    key={tool.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                    <Link
                        href={`/utilities/${tool.slug}`}
                        className="group relative block p-6 rounded-2xl bg-zinc-950 border border-zinc-900 transition-all duration-500 hover:border-emerald-500/50 hover:bg-zinc-900/40 overflow-hidden"
                    >
                        {/* 1. The "Killer" Hover Glow - Follows the corner */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none" />

                        {/* 2. Top-right Icon Detail */}
                        <div className="absolute top-4 right-4 text-zinc-800 group-hover:text-emerald-500/40 transition-colors duration-500">
                            <ArrowUpRight size={18} />
                        </div>

                        {/* 3. Icon Section */}
                        <div className="relative z-10 text-4xl mb-6 inline-flex p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-500 origin-left shadow-inner">
                            <span className="filter group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                                {tool.icon}
                            </span>
                        </div>

                        {/* 4. Text Content */}
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="font-black text-white text-sm md:text-base uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                                    {tool.name}
                                </h3>
                            </div>

                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium line-clamp-2 group-hover:text-zinc-400 transition-colors">
                                {tool.description}
                            </p>
                        </div>

                        {/* 5. Bottom Status Bar (The "Engineering" touch) */}
                        <div className="mt-6 pt-4 border-t border-zinc-900/50 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest group-hover:text-emerald-500/60">
                                Protocol v1.0
                            </span>
                            <div className="h-1 w-12 bg-zinc-900 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}