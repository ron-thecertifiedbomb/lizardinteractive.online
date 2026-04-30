"use client";

import { FramerPresentationPanels } from "./FramerPresentationPanels";
import { FramerPresentationScreen } from "./FramerPresentationScreen";
import { useFramerPresentation } from "./useFramerPresentation";

export function FramerPresentation() {
    const {
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
    } = useFramerPresentation();

    return (
        <div className="mx-auto w-full max-w-5xl space-y-3 px-3 py-1 font-sans  sm:px-4 sm:py-4">
            <FramerPresentationScreen
                currentSlide={currentSlide}
                currentIndex={currentIndex}
                slideCount={slideCount}
                progress={progress}
                isPlaying={isPlaying}
                onPrev={prevSlide}
                onNext={nextSlide}
                onTogglePlayback={togglePlayback}
            />

            <FramerPresentationPanels
                slides={slides}
                currentSlide={currentSlide}
                currentIndex={currentIndex}
                showPanels={showPanels}
                quickFacts={quickFacts}
                actionChecklist={actionChecklist}
                onSelectSlide={selectSlide}
                onTogglePanels={togglePanels}
            />
        </div>
    );
}