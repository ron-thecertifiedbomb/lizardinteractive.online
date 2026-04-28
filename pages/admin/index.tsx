import Link from "next/link";
import { MongoClient } from "mongodb";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { Plus, Edit, FileText } from "lucide-react";
import Head from "next/head";

export async function getServerSideProps() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        return { props: { articles: [] } };
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("lizrd_core");
        const articles = await db.collection("articles").find({}).sort({ createdAt: -1 }).toArray();

        // Serialize _id
        const serializedArticles = articles.map((article: any) => {
            const { _id, ...rest } = article;
            return { ...rest, _id: _id.toString() };
        });

        return { props: { articles: serializedArticles } };
    } catch (error) {
        console.error("❌ Failed to fetch articles for dashboard:", error);
        return { props: { articles: [] } };
    } finally {
        await client.close();
    }
}

export default function AdminDashboard({ articles }: { articles: any[] }) {
    return (
        <>
            <Head>
                <title>Admin Dashboard | Lizard Interactive</title>
            </Head>
            <ScreenContainer>
                <div className="max-w-5xl mx-auto pt-24 pb-20 px-4 md:px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                                <FileText className="text-emerald-500" size={32} />
                                Article Management
                            </h1>
                            <p className="text-zinc-400 mt-2">Manage your blog posts, technical writings, and case studies.</p>
                        </div>
                        <Link
                            href="/admin/edit/new"
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        >
                            <Plus size={20} />
                            New Article
                        </Link>
                    </div>

                    {/* Article List */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                        {articles.length === 0 ? (
                            <div className="p-10 text-center text-zinc-500 font-mono text-sm">
                                No articles found. Create your first one!
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {articles.map((article) => (
                                    <div key={article.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-800/50 transition-colors group">
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-1">
                                                {article.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                                                <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {article.category}
                                                </span>
                                                <span>/{article.id}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/admin/edit/${article.id}`}
                                            className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors border border-zinc-700"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </ScreenContainer>
        </>
    );
}