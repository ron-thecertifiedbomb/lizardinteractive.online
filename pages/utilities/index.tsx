"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import ToolGrid from "@/components/shared/ToolGrid/ToolGrid"; // <-- Use the new Killer UI
import { utilities } from "@/data/lists/utilities";
import { utilitiesContent } from "@/data/page/utilitiesContent";

export default function UtilitiesPage() {

  return (
    <ScreenContainer className="pt-16 md:pt-10">

      <MetaHead pageContent={utilitiesContent} />

      {/* --- The Unified Premium Header --- */}
      <div className="mb-16">
        <MainHeader
          eyebrow="Professional Grade Tools"
          headline="The Engineering Toolkit"
          subheadline="A suite of zero-tracker, low-latency utilities optimized for developers, designers, and creators. Engineered for speed and total privacy."
        />
      </div>

      {/* --- The Lethal Tool Grid --- */}
      <div className="w-full">
        <ToolGrid tools={utilities} />
      </div>

    </ScreenContainer>
  );
}