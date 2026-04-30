"use client";

import { motion } from "framer-motion";
import type { FramerSlide } from "./types";
import { LayoutGrid, PanelLeftClose } from "lucide-react";

type FramerPresentationPanelsProps = {
    slides: FramerSlide[];
    currentSlide: FramerSlide;
    currentIndex: number;
    showPanels: boolean;
    quickFacts: string[];
    actionChecklist: string[];
    onSelectSlide: (index: number) => void;
    onTogglePanels: () => void;
};

function panelCardClassName(isActive: boolean) {
    return `rounded-xl border p-2 text-left transition-all sm:rounded-2xl sm:p-4 ${
        isActive ? "border-emerald-500/50 bg-white/5" : "border-white/5 bg-transparent hover:border-white/10"
    }`;
}

export function FramerPresentationPanels({
    slides,
    currentSlide,
    currentIndex,
    showPanels,
    quickFacts,
    actionChecklist,
    onSelectSlide,
    onTogglePanels,
}: FramerPresentationPanelsProps) {
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={onTogglePanels}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/20 bg-transparent text-emerald-500/60 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] active:scale-90"
                    aria-expanded={showPanels}
                    aria-label={showPanels ? "Hide Panels" : "Show Panels"}
                    aria-controls="framer-presentation-panels"
                >
                    {showPanels ? (
                        <PanelLeftClose size={14} strokeWidth={2.5} />
                    ) : (
                        <LayoutGrid size={14} strokeWidth={2.5} />
                    )}
                </button>
            </div>

            {showPanels && (
                <div id="framer-presentation-panels" className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => onSelectSlide(index)}
                                className={panelCardClassName(currentIndex === index)}
                            >
                                <div
                                    className={`text-[10px] font-bold uppercase tracking-wider sm:text-xs truncate ${
                                        currentIndex === index ? "text-white" : "text-zinc-500"
                                    }`}
                                >
                                    {slide.id}
                                </div>
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={`${currentSlide.id}-tip`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 sm:p-4"
                    >
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400/80 sm:text-xs-plus">Pro Tip</div>
                        <p className="mt-1.5 text-xs text-zinc-200 sm:mt-2 sm:text-sm">{currentSlide.tip}</p>
                    </motion.div>

                    <motion.div
                        key={`${currentSlide.id}-extras`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
                    >
                        <div className="rounded-2xl border border-white/10 bg-emerald-500/5 p-3 sm:p-4">
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 sm:text-xs-plus">Quick Facts</div>
                            <ul className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2 ">
                                {quickFacts.map((fact) => (
                                    <li key={fact} className="flex items-start gap-3 text-xs text-zinc-200 sm:text-sm">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400 sm:h-1.5 sm:w-1.5" />
                                        <span>{fact}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-emerald-500/5 p-3 sm:p-4">
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 sm:text-xs-plus">
                                Action Checklist
                            </div>
                            <ul className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                                {actionChecklist.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-xs text-zinc-200 sm:text-sm">
                                        <span className="mt-0.5 text-[10px] text-emerald-400 sm:text-sm">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
