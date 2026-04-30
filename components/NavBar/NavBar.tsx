"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryLinks, secondaryLinks, allLinks } from "./links";
import LogoIcon from "@/pages/LogoIcon";
import config from "@/Site.config.json";

export default function NavBar() {
    const router = useRouter();
    const pathname = router.pathname;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // ─── Logic ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        const handleRouteChange = () => {
            setMobileOpen(false);
            setDropdownOpen(false);
        };
        router.events.on("routeChangeStart", handleRouteChange);
        return () => router.events.off("routeChangeStart", handleRouteChange);
    }, [router.events]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* Main Header - Changed to Solid #050505 and removed backdrop-blur */}
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[65px] z-100 bg-[#050505] border-b border-emerald-500/10">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group z-210">
                        <LogoIcon className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                        <span className="font-black tracking-tighter text-sm md:text-base uppercase text-emerald-400/60 group-hover:text-emerald-400 transition-colors">
                            {config.shortName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {primaryLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-xs md:text-sm font-black uppercase tracking-tighter transition-all hover:scale-105 ${isActive ? "text-emerald-400" : "text-emerald-400/40 hover:text-emerald-400/80"
                                        }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeUnderline"
                                            className="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_#34d399]"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className={`flex items-center gap-1.5 text-xs md:text-sm font-black uppercase tracking-tighter transition-all ${dropdownOpen ? "text-emerald-400" : "text-emerald-400/40 hover:text-emerald-400/80"
                                    }`}
                            >
                                More
                                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-8 w-60 origin-top-right bg-[#050505] border border-emerald-500/20 rounded-xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-2">
                                            {secondaryLinks.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="flex items-center gap-4 w-full px-4 py-3 text-sm font-bold text-emerald-400/40 rounded-lg hover:bg-emerald-500/5 hover:text-emerald-400/80 transition-all"
                                                >
                                                    <link.icon className="w-4 h-4 text-emerald-400/60" strokeWidth={2.5} />
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden p-2 relative z-210 outline-none text-emerald-400/60 active:scale-90 transition-transform"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                    </button>

                    {/* Mobile Overlay Menu */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-200 bg-[#050505] md:hidden flex flex-col pt-[120px] px-8"
                            >
                                <div className="flex flex-col gap-8">
                                    {allLinks.map((link, idx) => {
                                        const isActive = pathname === link.href;
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`text-2xl font-black uppercase tracking-tighter transition-all ${isActive ? "text-emerald-400" : "text-emerald-900 hover:text-emerald-400"
                                                        }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto mb-12">
                                    <div className="w-12 h-1 bg-emerald-950 mb-4" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-900">
                                        {config.shortName} SYSTEM // 2026
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
}