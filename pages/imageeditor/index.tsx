"use client";

import Head from "next/head";
import ImageEditor from "../../components/ImageEditor/ImageEditor";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";

export default function ImageToTextPage() {
    const staticPreviewImage = "/imageeditor.jpg"; 

    return (
        <>
            <Head>
                <title>Tailwind Color Guide | Lizard Interactive Online</title>

                {/* Open Graph */}
                <meta property="og:title" content="Tailwind Color Guide | Lizard Interactive Online" />
                <meta property="og:description" content="Explore Tailwind CSS colors and find the perfect palette for your projects." />
                <meta property="og:image" content="https://www.lizardinteractive.online/imageeditor.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/imageeditor" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Tailwind Color Guide | Lizard Interactive Online" />
                <meta name="twitter:description" content="Explore Tailwind CSS colors and find the perfect palette for your projects." />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/imageeditor.jpg" />
            </Head>
            <SectionHeader
                title="Image Editor"
                subtitle="Edit and enhance your images with our powerful online image editor."
            />

            <ImageEditor />
        </>
    );
}
