import { Activity } from "lucide-react";

interface ToolHeaderProps {
    title: string;
  
}

export function ToolHeader({ title }: ToolHeaderProps) {
    return (
        <div className="flex flex-1 justify-start items-center gap-2 w-full ">
      
            <Activity className="w-4 h-4 text-emerald-500" />
            <h1 className="text-md font-medium text-emerald-400 flex items-center gap-2 opacity-70 uppercase tracking-[0.1em]">
                {title}
            </h1>
        </div>

    );
}