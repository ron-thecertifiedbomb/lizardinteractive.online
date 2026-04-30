"use client";

import config from "@/Site.config.json";
import { Github, Twitter, Linkedin, Youtube, Facebook, LucideProps } from "lucide-react";
import React from "react";

interface SocialLink {
    name: string;
    href: string;
    icon: React.ComponentType<LucideProps>;
}

export default function Footer() {
    const socialLinks: SocialLink[] = [
        { name: "GitHub", href: config.social.github, icon: Github },
        { name: "Twitter", href: config.social.twitter, icon: Twitter },
        { name: "LinkedIn", href: config.social.linkedin, icon: Linkedin },
        { name: "YouTube", href: config.social.youtube, icon: Youtube },
        { name: "Facebook", href: config.social.facebook, icon: Facebook },
    ];

    return (
        <footer className="w-full py-10 bg-[#050505] text-white border-t border-emerald-500/10 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 items-center">

                {/* Left Column: Copyright */}
                <div className="order-3 md:order-1 flex flex-col md:items-start items-center gap-1">
                    <p className="text-[9px] tracking-[0.3em] text-zinc-600 uppercase font-black">
                        © {new Date().getFullYear()} //
                        <span className="text-zinc-400 ml-2">{config.shortName}</span>
                    </p>
                </div>

                {/* Center Column: Social Icons */}
                <div className="flex justify-center gap-8 order-1 md:order-2">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        // Skip rendering if the link doesn't exist in config
                        if (!link.href) return null;

                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit our ${link.name} page`}
                                className="text-emerald-900 hover:text-emerald-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                            >
                                <Icon size={16} strokeWidth={2.5} />
                            </a>
                        );
                    })}
                </div>

                {/* Right Column: Tagline / System Status */}
                <div className="order-2 md:order-3 text-center md:text-right">
                    <p className="text-[9px] tracking-[0.4em] text-zinc-600 uppercase font-bold">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/40 mr-2 animate-pulse" />
                        {config.tagline || "System Operational"}
                    </p>
                </div>

            </div>
        </footer>
    );
}