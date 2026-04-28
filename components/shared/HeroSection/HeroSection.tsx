import React from 'react';
import MainHeader from '../MainHeader/MainHeader';
// <-- Update this path if MainHeader is in a different folder

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0a] text-white overflow-hidden mt-20 rounded-2xl">

            {/* 1. The Reusable Header Component */}
            <MainHeader
                eyebrow="Lizrd Interactive Online • Performance Engineering"
                headline="I Build the Fastest 1% of the Web."
                subheadline="Stop losing mobile customers to bloated, slow-loading websites. I engineer lightning-fast custom web applications with a guaranteed 100/100 Google Lighthouse performance score."
            />

            {/* 2. The Call to Action */}
            <div className="z-10 flex flex-col sm:flex-row gap-4 mb-16 mt-4">
                <button className="bg-white text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]">
                    Claim Your Free Performance Audit
                </button>
            </div>

            {/* 3. Visual Proof: The Lighthouse Circles */}
            <div className="z-10 w-full max-w-3xl border-t border-zinc-800 pt-10">
                <p className="text-zinc-500 text-sm mb-6 font-mono uppercase tracking-widest">Verified Metrics</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">

                    <LighthouseMetric score={100} label="Performance" />
                    <LighthouseMetric score={100} label="Accessibility" />
                    <LighthouseMetric score={100} label="Best Practices" />
                    <LighthouseMetric score={100} label="SEO" />

                </div>
            </div>
        </section>
    );
}

// Reusable component for the green Lighthouse circles
function LighthouseMetric({ score, label }: { score: number, label: string }) {
    return (
        <div className="flex flex-col items-center gap-3">
            {/* The exact Google Lighthouse Green Circle style */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-green-500 flex items-center justify-center text-green-400 font-mono text-xl md:text-2xl font-bold bg-green-500/5 shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                {score}
            </div>
            <span className="text-zinc-400 text-xs md:text-sm font-medium tracking-wide">
                {label}
            </span>
        </div>
    );
}