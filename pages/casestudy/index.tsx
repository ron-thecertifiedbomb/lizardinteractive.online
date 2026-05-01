"use client";

import MetaHead from "@/components/MetaHead/MetaHead";
import CaseStudyComponent from "@/components/shared/CaseStudyComponent/CaseStudyComponent";
import MainHeader from "@/components/shared/MainHeader/MainHeader";
import ScreenContainer from "@/components/shared/ScreenContainer/ScreenContainer";
import { caseStudies, caseStudyPageContent } from "@/data/lists/caseStudies";


export default function CaseStudiesPage() {
    // Destructure for cleaner access
    const { meta, header } = caseStudyPageContent;

    return (
        <ScreenContainer className="relative">
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
            {/* Subtle Background Glow (Scaled for mobile so it doesn't cause overflow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
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