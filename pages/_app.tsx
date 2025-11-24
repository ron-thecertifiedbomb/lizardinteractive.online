import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lizard Interactive Online</title>
      </Head>

      {/* FULL PAGE FLEX LAYOUT */}
      <div className="min-h-screen flex flex-col">

        <NavBar />

        {/* MAIN EXPANDS ONLY WHEN NEEDED */}
        <main className="flex-1 flex flex-col">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />

      </div>
    </Auth0Provider>
  );
}
