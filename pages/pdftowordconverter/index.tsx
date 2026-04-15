import Head from "next/head";
import PDFToWordConverter from "../../components/PDFToWordConverter/PDFToWordConverter";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function PdfToWordConverterPage() {
    const siteTitle = "System.DocConvert | PDF to Word | Lizard Interactive Online";
    const siteDescription = "Industrial-grade document transformation. Convert PDF payloads into editable Word buffers with high-fidelity text extraction.";

    return (
        /* MASTER WRAPPER: Absolute Vantablack */
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content="High-performance PDF to DOCX conversion engine." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/pdftoword" />
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
                            System.DocConvert
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Document.Pipeline_Module // Initialize optical text extraction to rebuild document structures in standard DOCX formats.
                        </p>
                    </motion.div>

                    {/* THE CONVERTER WORKSTATION: Centered */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center"
                    >
                        <div className="w-full">
                            <PDFToWordConverter />
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
                            Engine.Logic: PDFJS_DIST_BUILD // PACKER: DOCX_JS
                        </span>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}

// SSG for 100/100 Lighthouse Performance score
export async function getStaticProps() {
    return {
        props: {},
    };
}