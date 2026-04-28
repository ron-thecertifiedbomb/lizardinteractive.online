import { BlogArticleCMS } from '@/components/shared/BlogArticleCMS/BlogArticleCMS';
import { BlogArticle } from '@/data/lists/blogArticle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function EditArticlePage() {
    const router = useRouter();
    const { id } = router.query; // This gets the [id] from the URL
    const [article, setArticle] = useState<BlogArticle | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/articles?id=${id}`)
                .then(res => res.json())
                .then(data => setArticle(data));
        }
    }, [id]);

    if (!article && id !== 'new') return <div className="p-10 text-white">Loading...</div>;

    return (
        <div className="bg-black min-h-screen">
            <BlogArticleCMS initialData={article || undefined} />
        </div>
    );
}