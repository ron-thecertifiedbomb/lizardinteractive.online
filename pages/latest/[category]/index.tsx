'use client';
import { useRouter } from 'next/router';
import NewsGrid from '../../../components/NewsGrid';

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query; // get category from URL

    if (!category || typeof category !== 'string') {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <p className="text-gray-300 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <NewsGrid
                category={category}
                subtitle="Latest articles and updates from public RSS feeds."
            />
        </div>
    );
}
