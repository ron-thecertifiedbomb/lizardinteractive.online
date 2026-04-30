import { Html, Head, Main, NextScript } from "next/document";
import config from "@/Site.config.json";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        {/* ── Character Encoding & Compat ───────────────────────────────────── */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ── Favicon ───────────────────────────────────────────────────────── */}
        <link rel="icon" type="image/png" sizes="32x32" href={config.assets.favicon} />
        <link rel="apple-touch-icon" href={config.assets.appleTouchIcon} />
        <meta name="theme-color" content={config.theme.themeColor} />

        {/* ── Font Preconnect (add your font CDN origin here if using Google Fonts) ── */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
      </Head>
      <body className="bg-black antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
