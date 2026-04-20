"use client";

import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { niches } from "../data/nichesList";
import Hero from "../components/shared/Hero/Hero";
import ServicesCards from "../components/shared/ServicesCards/ServicesCards";
import Newsletter from "../components/shared/NewsLetter/NewsLetter";

export default function HomePage() {


  return (
    <ScreenContainer variant="dark" maxWidth="xl">

      <Hero homeContent={homeContent} />

      <ServicesCards
        niches={niches} />
      <Newsletter />

    </ScreenContainer>
  );
}