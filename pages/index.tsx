import Link from "next/link";
import { motion } from "framer-motion";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";
import { utilities } from "@/data/lists/utilities";
import { FramerPresentation } from "@/components/FramerPresentation/FramerPresentation";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import ImpactBanner from "@/components/shared/ImpactBanner/ImpactBanner";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ToolGrid from "@/components/shared/ToolGrid/ToolGrid";
import ActionLink from "@/components/shared/ActionLink/ActionLink";


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
          title: seoEntry?.data?.title || "I Build the Fastest 1% of the Web. | Lizrd Interactive Online",
          description: seoEntry?.data?.description || "Stop losing mobile customers to bloated, slow-loading websites. I engineer lightning-fast custom web applications with a guaranteed 100/100 Google Lighthouse performance score.",
          ogImage: seoEntry?.data?.ogImage || "/api/og",
          ogUrl: "https://lizardinteractive.online",
          ogType: "website",
        }}
      />

      <ScreenContainer>

        {/* The New High-Conversion Hero Section */}
        <HeroSection />

        {/* --- The Reusable Conversion Stat Divider --- */}
        <ImpactBanner
          leftEyebrow="The Cost of Slow Tech"
          leftTopLine="A 1-second load delay costs you"
          leftBottomLine="7% of conversions."
          leftStrikethrough={true}
          rightEyebrow="The Lizard Guarantee"
          rightTopLine="Millisecond load times."
          rightBottomLine="Maximum retained revenue."
        />

        <FramerPresentation />

        <div className="mt-32 mb-20 px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* The Reusable MainHeader */}
            <div className="mb-16">
              <MainHeader
                eyebrow="Open Source Resources"
                headline="The Engineering Toolkit"
                subheadline="A suite of professional utilities and performance tools built for modern developers. Engineered for speed, completely free to use."
              />
            </div>

            {/* --- The Reusable Tool Grid --- */}
            <ToolGrid tools={featuredTools} />

            {/* View All Link */}
            <ActionLink
              href="/utilities"
              label={`Access All ${utilities.length} Tools`}
              className="mt-16"
            />

          </motion.div>
        </div>
      </ScreenContainer>
    </>
  );
}