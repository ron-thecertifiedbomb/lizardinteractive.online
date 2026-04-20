
"use client";

export default function Hero({ homeContent }: { homeContent: any[] }) {
    const heading = homeContent.find(b => b.type === "heading");
    const highlightWord = "Interactive"; 
    const paragraph = homeContent.find((b, i) => b.type === "paragraph" && i === 1);

    return (
        <section className="mb-12 gap-4 md:mb-24 flex flex-col items-center lg:items-start w-full relative">
            {heading && (
                <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.95] antialiased cursor-default">
                    {heading.content.split(highlightWord).map((part, i) => (
                        <span key={i} className="block">
                            {part}
                            {/* This span becomes emerald on hover of the H1 */}
                            {i === 0 && (
                                <span className="text-emerald-500">
                                    {highlightWord}
                                </span>
                            )}
                        </span>
                    ))}
                </h1>
            )}

            {paragraph && (
                <p className="text-base md:text-xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0">
                    {paragraph.content}
                </p>
            )}
{/* 
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8 mb-8">
                {["40%+ Conv. Lift", "2x Organic Traffic", "Core Web Vitals ✓", "SEO First Page"].map((text, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-800 rounded-full bg-black/50 backdrop-blur-sm">
                        <div className={`w-1 h-1 bg-emerald-500 rounded-full ${i === 0 ? 'animate-pulse' : ''}`} />
                        <span className="text-[8px] md:text-[9px] font-mono text-zinc-400 tracking-wide uppercase">{text}</span>
                    </div>
                ))}
            </div> */}

            {/* <div className="text-center lg:text-left">
                <p className="text-[8px] md:text-[9px] font-mono text-emerald-500/70 tracking-[0.4em] uppercase">
                    [ select_your_growth_service ]
                </p>
            </div> */}
        </section>
    );
}