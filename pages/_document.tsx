import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-black">
      <Head>
        {/* Core Settings */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />

        {/* Static Assets (Favicons) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />

        {/* Global SEO Defaults (Only if not handled in _app.tsx) */}
        <meta name="robots" content="index, follow" />
      </Head>

      <body className="bg-black antialiased selection:bg-emerald-500 selection:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}