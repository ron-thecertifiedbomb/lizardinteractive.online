import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0a] text-white overflow-hidden mt-20">

            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Eyebrow Text */}
            <div className="z-10 mb-6 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
                <span className="text-green-400 font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
                    Lizrd Interactive Online • Performance Engineering
                </span>
            </div>

            {/* Main Aggressive Headline */}
            <h1 className="z-10 text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                I Build the Fastest 1% of the Web.
            </h1>

            {/* The Pain-Point Subheadline */}
            <p className="z-10 text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
                Stop losing mobile customers to bloated, slow-loading websites. I engineer lightning-fast custom web applications with a guaranteed 100/100 Google Lighthouse performance score.
            </p>

            {/* The Call to Action */}
            <div className="z-10 flex flex-col sm:flex-row gap-4 mb-16">
                <button className="bg-white text-black font-bold text-lg px-8 py-4 rounded-lg hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]">
                    Claim Your Free Performance Audit
                </button>
            </div>

            {/* Visual Proof: The Lighthouse Circles */}
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