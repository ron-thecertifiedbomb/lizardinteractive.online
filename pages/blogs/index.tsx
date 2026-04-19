"use client";

import { BlogPost } from "../../interfaces";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { specialLogs } from "../../data/blogContent";
import { useEffect, useState } from "react";

export default function BlogPage() {
    // 1. Default to 'true' or a guess to prevent the 'null' return glitch
    const [isMobile, setIsMobile] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleForceNav = (href: string) => {
        document.body.style.overflow = 'unset';
        window.location.href = href;
    };

    const featuredLogs = Object.values(specialLogs);

    // 2. Only use motion if we have mounted AND we are on desktop
    const useMotion = hasMounted && !isMobile;
    const MotionDiv = useMotion ? motion.div : "div";

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black relative z-[1]">
            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* --- KILLER LOGS HEADER --- */}
                    <MotionDiv
                        // 3. Use undefined for clean DOM on mobile
                        initial={useMotion ? { opacity: 0, y: 30 } : undefined}
                        animate={useMotion ? { opacity: 1, y: 0 } : undefined}
                        transition={useMotion ? { duration: 0.6, ease: "easeOut" } : undefined}
                        className="relative w-full mb-24 border-b border-zinc-900 pb-12"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-none animate-ping absolute opacity-20" />
                                    <div className="w-2 h-2 bg-emerald-500 rounded-none" />
                                </div>
                                <span className="text-emerald-500 font-mono text-[9px] tracking-[0.6em] uppercase font-black">
                                    TRANSMISSION.ACTIVE // 200_OK
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-white">
                                Lizard <span className="text-emerald-500">Logs</span>
                            </h1>
                            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                                <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold leading-relaxed max-w-xl">
                                    Technical breakdowns <span className="text-zinc-800">//</span>
                                    Production secrets <span className="text-zinc-800">//</span>
                                    <span className="text-white">High-performance systems & philosophy.</span>
                                </p>
                            </div>
                        </div>
                    </MotionDiv>

                    {/* --- DUAL FEATURED SECTION --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border-y border-zinc-900 mb-32 overflow-hidden relative z-20">
                        {featuredLogs.map((log) => (
                            <div
                                key={log.slug}
                                onPointerDown={() => handleForceNav(`/blogs/${log.slug}`)}
                                className="group block bg-black hover:bg-emerald-500/[0.02] active:bg-zinc-900 transition-all duration-500 p-8 md:p-12 border-l-2 border-emerald-500 cursor-pointer touch-manipulation"
                            >
                                <div className="flex flex-col h-full justify-between pointer-events-none">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-emerald-500/50 font-mono text-[9px] uppercase tracking-widest">
                                            <Activity size={10} /> {log.layoutType}_LOG // {log.slug === 'best-laptops-2026' ? 'PRIORITY_01' : 'PRIORITY_02'}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-emerald-400 transition-colors leading-[0.9]">
                                            {log.title}
                                        </h2>
                                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] leading-relaxed font-bold">
                                            {log.description}
                                        </p>
                                    </div>
                                    <div className="mt-12 flex items-center gap-3 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                                        INITIALIZE_BUFFER <Zap size={10} className="fill-current" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScreenContainer>
        </div>
    );
}