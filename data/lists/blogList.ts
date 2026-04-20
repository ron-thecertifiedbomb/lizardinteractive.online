export const blogArticles = [
  // --- 1. PERFORMANCE & ARCHITECTURE ---
  {

    ogImage: "blogs/architecture.jpg",
    createdAt: "2026-04-18T12:00:00Z",
    content: {
      header: {
        title: "The Architecture of Speed: 100/100 Lighthouse Optimization",
        subtitle: "PERFORMANCE_AUDIT_V1.0 // CRITICAL_PATH",
      },
      hooks: {
        intro:
          "Engineering sub-second latency and elite-tier performance for Next.js systems. Speed is not a feature; it is infrastructure.",
        conclusion:
          "Efficiency is not an accident; it's an engineering standard. Reach out for a full system performance audit.",
      },
      contentBlocks: [
        {
          id: "zero-bloat",
          type: "standard",
          title: "The Zero-Bloat Mandate",
          text: "Every kilobyte counts. By implementing strict code-splitting and asset compression, we ensure the main thread stays clear for user interaction.",
        },
        {
          id: "vitals",
          type: "protocol",
          title: "Core Vital Targets",
          text: "We don't just aim for green scores; we aim for mathematical perfection in user experience metrics.",
          protocols: [
            "LCP (Largest Contentful Paint): Under 1.2s",
            "CLS (Cumulative Layout Shift): 0.000",
            "TBT (Total Blocking Time): < 50ms",
          ],
        },
      ],
    },
  },

  // --- 2. MODERN METAL PRODUCTION ---
  {

    ogImage: "blogs/mastering.jpg",
    createdAt: "2026-04-18T10:00:00Z",
    content: {
      header: {
        title: "Mastering Modern Metal: The 100 BPM Industrial Workflow",
        subtitle: "EMERALD_GLOW_V1.0 // PRODUCTION_PROTOCOL",
      },
      hooks: {
        intro:
          "How I achieved the 'Emerald Glow' tone for Remorseful Soul using NAM and precise mastering techniques.",
        conclusion:
          "Keep your system at 200 OK and your riffs high-gain. The 1k stream goal is just the beginning.",
      },
      contentBlocks: [
        {
          id: "nam-tech",
          type: "standard",
          title: "Neural Amp Modeling (NAM)",
          text: "NAM captures the actual 'soul' of the vacuum tube. For Remorseful Soul, I utilized a custom capture that prioritizes harmonic richness.",
        },
        {
          id: "mastering-proc",
          type: "protocol",
          title: "The Mastering Protocol",
          text: "Loudness is easy; clarity is the challenge. Spotify-ready levels without killing the transient response.",
          protocols: [
            "Gain Staging: Maintain -18dBFS pre-processing.",
            "LUFS Target: Aim for -11 to -14 for streaming stability.",
            "Precision Limiting: 4x oversampling to prevent inter-sample peaks.",
          ],
        },
      ],
    },
  },

  // --- 3. HARDWARE & ENGINES ---
  {

    ogImage: "blogs/laptop.jpg",
    createdAt: "2026-04-17T15:30:00Z",
    content: {
      header: {
        title: "The 2026 Engine Room: Best Laptops for Creators & Engineers",
        subtitle: "HARDWARE_AUDIT_V1.0 // INFRASTRUCTURE",
      },
      hooks: {
        intro:
          "In 2026, the line between engineer and creator has vanished. You need a machine that compiles Next.js as fast as it renders 8K frames.",
        conclusion:
          "Your hardware is your infrastructure. Choose the engine that keeps your system at 200 OK.",
      },
      contentBlocks: [
        {
          id: "engine-logic",
          type: "standard",
          title: "Thermal Efficiency",
          text: "Stop settling for thermal throttling. We audited the 2026 lineup to find the only machines capable of 100/100 performance.",
        },
      ],
      // Note: Hardware layout consumes this specific array
      recommendations: [
        {
          id: "m5-max",
          name: "MacBook Pro 14 (M5 Max)",
          brand: "Apple",
          description:
            "The ultimate zero-latency machine for massive Next.js builds and 8K ProRes workflows.",
          specs: {
            cpu: "18-Core M5 Max",
            ram: "64GB Unified",
            bestFor: "Production & Dev",
          },
        },
      ],
    },
  },

  // --- 4. BIO-DIGITAL PHILOSOPHY ---
  {
    
    ogImage: "blogs/ai.jpg",
    createdAt: "2026-04-16T09:00:00Z",
    content: {
      header: {
        title: "The Bio-Digital Synthesis: Why the Future of AI is Human",
        subtitle: "BIODIGITAL_SYNTH_V1.0 // SYSTEM_PHILOSOPHY",
      },
      hooks: {
        intro:
          "Architecture over Syntax // Intent over Generation. A deep dive into the symbiotic shift of 2026.",
        conclusion:
          "Intent is the only non-generative asset left. System Stable.",
      },
      contentBlocks: [
        {
          id: "ai-utility",
          type: "standard",
          title: "AI as a Background Utility",
          text: "In 2026, AI has become the 'electricity' powering our systems. We are moving from manual execution to architectural intent.",
        },
        {
          id: "intent-protocol",
          type: "protocol",
          title: "The Human Element",
          text: "AI has turned code into a commodity. It is the birth of the System Architect.",
          protocols: [
            "AI builds the bricks; Humans design the skyscraper.",
            "Performance is a baseline, not a goal.",
            "Intent is the only non-generative asset left.",
          ],
        },
      ],
    },
  },
];
