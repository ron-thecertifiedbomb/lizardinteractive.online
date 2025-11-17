'use client';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

type NewsItem = {
    title: string;
    link: string;
    source: string;
    date: string | null;
    image: string | null;
    summary: string;
};

export default function CategoryPage() {
    const router = useRouter();
    const { category } = router.query;
    const [items, setItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        if (!category) return;

        // Example: fetch data based on category
        // You can create API routes like /api/programming-news, /api/tech-news, etc.
        fetch(`/api/${category}-news`)
            .then((res) => res.json())
            .then(setItems)
            .catch(console.error);
    }, [category]);

    if (!category) return <p>Loading...</p>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4 capitalize">{category} News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow duration-150"
                    >
                        {item.image && (
                            <div className="w-full h-40 relative">
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                        )}
                        <div className="p-3">
                            <h3 className="text-lg font-medium line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.summary}</p>
                            <div className="mt-2 flex justify-between text-xs text-gray-400">
                                <span>{item.source}</span>
                                {item.date && <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
