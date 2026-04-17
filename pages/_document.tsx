import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteTitle = "Lizard Interactive | RonDevSolutions & The Psychedelic Riffer";
  const siteDescription = "Official hub for RonDevSolutions (Software Engineering) and The Psychedelic Riffer (Instrumental Metal). High-performance web solutions and melodic guitar production.";
  const siteUrl = "https://lizardinteractive.online";

  // CRITICAL FIX: Social crawlers require absolute URLs (https://...)
  const absolutePreviewImage = `${siteUrl}/og-image-rondev.jpg`;

  return (
    <Html lang="en" className="bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />

        {/* SEO Foundation */}
        <meta name="description" content={siteDescription} />
        <meta name="author" content="RonDevSolutions" />
        <link rel="canonical" href={siteUrl} />

        {/* Facebook / Open Graph */}
        <meta property="fb:app_id" content="966242223397117" /> {/* Placeholder ID to clear debugger warning */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={absolutePreviewImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Lizard Interactive" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={absolutePreviewImage} />

        {/* Favicon & Branding */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />

        {/* PWA / Mobile Theme Color */}
        <meta name="theme-color" content="#000000" />
      </Head>

      <body className="bg-black antialiased selection:bg-emerald-500 selection:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}