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
// import SystemSteps from "../../components/shared/SystemSteps/SystemSteps";

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

  // Dynamic Metadata logic
  const title = isLaptopGuide ? laptopArticle2026.header.title : blog?.title;
  const description = isLaptopGuide
    ? "Stop settling for latency. Audit the 2026 lineup for Next.js compilation and music production."
    : blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 160);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        {/* Fix: Single text node to avoid hydration warnings */}
        <title>{`${title} | Lizard Interactive`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Lizard Interactive`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={isLaptopGuide ? "https://www.lizardinteractive.online/gear/og-hardware-2026.jpg" : blog?.image || "/default-og.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
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

              {/* GEAR ENGINE */}
              <div className="grid gap-12">
                {laptopArticle2026.recommendations?.map((laptop) => (
                  <GearCard key={laptop.id} item={laptop} />
                ))}
              </div>

              {/* STEPS BROTHER: SYSTEM CALIBRATION */}
              <div className="pt-20 border-t border-zinc-900">
                <div className="flex items-center gap-4 mb-16">
                  <span className="text-emerald-500 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
                    [ 02_SYSTEM_CALIBRATION ]
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-900" />
                </div>
                {/* <SystemSteps steps={laptopArticle2026.setupSteps} /> */}
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
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [{ params: { slug: "best-laptops-2026" } }], fallback: true };
  }
}