"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { WeatherWidget } from "../WeatherWidget/WeatherWidget";
import { navLinks } from "./links";
import Button from "../shared/Button/Button";

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="py-6 px-4">
            <nav className="flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                        <Image
                            src="/lizardinteractive.png"
                            alt="logo"
                            fill
                            className="rounded-full object-cover"
                            priority
                        />
                    </div>
                    <span className="font-semibold text-sm  sm:text-md md:text-lg lg:text-xl sm:block">
                        Lizard Interactive Online
                    </span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="w-10 h-10 flex items-center justify-center mr-4">
                        <WeatherWidget className="w-10 h-10" />
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-1 rounded-md font-medium transition-colors duration-200
                                ${pathname === link.href
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:text-white"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* MOBILE MENU BUTTON */}
                <div className="flex  md:hidden">
                    <Button
                        className=" md:hidden w-16 text-gray-300 hover:bg-transparent bg-transparent "
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                    </Button>
                </div>
           
            </nav>

            {/* MOBILE DROPDOWN */}
            <div
                className={`md:hidden mt-2 flex flex-col gap-2 bg-gray-900 rounded-lg px-4 py-4 border border-gray-700 transition-all duration-200
                    ${mobileOpen
                        ? "opacity-100 max-h-[300px]"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2 rounded-md font-medium transition
                            ${pathname === link.href
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:text-white"
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}

                <div className="border-t border-gray-700 flex pt-4 justify-center">
                    <WeatherWidget compact />
                </div>
            </div>
        </header>
    );
}
