import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { utilities } from "@/data/lists/utilities";
import { FramerPresentation } from "@/components/FramerPresentation/FramerPresentation";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import ImpactBanner from "@/components/shared/ImpactBanner/ImpactBanner";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ToolGrid from "@/components/shared/ToolGrid/ToolGrid";
import ActionLink from "@/components/shared/ActionLink/ActionLink";

const FEATURED_SLUGS = [
  "text-tools",
  "qrcode-generator",
  "password-generator",
  "json-formatter",
  "unit-converter",
  "speed-test",
  "base64-tool",
  "video-to-gif",
  "pagespeed-insights",
];

interface HomePageProps {
  toolCount: number;
}

export default function HomePage({ toolCount }: HomePageProps) {
  const featuredTools = utilities.filter((tool) =>
    FEATURED_SLUGS.includes(tool.slug)
  );

  return (
    <>
      {/*
        No props needed — MetaHead pulls title, description, OG image,
        JSON-LD, Twitter handle, etc. all from site.config.json by default.
        Only pass `data` when you need to override for a specific page.
      */}
      <MetaHead />

      <ScreenContainer>
        <HeroSection />

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
            <div className="mb-16">
              <MainHeader
                eyebrow="Open Source Resources"
                headline="The Engineering Toolkit"
                subheadline="A suite of professional utilities and performance tools built for modern developers. Engineered for speed, completely free to use."
              />
            </div>

            <ToolGrid tools={featuredTools} />

            <ActionLink
              href="/utilities"
              label={`Access All ${toolCount} Tools`}
              className="mt-16"
            />
          </motion.div>
        </div>
      </ScreenContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      toolCount: utilities.length,
    },
  };
};
