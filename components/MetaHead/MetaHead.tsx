import Head from "next/head";
import { useRouter } from "next/router";

interface MetaHeadProps {
    data?: {
        title?: string;
        description?: string;
        ogImage?: string;
        ogUrl?: string;
        ogType?: string;
        fbAppId?: string;
        twitterCard?: string;
    };
    pageContent?: Array<{ type: string; data?: any }>;
}

export default function MetaHead({ data }: MetaHeadProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lizardinteractive.online";

    // Convert relative paths to absolute URLs
    const getAbsoluteUrl = (path?: string) => {
        if (!path) return `${siteUrl}/og-image-homepage.jpg`;
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${siteUrl}/${cleanPath}`;
    };

    const absoluteOgImage = getAbsoluteUrl(data?.ogImage);
    const absoluteOgUrl = getAbsoluteUrl(data?.ogUrl);

    return (
        <Head>
            {/* Basic */}
            <title>{data?.title}</title>
            <meta name="description" content={data?.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta charSet="utf-8" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#000000" />

            {/* Open Graph */}
            <meta property="og:type" content={data?.ogType || "website"} />
            <meta property="og:site_name" content="Lizard Interactive Online" />
            <meta property="og:title" content={data?.title} />
            <meta property="og:description" content={data?.description} />
            {/* ✅ FIXED: Use ogImage, not ogUrl! */}
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={absoluteOgUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content={data?.twitterCard || "summary_large_image"} />
            <meta name="twitter:title" content={data?.title} />
            <meta name="twitter:description" content={data?.description} />
            {/* ✅ FIXED: Use ogImage, not ogUrl! */}
            <meta name="twitter:image" content={absoluteOgImage} />
        </Head>
    );
}