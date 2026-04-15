import Head from "next/head";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import JsPlayground from "../../components/JsPlayground/JsPlayground";
import { motion } from "framer-motion";

export default function JavascriptPlaygroundPage() {
    const siteTitle = "JS Runtime Explorer | Lizard Interactive Online";
    const siteDescription = "A high-performance JavaScript playground for testing logic, array manipulations, and async workflows in real-time.";

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
                            System.Runtime
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
                            Initialize V8 sandboxed environment // Execute and debug high-performance JavaScript logic in real-time.
                        </p>
                    </motion.div>

                    {/* THE PLAYGROUND MODULE: Centered Workstation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center"
                    >
                        <div className="w-full">
                            <JsPlayground />
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
                            Runtime.Engine: Browser_Default_V8
                        </span>
                    </motion.div>

                </div>
            </ScreenContainer>
        </div>
    );
}

// Ensure SSG for maximum Lighthouse performance
export async function getStaticProps() {
    return {
        props: {},
    };
}