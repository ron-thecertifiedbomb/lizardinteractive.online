import "../styles/global.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "framer-motion";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import PageLoader from "../components/shared/PageLoader/PageLoader";
import { TurboToastProvider } from "@/components/gba/TurboToastProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isEmulatorPage = router.pathname.startsWith("/emulator/");

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
    >
      <PageLoader />

      {!isEmulatorPage && <NavBar />}

      <TurboToastProvider>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <Analytics />
      </TurboToastProvider>

      {!isEmulatorPage && <Footer />}
    </Auth0Provider>
  );
}
