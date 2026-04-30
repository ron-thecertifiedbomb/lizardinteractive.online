"use client";

import Link from "next/link";
import { useRouter } from "next/router"; // ← Pages Router, not next/navigation
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";
import LogoIcon from "@/pages/LogoIcon";

export default function NavBar() {
    const router = useRouter();
    const pathname = router.pathname;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [pageTransitioning, setPageTransitioning] = useState(false);

    // Close mobile menu and track route transitions
    useEffect(() => {
        const handleStart = (url: string) => {
            if (url !== pathname) {
                setPageTransitioning(true);
                setMobileOpen(false);
            }
        };

        const handleDone = () => {
            setPageTransitioning(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleDone);
        router.events.on("routeChangeError", handleDone);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleDone);
            router.events.off("routeChangeError", handleDone);
        };
    }, [pathname, router.events]);

    // Lock scroll only when mobile menu is open — not during transitions
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleMobileLinkClick = (href: string) => {
        setMobileOpen(false);
        if (pathname !== href) {
            router.push(href);
        }
    };

    const brandName = "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[65px] z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">

                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <LogoIcon className="w-7 h-7 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(136,251,89,0.4)]" />
                        <span className="font-black tracking-tighter text-sm md:text-base uppercase text-green-400">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-10">
                        {mainLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs md:text-sm font-black uppercase tracking-tighter transition-all hover:scale-105 ${isActive ? "text-green-400" : "text-zinc-300 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 relative z-[101] outline-none text-green-400 active:scale-90 transition-transform"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
                    </button>
                </nav>
            </header>

            {/* Page transition overlay — thin bar at the top */}
            <div
                className={`fixed top-0 left-0 right-0 h-[2px] z-[200] bg-green-400 transition-all duration-300 ${pageTransitioning ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } origin-left`}
            />

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[90] bg-[#050505] md:hidden transition-all duration-500 ease-in-out ${mobileOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
                    <span className="text-[10px] font-mono text-green-400/50 tracking-[0.5em] uppercase mb-4">
                        Navigation
                    </span>

                    {mainLinks.map((link, idx) => {
                        const isActive = pathname === link.href;
                        return (
                            <button
                                key={link.href}
                                onClick={() => handleMobileLinkClick(link.href)}
                                style={{ transitionDelay: mobileOpen ? `${idx * 60}ms` : "0ms" }}
                                className={`text-3xl font-black uppercase tracking-tighter transition-all active:scale-95 flex items-center gap-4 bg-transparent border-none cursor-pointer ${isActive ? "text-green-400" : "text-zinc-300 hover:text-green-400"
                                    } ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                                )}
                                {link.label}
                            </button>
                        );
                    })}

                    <div className="mt-12 pt-8 border-t border-white/5 w-full max-w-[200px] flex flex-col items-center gap-4">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Connect</span>
                    </div>
                </div>
            </div>
        </>
    );
}
