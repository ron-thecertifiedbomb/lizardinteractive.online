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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lizardinteractive.online";
    const router = useRouter();

    // Get data from pageContent if available (for blog listing page)
    let title = data?.title;
    let description = data?.description;
    let ogImage = data?.ogImage;
    let ogUrl = data?.ogUrl;
    let ogType = data?.ogType;

    // If no data from props, try to get from pageContent
    if (!title && pageContent) {
        const seoData = pageContent.find((item) => item.type === "seo");
        if (seoData?.data) {
            title = seoData.data.title;
            description = seoData.data.description;
            ogImage = seoData.data.ogImage;
            ogUrl = seoData.data.ogUrl;
        }
    }

    // ✅ ONLY use fallbacks if NO data is provided at all
    const finalTitle = title || "Lizard Interactive Online";
    const finalDescription = description || "Free online tools for developers, designers, and creators.";
    const finalOgType = ogType || "website";

    const getAbsoluteUrl = (path?: string) => {
        if (!path) return null; // ✅ Don't force homepage image
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${siteUrl}/${cleanPath}`;
    };

    const absoluteOgImage = getAbsoluteUrl(ogImage);

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="robots" content="index, follow" />
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />

            {/* ✅ Open Graph - only include if ogImage exists */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:type" content={finalOgType} />
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {absoluteOgImage && (
                <>
                    <meta property="og:image" content={absoluteOgImage} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                </>
            )}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {absoluteOgImage && <meta name="twitter:image" content={absoluteOgImage} />}

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
            <link rel="apple-touch-icon" href="/lizardinteractive.png" />
        </Head>
    );
}