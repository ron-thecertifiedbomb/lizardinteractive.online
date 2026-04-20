"use client";

export default function Hero({ homeContent }: { homeContent: any[] }) {
    const heading = homeContent.find(b => b.type === "heading");
    const highlightWord = heading?.highlight || "";
    const paragraph = homeContent.find(b => b.type === "paragraph");

    return (
        // Added max-w-screen-xl and overflow-hidden to prevent horizontal scroll
        <section className="mb-12 gap-4 md:mb-24 flex flex-col items-center lg:items-start w-full max-w-full overflow-hidden relative">
            {heading && (
                /* Changed text size to use clamp() 
                   Min: 3rem, Scalable: 10vw, Max: 8rem 
                   Added break-words and w-full
                */
                <h1 className="w-full text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter uppercase leading-[0.9] antialiased cursor-default break-words">
                    {highlightWord ? (
                        heading.content.split(highlightWord).map((part, i) => (
                            <span key={i} className="block max-w-full">
                                {part}
                                {i === 0 && (
                                    <span className="text-emerald-500 inline-block">
                                        {highlightWord}
                                    </span>
                                )}
                            </span>
                        ))
                    ) : (
                        <span className="block">{heading.content}</span>
                    )}
                </h1>
            )}

            {paragraph && (
                <p className="text-base md:text-xl text-zinc-500 max-w-2xl font-light text-center lg:text-left px-4 sm:px-0">
                    {paragraph.content}
                </p>
            )}
        </section>
    );
}