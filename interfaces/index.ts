/**
 * SYSTEM_CORE: USER & SOCIAL
 * Handles authentication and community engagement.
 */
export interface User {
  name: string;
  picture: string;
  sub: string;
  email?: string;
}

export interface Comment {
  id: string;
  created_at: number; // Unix timestamp for precision
  url: string;
  text: string;
  user: User;
}

/**
 * SYSTEM_CORE: CONTENT ENGINE
 * Powers the Blog and Project sections for RonDevSolutions & The Riffer.
 */
export interface Post {
  slug?: string;
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  coverImage?: string; // Main frontmatter image
  contentImages?: string[]; // Inline assets
  [key: string]: any; // Flexible for future metadata
}

export interface BlogPost {
  _id: string;
  slug?: string;
  title: string;
  content: string; // HTML payload
  createdAt: string;
}

/**
 * SYSTEM_UTILITY: RESUME_BUILDER
 * Types for the PDF processing engine.
 */
export interface Personal {
  fullName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
}

export interface Experience {
  id: string | number;
  role?: string;
  company?: string;
  start?: string;
  end?: string;
  details?: string;
}

export interface Education {
  id: string | number;
  degree?: string;
  school?: string;
  start?: string;
  end?: string;
  details?: string;
}

export interface Reference {
  id: string | number;
  name?: string;
  relation?: string;
  contact?: string;
}

/**
 * SYSTEM_MONETIZATION: THE_VAULT / GEAR
 * Types for affiliate marketing and digital asset sales.
 */
export type GearCategory = "Hardware" | "Software" | "Accessories";

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: GearCategory;
  description: string;
  affiliateUrl: string;
  imageUrl?: string;
  isFavorite?: boolean;
}

/**
 * VAULT_ASSET: DIGITAL_GOODS
 * For your Premiere Pro templates, Tabs, and Code boilerplates.
 */
export interface VaultAsset {
  id: string;
  title: string;
  type: "MIDI" | "PDF" | "MOGRT" | "CODE" | "IR";
  price: number;
  downloadUrl?: string;
  previewUrl?: string;
}
