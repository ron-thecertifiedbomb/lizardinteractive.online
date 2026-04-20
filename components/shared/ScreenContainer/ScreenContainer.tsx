import React from "react";

type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "dark" | "ambient";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    isHero?: boolean; // Added to control top spacing
};

export default function ScreenContainer({
    children,
    className = "",
    variant = "default",
    maxWidth = "lg",
    isHero = false
}: ScreenContainerProps) {

    const backgrounds = {
        default: "bg-black",
        dark: "bg-black",
        ambient: "bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"
    };

    const maxWidthClasses = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        "2xl": "max-w-[1400px]",
        "full": "max-w-full"
    };

    return (
        /* OUTER WRAPPER: Always full screen width and background */
        <main
            className={`
                w-full 
                min-h-screen 
                flex flex-col
                ${backgrounds[variant]} 
                transition-all duration-700
                overflow-x-hidden
            `}
        >
            {/* INNER CONTENT: Handles the max-width and horizontal centering */}
            <div className={`
                w-full 
                mx-auto 
                px-6 sm:px-10 lg:px-20 
                /* Logic: If isHero is true, we use minimal padding because _app.tsx handles the navbar clearance */
                ${isHero ? "pt-6 md:pt-15" : "pt-5 md:pt-10"}
                pb-20 
                flex-1
                flex flex-col
                ${maxWidthClasses[maxWidth]}
                ${className}
            `}>
                {children}
            </div>
        </main>
    );
}