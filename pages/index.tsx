"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import Hero from "@/components/shared/Hero/Hero";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { homeContent } from "@/data/page/homeContent";


export default function HomePage() {

  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>

      <MetaHead data={seoEntry?.data} />

      <ScreenContainer variant="dark" maxWidth="xl" isHero={true}>
        <Hero homeContent={homeContent} />
      </ScreenContainer>
    </>
  );
}