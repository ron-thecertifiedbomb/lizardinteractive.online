"use client";
import { Head } from "next/document";
import Metronome from "../../components/Metronome/Metronome";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";


export default function MetronomePage() {


    const staticPreviewImage = "/imageeditor.jpg";

    return (
        <>
            {/* <Head>
                <title>Metronome | Lizard Interactive Online</title>

    
                <meta property="og:title" content="Metronome | Lizard Interactive Online" />
                <meta property="og:description" content="Keep time with our precise and customizable metronome." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/Metronome" />

       
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Metronome | Lizard Interactive Online" />
                <meta name="twitter:description" content="Keep time with our precise and customizable metronome." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/Metronome.jpg" />
            </Head> */}

            <SectionHeader
                title="Metronome"
                subtitle="Keep time with our precise and customizable metronome."
            />
            <Metronome />

        </>
    );
}
