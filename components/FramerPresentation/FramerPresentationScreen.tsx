"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { FramerSlide } from "./types";

type FramerPresentationScreenProps = {
    currentSlide: FramerSlide;
    currentIndex: number;
    slideCount: number;
    progress: number;
    isPlaying: boolean;
    onPrev: () => void;
    onNext: () => void;
    onTogglePlayback: () => void;
};

export function FramerPresentationScreen({
    currentSlide,
    currentIndex,
    slideCount,
    progress,
    isPlaying,
    onPrev,
    onNext,
    onTogglePlayback,
}: FramerPresentationScreenProps) {
    return (
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-emerald-500/20 bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:aspect-video sm:rounded-3xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center sm:p-12"
                >
                    <div
                        className="absolute inset-0 opacity-10 blur-[120px]"
                        style={{ backgroundColor: currentSlide.color }}
                    />
                    <motion.div
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300 sm:mb-6 sm:text-xs md:text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <currentSlide.icon size={14} style={{ color: currentSlide.color }} />
                        {currentSlide.id}
                    </motion.div>

                    <motion.h2
                        className="mb-3 text-3xl font-black tracking-tighter text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {currentSlide.title}
                    </motion.h2>

                    <motion.p
                        className="max-w-xs px-2 font-mono text-xs text-zinc-400 sm:max-w-md sm:px-0 sm:text-sm md:text-base lg:text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {currentSlide.desc}
                    </motion.p>

                    <motion.div
                        className="mt-5 mb-4 grid w-full max-w-sm grid-cols-2 gap-2 sm:mt-7 sm:max-w-2xl sm:gap-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {/* <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-left backdrop-blur-sm">
                            <div className="text-xs-minus font-mono uppercase tracking-[0.16em] text-zinc-500">Stats</div>
                            <div className="mt-1 text-xs font-semibold text-white sm:text-sm">{currentSlide.stats}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-left backdrop-blur-sm">
                            <div className="text-xs-minus font-mono uppercase tracking-[0.16em] text-zinc-500">Impact</div>
                            <div className="mt-1 text-xs font-semibold text-white sm:text-sm">{currentSlide.impact}</div>
                        </div> */}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
     <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/60 to-transparent p-4 sm:p-6">
                <div className="mb-2 px-4 h-1 w-full cursor-pointer overflow-hidden rounded-full sm:mb-2 mdpx-6">
                    <motion.div
                        className="h-full bg-emerald-400/30 shadow-[0_0_15px_#10b981] rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 p-1.5 bg-transparent border border-emerald-500/20 rounded-full backdrop-blur-sm">
                    {/* Previous Button */}
                    <button
                        onClick={onPrev}
                        className="group flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/10 text-emerald-500/40 transition-all duration-300 hover:border-emerald-500/60 hover:bg-emerald-500/5 hover:text-emerald-400 active:scale-90 sm:h-9 sm:w-9"
                        aria-label="Previous slide"
                    >
                        <SkipBack size={16} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
                    </button>

                    {/* Main Play/Pause - Transparent Border No BG */}
                    <button
                        onClick={onTogglePlayback}
                        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/30 bg-transparent text-emerald-500/50 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 sm:h-12 sm:w-12"
                        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                    >
                        {isPlaying ? (
                            <Pause fill="currentColor" size={22} strokeWidth={2.5} />
                        ) : (
                            <Play fill="currentColor" size={22} strokeWidth={2.5} className="ml-0.5" />
                        )}
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={onNext}
                        className="group flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/10 text-emerald-500/40 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400 active:scale-90 sm:h-9 sm:w-9"
                        aria-label="Next slide"
                    >
                        <SkipForward size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
       
        </div>
    );
}
