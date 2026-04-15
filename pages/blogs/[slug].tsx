import { useRouter } from "next/router";
import ErrorPage from "next/error";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import Head from "next/head";
import { motion } from "framer-motion";
import { Activity, Clock, ChevronLeft, Zap } from "lucide-react";
import Link from "next/link";

// DATA & COMPONENTS
import { laptopArticle2026, aiFutureArticle2026 } from "../../data/blogContent";
import GearCard from "../../components/shared/GearCard/GearCard";
import BioDigitalShift from "../../components/BioDigitalShift/BioDigitalShift";


type BlogPost = {
  _id: string;
  title: string;
  image?: string;
  content: string;
  createdAt: string;
};

export default function PostPage({
  blog,
  isLaptopGuide = false,
  isAIPhilosophy = false
}: {
  blog?: BlogPost;
  isLaptopGuide?: boolean;
  isAIPhilosophy?: boolean;
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

  if (!blog && !isLaptopGuide && !isAIPhilosophy) return <ErrorPage statusCode={404} />;

  // --- HARDENED SOURCE OF TRUTH ---
  // Using the exact production domain prevents WWW/Non-WWW and Trailing Slash loops.
  const SITE_URL = "https://lizardinteractive.online";

  const slug = isLaptopGuide
    ? "best-laptops-2026"
    : isAIPhilosophy
      ? "bio-digital-synthesis"
      : blog?._id;

  const pageUrl = `${SITE_URL}/blogs/${slug}`;

  const title = isLaptopGuide
    ? laptopArticle2026.header.title
    : isAIPhilosophy
      ? aiFutureArticle2026.header.title
      : blog?.title;

  const description = isLaptopGuide
    ? "Audit the 2026 hardware lineup for high-performance dev and music work."
    : isAIPhilosophy
      ? aiFutureArticle2026.hooks.intro
      : blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 160);

  const imagePath = isLaptopGuide
    ? "/gear/og-hardware-2026.jpg"
    : isAIPhilosophy
      ? "/blog/ai-future-2026.jpg"
      : (blog?.image || "/lizardinteractive.png");

  const ogImage = imagePath.startsWith('http') ? imagePath : `${SITE_URL}${imagePath}`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      <Head>
        <title>{`${title} | Lizard Interactive`}</title>
        <meta name="description" content={description} />

        {/* The Scraper Shield: Static Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${title} | Lizard Interactive`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Lizard Interactive`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* This is the final loop-breaker */}
        <link rel="canonical" href={pageUrl} />
      </Head>

      <ScreenContainer variant="dark">
        <div className="max-w-5xl mx-auto pt-24 pb-40 px-6 font-sans">
          <Link href="/blogs" className="group inline-flex items-center gap-2 text-zinc-600 hover:text-emerald-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-12 transition-colors">
            <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back_to_Logs
          </Link>

          {isAIPhilosophy ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <BioDigitalShift />
            </motion.div>
          ) : isLaptopGuide ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
              <header className="mb-20 border-b border-zinc-900 pb-12">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">[ HARDWARE_AUDIT ]</span>
                  <div className="h-[1px] flex-1 bg-zinc-900" />
                </div>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{title}</h1>
              </header>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-400 text-lg md:text-xl uppercase tracking-widest leading-relaxed border-l-2 border-emerald-500 pl-8 font-bold">
                  {laptopArticle2026.hooks.intro}
                </p>
              </div>

              <div className="grid gap-12">
                {laptopArticle2026.recommendations?.map((laptop) => (
                  <GearCard key={laptop.id} item={laptop} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <header className="mb-20 border-b border-zinc-900 pb-12">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{title}</h1>
              </header>
              <div
                className="prose prose-invert prose-emerald max-w-none text-zinc-300 leading-relaxed font-sans font-light"
                dangerouslySetInnerHTML={{ __html: safeHTML }}
              />
            </motion.article>
          )}
        </div>
      </ScreenContainer>
    </div>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  if (params.slug === "best-laptops-2026") {
    return { props: { isLaptopGuide: true, isAIPhilosophy: false }, revalidate: 60 };
  }

  if (params.slug === "bio-digital-synthesis") {
    return { props: { isAIPhilosophy: true, isLaptopGuide: false }, revalidate: 60 };
  }

  const url = process.env.GET_ALL_BLOGS_URL;
  try {
    const res = await fetch(`${url}/${params.slug}`);
    if (!res.ok) return { notFound: true };
    const blog = await res.json();
    return { props: { blog, isLaptopGuide: false, isAIPhilosophy: false }, revalidate: 10 };
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
    paths.push({ params: { slug: "bio-digital-synthesis" } });

    return { paths, fallback: 'blocking' };
  } catch (error) {
    return {
      paths: [
        { params: { slug: "best-laptops-2026" } },
        { params: { slug: "bio-digital-synthesis" } }
      ],
      fallback: 'blocking'
    };
  }
}