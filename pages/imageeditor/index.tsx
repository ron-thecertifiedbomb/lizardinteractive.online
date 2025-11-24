"use client";

import Head from "next/head";
import ImageEditor from "../../components/ImageEditor/ImageEditor";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

export default function ImageEditorPage() {
    const staticPreviewImage = "/imageeditor.jpg";

    return (
        <>
            <Head>
                <title>Image Editor | Lizard Interactive Online</title>

                {/* Open Graph */}
                <meta property="og:title" content="Image Editor | Lizard Interactive Online" />
                <meta property="og:description" content="Edit and enhance your images with our powerful online image editor." />
                <meta property="og:image" content={`${staticPreviewImage}?v=1`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.lizardinteractive.online/imageeditor" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Image Editor | Lizard Interactive Online" />
                <meta name="twitter:description" content="Edit and enhance your images with our powerful online image editor." />
                <meta name="twitter:image" content={`${staticPreviewImage}?v=1`} />
                <meta name="twitter:image" content="https://www.lizardinteractive.online/imageeditor.jpg" />
            </Head>
<ScreenContainer>
            <SectionHeader
                title="Image Editor"
                subtitle="Edit and enhance your images with our powerful online image editor."
            />

                <ImageEditor />
              </ScreenContainer>
        </>
    );
}
