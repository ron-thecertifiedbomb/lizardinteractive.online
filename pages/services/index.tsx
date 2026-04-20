"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import Newsletter from "@/components/shared/NewsLetter/NewsLetter";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import ServicesCards from "@/components/shared/ServicesCards/ServicesCards";
import { niches } from "@/data/nichesList";
import { servicesContent } from "@/data/servicesContent";


export default function ServicesPage() {

  const seoEntry = servicesContent.find((item) => item.type === "seo");
  return (
    <ScreenContainer variant="dark" maxWidth="xl">
      <MetaHead data={seoEntry?.data} />
      <Hero homeContent={servicesContent} />

      <ServicesCards
        niches={niches} />
      <Newsletter />

    </ScreenContainer>
  );
}