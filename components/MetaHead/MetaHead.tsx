"use client";

import Head from "next/head";

interface MetaHeadProps {
    pageContent: any[];
}

export default function MetaHead({ pageContent }: MetaHeadProps) {
    // Find the metadata object in the array
    const meta = pageContent.find((item) => item.type === "metadata") || {};

    // Default Fallbacks
    const title = meta.title || "Lizard Interactive";
    const description = meta.description || "Premium Digital Solutions";
    const ogImage = meta.ogImage || "/lizardinteractive.png";

    return (
        <Head>
            <title key="title">{title}</title>
            <meta name="description" content={description} key="description" />
            <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />

            {/* Social / Sharing */}
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:description" content={description} key="og:description" />
            <meta property="og:image" content={ogImage} key="og:image" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Static Links */}
            <link rel="icon" type="image/png" href="/lizardinteractive.png" />
            <link rel="apple-touch-icon" href="/lizardinteractive.png" />
            <meta name="theme-color" content="#000000" />
        </Head>
    );
}