import { useState } from "react";
import { motion } from "framer-motion";

const services = [
    { id: 1, name: "Full-Stack Architecture", desc: "Next.js, TypeScript, and Scalable Vercel Deployments." },
    { id: 2, name: "Database Migration", desc: "Specializing in Supabase integration and data integrity." },
    { id: 3, name: "Performance Optimization", desc: "Achieving 100/100 Lighthouse scores for maximum UX." },
    { id: 4, name: "Void Engine Solutions", desc: "Custom-built internal tools for niche automation." }
];

export default function RonDevSolutions() {
    const [isHovered, setIsHovered] = useState<number | null>(null);

    return (
        <main className="max-w-5xl mx-auto px-8 pt-24 pb-32">
            {/* --- HEADER --- */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-32"
            >
                <h1 className="text-xs tracking-[0.5em] uppercase text-zinc-500 mb-4">
                    Vertical Integration & Software
                </h1>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                    RonDev<span className="text-zinc-500">Solutions</span>
                </h2>
            </motion.header>

            {/* --- SOLUTIONS GRID --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        onMouseEnter={() => setIsHovered(service.id)}
                        onMouseLeave={() => setIsHovered(null)}
                        className="group relative border-t border-zinc-800 pt-8"
                    >
                        <h3 className="text-xl font-medium mb-4 group-hover:translate-x-2 transition-transform duration-300 text-white">
                            {service.name}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed max-w-sm">
                            {service.desc}
                        </p>
                        <motion.div
                            className="absolute top-0 left-0 h-[2px] bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: isHovered === service.id ? "100%" : "0%" }}
                        />
                    </motion.div>
                ))}
            </section>

            {/* --- CTA --- */}
            <footer className="mt-48 flex flex-col items-center border-t border-zinc-900 pt-16">
                <p className="text-sm text-zinc-500 mb-8 text-center">Ready to turn 404s into 200 OKs?</p>
                <a
                    href="mailto:contact@lizardinteractive.online"
                    className="text-2xl font-light hover:text-zinc-400 transition-colors border-b border-zinc-700 pb-2 text-white text-center"
                >
                    Inquire for Project Collaboration
                </a>
            </footer>
        </main>
    );
}