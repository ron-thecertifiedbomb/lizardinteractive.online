"use client";

import Head from "next/head";
import Container from "../../components/container";
import { Palette } from "../../components/Palette/Pallete";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function PalettePage() {
  const staticPreviewImage = "/tailwind.jpg"; // image in public folder

  return (
    <>
      <Head>
        <title>Tailwind Color Guide | Lizard Interactive Online</title>

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Tailwind Color Guide | Lizard Interactive Online" />
        <meta property="og:description" content="Explore Tailwind CSS colors and find the perfect palette for your projects." />
        <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lizardinteractive.online/palette" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tailwind Color Guide | Lizard Interactive Online" />
        <meta name="twitter:description" content="Explore Tailwind CSS colors and find the perfect palette for your projects." />
        <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
        <meta name="twitter:image" content="https://www.lizardinteractive.online/tailwind.jpg" />
      </Head>

      <Container>
        <SectionHeader
          title="Tailwind Color Guide"
          subtitle="Explore Tailwind CSS colors and find the perfect palette for your projects."
        />

        {/* Static preview image */}
        <div className="my-6 text-center">
          <img
            src={staticPreviewImage}
            alt="Tailwind Color Guide Preview"
            className="w-full max-w-3xl rounded-lg shadow-lg mx-auto"
          />
        </div>

        <Palette />
      </Container>
    </>
  );
}
