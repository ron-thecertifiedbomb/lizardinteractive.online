import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {

  const siteTitle = "Lizard Interactive Online";
  const siteDescription = "Official hub for the Lizard Interactive Online community.";
  const siteUrl = "https://lizardinteractive.online";
  const ogImage = `${siteUrl}/og-image-homepage.jpg`;

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      <Head>
        <title key="title">{siteTitle}</title>
        <meta name="description" content={siteDescription} key="description" />

        {/* Essential for Mobile Simulator & Lighthouse */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />

        {/* Static Assets (Moved from _document) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />

        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} key="og:title" />
        <meta property="og:description" content={siteDescription} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:title" content={siteTitle} key="twitter:title" />
        <meta name="twitter:description" content={siteDescription} key="twitter:description" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <>
        <div className="fixed top-0 left-0 w-full z-[99999] pointer-events-auto">
          <NavBar />
        </div>

        <main className="flex-1 flex flex-col w-full relative z-[10] ">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </>
    </Auth0Provider>
  );
}