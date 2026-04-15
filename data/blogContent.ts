import { GearItem } from "../interfaces";

// 1. HARDWARE DATA OBJECT
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
      category: "Hardware" as const,
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
      category: "Hardware" as const,
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
    {
      id: "lp-xps-14",
      name: "Dell XPS 14 (2026)",
      brand: "Dell",
      category: "Hardware" as const,
      description:
        "Ultra-portable dev machine. Boasting a 21-hour battery life and the new Arc B390 graphics, it's the 200 OK choice for coding on the move.",
      affiliateUrl: "https://amazon.com/dp/example3",
      imageUrl: "/gear/dellxps.jpg",
      isFavorite: false,
      specs: {
        cpu: "Intel Core Ultra X7 358H",
        ram: "32GB LPDDR5x",
        bestFor: "Mobile Engineering",
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

// 2. PHILOSOPHY DATA OBJECT
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
      id: "02",
      type: "standard",
      icon: "music",
      title: "The Artist vs. Machine Noise",
      text: "AI is excellent at pattern recognition, but it is incapable of Remorse.",
      subText: "The future of creative arts is Symbiosis.",
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

// 3. MASTER REGISTRY (The Local-First CMS)
export const specialLogs: Record<string, any> = {
  "best-laptops-2026": {
    slug: "best-laptops-2026",
    layoutType: "HARDWARE",
    title: laptopArticle2026.header.title,
    description: laptopArticle2026.hooks.intro,
    ogImage: "/gear/og-hardware-2026.jpg",
    content: laptopArticle2026,
  },
  "bio-digital-synthesis": {
    slug: "bio-digital-synthesis",
    layoutType: "PHILOSOPHY",
    title: aiFutureArticle2026.header.title,
    description: aiFutureArticle2026.hooks.intro,
    ogImage: "/ai/ai-future-2026.jpg",
    content: aiFutureArticle2026,
  },
};
