import Image from "next/image";
import Link from "next/link";
import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function HomePage() {
  const niches = [
    {
      title: "RonDevSolutions",
      desc: "Full-stack architecture. 100/100 Lighthouse performance guaranteed.",
      href: "/rondevsolutions",
      label: "View Services",
      accent: "from-emerald-400 to-cyan-500",
      tag: "Code"
    },
    {
      title: "The Psychedelic Riffer",
      desc: "Immersive metal production & precision guitar gear engineering.",
      href: "/thepsychedelicriffer",
      label: "Enter the Void",
      accent: "from-purple-500 to-pink-500",
      tag: "Sound"
    },
    {
      title: "Creative Visuals",
      desc: "High-fidelity content creation & post-production strategies.",
      href: "/lizard-creative",
      label: "Portfolio",
      accent: "from-orange-400 to-red-500",
      tag: "Vision"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
      <div className="fixed inset-0 bg-black -z-20" />

      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-24 pb-40">

          {/* 2. HERO SECTION */}
          <section className="mb-32 md:mb-48">
            {homeContent.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.9] md:leading-[0.82] mb-10 md:mb-14 uppercase break-words overflow-hidden"
                  >
                    {block.content.split('through').map((part, i) => (
                      <span key={i} className="block">
                        {i === 1 && (
                          <span className="text-emerald-500">
                            Through{" "}
                          </span>
                        )}
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
                    className="text-lg md:text-3xl text-zinc-600 max-w-4xl font-light leading-relaxed md:leading-snug mb-8 tracking-wide"
                  >
                    {block.content}
                  </motion.p>
                );
              }
              return null;
            })}
          </section>

          {/* 3. THE DOORS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {niches.map((niche, i) => (
              <Link href={niche.href} key={i} className="group relative">
                <div className="relative z-10 h-full p-8 md:p-12 bg-[#080808] border border-zinc-900 rounded-none hover:border-emerald-500/50 transition-all duration-700 overflow-hidden">
                  <span className="absolute -right-2 top-0 text-7xl md:text-9xl font-black text-white/[0.01] select-none group-hover:text-emerald-500/5 transition-all uppercase">
                    {niche.tag}
                  </span>
                  <div className={`w-10 h-[1.5px] mb-8 md:mb-10 bg-gradient-to-r ${niche.accent}`} />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5 tracking-tight group-hover:text-emerald-400 transition-colors">
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

          {/* 4. FOOTER WATERMARK - Scaled for Precision */}
          <div className="mt-40 md:mt-60 border-t border-zinc-900 pt-16 relative md:min-h-[300px]">

            {/* The Metadata HUD */}
            <div className="mt-40 md:mt-60 border-t border-zinc-900 pt-16 relative md:min-h-[300px]">

              {/* The Metadata HUD - Shifted to Whiter Grays */}
              <div className="relative md:absolute md:top-20 md:left-0 z-10 space-y-4 md:space-y-6 mb-12 md:mb-0">
                <h2 className="text-zinc-400 text-[10px] md:text-xs font-mono tracking-[0.8em] md:tracking-[1em] uppercase">
                  SYSTEM.LIZARD_INTEGRATED
                </h2>
                <p className="text-zinc-500 text-xs md:text-sm max-w-sm leading-relaxed uppercase tracking-widest">
                  A multi-vertical ecosystem focused on the intersection of high-fidelity performance and digital art.
                </p>
              </div>

              {/* The Massive Foundation */}
              <div className="hidden md:block text-left pointer-events-none select-none">
                <h2 className="flex flex-col text-8xl md:text-[10rem] font-black text-white/[0.02] uppercase tracking-tighter leading-[0.8]">
                  <span>LIZARD</span>
                  <span>INTERACTIVE</span>
                </h2>
              </div>

            </div>

     

          </div>
        </div>
      </ScreenContainer>
    </div>
  );
}