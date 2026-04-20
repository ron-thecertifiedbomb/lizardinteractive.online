import Head from "next/head";

interface SEOData {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

export default function MetaHead({ data }: { data?: SEOData }) {
    // Global Defaults
    const siteTitle = "Lizard Interactive Online";
    const siteDescription = "Official hub for the Lizard Interactive Online community.";
    const siteUrl = "https://lizardinteractive.online";
    const defaultOgImage = `${siteUrl}/og-image-homepage.jpg`;

    // Use page-specific data if available, otherwise fallback
    const title = data?.title ? `${data.title} | ${siteTitle}` : siteTitle;
    const description = data?.description || siteDescription;
    const image = data?.ogImage || defaultOgImage;

    return (
        <Head>
            <title key="title">{title}</title>
            <meta name="description" content={description} key="description" />
            {data?.keywords && <meta name="keywords" content={data.keywords} key="keywords" />}
            <meta name="robots" content="index, follow" />
            {/* Open Graph */}
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:description" content={description} key="og:description" />
            <meta property="og:image" content={image} key="og:image" />

            {/* Twitter */}
            <meta name="twitter:title" content={title} key="twitter:title" />
            <meta name="twitter:description" content={description} key="twitter:description" />
            <meta name="twitter:image" content={image} key="twitter:image" />
        </Head>
    );
}