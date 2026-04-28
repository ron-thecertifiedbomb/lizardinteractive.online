import React from 'react';

interface ImpactBannerProps {
    leftEyebrow: string;
    leftTopLine: string;
    leftBottomLine: string;
    leftStrikethrough?: boolean; // Optional: toggles the crossed-out effect
    rightEyebrow: string;
    rightTopLine: string;
    rightBottomLine: string;
}

export default function ImpactBanner({
    leftEyebrow,
    leftTopLine,
    leftBottomLine,
    leftStrikethrough = false,
    rightEyebrow,
    rightTopLine,
    rightBottomLine,
}: ImpactBannerProps) {
    return (
        <div className="w-full border-y border-zinc-900 bg-zinc-950/50 py-10 my-16 relative overflow-hidden">
            {/* Subtle background glow for the divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[50px] bg-emerald-500/5 blur-[60px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left relative z-10">

                {/* Left Side: The Problem / Stat */}
                <div className="flex-1">
                    <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">
                        {leftEyebrow}
                    </h3>
                    <p className="text-white text-xl md:text-2xl font-bold tracking-tight">
                        {leftTopLine} <br className="hidden md:block" />
                        <span
                            className={`text-emerald-500 ${leftStrikethrough ? "line-through decoration-emerald-500/30" : ""}`}
                        >
                            {leftBottomLine}
                        </span>
                    </p>
                </div>

                {/* Vertical Separator (Hidden on mobile) */}
                <div className="hidden md:block w-px h-16 bg-zinc-800"></div>

                {/* Horizontal Separator (Mobile only) */}
                <div className="block md:hidden w-16 h-px bg-zinc-800 my-2"></div>

                {/* Right Side: The Solution / Guarantee */}
                <div className="flex-1 md:text-right">
                    <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">
                        {rightEyebrow}
                    </h3>
                    <p className="text-white text-xl md:text-2xl font-bold tracking-tight">
                        {rightTopLine} <br className="hidden md:block" />
                        <span className="text-emerald-500">
                            {rightBottomLine}
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}