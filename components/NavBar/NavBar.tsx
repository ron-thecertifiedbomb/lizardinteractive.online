"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";

export default function NavBar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Simple scroll lock
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const brandName = "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[88px] z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/lizardinteractive.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="rounded-full"
                            priority
                        />
                        <span className="font-bold tracking-tight">{brandName}</span>
                    </Link>

                    {/* Desktop View */}
                    <div className="hidden md:flex gap-8">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 relative z-[101] hover:bg-white/5 rounded-full transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl md:hidden">
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-3xl font-black uppercase tracking-tighter transition-all ${pathname === link.href ? "text-emerald-500 scale-110" : "text-white/40"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}