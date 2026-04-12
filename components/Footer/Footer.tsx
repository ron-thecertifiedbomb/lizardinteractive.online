"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isRifferPage = pathname === "/thepsychedelicriffer";

    // Dynamic Content & Styles
    const brandName = isRifferPage ? "The Psychedelic Riffer" : "Lizard Interactive Online";
    const fontStyle = isRifferPage ? "font-gotham-thin tracking-[0.25em] uppercase font-light" : "font-semibold";
    const footerBg = isRifferPage ? "bg-black" : "bg-dark-bg";

    return (
        <footer className={`py-12 transition-colors duration-700 ${footerBg} ${isRifferPage ? 'text-white border-t border-white/5' : 'text-gray-200'}`}>
            <div className="max-w-4xl mx-auto px-4 text-center space-y-4">

                <div className="flex justify-center items-center gap-4">
                    <h3 className={`text-xs sm:text-sm md:text-md lg:text-lg transition-all duration-500 ${fontStyle}`}>
                        {brandName}
                    </h3>

                    <Link href="/">
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
            </div>
        </footer>
    );
}