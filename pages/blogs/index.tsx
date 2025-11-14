// pages/blogs/index.tsx
import type { InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";

export default function BlogPage({
    allBlogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container>
            {/* <h1 className="text-3xl font-bold text-white mb-6">All Blogs</h1> */}

            {allBlogs.length ? (
                allBlogs.map((post) => (
                    <article key={post._id} className="mb-6 text-white pb-4">
                        <h2 className="text-xl lg:text-3xl font-bold">{post.title}</h2>

                        {post.content.map((block, i) => {
                            switch (block.type) {
                                case "h2":
                                    return (
                                        <h3 key={i} className="text-lg lg:text-2xl font-semibold mt-2">
                                            {block.text}
                                        </h3>
                                    );
                                case "p":
                                    return (
                                        <p key={i} className="mt-2 text-sm lg:text-base font-light">
                                            {block.text}
                                        </p>
                                    );
                                default:
                                    return null;
                            }
                        })}

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

// Fetch data from your Node.js API
export async function getStaticProps() {
    try {
        const res = await fetch("http://localhost:8080/api/blogs");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const allBlogs = await res.json();

        return {
            props: { allBlogs },
            revalidate: 10, // optional: ISR, regenerate page every 10s
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return {
            props: { allBlogs: [] },
        };
    }
}
