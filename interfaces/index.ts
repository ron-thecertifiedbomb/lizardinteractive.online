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



export type BlogPost = {
  slug?: string;
  _id: string;
  title: string;
  content: string; // HTML string
  createdAt: string;
};


// pdfPrinter.ts
export type Personal = {
  fullName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
};

export type Experience = {
  id: string | number;
  role?: string;
  company?: string;
  start?: string;
  end?: string;
  details?: string;
};

export type Education = {
  id: string | number;
  degree?: string;
  school?: string;
  start?: string;
  end?: string;
  details?: string;
};

export type Reference = {
  id: string | number;
  name?: string;
  relation?: string;
  contact?: string;
};