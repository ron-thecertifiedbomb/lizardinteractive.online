    import React from 'react';
    import ScreenContainer from '@/components/shared/ScreenContainer/ScreenContainer';
    import MainHeader from '@/components/shared/MainHeader/MainHeader';
    import ResultCard from '@/components/shared/ResultCard/ResultCard';
    import MetaHead from '@/components/MetaHead/MetaHead';
    import { caseStudies } from '@/data/lists/caseStudies';



    export default function ResultsPage() {
        return (
            <>
                <MetaHead
                    data={{
                        title: "Case Studies | Lizrd Interactive",
                        description: "Proven performance audits and 100/100 Lighthouse results for high-stakes freelance projects."
                    }}
                />

                <ScreenContainer className="pt-16 md:pt-10">

                    {/* --- The Strategy Header --- */}
                    <div className="mb-20">
                        <MainHeader
                            eyebrow="The Performance Ledger"
                            headline="Verified Results"
                            subheadline="I don't just build websites; I engineer speed. Explore the technical audits and performance benchmarks from my latest freelance deployments."
                        />
                    </div>

                    {/* --- The Proof Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4 md:px-0">
                        {caseStudies.map((study) => (
                            <ResultCard
                                key={study.client}
                                // Ensure projectType is passed correctly
                                projectType={study.projectType}
                                {...study}
                            />
                        ))}
                    </div>

                    {/* --- Footer CTA --- */}
                    <div className="text-center py-20 border-t border-zinc-900">
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">Ready for your audit?</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10">
                            Is your site costing <br className="hidden md:block" />
                            you customers?
                        </h2>
                        <a
                            href="mailto:ronan@lizardinteractive.online?subject=Performance Audit Request"
                            className="inline-block bg-emerald-500 text-black font-black py-4 px-10 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                        >
                            GET A FREE PERFORMANCE AUDIT
                        </a>
                    </div>

                </ScreenContainer>
            </>
        );
    }