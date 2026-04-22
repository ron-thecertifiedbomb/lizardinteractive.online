"use client";

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import BlogContent from '@/components/BlogContent/BlogContent';
import { blogArticles } from '@/data/lists/blogArticle';
import { Calendar, Clock, ImageIcon } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [imageError, setImageError] = useState(false);

  const post = useMemo(() => {
    if (!slug) return null;
    return blogArticles.find((article) => article.id === slug);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-zinc-800 bg-black">
        [ 404_NULL: transmission_lost ]
      </div>
    );
  }

  // Calculate read time
  const readTime = Math.ceil(
    post.sections.reduce((acc, section) => acc + section.content.length, 0) / 1000
  );

  return (
    <>
      <MetaHead
        data={{
          title: post.title,
          description: post.sections?.[0]?.content?.substring(0, 160) || "",
          ogImage: post.image || "/og-image.png",
          ogUrl: `https://lizardinteractive.online/blogs/${post.id}`,
          ogType: "article",
          twitterCard: "summary_large_image",
        }}
      />

      <ScreenContainer>
        <div className="max-w-4xl mx-auto pt-28 pb-40 px-4 md:px-6">

          {/* --- FEATURED IMAGE AT THE TOP with Next.js Image --- */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-zinc-900">
              {!imageError ? (
                <Image
                  src={`/${post.image}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <div className="text-center">
                    <ImageIcon size={48} className="text-zinc-700 mx-auto mb-2" />
                    <p className="text-xs font-mono text-zinc-600">Featured image not available</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- HEADER with Meta Info --- */}
          <header className="border-b border-zinc-900 pb-8 mb-12 space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2rem,8vw,4rem)] font-black uppercase leading-[1.1] tracking-tighter text-white">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Excerpt/Description */}
            {post.sections?.[0] && (
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed italic border-l-2 border-emerald-500 pl-5">
                {post.sections[0].content}
              </p>
            )}
          </header>

          {/* --- CONTENT --- */}
          <BlogContent article={post} />

        </div>
      </ScreenContainer>
    </>
  );
}