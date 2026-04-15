import Head from "next/head";
import BoxShadowGenerator from "../../components/BoxShadowGenerator/BoxShadowGenerator";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function BoxShadowGeneratorPage() {
    const siteTitle = "CSS Elevation Lab | Lizard Interactive Online";
    const siteDescription = "Precision CSS box-shadow generator. Design industrial elevations, neon glows, and brutalist depths for the modern web.";

    return (
        /* MASTER WRAPPER: Absolute Vantablack */
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* SICK UI HEADER: Unified Gradient Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-4 mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                            System.Elevation
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Generate high-precision CSS box-shadow values with real-time rendering and industrial-grade calibration protocols.
                        </p>
                    </motion.div>

                    {/* GENERATOR MODULE: Centered Workstation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center items-center"
                    >
                        <div className="w-full max-w-5xl">
                            <BoxShadowGenerator />
                        </div>
                    </motion.div>

                    {/* SYSTEM FOOTER METADATA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 flex flex-col items-center gap-4"
                    >
                        <div className="h-px w-12 bg-zinc-800" />
                        <p className="text-[8px] uppercase tracking-[0.8em] font-mono text-zinc-700">
                            Module: CSS_SHADOW_ENGINE // Render_Mode: REAL_TIME
                        </p>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}

// SSG for 100/100 Lighthouse Ranking
export async function getStaticProps() {
    return {
        props: {},
    };
}