"use client";



import { Slide } from "@/types/slides";
import { usePresentation } from "../FramerPresentation/usePresentation";
import { CASE_STUDY_CIUDAD_REAL } from "@/data/presentation/ciudadSlides";

export function useCaseStudyPresentation() {
  return usePresentation<Slide>({
    slides: CASE_STUDY_CIUDAD_REAL,
    getQuickFacts: (slide, index, total) => [
      `Case Study ${String(index + 1).padStart(2, "0")} of ${String(
        total,
      ).padStart(2, "0")}`,
      `Metric: ${slide.stats}`,
      `Outcome: ${slide.impact}`,
    ],
    getActionChecklist: (slide) => [
      `Review the "${slide.title}" case study`,
      `Key insight: ${slide.tip}`,
      "Identify one pattern to apply to your current project",
    ],
  });
}
