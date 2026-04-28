// data/lists/caseStudies.ts

export interface CaseStudy {
  client: string;
  projectType: string;
  description: string;
  performanceScore: number;
  improvement: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    client: "Lizard Interactive Online",
    projectType: "Brand Flagship",
    description:
      "Engineered a high-performance conversion funnel with zero-bloat architecture. Optimized for instant load times and perfect SEO discovery.",
    performanceScore: 100,
    improvement: "3.2s → 0.2s",
    tags: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    client: "Real Estate Portal",
    projectType: "Frontend Optimization",
    description:
      "Restructured legacy React components and implemented advanced image optimization to recapture mobile leads losing interest due to latency.",
    performanceScore: 98,
    improvement: "5.4s → 0.9s",
    tags: ["Performance", "SEO", "React"],
  },
  {
    client: "The Engineering Toolkit",
    projectType: "Utility Suite",
    description:
      "Built a suite of serverless developer tools focusing on execution speed and zero-tracking privacy protocols.",
    performanceScore: 100,
    improvement: "1.2s → 0.1s",
    tags: ["TypeScript", "API", "Edge"],
  },
  {
    client: "Aesthetic Media Group",
    projectType: "Media Optimization",
    description:
      "Optimized a high-resolution video production portfolio. Reduced Largest Contentful Paint (LCP) by 70% using advanced Next.js Image components and lazy-loading protocols.",
    performanceScore: 100,
    improvement: "4.8s → 0.6s",
    tags: ["Video Content", "LCP", "Optimization"],
  },
];
