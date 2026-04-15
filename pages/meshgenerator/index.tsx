"use client";

import Head from "next/head";
import MeshGenerator from "../../components/MeshGenerator/MeshGenerator"; // Using the component we architected
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function MeshGradientPage() {
    const siteTitle = "System.Visual | Mesh Gradient Generator | Lizard Interactive";
    const siteDescription = "Generate high-fidelity CSS mesh gradients. Layered radial-gradient synthesis for modern web infrastructure.";

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content="Industrial-grade CSS mesh gradient synthesis." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/tools/mesh-gradient" />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* HEADER: Matches System.Pulse and System.DocConvert */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                            System.Visual
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Visual.Synthesis_Module // Layered radial oscillators to generate organic mesh structures for modern interfaces.
                        </p>
                    </motion.div>

                    {/* WORKSTATION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <MeshGenerator />
                    </motion.div>

                    {/* SYSTEM FOOTER */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 flex flex-col items-center gap-4"
                    >
                        <div className="h-px w-12 bg-zinc-800" />
                        <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
                            Engine.Logic: RADIAL_GRADIENT_STACK // EXPORT_TYPE: CSS_VAR
                        </span>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}