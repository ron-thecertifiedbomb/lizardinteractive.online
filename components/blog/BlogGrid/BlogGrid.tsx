"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";

interface Post {
    title: string;
    slug: string;
    description: string;
    date?: string;
    category?: string;
}

interface BlogGridProps {
    posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {posts.map((post, idx) => (
                <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                >
                    <Link
                        href={`/blogs/${post.slug}`}
                        className="group relative flex flex-col justify-between p-6 h-64 bg-[#050505] border border-zinc-900 hover:border-emerald-500/40 transition-all duration-500 overflow-hidden"
                    >
                        {/* Subtle background index */}
                        <span className="absolute top-4 right-4 font-mono text-[10px] text-zinc-800 group-hover:text-emerald-500/20 transition-colors">
                            LOG_00{idx + 1}
                        </span>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-emerald-500/40 font-mono text-[8px] uppercase tracking-[0.2em]">
                                <Activity size={8} /> {post.category || "General"}_STREAM
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tighter leading-[1.1] group-hover:text-emerald-400 transition-colors break-words">
                                {post.title}
                            </h3>

                            <p className="text-zinc-600 text-[10px] uppercase tracking-wider line-clamp-3 leading-relaxed font-medium">
                                {post.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
                            <span className="text-zinc-700 font-mono text-[8px] uppercase">
                                {post.date || "2026.04.20"}
                            </span>
                            <ArrowUpRight size={12} className="text-zinc-800 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}