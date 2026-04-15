import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();



  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      {/* Master Wrapper: 
          - min-h-screen ensures black fills the viewport on short pages.
          - overflow-x-hidden prevents the "horizontal wobble" on mobile/Fold 2.
      */}
      <div className={`
        min-h-screen flex flex-col transition-colors duration-700 
     
        overflow-x-hidden
      `}>
        <NavBar />

        {/* 'flex-1' pushes the footer to the bottom of the screen */}
        <main className="flex-1 flex flex-col w-full">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </div>
    </Auth0Provider>
  );
}