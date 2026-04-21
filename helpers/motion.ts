import { Variants } from "framer-motion";


    export const containerVars: Variants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    };

    // Generic reveal animation for text elements
    const itemVars: Variants = {
      initial: { y: 30, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 90,
          damping: 20,
        },
      },
    };

    // Specialized variant for the emerald accent line
    const lineVars: Variants = {
      initial: { width: 0 },
      animate: {
        width: 40,
        transition: {
          duration: 1,
          ease: "circOut",
        },
      },
    };






export const STAGGER_CONTAINER: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const HERO_TITLE: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const FADE_IN: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};
