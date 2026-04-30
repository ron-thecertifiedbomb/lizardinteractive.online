import React, { useEffect } from 'react';
import Image from 'next/image';
import MainHeader from '../MainHeader/MainHeader';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { heroContent } from '@/data/heroContent';
// <-- Update this path if MainHeader is in a different folder

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center text-center px-4 w-full">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
            {/* <div className="mb-8 z-10">
                <Image
                    src="/logo.svg" // <-- Update this path to your actual logo file in the public folder
                    alt="Lizrd Interactive Online Logo"
                    width={100}
                    height={100}
                    className="mx-auto object-contain drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                />
            </div> */}

            {/* 1. The Reusable Header Component */}
            <MainHeader
                eyebrow={heroContent.webPerformance.eyebrow}
                headline={heroContent.webPerformance.headline}
                subheadline={heroContent.webPerformance.subheadline}
            />

            {/* 2. The Call to Action */}
            <div className="z-10 flex flex-col sm:flex-row gap-6  items-center justify-center">
                <div className="z-10 flex flex-col  items-center gap-6 mb-16 mt-4">
                    {/* The Container with your specific border/glow style */}
                    <div className="relative group p-px rounded-xl transition-all duration-500">

                        {/* Outer Glow & Border (Using your specific green-500/30) */}
                        <div className="absolute inset-0 rounded-xl border border-green-500/30 bg-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.1)] group-hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] transition-all duration-500"></div>

                        {/* The Button */}
                        <button className="relative flex items-center gap-3 px-8 py-4 bg-black/60 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 group-hover:bg-zinc-900">

                            {/* The Animated Shimmer Streak */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-green-400/20 to-transparent"></div>

                            <span className="relative z-10 bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                {heroContent.webPerformance.cta}
                            </span>

                            {/* Pulsing Green Dot (Indicates "Live/Ready") */}
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>

                        </button>
                    </div>

                    {/* Optional: Simple text link for balance */}
                    {/* <span className="text-zinc-500 text-sm font-medium cursor-pointer hover:text-green-400 transition-colors">
                        No credit card required
                    </span> */}
                </div>

            </div>

            {/* 3. Visual Proof: The Lighthouse Circles */}
            <div className="z-10 w-full max-w-3xl border-t border-zinc-800 pt-10">
                <p className="text-zinc-500 text-sm mb-6 font-mono uppercase tracking-widest">Verified Metrics</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">

                    <LighthouseMetric score={100} label="Performance" delay={0} />
                    <LighthouseMetric score={100} label="Accessibility" delay={0.2} />
                    <LighthouseMetric score={100} label="Best Practices" delay={0.4} />
                    <LighthouseMetric score={100} label="SEO" delay={0.6} />

                </div>
            </div>
        </section>
    );
}

// Reusable component for the green Lighthouse circles
function LighthouseMetric({ score, label, delay = 0 }: { score: number, label: string, delay?: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const controls = animate(count, score, {
            duration: 2,
            delay: delay,
            ease: "easeOut"
        });
        return () => controls.stop();
    }, [score, delay, count]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
        >
            {/* The exact Google Lighthouse Green Circle style with SVG animation */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-green-500/5 shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="8" fill="none" className="text-green-500/20" />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="46"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="text-green-500"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 100 }}
                        transition={{ duration: 2, delay: delay, ease: "easeOut" }}
                    />
                </svg>
                <span className="text-green-400 font-mono text-xl md:text-2xl font-bold relative z-10">
                    <motion.span>{rounded}</motion.span>
                </span>
            </div>
            <span className="text-zinc-400 text-xs md:text-sm font-medium tracking-wide">
                {label}
            </span>
        </motion.div>
    );
}