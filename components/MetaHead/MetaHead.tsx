// components/MetaHead/MetaHead.tsx
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

export default function MetaHead({ data, pageContent }: MetaHeadProps) {
    const router = useRouter();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lizardinteractive.online";
    const currentUrl = `${siteUrl}${router.asPath}`;

    let title = data?.title || "Lizard Interactive Online";
    let description = data?.description || "Free online tools for developers, designers, and creators.";
    let ogImage = data?.ogImage || "/og-image.png";
    let ogUrl = data?.ogUrl || currentUrl;
    let ogType = data?.ogType || "website";
    let fbAppId = data?.fbAppId || "";
    let twitterCard = data?.twitterCard || "summary_large_image";

    if (pageContent) {
        const seoData = pageContent.find((item) => item.type === "seo");
        if (seoData?.data) {
            title = seoData.data.title || title;
            description = seoData.data.description || description;
            ogImage = seoData.data.ogImage || ogImage;
        }
    }

    // ✅ CRITICAL FIX: Convert relative image paths to absolute URLs
    const getAbsoluteUrl = (path: string) => {
        if (!path) return `${siteUrl}/og-image.png`;
        if (path.startsWith('http')) return path;
        // Remove leading slash if present to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${siteUrl}/${cleanPath}`;
    };

    const absoluteOgImage = getAbsoluteUrl(ogImage);

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta charSet="utf-8" />
            <meta name="theme-color" content="#000000" />
            <meta name="robots" content="index, follow" />

            {/* Canonical URL */}
            <link rel="canonical" href={ogUrl} />

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
            <link rel="apple-touch-icon" href="/lizardinteractive.png" />

            {/* Open Graph / Facebook - USING ABSOLUTE URLS */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Lizard Interactive Online" />
            <meta property="og:locale" content="en_US" />
            {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

            {/* Twitter Card - USING ABSOLUTE URLS */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteOgImage} />
            <meta name="twitter:image:alt" content={title} />
        </Head>
    );
}