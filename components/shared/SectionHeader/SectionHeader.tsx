// File: components/SectionHeader.tsx
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
    return (
        <div className={`text-center ${className}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {title}
            </h1>

            {subtitle && (
                <p className="text-gray-300 mt-2 text-sm sm:text-base md:text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
