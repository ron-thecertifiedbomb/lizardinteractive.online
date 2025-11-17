// File: components/SectionHeader.tsx
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string; // optional extra classes
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
    return (
        <div className={`mb-8 text-center ${className}`}>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-gray-300 mt-2 text-lg">{subtitle}</p>}
        </div>
    );
}
