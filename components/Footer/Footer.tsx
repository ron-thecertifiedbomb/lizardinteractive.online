"use client";

import config from "@/Site.config.json";
import { Github, Twitter, Linkedin, Youtube, Facebook } from "lucide-react";

export default function Footer() {
    const socialLinks = [
        {
            name: "GitHub",
            href: config.social.github,
            icon: (props: any) => <Github {...props} />,
        },
        {
            name: "Twitter",
            href: config.social.twitter,
            icon: (props: any) => <Twitter {...props} />,
        },
        {
            name: "LinkedIn",
            href: config.social.linkedin,
            icon: (props: any) => <Linkedin {...props} />,
        },
        {
            name: "YouTube",
            href: config.social.youtube,
            icon: (props: any) => <Youtube {...props} />,
        },
        {
            name: "Facebook",
            href: config.social.facebook,
            icon: (props: any) => <Facebook {...props} />,
        },
    ];

    return (
        <footer className="w-full py-12 md:py-8 bg-black text-white border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* Left Column: Copyright */}
                <p className="text-[10px] tracking-[0.25em] text-zinc-500 uppercase text-center md:text-left order-3 md:order-1">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-zinc-400 font-semibold">{config.name}</span>
                </p>

                {/* Center Column: Social Icons */}
                <div className="flex justify-center gap-6 order-1 md:order-2">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit our ${link.name} page`}
                            className="text-zinc-500 hover:text-green-400 transition-colors duration-300"
                        >
                            <link.icon size={18} strokeWidth={2} />
                        </a>
                    ))}
                </div>

                {/* Right Column: Tagline */}
                <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold text-center md:text-right order-2 md:order-3">
                    {config.tagline}
                </p>

            </div>
        </footer>
    );
}