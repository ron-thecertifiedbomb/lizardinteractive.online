import Link from "next/link";
import { motion } from "framer-motion";

import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";
import { utilities } from "@/data/lists/utilities";
import { FramerPresentation } from "@/components/FramerPresentation/FramerPresentation";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
// <-- Add your path here

// Get featured tools (specific tools you want to highlight)
const featuredTools = utilities.filter(tool =>
  [
    "text-tools",
    "qrcode-generator",
    "password-generator",
    "json-formatter",
    "unit-converter",
    "speed-test",
    "base64-tool",
    "video-to-gif",
    "pagespeed-insights"
  ].includes(tool.slug)
);

export default function HomePage() {
  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>
      <MetaHead
        data={{
          title: seoEntry?.data?.title || "Lizrd Interactive Online | Performance Engineering",
          description: seoEntry?.data?.description || "I build the fastest 1% of the web. Guaranteed 100/100 Lighthouse performance.",
          ogImage: seoEntry?.data?.ogImage || "/og-image-homepage.jpg",
          ogUrl: "https://lizardinteractive.online",
          ogType: "website",
        }}
      />

      <ScreenContainer className="pt-0">

        {/* The New High-Conversion Hero Section */}
        <HeroSection />

        <FramerPresentation />

        <div className="mt-24 mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-black uppercase tracking-tighter text-center mb-2 text-emerald-500">
              FREE ONLINE TOOLS
            </h2>
            <p className="text-center text-zinc-300 text-sm font-mono mb-16 uppercase">
              Professional utilities for developers, designers, and creators
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/utilities/${tool.slug}`}
                    className="group block p-4 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-3xl mb-2">{tool.icon}</div>
                    <h3 className="font-black text-white text-sm uppercase tracking-wider mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-500 line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
              <Link
                href="/utilities"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition text-xs font-mono uppercase tracking-wider"
              >
                View All {utilities.length} Tools →
              </Link>
            </div>
          </motion.div>
        </div>
      </ScreenContainer>
    </>
  );
}