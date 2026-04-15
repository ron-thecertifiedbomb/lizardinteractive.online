import { useRouter } from "next/router";
import ErrorPage from "next/error";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import Head from "next/head";

import { motion } from "framer-motion";
import { Activity, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { laptopArticle2026 } from "../../data/blogContent";
import GearCard from "../../components/shared/GearCard/GearCard";

type BlogPost = {
  _id: string;
  title: string;
  image?: string;
  content: string;
  createdAt: string;
};

export default function PostPage({
  blog,
  isLaptopGuide
}: {
  blog?: BlogPost;
  isLaptopGuide?: boolean;
}) {
  const router = useRouter();

  // 1. Loading State (Lighthouse Optimized)
  if (router.isFallback) {
    return (
      <ScreenContainer variant="dark">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-emerald-500 font-mono animate-pulse uppercase tracking-[0.5em]">
            Initializing_System_Data...
          </p>
        </div>
      </ScreenContainer>
    );
  }

  // 2. Error State
  if (!blog && !isLaptopGuide) {
    return <ErrorPage statusCode={404} />;
  }

  // 3. Sanitization Logic for Regular Blogs
  const [safeHTML, setSafeHTML] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined" && blog?.content) {
      const DOMPurify = createDOMPurify(window);
      setSafeHTML(DOMPurify.sanitize(blog.content));
    }
  }, [blog?.content]);

  // 4. Metadata Configuration
  const title = isLaptopGuide ? laptopArticle2026.header.title : blog?.title;
  const description = isLaptopGuide ? laptopArticle2026.hooks.intro : blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 160);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        <title>{`${title} | Lizard Interactive`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Lizard Interactive`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={isLaptopGuide ? "/gear/macbook-m5.jpg" : blog?.image || "/default-og.jpg"} />
      </Head>

      <ScreenContainer variant="dark">
        <div className="max-w-5xl mx-auto pt-24 pb-40 px-6">

          {/* NAVIGATION HUD */}
          <Link href="/blog" className="group inline-flex items-center gap-2 text-zinc-600 hover:text-emerald-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-12 transition-colors">
            <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back_to_Logs
          </Link>

          {/* ARTICLE HEADER */}
          <header className="mb-20 border-b border-zinc-900 pb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">
                [ {isLaptopGuide ? "HARDWARE_AUDIT" : "SYSTEM_LOG"} ]
              </span>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>

            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-zinc-800" />
                {isLaptopGuide ? "2026.04.16" : blog && new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-emerald-500/50" />
                Signal: 200_OK
              </div>
            </div>
          </header>

          {/* CONTENT CORE */}
          {isLaptopGuide ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-20"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-400 text-lg md:text-xl uppercase tracking-widest leading-relaxed border-l-2 border-emerald-500 pl-8">
                  {laptopArticle2026.hooks.intro}
                </p>
              </div>

              {/* THE GEAR GRID (Safety Guarded) */}
              <div className="grid gap-12">
                {laptopArticle2026.recommendations?.map((laptop) => (
                  <GearCard key={laptop.id} item={laptop} />
                ))}
              </div>

              <footer className="mt-32 p-10 border border-zinc-900 bg-[#030303] text-center">
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] leading-relaxed">
                  {laptopArticle2026.hooks.conclusion}
                </p>
              </footer>
            </motion.div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert prose-emerald max-w-none 
                         text-zinc-300 text-base lg:text-lg font-light tracking-wide
                         dangerously-html-styles"
            >
              <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </motion.article>
          )}
        </div>
      </ScreenContainer>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // 1. Static Content Route
  if (params.slug === "best-laptops-2026") {
    return {
      props: { isLaptopGuide: true },
      revalidate: 60,
    };
  }

  // 2. API Content Route
  const url = process.env.GET_ALL_BLOGS_URL;
  try {
    const res = await fetch(`${url}/${params.slug}`);
    if (!res.ok) return { notFound: true };
    const blog: BlogPost = await res.json();
    return { props: { blog }, revalidate: 10 };
  } catch (error) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  const url = process.env.GET_ALL_BLOGS_URL;
  try {
    const res = await fetch(url!);
    const blogs: BlogPost[] = await res.json();

    const paths = blogs.map((b) => ({ params: { slug: b._id } }));

    // Inject the Affiliate Path
    paths.push({ params: { slug: "best-laptops-2026" } });

    return { paths, fallback: true };
  } catch (error) {
    // If API fails, at least build the affiliate path
    return { paths: [{ params: { slug: "best-laptops-2026" } }], fallback: true };
  }
}