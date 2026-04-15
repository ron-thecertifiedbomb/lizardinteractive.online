import Head from "next/head";
import ImageToTextConverter from "../../components/ImageToText/ImageToText";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function ImageToTextPage() {
    const staticPreviewImage = "/imagetotext.jpg";
    const siteTitle = "System.OCR | Image to Text | Lizard Interactive Online";

    return (
        /* MASTER WRAPPER: Absolute Vantablack */
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content="High-performance optical character recognition. Extract data from images with the Lizard Interactive OCR engine." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/imagetotext" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
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
                            System.OCR
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Optical Character Recognition Engine // Initialize high-precision visual parsing to extract raw data from image buffers.
                        </p>
                    </motion.div>

                    {/* THE OCR WORKSTATION: Centered */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center"
                    >
                        <div className="w-full">
                            <ImageToTextConverter />
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
                        <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
                            Engine.Source: TESSERACT_JS_WASM
                        </span>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}

// SSG for 100/100 Lighthouse Performance
export async function getStaticProps() {
    return {
        props: {},
    };
}