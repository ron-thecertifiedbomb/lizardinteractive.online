// pages/casestudy/[slug].tsx
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeft, User, Zap, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { SocialShare } from "@/components/SocialShare/SocialShare";


import { CaseStudyPresentation } from "@/components/CaseStudyPresentation/CaseStudyPresentation";
import { caseStudies, CaseStudy } from "@/data/lists/CaseStudiesData";

// ─── Static Generation ────────────────────────────────────────────────────────

export async function getStaticPaths() {
    return {
        paths: caseStudies.map((s) => ({ params: { slug: s.slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const study = caseStudies.find((s) => s.slug === params.slug);
    if (!study) return { notFound: true };

    const siteUrl = "https://lizardinteractive.online";
    return {
        props: {
            study,
            ogImageUrl: `${siteUrl}${study.imageUrl}`,
            ogUrl: `${siteUrl}/casestudy/${study.slug}`,
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudyContentPage({
    study,
    ogImageUrl,
    ogUrl,
}: {
    study: CaseStudy;
    ogImageUrl: string;
    ogUrl: string;
}) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div className="min-h-screen flex items-center justify-center text-emerald-500 font-mono text-xs tracking-widest">
                LOADING SYSTEM DATA...
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{study.title} | Case Study</title>
                <meta name="description" content={study.meta.description} />
                <meta property="og:title" content={study.title} />
                <meta property="og:description" content={study.meta.description} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Lizard Interactive Online" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={study.title} />
                <meta name="twitter:description" content={study.meta.description} />
                <meta name="twitter:image" content={ogImageUrl} />
                <link rel="canonical" href={ogUrl} />
            </Head>

            <ScreenContainer>
                <article className="max-w-5xl mx-auto px-4 md:px-6 pt-8 pb-24 md:pb-40">

                    {/* ── Back nav ── */}
                    <Link
                        href="/casestudies"
                        className="inline-flex items-center gap-2 text-zinc-600 hover:text-emerald-400 font-mono text-xs uppercase tracking-widest mb-12 transition-colors group"
                    >
                        <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Back to Database
                    </Link>

                    {/* ══════════════════════════════════════════════════════
                        HERO
                    ══════════════════════════════════════════════════════ */}
                    <header className="mb-16 space-y-8">

                        {/* Category + meta row */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                                {study.category}
                            </span>
                            <span className="text-zinc-700 font-mono text-xs">·</span>
                            <span className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                                <User className="w-3.5 h-3.5" />
                                <span className="text-emerald-500/80">Ronan R. Sibunga</span>
                            </span>
                            <span className="text-zinc-700 font-mono text-xs">·</span>
                            <span className="text-zinc-500 font-mono text-xs">
                                Client: <span className="text-zinc-300">{study.client}</span>
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
                            {study.title}
                        </h1>

                        {/* Hook — narrative opener */}
                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl border-l-2 border-emerald-500/40 pl-5">
                            {study.narrative.hook}
                        </p>

                        {/* Stats strip + share */}
                        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-zinc-800/60">
                            <div className="flex flex-wrap gap-2">
                                {study.stats.map((s) => (
                                    <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg">
                                        <span className="text-emerald-400 font-black font-mono text-sm">{s.value}</span>
                                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-wide">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                            <SocialShare
                                url={ogUrl}
                                title={study.title}
                                onShare={(p) => console.log(`Shared on ${p}`)}
                                size="md"
                            />
                        </div>
                    </header>

                    {/* ── Featured image ── */}
                    {/* {study.imageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.06)] group">
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-emerald-500/8 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                            <Image
                                src={study.imageUrl}
                                alt={study.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 960px"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                priority
                            />
                        </div>
                    )} */}

                    {/* ══════════════════════════════════════════════════════
                        PRESENTATION SLIDER
                    ══════════════════════════════════════════════════════ */}
                    <Section
                        eyebrow="Project Background"
                        icon={<Zap className="w-4 h-4 text-emerald-400" />}
                        accentColor="emerald"
                    >
                        <CaseStudyPresentation />
                    </Section>

                    {/* ══════════════════════════════════════════════════════
                        PAIN POINTS
                    ══════════════════════════════════════════════════════ */}
                    <Section
                        eyebrow="The Problem"
                        icon={<AlertTriangle className="w-4 h-4 text-rose-400" />}
                        accentColor="rose"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {study.painPoints.map((p, i) => (
                                <div
                                    key={i}
                                    className="relative p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden hover:border-rose-500/30 transition-colors duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rose-500/60 to-transparent" />
                                    <span className="font-mono text-rose-500/40 text-xs mb-3 block">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h4 className="text-white font-bold text-sm mb-2">{p.title}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Challenge narrative */}
                        <div className="mt-6 p-6 rounded-xl bg-zinc-900/30 border border-zinc-800">
                            <p className="text-zinc-300 text-lg leading-relaxed">{study.narrative.challenge}</p>
                        </div>
                    </Section>

               

                    {/* ══════════════════════════════════════════════════════
                        SOLUTION + COMMUNITY DETAILS
                    ══════════════════════════════════════════════════════ */}
                    <Section
                        eyebrow="The Solution"
                        icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        accentColor="emerald"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-8 space-y-6">
                                <p className="text-zinc-300 text-lg leading-relaxed">{study.narrative.solution}</p>

                                {/* Outcome callout */}
                                <div className="relative p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/80 to-transparent" />
                                    <p className="text-xs font-mono text-emerald-400/60 uppercase tracking-widest mb-2">Outcome</p>
                                    <p className="text-emerald-300 font-semibold text-lg leading-snug">{study.narrative.outcome}</p>
                                </div>
                            </div>

                            {/* Community / context panel — optional */}
                            {study.communityDetails && study.communityDetails.length > 0 && (
                                <div className="md:col-span-4">
                                    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
                                        <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest">Context</p>
                                        {study.communityDetails.map((d) => (
                                            <div key={d.label} className="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-3 last:border-0 last:pb-0">
                                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-wide">{d.label}</span>
                                                <span className="text-zinc-200 text-sm font-medium">{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Section>

                    {/* ══════════════════════════════════════════════════════
                        TIMELINE
                    ══════════════════════════════════════════════════════ */}
                    <Section
                        eyebrow="Timeline"
                        icon={<Clock className="w-4 h-4 text-zinc-400" />}
                        accentColor="zinc"
                    >
                        <div className="relative">
                            {/* Vertical rule */}
                            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-zinc-800 hidden sm:block" />

                            <div className="space-y-0">
                                {study.timeline.map((event, i) => (
                                    <div key={i} className="relative flex gap-6 sm:gap-0 group">
                                        {/* Date */}
                                        <div className="sm:w-36 shrink-0 pt-5 sm:text-right sm:pr-8">
                                            <span className="font-mono text-xs text-zinc-600 group-hover:text-emerald-500/70 transition-colors">
                                                {event.date}
                                            </span>
                                        </div>

                                        {/* Node */}
                                        <div className="hidden sm:flex items-start pt-[1.35rem] shrink-0 relative z-10">
                                            <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-700 bg-zinc-950 group-hover:border-emerald-500 transition-colors duration-300" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8 sm:pl-8 border-b border-zinc-800/40 last:border-0">
                                            <p className="text-emerald-400/80 font-mono text-xs uppercase tracking-widest mb-1 pt-5">
                                                {event.phase}
                                            </p>
                                            <p className="text-zinc-300 leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    {/* ══════════════════════════════════════════════════════
                        BENEFITS
                    ══════════════════════════════════════════════════════ */}
                    <Section
                        eyebrow="Impact & Benefits"
                        icon={<Zap className="w-4 h-4 text-emerald-400" />}
                        accentColor="emerald"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {study.benefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="relative p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-emerald-500/30 transition-colors duration-300 flex flex-col gap-3"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/60 to-transparent" />
                                    {b.stat && (
                                        <span className="font-black font-mono text-2xl text-emerald-400 leading-none">
                                            {b.stat}
                                        </span>
                                    )}
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{b.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{b.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* ══════════════════════════════════════════════════════
                        TECH STACK
                    ══════════════════════════════════════════════════════ */}
                    <div className="mt-16 pt-10 border-t border-zinc-800">
                        <p className="font-mono text-zinc-600 text-xs uppercase tracking-widest mb-5">Architecture & Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {study.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 bg-zinc-900 text-zinc-300 text-xs rounded-md border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </article>
            </ScreenContainer>
        </>
    );
}

// ─── Reusable section wrapper ─────────────────────────────────────────────────

function Section({
    eyebrow,
    icon,
    accentColor,
    children,
}: {
    eyebrow: string;
    icon: React.ReactNode;
    accentColor: "emerald" | "rose" | "zinc";
    children: React.ReactNode;
}) {
    const lineColor =
        accentColor === "emerald"
            ? "bg-emerald-500"
            : accentColor === "rose"
                ? "bg-rose-500"
                : "bg-zinc-600";

    return (
        <section className="mt-16 pt-10 border-t border-zinc-800/60">
            <div className="flex items-center gap-3 mb-8">
                <span className={`w-6 h-[2px] ${lineColor}`} />
                {icon}
                <p className="font-mono text-zinc-400 text-xs uppercase tracking-widest">{eyebrow}</p>
            </div>
            {children}
        </section>
    );
}