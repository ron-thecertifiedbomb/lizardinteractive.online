"use client";

import Image from "next/image";
import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { niches } from "../data/nichesList";

export default function HomePage() {

  // Force hard navigation to bypass any JS event/dispatch blocks
  const handleForceNav = (href: string) => {
    document.body.style.overflow = 'unset';
    window.location.href = href;
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black flex flex-col overflow-x-hidden z-0">

      {/* 1. BACKGROUND ANCHOR */}
      <div className="fixed inset-0 bg-black -z-[10] pointer-events-none" />

      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 md:pt-32 pb-20 md:pb-40 relative z-10">

          {/* 2. HERO SECTION */}
          <section className="mb-16 md:mb-48 flex flex-col items-center lg:items-start w-full relative">
            {homeContent.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] 
                      font-black tracking-tighter 
                      text-center lg:text-left
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
                    className="text-lg md:text-3xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0"
                  >
                    {block.content}
                  </motion.p>
                );
              }
              return null;
            })}
          </section>

          {/* 3. THE DOORS (GRID) - DISPATCH FIX APPLIED */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-0 sm:px-0 relative z-20">
            {niches.map((niche, i) => (
              <div
                key={i}
                onPointerDown={() => handleForceNav(niche.href)}
                className="group relative block touch-manipulation cursor-pointer"
              >
                <div className="relative z-10 h-full p-8 md:p-12 bg-[#080808] border border-zinc-900 rounded-none hover:border-emerald-500/50 transition-all duration-700 overflow-hidden active:bg-zinc-900">

                  {/* Background Tag */}
                  <span className="absolute -right-2 top-0 text-7xl md:text-9xl font-black text-white/[0.01] select-none group-hover:text-emerald-500/5 transition-all uppercase pointer-events-none">
                    {niche.tag}
                  </span>

                  {/* Accent Line */}
                  <div className={`w-10 h-[1.5px] mb-8 md:mb-10 bg-gradient-to-r ${niche.accent}`} />

                  {/* Content - pointer-events-none ensures the container handles the touch */}
                  <div className="pointer-events-none">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5 tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                      {niche.title}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-10 md:mb-14 leading-relaxed max-w-[260px]">
                      {niche.desc}
                    </p>
                  </div>

                  {/* Label HUD */}
                  <div className="flex items-center gap-4 md:gap-6 text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-zinc-800 group-hover:text-white transition-all pointer-events-none">
                    <span className="group-hover:translate-x-3 transition-transform">{niche.label}</span>
                    <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-emerald-500/40 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </ScreenContainer>
    </div>
  );
}