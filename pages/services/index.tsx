"use client";

import Hero from "@/components/shared/Hero/Hero";
import Newsletter from "@/components/shared/NewsLetter/NewsLetter";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import ServicesCards from "@/components/shared/ServicesCards/ServicesCards";
import { niches } from "@/data/nichesList";
import { servicesContent } from "@/data/servicesContent";


export default function HomePage() {


  return (
    <ScreenContainer variant="dark" maxWidth="xl">

      <Hero homeContent={servicesContent}  />

      <ServicesCards
        niches={niches} />
      <Newsletter />

    </ScreenContainer>
  );
}