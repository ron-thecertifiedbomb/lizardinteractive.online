'use client'

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";
import Uplink from "@/components/uplink";
import AnimatedHero from "@/components/shared/AnimatedHero/AnimatedHero";

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false);
  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>
      <MetaHead data={seoEntry?.data} />

  

              <ScreenContainer variant="dark" maxWidth="xl" isHero={true}>
                  {/* <Hero homeContent={homeContent} /> */}
                  <AnimatedHero />
              </ScreenContainer>
   

   
    </>
  );
}