"use client";

import { useState, useEffect } from "react";
import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { niches } from "../data/nichesList";
import { HERO_TITLE, STAGGER_CONTAINER, FADE_IN } from "../helpers/motion";

export default function HomePage() {

  const [isMobile, setIsMobile] = useState(true); 
  const [hasMounted, setHasMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
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
        setErrorMessage(data.error || "Failed.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Helper logic for flawless transitions
  const useMotion = hasMounted && !isMobile;
  const MotionTag = useMotion ? motion.div : "div";
  const MotionH1 = useMotion ? motion.h1 : "h1";
  const MotionP = useMotion ? motion.p : "p";
  const MotionSection = useMotion ? motion.section : "section";

  return (
    <ScreenContainer variant="dark" maxWidth="xl">
      <MotionTag
        variants={useMotion ? STAGGER_CONTAINER : undefined}
        initial={useMotion ? "initial" : undefined}
        animate={useMotion ? "animate" : undefined}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-16 md:pt-20 pb-0 relative z-10"
      >
        {/* HERO SECTION */}
        <section className="mb-12 md:mb-24 flex flex-col items-center lg:items-start w-full relative">
          {homeContent.map((block, index) => {
            if (block.type === "heading") {
              return (
                <MotionH1
                  key={index}
                  variants={useMotion ? HERO_TITLE : undefined}
                  className="text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black tracking-tighter text-center lg:text-left leading-[0.95] md:leading-[0.82] mb-6 md:mb-8 uppercase w-full break-words transform-gpu antialiased"
                >
                  {block.content.split('through').map((part, i) => (
                    <span key={i} className="block w-full">
                      {i === 1 && <span className="text-emerald-500">Through </span>}
                      {part}
                    </span>
                  ))}
                </MotionH1>
              );
            }
            if (block.type === "paragraph" && index === 1) {
              return (
                <MotionP
                  key={index}
                  variants={useMotion ? FADE_IN : undefined}
                  className="text-base md:text-xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0"
                >
                  {block.content}
                </MotionP>
              );
            }
            return null;
          })}

          <MotionTag variants={useMotion ? FADE_IN : undefined} className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6 mb-8">
            {["40%+ Conv. Lift", "2x Organic Traffic", "Core Web Vitals ✓", "SEO First Page"].map((text, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                <div className={`w-1 h-1 bg-emerald-500 rounded-full ${i === 0 ? 'animate-pulse' : ''}`} />
                <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide uppercase">{text}</span>
              </div>
            ))}
          </MotionTag>

          {/* PORTAL SELECTOR HINT */}
          <div className="text-center lg:text-left mb-4">
            <p className="text-[8px] md:text-[9px] font-mono text-emerald-500/70 tracking-[0.3em] uppercase">
              [ select_your_growth_service ]
            </p>
          </div>
        </section>

        {/* SERVICES CARDS */}
        <div className="flex flex-col gap-6 md:gap-8 relative z-20 max-w-3xl mx-auto lg:max-w-4xl">
          {niches.map((niche, i) => (
            <MotionTag key={i} variants={useMotion ? HERO_TITLE : undefined} className="group relative block w-full">
              <div className="relative z-10 w-full p-6 md:p-8 bg-[#080808] border border-zinc-900 md:hover:border-emerald-500/50 transition-all duration-300 md:hover:translate-x-2 active:scale-[0.98]">
                <span className="absolute -right-2 top-0 text-6xl md:text-7xl font-black text-white/[0.01] group-hover:text-emerald-500/5 transition-all uppercase pointer-events-none">
                  {niche.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase group-hover:text-emerald-400 transition-colors">
                  {niche.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">{niche.desc}</p>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700 group-hover:text-emerald-400 transition-all">
                  <span className="group-hover:translate-x-2 transition-transform">{niche.label}</span>
                  <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-emerald-500/40 transition-all" />
                </div>
              </div>
            </MotionTag>
          ))}
        </div>

        {/* NEWSLETTER SECTION */}
        <MotionSection variants={useMotion ? FADE_IN : undefined} className="mt-24 border-t border-zinc-900 pt-12 pb-24 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4">
              Scale Your <span className="text-emerald-500">Digital Presence</span>
            </h3>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER_EMAIL"
                className="flex-1 bg-black border border-zinc-800 p-4 text-sm focus:border-emerald-500 outline-none font-mono text-white"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-emerald-500 text-black px-8 py-4 font-bold uppercase text-xs hover:bg-emerald-400 active:scale-95 transition-all"
              >
                {status === "loading" ? "SENDING..." : "CONNECT"}
              </button>
            </form>
            {status === "success" && <p className="text-emerald-500 text-[10px] mt-4 font-mono uppercase tracking-widest">Connection Established.</p>}
            {status === "error" && <p className="text-red-500 text-[10px] mt-4 font-mono uppercase tracking-widest">{errorMessage || "Link Failed."}</p>}
          </div>
        </MotionSection>
      </MotionTag>
    </ScreenContainer>
  );
}