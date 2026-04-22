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

    // Extract data from pageContent if provided
    let title = data?.title || "Lizard Interactive Online";
    let description = data?.description || "Free online tools for developers, designers, and creators. NES emulator, password generator, QR codes, and more.";
    let ogImage = data?.ogImage || "/og-image.png";
    let ogUrl = data?.ogUrl || currentUrl;
    let ogType = data?.ogType || "website";
    let fbAppId = data?.fbAppId || "";
    let twitterCard = data?.twitterCard || "summary_large_image";

    // If pageContent exists, find SEO data
    if (pageContent) {
        const seoData = pageContent.find((item) => item.type === "seo");
        if (seoData?.data) {
            title = seoData.data.title || title;
            description = seoData.data.description || description;
            ogImage = seoData.data.ogImage || ogImage;
        }
    }

    return (
        <Head>
            {/* Basic Meta Tags */}
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

            {/* Open Graph / Facebook - ALL REQUIRED TAGS */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Lizard Interactive Online" />
            <meta property="og:locale" content="en_US" />
            {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
            <meta name="twitter:site" content="@lizardinteractive" />

            {/* Image dimensions for better preview (optional but recommended) */}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
        </Head>
    );
}