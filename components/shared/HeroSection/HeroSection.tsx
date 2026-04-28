import React, { useEffect } from 'react';
import Image from 'next/image';
import MainHeader from '../MainHeader/MainHeader';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
// <-- Update this path if MainHeader is in a different folder

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-14 bg-[#0a0a0a] text-white overflow-hidden mt-20 rounded-2xl">


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
                eyebrow="Lizard Interactive Online • Performance Engineering"
                headline="I Build the Fastest 1% of the Web."
                subheadline="Stop losing mobile customers to bloated, slow-loading websites. I engineer lightning-fast custom web applications with a guaranteed 100/100 Google Lighthouse performance score."
            />

            {/* 2. The Call to Action */}
            <div className="z-10 flex flex-col sm:flex-row gap-4 mb-16 mt-4">
                <button className="bg-white text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]">
                    Claim Your Free Performance Audit
                </button>
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