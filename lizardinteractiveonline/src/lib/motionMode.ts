import { Transition } from "framer-motion";

// Slide horizontally with smooth fade
export const slideSmooth: {
  initial: { opacity: number; x: number };
  animate: { opacity: number; x: number };
  transition: Transition;
} = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// Slide vertically with fade
export const slideUp: {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: Transition;
} = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

// Simple fade in
export const fadeIn: {
  initial: { opacity: number };
  animate: { opacity: number };
  transition: Transition;
} = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.3, ease: "easeOut" },
};

// Slide down with fade
export const slideDown: {
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: Transition;
} = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" },
};

// Scale in from 0
export const scaleIn: {
  initial: { opacity: number; scale: number };
  animate: { opacity: number; scale: number };
  transition: Transition;
} = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// Rotate in with fade
export const rotateIn: {
  initial: { opacity: number; rotate: number };
  animate: { opacity: number; rotate: number };
  transition: Transition;
} = {
  initial: { opacity: 0, rotate: -15 },
  animate: { opacity: 1, rotate: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

// Slide left with fade
export const slideLeft: {
  initial: { opacity: number; x: number };
  animate: { opacity: number; x: number };
  transition: Transition;
} = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" },
};

// Slide right with fade
export const slideRight: {
  initial: { opacity: number; x: number };
  animate: { opacity: number; x: number };
  transition: Transition;
} = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: "easeOut" },
};

// Bounce in
export const bounceIn: {
  initial: { scale: number; opacity: number };
  animate: { scale: number; opacity: number };
  transition: Transition;
} = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
};
