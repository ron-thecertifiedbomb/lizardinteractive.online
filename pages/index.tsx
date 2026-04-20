"use client";

import { useState, useEffect } from "react";
import { homeContent } from "../lib/homeContent";
import ScreenContainer from "../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { niches } from "../data/nichesList";
import { HERO_TITLE, STAGGER_CONTAINER, FADE_IN } from "../helpers/motion";
import MainHero from "../components/shared/Hero/Hero";
import Hero from "../components/shared/Hero/Hero";
import ServicesCards from "../components/shared/ServicesCards/ServicesCards";
import Newsletter from "../components/shared/NewsLetter/NewsLetter";

export default function HomePage() {

  const [isMobile, setIsMobile] = useState(true); 
  const [hasMounted, setHasMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed.");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };



  return (
    <ScreenContainer variant="dark" maxWidth="xl">
   
        {/* HERO SECTION */}
        <Hero homeContent={homeContent}  />

        {/* SERVICES CARDS */}
        <ServicesCards
          niches={niches}
        
        />

        {/* NEWSLETTER SECTION */}
        <Newsletter  />
    
    </ScreenContainer>
  );
}