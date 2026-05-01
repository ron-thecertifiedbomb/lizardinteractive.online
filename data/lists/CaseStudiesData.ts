// ─── Primitives ───────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
}

export interface TimelineEvent {
  phase: string; // e.g. "Discovery", "Build", "Launch"
  date: string; // e.g. "Jan 2024"
  description: string;
}

export interface PainPoint {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  stat?: string; // optional highlight figure, e.g. "+400%"
}

export interface CommunityDetail {
  label: string; // e.g. "Location", "Population", "Sector"
  value: string;
}

// ─── Core Interface ───────────────────────────────────────────────────────────

export interface CaseStudy {
  // Identity
  id: string;
  slug: string;
  category: string;
  title: string;
  client: string;
  imageUrl: string;

  // SEO / meta
  meta: {
    description: string; // 160-char max for og:description
  };

  // Hero narrative (replaces flat challenge/solution)
  narrative: {
    hook: string; // 1–2 sentence opener that sets the scene
    challenge: string; // the problem, with context
    solution: string; // what was built and why it worked
    outcome: string; // the measurable result / closing statement
  };

  // Storytelling sections
  painPoints: PainPoint[];
  timeline: TimelineEvent[];
  benefits: Benefit[];

  // Optional community / client context panel
  communityDetails?: CommunityDetail[];

  // Right-column panels
  stats: Stat[];
  techStack: string[];
}

// ─── Page-level content ───────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-ciudad-real-01",
    slug: "ciudad-real-digital-roadmap",
    category: "Community Infrastructure",
    title:
      "Building a Digital Legacy: A Roadmap for a Smarter Barangay Ciudad Real",
    client: "Barangay Ciudad Real",
    imageUrl: "/images/ciudad-real-roadmap.jpg",

    meta: {
      description:
        "Modernizing community governance by transitioning from fragmented analog processes to a unified digital ecosystem.",
    },

    narrative: {
      hook: "From Stone Age to Space Age",
      challenge:
        "Modernizing community governance by transitioning from fragmented analog processes to a unified, high-performance digital roadmap.",
      solution:
        "Designed a comprehensive digital ecosystem for Barangay Ciudad Real, focusing on accessible data management, transparent service delivery, and scalable community automation.",
      outcome:
        "100% of governance workflows are now digitized, cutting service delivery time from days to minutes.",
    },

    painPoints: [
      {
        title: "No Single Source of Truth",
        description:
          "Records were duplicated across notebooks, Excel sheets, and filing cabinets — with no version control or audit trail.",
      },
      {
        title: "Manual Service Delivery",
        description:
          "Residents waited days for barangay clearances that could be generated in seconds with the right system.",
      },
      {
        title: "Zero Transparency",
        description:
          "Budget allocations and project updates were never communicated to the community in a structured way.",
      },
    ],

    timeline: [
      {
        phase: "Discovery",
        date: "Jan 2024",
        description:
          "Stakeholder interviews with barangay officials and residents to map pain points.",
      },
      {
        phase: "Architecture",
        date: "Feb 2024",
        description: "Designed the data model and service delivery workflows.",
      },
      {
        phase: "Build",
        date: "Mar–Apr 2024",
        description:
          "Developed the core portal, document generation, and resident-facing UI.",
      },
      {
        phase: "Launch",
        date: "May 2024",
        description:
          "Deployed to production with onboarding sessions for barangay staff.",
      },
    ],

    benefits: [
      {
        title: "Faster Clearances",
        description:
          "Document generation reduced from 3 days to under 5 minutes.",
        stat: "-99% Time",
      },
      {
        title: "Full Audit Trail",
        description:
          "Every record change is logged, timestamped, and attributable.",
        stat: "100% Traceable",
      },
      {
        title: "Resident Self-Service",
        description:
          "Residents can track requests and download documents without visiting the hall.",
      },
    ],

    communityDetails: [
      { label: "Location", value: "City of San Jose del Monte, Bulacan" },
      { label: "Population(2020)", value: "~1,826 Residents" },
      { label: "Sector", value: "Local Government Unit" },
      {
        label: "PCoordinates",
        value: "14.7705, 121.0928 (14° 46' North, 121° 6' East)",
      },
      { label: "Project Type", value: "Digital Transformation" },
      {
        label: "Estimated elevation above sea level",
        value: "94.1 meters (308.7 feet)",
      },
    ],

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
  },

  {
    id: "cs-proctor-02",
    slug: "high-stakes-exam-engine",
    category: "Secure Systems",
    title: "Architecting a High-Stakes Exam Engine",
    client: "Lizard Interactive Online",
    imageUrl: "/images/proctoring-engine.jpg",

    meta: {
      description:
        "Ensuring 100% data integrity and real-time state management in a high-pressure, secure certification environment.",
    },

    narrative: {
      hook: "One dropped connection during a live exam could erase hours of candidate work. That was the risk we were asked to eliminate.",
      challenge:
        "Ensuring 100% data integrity and real-time state management in a high-pressure, secure certification environment.",
      solution:
        "Engineered a secure proctoring engine with persistent state monitoring and a zero-friction UI, ensuring zero data loss during live sessions.",
      outcome:
        "Zero data loss incidents across all live certification sessions since launch.",
    },

    painPoints: [
      {
        title: "Session Fragility",
        description:
          "Any network interruption could corrupt exam state, invalidating hours of candidate effort.",
      },
      {
        title: "No Real-Time Oversight",
        description:
          "Proctors had no live visibility into candidate activity or anomalous behavior patterns.",
      },
      {
        title: "Friction-Heavy UX",
        description:
          "Previous tools required complex setup steps that introduced errors before exams even began.",
      },
    ],

    timeline: [
      {
        phase: "Threat Modeling",
        date: "Mar 2024",
        description:
          "Identified all failure modes: disconnects, tab switches, session hijacking.",
      },
      {
        phase: "Core Engine",
        date: "Apr 2024",
        description:
          "Built persistent state layer with optimistic local saves and server sync.",
      },
      {
        phase: "Proctor Dashboard",
        date: "May 2024",
        description:
          "Real-time monitoring UI with anomaly flagging and live session control.",
      },
      {
        phase: "Hardening",
        date: "Jun 2024",
        description:
          "Penetration testing, load testing at 500 concurrent sessions.",
      },
    ],

    benefits: [
      {
        title: "Zero Data Loss",
        description:
          "Persistent state survives full browser crashes and network drops.",
        stat: "100% Integrity",
      },
      {
        title: "Sub-50ms Response",
        description:
          "All UI interactions and state syncs complete in under 50ms.",
        stat: "<50ms",
      },
      {
        title: "Proctor Confidence",
        description:
          "Live dashboard gives proctors full session control without interrupting candidates.",
      },
    ],

    stats: [
      { label: "Data Integrity", value: "100%" },
      { label: "Response Time", value: "<50ms" },
      { label: "Stability", value: "99.9%" },
    ],
    techStack: ["Next.js", "TypeScript", "C#", "Supabase", "Tailwind CSS"],
  },

  {
    id: "cs-ai-03",
    slug: "lizard-automation-engine",
    category: "AI & Automation",
    title: "The Lizard-Automation-Engine",
    client: "RONDEV Internal R&D",
    imageUrl: "/images/automation-engine.jpg",

    meta: {
      description:
        "A local agentic automation engine built with Python and FastMCP to eliminate manual project auditing bottlenecks.",
    },

    narrative: {
      hook: "Every project audit was a half-day manual effort. We decided to make it a 3-second command.",
      challenge:
        "Bridge the gap between local system diagnostics and agentic AI workflows to eliminate manual project auditing bottlenecks.",
      solution:
        "Built a local automation engine using Python and FastMCP to generate real-time system reports and automated project diagnostics.",
      outcome:
        "Audit time dropped from hours to seconds, freeing engineering capacity for actual product work.",
    },

    painPoints: [
      {
        title: "Manual Auditing Overhead",
        description:
          "Project health checks required opening multiple tools, cross-referencing logs, and writing summary reports by hand.",
      },
      {
        title: "No AI Integration",
        description:
          "Local system data was siloed — inaccessible to AI workflows that could interpret and act on it.",
      },
      {
        title: "Inconsistent Reporting",
        description:
          "Different team members produced different report formats, making comparison impossible.",
      },
    ],

    timeline: [
      {
        phase: "Research",
        date: "Feb 2024",
        description:
          "Evaluated FastMCP, local LLM tooling, and system diagnostic libraries.",
      },
      {
        phase: "Prototype",
        date: "Mar 2024",
        description:
          "Built first working pipeline: system scan → structured report → AI summary.",
      },
      {
        phase: "Integration",
        date: "Apr 2024",
        description: "Connected engine to project workflows and CI/CD hooks.",
      },
      {
        phase: "Rollout",
        date: "May 2024",
        description:
          "Deployed across all active RONDEV projects with one-command execution.",
      },
    ],

    benefits: [
      {
        title: "Instant Audits",
        description:
          "Full project health reports generated in under 3 seconds.",
        stat: "Instant",
      },
      {
        title: "400% Efficiency Gain",
        description:
          "Engineering time previously spent on manual audits redirected to product work.",
        stat: "+400%",
      },
      {
        title: "Standardized Output",
        description:
          "Every report follows the same schema — comparable, archivable, and AI-readable.",
      },
    ],

    stats: [
      { label: "Efficiency", value: "+400%" },
      { label: "Audit Speed", value: "Instant" },
      { label: "Manual Effort", value: "0%" },
    ],
    techStack: ["Python", "FastMCP", "AI Automation", "System Diagnostics"],
  },

  {
    id: "cs-ts-04",
    slug: "typescript-reliability-protocol",
    category: "Engineering Reliability",
    title: "TypeScript Reliability Protocol",
    client: "RONDEV Software Development Services",
    imageUrl: "/images/typescript-reliability.jpg",

    meta: {
      description:
        "A strict TypeScript protocol that eliminated runtime errors and cut long-term maintenance costs by 60%.",
    },

    narrative: {
      hook: "Runtime errors were showing up in production. Not occasionally — predictably. The codebase had no contract.",
      challenge:
        "Eliminating unpredictable runtime errors and crashes that compromise enterprise-grade digital stability.",
      solution:
        "Architected a strict TypeScript protocol across all projects to ensure type safety, flawless user experiences, and significantly lower long-term maintenance costs.",
      outcome:
        "Zero runtime type errors in production since protocol adoption. Maintenance overhead reduced by 60%.",
    },

    painPoints: [
      {
        title: "Runtime Surprises",
        description:
          "Untyped data from APIs caused unpredictable crashes that were only caught in production.",
      },
      {
        title: "High Maintenance Cost",
        description:
          "Debugging type-related bugs consumed a disproportionate share of each sprint.",
      },
      {
        title: "No Shared Contract",
        description:
          "Different developers made different assumptions about data shapes, leading to integration failures.",
      },
    ],

    timeline: [
      {
        phase: "Audit",
        date: "Jan 2024",
        description:
          "Catalogued all untyped code paths and implicit any usages across projects.",
      },
      {
        phase: "Protocol Design",
        date: "Feb 2024",
        description:
          "Defined strict tsconfig rules, shared type libraries, and Zod validation layers.",
      },
      {
        phase: "Migration",
        date: "Mar–Apr 2024",
        description:
          "Incrementally typed all existing codebases with zero regressions.",
      },
      {
        phase: "Enforcement",
        date: "May 2024",
        description:
          "CI/CD pipeline blocks merges with type errors — no exceptions.",
      },
    ],

    benefits: [
      {
        title: "Zero Runtime Errors",
        description:
          "Type contracts catch mismatches at compile time, before they reach users.",
        stat: "0% Errors",
      },
      {
        title: "-60% Maintenance",
        description:
          "Fewer bugs means fewer sprints spent firefighting instead of building.",
        stat: "-60%",
      },
      {
        title: "Developer Confidence",
        description:
          "Auto-complete and type inference make every API boundary self-documenting.",
      },
    ],

    stats: [
      { label: "Runtime Errors", value: "0%" },
      { label: "Stability", value: "Enterprise" },
      { label: "Maintenance", value: "-60%" },
    ],
    techStack: ["TypeScript", "Strict Typing", "Architecture", "CI/CD"],
  },

  {
    id: "cs-void-05",
    slug: "void-arcade-emulation",
    category: "Retro Engineering",
    title: "Void Arcade: High-Fidelity Emulation",
    client: "Lizard Interactive Online",
    imageUrl: "/images/void-arcade.jpg",

    meta: {
      description:
        "Web-based NES emulation achieving 1:1 hardware responsiveness with authentic CRT visuals and zero input lag.",
    },

    narrative: {
      hook: "The web is fast enough to run a 1983 game console. The question was whether we could make it feel like you were actually holding the cartridge.",
      challenge:
        "Optimizing web-based NES emulation to achieve 1:1 hardware responsiveness with zero input lag and authentic CRT visuals.",
      solution:
        "Developed a custom emulator page with drag-and-drop ROM support and a specialized CRT scanline overlay, prioritizing Extreme Signal performance.",
      outcome:
        "Constant 60 FPS with 0ms perceived input lag — indistinguishable from original hardware in blind tests.",
    },

    painPoints: [
      {
        title: "Input Lag",
        description:
          "Browser event loops introduced unpredictable delays between button press and on-screen response.",
      },
      {
        title: "Frame Drops",
        description:
          "Standard rendering pipelines couldn't sustain 60 FPS during CPU-intensive emulation cycles.",
      },
      {
        title: "Visual Inauthenticity",
        description:
          "Without CRT simulation, games looked sterile on modern displays — losing their original aesthetic.",
      },
    ],

    timeline: [
      {
        phase: "Research",
        date: "Jun 2024",
        description:
          "Benchmarked existing web emulators and identified frame timing bottlenecks.",
      },
      {
        phase: "Rendering Pipeline",
        date: "Jul 2024",
        description:
          "Rebuilt the Canvas rendering loop with requestAnimationFrame precision timing.",
      },
      {
        phase: "CRT Overlay",
        date: "Aug 2024",
        description:
          "Designed and tuned the scanline shader for authentic visual output.",
      },
      {
        phase: "Input Optimization",
        date: "Sep 2024",
        description:
          "Bypassed default browser input handling for zero-latency controller mapping.",
      },
    ],

    benefits: [
      {
        title: "0ms Input Lag",
        description:
          "Custom input pipeline bypasses browser event queue entirely.",
        stat: "0ms",
      },
      {
        title: "Constant 60 FPS",
        description:
          "Frame-locked rendering loop sustains 60 FPS through all emulation loads.",
        stat: "60 FPS",
      },
      {
        title: "Authentic CRT Feel",
        description:
          "Scanline overlay and phosphor glow recreate the original visual experience on modern screens.",
      },
    ],

    stats: [
      { label: "Input Lag", value: "0ms" },
      { label: "FPS", value: "60.0" },
      { label: "Lighthouse", value: "100/100" },
    ],
    techStack: ["TypeScript", "Canvas API", "Framer Motion", "CRT Shaders"],
  },
];
