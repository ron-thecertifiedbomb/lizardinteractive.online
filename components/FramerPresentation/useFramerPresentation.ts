"use client";

import { PERFORMANCE_SLIDES } from "@/data/presentation/web";
import type { FramerSlide } from "./types";
import { usePresentation } from "./usePresentation";

/**
 * Thin wrapper around `usePresentation` that preserves the original
 * `useFramerPresentation` API while delegating all logic to the
 * reusable hook.
 */
export function useFramerPresentation() {
  return usePresentation<FramerSlide>({
    slides: PERFORMANCE_SLIDES as FramerSlide[],
    getQuickFacts: (slide, index, total) => [
      `Module ${String(index + 1).padStart(2, "0")} of ${String(total).padStart(
        2,
        "0",
      )}`,
      `Focus Area: ${slide.stats}`,
      `Outcome: ${slide.impact}`,
    ],
    getActionChecklist: (slide) => [
      `Review the "${slide.title}" concept`,
      "Validate with a real Lighthouse run",
      "Apply one optimization before next slide",
    ],
  });
}
