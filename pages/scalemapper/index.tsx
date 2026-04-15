"use client";

import Head from "next/head";

import { motion } from "framer-motion";
import { Activity, Crosshair, ChevronRight } from "lucide-react";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import ScaleMapper from "../../components/ScaleMapper/ScaleMapper";

export default function ScaleMapperPage() {
    const siteTitle = "Scale.Mapper | Lizard Interactive Online";
    const description = "Interactive guitar fretboard visualizer. Map scales, modes, and CAGED shapes across a 22-fret matrix with zero latency.";

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href="https://lizardinteractive.online/utilities/scale-mapper" />

                {/* Open Graph / Social HUD */}
                <meta property="og:title" content="Scale.Mapper | High-Precision Fretboard Visualizer" />
                <meta property="og:description" content="Master the fretboard with our interactive scale matrix." />
                <meta property="og:image" content="https://lizardinteractive.online/og-scale-mapper.jpg" />
                <meta property="og:url" content="https://lizardinteractive.online/utilities/scale-mapper" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* --- INDUSTRIAL HEADER: METRONOME SYNCED --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse" />
                            <span className="text-emerald-500 font-mono text-[9px] tracking-[0.5em] uppercase font-black">
                                UTILITY_MODULE // 003
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                            System.Matrix
                        </h1>

                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Deploying high-precision fretboard geometry for harmonic analysis and solo construction.
                        </p>
                    </motion.div>

                    {/* --- MAIN WORKSTATION --- */}
                    <div className="flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                        >
                            <ScaleMapper />
                        </motion.div>

                        {/* --- SYSTEM LOGS (SEO & TEXT) --- */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.4 }}
                            className="mt-20 max-w-3xl w-full border-t border-zinc-900 pt-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white font-mono text-[10px] uppercase tracking-widest">
                                        <Activity size={12} className="text-emerald-500" />
                                        Diagnostic_Scope
                                    </div>
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-loose">
                                        The Scale.Matrix identifies every safe interval across a 22-fret standard tuning environment.
                                        Essential for guitarists tracking solos for high-gain productions.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white font-mono text-[10px] uppercase tracking-widest">
                                        <Crosshair size={12} className="text-emerald-500" />
                                        Target_Parameters
                                    </div>
                                    <ul className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 space-y-2">
                                        <li className="flex items-center gap-2 text-emerald-500/50">
                                            <ChevronRight size={10} /> Full Chromatic Support
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ChevronRight size={10} /> CAGED Shape Visualization
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ChevronRight size={10} /> SVG Latency Optimization
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </ScreenContainer>
        </div>
    );
}