import { Zap, Music, Video, Package, Code } from "lucide-react";

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
    title: "Ron DevSolutions",
    subtitle: "SYSTEM_ENGINEERING",
    desc: "Full-stack architecture and 100/100 Lighthouse performance engineering.",
    href: "/rondevsolutions",
    label: "Initialize Audit",
    accent: "from-emerald-400 to-cyan-500",
    tag: "Code",
    icon: Code,
  },
  {
    id: "core_02",
    title: "The Psychedelic Riffer",
    subtitle: "AUDIO_PRODUCTION",
    desc: "High-fidelity instrumental metal production and precision guitar tracking.",
    href: "/thepsychedelicriffer",
    label: "Enter the Void",
    accent: "from-purple-500 to-pink-500",
    tag: "Sound",
    icon: Music,
  },
  {
    id: "core_03",
    title: "Lizard Visuals",
    subtitle: "POST_PRODUCTION",
    desc: "High-density video editing via Premiere Pro and After Effects motion design.",
    href: "/lizard-creative",
    label: "View Showreel",
    accent: "from-blue-500 to-indigo-600",
    tag: "Vision",
    icon: Video,
  },
  {
    id: "core_04",
    title: "Digital Vault",
    subtitle: "ASSET_REPOSITORY",
    desc: "Premium production assets, guitar IRs, and developer system boilerplates.",
    href: "/vault",
    label: "Access Assets",
    accent: "from-orange-400 to-red-500",
    tag: "Vault",
    icon: Package,
  },
];
