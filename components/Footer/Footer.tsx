"use client";

import Image from "next/image";

export default function Footer() {

    // Dynamic Style Variables - Naka-set na sa Lizard Interactive Emerald Green default
    const statusColor = "text-emerald-500/30";

    return (
        <footer className="w-full py-8 bg-black text-white border-t border-white/10 transition-all duration-500 mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

                {/* SINGLE COLUMN - BRANDING AREA (Centered Block on Desktop and Mobile) */}
                <div className="pb-8">
                    {/* mx-auto centers the entire block */}
                    <div className="flex flex-col items-center gap-5 max-w-md mx-auto">

                        {/* MAIN BRANDING & DESCRIPTION (Text aligned center) */}
                        <div className="space-y-4 flex flex-col items-center text-center">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8 rounded-none overflow-hidden border border-white/10 flex-shrink-0">
                                    <Image
                                        src="/lizardinteractive.png" // Puro Lizard Interactive na lang
                                        alt="Lizard Interactive"
                                        width={40}
                                        height={40}
                                        className="object-cover grayscale opacity-50 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <span className="text-[10px] tracking-[0.3em] font-black uppercase">
                                    LIZARD INTERACTIVE
                                </span>
                            </div>

                            {/* Promotes showcase of services (Centered and italicized) */}
                            <p className="text-[11px] leading-relaxed text-zinc-500 max-w-xs uppercase tracking-widest italic">
                                Showcasing growth-focused services for landing pages, SEO, and organic traffic.
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase font-black">
                            No ego: <span className={`${statusColor}`}>Just skill-to-build</span>
                        </span>
                        <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase font-black hidden md:inline">
                            No borders <span className={`${statusColor}`}>Just code</span>
                        </span>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-[9px] tracking-[0.25em] text-zinc-700 uppercase font-black italic">
                            © {new Date().getFullYear()} Lizard Interactive Online
                        </p>
                        <p className="text-[8px] tracking-[0.15em] text-zinc-800 uppercase font-bold">
                            Lizard Interactive // Hub
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}