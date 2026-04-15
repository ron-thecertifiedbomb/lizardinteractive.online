import Head from "next/head";
import ScreenRecorder from "../../components/ScreenRecorder/ScreenRecorder";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function ScreenRecorderPage() {
  const siteTitle = "System.Capture | Screen Recorder | Lizard Interactive";
  const siteDescription = "High-performance browser-based screen recording. Capture, review, and download system activity with zero latency.";

  return (
    /* MASTER WRAPPER: Absolute Vantablack */
    <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        {/* Canonical ensures no duplicate content penalty for SEO */}
        <link rel="canonical" href="https://lizardinteractive.online/screenrecorder" />
      </Head>

      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

          {/* SICK UI HEADER: Unified Gradient Design Matches Metronome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              System.Capture
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
              Video.Encoding_Module // Initialize high-fidelity screen recording directly in your browser with zero external dependencies.
            </p>
          </motion.div>

          {/* MAIN RECORDER MODULE: Centered Workstation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center items-center"
          >
            {/* Elevated shadow creates the 'floating glass' effect against the black */}
            <div className="w-full max-w-4xl shadow-[0_0_60px_rgba(0,0,0,1)] border border-zinc-900/50">
              <ScreenRecorder />
            </div>
          </motion.div>

          {/* SYSTEM FOOTNOTE: Standardized across all utilities */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-col items-center gap-4 text-center"
          >
            <div className="h-px w-12 bg-zinc-800" />
            <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
              Security.Protocol: CLIENT_SIDE_ENCODING // NO_DATA_EGRESS
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