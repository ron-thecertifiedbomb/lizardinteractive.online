'use client'

import { CaseStudy } from '@/data/lists/caseStudies';
import { motion } from 'framer-motion';
import Link from 'next/link'; // <-- Added Next.js Link import

export default function CaseStudyComponent({ study }: { study: CaseStudy }) {
    return (
        <section className="relative py-16 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-sm uppercase tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                            {study.category}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-white via-zinc-200 to-zinc-500 mb-6 leading-tight">
                            {study.title}
                        </h2>

                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            <span className="text-white font-semibold">The Challenge:</span> {study.challenge}
                        </p>

                        {/* Results Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            {study.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl group hover:border-emerald-500/50 hover:-translate-y-1 hover:bg-zinc-800/50 transition-all duration-300"
                                >
                                    <div className="text-2xl font-bold text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 origin-left transition-all duration-300">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs uppercase text-zinc-500 tracking-wider font-medium mt-1">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {study.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-1.5 bg-zinc-900/80 text-zinc-400 text-xs rounded-full border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-500/5 transition-all duration-300 cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* NEW: Action Button */}
                        <Link
                            href={`/casestudy/${study.slug || study.id}`} // Uses slug or falls back to ID
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-emerald-500/10 border border-emerald-500/50 rounded-full overflow-hidden transition-all duration-300 hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                            <span className="relative z-10 font-mono text-sm tracking-widest text-emerald-400 uppercasefont-bold">
                               See Details
                            </span>

                            {/* Animated Arrow Icon */}
                            <svg
                                className="relative z-10 w-4 h-4 text-emerald-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Visual Column - The Blueprint Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group cursor-crosshair"
                    >
                        {/* Dynamic Background Glow */}
                        <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                        {/* Floating Container */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative aspect-square md:aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden border border-emerald-500/20 bg-zinc-950 shadow-2xl flex items-center justify-center backdrop-blur-xl"
                        >
                            {/* Animated Grid Overlay */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px'
                                }}>
                            </div>

                            {/* The "Schematic" Content */}
                            <div className="relative z-10 w-full h-full p-8 flex flex-col">
                                {/* Top Bar / Header Simulation */}
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/60 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                        <div className="w-16 h-2 rounded-full bg-zinc-800/80"></div>
                                    </div>
                                    <div className="w-24 h-2 rounded-full bg-zinc-800/80"></div>
                                </div>

                                {/* Main Visual Placeholder (The "Hero" of the image) */}
                                <div className="flex-1 border border-dashed border-emerald-500/30 rounded-2xl flex items-center justify-center relative overflow-hidden bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500">
                                    {/* Moving "Scan" Line */}
                                    <motion.div
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-[2px] bg-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.8)] z-20"
                                    />

                                    <span className="font-mono text-xs text-emerald-500/60 uppercase tracking-[0.3em] rotate-90 lg:rotate-0 select-none">
                                        Image_Asset_Pending // CS_{study.id || 'DATA'}
                                    </span>
                                </div>

                                {/* Bottom Data Strips */}
                                <div className="mt-6 space-y-4">
                                    <div className="w-full h-1.5 bg-zinc-800/50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '75%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="h-full bg-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="w-1/3 h-1.5 bg-zinc-800/80 rounded-full"></div>
                                        <div className="w-1/4 h-1.5 bg-zinc-800/80 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Coordinates */}
                            <span className="absolute top-4 left-4 font-mono text-[10px] text-emerald-500/40 select-none">SYS.RDY // 00.124.99.1</span>
                            <span className="absolute bottom-4 right-4 font-mono text-[10px] text-emerald-500/40 select-none">LAT_76.2 // LON_1.0</span>
                        </motion.div>

                        {/* Decorative Accents */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-xl transition-all duration-300 group-hover:border-emerald-400 group-hover:w-10 group-hover:h-10"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-xl transition-all duration-300 group-hover:border-emerald-400 group-hover:w-10 group-hover:h-10"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
