type ScreenContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export default function ScreenContainer({ children, className = "" }: ScreenContainerProps) {
    return (
        <div
            className={`
                w-full
                max-w-6xl
                mx-auto
                flex
                flex-col
                flex-1    
                md:pt-8   
         lg:pt-12
                    px-4 sm:px-6

         
                ${className}
            `}
        >
            {children}
        </div>
    );
}
