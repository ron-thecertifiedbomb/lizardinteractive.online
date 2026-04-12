import "tailwindcss/tailwind.css";
import '../styles/global.css'
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router"; // Using useRouter for Pages router
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define the Riffer route check
  const isRifferPage = router.pathname === "/thepsychedelicriffer";

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      <div className={`
        min-h-screen flex flex-col transition-colors duration-700 
        /* Match this hex to your exact original blue background */
        ${isRifferPage ? 'bg-black' : 'bg-[#0a192f]'} 
    `}>
        <NavBar />

        <main className="flex-1 flex flex-col">
          {/* Ensure ScreenContainer inside Component uses variant="default" 
            to match this bg-[#0a192f] 
        */}
          <Component {...pageProps} />
          <Analytics />
        </main>

        <Footer />
      </div>
    </Auth0Provider>
  );
}