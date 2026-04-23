/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Gauge, Zap, Activity, RefreshCw } from "lucide-react";
import { STACK_SLIDES } from "@/data/presentation/web";
import { SLIDES } from "@/data/presentation/slides";

export function FramerPresentation() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % STACK_SLIDES.length);
        setProgress(0);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + STACK_SLIDES.length) % STACK_SLIDES.length);
        setProgress(0);
    };

    // Autoplay Logic
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        nextSlide();
                        return 0;
                    }
                    return prev + 1; // Speed of the progress bar
                });
            }, 50); // Adjust for smoothness
        }
        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);

    const currentSlide = STACK_SLIDES[currentIndex];

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 font-sans px-4">
            {/* The "Video" Screen */}
            <div className="relative aspect-video bg-black rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                    >
                        {/* Background Ambient Glow */}
                        <div
                            className="absolute inset-0 opacity-10 blur-[120px]"
                            style={{ backgroundColor: currentSlide.color }}
                        />
{/* 
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mb-6 p-6 rounded-full bg-white/5 border border-white/10"
                        >
                            <currentSlide.icon size={64} style={{ color: currentSlide.color }} />
                        </motion.div> */}

                        <motion.h2
                            className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {currentSlide.title}
                        </motion.h2>

                        <motion.p
                            className="text-zinc-400 font-mono text-sm md:text-lg max-w-md"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {currentSlide.desc}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full mb-6 overflow-hidden cursor-pointer">
                        <motion.div
                            className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-4">
                            <>
                            <button onClick={prevSlide} className="text-white/50 hover:text-white transition"><SkipBack size={20} /></button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-black hover:scale-110 transition active:scale-95"
                            >
                                {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-1" />}
                            </button>
                            <button onClick={nextSlide} className="text-white/50 hover:text-white transition"><SkipForward size={20} /></button>
                            </>
                            {/* <div className="ml-4 text-[10px] font-mono text-zinc-500">
                                SLIDE_0{currentIndex + 1} / 0{SLIDES.length}
                            </div> */}
                        </div>

                        {/* <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest">
                                Core_Vitals_Engine
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Slide Navigation Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
                {SLIDES.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => { setCurrentIndex(index); setProgress(0); }}
                        className={`p-4 rounded-2xl border transition-all text-left ${currentIndex === index ? 'bg-white/5 border-emerald-500/50' : 'bg-transparent border-white/5 hover:border-white/10'
                            }`}
                    >
                        <div className="text-[9px] font-mono text-zinc-600 mb-1">METRIC_0{index + 1}</div>
                        <div className={`text-xs font-bold ${currentIndex === index ? 'text-white' : 'text-zinc-500'}`}>{slide.id}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}