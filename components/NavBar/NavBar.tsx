"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { mainLinks } from "./links";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Lock scroll when menu or transition is active
    useEffect(() => {
        document.body.style.overflow = (mobileOpen || isTransitioning) ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen, isTransitioning]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            setMobileOpen(false);
            return;
        }

        e.preventDefault();

        // 1. Keep the overlay solid while we start the route change
        setIsTransitioning(true);
        setMobileOpen(false);

        // 2. Trigger the page change
        router.push(href);

        // 3. THE DELAY: Keep the black overlay visible for an extra 600ms
        // This ensures the new page has time to mount behind the black screen.
        setTimeout(() => {
            setIsTransitioning(false);
        }, 600);
    };

    const brandName = "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[88px] z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">
                    <Link href="/" className="flex items-center gap-3">
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

                    <button
                        className="md:hidden p-2 relative z-[101] outline-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </header>

            {/* The Overlay: 
               Stays at opacity-100 if the menu is open OR if we are currently transitioning pages.
            */}
            <div
                className={`fixed inset-0 z-[90] bg-black md:hidden transition-opacity duration-500 ease-in-out ${mobileOpen || isTransitioning
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    {mainLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`text-4xl font-black uppercase tracking-tighter transition-all active:scale-95 ${pathname === link.href ? "text-emerald-500" : "text-white/40"
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