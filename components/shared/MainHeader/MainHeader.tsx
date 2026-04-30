import React from 'react';

interface MainHeaderProps {
    eyebrow: string;
    headline: string;
    subheadline: string;
}

export default function MainHeader({ eyebrow, headline, subheadline }: MainHeaderProps) {
    return (
        <div className="relative flex flex-col items-center justify-center text-center px-4 w-full mb-16">

            {/* Subtle Background Glow (Scaled for mobile so it doesn't cause overflow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            {/* Eyebrow Text */}
            <div className="z-10 mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-green-500/30 bg-green-500/10 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                <span className="text-green-400 font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-center block">
                    {eyebrow}
                </span>
            </div>

            {/* Main Aggressive Headline (Scaled down for mobile, scales up on md/lg) */}
            <h1 className="z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tighter max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 leading-tight">
                {headline}
            </h1>

            {/* The Pain-Point Subheadline (Scaled for readability on small screens) */}
            <p className="z-10 text-base sm:text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 max-w-2xl leading-relaxed px-2">
                {subheadline}
            </p>

        </div>
    );
}