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

    const isRifferPage = pathname === "/thepsychedelicriffer";

    // Dynamic brand and font logic
    const brandName = isRifferPage ? "The Psychedelic Riffer" : "Lizard Interactive Online";

    // Gotham Thin logic for the Riffer aesthetic
    const fontStyle = isRifferPage
        ? "font-gotham-thin tracking-[0.2em] uppercase font-extralight"
        : "font-semibold";

    return (
        <header className={`py-6 px-4 sticky top-0 z-50 transition-all duration-700 ${isRifferPage ? 'bg-black text-white' : 'bg-dark-bg'}`}>
            <nav className="flex items-center justify-between max-w-7xl mx-auto">

                {/* LOGO & BRAND */}
                <Link href="/" className="flex items-center gap-4">
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 overflow-hidden rounded-full">
                        <Image
                            src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                            alt="logo"
                            fill
                            className={`${isRifferPage ? 'rounded-none border border-white/20' : 'rounded-full'} object-cover`}
                            priority
                        />
                    </div>
                    <span className={`text-xs sm:text-sm md:text-md lg:text-lg transition-all duration-500 ${fontStyle}`}>
                        {brandName}
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">

                    {/* WIDGET REMOVAL LOGIC */}
                    {!isRifferPage && (
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
                                    ? (isRifferPage ? "text-white border-b border-white pb-1" : "bg-blue-600 text-white px-3 py-1 rounded-md")
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
                    ${isRifferPage ? 'bg-black' : 'bg-gray-900'}
                    ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-sm tracking-[0.25em] uppercase ${isRifferPage ? 'font-gotham-thin text-white' : 'text-gray-300'}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}