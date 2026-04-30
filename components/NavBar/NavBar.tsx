"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";
import LogoIcon from "@/pages/LogoIcon";
import config from "@/Site.config.json";

export default function NavBar() {
    const router = useRouter();
    const pathname = router.pathname;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [pageTransitioning, setPageTransitioning] = useState(false);

    // ─── Page transition handling ───────────────────────────────────────────────
    useEffect(() => {
        const handleRouteStart = (url: string) => {
            if (url !== pathname) {
                setPageTransitioning(true);

                if (mobileOpen) {
                    setClosing(true);
                    setMobileOpen(false);
                }
            }
        };

        const handleRouteDone = () => {
            // Wait briefly for animation and hydration
            setTimeout(() => {
                setPageTransitioning(false);
                setClosing(false);
            }, 300);
        };

        router.events.on("routeChangeStart", handleRouteStart);
        router.events.on("routeChangeComplete", handleRouteDone);
        router.events.on("routeChangeError", handleRouteDone);

        return () => {
            router.events.off("routeChangeStart", handleRouteStart);
            router.events.off("routeChangeComplete", handleRouteDone);
            router.events.off("routeChangeError", handleRouteDone);
        };
    }, [mobileOpen, pathname, router.events]);

    // ─── Scroll locking ─────────────────────────────────────────────────────────
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    // ─── Mobile link click ──────────────────────────────────────────────────────
    const handleMobileLinkClick = (href: string) => {
        setMobileOpen(false);
        if (pathname !== href) router.push(href);
    };

    // ─── Render ─────────────────────────────────────────────────────────────────
    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[65px] z-100 bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">

                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <LogoIcon className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(136,251,89,0.4)]" />
                        <span className="font-black tracking-tighter text-sm md:text-base uppercase text-green-400/50">
                            {config.shortName}
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
                                    className={`text-xs md:text-sm font-black uppercase tracking-tighter transition-all hover:scale-105 ${isActive
                                        ? "text-green-400/50"
                                        : "text-zinc-300 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 relative z-101 outline-none text-green-400/50 active:scale-90 transition-transform"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? (
                            <X size={20} strokeWidth={2.5} />
                        ) : (
                            <Menu size={20} strokeWidth={2.5} />
                        )}
                    </button>
                </nav>
            </header>

            {/* Page Transition Bar */}
            <div
                className={`fixed top-0 left-0 right-0 h-[2px] z-200 bg-green-400/50 transition-all duration-300 ${pageTransitioning
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                    } origin-left`}
            />

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-90 bg-[#050505] md:hidden transition-all duration-500 ease-in-out
          ${mobileOpen
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : closing
                            ? "translate-y-0 opacity-0 pointer-events-none"
                            : "-translate-y-full opacity-0 pointer-events-none"
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
                                style={{
                                    transitionDelay: mobileOpen ? `${idx * 60}ms` : "0ms",
                                }}
                                className={`text-3xl font-black uppercase tracking-tighter transition-all active:scale-95 flex items-center gap-4 bg-transparent border-none cursor-pointer
                  ${isActive
                                        ? "text-green-400"
                                        : "text-zinc-300 hover:text-green-400"
                                    }
                  ${mobileOpen
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-10 opacity-0"
                                    }`}
                            >
                                {isActive && (
                                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />
                                )}
                                {link.label}
                            </button>
                        );
                    })}

                    <div className="mt-12 pt-8  w-full flex flex-col items-center gap-4">
                        <span className="text-[10px] font-mono text-green-400/50 tracking-[0.5em] uppercase mb-4">
                           LIZARD INTERACTIVE ONLINE
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
