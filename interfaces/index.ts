export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Post = {
  slug?: string;
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  coverImage?: string; // ✅ main cover image (frontmatter)
  contentImages?: string[]; // ✅ optional: inline markdown images (if you want to extract them)
  [key: string]: any; // keep it flexible for future frontmatter fields
};
