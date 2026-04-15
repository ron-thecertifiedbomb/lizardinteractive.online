"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    // Simplified logic for niche-based branding only
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    return (
        /* NO MORE CONDITIONALS: 
           Background is locked to black, matching the global theme. 
           'py-10' keeps it low-profile as discussed.
        */
        <footer className="w-full py-10 bg-black text-white border-t border-white/5 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-10">

                    {/* 1. BRANDING & DYNAMIC CONTEXT */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-none overflow-hidden border border-white/10">
                                <Image
                                    src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                                    alt="Lizard"
                                    fill
                                    className="object-cover grayscale opacity-50 hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <span className="text-[10px] tracking-[0.4em] font-black uppercase">
                                {isDevPage ? "RD.SOLUTIONS" : isRifferPage ? "THE PSYCHEDELIC RIFFER" : "LIZARD INTERACTIVE"}
                            </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-zinc-600 max-w-xs uppercase tracking-widest">
                            {isDevPage
                                ? "Architecting high-performance digital systems with 100/100 efficiency."
                                : isRifferPage
                                    ? "Exploring the intersection of melodic metal and precision audio engineering."
                                    : "A multi-vertical ecosystem built for performance, sound, and vision."}
                        </p>
                    </div>

                    {/* 2. NAVIGATION LINKS */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Navigation</h4>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Dev Solutions", href: "/rondevsolutions" },
                                { label: "The Riffer", href: "/thepsychedelicriffer" },
                                { label: "Utilities", href: "/utilities" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[11px] text-zinc-500 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                        {link.label}
                                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. SOCIAL CONNECTIONS */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Social</h4>
                        <div className="flex flex-wrap gap-4 text-zinc-700">
                            {isDevPage ? (
                                <>
                                    <Link href="https://github.com/rondevsolutions" target="_blank" className="hover:text-emerald-500 transition-colors">
                                        <Github size={18} strokeWidth={1} />
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" className="hover:text-emerald-500 transition-colors">
                                        <Linkedin size={18} strokeWidth={1} />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="https://instagram.com/thepsychedelicriffer" target="_blank" className="hover:text-emerald-500 transition-colors">
                                        <Instagram size={18} strokeWidth={1} />
                                    </Link>
                                    <Link href="https://youtube.com" target="_blank" className="hover:text-emerald-500 transition-colors">
                                        <Youtube size={18} strokeWidth={1} />
                                    </Link>
                                </>
                            )}
                            <Link href="https://tiktok.com" target="_blank" className="hover:text-emerald-500 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-[9px] tracking-[0.5em] text-zinc-900 uppercase font-black">
                        System.Status: <span className="text-emerald-500/30">Online.v3</span>
                    </span>
                    <p className="text-[9px] tracking-[0.3em] text-zinc-900 uppercase font-black italic">
                        © {new Date().getFullYear()} Lizard Interactive Online / {isDevPage ? "RonDevSolutions" : "Built with Remorse"}.
                    </p>
                </div>
            </div>
        </footer>
    );
}