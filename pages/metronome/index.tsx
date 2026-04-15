"use client";

import Head from "next/head";
import Metronome from "../../components/Metronome/Metronome";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function MetronomePage() {
    const staticPreviewImage = "/metronome.jpg";
    const siteTitle = "Metronome | Lizard Interactive Online";

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta
                    name="description"
                    content="Free online metronome with adjustable BPM, beats, and tempo. Perfect for musicians, drummers, and guitar practice."
                />
                <link rel="canonical" href="https://lizardinteractive.online/metronome" />

                {/* Open Graph */}
                <meta property="og:title" content="Online Metronome | Lizard Interactive" />
                <meta property="og:description" content="Keep time with our precise and customizable metronome." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:url" content="https://lizardinteractive.online/metronome" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* SICK UI HEADER: Matches Image Editor Title Gradient */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                            System.Pulse
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Initialize high-precision WebAudio clock for synchronization and rhythmic discipline.
                        </p>
                    </motion.div>

                    {/* CENTERED WORKSTATION */}
                    <div className="flex flex-col items-center justify-center space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full flex justify-center"
                        >
                            <Metronome />
                        </motion.div>

                        {/* CRAWLABLE SEO TEXT: Styled like System Logs */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl text-center border-t border-zinc-900 pt-8"
                        >
                            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-loose">
                                This high-fidelity metronome helps musicians practice with accurate timing.
                                Adjust BPM, beats, and tempo for guitar, drums, and piano.
                                Built for performance by Lizard Interactive.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </ScreenContainer>
        </div>
    );
}