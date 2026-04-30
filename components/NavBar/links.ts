import { Briefcase, Pencil, LayoutDashboard, Wrench, Info } from "lucide-react";

export const primaryLinks = [
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/blogs", label: "Blog", icon: Pencil },
];

export const secondaryLinks = [
  { href: "/casestudy", label: "Case Studies", icon: LayoutDashboard },
  { href: "/utilities", label: "Utilities", icon: Wrench },
  { href: "/about", label: "About", icon: Info },
];

// A combined list for the mobile menu
export const allLinks = [...primaryLinks, ...secondaryLinks];
