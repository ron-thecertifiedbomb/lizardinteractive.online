"use client";

import { BlogPost } from "../../interfaces";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { specialLogs } from "../../data/page/blogContent";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

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

        <ScreenContainer variant="dark" maxWidth="xl">


            <SectionHeader
                title="Daily"
                highlight="Blogs"
                description="Low-latency, zero-tracker, and optimized for performance."
            />

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

        </ScreenContainer>

    );
}