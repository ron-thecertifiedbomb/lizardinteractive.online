import { ActiveComponent } from "@/store/ControlPanelStore";
import { AppData } from "@/types/appData";

export interface NavigationPanel {
  key: string;
  heading: string;
  overview: string;
  section: keyof AppData;
  isActive?: boolean;
}

export const navigationPanels: NavigationPanel[] = [
  {
    key: "overview",
    heading: "Overview",
    overview: "Lizard Interactive ocerview",
    section: "overview",
    isActive: false,
  },
  {
    key: "projects",
    heading: "Projects",
    overview: "Check out my projects",
    section: "projects",
    isActive: false,
  },
  {
    key: "services",
    heading: "Services",
    overview: "What I offer & technologies I work with",
    section: "services",
    isActive: false,
  },
  {
    key: "aboutme",
    heading: "About Me",
    overview: "About Lizard Interactive",
    section: "aboutme",
    isActive: false,
  },
];




export interface NavigationPanelMobile {
  title: string;
  component: ActiveComponent;
  icon: string;
  isActive: boolean;
}

export const navigationMobilePanels: NavigationPanelMobile[] = [
  {
    title: "Home",
    component: "home",
    icon: "home",
    isActive: false,
  },
  {
    title: "Maps",
    component: "map",
    icon: "map",
    isActive: false,
  },
  {
    title: "Translator",
    component: "translator",
    icon: "translator",
    isActive: false,
  },
  {
    title: "Currency",
    component: "currency",
    icon: "currency",
    isActive: false,
  },
];
