"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks, rifferLinks, devLinks } from "./links";

export default function NavBar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Stop background scrolling when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileOpen]);

    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    const currentLinks = isRifferPage ? rifferLinks : isDevPage ? devLinks : mainLinks;
    const brandName = isRifferPage ? "THE PSYCHEDELIC RIFFER" : isDevPage ? "RD.SOLUTIONS" : "LIZARD INTERACTIVE";

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-[72px] md:h-[88px] z-[1000] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
            <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full">

                {/* LOGO */}
                <Link
                    href={isRifferPage ? "/thepsychedelicriffer" : isDevPage ? "/rondevsolutions" : "/"}
                    className="flex items-center gap-3 group"
                >
                    <div className={`relative w-8 h-8 overflow-hidden transition-transform duration-500 group-hover:rotate-90 ${isRifferPage ? 'rounded-none' : 'rounded-full border border-white/10'}`}>
                        <Image
                            src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                            alt="logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="text-[10px] md:text-xs tracking-[0.4em] font-black uppercase transition-all duration-500 group-hover:text-emerald-500">
                        {brandName}
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-10">
                    {currentLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-[10px] tracking-[0.3em] uppercase font-black transition-all ${isActive ? "text-white" : "text-zinc-500 hover:text-white"}`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'} ${isRifferPage ? 'bg-white' : 'bg-emerald-500'}`} />
                            </Link>
                        );
                    })}
                </div>

                {/* MOBILE TRIGGER */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className={`
    md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] 
    bg-black flex flex-col p-10 gap-8 transition-all duration-500 z-[1001]
    ${mobileOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible -translate-y-4 pointer-events-none"}
`}>
                {currentLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                            // Force close bago mag-navigate
                            setMobileOpen(false);
                        }}
                        className="text-3xl font-black tracking-[0.2em] uppercase text-zinc-400 hover:text-emerald-500 active:text-white transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}