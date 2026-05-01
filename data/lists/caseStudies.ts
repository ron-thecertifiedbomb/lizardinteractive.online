// Define the core structure for individual projects
export interface CaseStudy {
  id: string;
  slug: string; // <-- Added slug here
  category: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
}

// Define the structure for the Page Content
export const caseStudyPageContent = {
  meta: {
    title: "Case Studies | Lizard Interactive Online",
    description:
      "Deep dives into performance engineering, AI automation, and secure architecture by Ronan Sibunga.",
  },
  header: {
    eyebrow: "Lizard Interactive Online",
    headline: "Case Studies",
    subheadline: "We solve technical bottlenecks with extreme precision",
  },
};

// The Data Array: Strict to the CaseStudy interface
export const caseStudies: CaseStudy[] = [
  {
    id: "cs-ciudad-real-01",
    slug: "ciudad-real-digital-roadmap", // <-- Added
    category: "Community Infrastructure",
    title:
      "Building a Digital Legacy: A Roadmap for a Smarter Barangay Ciudad Real",
    client: "Barangay Ciudad Real // Kap Project",
    challenge:
      "Modernizing community governance by transitioning from fragmented analog processes to a unified, high-performance digital roadmap.",
    solution:
      "Designed a comprehensive digital ecosystem for Barangay Ciudad Real, focusing on accessible data management, transparent service delivery, and scalable community automation.",
    stats: [
      { label: "Governance", value: "Digital-First" },
      { label: "Scalability", value: "High" },
      { label: "Transparency", value: "100%" },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Lizard-Automation-Engine",
    ],
    imageUrl: "/images/ciudad-real-roadmap.jpg",
  },
  {
    id: "cs-proctor-02",
    slug: "high-stakes-exam-engine", // <-- Added
    category: "Secure Systems",
    title: "Architecting a High-Stakes Exam Engine",
    client: "Lizard Interactive Online",
    challenge:
      "Ensuring 100% data integrity and real-time state management in a high-pressure, secure certification environment.",
    solution:
      "Engineered a secure proctoring engine with persistent state monitoring and a zero-friction UI, ensuring zero data loss during live sessions.",
    stats: [
      { label: "Data Integrity", value: "100%" },
      { label: "Response Time", value: "<50ms" },
      { label: "Stability", value: "99.9%" },
    ],
    techStack: ["Next.js", "TypeScript", "C#", "Supabase", "Tailwind CSS"],
    imageUrl: "/images/proctoring-engine.jpg",
  },
  {
    id: "cs-ai-03",
    slug: "lizard-automation-engine", // <-- Added
    category: "AI & Automation",
    title: "The Lizard-Automation-Engine",
    client: "RONDEV Internal R&D",
    challenge:
      "Bridge the gap between local system diagnostics and agentic AI workflows to eliminate manual project auditing bottlenecks.",
    solution:
      "Built a local automation engine using Python and FastMCP to generate real-time system reports and automated project diagnostics.",
    stats: [
      { label: "Efficiency", value: "+400%" },
      { label: "Audit Speed", value: "Instant" },
      { label: "Manual Effort", value: "0%" },
    ],
    techStack: ["Python", "FastMCP", "AI Automation", "System Diagnostics"],
    imageUrl: "/images/automation-engine.jpg",
  },
  {
    id: "cs-ts-04",
    slug: "typescript-reliability-protocol", // <-- Added
    category: "Engineering Reliability",
    title: "TypeScript Reliability Protocol",
    client: "RONDEV Software Development Services",
    challenge:
      "Eliminating unpredictable runtime errors and crashes that compromise enterprise-grade digital stability.",
    solution:
      "Architected a strict TypeScript protocol across all projects to ensure type safety, flawless user experiences, and significantly lower long-term maintenance costs.",
    stats: [
      { label: "Runtime Errors", value: "0%" },
      { label: "Stability", value: "Enterprise" },
      { label: "Maintenance", value: "-60%" },
    ],
    techStack: ["TypeScript", "Strict Typing", "Architecture", "CI/CD"],
    imageUrl: "/images/typescript-reliability.jpg",
  },
  {
    id: "cs-void-05",
    slug: "void-arcade-emulation", // <-- Added
    category: "Retro Engineering",
    title: "Void Arcade: High-Fidelity Emulation",
    client: "Lizard Interactive Online",
    challenge:
      "Optimizing web-based NES emulation to achieve 1:1 hardware responsiveness with zero input lag and authentic CRT visuals.",
    solution:
      "Developed a custom emulator page with drag-and-drop support and a specialized CRT scanline overlay, prioritizing 'Extreme Signal' performance.",
    stats: [
      { label: "Input Lag", value: "0ms" },
      { label: "FPS", value: "60.0" },
      { label: "Lighthouse", value: "100/100" },
    ],
    techStack: ["TypeScript", "Canvas API", "Framer Motion", "CRT Shaders"],
    imageUrl: "/images/void-arcade.jpg",
  },
];
