import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Lizard Interactive is a modern, modular web platform designed to: Showcase services from RonDevSolutions Share developer tips, tutorials, and tech newsEngage clients with dynamic content and social media sharing Provide a single hub for marketing, education, and client pitching It leverages dynamic API-driven content, Cloudinary for media, and Upstash Redis for comments, while the RonDevServer handles backend logic, analytics, and integrations."
        />
        <title>Lizard Interactive Online</title>
      </Head>

      {/* Header fixed up here */}
      <Header />

      {/* Main page content */}
      <main className="pt-4">
        <Component {...pageProps} />
        <Analytics />
      </main>

      {/* FOOTER placed correctly here */}
      <Footer />

    </Auth0Provider>
  );
}
