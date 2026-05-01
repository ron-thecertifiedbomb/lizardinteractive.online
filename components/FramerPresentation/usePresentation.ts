"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AUTOPLAY_INTERVAL_MS, PROGRESS_MAX } from "./constants";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Minimum shape every slide must satisfy. */
export interface BaseSlide {
  title: string;
}

export interface UsePresentationOptions<TSlide extends BaseSlide> {
  /** The slides to present. */
  slides: TSlide[];

  /**
   * Derive the "quick facts" panel content from the current slide.
   * Falls back to a simple "Slide N of M" line when omitted.
   */
  getQuickFacts?: (slide: TSlide, index: number, total: number) => string[];

  /**
   * Derive the "action checklist" panel content from the current slide.
   * Falls back to a generic prompt when omitted.
   */
  getActionChecklist?: (
    slide: TSlide,
    index: number,
    total: number,
  ) => string[];

  /** Override the autoplay interval (ms). Defaults to AUTOPLAY_INTERVAL_MS. */
  autoplayIntervalMs?: number;

  /** Override the progress resolution. Defaults to PROGRESS_MAX. */
  progressMax?: number;
}

export interface UsePresentationReturn<TSlide extends BaseSlide> {
  slides: TSlide[];
  slideCount: number;
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  showPanels: boolean;
  currentSlide: TSlide;
  quickFacts: string[];
  actionChecklist: string[];
  nextSlide: () => void;
  prevSlide: () => void;
  selectSlide: (index: number) => void;
  togglePlayback: () => void;
  togglePanels: () => void;
}

// ─── Default helpers ──────────────────────────────────────────────────────────

function defaultQuickFacts<TSlide extends BaseSlide>(
  _slide: TSlide,
  index: number,
  total: number,
): string[] {
  return [
    `Slide ${String(index + 1).padStart(2, "0")} of ${String(total).padStart(
      2,
      "0",
    )}`,
  ];
}

function defaultActionChecklist<TSlide extends BaseSlide>(
  slide: TSlide,
  _index: number,
  _total: number,
): string[] {
  return [`Review the "${slide.title}" slide`];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePresentation<TSlide extends BaseSlide>({
  slides,
  getQuickFacts = defaultQuickFacts,
  getActionChecklist = defaultActionChecklist,
  autoplayIntervalMs = AUTOPLAY_INTERVAL_MS,
  progressMax = PROGRESS_MAX,
}: UsePresentationOptions<TSlide>): UsePresentationReturn<TSlide> {
  const slideCount = slides.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPanels, setShowPanels] = useState(false);

  // ── Navigation ────────────────────────────────────────────────────────────

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
    setProgress(0);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
    setProgress(0);
  }, [slideCount]);

  const selectSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const togglePlayback = useCallback(() => setIsPlaying((prev) => !prev), []);
  const togglePanels = useCallback(() => setShowPanels((prev) => !prev), []);

  // ── Autoplay ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= progressMax) {
          nextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, autoplayIntervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, autoplayIntervalMs, progressMax]);

  // ── Derived state ─────────────────────────────────────────────────────────

  const currentSlide = slides[currentIndex];

  const quickFacts = useMemo(
    () => getQuickFacts(currentSlide, currentIndex, slideCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSlide, currentIndex, slideCount],
  );

  const actionChecklist = useMemo(
    () => getActionChecklist(currentSlide, currentIndex, slideCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSlide, currentIndex, slideCount],
  );

  return {
    slides,
    slideCount,
    currentIndex,
    isPlaying,
    progress,
    showPanels,
    currentSlide,
    quickFacts,
    actionChecklist,
    nextSlide,
    prevSlide,
    selectSlide,
    togglePlayback,
    togglePanels,
  };
}
