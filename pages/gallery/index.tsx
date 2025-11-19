"use client";

import Head from "next/head";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";
import { images } from "../../components/GalleryGrid/images/images";
import Container from "../../components/container";



export default function GalleryPage() {
    const staticPreviewImage = "/imageeditor.jpg";

    return (
        <>
            <Head>
                <title>Gallery | Lizard Interactive Online</title>

                {/* Open Graph */}
                <meta property="og:title" content="Gallery | Lizard Interactive Online" />
                <meta property="og:description" content="Photo Gallery grid component using Tailwind CSS" />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/gallery" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Gallery | Lizard Interactive Online" />
                <meta name="twitter:description" content="Photo Gallery grid component using Tailwind CSS" />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/gallery.jpg" />
            </Head>

            <SectionHeader
                title="Gallery"
                subtitle="Photo Gallery grid component using Tailwind CSS"
            />

                <GalleryGrid images={images} rowHeight={320} />
     
        </>
    );
}
