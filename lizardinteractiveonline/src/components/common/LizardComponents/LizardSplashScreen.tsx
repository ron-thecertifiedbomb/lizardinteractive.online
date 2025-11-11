import { useEffect } from "react";
import { motion } from "framer-motion";
import { LizardLogoContainer } from ".";
import { LizardInteractive } from "@/components/icons";
import { LizardDiv } from "./layout";


interface LizardSplashScreenProps {
  logoUrl?: string;
  text?: string;
  className?: string;
  onFinish?: () => void;
  duration?: number; // optional, default 10s
}

export function LizardSplashScreen({
  className = "",
  onFinish,
  duration = 15, 
}: LizardSplashScreenProps) {
  useEffect(() => {
    if (onFinish) {
      const timer = setTimeout(() => {
        onFinish();
      }, duration * 1000); 
      return () => clearTimeout(timer);
    }
  }, [onFinish, duration]);

  return (
    <LizardDiv
      className={`h-screen w-screen flex items-center justify-center ${className}`}
    >
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 2 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <LizardLogoContainer svg={LizardInteractive} logoStroke="stroke-[#E84A4A] stroke-4" logoFill="fill-green" logoWidth="120" />
      </motion.div>
    </LizardDiv>
  );
}
