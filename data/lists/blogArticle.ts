export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
  sections: {
    heading: string;
    content: string;
    items?: {
      name: string;
      image?: string;
      description: string;
      details: { label: string; value: string }[];
    }[];
  }[];
}

export const blogArticles: BlogArticle[] = [
  // --- 1. LAPTOP ARTICLE ---
  {
    id: "best-laptops-2026",
    title: "2026 Best Laptops for Creators & Engineers",
    category: "GEAR_AUDIT",
    image: "blogs/laptop-header.jpg",
    createdAt: "2026-04-20T10:00:00Z",
    sections: [
      {
        heading: "The Professional Standard",
        content:
          "In 2026, the line between engineer and creator has vanished. You need a machine that compiles Next.js as fast as it renders 8K frames.",
        items: [
          {
            name: "MacBook Pro 14 (M5 Max)",
            image: "gear/macbook-m5.jpg",
            description:
              "The ultimate zero-latency machine for massive Next.js builds and 8K ProRes workflows.",
            details: [
              { label: "CPU", value: "18-Core M5 Max" },
              { label: "RAM", value: "64GB Unified" },
              { label: "GPU", value: "40-Core" },
            ],
          },
          {
            name: "Razer Blade 16 (2026)",
            image: "gear/razer-16.jpg",
            description:
              "Raw power for CUDA-accelerated tasks and neural network training.",
            details: [
              { label: "GPU", value: "RTX 5090" },
              { label: "Display", value: "OLED 240Hz" },
              { label: "OS", value: "Windows 11 Pro" },
            ],
          },
          {
            name: "Dell XPS 16 (9650)",
            image: "gear/dellxps.jpg",
            description:
              "The precision-machined Windows alternative. Ideal for full-stack engineering and high-fidelity UI design.",
            details: [
              { label: "Processor", value: "Intel Core Ultra 9" },
              { label: "RAM", value: "32GB LPDDR5x" },
              { label: "GPU", value: "RTX 4070" },
              { label: "Screen", value: "4K+ OLED Touch" },
            ],
          },
          {
            name: "ROG Zephyrus G16 (2026)",
            image: "gear/zephyrus-g16.jpg",
            description:
              "The benchmark for thin-and-light performance. A balance of industrial aesthetics and heavy-lift thermal management.",
            details: [
              { label: "GPU", value: "RTX 5080" },
              { label: "Display", value: "2.5K OLED 240Hz" },
              { label: "Weight", value: "1.85kg" },
              { label: "Cooling", value: "Tri-Fan System" },
            ],
          },
        ],
      },
    ],
  },

  // --- 2. AI PHILOSOPHY ARTICLE ---
  {
    id: "ai-human-future",
    title: "The Bio-Digital Synthesis: Why the Future of AI is Human",
    category: "SYSTEM_PHILOSOPHY",
    image: "blogs/ai-synth.jpg",
    createdAt: "2026-04-19T14:30:00Z",
    sections: [
      {
        heading: "Architecture over Syntax",
        content:
          "In 2026, AI has turned code into a commodity. The value of an engineer no longer lies in writing syntax, but in the architectural intent behind the system.",
        items: [
          {
            name: "The Intent Protocol",
            description:
              "AI builds the bricks; Humans design the skyscraper. Intent is the only non-generative asset remaining.",
            details: [
              { label: "Focus", value: "Strategic Vision" },
              { label: "Status", value: "Non-Automatable" },
            ],
          },
          {
            name: "Algorithmic Empathy",
            description:
              "Designing systems that understand human friction. We don't need faster machines; we need more intuitive interfaces.",
            details: [
              { label: "Metric", value: "User Resonance" },
              { label: "Domain", value: "Human-Computer Interaction" },
            ],
          },
        ],
      },
      {
        heading: "The Great Decoupling",
        content:
          "We are moving from manual execution to high-level orchestration. Your effectiveness is now measured by your ability to direct agents, not your ability to type.",
      },
    ],
  },
];
