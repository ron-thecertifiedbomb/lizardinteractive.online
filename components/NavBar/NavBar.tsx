"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    // Lock scroll with better cleanup
    useEffect(() => {
        if (mobileOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
            document.documentElement.classList.add("lock-scroll");
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            // Focus management for accessibility
            setTimeout(() => firstLinkRef.current?.focus(), 100);
        } else {
            document.documentElement.classList.remove("lock-scroll");
            document.body.style.paddingRight = "";
        }

        return () => {
            document.documentElement.classList.remove("lock-scroll");
            document.body.style.paddingRight = "";
        };
    }, [mobileOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileOpen) {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [mobileOpen]);

    // Improved navigation with better error handling
    const handleNavigation = useCallback((href: string) => {
        setMobileOpen(false);

        // Small delay for animation completion
        setTimeout(() => {
            try {
                router.push(href);
            } catch (error) {
                console.error('Navigation error:', error);
                window.location.href = href; // Fallback
            }
        }, 150);
    }, [router]);

    const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        handleNavigation(href);
    }, [handleNavigation]);

    const toggleMenu = useCallback(() => {
        setMobileOpen(prev => !prev);
    }, []);

    const brandName = "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[88px] z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg"
                        onClick={(e) => handleLinkClick(e, "/")}
                    >
                        <Image
                            src="/lizardinteractive.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="rounded-full transition-transform group-hover:scale-105"
                            priority
                        />
                        <span className="font-bold tracking-tight group-hover:text-white/90 transition-colors">
                            {brandName}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-8">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors py-2 ${pathname === link.href
                                        ? 'text-white'
                                        : 'text-white/60 hover:text-white'
                                    } group focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-2`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-white rounded-full" />
                                )}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={menuButtonRef}
                        className="md:hidden p-2 relative z-[101] hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                        onClick={toggleMenu}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl md:hidden transition-all duration-300 ease-in-out ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden={!mobileOpen}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
                    {mainLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            ref={index === 0 ? firstLinkRef : undefined}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`text-3xl md:text-4xl font-black uppercase tracking-tighter transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg px-4 py-2 ${pathname === link.href
                                    ? "text-emerald-500 scale-110"
                                    : "text-white/40 hover:text-white/70 hover:scale-105"
                                }`}
                            tabIndex={mobileOpen ? 0 : -1}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}