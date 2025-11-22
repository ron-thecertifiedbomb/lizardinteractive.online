"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../components/container";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherWidget } from "./WeatherWidget/WeatherWidget";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "About" },
    { href: "/blogs", label: "Blog" },
    { href: "/utilities", label: "Utilities" },
    { href: "/latest", label: "Latest" },
  ];

  // Create the WeatherWidget once
  const weatherWidget = useMemo(
    () => <WeatherWidget className="w-10 h-10" />,
    []
  );

  const carouselItems = useMemo(
    () => [
      <Link href="/" key="logo">
        <Image
          src="/lizardinteractive.png"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
      </Link>,
      <div key="widget" className="w-12 h-12 rounded-full flex items-center justify-center">
        {weatherWidget}
      </div>,
    ],
    [weatherWidget]
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000); // change every 10s
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const carouselSize = "w-14 h-14";

  return (
    <header className="py-6 bg-dark-bg text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Flip Carousel */}
          <div
            className={`relative perspective-1000 flex items-center justify-center ${carouselSize}`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center backface-hidden"
              >
                {carouselItems[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6">
            {links.map((link) => (
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
        </nav>
      </Container>
    </header>
  );
}
