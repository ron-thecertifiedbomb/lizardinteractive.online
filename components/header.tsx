"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../components/container";
import { usePathname } from "next/navigation";
import { WeatherWidget } from "./WeatherWidget/WeatherWidget";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-6 bg-dark-bg text-white">
      <Container>
        {/* Logo left / nav group right */}
        <nav className="flex items-center justify-between">

          {/* LEFT — LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/lizardinteractive.png"
              alt="logo"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
          </Link>

          {/* RIGHT — LINKS + WEATHER */}
          <div className="flex items-center gap-6">
            {[
              { href: "/", label: "About" },
              { href: "/blogs", label: "Blog" },
              { href: "/utilities", label: "Utilities" },
              { href: "/latest", label: "Latest" },
            ].map((link) => (
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

            {/* WEATHER WIDGET */}
            <div className="w-12 h-12 flex items-center justify-center">
              <WeatherWidget className="w-10 h-10" />
            </div>
          </div>

        </nav>
      </Container>
    </header>
  );
}
