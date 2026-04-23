interface ToolHeaderProps {
    title: string;
    icon: React.ReactNode;
    className?: string; // Added optional className
}

export function ToolHeader({ title, icon, className = "" }: ToolHeaderProps) {
    return (
        <div className={className}>
            <h1 className="text-md font-medium text-emerald-400 flex items-center gap-2 opacity-70 uppercase tracking-[0.1em]">
                {icon}
                {title}
            </h1>
        </div>
    );
}