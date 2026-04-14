// data/gearList.ts
import { GearItem } from "../interfaces";

export const gearList: GearItem[] = [
  {
    id: "guitar-01",
    name: "Wolfgang® WG Standard",
    brand: "EVH",
    category: "Hardware",
    description:
      "The 'baked' maple neck and Wolfgang pickups provide the clarity and sustain needed for both high-gain leads and complex ambient layers.",
    affiliateUrl: "https://amzn.to",
  },
  {
    id: "guitar-02",
    name: "Les Paul Classic",
    brand: "Epiphone",
    category: "Hardware",
    description:
      "Heritage Cherry Sunburst finish. Featuring Alnico Classic PRO™ humbuckers for that timeless sustain and warmth—perfect for thick, psychedelic guitar tones.",
    affiliateUrl: "https://amzn.to",
  },
  {
    id: "interface-01",
    name: "Resolv Se",
    brand: "Samson",
    category: "Hardware",
    description:
      "The active monitor I use for tracking 100 BPM ambient textures with low latency.",
    affiliateUrl: "https://amzn.to/your-link",
  },
  {
    id: "directbox-01",
    name: "Side Kick Passive Direct Box DIB-443",
    brand: "Hosa Tecnhnology",
    category: "Hardware",
    description: "Essential for my high-gain and atmospheric guitar tones.",
    affiliateUrl:
      "https://pluginboutique.com/product/2-Effects/18-Amp-Simulator/7244-AmpliTube-5/?a_aid=YOUR_ID",
  },
  {
    id: "strings-01",
    brand: "Elixir",
    name: "Electric Nanoweb Super Light",
    category: "Accessories",
    description:
      "09-42 gauge. These last forever and keep the tone bright for ambient textures and recording.",
    affiliateUrl: "https://amzn.to/your-elixir-link", // Replace with your Amazon or Sweetwater affiliate link
  },
  {
    id: "headphones-01",
    name: "Major V",
    brand: "Marshall",
    category: "Hardware",
    description:
      "Bluetooth headphones with 100+ hours of battery. I use these for critical listening and reference checking my ambient mixes on the go.",
    affiliateUrl: "https://amzn.to",
  },
];
