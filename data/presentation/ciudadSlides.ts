import { Slide } from "@/types/slides";
import { Building2, ShieldCheck, Bot, FileCode2, Gamepad2 } from "lucide-react";
// ... (keep your existing imports and Slide interface here)

export const CASE_STUDY_CIUDAD_REAL: Slide[] = [
  {
    id: "CS_01_CIUDAD",
    title: "Digital Legacy Roadmap",
    desc: "Modernizing community governance by transitioning from fragmented analog processes to a unified digital ecosystem.",
    icon: Building2,
    color: "#3b82f6", // Blue
    stats: "Digital-First",
    impact: "100% Transparency",
    tip: "Accessible data management scales community service delivery.",
  },
  {
    id: "CS_02_PROCTOR",
    title: "Secure Exam Engine",
    desc: "Engineered a high-stakes proctoring engine with persistent state monitoring and a zero-friction UI.",
    icon: ShieldCheck,
    color: "#f43f5e", // Rose/Red for Security
    stats: "<50ms Response",
    impact: "100% Data Integrity",
    tip: "Ensuring zero data loss is critical in high-pressure certification environments.",
  },
  {
    id: "CS_03_AI_AUTO",
    title: "Agentic Automation",
    desc: "Built a local automation engine using Python and FastMCP to generate real-time system reports and diagnostics.",
    icon: Bot,
    color: "#10b981", // Emerald
    stats: "Instant Audits",
    impact: "+400% Efficiency",
    tip: "Bridge the gap between local systems and AI workflows to eliminate manual bottlenecks.",
  },
  {
    id: "CS_04_TS_PROTO",
    title: "Enterprise Stability",
    desc: "Architected a strict TypeScript protocol across all projects to ensure type safety and flawless user experiences.",
    icon: FileCode2,
    color: "#3178c6", // TypeScript Blue
    stats: "0% Runtime Errors",
    impact: "-60% Maintenance",
    tip: "Eliminating unpredictable crashes significantly lowers long-term project costs.",
  },
  {
    id: "CS_05_VOID",
    title: "Void Arcade Emulation",
    desc: "Optimized web-based NES emulation achieving 1:1 hardware responsiveness with authentic CRT visuals.",
    icon: Gamepad2,
    color: "#8b5cf6", // Retro Purple
    stats: "0ms Input Lag",
    impact: "Constant 60 FPS",
    tip: "Leverage the Canvas API and Framer Motion for 'Extreme Signal' performance.",
  },
];
