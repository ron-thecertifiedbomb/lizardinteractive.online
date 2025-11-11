import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

type LabelVariant = "h1" | "h2" | "h3" | "h4" | "p";

interface LizardTextProps {
  variant?: LabelVariant;
  size?: string;
  children: React.ReactNode;
  className?: string;
  mode?: MotionProps;
  [key: string]: any;
}

export function LizardText({
  variant = "p",
  size,
  className,
  children,
  mode,
  ...props
}: LizardTextProps) {
  const Component = variant;

  // Base styles for each variant without line-height
  const baseStyles: Record<LabelVariant, string> = {
    h1: "font-extrabold tracking-tight",
    h2: "tracking-tight",
    h3: "font-semibold",
    h4: "font-semibold tracking-tight",
    p: "",
  };

  // Always add leading-none at the end to override any other line-height
  const finalClass = cn(size ?? baseStyles[variant], className, "leading-none");

  if (mode) {
    const MotionComponent = motion(Component);
    return (
      <MotionComponent className={finalClass} {...mode} {...props}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <Component className={finalClass} {...props}>
      {children}
    </Component>
  );
}
