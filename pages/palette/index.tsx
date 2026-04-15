import Head from "next/head";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { Palette } from "../../components/Palette/Pallete";
import { motion } from "framer-motion";

export default function PalettePage() {
  const staticPreviewImage = "/tailwind.jpg";
  const siteTitle = "Tailwind Color Guide | Lizard Interactive Online";
  const siteDescription = "Professional-grade Tailwind CSS color explorer. Calibrate your project's visual identity with the System.Palette module.";

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
        <meta property="og:url" content="https://www.lizardinteractive.online/palette" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
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
              System.Palette
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed">
              Visual Identity Calibration // Explore the full Tailwind CSS spectrum to define high-performance digital aesthetics.
            </p>
          </motion.div>

          {/* COLOR PALETTE MODULE: Centered Workstation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-full">
              <Palette />
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
              Resource.Library: Tailwind_v3_Core
            </span>
          </motion.div>

        </div>
      </ScreenContainer>
    </div>
  );
}

// SSG for that perfect 100 Performance score
export async function getStaticProps() {
  return {
    props: {},
  };
}