"use client";

import React from "react";
import { motion } from "framer-motion";

type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string; // Custom padding, spacing, or extra styles
    variant?: "transparent" | "ambient";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

export default function ScreenContainer({
    children,
    className = "",
    variant = "transparent",
    maxWidth = "lg",
}: ScreenContainerProps) {
    const variants = {
        transparent: "",
        ambient:
            "bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black",
    };

    const maxWidthClasses = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        "2xl": "max-w-[1400px]",
        full: "max-w-full",
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={`
        w-full 
        min-h-screen 
        mt-28
        ${variants[variant]} 
        ${className}
      `}
        >
            <div className={`w-full mx-auto ${maxWidthClasses[maxWidth]}`}>
                {children}
            </div>
        </motion.section>
    );
}
