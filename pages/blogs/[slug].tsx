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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // Next.js will server-render on the first request and then cache it
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {

  const uri = process.env.MONGODB_URI;

  console.log(`🖥️ API Endpoint (SSG/ISR): Fetching data for slug "${params.slug}"`);

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
    // Use the actual blog image for sharing
    let imageSource = post.ogImage || post.image || "";

    // Ensure social platforms get a compatible format by replacing .webp with .jpg
    imageSource = imageSource.replace(/\.webp(\?.*)?$/i, '.jpg$1');

    const rawOgImageUrl = imageSource
      ? (imageSource.startsWith("http") ? imageSource : `${siteUrl}${imageSource.startsWith("/") ? "" : "/"}${imageSource}`)
      : `${siteUrl}/default-og.png`; // Fallback image
    const ogImageUrl = encodeURI(rawOgImageUrl);
    const ogUrl = `${siteUrl}/blogs/${post.id}`;
    const description = post.sections?.[0]?.content?.substring(0, 160) || "";

    return {
      props: { post, ogImageUrl, ogUrl, description },
      revalidate: 3600, // Revalidate background cache every 1 hour (in seconds)
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
        <meta property="og:image:secure_url" content={ogImageUrl} />
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

          {/* Header */}
          <header className="border-b border-zinc-900 pb-6 md:pb-8 mb-8 md:mb-12 space-y-4 md:space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 md:px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-xxs md:text-xs-plus font-black uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1.2] tracking-tighter text-white">
              {post.title}
            </h1>

            {/* Meta Info - Stack on mobile, row on desktop */}
            <div className="flex width-full  flex-col items-center justify-between gap-4">
              <div className="flex justify-between w-full items-center gap-1 sm:gap-2 md:gap-4 text-[8px] sm:text-[10px] md:text-xs-plus font-mono text-zinc-500">
                <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Calendar className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-3 md:h-3" />
                    <span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : "Date unavailable"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <Clock className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-3 md:h-3" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <User className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-3 md:h-3" />
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


          </header>

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

          <BlogContent article={post} />
        </div>
      </ScreenContainer>
    </>
  );
}