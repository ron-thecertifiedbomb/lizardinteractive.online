"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import { mainLinks, rifferLinks, devLinks } from "./links";
import Button from "../shared/Button/Button";

export default function NavBar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Path Checks
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");
    const isHomePage = pathname === "/";

    // 1. Dynamic Navigation Selection
    const currentLinks = isRifferPage ? rifferLinks : isDevPage ? devLinks : mainLinks;

    // 2. Branding Logic
    let brandName = "LIZARD INTERACTIVE";
    if (isRifferPage) brandName = "THE PSYCHEDELIC RIFFER";

    // 3. Dynamic Styles based on the "Motherpage" or Funnels
    const isBlackTheme = isRifferPage || isDevPage || isHomePage;

    return (
        <header className={`py-4 md:py-6 px-6 sticky top-0 z-[100] transition-all duration-500 
            ${isBlackTheme ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-[#0a192f]'} text-white`}>

            <nav className="flex items-center justify-between max-w-7xl mx-auto">

                {/* LOGO SECTION */}
                <Link
                    href={isRifferPage ? "/thepsychedelicriffer" : isDevPage ? "/rondevsolutions" : "/"}
                    className="flex items-center gap-3 group"
                >
                    {isDevPage ? (
                        <div className="text-lg md:text-xl font-black tracking-[0.2em] text-white flex items-center">
                            RD<span className="text-emerald-500 mx-[2px]">.</span>SOLUTIONS
                        </div>
                    ) : (
                        <>
                            <div className={`relative w-8 h-8 overflow-hidden transition-transform duration-500 group-hover:rotate-90 ${isRifferPage ? 'rounded-none' : 'rounded-full border border-white/10'}`}>
                                <Image
                                    src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                                    alt="logo"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className={`text-[10px] md:text-xs tracking-[0.4em] font-black uppercase transition-all duration-500 group-hover:text-emerald-500`}>
                                {brandName}
                            </span>
                        </>
                    )}
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-10">
                    {/* Only show Weather on Main Hub */}
                    {!isRifferPage && !isDevPage && (
                        <div className="flex items-center opacity-40 hover:opacity-100 transition-opacity mr-4 border-r border-white/10 pr-8">
                            <WeatherWidget className="w-8 h-8" />
                        </div>
                    )}

                    {currentLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300 group
                                    ${isActive ? "text-white" : "text-zinc-500 hover:text-white"}`}
                            >
                                {link.label}
                                {/* Killer Active Underline */}
                                <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-500 
                                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'} 
                                    ${isRifferPage ? 'bg-white' : 'bg-emerald-500'}`}
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TRIGGER */}
                <div className="flex md:hidden items-center gap-4">
                    {!isRifferPage && !isDevPage && <WeatherWidget className="w-6 h-6 opacity-50" />}
                    <button
                        className="text-white p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* MOBILE DROPDOWN - PURE ONYX */}
            <div
                className={`
                    md:hidden fixed inset-x-0 top-[72px] h-screen bg-black flex flex-col p-10 gap-8
                    transition-all duration-500 ease-in-out z-[90]
                    ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}
                `}
            >
                {currentLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-black tracking-[0.2em] uppercase text-zinc-800 hover:text-emerald-500 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="mt-auto pb-20">
                    <span className="text-[10px] tracking-[0.5em] text-zinc-900 uppercase">System.Lizard_Integrated</span>
                </div>
            </div>
        </header>
    );
}