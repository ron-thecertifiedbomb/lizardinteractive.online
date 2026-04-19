interface SectionHeaderProps {
    label?: string;
    title: string;
    highlight?: string;
    description?: string;
}

export default function SectionHeader({
    label = "Lizard Interactive Online",
    title,
    highlight,
    description
}: SectionHeaderProps) {
    return (
        <header className="py-12 border-b border-white/5 mb-12">
            {/* Label with Emerald Accent */}
            <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-10 bg-emerald-500" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500/70">
                    {label}
                </span>
            </div>

            {/* Main Heading - Responsive sizing included */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                {title} {highlight && <span className="text-emerald-500">{highlight}</span>}
            </h1>

            {/* Description */}
            {description && (
                <p className="text-zinc-500 mt-6 max-w-xl font-light leading-relaxed text-sm md:text-base">
                    {description}
                </p>
            )}
        </header>
    );
}