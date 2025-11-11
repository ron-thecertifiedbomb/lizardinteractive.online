import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface LizardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    children?: React.ReactNode;
    className?: string;
    fluid?: boolean;
    fullHeight?: boolean; // new prop to stretch to footer
    mode?: HTMLMotionProps<"section">; // motion props
}

export function LizardContent({
    id,
    children,
    className,
    fluid = false,
    fullHeight = false,
    mode,
    ...props
}: LizardContentProps) {
    // Use motion.section only if mode exists
    const ContentComponent: any = mode ? motion.section : "section";

    return (
        <ContentComponent
            id={id}
            className={cn(
                "w-full mx-auto flex flex-col",
                fluid ? "max-w-full" : "max-w-[1600px]",
                fullHeight ? "flex-1 min-h-screen" : "",
                className
            )}
            {...(mode || {})} 
            {...props} 
        >
            {children}
        </ContentComponent>
    );
}
