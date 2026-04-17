"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

const services = [
    { id: 1, name: "Full-Stack Architecture", desc: "Next.js, TypeScript, and Scalable Vercel Deployments for high-traffic environments." },
    { id: 2, name: "Database Migration", desc: "Specializing in Supabase integration, data integrity, and complex cluster transitions." },
    { id: 3, name: "Performance Optimization", desc: "Hard-coded efficiency to achieve 100/100 Lighthouse scores and sub-second load times." },
    { id: 4, name: "Void Engine Solutions", desc: "Custom-built internal automation tools designed for niche industrial and technical workflows." }
];

export default function RonDevSolutions() {
    const [isHovered, setIsHovered] = useState<number | null>(null);

    // Business Force Nav bypass for mobile/tablet stability
    const handleEmailRedirect = () => {
        window.location.href = "mailto:contact@lizardinteractive.online";
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black relative">
            <ScreenContainer variant="dark" maxWidth="xl">
                <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-32 pb-40">

                    {/* --- HEADER: Professional & Bold --- */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-32 text-center md:text-left"
                    >
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse" />
                            <h1 className="text-[10px] tracking-[0.6em] uppercase text-zinc-500 font-black">
                                Vertical Integration & Software
                            </h1>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
                            RonDev<span className="text-emerald-500">Solutions</span>
                        </h2>
                        <p className="mt-8 text-zinc-500 text-sm md:text-base uppercase tracking-widest max-w-2xl leading-relaxed">
                            Engineering high-fidelity digital systems.
                            From database clusters to pixel-perfect frontends.
                        </p>
                    </motion.header>

                    {/* --- SOLUTIONS GRID --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                onMouseEnter={() => setIsHovered(service.id)}
                                onMouseLeave={() => setIsHovered(null)}
                                className="group relative border-t border-zinc-900 pt-10 cursor-default"
                            >
                                {/* Animated Line Accent */}
                                <motion.div
                                    className="absolute top-0 left-0 h-[2px] bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered === service.id ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />

                                <div className="flex items-start justify-between mb-6">
                                    <span className="text-zinc-800 font-mono text-xs">0{service.id} //</span>
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isHovered === service.id ? 'bg-emerald-500' : 'bg-zinc-900'}`} />
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                    {service.name}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-light">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </section>

                    {/* --- BUSINESS CALL TO ACTION --- */}
                    <footer className="mt-60 flex flex-col items-center border-t border-zinc-900 pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-center"
                        >
                            <p className="text-[10px] font-mono text-emerald-500 mb-8 tracking-[0.4em] uppercase">
                                [ system_ready: true ]
                            </p>
                            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-10">
                                Ready to turn 404s into <span className="text-emerald-500">200 OKs?</span>
                            </h3>

                            <div
                                onPointerDown={handleEmailRedirect}
                                className="inline-block group cursor-pointer"
                            >
                                <span className="text-xl md:text-2xl font-light text-zinc-400 group-hover:text-white transition-all duration-300 border-b border-zinc-800 group-hover:border-emerald-500 pb-2">
                                    Inquire for Project Collaboration
                                </span>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600 tracking-widest uppercase font-mono">
                                    Direct Transmission: contact@lizardinteractive.online
                                </div>
                            </div>
                        </motion.div>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}