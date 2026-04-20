"use client";

import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import Hero from "../components/shared/Hero/Hero";


export default function HomePage() {


  return (
    <ScreenContainer variant="dark" maxWidth="xl">

      <Hero homeContent={homeContent} />

   

    </ScreenContainer>
  );
}