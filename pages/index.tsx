"use client";

import { useState } from "react";
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

  // Newsletter state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(""); // ← THIS WAS MISSING

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Subscription failed. Please try again.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-16 md:pt-20 pb-0 relative z-10">

          {/* HERO SECTION */}
          <section className="mb-12 md:mb-24 flex flex-col items-center lg:items-start w-full relative">
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
                      mb-6 md:mb-8 uppercase 
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
                    className="text-base md:text-xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0"
                  >
                    {block.content}
                  </motion.p>
                );
              }
              return null;
            })}

            {/* SOCIAL PROOF BADGES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6 mb-8"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide">100/100 Lighthouse</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide">&lt;1s LCP</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide">0 CLS</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide">Studio Quality</span>
              </div>
            </motion.div>

            {/* PORTAL SELECTOR HINT */}
            <div className="text-center lg:text-left mb-4">
              <p className="text-[8px] md:text-[9px] font-mono text-emerald-500/70 tracking-[0.3em] uppercase">
                [ select_your_portal ]
              </p>
            </div>
          </section>

          {/* DOORS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-0 sm:px-0 relative z-20">
            {niches.map((niche, i) => (
              <div
                key={i}
                onPointerDown={() => handleForceNav(niche.href)}
                className="group relative block touch-manipulation cursor-pointer"
              >
                <div className="relative z-10 h-full p-6 md:p-8 bg-[#080808] border border-zinc-900 rounded-none hover:border-emerald-500/50 transition-all duration-700 overflow-hidden active:bg-zinc-900 hover:scale-[1.02] transform transition-transform duration-500">

                  <span className="absolute -right-2 top-0 text-6xl md:text-7xl font-black text-white/[0.01] select-none group-hover:text-emerald-500/5 transition-all uppercase pointer-events-none">
                    {niche.tag}
                  </span>

                  <div className={`w-8 h-[1px] mb-5 md:mb-6 bg-gradient-to-r ${niche.accent}`} />

                  <div className="pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                      {niche.title}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                      {niche.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-800 group-hover:text-white transition-all pointer-events-none">
                    <span className="group-hover:translate-x-2 transition-transform">{niche.label}</span>
                    <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-emerald-500/40 transition-all" />
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 mt-4 text-[7px] text-emerald-500 font-mono tracking-[0.2em] text-center pointer-events-none">
                    [ click_to_enter → ]
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NEWSLETTER SECTION - UNIFIED FOR ALL SERVICES */}
          <section className="mt-24 md:mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-t border-zinc-900 pt-12 md:pt-16"
            >
              <div className="text-center mb-8 md:mb-10">
                <div className="text-emerald-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4">
                  subscribe_to_neural_feed
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                  Enter the <span className="text-emerald-500">Lizard Network</span>
                </h3>
                <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  Weekly insights on high-performance code, cinematic audio mastering,
                  and strategic video production — delivered to your inbox.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@domain.com"
                    required
                    className="flex-1 px-4 py-3 bg-black border border-zinc-800 text-white text-sm focus:border-emerald-500 outline-none transition-colors"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-8 py-3 bg-emerald-500 text-black text-sm font-mono uppercase tracking-wider hover:bg-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {status === "loading" ? "Sending..." : status === "success" ? "✓ Subscribed" : "Join the Network →"}
                  </button>
                </form>
                {status === "success" && (
                  <p className="text-emerald-500 text-xs mt-4 text-center">
                    ✓ Transmission received. Welcome to the Lizard Network.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-xs mt-4 text-center">
                    {errorMessage}
                  </p>
                )}
                <p className="text-zinc-600 text-[9px] text-center mt-4 font-mono tracking-wider">
                  No spam. Unsubscribe anytime. Just weekly transmissions.
                </p>
              </div>
            </motion.div>
          </section>

          {/* EXTRA BOTTOM SPACE BEFORE FOOTER */}
          <div className="h-12 md:h-16"></div>

        </div>
      </ScreenContainer>
    </>
  );
}