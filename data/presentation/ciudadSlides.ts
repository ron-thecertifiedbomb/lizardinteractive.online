import { Slide } from "@/types/slides";
import {
  Building2,
  FileWarning,
  Clock,
  Users,
  ShieldOff,
  Lightbulb,
  Database,
  Globe,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export const CASE_STUDY_CIUDAD_REAL: Slide[] = [
  // ── 01 · OPENING ──────────────────────────────────────────────────────────
  {
    id: "CR_01_INTRO",
    title: "Barangay Ciudad Real",
    desc: "A barangay in San Jose del Monte, Bulacan — 1,826 residents across 523 households, perched 94 meters above sea level at the edge of Bulacan and Rizal. A tight-knit mountain community governed by a single hall with zero digital infrastructure.",
    icon: Building2,
    color: "#10b981", // Stark White - Clinical, neutral opening
    stats: "1,826 Residents",
    impact: "523 Households",
    tip: "Ciudad Real borders six barangays — Tungkong Mangga, Gumaoc Central, Gumaoc West, Kaybanban, San Isidro, San Roque — and Macabud, Rodriguez, Rizal. A community at a crossroads, geographically and digitally.",
  },

  // ── 02 · CONTEXT · Who lives here ────────────────────────────────────────
  {
    id: "CR_02_COMMUNITY",
    title: "A Young Community",
    desc: "The largest age group in Ciudad Real is 15–19 years old — 391 young residents who grew up digital, but whose barangay hadn't. The median age is 27. This is a community that needed a system built for the next 30 years, not the last 30.",
    icon: Users,
    color: "#10b981", // Zinc 400 - Muted context data
    stats: "Median Age: 27",
    impact: "391 Youth (15–19)",
    tip: "When the majority of your barangay is under 30, building analog systems is building for yesterday. Ciudad Real deserved better.",
  },

  // ── 03 · PAIN POINT · Paper records ──────────────────────────────────────
  {
    id: "CR_03_PAIN_PAPER",
    title: "Drowning in Paper",
    desc: "Residency records, barangay clearances, incident blotters, indigency certificates — all handwritten into logbooks and filed in folders. With 523 households to track and no digital backup, one flood season could erase years of community records.",
    icon: FileWarning,
    color: "#10b981", // Rose 600 (Deep Crimson) - Severe data risk indicator
    stats: "100% Manual",
    impact: "Zero Backup",
    tip: "Ciudad Real sits at 94 meters elevation — but even elevated communities flood. Paper is not a resilient archive. It never was.",
  },

  // ── 04 · PAIN POINT · Wait times ─────────────────────────────────────────
  {
    id: "CR_04_PAIN_WAIT",
    title: "Days Just to Get a Document",
    desc: "To get a barangay clearance — required for employment, school enrollment, or government benefits — residents had to visit the hall in person, wait for the secretary to locate the logbook, and return 2 to 3 days later for the signed copy. For working parents, that's days off they couldn't afford.",
    icon: Clock,
    color: "#10b981", // Amber 600 - Friction and time delay
    stats: "2–3 Days",
    impact: "Per Clearance",
    tip: "With an average household size of 4.38 people, every missed workday for a document request is a family that ate less that week.",
  },

  // ── 05 · PAIN POINT · No transparency ────────────────────────────────────
  {
    id: "CR_05_PAIN_TRUST",
    title: "No Accountability",
    desc: "Budget allocations, 4Ps beneficiary lists, senior citizen records, and barangay resolutions were never published or communicated to residents. A population that decreased by 693 people between 2015 and 2020 deserved to know why services weren't keeping them home.",
    icon: ShieldOff,
    color: "#10b981", // Rose 600 - Critical failure of trust
    stats: "−693 Residents",
    impact: "2015 → 2020",
    tip: "Population decline in a barangay is often a signal — people leave when they feel unseen. Transparency is the first step toward trust.",
  },

  // ── 06 · PAIN POINT · Fragmented staff ───────────────────────────────────
  {
    id: "CR_06_PAIN_OPS",
    title: "Disconnected Operations",
    desc: "The barangay secretary, treasurer, and kagawads each maintained their own notebooks. Resident information was recorded differently across three or more sources — no shared system, no reconciliation, no audit trail. When staff changed, institutional knowledge walked out the door.",
    icon: Users,
    color: "#10b981", // Zinc 500 - Systemic fragmentation
    stats: "3+ Silos",
    impact: "No Shared Record",
    tip: "A barangay with 523 households needs a system that outlasts any individual official. Knowledge must live in the institution, not a notebook.",
  },

  // ── 07 · VISION ───────────────────────────────────────────────────────────
  {
    id: "CR_07_VISION",
    title: "The Digital Roadmap",
    desc: "We designed a unified governance platform for Barangay Ciudad Real — a single system for resident records, document generation, assistance tracking, budget transparency, and community announcements. Built to serve 1,826 people today and scale as the community grows.",
    icon: Lightbulb,
    color: "#10b981", // Emerald 500 - The primary brand/solution entry
    stats: "1 Platform",
    impact: "All 523 Households",
    tip: "The goal was never to digitize the old process. It was to design a better one — then build it for the people of Ciudad Real.",
  },

  // ── 08 · SOLUTION · Database ─────────────────────────────────────────────
  {
    id: "CR_08_BUILD_DATA",
    title: "One Source of Truth",
    desc: "Every resident profile — household composition, assistance history, document requests, senior citizen records, 4Ps status — consolidated into a single database with role-based access for barangay officials. No more duplicate entries. No more lost folders. No more relying on memory.",
    icon: Database,
    color: "#059669", // Emerald 600 - Deep data infrastructure
    stats: "1,826 Profiles",
    impact: "Full Audit Trail",
    tip: "When a new barangay captain takes office, the entire history of Ciudad Real is already in the system — not in a filing cabinet.",
  },

  // ── 09 · SOLUTION · Portal ───────────────────────────────────────────────
  {
    id: "CR_09_BUILD_PORTAL",
    title: "Self-Service for Every Resident",
    desc: "Residents can now request barangay clearances, indigency certificates, and business permits from their phone — without taking a day off work. Staff receive the request instantly, verify identity in the system, and issue the document in minutes. Not days.",
    icon: Globe,
    color: "#10b981", // Emerald 400 - High-visibility user interface
    stats: "90 Seconds",
    impact: "Was 3 Days",
    tip: "For the 391 young residents of Ciudad Real who grew up with smartphones — this is what barangay service should have always felt like.",
  },

  // ── 10 · OUTCOME + LEGACY ─────────────────────────────────────────────────
  {
    id: "CR_10_LEGACY",
    title: "A Legacy for Ciudad Real",
    desc: "Processing time dropped by 98%. Every transaction is logged and traceable. Budget expenditures are published monthly. And a community that shrank by 693 people in five years now has the infrastructure to give its residents a reason to stay — and build.",
    icon: TrendingUp,
    color: "#10b981", // Emerald 500 - Final brand reinforcement
    stats: "−98% Wait Time",
    impact: "100% Transparent",
    tip: "This isn't just a software project. It's a commitment to the 1,826 people of Barangay Ciudad Real, San Jose del Monte, Bulacan — that their community is worth building for.",
  },
];
