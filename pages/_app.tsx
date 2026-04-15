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

  // Path Checks for Theme Switching
  const isRifferPage = router.pathname.startsWith("/thepsychedelicriffer");
  const isDevPage = router.pathname.startsWith("/rondevsolutions");

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
    >
      <div className={`
        min-h-screen flex flex-col transition-colors duration-700 
        /* - Riffer & Dev pages use deep Black (#000000 or #0a0a0a)
           - Main Hub uses your original dark-bg blue (#0a192f) 
        */
        ${(isRifferPage || isDevPage) ? 'bg-black' : 'bg-dark-bg'} 
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