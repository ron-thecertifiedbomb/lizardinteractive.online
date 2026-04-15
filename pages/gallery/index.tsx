"use client";

import Head from "next/head";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";
import { images } from "../../components/GalleryGrid/images/images";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function GalleryPage() {
    const staticPreviewImage = "/imageeditor.jpg";
    const siteTitle = "System.Assets | Gallery | Lizard Interactive";
    const siteDescription = "Industrial-grade visual asset gallery. A high-performance bento-grid experience for digital media and project documentation.";

    return (
        /* MASTER WRAPPER: Absolute Vantablack */
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />

                {/* Open Graph */}
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/gallery" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={siteDescription} />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto pt-24 pb-40">

                    {/* SICK UI HEADER: Unified Gradient Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-4 mb-20 px-6"
                    >
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                            System.Assets
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed italic">
                            Media.Gallery_Module // Initializing high-density bento grid for visual documentation and asset management.
                        </p>
                    </motion.div>

                    {/* THE GALLERY WORKSTATION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {/* Passing rowHeight={280} for a tighter industrial feel 
                            that keeps the bento spans mathematically even.
                        */}
                        <GalleryGrid images={images} />
                    </motion.div>

                    {/* SYSTEM FOOTER METADATA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ delay: 1 }}
                        className="mt-24 flex flex-col items-center gap-4 text-center"
                    >
                        <div className="h-px w-12 bg-zinc-800" />
                        <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
                            Rendering: Bento_V2 // Optimization: Lazy_Load_Active
                        </span>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}