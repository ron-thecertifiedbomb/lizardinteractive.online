type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "dark" | "ambient";
};

export default function ScreenContainer({
    children,
    className = "",
    variant = "default"
}: ScreenContainerProps) {

    const backgrounds = {
        // This is your original site background (adjust the hex if it was different)
        default: "bg-[#0a192f]",

        // Pure black for the Riffer vibe
        dark: "bg-black",

        // Ambient glow for special sections
        ambient: "bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"
    };

    return (
        <div
            className={`
                w-full
                max-w-4xl
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