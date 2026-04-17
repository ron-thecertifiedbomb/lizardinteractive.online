"use client";

import { motion } from "framer-motion";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { Video, Mic2, Zap, Play } from "lucide-react";

export default function LizardCreative() {
    const handleInquiry = () => {
        window.location.href = "mailto:contact@lizardinteractive.online";
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500 relative overflow-hidden">
            <ScreenContainer variant="dark" maxWidth="xl">
                <main className="max-w-6xl mx-auto px-6 pt-32 pb-40">

                    {/* --- HERO SECTION --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-32"
                    >
                        <h1 className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-6 font-black">
                            // High-Density Post-Production
                        </h1>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                            Sonic <span className="text-zinc-800 text-outline-white">Precision.</span><br />
                            Visual <span className="text-emerald-500">Impact.</span>
                        </h2>
                        <p className="max-w-xl text-zinc-500 text-sm md:text-lg uppercase tracking-widest leading-relaxed font-medium">
                            Turning raw data into cinematic experiences. Specialized in technical video editing and high-gain audio mastering.
                        </p>
                    </motion.div>

                    {/* --- SERVICES SPLIT --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Video Side */}
                        <div className="bg-zinc-900/30 border border-zinc-900 p-8 md:p-16 hover:border-emerald-500/50 transition-all group">
                            <Video className="text-emerald-500 mb-8" size={40} />
                            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-white">Lizard Visuals</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                                Cinematic video editing via Premiere Pro and After Effects. We specialize in tech-focused content, guitar playthroughs, and brand storytelling.
                            </p>
                            <ul className="text-[10px] font-mono text-emerald-500 space-y-2 uppercase tracking-widest">
                                <li>[ Dynamic Motion Graphics ]</li>
                                <li>[ Color Grading & VFX ]</li>
                                <li>[ Strategic Cuts for Socials ]</li>
                            </ul>
                        </div>

                        {/* Audio Side */}
                        <div className="bg-zinc-900/30 border border-zinc-900 p-8 md:p-16 hover:border-emerald-500/50 transition-all group">
                            <Mic2 className="text-emerald-500 mb-8" size={40} />
                            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-white">Sonic Void</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                                Professional audio mastering and precision tracking. Tailored for heavy guitars and ambient textures to ensure clarity in every transmission.
                            </p>
                            <ul className="text-[10px] font-mono text-emerald-500 space-y-2 uppercase tracking-widest">
                                <li>[ High-Gain Audio Mastering ]</li>
                                <li>[ Precision Guitar Tracking ]</li>
                                <li>[ Sound Design & Ambience ]</li>
                            </ul>
                        </div>
                    </div>

                    {/* --- CTA --- */}
                    <div className="mt-32 text-center">
                        <button
                            onPointerDown={handleInquiry}
                            className="bg-white text-black px-12 py-6 font-black uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95"
                        >
                            Start Your Production
                        </button>
                    </div>
                </main>
            </ScreenContainer>
        </div>
    );
}