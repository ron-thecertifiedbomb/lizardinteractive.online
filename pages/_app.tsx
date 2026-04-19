import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import Head from "next/head"; // Import Head
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const siteTitle = "Lizard Interactive | RonDevSolutions & The Psychedelic Riffer";
  const siteDescription = "Official hub for RonDevSolutions (Software Engineering) and The Psychedelic Riffer (Instrumental Metal).";
  const siteUrl = "https://lizardinteractive.online";
  const ogImage = `${siteUrl}/og-image-homepage.jpg`;

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="fb:app_id" content="966242223397117" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={siteUrl} />
      </Head>

      <div className="min-h-screen flex flex-col bg-black overflow-x-hidden relative">
        <div className="fixed top-0 left-0 w-full z-[99999] pointer-events-auto">
          <NavBar />
        </div>

        <main className="flex-1 flex flex-col w-full relative z-[10] pt-[72px] md:pt-[88px]">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </div>
    </Auth0Provider>
  );
}
