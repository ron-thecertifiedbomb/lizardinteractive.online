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

    // ✅ Normalize site URL
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://lizardinteractive.online").replace(/\/$/, "");

    const currentPath = router.asPath || "";
    const currentUrl = `${siteUrl}${currentPath}`;

    let title = data?.title || "Lizard Interactive Online";
    let description = data?.description || "Free online tools for developers, designers, and creators.";
    let ogImage = data?.ogImage || "/og-image.png";
    let ogUrl = data?.ogUrl || currentUrl;
    let ogType = data?.ogType || "website";
    let fbAppId = data?.fbAppId || "";
    let twitterCard = data?.twitterCard || "summary_large_image";

    // ✅ Optional SEO override from content
    if (pageContent) {
        const seoData = pageContent.find((item) => item.type === "seo");
        if (seoData?.data) {
            title = seoData.data.title || title;
            description = seoData.data.description || description;
            ogImage = seoData.data.ogImage || ogImage;
        }
    }

    // ✅ Utility: force absolute URL
    const toAbsoluteUrl = (path: string) => {
        if (!path) return `${siteUrl}/og-image.png`;
        if (path.startsWith("http")) return path;
        return `${siteUrl}/${path.replace(/^\/+/, "")}`;
    };

    const absoluteOgImage = toAbsoluteUrl(ogImage);
    const absoluteOgUrl = toAbsoluteUrl(ogUrl);

    return (
        <Head>
            {/* Basic */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="robots" content="index, follow" />

            {/* Canonical */}
            <link rel="canonical" href={absoluteOgUrl} />

            {/* Favicon */}
            <link rel="icon" href="/lizardinteractive.png" />
            <link rel="apple-touch-icon" href="/lizardinteractive.png" />

            {/* Open Graph */}
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:description" content={description} key="og:description" />
            <meta property="og:image" content={absoluteOgImage} key="og:image" />
            <meta property="og:image:secure_url" content={absoluteOgImage} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:url" content={absoluteOgUrl} key="og:url" />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Lizard Interactive Online" />
            <meta property="og:locale" content="en_US" />
            {fbAppId && <meta property="fb:app_id" content={fbAppId} />}

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteOgImage} />
            <meta name="twitter:image:alt" content={title} />
        </Head>
    );
}