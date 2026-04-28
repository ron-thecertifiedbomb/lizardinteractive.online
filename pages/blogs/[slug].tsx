// pages/blogs/[slug].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import BlogContent from '@/components/BlogContent/BlogContent';
import { Calendar, Clock, Twitter, Facebook, Linkedin, Link2, Check, User } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';
import { SocialShare } from '@/components/SocialShare/SocialShare';
import { MongoClient } from "mongodb";

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const uri = process.env.MONGODB_URI;

  console.log(`🖥️ API Endpoint (SSR): Fetching data for slug "${params.slug}"`);

  if (!uri) {
    console.error("❌ MONGODB_URI is missing in environment variables");
    return { notFound: true };
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("lizrd_core");
    const collection = db.collection("articles");

    const article = await collection.findOne({ id: params.slug });

    if (!article) {
      return { notFound: true };
    }

    // Serialize _id because Next.js cannot serialize MongoDB ObjectIds directly
    const { _id, ...postRest } = article as any;
    const post: any = { ...postRest, _id: _id.toString() };

    const siteUrl = "https://lizardinteractive.online";
    // Point og:image to the dynamic OG image generator for consistent branding across all platforms.
    const ogImageUrl = `${siteUrl}/api/og/${post.id}`;
    const ogUrl = `${siteUrl}/blogs/${post.id}`;
    const description = post.sections?.[0]?.content?.substring(0, 160) || "";

    return {
      props: { post, ogImageUrl, ogUrl, description },
    };
  } catch (error) {
    console.error("❌ Failed to fetch article:", error);
    return { notFound: true };
  } finally {
    await client.close();
  }
}

export default function BlogPostPage({ post, ogImageUrl, ogUrl, description }: any) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Check if we are rendering on the Server or Client
  const isServer = typeof window === 'undefined';
  if (isServer) {
    console.log(`🖥️ Server Render: Generating initial HTML for "${post.title}"`);
  } else {
    console.log(`🌐 Client Render: Component hydrated in the browser for "${post.title}"`);
  }

  const readTime = Math.ceil(
    post.sections.reduce((acc: number, section: any) => acc + section.content.length, 0) / 1000
  );

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

  const handleShare = (platform: string) => {
    // Analytics tracking example
    console.log(`Blog post "${post.title}" shared on ${platform}`);

    // You can add your analytics tracking here
    // Example: gtag('event', 'share', { platform, blog_title: post.title });
    // Example: plausible('Share', { props: { platform, blog: post.id } });
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

        {/* Twitter Card */}
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
        <div className="max-w-4xl mx-auto pt-2  pb-20 md:pb-40 px-4 md:px-6">
          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 border border-zinc-800 bg-zinc-900">
              <Image
                src={post.image.startsWith('http') || post.image.startsWith('/') ? post.image : `/${post.image}`}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover"
                priority
                loading="eager"
              />
            </div>
          )}

          {/* Header */}
          <header className="border-b border-zinc-900 pb-6 md:pb-8 mb-8 md:mb-12 space-y-4 md:space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 md:px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1.2] tracking-tighter text-white">
              {post.title}
            </h1>

            {/* Meta Info - Stack on mobile, row on desktop */}
            <div className="flex width-full  flex-col items-center justify-between gap-4">
              <div className="flex justify-between w-full items-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="w-3 h-3 md:w-3 md:h-3" />
                    <span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "Date unavailable"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="w-3 h-3 md:w-3 md:h-3" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={12} className="w-3 h-3 md:w-3 md:h-3" />
                  <span className="text-emerald-500">Ronan R. Sibunga</span>
                </div>
              </div>
              {/* Share Icons - Scrollable on mobile if needed */}
              <SocialShare
                url={ogUrl}
                title={post.title}
                onShare={handleShare}
                size="lg"
                showLabel={true}

              />
            </div>

            {/* Excerpt */}
            {/* {post.sections?.[0] && (
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed italic border-l-2 border-emerald-500 pl-4 md:pl-5">
                {post.sections[0].content}
              </p>
            )} */}
          </header>

          <BlogContent article={post} />
        </div>
      </ScreenContainer>
    </>
  );
}