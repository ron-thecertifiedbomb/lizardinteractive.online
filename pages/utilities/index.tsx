"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import UtilityCards from "@/components/shared/UtilityCards/UtilityCards";
import { utilities } from "@/data/lists/utilities";
import { utilitiesContent } from "@/data/page/utilitiesContent";


export default function UtilitiesPage() {

  const headerData = utilitiesContent.find(item => item.type === "heading");
  const paragraphData = utilitiesContent.find(item => item.type === "paragraph");

  return (

    <ScreenContainer
      variant="dark"
      maxWidth="xl"
      isHero={false}
      className="overflow-hidden w-full"
    >
      {/* 1. Dynamic SEO from utilitiesContent */}
      <MetaHead pageContent={utilitiesContent} />

      {/* 2. Dynamic Header from utilitiesContent */}
      <SectionHeader
        title={headerData?.content || "Utilities Hub"}
        highlight={headerData?.highlight || "Hub"}
        description={paragraphData?.content || "Zero-tracker, low-latency interfaces."}
      />

      {/* 3. The Grid */}
      <UtilityCards items={utilities} />

    </ScreenContainer>
  );
}