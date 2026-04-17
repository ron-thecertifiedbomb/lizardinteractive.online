"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Zap } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    // Contextual Branding Logic
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    // Dynamic Style Variables
    const accentColor = isRifferPage ? "text-white" : "text-emerald-500";
    const accentBorder = isRifferPage ? "border-white/20" : "border-emerald-500/20";
    const accentBg = isRifferPage ? "bg-white/5" : "bg-emerald-500/5";
    const accentHover = isRifferPage ? "hover:bg-white hover:text-black" : "hover:bg-emerald-500 hover:text-black";
    const statusColor = isRifferPage ? "text-white/30" : "text-emerald-500/30";

    return (
        <footer className="w-full py-8 bg-black text-white border-t border-white/10 transition-all duration-500 mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-8">

                    {/* 1. BRANDING & CONTEXTUAL MONETIZATION */}
                    <div className="md:col-span-2 space-y-5">
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
                                <span className="text-[10px] tracking-[0.3em] font-black uppercase">
                                    {isDevPage ? "RD.SOLUTIONS" : isRifferPage ? "THE PSYCHEDELIC RIFFER" : "LIZARD INTERACTIVE"}
                                </span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-500 max-w-xs uppercase tracking-widest">
                                {isDevPage
                                    ? "Architecting high-performance digital systems with 100/100 efficiency."
                                    : isRifferPage
                                        ? "Exploring the intersection of melodic metal and precision audio engineering."
                                        : "A multi-vertical ecosystem built for performance, sound, and vision."}
                            </p>
                        </div>

                        {/* CALL TO ACTION */}
                        <div className="pt-1">
                            <Link
                                href={isDevPage ? "mailto:work@lizardinteractive.online?subject=Dev_Consultation" : "/vault"}
                                className={`inline-flex items-center gap-2 px-4 py-2 border ${accentBorder} ${accentBg} ${accentColor} text-[9px] font-black uppercase tracking-[0.25em] ${accentHover} transition-all`}
                            >
                                <Zap size={10} />
                                {isDevPage ? "Initialize_Audit" : "Access_Asset_Vault"}
                            </Link>
                        </div>
                    </div>

                    {/* 2. NAVIGATION LINKS */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-[0.25em] text-zinc-500 uppercase">Navigation</h4>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Dev Solutions", href: "/rondevsolutions" },
                                { label: "The Riffer", href: "/thepsychedelicriffer" },
                                { label: "Utilities", href: "/utilities" }
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-[11px] text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                        {link.label}
                                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. INFRASTRUCTURE & AFFILIATES */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black tracking-[0.25em] text-zinc-500 uppercase">Infrastructure</h4>
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
                                <Link href="/utilities/vault" className="text-[10px] hover:text-white transition-colors uppercase tracking-widest block font-mono">
                                    Hardware // Gear_List
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase font-black">
                            System.Status: <span className={`${statusColor}`}>Online.v3</span>
                        </span>
                        <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase font-black hidden md:inline">
                            Latency: <span className={`${statusColor}`}>0ms</span>
                        </span>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-[9px] tracking-[0.25em] text-zinc-700 uppercase font-black italic">
                            © {new Date().getFullYear()} Lizard Interactive Online
                        </p>
                        <p className="text-[8px] tracking-[0.15em] text-zinc-800 uppercase font-bold">
                            {isDevPage ? "RonDevSolutions // Engineering" : isRifferPage ? "The Psychedelic Riffer // Production" : "Lizard Interactive // Hub"}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}