import {
  Zap,
  Terminal,
  Activity,
  Shield,
  Cpu,
  Mic2,
  MonitorPlay,
  Layers,
} from "lucide-react";

// --- 1. HARDWARE DATA OBJECT ---
export const laptopArticle2026 = {
  header: {
    title: "The 2026 Engine Room: Best Laptops for Creators & Engineers",
    intro:
      "In 2026, the line between engineer and creator has vanished. You need a machine that compiles Next.js code as fast as it renders 8K Premiere Pro frames.",
  },
  recommendations: [
    {
      id: "lp-m5-max",
      name: "MacBook Pro 14 (M5 Max)",
      brand: "Apple",
      category: "Hardware",
      description:
        "The ultimate zero-latency machine for 2026. Perfect for massive Next.js builds and 8K ProRes RAW workflows.",
      affiliateUrl: "https://amazon.com/your-affiliate-link-1",
      imageUrl: "/gear/macbook-m5.jpg",
      isFavorite: true,
      specs: {
        cpu: "18-Core M5 Max",
        ram: "64GB Unified",
        bestFor: "Production & Dev",
      },
    },
    {
      id: "lp-g16-2026",
      name: "ROG Zephyrus G16 (2026)",
      brand: "ASUS",
      category: "Hardware",
      description:
        "The Windows powerhouse. Features the RTX 5090 for After Effects motion design and rapid technical compilation.",
      affiliateUrl: "https://amazon.com/your-affiliate-link-2",
      imageUrl: "/gear/zephyrus-g16.jpg",
      isFavorite: false,
      specs: {
        cpu: "Intel Core Ultra 9",
        ram: "64GB DDR5",
        bestFor: "Engineering & 3D",
      },
    },
  ],
  hooks: {
    intro:
      "Stop settling for thermal throttling. We audited the 2026 lineup to find the only three machines capable of 100/100 performance.",
    conclusion:
      "Your hardware is your infrastructure. Choose the engine that keeps your system at 200 OK.",
  },
};

// --- 2. PHILOSOPHY DATA OBJECT ---
export const aiFutureArticle2026 = {
  header: {
    title: "The Bio-Digital Synthesis: Why the Future of AI is Human",
    label: "BioDigital_Synthesis_v1.0",
    priority: "Priority_02 // System_Philosophy",
  },
  hooks: {
    intro:
      "Architecture over Syntax // Intent over Generation. A deep dive into the symbiotic shift of 2026.",
  },
  contentBlocks: [
    {
      id: "01",
      type: "standard",
      icon: "cpu",
      title: "AI as a Background Utility",
      text: "In 2026, AI has become the 'electricity' powering our modern systems.",
      quote:
        "We are moving from an era of manual execution to an era of architectural intent.",
    },
    {
      id: "03",
      type: "protocol",
      icon: "shield",
      title: "Software: Syntax to Systems",
      text: "AI has turned code into a commodity. It is the birth of the System Architect.",
      protocols: [
        "AI builds the bricks; Humans design the skyscraper.",
        "Performance is a baseline, not a goal.",
        "Intent is the only non-generative asset left.",
      ],
    },
  ],
};

// --- 3. PRODUCTION DATA OBJECT ---
export const rifferMasteringArticle2026 = {
  header: {
    title: "Mastering Modern Metal: The 100 BPM Industrial Workflow",
    label: "Emerald_Glow_v1.0",
    priority: "Priority_01 // Production_Protocol",
  },
  hooks: {
    intro:
      "How I achieved the 'Emerald Glow' tone for Remorseful Soul using NAM and precise mastering techniques.",
    conclusion:
      "Keep your system at 200 OK and your riffs high-gain. The 1k stream goal is just the beginning.",
  },
  contentBlocks: [
    {
      id: "02",
      type: "standard",
      icon: "zap",
      title: "Neural Amp Modeling (NAM)",
      text: "NAM captures the actual 'soul' of the vacuum tube. For Remorseful Soul, I utilized a custom capture that prioritizes harmonic richness.",
    },
    {
      id: "03",
      type: "protocol",
      icon: "shield",
      title: "The Mastering Protocol",
      text: "Loudness is easy; clarity is the challenge. Spotify-ready levels without killing the transient response.",
      protocols: [
        "Gain Staging: Maintain -18dBFS pre-processing.",
        "LUFS Target: Aim for -11 to -14 for streaming stability.",
        "Precision Limiting: 4x oversampling to prevent inter-sample peaks.",
      ],
    },
  ],
};

// --- 4. SOFTWARE OPTIMIZATION DATA OBJECT (New Service Pillar) ---
export const softwareOptimizationArticle2026 = {
  header: {
    title: "The Architecture of Speed: 100/100 Lighthouse Optimization",
    label: "Performance_Audit_v1.0",
    priority: "CRITICAL_PATH // Optimization_Service",
  },
  hooks: {
    intro:
      "Engineering sub-second latency and elite-tier performance for Next.js systems.",
    conclusion:
      "Efficiency is not an accident; it's a standard. Reach out for a full system performance audit.",
  },
  contentBlocks: [
    {
      id: "01",
      type: "standard",
      icon: "activity",
      title: "The Zero-Bloat Mandate",
      text: "Every kilobyte counts. By implementing strict code-splitting and asset compression, we ensure the main thread stays clear for user interaction.",
    },
    {
      id: "02",
      type: "protocol",
      icon: "terminal",
      title: "Technical Execution",
      text: "The roadmap to a 99+ performance score involves more than just minification.",
      protocols: [
        "Image Optimization: Multi-format WebP serving via next/image.",
        "Font Loading: Zero-layout shift strategy using local font descriptors.",
        "Edge Deployment: Global latency reduction via Vercel Edge Network.",
      ],
    },
  ],
};

// --- 5. MASTER REGISTRY (The Local-CMS) ---
export const specialLogs: Record<string, any> = {
  "performance-architecture-2026": {
    slug: "performance-architecture-2026",
    layoutType: "TECHNICAL",
    title: softwareOptimizationArticle2026.header.title,
    description: softwareOptimizationArticle2026.hooks.intro,
    ogImage: "/lighthouse-audit-2026.jpg", 
    content: softwareOptimizationArticle2026,
    createdAt: "2026-04-18T12:00:00Z",
  },
  "mastering-modern-metal": {
    slug: "mastering-modern-metal",
    layoutType: "PRODUCTION",
    title: rifferMasteringArticle2026.header.title,
    description: rifferMasteringArticle2026.hooks.intro,
    ogImage: "/images/blogs/og-mastering-2026.jpg",
    content: rifferMasteringArticle2026,
    createdAt: "2026-04-18T10:00:00Z",
  },
  "best-laptops-2026": {
    slug: "best-laptops-2026",
    layoutType: "HARDWARE",
    title: laptopArticle2026.header.title,
    description: laptopArticle2026.hooks.intro,
    ogImage: "/gear/og-hardware-2026.jpg",
    content: laptopArticle2026,
    createdAt: "2026-04-17T15:30:00Z",
  },
  "bio-digital-synthesis": {
    slug: "bio-digital-synthesis",
    layoutType: "PHILOSOPHY",
    title: aiFutureArticle2026.header.title,
    description: aiFutureArticle2026.hooks.intro,
    ogImage: "/ai/ai-future-2026.jpg",
    content: aiFutureArticle2026,
    createdAt: "2026-04-16T09:00:00Z",
  },
};
