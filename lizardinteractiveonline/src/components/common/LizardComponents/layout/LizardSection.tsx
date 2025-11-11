import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface LizardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  fluid?: boolean;
  fullHeight?: boolean; // new prop to stretch to footer
  mode?: HTMLMotionProps<"section">; // motion props
}

export function LizardSection({
  id,
  children,
  className,
  fluid = false,
  fullHeight = false,
  mode,
  ...props
}: LizardSectionProps) {
  // Use motion.section only if mode exists
  const SectionComponent: any = mode ? motion.section : "section";

  return (
    <SectionComponent
      id={id}
      className={cn(
        "w-full mx-auto flex flex-col",
        fluid ? "max-w-full" : "max-w-[1600px]",
        fullHeight ? "flex-1 min-h-screen" : "",
        className
      )}
      {...(mode || {})} // motion props
      {...props} // other HTML props
    >
      {children}
    </SectionComponent>
  );
}
