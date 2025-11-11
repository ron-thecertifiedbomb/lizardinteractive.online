import { create } from "zustand";
import type { AppData } from "@/types/appData";

interface NavigationStore {
  section: keyof AppData | null; // allow null
  setSection: (sectionKey: keyof AppData | null) => void;
  showPanel: boolean;
  setShowPanel: (value: boolean) => void;
  activePanelKey: string | null;
  setActivePanel: (panelKey: string | null) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  section: null, // 🔥 default to null
  setSection: (sectionKey) => set({ section: sectionKey }),
  showPanel: false,
  setShowPanel: (value) => set({ showPanel: value }),
  activePanelKey: null, // 🔥 also null by default
  setActivePanel: (panelKey) => set({ activePanelKey: panelKey }),
}));
