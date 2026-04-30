export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
}


export const caseStudyPageContent = {
  meta: {
    title: "Case Studies | Lizard Interactive Online",
    description:
      "Deep dives into performance engineering, legacy migrations, and high-conversion mobile development.",
  },
  header: {
    eyebrow: "PROVEN RESULTS",
    headline: "Engineering Success Stories",
    subheadline:
      "From monoliths to microservices, we solve the complex technical bottlenecks that hold businesses back. Explore our 100/100 performance builds.",
  },
};
export const caseStudies: CaseStudy[] = [
  {
    id: "cs-01",
    category: "Mobile Development",
    title: "Optimizing the On-the-Go Experience",
    client: "NextGen E-Commerce",
    challenge:
      "High bounce rates on mobile due to 5-second load times and poor touch ergonomics.",
    solution:
      "A complete rebuild using a mobile-first headless architecture. We prioritized 60FPS interactions and sub-second LCP.",
    stats: [
      { label: "Load Time", value: "0.8s" },
      { label: "Conversion", value: "+42%" },
      { label: "Retention", value: "100/100" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "PWA"],
    imageUrl: "/images/mobile-case-study.jpg",
  },
  {
    id: "cs-02",
    category: "Legacy Migration",
    title: "From Monolith to Micro-Frontend",
    client: "Global Logistics Corp",
    challenge:
      "A decade-old PHP monolith causing massive technical debt, frequent downtime, and a complete inability to scale during peak traffic.",
    solution:
      "Executed a phased 'Strangler Fig' migration to a Next.js App Router architecture. Decoupled the backend into a high-speed API layer with zero service interruption.",
    stats: [
      { label: "Downtime", value: "0%" },
      { label: "Build Speed", value: "+300%" },
      { label: "SEO Score", value: "98/100" },
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    imageUrl: "/images/migration-case-study.jpg",
  },
];