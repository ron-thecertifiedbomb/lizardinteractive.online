"use client";

import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import UtilityCards from "@/components/shared/UtilityCards/UtilityCards";
import { utilities } from "@/lib/data";


export default function UtilitiesPage() {
  return (
    // Added overflow-x-hidden to prevent the "horizontal scroll" dead space
    <ScreenContainer variant="dark" maxWidth="xl" isHero={false}>

      <SectionHeader
        title="Utilities Hub" // Combined for the split logic
        highlight="Hub"
        description="Low-latency, zero-tracker, and optimized for performance."
      />

      <UtilityCards items={utilities} />

    </ScreenContainer>
  );
}