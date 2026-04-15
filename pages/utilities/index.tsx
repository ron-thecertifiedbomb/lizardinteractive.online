import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { utilities } from "../../lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UtilitiesHub() {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              title="Useful Utilities"
              subtitle="Quickly access our most popular web tools to simplify your workflow."
            />
          </motion.div>

          {/* BRUTALIST GRID: High-performance panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-12">
            {utilities.map((util, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={util.url}
                  className="group relative block p-8 md:p-10 bg-[#080808] border border-zinc-900 transition-all duration-500 hover:border-emerald-500/50 overflow-hidden h-full"
                >
                  {/* Background HUD Accent */}
                  <span className="absolute -right-4 -top-2 text-7xl font-black text-white/[0.01] uppercase select-none group-hover:text-emerald-500/[0.03] transition-all">
                    Tool_{idx + 1}
                  </span>

                  <div className="flex flex-col h-full justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Animated accent line */}
                      <div className="w-6 h-[1.5px] bg-emerald-500 opacity-40 group-hover:w-12 transition-all duration-500" />

                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                        {util.name}
                      </h3>

                      {/* Placeholder description if your data has them, otherwise keeps the clean look */}
                      <p className="text-zinc-500 text-[11px] uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        Execute system utility and streamline production workflow.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-800 group-hover:text-white transition-all">
                      <span className="group-hover:translate-x-2 transition-transform">Initialize</span>
                      <div className="flex-1 h-[1px] bg-zinc-900 group-hover:bg-emerald-500/30" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </ScreenContainer>
    </div>
  );
}