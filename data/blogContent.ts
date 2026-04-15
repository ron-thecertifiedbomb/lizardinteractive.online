import { GearItem } from "../interfaces"; // Ensure this path matches your types file

export const laptopArticle2026 = {
  header: {
    title: "The 2026 Engine Room: Best Laptops for Creators & Engineers",
    intro:
      "In 2026, the line between engineer and creator has vanished. You need a machine that compiles Next.js code as fast as it renders 8K Premiere Pro frames.",
  },

  // This array feeds the GearCard components we discussed
  recommendations: [
    {
      id: "lp-m5-max",
      name: "MacBook Pro 14 (M5 Max)",
      brand: "Apple",
      category: "Hardware" as const,
      description:
        "The ultimate zero-latency machine for 2026. Perfect for massive Next.js builds and 8K ProRes RAW workflows.",
      affiliateUrl: "https://amazon.com/your-affiliate-link-1", // Update with your ID
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
      affiliateUrl: "https://amazon.com/your-affiliate-link-2", // Update with your ID
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
        gpu: "Intel Arc B390",
        ram: "32GB LPDDR5x",
        display: '14" 2.8K OLED Touch',
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
