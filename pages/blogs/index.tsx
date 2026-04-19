"use client";

import distanceToNow from "../../lib/dateRelative";
import { BlogPost } from "../../interfaces";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { specialLogs } from "../../data/blogContent";
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    function extractFirstImage(html: string): string | null {
        if (!html) return null;
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : null;
    }

    // Force hard navigation to bypass any JS event/dispatch blocks
    const handleForceNav = (href: string) => {
        document.body.style.overflow = 'unset';
        window.location.href = href;
    };

    // Get featured logs from specialLogs
    const featuredLogs = Object.values(specialLogs);

    // Fetch blogs on client side
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = process.env.NEXT_PUBLIC_GET_ALL_BLOGS_URL;
                const res = await fetch(url!);
                if (res.ok) {
                    const data = await res.json();
                    const sorted = data.sort((a: BlogPost, b: BlogPost) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setAllBlogs(sorted);
                }
            } catch (error) {
                console.error("Transmission failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black relative z-[1]">
            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* --- KILLER LOGS HEADER --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-full mb-24 border-b border-zinc-900 pb-12"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-none animate-ping absolute opacity-20" />
                                    <div className="w-2 h-2 bg-emerald-500 rounded-none" />
                                </div>
                                <span className="text-emerald-500 font-mono text-[9px] tracking-[0.6em] uppercase font-black">
                                    TRANSMISSION.ACTIVE // 200_OK
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-white">
                                Lizard <span className="text-emerald-500">Logs</span>
                            </h1>
                            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                                <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold leading-relaxed max-w-xl">
                                    Technical breakdowns <span className="text-zinc-800">//</span>
                                    Production secrets <span className="text-zinc-800">//</span>
                                    <span className="text-white">High-performance systems & philosophy.</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- DUAL FEATURED SECTION (The Dispatch Fix) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-900 border-y border-zinc-900 mb-32 overflow-hidden relative z-20">
                        {featuredLogs.map((log) => (
                            <div
                                key={log.slug}
                                onPointerDown={() => handleForceNav(`/blogs/${log.slug}`)}
                                className="group block bg-black hover:bg-emerald-500/[0.02] active:bg-zinc-900 transition-all duration-500 p-8 md:p-12 border-l-2 border-emerald-500 cursor-pointer touch-manipulation"
                            >
                                <div className="flex flex-col h-full justify-between pointer-events-none">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-emerald-500/50 font-mono text-[9px] uppercase tracking-widest">
                                            <Activity size={10} /> {log.layoutType}_LOG // {log.slug === 'best-laptops-2026' ? 'PRIORITY_01' : 'PRIORITY_02'}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-emerald-400 transition-colors leading-[0.9]">
                                            {log.title}
                                        </h2>
                                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] leading-relaxed font-bold">
                                            {log.description}
                                        </p>
                                    </div>
                                    <div className="mt-12 flex items-center gap-3 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                                        INITIALIZE_BUFFER <Zap size={10} className="fill-current" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- DYNAMIC FEED (The Dispatch Fix) --- */}
                    <div className="space-y-1 relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-zinc-800 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
                                [ latest_transmissions ]
                            </span>
                            <div className="h-[1px] flex-1 bg-zinc-900" />
                        </div>

                        {loading ? (
                            <div className="py-20 text-center border border-dashed border-zinc-900">
                                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                    [ loading_transmissions... ]
                                </p>
                            </div>
                        ) : allBlogs.length ? (
                            allBlogs.map((blog, index) => {
                                const imgSrc = extractFirstImage(blog.content);
                                return (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div
                                            onPointerDown={() => handleForceNav(`/blogs/${blog._id}`)}
                                            className="group block border-b border-zinc-900 py-8 hover:border-emerald-500/50 active:bg-emerald-500/[0.02] transition-all duration-500 cursor-pointer touch-manipulation"
                                        >
                                            <article className="flex flex-row gap-6 justify-between items-center pointer-events-none">
                                                <div className="flex-1">
                                                    <h2 className="text-xl lg:text-3xl font-bold group-hover:text-emerald-400 transition-colors uppercase tracking-tighter leading-tight">
                                                        {blog.title}
                                                    </h2>
                                                    <div className="text-xs lg:text-sm text-zinc-500 font-mono mt-4 uppercase tracking-widest flex items-center gap-2">
                                                        <time>{distanceToNow(new Date(blog.createdAt))}</time>
                                                    </div>
                                                </div>
                                                {imgSrc && (
                                                    <div className="relative w-24 h-16 md:w-48 md:h-28 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-zinc-900 flex-shrink-0">
                                                        <img
                                                            src={imgSrc}
                                                            alt={blog.title}
                                                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-100"
                                                        />
                                                    </div>
                                                )}
                                            </article>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="py-20 text-center border border-dashed border-zinc-900">
                                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                                    [ system_error: no_logs_detected ]
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </ScreenContainer>
        </div>
    );
}