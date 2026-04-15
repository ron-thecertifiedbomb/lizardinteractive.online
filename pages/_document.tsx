import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
      </Head>
      {/* CHANGE bg-dark-bg TO bg-black HERE */}
      <body className="bg-black antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}