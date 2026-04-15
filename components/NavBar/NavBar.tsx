"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import { navLinks } from "./links";
import Button from "../shared/Button/Button";

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Path Checks
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    // 1. Dynamic Brand Name
    let brandName = "Lizard Interactive Online";
    if (isRifferPage) brandName = "The Psychedelic Riffer";
    if (isDevPage) brandName = "RonDevSolutions";

    // 2. Dynamic Font & Branding Logic
    const getFontStyle = () => {
        if (isRifferPage) return "font-gotham-thin tracking-[0.2em] uppercase font-extralight";
        if (isDevPage) return "font-bold tracking-tighter text-zinc-100"; // Sharp, professional dev look
        return "font-semibold";
    };

    // 3. Dynamic Logo Logic
    const getLogo = () => {
        if (isRifferPage) return "/thepsychedelicriffer.jpg";
        if (isDevPage) return "/rondevsolutions-logo.png"; // Make sure to add this asset
        return "/lizardinteractive.png";
    };

    return (
        <header className={`py-6 px-4 sticky top-0 z-50 transition-all duration-700 
            ${isRifferPage || isDevPage ? 'bg-black text-white border-b border-white/5' : 'bg-dark-bg text-white'}`}>

            <nav className="flex items-center justify-between max-w-7xl mx-auto">

                {/* LOGO & BRAND */}
                <Link
                    href={isRifferPage ? "/thepsychedelicriffer" : isDevPage ? "/rondevsolutions" : "/"}
                    className="flex items-center gap-4"
                >
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 overflow-hidden rounded-full">
                        <Image
                            src={getLogo()}
                            alt="logo"
                            fill
                            className={`${isRifferPage || isDevPage ? 'rounded-none border border-white/10' : 'rounded-full'} object-cover`}
                            priority
                        />
                    </div>
                    <span className={`text-xs sm:text-sm md:text-md lg:text-lg transition-all duration-500 ${getFontStyle()}`}>
                        {brandName}
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">

                    {/* Show Widget ONLY on the main/generic landing page */}
                    {!isRifferPage && !isDevPage && (
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                            <WeatherWidget className="w-10 h-10" />
                        </div>
                    )}

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[11px] tracking-[0.15em] uppercase transition-all duration-300
                                ${pathname === link.href
                                    ? (isRifferPage || isDevPage ? "text-white border-b border-white pb-1" : "bg-blue-600 text-white px-3 py-1 rounded-md")
                                    : "text-gray-400 hover:text-white"
                                } ${isRifferPage ? 'font-gotham-thin' : 'font-medium'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* MOBILE BUTTON */}
                <div className="flex md:hidden">
                    <Button
                        className="bg-transparent text-white border-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
                    </Button>
                </div>
            </nav>

            {/* MOBILE DROPDOWN */}
            <div
                className={`
                    md:hidden flex flex-col gap-6 px-6 py-10
                    transition-all duration-500 absolute left-0 right-0 top-[80px] h-screen
                    ${isRifferPage || isDevPage ? 'bg-black' : 'bg-gray-900'}
                    ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-sm tracking-[0.25em] uppercase 
                            ${isRifferPage ? 'font-gotham-thin text-white' :
                                isDevPage ? 'font-bold text-zinc-100' : 'text-gray-300'}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}