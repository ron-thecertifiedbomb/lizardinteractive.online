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

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    }, [mobileOpen]);

    // Force hard navigation to bypass any JS event blocks
    const handleForceNav = (href: string) => {
        setMobileOpen(false);
        document.body.style.overflow = 'unset';
        window.location.href = href;
    };

    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");
    const currentLinks = isRifferPage ? rifferLinks : isDevPage ? devLinks : mainLinks;
    const brandName = isRifferPage ? "THE PSYCHEDELIC RIFFER" : isDevPage ? "RD.SOLUTIONS" : "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full h-[72px] md:h-[88px] z-[100000] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white pointer-events-auto">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative z-[10001]">

                    {/* 1. LOGO */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                            <Image
                                src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                                alt="logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="text-[10px] md:text-xs tracking-[0.4em] font-black uppercase group-hover:text-emerald-500 transition-colors">
                            {brandName}
                        </span>
                    </Link>

                    {/* 2. DESKTOP NAV (Ito ang nawawala kanina!) */}
                    <div className="hidden md:flex items-center gap-10">
                        {currentLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-[10px] tracking-[0.3em] uppercase font-black transition-all ${isActive ? 'text-emerald-500' : 'text-zinc-500 hover:text-white'}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-2 left-0 h-[1.5px] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 hover:w-full'} bg-emerald-500`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3. MOBILE TRIGGER */}
                    <button
                        className="md:hidden text-white p-4 -mr-4 relative z-[10002]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        type="button"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </header>

            {/* 4. MOBILE MENU OVERLAY */}
            <div
                className={`
                    fixed inset-0 w-full h-full bg-black z-[99999] md:hidden flex flex-col p-10 pt-32 gap-10 transition-all duration-300
                    ${mobileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"}
                `}
                style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
            >
                {currentLinks.map((link) => (
                    <div
                        key={link.href}
                        onPointerDown={() => handleForceNav(link.href)}
                        className="text-4xl font-black tracking-[0.2em] uppercase text-zinc-400 active:text-emerald-500 py-4 cursor-pointer"
                    >
                        {link.label}
                    </div>
                ))}
            </div>
        </>
    );
}