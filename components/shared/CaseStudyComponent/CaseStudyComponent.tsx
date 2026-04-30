'use client'
import { CaseStudy } from '@/data/case-study-data';
import { motion } from 'framer-motion';

export default function CaseStudyComponent({ study }: { study: CaseStudy }) {
    return (
        <section className="relative py-24  overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-sm uppercase tracking-widest">
                            {study.category}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            {study.title}
                        </h2>

                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            <span className="text-white font-semibold">The Challenge:</span> {study.challenge}
                        </p>

                        {/* Results Grid - The "Killer" feature */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            {study.stats.map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl group hover:border-emerald-500/50 transition-colors">
                                    <div className="text-2xl font-bold text-emerald-400 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs uppercase text-zinc-500 tracking-wider font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {study.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Column - The Blueprint Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative group cursor-crosshair"
                    >
                        {/* Dynamic Background Glow */}
                        <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

                        <div className="relative aspect-square md:aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden border border-emerald-500/20 bg-zinc-950 shadow-2xl flex items-center justify-center">

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
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/40 animate-pulse"></div>
                                        <div className="w-12 h-3 rounded-full bg-zinc-800"></div>
                                    </div>
                                    <div className="w-24 h-2 rounded-full bg-zinc-800"></div>
                                </div>

                                {/* Main Visual Placeholder (The "Hero" of the image) */}
                                <div className="flex-1 border border-dashed border-emerald-500/30 rounded-2xl flex items-center justify-center relative overflow-hidden bg-emerald-500/5">
                                    {/* Moving "Scan" Line */}
                                    <motion.div
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-px bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.5)] z-20"
                                    />

                                    <span className="font-mono text-xs-plus text-emerald-500/40 uppercase tracking-[0.3em] rotate-90 lg:rotate-0">
                                        Image_Asset_Pending // CS_{study.id}
                                    </span>
                                </div>

                                {/* Bottom Data Strips */}
                                <div className="mt-6 space-y-3">
                                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '70%' }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-emerald-500/40"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="w-1/3 h-2 bg-zinc-900 rounded-full"></div>
                                        <div className="w-1/4 h-2 bg-zinc-900 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Coordinates */}
                            <span className="absolute top-4 left-4 font-mono text-xxs text-zinc-600">00.124.99.1</span>
                            <span className="absolute bottom-4 right-4 font-mono text-xxs text-zinc-600">LAT_76.2 // LON_1.0</span>
                        </div>

                        {/* Decorative Accents */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-emerald-500/40 rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-emerald-500/40 rounded-bl-lg"></div>
                    </motion.div>
                        {/* <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                          
                            <div className="w-full h-full bg-linear-to-br from-zinc-800 to-black flex items-center justify-center p-12">
                                <div className="w-full h-full rounded-xl border border-emerald-500/20 bg-black/40 backdrop-blur-xl flex flex-col p-6 space-y-4">
                                    <div className="h-4 w-1/2 bg-emerald-500/20 rounded animate-pulse"></div>
                                    <div className="h-4 w-3/4 bg-zinc-700/50 rounded"></div>
                                    <div className="h-4 w-2/3 bg-zinc-700/50 rounded"></div>
                                    <div className="mt-auto flex justify-between">
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/40"></div>
                                        <div className="h-8 w-24 rounded bg-emerald-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    {/* </motion.div> */}

                </div>
            </div>
        </section>
    );
}