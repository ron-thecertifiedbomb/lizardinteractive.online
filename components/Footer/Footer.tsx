"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Github, Linkedin } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    // Path Checks
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");
    const isDevPage = pathname?.startsWith("/rondevsolutions");

    // 1. Dynamic Content & Brand Logic
    let brandDisplay;
    if (isDevPage) {
        brandDisplay = (
            <div className="text-lg md:text-xl font-bold tracking-tighter text-zinc-100 uppercase">
                RD<span className="text-zinc-500 font-extralight mx-1">|</span>Solutions
            </div>
        );
    } else {
        const brandName = isRifferPage ? "The Psychedelic Riffer" : "Lizard Interactive Online";
        const fontStyle = isRifferPage ? "font-gotham-thin tracking-[0.20em] uppercase font-light" : "font-semibold";
        brandDisplay = <h3 className={`text-xs sm:text-sm md:text-md lg:text-lg ${fontStyle}`}>{brandName}</h3>;
    }

    // 2. Styling Selection
    const footerBg = (isRifferPage || isDevPage) ? "bg-black" : "bg-dark-bg";
    const iconColor = (isRifferPage || isDevPage) ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-white";

    return (
        <footer className={`py-12 transition-colors duration-700 ${footerBg} ${(isRifferPage || isDevPage) ? 'text-white border-t border-white/5' : 'text-gray-200'}`}>
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">

                <div className="flex justify-center items-center gap-4">
                    {brandDisplay}

                    <Link href={isRifferPage ? "/thepsychedelicriffer" : isDevPage ? "/rondevsolutions" : "/"}>
                        <div className={`
                            relative transition-all duration-500
                            w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 
                            overflow-hidden rounded-full 
                            ${(isRifferPage || isDevPage) ? 'border border-white/20' : ''}
                        `}>
                            <Image
                                src={isRifferPage ? "/thepsychedelicriffer.jpg" : isDevPage ? "/lizardinteractive.png" : "/lizardinteractive.png"}
                                alt="logo"
                                fill
                                className={`object-cover transition-all duration-500 rounded-full ${isRifferPage ? 'grayscale brightness-125' : ''}`}
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Dynamic Tagline: Professional vs Artistic */}
                <p className={`text-[10px] sm:text-xs tracking-widest opacity-50 ${isRifferPage ? 'font-gotham-thin uppercase' : ''}`}>
                    © {new Date().getFullYear()} {isDevPage ? "RonDevSolutions" : isRifferPage ? "The Psychedelic Riffer" : "Lizard Interactive"}.
                    {isDevPage ? " Engineered for Performance." : " Built with Remorse."}
                </p>

                {/* Social Media Links: Contextual Selection */}
                <div className="flex justify-center items-center gap-6 pt-2">
                    {isDevPage ? (
                        <>
                            <Link href="https://github.com/rondevsolutions" target="_blank" className={`transition-all duration-300 ${iconColor}`}>
                                <Github size={20} strokeWidth={1.5} />
                            </Link>
                            <Link href="https://linkedin.com/in/your-profile" target="_blank" className={`transition-all duration-300 ${iconColor}`}>
                                <Linkedin size={20} strokeWidth={1.5} />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="https://www.instagram.com/thepsychedelicriffer/" target="_blank" className={`transition-all duration-300 ${iconColor}`}>
                                <Instagram size={20} strokeWidth={1.5} />
                            </Link>
                            <Link href="https://www.youtube.com/@ThePsychedelicRiffer" target="_blank" className={`transition-all duration-300 ${iconColor}`}>
                                <Youtube size={22} strokeWidth={1.5} />
                            </Link>
                        </>
                    )}

                    {/* Common Socials across all niches */}
                    <Link href="https://www.tiktok.com/@ronansibungaofficial" target="_blank" className={`transition-all duration-300 ${iconColor}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}