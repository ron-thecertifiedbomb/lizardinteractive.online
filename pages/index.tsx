'use client'

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";
import Uplink from "@/components/uplink";

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false);
  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>
      <MetaHead data={seoEntry?.data} />

      <main className="bg-black min-h-screen">
        <AnimatePresence mode="wait">
          {!isBooted ? (
            /* 1. THE BOOT SEQUENCE */
            <motion.div key="uplink-loader">
              <Uplink onComplete={() => setIsBooted(true)} />
            </motion.div>
          ) : (
            /* 2. THE MAIN HOME CONTENT REVEAL */
            <motion.div
              key="home-reveal"
              initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ScreenContainer variant="dark" maxWidth="xl" isHero={true}>
                <Hero homeContent={homeContent} />
              </ScreenContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}