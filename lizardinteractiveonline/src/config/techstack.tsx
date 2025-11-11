// 1️⃣ First, import React and all icons
import React, { JSX } from "react";

import {
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiExpo,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiGraphql,
  SiCss,
  SiMobx,
  SiFirebase,
  SiFigma,
} from "@icons-pack/react-simple-icons";
import { AfterEffectsIcon, LightRoomIcon, PhotoshopIcon, PremiereProIcon } from "@/components/common/LizardComponents/LizardCustomIcons";



// 2️⃣ Define Tech interface
export interface Tech {
  label: string;
  icon: ((props: { className?: string }) => JSX.Element) | React.ReactNode;
  url?: string;
}

// 3️⃣ Web tech stack
export const webTechStack = [
  { label: "ReactJS", icon: (props: React.SVGProps<SVGSVGElement>) => <SiReact {...props} className={`${props.className} text-blue-400`} />, url: "https://reactjs.org/" },
  { label: "React Native", icon: (props: React.SVGProps<SVGSVGElement>) => <SiReact {...props} className={`${props.className} text-cyan-400`} />, url: "https://reactnative.dev/" },
  { label: "TypeScript", icon: (props: React.SVGProps<SVGSVGElement>) => <SiTypescript {...props} className={`${props.className} text-blue-600`} />, url: "https://www.typescriptlang.org/" },
  { label: "TailwindCSS", icon: (props: React.SVGProps<SVGSVGElement>) => <SiTailwindcss {...props} className={`${props.className} text-teal-400`} />, url: "https://tailwindcss.com/" },
  { label: "Next.js", icon: (props: React.SVGProps<SVGSVGElement>) => <SiNextdotjs {...props} className={`${props.className} text-white`} />, url: "https://nextjs.org/" },
  { label: "MongoDB", icon: (props: React.SVGProps<SVGSVGElement>) => <SiMongodb {...props} className={`${props.className} text-green-500`} />, url: "https://www.mongodb.com/" },
  { label: "Redux", icon: (props: React.SVGProps<SVGSVGElement>) => <SiRedux {...props} className={`${props.className} text-purple-600`} />, url: "https://redux.js.org/" },
  { label: "Supabase", icon: (props: React.SVGProps<SVGSVGElement>) => <SiSupabase {...props} className={`${props.className} text-green-400`} />, url: "https://supabase.com/" },
  { label: "Expo", icon: (props: React.SVGProps<SVGSVGElement>) => <SiExpo {...props} className={`${props.className} text-purple-500`} />, url: "https://expo.dev/" },
  { label: "Node.js", icon: (props: React.SVGProps<SVGSVGElement>) => <SiNodedotjs {...props} className={`${props.className} text-green-600`} />, url: "https://nodejs.org/" },
  { label: "JavaScript", icon: (props: React.SVGProps<SVGSVGElement>) => <SiJavascript {...props} className={`${props.className} text-yellow-400`} />, url: "https://www.javascript.com/" },
  { label: "HTML5", icon: (props: React.SVGProps<SVGSVGElement>) => <SiHtml5 {...props} className={`${props.className} text-orange-500`} />, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { label: "GraphQL", icon: (props: React.SVGProps<SVGSVGElement>) => <SiGraphql {...props} className={`${props.className} text-pink-500`} />, url: "https://graphql.org/" },
  { label: "CSS", icon: (props: React.SVGProps<SVGSVGElement>) => <SiCss {...props} className={`${props.className} text-blue-500`} />, url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { label: "MobX", icon: (props: React.SVGProps<SVGSVGElement>) => <SiMobx {...props} className={`${props.className} text-purple-400`} />, url: "https://mobx.js.org/" },
  { label: "Firebase", icon: (props: React.SVGProps<SVGSVGElement>) => <SiFirebase {...props} className={`${props.className} text-yellow-500`} />, url: "https://firebase.google.com/" },
  { label: "Figma", icon: (props: React.SVGProps<SVGSVGElement>) => <SiFigma {...props} className={`${props.className} text-pink-500`} />, url: "https://www.figma.com/" },
];

// 4️⃣ Multimedia / Adobe tools stack
export const multimediaStack: Tech[] = [
  { 
    label: "Lightroom", 
    icon: (props) => <LightRoomIcon {...props} className={` ${props?.className ?? ""}`} />, 
    url: "https://www.adobe.com/products/photoshop-lightroom.html" 
  },
  { 
    label: "Photoshop", 
    icon: (props) => <PhotoshopIcon {...props} className={` ${props?.className ?? ""}`} />, 
    url: "https://www.adobe.com/products/photoshop.html" 
  },
  { 
    label: "Premiere Pro", 
    icon: (props) => <PremiereProIcon {...props} className={` ${props?.className ?? ""}`} />, 
    url: "https://www.adobe.com/products/premiere.html" 
  },
  { 
    label: "After Effects", 
    icon: (props) => <AfterEffectsIcon {...props} className={` ${props?.className ?? ""}`} />, 
    url: "https://www.adobe.com/products/aftereffects.html" 
  },
];