"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function CinematicHeroKiller() {
    // 1. SEQUENCE MANAGER
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    // 2. LOGO: Scale + Slide
    const logoFieldVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0, y: 40, filter: "blur(10px)" },
        visible: {
            scale: 1, opacity: 1, y: 0, filter: "blur(0px)",
            transition: { type: "spring", stiffness: 100, damping: 20 },
        },
    };

    // 3. LIGHTNING FLASH VARIANT
    const lightningVariants: Variants = {
        visible: {
            opacity: [0, 0.8, 0, 1, 0], // Stochastic flickering
            transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 3, // Occurs every 3 seconds
                times: [0, 0.2, 0.4, 0.6, 1],
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative w-full  bg-[#030303] flex flex-col items-center justify-center overflow-hidden p-4 rounded-xl"
        >
            {/* GLOBAL LIGHTNING FLASH OVERLAY */}
            <motion.div
                variants={lightningVariants}
                className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay opacity-0"
            />

        

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* LOGO UNIT WITH ELECTRIC HALO */}
            <motion.div variants={logoFieldVariants} className="relative mb-1 z-20 group">

                {/* The "Electric" Outer Ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl group-hover:bg-emerald-500/40 transition-colors"
                />

                <div className="w-56 h-56 rounded-full  border-zinc-300 bg-transparent flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.2)]">

                    {/* Internal Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent bg-[length:100%_4px] animate-scan opacity-30" />

                    {/* THE LOGO */}
                    <Image
                        src="/lizard/lizardlogo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        priority
                        className="relative z-20 object-contain scale-300"
                    />

                    {/* INTERNAL ARC EFFECT (Lightning inside the circle) */}
                    <motion.div
                        animate={{
                            opacity: [0, 1, 0, 0.8, 0],
                            x: [-20, 20, -10, 10, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 4 }}
                        className="absolute inset-0 bg-white/10 mix-blend-color-dodge z-30 pointer-events-none"
                    />
                </div>
            </motion.div>
        </motion.section>
    );
}