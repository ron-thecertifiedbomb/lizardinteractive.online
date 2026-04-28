import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";

import { blogPageContent } from "@/data/page/blogPageContent";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import { MongoClient } from "mongodb";

export async function getServerSideProps() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("❌ MONGODB_URI is missing in environment variables");
        return { props: { posts: [] } };
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("lizrd_core");
        const collection = db.collection("articles");

        const articles = await collection.find({}).toArray();

        // Serialize _id because Next.js cannot serialize MongoDB ObjectIds directly
        const serializedArticles = articles.map((article: any) => {
            const { _id, ...rest } = article;
            return { ...rest, _id: _id.toString() };
        });

        return { props: { posts: serializedArticles } };
    } catch (error) {
        console.error("❌ Failed to fetch articles:", error);
        return { props: { posts: [] } };
    } finally {
        await client.close();
    }
}

export default function BlogPage({ posts }: { posts: any[] }) {

    // You can keep this if you still want to pull SEO data from blogPageContent, 
    // but we are overriding the title for the new premium header below.
    const headerData = blogPageContent.find(item => item.type === "heading");

    return (
        <>
            <MetaHead pageContent={blogPageContent} />

            <ScreenContainer>

                {/* --- The Reusable Premium Header --- */}
                <MainHeader
                    eyebrow="Technical Writings & Case Studies"
                    headline="The Engineering Blog"
                    subheadline="Deep dives into Next.js architecture, high-performance web development, and the strategies I use to hit guaranteed 100/100 Lighthouse scores."
                />

                <BlogGrid posts={posts} />

            </ScreenContainer>
        </>
    );
}