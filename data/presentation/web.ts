import {
  Code2,
  Palette,
  Terminal,
  Blocks,
  Cpu,
  Globe2,
  Layers,
  Zap,
  Box,
} from "lucide-react";

export const STACK_SLIDES = [
  {
    id: "STACK_OVERVIEW",
    title: "The Web Engine",
    desc: "Every website is a combination of Structure, Design, and Logic. Together, they create the Modern Web.",
    icon: Globe2,
    color: "#ffffff",
    stats: "3 Pillars",
    impact: "Universal Standard",
    tip: "Mastering these three is the foundation of all Frontend development.",
  },
  {
    id: "HTML_DEEP",
    title: "HTML: The Bones",
    desc: "HyperText Markup Language. It provides the semantic structure and meaning to your content.",
    icon: Code2,
    color: "#e34c26", // HTML Orange
    stats: "Structure",
    impact: "SEO & Accessibility",
    tip: "Use semantic tags like <main> and <article> for better SEO scores.",
  },
  {
    id: "CSS_DEEP",
    title: "CSS: The Skin",
    desc: "Cascading Style Sheets. Responsible for the visual story—layout, colors, fonts, and responsiveness.",
    icon: Palette,
    color: "#264de4", // CSS Blue
    stats: "Presentation",
    impact: "User Engagement",
    tip: "Modern CSS like Grid and Flexbox makes complex layouts easy.",
  },
  {
    id: "JS_DEEP",
    title: "JS: The Brain",
    desc: "JavaScript. The engine of interactivity. It handles data, animations, and user behavior.",
    icon: Terminal,
    color: "#f7df1e", // JS Yellow
    stats: "Logic",
    impact: "Functionality",
    tip: "Keep JS bundles small to maintain high Interaction to Next Paint (INP) scores.",
  },
  {
    id: "DOM_EXPLAINED",
    title: "The DOM Tree",
    desc: "The Document Object Model connects your code to the browser, allowing JS to update the UI in real-time.",
    icon: Layers,
    color: "#06b6d4", // Cyan
    stats: "Live Connection",
    impact: "Dynamic UI",
    tip: "Minimal DOM manipulation leads to smoother 60fps animations.",
  },
  {
    id: "WORKFLOW",
    title: "Better Together",
    desc: "When HTML is lean, CSS is optimized, and JS is efficient, you get a 100/100 Lighthouse score.",
    icon: Zap,
    color: "#10b981", // Emerald
    stats: "Fast & Fluid",
    impact: "Performance",
    tip: "The best websites balance these three to pass all Core Web Vitals.",
  },
];


export const PERFORMANCE_SLIDES = [
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