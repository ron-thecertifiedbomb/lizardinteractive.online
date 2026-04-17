import {
  Zap,
  Music,
  Video,
  Package,
  Code,
  Terminal,
  Layers,
  Mic2,
  MonitorPlay,
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
    title: "Ron DevSolutions",
    subtitle: "SYSTEM_ENGINEERING",
    desc: "Architecting high-performance Next.js systems with sub-second latency and sub-zero 404 errors.",
    href: "/rondevsolutions",
    label: "Initialize Dev Audit",
    accent: "from-emerald-500 to-cyan-500",
    tag: "CODE_NODE",
    icon: Terminal, // Pinalitan ko ng Terminal para mas "Dev" ang dating
  },
  {
    id: "core_02",
    title: "The Psychedelic Riffer",
    subtitle: "AUDIO_MASTERING",
    desc: "Professional audio post-production and high-gain guitar tracking for cinematic digital media.",
    href: "/thepsychedelicriffer",
    label: "Stream Transmission",
    accent: "from-emerald-400 to-zinc-900", // Dinikit ko sa brand color mo
    tag: "SONIC_VOID",
    icon: Mic2,
  },
  {
    id: "core_03",
    title: "Lizard Visuals",
    subtitle: "POST_PRODUCTION",
    desc: "Strategic video editing and motion design. Turning raw footage into high-conversion brand assets.",
    href: "/lizard-creative",
    label: "View Master Reel",
    accent: "from-emerald-600 to-indigo-900",
    tag: "VISION_CORE",
    icon: MonitorPlay,
  },
  {
    id: "core_04",
    title: "Digital Vault",
    subtitle: "ASSET_REPOSITORY",
    desc: "Premium system boilerplates, guitar IRs, and developer tools for rapid workflow deployment.",
    href: "/vault",
    label: "Access Repository",
    accent: "from-zinc-700 to-zinc-900",
    tag: "VAULT_01",
    icon: Package,
  },
];
