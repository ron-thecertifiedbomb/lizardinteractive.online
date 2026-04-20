"use client";

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";

import { blogArticles } from "@/data/lists/blogList";
import BlogContent from '@/components/BlogContent/BlogContent';

/**
 * SHARED SLUG UTILITY
 * Ensures the URL matches the data lookup 100%
 */
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-")      // Replace spaces with hyphens
    .trim();
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // FIND THE POST: Search by generating a slug from the titles in your list
  const post = useMemo(() => {
    if (!slug) return null;
    return blogArticles.find(
      (article) => generateSlug(article.content.header.title) === slug
    );
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-zinc-800 bg-black">
        [ 404_NULL: transmission_lost ]
      </div>
    );
  }

  return (
    <>
      <MetaHead
        data={{
          title: post.content.header.title,
          ogImage: post.ogImage,
          description: post.content.hooks.intro
        }}
      />

      <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
        <ScreenContainer variant="dark" maxWidth="xl">
          <div className="max-w-4xl mx-auto pt-24 pb-40 px-4 md:px-6">

            {/* --- PAGE HEADER --- */}
            <header className="border-b border-zinc-900 pb-12 mb-20">
              <h1 className="text-[clamp(2.2rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter mb-8">
                {post.content.header.title}
              </h1>
              <p className="text-zinc-500 border-l-2 border-emerald-500 pl-6 uppercase tracking-widest text-[11px] md:text-sm font-medium italic">
                {post.content.hooks.intro}
              </p>
            </header>

            {/* --- CONTENT ENGINE --- */}
            <BlogContent
              content={post.content}
       
              ogImage={post.ogImage}
            />

          </div>
        </ScreenContainer>
      </div>
    </>
  );
}