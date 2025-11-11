import { socials } from "@/config/sociallinks";
import React from "react";

export function LizardSocialLinks() {
    return (
        <div className="flex gap-[2px]">
            {socials.map((social) => (
                <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center p-2 rounded-full bg-dark.foreground hover:scale-110 transition-transform duration-200"
                >
                    {React.cloneElement(social.icon, { className: " text-muted-foreground w-6 h-6" })}
                </a>
            ))}
        </div>
    );
}

