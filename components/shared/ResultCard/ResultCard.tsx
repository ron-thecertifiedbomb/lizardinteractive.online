import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Globe, Gauge } from 'lucide-react';

interface ResultCardProps {
    client: string;
    projectType: string;
    description: string;
    performanceScore: number;
    improvement: string; // e.g. "4.2s → 0.8s"
    tags: string[];
}

export default function ResultCard({
    client,
    projectType,
    description,
    performanceScore,
    improvement,
    tags
}: ResultCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-dark-950 border border-zinc-900 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
        >
            {/* Background Aesthetic */}
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-all duration-500 pointer-events-none" />

            <div className="relative z-10">
                {/* Header: Client & Score */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Globe size={14} className="text-emerald-500" />
                            <span className="text-xs-plus font-mono text-zinc-500 uppercase tracking-widest">{projectType}</span>
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                            {client}
                        </h3>
                    </div>

                    {/* The Lighthouse Gauge UI */}
                    <div className="relative flex items-center justify-center">
                        <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                                cx="32" cy="32" r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-zinc-800"
                            />
                            <circle
                                cx="32" cy="32" r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={175.9}
                                strokeDashoffset={175.9 - (175.9 * performanceScore) / 100}
                                className="text-emerald-500 shadow-[0_0_10px_#10b981]"
                            />
                        </svg>
                        <span className="absolute font-mono text-lg font-bold text-emerald-400">
                            {performanceScore}
                        </span>
                    </div>
                </div>

                {/* Body: Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                {/* Metrics: The Before/After Payoff */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900/50 mb-6">
                    <div className="flex flex-col">
                        <span className="text-xs-plus font-mono text-zinc-600 uppercase mb-1">Optimization</span>
                        <span className="text-emerald-500 font-bold flex items-center gap-1 italic">
                            <Zap size={12} /> {improvement}
                        </span>
                    </div>
                    <div className="flex flex-col border-l border-zinc-800 pl-4">
                        <span className="text-xs-plus font-mono text-zinc-600 uppercase mb-1">Status</span>
                        <span className="text-white text-xs-plus font-bold uppercase tracking-widest">Deploy Ready</span>
                    </div>
                </div>

                {/* Footer: Tags & Action */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="text-xxs font-mono px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="text-zinc-600 group-hover:text-emerald-500 transition-colors">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}