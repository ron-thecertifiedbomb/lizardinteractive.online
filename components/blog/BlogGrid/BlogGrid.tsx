"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Calendar } from "lucide-react";

interface Post {
    id: string;
    title: string;
    category: string;
    createdAt: string;
    image: string;
    sections: {
        heading: string;
        content: string;
    }[];
}

interface BlogGridProps {
    posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 md:px-6">
            {posts.map((post, idx) => {
                const dynamicSlug = post.id;

                return (
                    <motion.div
                        key={dynamicSlug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Link
                            href={`/blogs/${dynamicSlug}`}
                            className="group relative block bg-dark-950 border border-zinc-900 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 hover:scale-[1.02]"
                        >
                            {/* --- THE AMBIENT GLOW --- */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-500/2 rounded-full blur-[100px] md:blur-[120px] pointer-events-none z-0 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>

                            {/* Image Section */}
                            <div className="relative w-full h-48 overflow-hidden bg-zinc-900 z-10">
                                {post.image ? (
                                    <Image
                                        src={post.image.startsWith('http') || post.image.startsWith('/') ? post.image : `/${post.image}`}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                        <div className="text-center">
                                            <div className="text-4xl mb-2">📝</div>
                                            <div className="text-xs-plus font-mono text-zinc-600">{post.category}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 z-10">
                                    <span className="px-2 py-2 rounded-md  bg-black/70 backdrop-blur-sm text-xs font-medium text-white/90 uppercase tracking-wider">
                                        {post.category.replace("_", " ")}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="relative p-5 space-y-3 bg-gradient-emerald-dark border-t border-emerald-500/5 z-10">
                                {/* Date */}
                                <div className="flex items-center gap-1 text-xs-plus font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                    <Calendar size={10} />
                                    <span>
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }) : "Date unavailable"}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-black uppercase tracking-tighter leading-tight text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Read More Link */}
                                <div className="flex items-center justify-end pt-2">
                                    <div className="flex items-center gap-1 text-xs-plus font-mono text-zinc-600 group-hover:text-emerald-500 transition-colors">
                                        Read Article
                                        <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}