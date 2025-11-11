import React from "react";
import { cn } from "@/lib/utils";




interface LizardMainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LizardMainContainer({ children, className = "" }: LizardMainContainerProps) {


  return (
    <main
      id="lizard-main-container"
      className={cn(
        "min-h-screen w-full flex flex-col items-center overflow-hidden scroll-smooth",
        className
      )}
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)",
      }}
    >
      {children}
    </main>
  );
}
