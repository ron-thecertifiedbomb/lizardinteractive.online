import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { specialLogs } from '../../data/blogContent';
import { HardwareLayout } from "../../components/blog/HardwareLayout/HardwareLayout";
import { ProductionLayout } from "../../components/blog/ProductionLayout/ProductionLayout";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { getFullOgImage } from '../../lib/ogImageHelper';

export default function BlogPostDetail({ post }: { post: any }) {
  if (!post) return <div className="min-h-screen flex items-center justify-center font-mono text-zinc-800 uppercase tracking-widest">[ 404_NULL: transmission_lost ]</div>;

  const siteUrl = "https://lizardinteractive.online";
  const fullOgImage = getFullOgImage(post.ogImage, siteUrl);

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

                {/* Dito papasok yung Core Vital Targets at Execution Stack (Protocols) */}
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
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Lizard Interactive`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:url" content={`${siteUrl}/blogs/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={fullOgImage} />
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

            <div className="mt-40 pt-20 border-t border-zinc-900 text-center">
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