// pages/casestudy/[slug].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { SocialShare } from '@/components/SocialShare/SocialShare';
import { caseStudies, CaseStudy } from '@/data/lists/caseStudies';


// 1. Generate paths from our local case studies array
export async function getStaticPaths() {
    const paths = caseStudies.map((study) => ({
        params: { slug: study.slug },
    }));

    return {
        paths,
        fallback: false, // 404 if slug doesn't exist in our array
    };
}

// 2. Fetch the specific case study data
export async function getStaticProps({ params }: { params: { slug: string } }) {
    const study = caseStudies.find((s) => s.slug === params.slug);

    if (!study) {
        return { notFound: true };
    }

    const siteUrl = "https://lizardinteractive.online";
    const ogImageUrl = `${siteUrl}${study.imageUrl}`;
    const ogUrl = `${siteUrl}/casestudy/${study.slug}`;
    const description = study.challenge.substring(0, 160);

    return {
        props: { study, ogImageUrl, ogUrl, description },
    };
}

export default function CaseStudyContentPage({
    study,
    ogImageUrl,
    ogUrl,
    description
}: {
    study: CaseStudy;
    ogImageUrl: string;
    ogUrl: string;
    description: string;
}) {
    const router = useRouter();

    if (router.isFallback) {
        return <div className="min-h-screen flex items-center justify-center text-emerald-500 font-mono">Loading System Data...</div>;
    }

    // Handlers for social share
    const handleShare = (platform: string) => {
        console.log(`Case Study "${study.title}" shared on ${platform}`);
    };

    return (
        <>
            <Head>
                <title>{study.title} | Case Study</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={study.title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Lizard Interactive Online" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={study.title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImageUrl} />
                <link rel="canonical" href={ogUrl} />
            </Head>

            <ScreenContainer>
                <div className="max-w-4xl mx-auto pt-8 pb-20 md:pb-40 px-4 md:px-6">

                    {/* Back Button */}
                    <Link href="/casestudies" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-8 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Database
                    </Link>

                    {/* Header Section */}
                    <header className="border-b border-zinc-800 pb-8 mb-10 space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                            {study.category}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
                            {study.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    <span className="text-emerald-500">Ronan R. Sibunga</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block"></div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-zinc-400">Client:</span>
                                    <span className="text-white">{study.client}</span>
                                </div>
                            </div>

                            <SocialShare
                                url={ogUrl}
                                title={study.title}
                                onShare={handleShare}
                                size="md"
                            />
                        </div>
                    </header>

                    {/* Featured Image */}
                    {study.imageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] group">
                            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <Image
                                src={study.imageUrl}
                                alt={study.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                        {/* Left Column: Challenge & Solution */}
                        <div className="md:col-span-8 space-y-10">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-emerald-500"></span>
                                    The Challenge
                                </h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    {study.challenge}
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-emerald-500"></span>
                                    The Solution
                                </h3>
                                <p className="text-zinc-300 text-lg leading-relaxed">
                                    {study.solution}
                                </p>
                            </section>
                        </div>

                        {/* Right Column: Stats & Tech Stack */}
                        <div className="md:col-span-4 space-y-8">

                            {/* Stats Panel */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                                <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">Performance Matrix</h4>
                                <div className="space-y-6">
                                    {study.stats.map((stat, i) => (
                                        <div key={i} className="flex flex-col">
                                            <span className="text-3xl font-black text-emerald-400">{stat.value}</span>
                                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack Panel */}
                            <div>
                                <h4 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">Architecture</h4>
                                <div className="flex flex-wrap gap-2">
                                    {study.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 bg-zinc-900 text-zinc-300 text-xs rounded-md border border-zinc-800"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </ScreenContainer>
        </>
    );
}