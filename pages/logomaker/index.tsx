"use client";

import Head from "next/head";
import Container from "../../components/container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import LogoMaker from "../../components/LogoMaker/LogoMaker";

export default function LogoMakerPage() {
    const staticPreviewImage = "/tailwind.jpg"; 

    return (
        <>
            <Head>
                <title>Logo Maker | Lizard Interactive Online</title>

                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Logo Maker | Lizard Interactive Online" />
                <meta property="og:description" content="Create and customize your own logos with ease." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/logomaker" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Logo Maker | Lizard Interactive Online" />
                <meta name="twitter:description" content="Create and customize your own logos with ease." />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/tailwind.jpg" />
            </Head>

            <Container>
                <SectionHeader
                    title="Logo Maker"
                    subtitle="Create and customize your own logos with ease."
                />


                <LogoMaker />
            </Container>
        </>
    );
}
