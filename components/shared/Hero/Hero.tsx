"use client";

import { motion } from "framer-motion";

// Types for better DX
interface HeroProps {
    title: string;
    highlightWord?: string;
    description: string;
    tags?: string[];
    hintText?: string;
    useMotion?: boolean;
}

// Animation Variants (assuming these come from your styles/motion.ts)
const HERO_TITLE = { /* ... */ };
const FADE_IN = { /* ... */ };

export default function Hero({
    title,
    highlightWord = "through",
    description,
    tags = ["40%+ Conv. Lift", "2x Organic Traffic", "Core Web Vitals ✓", "SEO First Page"],
    hintText = "select_your_growth_service",
    useMotion = true
}: HeroProps) {

    // Helper to colorize and block-format the title
    const renderTitle = () => {
        const parts = title.split(new RegExp(`(${highlightWord})`, "gi"));
        return parts.map((part, i) => (
            <span key={i} className="block w-full">
                {part.toLowerCase() === highlightWord.toLowerCase() ? (
                    <span className="text-emerald-500">{part} </span>
                ) : (
                    part
                )}
            </span>
        ));
    };

    return (
        <section className="mb-12 md:mb-24 flex flex-col items-center lg:items-start w-full relative">

            {/* MAIN HEADING */}
            <motion.h1
                variants={useMotion ? HERO_TITLE : undefined}
                initial="initial"
                animate="animate"
                className="text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black tracking-tighter text-center lg:text-left leading-[0.95] md:leading-[0.82] mb-6 md:mb-8 uppercase w-full break-words transform-gpu antialiased"
            >
                {renderTitle()}
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
                variants={useMotion ? FADE_IN : undefined}
                initial="initial"
                animate="animate"
                className="text-base md:text-xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0"
            >
                {description}
            </motion.p>

            {/* STATUS TAGS */}
            <motion.div
                variants={useMotion ? FADE_IN : undefined}
                initial="initial"
                animate="animate"
                className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8 mb-10"
            >
                {tags.map((text, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 border border-white/5 rounded-full bg-zinc-900/30 backdrop-blur-md transition-colors hover:border-emerald-500/30"
                    >
                        <div className={`w-1 h-1 bg-emerald-500 rounded-full ${i === 0 ? 'animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]' : ''}`} />
                        <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">
                            {text}
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* PORTAL SELECTOR HINT */}
            <motion.div
                variants={useMotion ? FADE_IN : undefined}
                initial="initial"
                animate="animate"
                className="text-center lg:text-left"
            >
                <p className="text-[9px] font-mono text-emerald-500/60 tracking-[0.4em] uppercase">
                    [ {hintText} ]
                </p>
            </motion.div>

        </section>
    );
}