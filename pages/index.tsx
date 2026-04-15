import Image from "next/image";
import Link from "next/link";
import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function HomePage() {
  const niches = [
    { title: "Ron DevSolutions", desc: "Full-stack architecture. 100/100 Lighthouse performance guaranteed.", href: "/rondevsolutions", label: "View Services", accent: "from-emerald-400 to-cyan-500", tag: "Code" },
    { title: "The Psychedelic Riffer", desc: "Immersive metal production & precision guitar gear engineering.", href: "/thepsychedelicriffer", label: "Enter the Void", accent: "from-purple-500 to-pink-500", tag: "Sound" },
    { title: "Creative Visuals", desc: "High-fidelity content creation & post-production strategies.", href: "/lizard-creative", label: "Portfolio", accent: "from-orange-400 to-red-500", tag: "Vision" }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black flex flex-col overflow-x-hidden">
      {/* 1. BACKGROUND ANCHOR */}
      <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />

      <ScreenContainer variant="dark" maxWidth="xl">
        {/* PADDING SYNC: px-0 on mobile for Full Bleed text, sm/lg restore the gutters */}
        <div className="max-w-7xl mx-auto px-0 sm:px-10 lg:px-20 pt-24 md:pt-32 pb-20 md:pb-40">

          {/* 2. HERO SECTION */}
          <section className="mb-16 md:mb-48 flex flex-col items-center lg:items-start w-full">
            {homeContent.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      /* Sizing */
                      text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] 
                      font-black tracking-tighter 
                      text-center lg:text-left
                      
                      /* THE OVERLAP KILLER: 
                         Relaxed leading on mobile (1.1) stops the letters crashing.
                         Tight leading (0.82) is restored for desktop.
                      */
                      leading-[1.1] sm:leading-[1] md:leading-[0.82] 
                      
                      mb-10 md:mb-14 uppercase 
                      w-full break-words overflow-visible px-0
                    "
                  >
                    {block.content.split('through').map((part, i) => (
                      <span key={i} className="block w-full">
                        {i === 1 && <span className="text-emerald-500">Through </span>}
                        {part}
                      </span>
                    ))}
                  </motion.h1>
                );
              }
              if (block.type === "paragraph" && index === 1) {
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-3xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-8 sm:px-0"
                  >
                    {block.content}
                  </motion.p>
                );
              }
              return null;
            })}
          </section>

          {/* 3. THE DOORS (GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-6 sm:px-0">
            {niches.map((niche, i) => (
              <Link href={niche.href} key={i} className="group relative">
                <div className="relative z-10 h-full p-8 md:p-12 bg-[#080808] border border-zinc-900 rounded-none hover:border-emerald-500/50 transition-all duration-700 overflow-hidden">
                  <span className="absolute -right-2 top-0 text-7xl md:text-9xl font-black text-white/[0.01] select-none group-hover:text-emerald-500/5 transition-all uppercase">
                    {niche.tag}
                  </span>
                  <div className={`w-10 h-[1.5px] mb-8 md:mb-10 bg-gradient-to-r ${niche.accent}`} />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5 tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                    {niche.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-10 md:mb-14 leading-relaxed max-w-[260px]">
                    {niche.desc}
                  </p>
                  <div className="flex items-center gap-4 md:gap-6 text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-800 group-hover:text-white transition-all">
                    <span className="group-hover:translate-x-3 transition-transform">{niche.label}</span>
                    <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-emerald-500/40 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 4. FOOTER HUD */}
          {/* <footer className="mt-20 md:mt-60 border-t border-zinc-900 pt-12 relative flex flex-col items-center lg:items-start px-8 sm:px-0">
            <div className="relative md:absolute md:top-20 md:left-0 z-10 space-y-4 text-center lg:text-left">
              <h2 className="text-zinc-400 text-[10px] md:text-xs font-mono tracking-[1em] uppercase">
                SYSTEM.LIZARD_INTEGRATED
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm max-w-sm uppercase tracking-widest leading-relaxed">
                A multi-vertical ecosystem focused on high-fidelity performance and technical precision.
              </p>
            </div>
            <div className="hidden lg:block text-white/[0.02] text-8xl md:text-[10rem] font-black uppercase pointer-events-none select-none">
              <span>LIZARD INTERACTIVE</span>
            </div>
          </footer> */}

        </div>
      </ScreenContainer>
    </div>
  );
}