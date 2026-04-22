'use client'

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";
import Uplink from "@/components/uplink";
import AnimatedHero from "@/components/shared/AnimatedHero/AnimatedHero";
import PresentationSection from "@/components/shared/PresentationSection/PresentationSection";
import { lizardContent } from "@/data/page/lizardContent";

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false);
  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>
      <MetaHead data={seoEntry?.data} />

  

              <ScreenContainer>
                  {/* <Hero homeContent={homeContent} /> */}
        {/* <AnimatedHero /> */}
         <PresentationSection
          data={lizardContent}
                badge="Lizard Interactive Online // v1.1"
              />
              </ScreenContainer>
   

   
    </>
  );
}