// data/nichesList.ts

import {
  Search,
  Smartphone,
  TrendingUp,
  Code,
  Zap,
  Rocket,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";

export interface Niche {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  label: string;
  accent: string;
  tag: string;
  icon: any;
}

export const niches: Niche[] = [
  {
    id: "core_01",
    title: "SEO Domination",
    subtitle: "ORGANIC GROWTH",
    desc: "Rank #1 on Google. Technical SEO, local SEO, and content strategy that drives real organic traffic to your business.",
    href: "/seo-domination",
    label: "View Case Study",
    accent: "from-emerald-500 to-teal-500",
    tag: "SEO_100",
    icon: Search,
  },
  {
    id: "core_02",
    title: "Digital Launchpad",
    subtitle: "TECH SIMPLIFIED",
    desc: "High-conversion landing pages and websites. No jargon. Just solutions that work for your business.",
    href: "/digital-launchpad",
    label: "View Projects",
    accent: "from-emerald-400 to-blue-500",
    tag: "DIGITAL_FIRST",
    icon: Smartphone,
  },
  {
    id: "core_03",
    title: "Growth Accelerator",
    subtitle: "BUSINESS SCALING",
    desc: "Proven systems to help local businesses grow online. From landing pages to sales funnels, we handle the heavy lifting.",
    href: "/growth-accelerator",
    label: "See Results",
    accent: "from-emerald-500 to-amber-500",
    tag: "SCALE_UP",
    icon: TrendingUp,
  },
];
