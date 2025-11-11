// stores/LocationStore.ts
import { create } from "zustand";

interface LocationState {
  coordinates: { lat: number; lng: number } | null;
  city: string | null;
  country: string | null;
  zipcode: string | null;
  loading: boolean;
  error: string | null;

  fetchLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: null,
  city: null,
  country: null,
  zipcode: null,
  loading: false,
  error: null,

  fetchLocation: async () => {
    set({ loading: true, error: null });

    if (!navigator.geolocation) {
      set({ error: "Geolocation not supported", loading: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        set({ coordinates: { lat: latitude, lng: longitude } });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            null;
          const country = data.address?.country || null;
          const zipcode = data.address?.postcode || null;

          set({ city, country, zipcode, loading: false });
        } catch (err) {
          console.error(err);
          set({ error: "Failed to fetch address", loading: false });
        }
      },
      (err) => {
        console.error(err);
        set({ error: "Unable to retrieve your location", loading: false });
      }
    );
  },
}));
