"use client";
import { motion } from "framer-motion";

interface VoidEntranceProps {
    onEnter: () => void;
    tagline?: string;
    buttonText?: string;
}

export default function VoidEntrance({
    onEnter,
    tagline = "The Vision is Live",
    buttonText = "Enter the Void"
}: VoidEntranceProps) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* Dynamic Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,40,40,0.5)_0%,_rgba(0,0,0,1)_80%)]" />
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                    style={{
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
                        animation: 'grain-drift 8s steps(10) infinite',
                    }}
                />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10 space-y-12"
            >
                <div className="space-y-4">
                    <h1 className="font-thin text-white text-3xl md:text-5xl tracking-[0.5em] uppercase opacity-70 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        {tagline}
                    </h1>
                    <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                        High Gain Atmosphere Ahead
                    </p>
                </div>

                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.05, letterSpacing: "0.5em", borderColor: "rgba(255,255,255,0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-16 py-5 border border-white/10 transition-all duration-700 bg-black/40 backdrop-blur-sm"
                >
                    <span className="relative z-10 font-thin tracking-[0.4em] text-white text-sm uppercase">
                        {buttonText}
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </motion.div>
        </motion.div>
    );
}