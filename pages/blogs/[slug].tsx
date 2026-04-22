import { useRouter } from 'next/router';
import Image from 'next/image';
import MetaHead from "@/components/MetaHead/MetaHead";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import BlogContent from '@/components/BlogContent/BlogContent';
import { blogArticles } from '@/data/lists/blogArticle';
import { Calendar, Clock } from 'lucide-react';

export default function BlogPostPage() {

  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady || typeof slug !== "string") {
    return null;
  }

  const post = blogArticles.find((article) => article.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        404 - Post not found
      </div>
    );
  }

  const readTime = Math.ceil(
    post.sections.reduce((acc, section) => acc + section.content.length, 0) / 1000
  );

  // ✅ Use ogImage for social sharing (JPG), image for web display (WebP)
  const ogUrl = `https://lizardinteractive.online/blogs/${post.id}`;

  return (
    <>
      <MetaHead
        data={{
          title: post.title,
          description: post.sections?.[0]?.content?.substring(0, 160) || "",
          ogImage: post.ogImage,  // ✅ JPG for social media
          ogUrl: ogUrl,           // ✅ Blog post URL
          ogType: "article",
        }}
      />

      <ScreenContainer>
        <div className="max-w-4xl mx-auto pt-28 pb-40 px-4 md:px-6">

          {/* Featured Image - uses WebP for faster loading */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-zinc-900">
              <Image
                src={`/${post.image}`}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Header */}
          <header className="border-b border-zinc-900 pb-8 mb-12 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <h1 className="text-[clamp(2rem,8vw,4rem)] font-black uppercase leading-[1.1] tracking-tighter text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{readTime} min read</span>
              </div>
            </div>

            {post.sections?.[0] && (
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed italic border-l-2 border-emerald-500 pl-5">
                {post.sections[0].content}
              </p>
            )}
          </header>

          <BlogContent article={post} />
        </div>
      </ScreenContainer>
    </>
  );
}