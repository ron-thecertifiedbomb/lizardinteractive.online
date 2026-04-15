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

  // 1. Identify all pages that MUST be black
  const isRifferPage = router.pathname.startsWith("/thepsychedelicriffer");
  const isDevPage = router.pathname.startsWith("/rondevsolutions");
  const isHomePage = router.pathname === "/"; // This is the killer fix

  // 2. Decide the background
  // If it's one of your main funnels or the hub, use bg-black.
  // Otherwise, fallback to the legacy blue for older utilities.


  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      <div className={`
        min-h-screen flex flex-col transition-colors duration-700 
       
      `}>
        <NavBar />

        <main className="flex-1 flex flex-col">
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </div>
    </Auth0Provider>
  );
}