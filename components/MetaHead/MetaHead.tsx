"use client";

import Head from "next/head";

interface MetaHeadProps {
    // Accepts either the old SEOData object or the new Content Array
    data?: {
        title?: string;
        description?: string;
        keywords?: string;
        ogImage?: string;
    };
    pageContent?: any[];
}

export default function MetaHead({ data, pageContent }: MetaHeadProps) {
    // 1. Global Defaults
    const siteTitle = "Lizard Interactive Online";
    const siteDescription = "Official hub for the Lizard Interactive Online community.";
    const siteUrl = "https://lizardinteractive.online";
    const defaultOgImage = `${siteUrl}/og-image-homepage.jpg`;

    // 2. Extract metadata if pageContent array is provided
    const contentMeta = pageContent?.find(item => item.type === "metadata");

    // 3. Resolve Values (Priority: pageContent array > data prop > Defaults)
    const titleValue = contentMeta?.title || data?.title;
    const descValue = contentMeta?.description || data?.description || siteDescription;
    const imageValue = contentMeta?.ogImage || data?.ogImage || defaultOgImage;
    const keywordValue = contentMeta?.keywords || data?.keywords;

    const finalTitle = titleValue ? `${titleValue} | ${siteTitle}` : siteTitle;

    return (
        <Head>
            <title key="title">{finalTitle}</title>
            <meta name="description" content={descValue} key="description" />
            {keywordValue && <meta name="keywords" content={keywordValue} key="keywords" />}

            {/* The Fix for your 63 SEO Score */}
            <meta name="robots" content="index, follow" />

            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta charSet="utf-8" />
            <link rel="icon" type="image/png" href="/lizardinteractive.png" />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} key="og:title" />
            <meta property="og:description" content={descValue} key="og:description" />
            <meta property="og:image" content={imageValue} key="og:image" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} key="twitter:title" />
            <meta name="twitter:description" content={descValue} key="twitter:description" />
            <meta name="twitter:image" content={imageValue} key="twitter:image" />
        </Head>
    );
}