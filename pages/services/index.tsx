"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import Newsletter from "@/components/shared/NewsLetter/NewsLetter";
import PresentationSection from "@/components/shared/PresentationSection/PresentationSection";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { landingPagePresentation } from "@/data/page/landingPagePresentation";
import { lizardContent } from "@/data/page/lizardContent";
import { servicesContent } from "@/data/servicesContent";



export default function ServicesPage() {


  return (

      <ScreenContainer>
      <MetaHead />
      <MainHeader
        eyebrow={landingPagePresentation.eyebrow}
        headline={landingPagePresentation.heading1}
        subheadline={landingPagePresentation.description}
      />
      <PresentationSection
             data={lizardContent}
                 
                 />
      <PresentationSection
        data={landingPagePresentation}
      
      />
      {/* <ServicesCards
        niches={niches} /> */}
      <Newsletter />

    </ScreenContainer>
  );
}