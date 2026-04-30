"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import CaseStudyComponent from "@/components/shared/CaseStudyComponent/CaseStudyComponent";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { caseStudies, caseStudyPageContent } from "@/data/case-study-data";

export default function CaseStudyPage() {
    // Destructure for cleaner access
    const { meta, header } = caseStudyPageContent;

    return (
        <ScreenContainer>
            <MetaHead
                data={{
                    title: meta.title,
                    description: meta.description
                }}
            />

            {/* The Main Header now consumes dynamic page content */}
            <MainHeader
                eyebrow={header.eyebrow}
                headline={header.headline}
                subheadline={header.subheadline}
            />

            {/* Map through all studies to render the CaseStudyComponent for each */}
            <div className="flex flex-col gap-20 pb-20">
                {caseStudies.map((study, index) => (
                    <div key={study.id} className="relative group">
                        {/* Optional: Killer UI Flair - Large background index number */}
                        <div className="hidden lg:block absolute -left-10 top-0 text-zinc-900/40 font-mono text-8xl font-bold  pointer-events-none">
                            0{index + 1}
                        </div>

                        <CaseStudyComponent study={study} />

                        {/* Animated Gradient Separator */}
                        {index !== caseStudies.length - 1 && (
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />
                        )}
                    </div>
                ))}
            </div>
        </ScreenContainer>
    );
}