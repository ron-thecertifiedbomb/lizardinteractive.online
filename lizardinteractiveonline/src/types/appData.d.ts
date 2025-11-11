// src/types/appData.d.ts

export interface Items {
  id?: number;
  type?: string;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  techStack?: string[];
}

export interface Introduction {
  heading: string;
  content: string;
  items: Items[];
}

// About Me remains simple
export interface AboutMe {
  heading: string;
  content: string;
  items: Items[];
}

export interface AppData {
  overview: Overview;
  projects: Projects;
  services: Services;
  aboutme: AboutMe;
}
