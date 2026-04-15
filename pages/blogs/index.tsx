import type { InferGetStaticPropsType } from "next";
import distanceToNow from "../../lib/dateRelative";
import { BlogPost } from "../../interfaces";
import Link from "next/link";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { motion } from "framer-motion";

export default function BlogPage({
    allBlogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {

    function extractFirstImage(html: string): string | null {
        if (!html) return null;
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : null;
    }

    return (
        /* MASTER WRAPPER: Forced Black Background */
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black">

            <ScreenContainer variant="dark" maxWidth="xl">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-40">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <SectionHeader
                            title="Daily Blogs"
                            subtitle="Checkout our daily blogs for tutorials and programming tips."
                        />
                    </motion.div>

                    <div className="mt-12 space-y-1">
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
                                                    <h2 className="text-xl lg:text-3xl font-bold group-hover:text-emerald-400 transition-colors uppercase tracking-tighter">
                                                        {blog.title}
                                                    </h2>

                                                    <div className="text-xs lg:text-sm text-zinc-500 font-mono mt-3 uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-8 h-[1px] bg-zinc-800" />
                                                        <time>{distanceToNow(new Date(blog.createdAt))}</time>
                                                    </div>
                                                </div>

                                                {imgSrc && (
                                                    <div className="relative w-24 h-16 md:w-40 md:h-24 overflow-hidden rounded-none border border-zinc-900 grayscale group-hover:grayscale-0 transition-all duration-700">
                                                        <img
                                                            src={imgSrc}
                                                            alt={blog.title}
                                                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
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
            props: { allBlogs },
            revalidate: 10,
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: { allBlogs: [] as BlogPost[] },
        };
    }
}