// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document"; // Use this Head!

export default function Document() {
  return (
    <Html lang="en" className="bg-black" data-scroll-behavior="smooth">
      <Head>
        {/* DO NOT put <title> or <meta name="viewport"> here */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#000000" />

        {/* Static Assets Only */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />
      </Head>

      <body className="bg-black antialiased selection:bg-emerald-500 selection:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}