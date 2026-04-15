"use client";

import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { utilities } from "../../lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

export default function UtilitiesHub() {
  const siteTitle = "System.Control | Utilities Hub | Lizard Interactive";
  const siteDescription = "Centralized mission control for all Lizard Interactive utility modules. Initialize system protocols and streamline your production workflow.";

  return (
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
            className="text-center space-y-4 mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              System.Control
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm tracking-[0.3em] uppercase font-mono max-w-2xl mx-auto leading-relaxed italic">
              Central.Utility_Hub // Initialize specialized production modules and execute high-performance system workflows.
            </p>
          </motion.div>

          {/* BRUTALIST GRID: High-performance panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {utilities.map((util, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={util.url}
                  className="group relative block p-8 md:p-10 bg-[#080808] border border-zinc-900 transition-all duration-500 hover:border-emerald-500/50 overflow-hidden h-full shadow-2xl"
                >
                  {/* Background HUD Accent */}
                  <span className="absolute -right-4 -top-2 text-7xl font-black text-white/[0.01] uppercase select-none group-hover:text-emerald-500/[0.03] transition-all">
                    Mod_{idx + 1}
                  </span>

                  <div className="flex flex-col h-full justify-between space-y-12">
                    <div className="space-y-4">
                      {/* Animated accent line */}
                      <div className="w-6 h-[1.5px] bg-emerald-500 opacity-40 group-hover:w-12 transition-all duration-500" />

                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                        {util.name.replace(" ", ".")}
                      </h3>

                      <p className="text-zinc-600 text-[10px] uppercase tracking-widest leading-relaxed font-mono">
                        Execute system_v2 interface for optimized {util.name.toLowerCase()} processing.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em] text-zinc-800 group-hover:text-white transition-all">
                      <span className="group-hover:translate-x-2 transition-transform">Initialize</span>
                      <div className="flex-1 h-[1px] bg-zinc-900 group-hover:bg-emerald-500/30" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity italic">200_OK</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* SYSTEM FOOTER METADATA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.8 }}
            className="mt-24 flex flex-col items-center gap-4 text-center"
          >
            <div className="h-px w-12 bg-zinc-800" />
            <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.8em]">
              HUB_STATUS: OPERATIONAL // SYNC_ACTIVE
            </span>
          </motion.div>

        </div>
      </ScreenContainer>
    </div>
  );
}