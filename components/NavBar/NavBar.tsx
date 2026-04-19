"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // This is the secret: Manual navigation to ensure smoothness
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            setMobileOpen(false);
            return;
        }

        e.preventDefault(); // Stop the instant Next.js jump
        setMobileOpen(false); // Start the fade-out animation

        // Wait for the 300ms transition to finish BEFORE moving pages
        setTimeout(() => {
            router.push(href);
        }, 300);
    };

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

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 relative z-[101] outline-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-[90] bg-black md:hidden transition-all duration-300 ease-out ${mobileOpen
                        ? "opacity-100 pointer-events-auto visible"
                        : "opacity-0 pointer-events-none invisible"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    {mainLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`text-4xl font-black uppercase tracking-tighter transition-all active:scale-90 ${pathname === link.href ? "text-emerald-500" : "text-white/40"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}