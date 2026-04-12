type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "dark" | "ambient";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

export default function ScreenContainer({
    children,
    className = "",
    variant = "default",
    maxWidth = "lg"
}: ScreenContainerProps) {

    const backgrounds = {
        default: "bg-[#0a192f]",
        dark: "bg-black",
        ambient: "bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"
    };

    const maxWidthClasses = {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        "2xl": "max-w-[1400px]",
        "full": "max-w-full px-0"
    };

    return (
        <div
            className={`
                w-full
                ${maxWidthClasses[maxWidth]}
                mx-auto
                flex
                flex-col
                flex-1    
                md:pt-8   
                lg:pt-12
                px-4 sm:px-6
                min-h-screen
                transition-all duration-700
                ${backgrounds[variant]} 
                ${className}
            `}
        >
            {children}
        </div>
    );
}