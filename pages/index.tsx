"use client";

import { homeContent } from "../data/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import Hero from "../components/shared/Hero/Hero";
import MetaHead from "@/components/MetaHead/MetaHead";


export default function HomePage() {

  const seoEntry = homeContent.find((item) => item.type === "seo");

  return (
    <>

      <MetaHead data={seoEntry?.data} />

      <ScreenContainer variant="dark" maxWidth="xl">
        <Hero homeContent={homeContent} />
      </ScreenContainer>
    </>
  );
}