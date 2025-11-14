import type { InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";

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

type BlogPost = {
    _id: string;
    title: string;
    content: string; // HTML string
    createdAt: string;
};

export default function BlogPage({ allBlogs }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container>
            {allBlogs.length ? (
                allBlogs.map((post) => (
                    <article key={post._id} className="mb-6 text-white pb-4">
                        <h2 className="text-xl lg:text-3xl font-bold">{post.title}</h2>

                        <div
                            className="mt-2 text-sm lg:text-base font-light"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                        />

                        <div className="text-xs lg:text-sm text-gray-400 font-extralight mt-2">
                            <time>{distanceToNow(new Date(post.createdAt))}</time>
                        </div>
                    </article>
                ))
            ) : (
                <p>No blog posted yet :/</p>
            )}
        </Container>
    );
}

export async function getStaticProps() {

    const url = process.env.GET_ALL_BLOGS_URL
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
        return { props: { allBlogs: [] as BlogPost[] } };
    }
}
