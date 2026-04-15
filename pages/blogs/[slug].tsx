import { useRouter } from "next/router";
import ErrorPage from "next/error";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import Head from "next/head";
import { motion } from "framer-motion";
import { Activity, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

// DATA & COMPONENTS
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
  const [safeHTML, setSafeHTML] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && blog?.content) {
      const DOMPurify = createDOMPurify(window);
      setSafeHTML(DOMPurify.sanitize(blog.content));
    }
  }, [blog?.content]);

  if (router.isFallback) {
    return (
      <ScreenContainer variant="dark">
        <div className="min-h-screen flex items-center justify-center font-mono text-emerald-500 animate-pulse">
          INITIALIZING_SYSTEM_DATA...
        </div>
      </ScreenContainer>
    );
  }

  if (!blog && !isLaptopGuide) return <ErrorPage statusCode={404} />;

  // --- METADATA CONFIGURATION ---
  const SITE_URL = "https://www.lizardinteractive.online";
  const title = isLaptopGuide ? laptopArticle2026.header.title : blog?.title;
  const description = isLaptopGuide
    ? "Stop settling for latency. Audit the 2026 lineup for Next.js compilation and music production."
    : blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 160);

  // Determine the raw image path based on page type
  const rawImage = isLaptopGuide
    ? "/gear/og-hardware-2026.png"
    : blog?.image || "/lizardinteractive.png";

  // Ensure absolute URL for social media bots
  const ogImage = rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage}`;
  const pageUrl = `${SITE_URL}${router.asPath}`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        <title>{`${title} | Lizard Interactive`}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${title} | Lizard Interactive`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={`${title} | Lizard Interactive`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <ScreenContainer variant="dark">
        <div className="max-w-5xl mx-auto pt-24 pb-40 px-6">
          <Link href="/blogs" className="group inline-flex items-center gap-2 text-zinc-600 hover:text-emerald-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-12 transition-colors">
            <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back_to_Logs
          </Link>

          <header className="mb-20 border-b border-zinc-900 pb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">
                [ {isLaptopGuide ? "HARDWARE_AUDIT" : "SYSTEM_LOG"} ]
              </span>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{title}</h1>
            <div className="flex items-center gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2"><Clock size={12} />{isLaptopGuide ? "2026.04.16" : "RECENT_TRANS"}</div>
              <div className="flex items-center gap-2"><Activity size={12} className="text-emerald-500/50" />Signal: 200_OK</div>
            </div>
          </header>

          {isLaptopGuide ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-400 text-lg md:text-xl uppercase tracking-widest leading-relaxed border-l-2 border-emerald-500 pl-8">
                  {laptopArticle2026.hooks.intro}
                </p>
              </div>

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
              className="prose prose-invert prose-emerald max-w-none text-zinc-300"
              dangerouslySetInnerHTML={{ __html: safeHTML }}
            />
          )}
        </div>
      </ScreenContainer>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  if (params.slug === "best-laptops-2026") {
    return { props: { isLaptopGuide: true }, revalidate: 60 };
  }
  const url = process.env.GET_ALL_BLOGS_URL;
  try {
    const res = await fetch(`${url}/${params.slug}`);
    if (!res.ok) return { notFound: true };
    const blog = await res.json();
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
    paths.push({ params: { slug: "best-laptops-2026" } });

    return { paths, fallback: 'blocking' };
  } catch (error) {
    return { paths: [{ params: { slug: "best-laptops-2026" } }], fallback: 'blocking' };
  }
}