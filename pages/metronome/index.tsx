"use client";
import Head from "next/head";
import Metronome from "../../components/Metronome/Metronome";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function MetronomePage() {

    const staticPreviewImage = "/metronome.jpg";

    return (
        <>
            <Head>

                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Metronome | Lizard Interactive Online" />
                <meta property="og:description" content="Keep time with our precise and customizable metronome." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/metronome" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Metronome | Lizard Interactive Online" />
                <meta name="twitter:description" content="Keep time with our precise and customizable metronome." />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/metronome.jpg" />
            </Head>

            <SectionHeader
                title="Metronome"
                subtitle="Keep time with our precise and customizable metronome."
            />
            <Metronome />
         
        </>
    );
}
