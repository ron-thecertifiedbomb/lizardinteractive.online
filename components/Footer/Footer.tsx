"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Github, Linkedin, ArrowUpRight, Zap } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    // Logic for niche-based branding
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    return (
        <footer className="w-full py-10 bg-black text-white border-t border-white/5 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-10">

                    {/* 1. BRANDING & CONTEXTUAL MONETIZATION */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-none overflow-hidden border border-white/10">
                                    <Image
                                        src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                                        alt="Lizard Interactive"
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

                        {/* CALL TO ACTION: Monetization Lever */}
                        <div className="pt-2">
                            <Link
                                href={isDevPage ? "mailto:work@lizardinteractive.online?subject=Dev_Consultation" : "/utilities/vault"}
                                className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-black transition-all"
                            >
                                <Zap size={10} />
                                {isDevPage ? "Initialize_Audit" : "Access_Asset_Vault"}
                            </Link>
                        </div>
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

                    {/* 3. INFRASTRUCTURE & AFFILIATES */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">Infrastructure</h4>
                        <ul className="space-y-2 text-zinc-500">
                            <li>
                                <a href="https://vercel.com" target="_blank" className="text-[10px] hover:text-white transition-colors uppercase tracking-widest block font-mono">
                                    Network // Vercel
                                </a>
                            </li>
                            <li>
                                <a href="https://supabase.com" target="_blank" className="text-[10px] hover:text-white transition-colors uppercase tracking-widest block font-mono">
                                    Storage // Supabase
                                </a>
                            </li>
                            <li>
                                <a href="https://amazon.com" target="_blank" className="text-[10px] hover:text-white transition-colors uppercase tracking-widest block font-mono">
                                    Hardware // Gear_List
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] tracking-[0.5em] text-zinc-800 uppercase font-black">
                            System.Status: <span className="text-emerald-500/30">Online.v3</span>
                        </span>
                        <span className="text-[9px] tracking-[0.5em] text-zinc-800 uppercase font-black hidden md:inline">
                            Latency: <span className="text-emerald-500/30">0ms</span>
                        </span>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-[9px] tracking-[0.3em] text-zinc-800 uppercase font-black italic">
                            © {new Date().getFullYear()} Lizard Interactive Online
                        </p>
                        <p className="text-[8px] tracking-[0.2em] text-zinc-900 uppercase font-bold">
                            {isDevPage ? "RonDevSolutions // Engineering" : "The Psychedelic Riffer // Production"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}