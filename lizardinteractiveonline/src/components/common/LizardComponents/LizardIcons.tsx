import { Tech } from "@/config/techstack";
import React from "react";

interface LizardIconsProps {
    skills?: string[];
    className?: string;
    stack?: Tech[];
    iconClassName?: string; // applies to all icons
}

export function LizardIcons({
    skills,
    className,
    stack = [],
    iconClassName = "w-6 h-6",
}: LizardIconsProps) {
    const filteredStack = skills?.length
        ? stack.filter((tech) => skills.includes(tech.label))
        : stack;

    return (
        <div className={`flex flex-wrap justify-evenly items-center gap-5 ${className ?? ""}`}>
            {filteredStack.map((tech) => {
                // Apply uniform size to all icons
                let iconElement: React.ReactNode;
                if (typeof tech.icon === "function") {
                    iconElement = tech.icon({ className: iconClassName });
                } else if (React.isValidElement(tech.icon)) {
                    iconElement = React.cloneElement(
                        tech.icon as React.ReactElement<{ className?: string }>,
                        { className: iconClassName }
                    );
                } else {
                    iconElement = <span className={iconClassName}>{tech.icon}</span>;
                }

                return (
                    <div
                        key={tech.label}
                        className="flex-shrink-0 flex cursor-pointer hover:scale-110 transition-transform "
                        title={tech.label}
                        aria-label={tech.label}
                        onClick={() => tech.url && window.open(tech.url, "_blank")}
                    >
                        {iconElement}
                    </div>
                );
            })}
        </div>
    );
}
