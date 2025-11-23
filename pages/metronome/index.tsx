"use client";
import Head from "next/head";
import Metronome from "../../components/Metronome/Metronome";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function MetronomePage() {

    const staticPreviewImage = "/metronome.jpg";

    return (
        <>
            <Head>
                {/* REQUIRED SEO TAGS */}
                <title>Online Metronome | Free BPM Tool | Lizard Interactive</title>
                <meta
                    name="description"
                    content="Free online metronome with adjustable BPM, beats, and tempo. Perfect for musicians, drummers, and guitar practice."
                />

                {/* Canonical */}
                <link rel="canonical" href="https://lizardinteractive.online/metronome" />

                {/* Open Graph */}
                <meta property="og:title" content="Online Metronome | Lizard Interactive" />
                <meta property="og:description" content="Keep time with our precise and customizable metronome." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://lizardinteractive.online/metronome" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Online Metronome | Lizard Interactive" />
                <meta name="twitter:description" content="Keep time with our precise and customizable metronome." />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
            </Head>

            <SectionHeader
                title="Metronome"
                subtitle="Keep time with our precise and customizable metronome."
            />

            {/* IMPORTANT: Add crawlable text for Google */}
            <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
                <p>
                    This free online metronome by Lizard Interactive helps musicians practice with
                    accurate timing. Adjust BPM, beats, and tempo to match your playing style. Ideal
                    for guitar, drums, piano, and all music practice sessions.
                </p>
            </div>

            <Metronome />
        </>
    );
}
