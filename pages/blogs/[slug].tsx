"use client";

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";

import BlogContent from '@/components/BlogContent/BlogContent';
import { blogArticles } from '@/data/lists/blogArticle';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // 1. FIND THE POST: Search directly by ID
  const post = useMemo(() => {
    if (!slug) return null;
    return blogArticles.find((article) => article.id === slug);
  }, [slug]);

  // 2. 404 STATE: Transmission Lost
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-zinc-800 bg-black">
        [ 404_NULL: transmission_lost ]
      </div>
    );
  }

  return (
    <>
      {/* 3. UPDATED META: Using flat properties */}
      <MetaHead
        data={{
          title: post.title,
          ogImage: post.image,
          description: post.sections?.[0]?.content || ""
        }}
      />

      <ScreenContainer variant="dark" maxWidth="xl">
        <div className="max-w-4xl mx-auto pt-24 pb-40 px-4 md:px-6">

          {/* --- 4. PAGE HEADER: Refined to match your universal layout --- */}
          <header className="border-b border-zinc-900 pb-12 mb-20 space-y-8">
            <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
              {post.title}
            </h1>

            {/* Grab the first section's content as the intro summary */}
            {post.sections?.[0] && (
              <p className="text-zinc-500 border-l-2 border-emerald-500 pl-6 uppercase tracking-widest text-[11px] md:text-sm font-medium italic leading-relaxed">
                {post.sections[0].content}
              </p>
            )}
          </header>

          {/* --- 5. CONTENT ENGINE: Renders the rest of the sections and items --- */}
          <BlogContent article={post} />

        </div>
      </ScreenContainer>
    </>
  );
}