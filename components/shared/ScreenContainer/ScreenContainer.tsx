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
        default: "bg-black",
        dark: "bg-black",
        ambient: "bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"
    };

    const maxWidthClasses = {
        sm: "md:max-w-2xl",
        md: "md:max-w-4xl",
        lg: "md:max-w-6xl",
        xl: "md:max-w-7xl",
        "2xl": "md:max-w-[1400px]",
        "full": "max-w-full"
    };

    return (
        <div
            className={`
                w-full 
                ${maxWidth !== "full" ? maxWidthClasses[maxWidth] : "max-w-full"}
                mx-auto
                flex
                flex-col
                /* FIX: Removed justify-center and items-center to stop overlap */
                flex-1    
                min-h-screen
                transition-all duration-700
                ${backgrounds[variant]} 
                ${className}
                overflow-x-hidden
            `}
        >
            <div className="w-full flex flex-col">
                {children}
            </div>
        </div>
    );
}