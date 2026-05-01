import { Slide } from "@/types/slides";
import {
  Blocks,
  Code2,
  Cpu,
  Gauge,
  Globe,
  Globe2,
  Info,
  Layout,
  MousePointer2,
  Palette,
  Rocket,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";


export const SLIDES: Slide[] = [
  {
    id: "INTRO",
    title: "Web Vitals 101",
    desc: "Google's essential metrics for site health. High scores equal better SEO and higher user retention.",
    icon: Info,
    color: "#ffffff",
    stats: "3 Core Metrics",
    impact: "Ranking Signal",
    tip: "User experience is now a quantifiable ranking factor.",
  },
  {
    id: "STACK",
    title: "The Holy Trinity",
    desc: "HTML for structure, CSS for style, and JavaScript for logic. The foundation of every modern website.",
    icon: Globe,
    color: "#3b82f6", // Blue
    stats: "HTML • CSS • JS",
    impact: "The Foundation",
    tip: "Optimization starts with clean, semantic code structure.",
  },
  {
    id: "LCP",
    title: "Largest Contentful Paint",
    desc: "Measures loading performance. It marks the point when the main content has likely loaded.",
    icon: Gauge,
    color: "#10b981", // Emerald
    stats: "< 2.5s",
    impact: "Loading Speed",
    tip: "Optimize images and prioritize your critical CSS path.",
  },
  {
    id: "INP",
    title: "Interaction to Next Paint",
    desc: "The new responsiveness standard. Measures the delay of every user interaction on the page.",
    icon: MousePointer2,
    color: "#06b6d4", // Cyan
    stats: "< 200ms",
    impact: "Responsiveness",
    tip: "Yield to the main thread to keep animations smooth.",
  },
  {
    id: "CLS",
    title: "Cumulative Layout Shift",
    desc: "Measures visual stability. Prevents elements from jumping around while the page is loading.",
    icon: Layout,
    color: "#CEFF00", // Lime
    stats: "< 0.1",
    impact: "Visual Stability",
    tip: "Reserve space for images and ads with aspect-ratio boxes.",
  },
  {
    id: "OPTIMIZE",
    title: "Performance Boost",
    desc: "Small changes lead to big wins. Minifying assets and using CDNs can double your conversion rates.",
    icon: Rocket,
    color: "#f59e0b", // Amber
    stats: "90+ Score",
    impact: "Conversions",
    tip: "Check PageSpeed Insights for your real-world field data.",
  },
];

export const STACK_SLIDES: Slide[] = [
  {
    id: "PERFORMANCE_ENGINEERING",
    title: "Performance Engineering",
    desc: "I don't just build websites; I engineer high-conversion web applications designed for maximum speed and absolute reliability.",
    icon: Cpu,
    color: "#10b981", // Emerald
    stats: "Consulting & Build",
    impact: "Higher Conversions",
    tip: "A 1-second delay in mobile load times can drop conversion rates by up to 20%.",
  },
  {
    id: "NEXTJS_ARCHITECTURE",
    title: "Next.js Architecture",
    desc: "Leveraging the industry-leading React framework for Server-Side Rendering (SSR) to deliver incredibly fast initial page loads.",
    icon: Blocks,
    color: "#ffffff", // Next.js White
    stats: "React Framework",
    impact: "Instant Load Times",
    tip: "Next.js pre-renders pages, meaning your customers never stare at a blank loading screen.",
  },
  {
    id: "TYPESCRIPT_RELIABILITY",
    title: "TypeScript Reliability",
    desc: "Every project is written in strict TypeScript. This eliminates runtime errors, prevents crashes, and ensures enterprise-grade stability.",
    icon: Code2,
    color: "#3178c6", // TS Blue
    stats: "Type Safety",
    impact: "Zero Crashes",
    tip: "Strongly typed code means a flawless user experience and significantly cheaper long-term maintenance.",
  },
  {
    id: "TAILWIND_STYLING",
    title: "Zero-Bloat Styling",
    desc: "Using utility-first CSS to create pixel-perfect, highly responsive designs without loading massive, slow stylesheets.",
    icon: Palette,
    color: "#0ea5e9", // Tailwind Cyan
    stats: "Micro-CSS",
    impact: "Fluid UX",
    tip: "Shipping less CSS is the secret to passing Google's Interaction to Next Paint (INP) metric.",
  },
  {
    id: "GLOBAL_EDGE",
    title: "Global Edge Network",
    desc: "Deployed seamlessly via Vercel's global network. Your business application is served to users anywhere in the world in milliseconds.",
    icon: Globe2,
    color: "#a1a1aa", // Vercel Zinc
    stats: "CDN & Edge",
    impact: "99.99% Uptime",
    tip: "Edge routing ensures your site stays online and lightning-fast even during massive traffic spikes.",
  },
  {
    id: "LIGHTHOUSE_100",
    title: "Guaranteed 100/100",
    desc: "Every build is rigorously audited to achieve perfect Google Lighthouse scores across Performance, SEO, and Best Practices.",
    icon: Zap,
    color: "#22c55e", // Lighthouse Green
    stats: "Core Web Vitals",
    impact: "Top Search Rankings",
    tip: "A perfect 100/100 score signals to Google that your site should rank above slower competitors.",
  },
];
