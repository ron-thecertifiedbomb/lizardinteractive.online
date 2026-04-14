"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

    // UPDATED LOGIC: Applies riffer theme to home AND sub-pages like /about
    const isRifferPage = pathname?.startsWith("/thepsychedelicriffer");

    // Dynamic Content & Styles
    const brandName = isRifferPage ? "The Psychedelic Riffer" : "Lizard Interactive Online";
    const fontStyle = isRifferPage ? "font-gotham-thin tracking-[0.20em] uppercase font-light" : "font-semibold";
    const footerBg = isRifferPage ? "bg-black" : "bg-dark-bg";
    const iconColor = isRifferPage ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-white";

    return (
        <footer className={`py-12 transition-colors duration-700 ${footerBg} ${isRifferPage ? 'text-white border-t border-white/5' : 'text-gray-200'}`}>
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">

                <div className="flex justify-center items-center gap-4">
                    <h3 className={`text-xs sm:text-sm md:text-md lg:text-lg transition-all duration-500 ${fontStyle}`}>
                        {brandName}
                    </h3>

                    <Link href={isRifferPage ? "/thepsychedelicriffer" : "/"}>
                        <div className={`
                            relative 
                            transition-all duration-500
                            w-6 h-6 
                            sm:w-8 sm:h-8 
                            md:w-10 md:h-10 
                            overflow-hidden 
                            rounded-full 
                            ${isRifferPage ? 'border border-white/20' : ''}
                        `}>
                            <Image
                                src={isRifferPage ? "/thepsychedelicriffer.jpg" : "/lizardinteractive.png"}
                                alt="logo"
                                fill
                                className={`
                                    object-cover 
                                    transition-all duration-500 
                                    rounded-full
                                    ${isRifferPage ? 'grayscale brightness-125' : ''}
                                `}
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <p className={`text-[10px] sm:text-xs tracking-widest opacity-50 ${isRifferPage ? 'font-gotham-thin uppercase' : ''}`}>
                    © {new Date().getFullYear()} {brandName}. Built with Remorse.
                </p>

                {/* Social Media Links */}
                <div className="flex justify-center items-center gap-6 pt-2">
                    <Link href="https://www.instagram.com/thepsychedelicriffer/" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 ${iconColor}`}>
                        <Instagram size={20} strokeWidth={1.5} />
                    </Link>
                    <Link href="https://www.youtube.com/@ThePsychedelicRiffer" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 ${iconColor}`}>
                        <Youtube size={22} strokeWidth={1.5} />
                    </Link>
                    <Link href="https://music.apple.com/ph/artist/the-psychedelic-riffer/1891138889" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 ${iconColor}`}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.352 3.347c2.313 0 4.454.78 6.174 2.056 1.72 1.277 2.84 3.033 2.84 5.035 0 2.002-1.12 3.758-2.84 5.035-1.72 1.276-3.86 2.056-6.174 2.056-2.314 0-4.454-.78-6.174-2.056C4.458 14.197 3.338 12.441 3.338 10.44c0-2.003 1.12-3.759 2.84-5.036 1.72-1.276 3.86-2.057 6.174-2.057zm4.721 11.233V7.202l-4.708 1.116v4.618a1.95 1.95 0 1 0 1.114 1.745v-3.766l2.48-.564v2.793a1.95 1.95 0 1 0 1.114 1.742z" />
                        </svg>
                    </Link>
                    <Link href="https://www.tiktok.com/@ronansibungaofficial" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 ${iconColor}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                    </Link>
                    <Link href="https://discordapp.com/users/ronansibunga" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 ${iconColor}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
