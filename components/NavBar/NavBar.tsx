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
            <header className="fixed top-0 left-0 right-0 w-full h-[72px] md:h-[88px] z-[9999] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative z-[10001]">
                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                            <Image src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"} alt="logo" fill className="object-cover" />
                        </div>
                        <span className="text-[10px] md:text-xs tracking-[0.4em] font-black uppercase">{brandName}</span>
                    </Link>

                    {/* MOBILE TRIGGER */}
                    <button
                        className="md:hidden text-white p-4 -mr-4 relative z-[10002]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        type="button"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </header>

            {/* MOBILE MENU - MOVED OUTSIDE HEADER TAG */}
            <div
                className={`
                    fixed inset-0 w-full h-full bg-black z-[9998] md:hidden flex flex-col p-10 pt-32 gap-10 transition-all duration-300
                    ${mobileOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"}
                `}
                style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
            >
                {currentLinks.map((link) => (
                    <div
                        key={link.href}
                        onPointerDown={() => handleForceNav(link.href)} // Use onPointerDown for faster mobile response
                        className="text-4xl font-black tracking-[0.2em] uppercase text-zinc-400 active:text-emerald-500 py-4"
                    >
                        {link.label}
                    </div>
                ))}
            </div>
        </>
    );
}