import { AppData } from "@/types/appData";

export const appData: AppData = {
  overview: {
    heading: "Overview",
    content:
      "This is the LizardInteractive portfolio — my own business. I am a creative and passionate individual with a strong love for learning.",
    items: [
      {
        title: "Lizard Interactive Story",
        description:
          "I am a creative and passionate individual with a strong love for learning. I thrive on exploring new ideas, embracing challenges, and constantly growing both personally and professionally.",
      },
    ],
  },

  projects: {
    heading: "Projects",
    content: "Here are some of my projects showcasing my work:",
    items: [
      {
        title: "Project One",
        description: "A modern web app built with React and Next.js.",
        imageSrc: "/assets/project1.png",
        imageAlt: "Screenshot of Project One",
      },
      {
        title: "Project Two",
        description: "A mobile app created using React Native and Expo.",
        imageSrc: "/assets/project2.png",
        imageAlt: "Screenshot of Project Two",
      },
      {
        title: "Project Three",
        description:
          "Fullstack application with Node.js, MongoDB, and Supabase.",
        imageSrc: "/assets/project3.png",
        imageAlt: "Screenshot of Project Three",
      },
    ],
  },

  services: {
    heading: "Services",
    content: "Here are my core skills and technologies I work with:",
    items: [
      {
        type: "Web Development",
        title: "Web Development",
        description:
          "Building modern, responsive websites using React, Next.js, and TailwindCSS.",
        techStack: [
          "ReactJS",
          "Next.js",
          "TailwindCSS",
          "TypeScript",
          "Redux",
          "MobX",
          "GraphQL",
          "CSS",
          "HTML5",
        ],
      },
      {
        type: "Mobile Development",
        title: "Mobile Development",
        description:
          "Creating cross-platform mobile apps with React Native for both iOS and Android.",
        techStack: [
          "React Native",
          "Expo",
          "TypeScript",
          "Redux",
          "MobX",
          "TailwindCSS",
        ],
      },
      {
        type: "Fullstack Application",
        title: "Fullstack Application",
        description:
          "Developing scalable fullstack applications with seamless frontend and backend integration.",
        techStack: [
          "ReactJS",
          "Next.js",
          "Node.js",
          "MongoDB",
          "Supabase",
          "GraphQL",
          "TypeScript",
          "TailwindCSS",
        ],
      },
      {
        type: "Video Editing",
        title: "Video Editing",
        description:
          "Producing high-quality video content with professional editing, transitions, and effects.",
        techStack: [
          "Photoshop",
          "Premiere Pro",
          "After Effects",
          "Figma",
          "Lightroom",
        ],
      },
    ],
  },

  aboutme: {
    heading: "About Me",
    content:
      "I am a creative and passionate individual with a strong love for learning. I thrive on exploring new ideas, embracing challenges, and constantly growing both personally and professionally.",
    items: [
      {
        title: "About Lizard Interactive",
        description:
          "I am a creative and passionate individual with a strong love for learning. I thrive on exploring new ideas, embracing challenges, and constantly growing both personally and professionally.",
      },
    ],
  },
};

export const profile = [
  {
    label: "corporation",
    value: "lizard interactive",
    labelProps: {
      className: "text-[16px] uppercase  bg-black/70 px-2 py-1 ",
      children: "name",
    },
    valueProps: {
      className: " text-[12px] text-[#00ff88]  bg-black/70 px-2 py-1 uppercase",
      children: "name",
    },
  },

  {
    label: "category",
    value: "Multimedia Solutions",
    labelProps: {
      className: "text-[16px]   uppercase ",
      children: "name",
    },
    valueProps: {
      className: " lg:text-[14px]   text-[#00ff88] uppercase",
      children: "category",
    },
  },

  {
    label: "Location",
    value: "Philippines",
    labelProps: {
      className: "text-[16px] uppercase ",
      children: "name",
    },
    valueProps: {
      className: "  text-[12px] text-[#00ff88] uppercase",
      children: "Location",
    },
  },

  {
    label: "contact us",
    value: "inquiry",
    labelProps: {
      className: "text-[10px] sm:text-[14px] lg:text-[16px] mb-1   uppercase ",
      children: "availability",
    },
    valueProps: {
      className:
        " lg:text-[14px]  inline-block border-2 bg-[#00ff88] text-black p-1 uppercase",
      children: "availability",
    },
  },
  {
    label: "email",
    value: "open connection",
    labelProps: {
      className: "text-[10px] sm:text-[14px] lg:text-[16px] uppercase mb-1  ",
      children: "social",
    },
    valueProps: {
      className:
        " lg:text-[14px]  inline-block border-2 border-[#00ff88] p-1 uppercase",
      children: "social",
    },
  },
];

export const tools = [
  {
    label: "Maps",
    value: "open map",
    labelProps: { className: "text-[16px] uppercase ", children: "name" },
    valueProps: {
      className: " text-[12px] text-[#E84A4A] uppercase",
      children: "name",
    },
  },

  {
    label: "category",
    value: "Multimedia Solutions",
    labelProps: { className: "text-[16px] uppercase ", children: "name" },
    valueProps: {
      className: " lg:text-[14px]   text-[#E84A4A] uppercase",
      children: "category",
    },
  },

  {
    label: "Location",
    value: "Philippines",
    labelProps: { className: "text-[16px] uppercase ", children: "name" },
    valueProps: {
      className: "  text-[12px] text-[#00ff88] uppercase",
      children: "Location",
    },
  },

  {
    label: "contact us",
    value: "inquiry",
    labelProps: {
      className: "text-[10px] sm:text-[14px] lg:text-[16px] mb-1  uppercase ",
      children: "availability",
    },
    valueProps: {
      className:
        " lg:text-[14px]  inline-block border-2 bg-[#E84A4A] text-black p-1",
      children: "availability",
    },
  },
  {
    label: "email",
    value: "open connection",
    labelProps: {
      className: "text-[10px] sm:text-[14px] lg:text-[16px] uppercase mb-1 ",
      children: "social",
    },
    valueProps: {
      className: " lg:text-[14px]  inline-block border-2 border-[#E84A4A] p-1",
      children: "social",
    },
  },
];
