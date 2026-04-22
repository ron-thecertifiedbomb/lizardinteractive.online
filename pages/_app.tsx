import '../styles/global.css';
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { TurboToastProvider } from "@/components/gba/TurboToastProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define routes where we want a "Clean Hardware" look
  const isEmulatorPage = router.pathname.startsWith('/emulator/');

  // Global SEO Fallbacks
  const siteTitle = "Lizard Interactive Online";
  const siteDescription = "Official hub for the Lizard Interactive Online community.";
  const siteUrl = "https://lizardinteractive.online";
  const ogImage = `${siteUrl}/og-image-homepage.jpg`;

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      authorizationParams={{ redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined }}
    >
      <Head>
        {/* Core Meta */}
        <title key="title">{siteTitle}</title>
        <meta name="description" content={siteDescription} key="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" key="viewport" />
        <meta charSet="utf-8" key="charset" />
        <meta name="theme-color" content="#000000" key="theme-color" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/lizardinteractive.png" />
        <link rel="apple-touch-icon" href="/lizardinteractive.png" />

        {/* Social Meta (Fallbacks) */}
        <meta property="og:title" content={siteTitle} key="og:title" />
        <meta property="og:description" content={siteDescription} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={siteTitle} key="twitter:title" />
        <meta name="twitter:description" content={siteDescription} key="twitter:description" />
      </Head>

      {/* Navigation */}
      {!isEmulatorPage && (
        <div className="fixed top-0 left-0 w-full z-[99999] pointer-events-auto">
          <NavBar />
        </div>
      )}

      {/* Main Content Area */}
      <TurboToastProvider>
     
          <Component {...pageProps} />
  
        <Analytics />
      </TurboToastProvider>

      {/* Footer */}
      {!isEmulatorPage && <Footer />}
    </Auth0Provider>
  );
}