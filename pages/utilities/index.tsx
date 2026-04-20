"use client";

import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { utilities } from "../../lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import UtilityCards from "../../components/shared/UtilityCards/UtilityCards";

export default function UtilitiesHub() {
  const siteTitle = "System.Control | Utilities Hub | Lizard Interactive";
  const siteDescription = "Centralized mission control for all Lizard Interactive utility modules. Initialize system protocols and streamline your production workflow.";

  return (

    <ScreenContainer variant="dark" maxWidth="xl">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
      </Head>

      <SectionHeader
        title="Utilities"
        highlight="Hub"
        description="Low-latency, zero-tracker, and optimized for performance."
      />

      <UtilityCards items={utilities} />



    </ScreenContainer>

  );
}