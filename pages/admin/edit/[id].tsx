import { BlogArticleCMS } from "@/components/shared/BlogArticleCMS/BlogArticleCMS";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { MongoClient } from "mongodb";
import Head from "next/head";

export async function getServerSideProps({ params }: { params: { id: string } }) {
    // If creating a new article, bypass database fetch
    if (params.id === "new") {
        return { props: { initialData: null } };
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return { props: { initialData: null } };
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("lizrd_core");
        const article = await db.collection("articles").findOne({ id: params.id });

        if (!article) {
            return { notFound: true };
        }

        // Remove _id to avoid Next.js JSON serialization errors
        const { _id, ...initialData } = article as any;
        return { props: { initialData } };
    } catch (error) {
        console.error("❌ Failed to fetch article for CMS:", error);
        return { props: { initialData: null } };
    } finally {
        await client.close();
    }
}

export default function EditArticlePage({ initialData }: { initialData: any }) {
    return (
        <>
            <Head>
                <title>CMS | {initialData ? "Edit Article" : "New Article"}</title>
            </Head>
            <ScreenContainer>
                <div className="pt-24 pb-20">
                    <BlogArticleCMS initialData={initialData} />
                </div>
            </ScreenContainer>
        </>
    );
}