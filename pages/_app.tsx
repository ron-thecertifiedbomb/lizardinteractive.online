import '../styles/global.css';
import type { AppProps } from "next/app";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ✅ Global fallback meta (safe defaults only) */}
      <Head>
        {/* Basic */}
        <title>Lizard Interactive Online</title>
        <meta
          name="description"
          content="Free online tools for developers, designers, and creators."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />

        {/* Favicon */}
        <link rel="icon" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />

        {/* ✅ Minimal Open Graph fallback */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lizard Interactive Online" />
        <meta property="og:title" content="Lizard Interactive Online" />
        <meta
          property="og:description"
          content="Free online tools for developers, designers, and creators."
        />
        <meta
          property="og:image"
          content="https://lizardinteractive.online/og-image.png"
        />
        <meta
          property="og:url"
          content="https://lizardinteractive.online"
        />

        {/* ✅ Twitter fallback */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lizard Interactive Online" />
        <meta
          name="twitter:description"
          content="Free online tools for developers, designers, and creators."
        />
        <meta
          name="twitter:image"
          content="https://lizardinteractive.online/og-image.png"
        />
      </Head>

      {/* ✅ Page-level SEO (MetaHead) overrides this */}
      <Component {...pageProps} />
    </>
  );
}