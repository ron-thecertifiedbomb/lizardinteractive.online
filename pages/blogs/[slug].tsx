import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { specialLogs } from '../../data/blogContent';
import { HardwareLayout } from "../../components/blog/HardwareLayout/HardwareLayout";
import { ProductionLayout } from "../../components/blog/ProductionLayout/ProductionLayout";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';

export default function BlogPostDetail({ post }: { post: any }) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!post) return <div className="min-h-screen flex items-center justify-center font-mono text-zinc-800 uppercase tracking-widest">[ 404_NULL: transmission_lost ]</div>;

  const siteUrl = "https://lizardinteractive.online";
  // Build the full OG image URL from the post's ogImage path
  const fullOgImage = `${siteUrl}/${post.ogImage}`;
  // Add trailing slash for canonical URL
  const currentUrl = `${siteUrl}/blogs/${post.slug}/`;

  // Social Share Handlers
  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(`${post.title} | Lizard Interactive`);

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        return;
    }
    if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const renderLayout = () => {
    switch (post.layoutType) {
      case 'PRODUCTION':
        return <ProductionLayout content={post.content} />;
      case 'HARDWARE':
        return <HardwareLayout content={post.content} />;
      case 'TECHNICAL':
        return (
          <div className="space-y-20">
            {/* --- 1. PERFORMANCE SCREENSHOT (Lighthouse Proof) --- */}
            <div className="relative group overflow-hidden border border-zinc-900 bg-zinc-900/20 p-4 md:p-8">
              <div className="flex items-center justify-between mb-4 font-mono text-[9px] text-emerald-500 uppercase tracking-widest">
                <span>[ core_vitals_report ]</span>
                <span className="animate-pulse">Live_Feed</span>
              </div>
              <img
                src={post.ogImage}
                alt="Performance Audit Screenshot"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 border border-zinc-800"
              />
            </div>

            {/* --- 2. DYNAMIC CONTENT BLOCKS --- */}
            {post.content.contentBlocks?.map((block: any) => (
              <div key={block.id} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-emerald-500/30" />
                  <h3 className="text-xl font-black uppercase tracking-tighter text-emerald-400">
                    {block.title}
                  </h3>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-light italic">
                  {block.text}
                </p>

                {block.protocols && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {block.protocols.map((p: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 border border-zinc-900 bg-zinc-900/10 p-4 hover:border-emerald-500/50 transition-colors group/item">
                        <span className="text-emerald-500 font-mono text-[10px]">0{i + 1}</span>
                        <span className="text-zinc-300 uppercase tracking-widest text-[10px] font-bold leading-tight group-hover/item:text-white transition-colors">{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <ProductionLayout content={post.content} />;
    }
  };

  return (
    <>
      <Head>
        <title>{post.title} | Lizard Interactive</title>
        <meta name="description" content={post.description} />

        {/* Open Graph / Facebook / Twitter (Twitter falls back to og:image) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Lizard Interactive`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Lizard Interactive" />

        {/* Twitter Card - tells Twitter to use large image */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Canonical URL with trailing slash */}
        <link rel="canonical" href={currentUrl} />
      </Head>

      <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
        <ScreenContainer variant="dark" maxWidth="xl">
          <div className="max-w-4xl mx-auto pt-32 pb-40 px-6">
            <div className="border-b border-zinc-900 pb-12 mb-20">
              <div className="flex items-center gap-2 mb-6 text-emerald-500 font-mono text-[10px] tracking-widest uppercase">
                <span className="w-2 h-2 bg-emerald-500 animate-pulse" /> {post.content.header.label}
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                {post.content.header.title}
              </h1>
              <p className="text-zinc-500 border-l-2 border-emerald-500 pl-6 uppercase tracking-widest text-xs md:text-sm font-medium leading-relaxed italic">
                {post.content.hooks.intro}
              </p>
            </div>

            <div className="relative z-10">
              {renderLayout()}
            </div>

            {/* --- SOCIAL SHARE SECTION --- */}
            <div className="mt-20 pt-10 border-t border-zinc-900">
              <div className="flex flex-col items-center gap-6">
                <div className="text-emerald-500 font-mono text-[9px] tracking-[0.3em] uppercase">
                  spread_the_signal
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-3 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 rounded-full group"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-3 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 rounded-full group"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-3 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 rounded-full group"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </button>

                  <button
                    onClick={() => handleShare("copy")}
                    className="p-3 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 rounded-full group relative"
                    aria-label="Copy link"
                  >
                    <Link2 size={18} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                    {copySuccess && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[9px] font-mono px-2 py-1 whitespace-nowrap rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-zinc-600 text-[9px] font-mono tracking-wider">
                  Share this transmission
                </p>
              </div>
            </div>

            <div className="mt-20 pt-20 border-t border-zinc-900 text-center">
              <p className="font-mono text-[10px] text-zinc-700 tracking-[0.5em] uppercase mb-4">
                {post.content.hooks.conclusion}
              </p>
              <div className="text-zinc-900 font-mono text-[8px] uppercase tracking-widest">
                Verified by Lizard Interactive // Node_2026
              </div>
            </div>
          </div>
        </ScreenContainer>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(specialLogs).map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = specialLogs[params?.slug as string] || null;
  return { props: { post } };
};