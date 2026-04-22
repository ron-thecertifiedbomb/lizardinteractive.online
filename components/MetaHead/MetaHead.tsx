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

    // ✅ Always provide explicit values - no inference
    const title = data?.title || "Lizard Interactive Online";
    const description = data?.description || "Free online tools for developers, designers, and creators.";
    const absoluteOgImage = getAbsoluteUrl(data?.ogImage);
    const absoluteOgUrl = getAbsoluteUrl(data?.ogUrl) || siteUrl;
    const ogType = data?.ogType || "website";

    return (
        <Head>
            {/* Basic */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta charSet="utf-8" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#000000" />

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
            <link rel="apple-touch-icon" href="/lizardinteractive.png" />

            {/* ✅ Open Graph - ALL properties explicitly provided */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:url" content={absoluteOgUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Lizard Interactive Online" />
            <meta property="og:locale" content="en_US" />
            {data?.fbAppId && <meta property="fb:app_id" content={data.fbAppId} />}

            {/* ✅ Twitter Card - ALL properties explicitly provided */}
            <meta name="twitter:card" content={data?.twitterCard || "summary_large_image"} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteOgImage} />
            <meta name="twitter:image:alt" content={title} />
        </Head>
    );
}