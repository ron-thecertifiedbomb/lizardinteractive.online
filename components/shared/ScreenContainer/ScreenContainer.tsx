type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string;
    // Added a prop for background variety
    variant?: "default" | "dark" | "ambient";
};

export default function ScreenContainer({
    children,
    className = "",
    variant = "default"
}: ScreenContainerProps) {

    // Define your background styles here
    const backgrounds = {
        default: "bg-transparent",
        dark: "bg-[#050505]",
        ambient: "bg-black bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"
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
                ${backgrounds[variant]} 
                ${className}
            `}
        >
            {children}
        </div>
    );
}