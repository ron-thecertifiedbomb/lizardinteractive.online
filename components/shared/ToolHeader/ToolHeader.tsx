interface ToolHeaderProps {
    title: string;
    icon: React.ReactNode; // Change this from LucideIcon to ReactNode
}

export function ToolHeader({ title, icon }: ToolHeaderProps) {
    return (
        <div>
            <h1 className="text-md font-medium text-emerald-500 flex items-center gap-2 opacity-70 uppercase tracking-[0.1em]">
                {icon}
                {title}
            </h1>
        </div>
    );
}