import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >

      <div className="min-h-screen flex flex-col bg-black overflow-x-hidden relative">

        {/* Fixed Navbar - stays on top */}
        <div className="fixed top-0 left-0 w-full z-[99999] pointer-events-auto">
          <NavBar />
        </div>

        {/* Main content - pushes footer down naturally */}
        <main className="flex-1 flex flex-col w-full relative z-[10] pt-[72px] md:pt-[88px]">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </div>
    </Auth0Provider>
  );
}