import type { InferGetStaticPropsType } from "next";
import distanceToNow from "../../lib/dateRelative";
import { BlogPost } from "../../interfaces";
import Link from "next/link";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { laptopArticle2026 } from "../../data/blogContent";

export default function BlogPage({
    allBlogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {

    function extractFirstImage(html: string): string | null {
        if (!html) return null;
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : null;
    }

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">
            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    {/* --- KILLER LOGS HEADER: METRONOME SYNCED --- */}
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
                            <div className="hidden md:flex gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className={`w-[2px] h-3 ${i % 4 === 0 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-white">
                                Lizard <span className="text-emerald-500">Logs</span>
                            </h1>
                            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                                <div className="space-y-4">
                                    <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold leading-relaxed max-w-xl">
                                        Technical breakdowns <span className="text-zinc-800">//</span>
                                        Production secrets <span className="text-zinc-800">//</span>
                                        <span className="text-white">High-performance gear reviews.</span>
                                    </p>
                                </div>
                                <div className="flex lg:justify-end gap-12 font-mono">
                                    <div className="flex flex-col text-right">
                                        <span className="text-zinc-800 text-[8px] uppercase font-black tracking-widest">Latency</span>
                                        <span className="text-emerald-500/50 text-[10px]">0.00ms</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-zinc-800 text-[8px] uppercase font-black tracking-widest">Frequency</span>
                                        <span className="text-emerald-500/50 text-[10px]">44.1kHz</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-zinc-800 text-[8px] uppercase font-black tracking-widest">Version</span>
                                        <span className="text-emerald-500/50 text-[10px]">v3.2.6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- FEATURED AFFILIATE SECTION --- */}
                    <div className="mb-32">
                        {/* TARGETING THE PLURAL /blogs/ SLUG SYSTEM */}
                        <Link href="/blogs/best-laptops-2026" className="group block">
                            <div className="relative p-8 md:p-12 border-l-2 border-emerald-500 bg-[#050505] hover:bg-emerald-500/[0.03] transition-all duration-500">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4 text-emerald-500/50 font-mono text-[9px] uppercase tracking-widest">
                                            <Activity size={10} /> Priority_Access // Hardware_Audit
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-emerald-400 transition-colors">
                                            {laptopArticle2026.header.title}
                                        </h2>
                                        <p className="text-zinc-600 text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed max-w-2xl font-bold">
                                            {laptopArticle2026.hooks.intro}
                                        </p>
                                    </div>
                                    {/* THE KILLER BUTTON */}
                                    <div className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                        RUN_DIAGNOSTIC <Zap size={10} className="fill-current" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* --- DYNAMIC FEED --- */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-zinc-800 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
                                [ latest_transmissions ]
                            </span>
                            <div className="h-[1px] flex-1 bg-zinc-900" />
                        </div>

                        {allBlogs.length ? (
                            allBlogs.map((blog, index) => {
                                const imgSrc = extractFirstImage(blog.content);
                                return (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={`/blogs/${blog._id}`}
                                            className="group block border-b border-zinc-900 py-8 hover:border-emerald-500/50 transition-all duration-500"
                                        >
                                            <article className="flex flex-row gap-6 justify-between items-center">
                                                <div className="flex-1">
                                                    <h2 className="text-xl lg:text-3xl font-bold group-hover:text-emerald-400 transition-colors uppercase tracking-tighter leading-tight">
                                                        {blog.title}
                                                    </h2>
                                                    <div className="text-xs lg:text-sm text-zinc-500 font-mono mt-4 uppercase tracking-widest flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-emerald-500/30 rounded-full" />
                                                        <time>{distanceToNow(new Date(blog.createdAt))}</time>
                                                    </div>
                                                </div>
                                                {imgSrc && (
                                                    <div className="relative w-24 h-16 md:w-48 md:h-28 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border border-zinc-900">
                                                        <img
                                                            src={imgSrc}
                                                            alt={blog.title}
                                                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-100"
                                                        />
                                                    </div>
                                                )}
                                            </article>
                                        </Link>
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

export async function getStaticProps() {
    const url = process.env.GET_ALL_BLOGS_URL;
    try {
        const res = await fetch(url!);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const allBlogs: BlogPost[] = await res.json();
        return {
            props: {
                allBlogs: allBlogs.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            },
            revalidate: 10,
        };
    } catch (error) {
        return { props: { allBlogs: [] as BlogPost[] } };
    }
}