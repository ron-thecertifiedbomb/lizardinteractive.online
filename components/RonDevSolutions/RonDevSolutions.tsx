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

    const handleEmailRedirect = () => {
        window.location.href = "mailto:contact@lizardinteractive.online";
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black relative">
            <ScreenContainer variant="dark" maxWidth="xl">
                {/* Responsive Padding: pt-24 para sa mobile, pt-40 para sa desktop */}
                <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-24 md:pt-40 pb-32">

                    {/* --- HEADER: Optimized for all screens --- */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-20 md:mb-32 text-left"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse" />
                            <h1 className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-zinc-500 font-black">
                                Vertical Integration & Software
                            </h1>
                        </div>
                        {/* Fluid Font Size: text-4xl sa mobile, text-8xl sa desktop */}
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] md:leading-none">
                            RonDev<span className="text-emerald-500">Solutions</span>
                        </h2>
                        <p className="mt-6 md:mt-8 text-zinc-500 text-xs md:text-base uppercase tracking-[0.15em] md:tracking-widest max-w-2xl leading-relaxed font-medium">
                            Engineering high-fidelity digital systems.
                            From database clusters to pixel-perfect frontends.
                        </p>
                    </motion.header>

                    {/* --- SOLUTIONS GRID: Better gap for mobile --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                // Mobile Touch Support: Toggle hover state on tap
                                onPointerDown={() => setIsHovered(service.id)}
                                onMouseEnter={() => setIsHovered(service.id)}
                                onMouseLeave={() => setIsHovered(null)}
                                className="group relative border-t border-zinc-900 pt-8 md:pt-10 cursor-pointer md:cursor-default touch-manipulation"
                            >
                                {/* Animated Line Accent */}
                                <motion.div
                                    className="absolute top-0 left-0 h-[2px] bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered === service.id ? "100%" : "0%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />

                                <div className="flex items-start justify-between mb-6 pointer-events-none">
                                    <span className="text-zinc-800 font-mono text-[10px] md:text-xs font-bold">0{service.id} //</span>
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isHovered === service.id ? 'bg-emerald-500' : 'bg-zinc-900'}`} />
                                </div>

                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 md:mb-4 group-hover:text-emerald-400 transition-colors duration-300 pointer-events-none">
                                    {service.name}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-light pointer-events-none">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </section>

                    {/* --- BUSINESS CALL TO ACTION --- */}
                    <footer className="mt-32 md:mt-60 flex flex-col items-center border-t border-zinc-900 pt-16 md:pt-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center w-full px-4"
                        >
                            <p className="text-[10px] font-mono text-emerald-500 mb-6 md:mb-8 tracking-[0.4em] uppercase">
                                [ system_ready: true ]
                            </p>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 md:mb-10 leading-tight">
                                Ready to turn 404s into <span className="text-emerald-500">200 OKs?</span>
                            </h3>

                            <div
                                onPointerDown={handleEmailRedirect}
                                className="inline-block group cursor-pointer touch-manipulation"
                            >
                                <span className="text-lg md:text-2xl font-light text-zinc-400 group-hover:text-white transition-all duration-300 border-b border-zinc-800 group-hover:border-emerald-500 pb-2">
                                    Inquire for Project Collaboration
                                </span>
                                {/* Hidden on small mobile to avoid layout breaking, visible on md+ */}
                                <div className="mt-4 opacity-0 md:group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600 tracking-widest uppercase font-mono hidden md:block">
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