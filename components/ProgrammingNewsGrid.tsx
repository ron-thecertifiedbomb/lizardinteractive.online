/*
Next.js Pages Router version: Programming News Grid with client component + API route + next/image
*/

// File: components/ProgrammingNewsGrid.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type NormalizedItem = {
    title: string;
    link: string;
    source: string;
    date: string | null;
    image: string | null;
    summary: string;
};

export default function ProgrammingNewsGrid() {
    const [items, setItems] = useState<NormalizedItem[]>([]);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Programming & Dev News</h2>
                <p className="text-sm text-muted-foreground">Sources: Hacker News, Dev.to, GitHub Blog, r/programming</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((it, idx) => (
                    <a key={idx} href={it.link} target="_blank" rel="noopener noreferrer" className="group block rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow duration-150">
                        <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                            {it.image ? (
                                <Image
                                    src={it.image}
                                    alt={it.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500">No image</div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm font-medium line-clamp-2">{it.title}</h3>
                            <p className="text-xs text-gray-500 mt-2 line-clamp-3">{it.summary}</p>
                            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                                <span>{it.source}</span>
                                {it.date ? <time dateTime={it.date}>{new Date(it.date).toLocaleString()}</time> : <span>—</span>}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
                <span>Composed from public RSS feeds • Free</span>
            </div>
        </section>
    );
}
