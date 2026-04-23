// pages/blogs/[slug].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import BlogContent from '@/components/BlogContent/BlogContent';
import { blogArticles } from '@/data/lists/blogArticle';
import { Calendar, Clock, Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const post = blogArticles.find((article) => article.id === params.slug);

  if (!post) {
    return { notFound: true };
  }

  const siteUrl = "https://lizardinteractive.online";

  // ✅ Use the actual blog image (ogImage for better compatibility)
  const ogImageUrl = `${siteUrl}/${post.ogImage || post.image}`;
  const ogUrl = `${siteUrl}/blogs/${post.id}`;
  const description = post.sections?.[0]?.content?.substring(0, 160) || "";

  return {
    props: {
      post,
      ogImageUrl,
      ogUrl,
      description,
    },
  };
}

export default function BlogPostPage({ post, ogImageUrl, ogUrl, description }: any) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const readTime = Math.ceil(
    post.sections.reduce((acc: number, section: any) => acc + section.content.length, 0) / 1000
  );

  // Use the ogUrl from props (server-side) for sharing
  const currentUrl = ogUrl;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lizard Interactive Online" />

        {/* ✅ Twitter Card - ALL required tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lizardinteractive" />
        <meta name="twitter:creator" content="@rondevsolutions" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={post.title} />

        <link rel="canonical" href={ogUrl} />
      </Head>

      <ScreenContainer>
        <div className="max-w-4xl mx-auto pt-28 pb-40 px-4 md:px-6">
          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-800 bg-zinc-900">
              <Image
                src={`/${post.image}`}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
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

            <div className="flex flex-wrap items-center justify-between gap-4">
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

              {/* Share Icons */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Share:</span>

                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={14} className="text-zinc-400 hover:text-[#1DA1F2]" />
                </a>

                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={14} className="text-zinc-400 hover:text-[#1877F2]" />
                </a>

                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={14} className="text-zinc-400 hover:text-[#0A66C2]" />
                </a>

                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors"
                  aria-label="Copy link"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Link2 size={14} className="text-zinc-400 hover:text-white" />}
                </button>
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