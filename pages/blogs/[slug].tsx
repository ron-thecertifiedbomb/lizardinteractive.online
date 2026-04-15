import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { ChevronLeft, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

// REGISTRY & LAYOUTS
import { specialLogs } from "../../data/blogContent";
import HardwareLayout from "../../components/blog/BioDigitalShift/HardwareLayout/HardwareLayout";
import BioDigitalShift from "../../components/blog/BioDigitalShift/BioDigitalShift";

export default function PostPage({
  log,
  blog
}: {
  log?: any;
  blog?: any;
}) {
  const router = useRouter();
  const SITE_URL = "https://lizardinteractive.online";

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-emerald-500">
        INITIALIZING_TRANSMISSION...
      </div>
    );
  }

  // 1. Identify content (Local Registry has priority)
  const content = log || blog;
  if (!content) return <ErrorPage statusCode={404} />;

  const isSpecial = !!log;
  const title = content.title;

  // SEO Logic
  const description = isSpecial
    ? log.description
    : content.content?.replace(/<[^>]*>?/gm, '').slice(0, 160);

  const ogImage = isSpecial
    ? `${SITE_URL}${log.ogImage}`
    : (content.image || `${SITE_URL}/lizardinteractive.png`);

  const currentSlug = log?.slug || blog?._id;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        <title>{`${title} | Lizard Interactive`}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${SITE_URL}/blogs/${currentSlug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={`${SITE_URL}/blogs/${currentSlug}`} />
      </Head>

      <ScreenContainer variant="dark">
        <div className="max-w-5xl mx-auto pt-24 pb-40 px-6">
          <Link href="/blogs" className="group inline-flex items-center gap-2 text-zinc-600 hover:text-emerald-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-12 transition-colors">
            <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back_to_Logs
          </Link>

          {isSpecial ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {log.layoutType === "PHILOSOPHY" && <BioDigitalShift data={log.content} />}
              {log.layoutType === "HARDWARE" && <HardwareLayout data={log.content} />}
            </motion.div>
          ) : (
            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <header className="mb-20 border-b border-zinc-900 pb-12">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">[ SYSTEM_LOG ]</span>
                  <div className="h-[1px] flex-1 bg-zinc-900" />
                </div>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{title}</h1>
                <div className="flex items-center gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Clock size={12} /> {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '2026.04.16'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-emerald-500/50" /> Signal: 200_OK
                  </div>
                </div>
              </header>
              <div
                className="prose prose-invert max-w-none text-zinc-300 font-sans font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </motion.article>
          )}
        </div>
      </ScreenContainer>
    </div>
  );
}

export async function getStaticPaths() {
  // Use Object.keys if specialLogs is an Object, or just map if it's an Array
  // Assuming Object structure based on our previous Registry refactor:
  const slugs = Object.keys(specialLogs).map((key) => ({
    params: { slug: key }
  }));

  return { paths: slugs, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const log = specialLogs[slug] || null;

  // Try fetching from backend if not found in local specialLogs
  let blog = null;
  if (!log) {
    try {
      const res = await fetch(`${process.env.GET_ALL_BLOGS_URL}/${slug}`);
      if (res.ok) blog = await res.json();
    } catch (e) {
      console.error("Backend offline");
    }
  }

  if (!log && !blog) return { notFound: true };

  return {
    props: {
      log: log,
      blog: blog
    },
    revalidate: 60
  };
}