import type { InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { BlogPost } from "../../interfaces";
import Link from "next/link";

let DOMPurify: any;

if (typeof window !== "undefined") {
    // Client-side import
    DOMPurify = require("dompurify");
} else {
    // Server-side: use jsdom
    const { JSDOM } = require("jsdom");
    const window = new JSDOM("").window;
    DOMPurify = require("dompurify")(window);
}

export default function BlogPage({
    allBlogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    console.log("Blogs", allBlogs);

    function extractFirstImage(html: string): string | null {
        if (!html) return null;
        const match = html.match(/<img[^>]+src="([^">]+)"/i);
        return match ? match[1] : null;
    }

    return (
        <Container>
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white">Daily Blogs</h1>
                <p className="text-gray-300 mt-2 text-lg">
                    Checkout our daily blogs for tutorials and programming tips.
                </p>
            </div>
            {allBlogs.length ? (
                allBlogs.map((blog) => {
                    const imgSrc = extractFirstImage(blog.content);

                    return (
                        <Link
                            key={blog._id}
                            href={`/blogs/${blog._id}`}
                            className="text-xl lg:text-3xl font-bold text-white"
                        >
                            <article className="mb-4 text-white pb-4">
                                <div className="flex flex-row gap-3 justify-between items-start">
                                    <div>
                                        <h2 className="text-xl lg:text-2xl font-bold">
                                            {blog.title}
                                        </h2>

                                        <div className="text-xs lg:text-sm text-gray-200 font-extralight mt-2">
                                            <time>{distanceToNow(new Date(blog.createdAt))}</time>
                                        </div>
                                    </div>

                                    {imgSrc && (
                                        <img
                                            src={imgSrc}
                                            alt={blog.title}
                                            className="max-w-sm max-h-14 rounded-xl mb-6"
                                        />
                                    )}
                                </div>
                            </article>
                        </Link>
                    );
                })
            ) : (
                <p>No blog posted yet :/</p>
            )}
        </Container>
    );
}

export async function getStaticProps() {
    const url = process.env.GET_ALL_BLOGS_URL;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const allBlogs: BlogPost[] = await res.json();

        return {
            props: { allBlogs },
            revalidate: 10, // ISR
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);

        return {
            props: { allBlogs: [] as BlogPost[] },
        };
    }
}
