"use client";

import { motion } from "framer-motion";
import { FADE_IN, HERO_TITLE } from "../../../helpers/motion";



interface HeroProps {
    title: string;
    highlightWord?: string; // e.g., "Through"
    description: string;
    useMotion?: boolean;
}

export default function Hero({
    title,
    highlightWord,
    description,
    useMotion = true
}: HeroProps) {

    // Logic to handle the "Through" or any highlighted word coloring
    const renderTitle = () => {
        if (!highlightWord) return title;

        const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'));

        return parts.map((part, i) => (
            <span key={i} className={part.toLowerCase() === highlightWord.toLowerCase() ? "text-emerald-500" : ""}>
                {part}
            </span>
        ));
    };

    return (
        <section className="mb-12 md:mb-24 flex flex-col items-center lg:items-start w-full relative">
            <motion.h1
                initial={useMotion ? "initial" : false}
                animate={useMotion ? "animate" : false}
                variants={HERO_TITLE}
                className="text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black tracking-tighter text-center lg:text-left leading-[0.95] md:leading-[0.82] mb-6 md:mb-8 uppercase w-full break-words transform-gpu antialiased"
            >
                {renderTitle()}
            </motion.h1>

            <motion.p
                initial={useMotion ? "initial" : false}
                animate={useMotion ? "animate" : false}
                variants={FADE_IN}
                className="text-base md:text-xl text-zinc-500 max-w-4xl font-light text-center lg:text-left px-4 sm:px-0"
            >
                {description}
            </motion.p>
        </section>
    );
}