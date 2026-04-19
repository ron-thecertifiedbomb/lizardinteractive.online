import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LatestTrendingNews() {
    const categories = [
        { name: "Programming", url: "/latest/programming", tag: "Code" },
        { name: "Technology", url: "/latest/technology", tag: "Tech" },
        { name: "World News", url: "/latest/world", tag: "Globe" },
        { name: "Startups", url: "/latest/startups", tag: "Scale" },
    ];

    return (
        
            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >

                        
                                        <SectionHeader
                                            title="Online Gaming"
                                            highlight="Hub"
                                            description="Low-latency, zero-tracker, and optimized for performance."
                                        />
                        
         
                    </motion.div>

                    {/* BRUTALIST GRID: Matches the homepage 'Doors' style */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={cat.url}
                                    className="group relative block p-10 bg-[#080808] border border-zinc-900 transition-all duration-500 hover:border-emerald-500/50 overflow-hidden"
                                >
                                    {/* Background Accent Tag */}
                                    <span className="absolute -right-2 -bottom-2 text-6xl font-black text-white/[0.02] uppercase select-none group-hover:text-emerald-500/5 transition-all">
                                        {cat.tag}
                                    </span>

                                    <div className="flex flex-col items-center sm:items-start space-y-4">
                                        <div className="w-8 h-[1px] bg-emerald-500 opacity-50 group-hover:w-16 transition-all duration-500" />
                                        <span className="text-xl lg:text-2xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">
                                            {cat.name}
                                        </span>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 group-hover:text-white transition-all">
                                            <span>Explore Feed</span>
                                            <div className="w-4 h-[1px] bg-zinc-900 group-hover:bg-emerald-500/40" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ScreenContainer>
   
    );
}