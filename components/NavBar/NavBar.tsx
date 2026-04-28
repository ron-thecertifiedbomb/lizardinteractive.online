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
    // Inside NavBar.tsx
    useEffect(() => {
        if (mobileOpen || isTransitioning) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = ""; // Resets to default
        }

        // Safety cleanup
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen, isTransitioning]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            setMobileOpen(false);
            return;
        }

        e.preventDefault();
        setIsTransitioning(true);
        setMobileOpen(false);

        router.push(href);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 600);
    };

    const brandName = "LIZARD INTERACTIVE";

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-[72px] md:h-[65px] z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
                <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 h-full relative">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                            <Image
                                src="/lizardinteractive.png"
                                alt="Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="font-black tracking-tighter text-sm md:text-base uppercase group-hover:text-emerald-400 transition-colors">
                            {brandName}
                        </span>
                    </Link>

                    {/* --- DESKTOP LINKS --- */}
                    <div className="hidden md:flex gap-10">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] ${pathname === link.href ? "text-emerald-500" : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle Button - Emerald Theme */}
                    <button
                        className="md:hidden p-2 relative z-[101] outline-none text-emerald-500 active:scale-90 transition-transform"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Overlay - Sick UI Revision */}
            <div
                className={`fixed inset-0 z-[90] bg-[#050505] md:hidden transition-all duration-500 ease-in-out ${mobileOpen || isTransitioning
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                    }`}
            >
                {/* Background UI Accents */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
                    <span className="text-[10px] font-mono text-emerald-500/50 tracking-[0.5em] uppercase mb-4">Navigation</span>

                    {mainLinks.map((link, idx) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                            className={`text-3xl font-black uppercase tracking-tighter transition-all active:scale-95 flex items-center gap-4 ${pathname === link.href ? "text-emerald-500" : "text-white hover:text-emerald-400"
                                } ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                        >
                            {pathname === link.href && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>}
                            {link.label}
                        </a>
                    ))}

                    <div className="mt-12 pt-8 border-t border-white/5 w-full max-w-[200px] flex flex-col items-center gap-4">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Connect</span>
                        <div className="flex gap-6 text-zinc-400">
                            {/* Add Social Icons here later if needed */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}