import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Cpu, HardDrive, Monitor } from "lucide-react";
import GearCard from "../../../shared/GearCard/GearCard";


interface HardwareLayoutProps {
    data: {
        header: {
            title: string;
            intro: string;
        };
        recommendations: any[];
        hooks: {
            intro: string;
            conclusion: string;
        };
    };
}

const HardwareLayout = ({ data }: HardwareLayoutProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-24"
        >
            {/* --- HEADER SECTION --- */}
            <header className="mb-20 border-b border-zinc-900 pb-12">
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">
                        [ HARDWARE_AUDIT_v2026 ]
                    </span>
                    <div className="h-[1px] flex-1 bg-zinc-900" />
                </div>

                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                    {data.header.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-emerald-500" />
                        Status: OPTIMIZED
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={12} className="text-emerald-500" />
                        Latency: 0.00ms
                    </div>
                </div>
            </header>

            {/* --- INTRO HOOK --- */}
            <div className="max-w-3xl">
                <p className="text-zinc-400 text-lg md:text-xl uppercase tracking-widest leading-relaxed border-l-2 border-emerald-500 pl-8 font-bold">
                    {data.hooks.intro}
                </p>
                <p className="mt-8 text-zinc-500 leading-relaxed font-sans font-light">
                    {data.header.intro}
                </p>
            </div>

            {/* --- RECOMMENDATIONS GRID --- */}
            <div className="grid gap-12 lg:gap-20">
                {data.recommendations.map((laptop, index) => (
                    <motion.div
                        key={laptop.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* The index label creates that technical log look */}
                        <div className="text-[10px] font-mono text-zinc-800 mb-4 tracking-[0.5em] font-black uppercase">
              // DEVICE_ENTITY_0{index + 1}
                        </div>
                        <GearCard item={laptop} />
                    </motion.div>
                ))}
            </div>

            {/* --- CONCLUSION FOOTER --- */}
            <footer className="mt-32 p-10 border border-zinc-900 bg-[#030303] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                    <Activity size={40} className="text-emerald-500/5" />
                </div>
                <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.4em] leading-relaxed text-center max-w-2xl mx-auto">
                    {data.hooks.conclusion}
                </p>
            </footer>
        </motion.div>
    );
};

export default HardwareLayout;