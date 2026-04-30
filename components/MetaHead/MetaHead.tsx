import Head from "next/head";
import { useRouter } from "next/router";
import config from "@/Site.config.json";

interface MetaHeadProps {
    data?: {
        title?: string;
        description?: string;
        ogImage?: string;
        ogUrl?: string;
        ogType?: string;
    };
    pageContent?: Array<{ type: string; data?: any }>;
}

export default function MetaHead({ data, pageContent }: MetaHeadProps) {
    const router = useRouter();

    // Allow pageContent CMS override
    let cmsTitle: string | undefined;
    let cmsDescription: string | undefined;
    let cmsOgImage: string | undefined;
    let cmsOgUrl: string | undefined;

    if (!data?.title && pageContent) {
        const seoBlock = pageContent.find((item) => item.type === "seo");
        if (seoBlock?.data) {
            cmsTitle = seoBlock.data.title;
            cmsDescription = seoBlock.data.description;
            cmsOgImage = seoBlock.data.ogImage;
            cmsOgUrl = seoBlock.data.ogUrl;
        }
    }

    // Resolve final values — prop → CMS → site.config defaults
    const rawTitle = data?.title || cmsTitle;
    const finalTitle = rawTitle
        ? config.seo.titleTemplate.replace("%s", rawTitle)
        : config.seo.defaultTitle;

    const finalDescription =
        data?.description || cmsDescription || config.seo.defaultDescription;

    const finalOgType = data?.ogType || "website";
    const finalOgUrl =
        data?.ogUrl || cmsOgUrl || `${config.url}${router.asPath}`;

    const resolveImage = (path?: string) => {
        if (!path) return `${config.url}${config.assets.ogImage}`;
        if (path.startsWith("http")) return path;
        return `${config.url}/${path.replace(/^\//, "")}`;
    };

    const finalOgImage = resolveImage(data?.ogImage || cmsOgImage);
    const canonicalUrl = `${config.url}${router.asPath.split("?")[0]}`;

    return (
        <Head>
            {/* Primary */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={config.seo.keywords} />
            <meta name="author" content={config.name} />
            <meta name="robots" content={config.seo.robots} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta charSet="utf-8" />
            <meta name="theme-color" content={config.theme.themeColor} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Favicon */}
            <link rel="icon" type="image/png" sizes="32x32" href={config.assets.favicon} />
            <link rel="apple-touch-icon" href={config.assets.appleTouchIcon} />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={finalOgUrl} />
            <meta property="og:type" content={finalOgType} />
            <meta property="og:site_name" content={config.name} />
            <meta property="og:locale" content={config.seo.locale} />
            <meta property="og:image" content={finalOgImage} />
            <meta property="og:image:width" content={config.seo.ogImageWidth} />
            <meta property="og:image:height" content={config.seo.ogImageHeight} />
            <meta property="og:image:alt" content={finalTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={config.seo.twitterHandle} />
            <meta name="twitter:creator" content={config.seo.twitterHandle} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalOgImage} />

            {/* JSON-LD — Organization */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(config.jsonLd.organization),
                }}
            />

            {/* JSON-LD — WebSite */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(config.jsonLd.website),
                }}
            />
        </Head>
    );
}
