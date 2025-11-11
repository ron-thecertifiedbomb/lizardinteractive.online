import { create } from "zustand";
import { appData} from "@/config/appData";
import { AppData } from "@/types/appData";


interface AppDataStore {
  appData: AppData;
}


export const useAppDataStore = create<AppDataStore>(() => ({
  appData,
}));

