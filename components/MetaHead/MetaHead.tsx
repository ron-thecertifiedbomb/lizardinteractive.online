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
    const siteUrl = "https://lizardinteractive.online"; // Hardcode for a test to rule out env var issues

    const getAbsoluteUrl = (path?: string) => {
        if (!path) return `${siteUrl}/og-image-homepage.jpg`;
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${siteUrl}/${cleanPath}`;
    };

    const title = data?.title || "Lizard Interactive Online";
    const description = data?.description || "Free online tools for developers, designers, and creators.";
    const absoluteOgImage = getAbsoluteUrl(data?.ogImage);

    return (
        <Head>
            {/* 1. Critical Meta Tags first (Keep these at the very top) */}
            <meta charSet="utf-8" />
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={data?.ogType || "website"} />

            {/* 2. Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="robots" content="index, follow" />

            {/* 3. Assets and Twitter (Less critical for the Facebook Crawler) */}
            <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={absoluteOgImage} />
            {/* ... rest of your tags */}
        </Head>
    );
}
