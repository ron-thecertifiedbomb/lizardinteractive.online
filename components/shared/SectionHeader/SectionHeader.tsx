import { FADE_IN_UP, HERO_TITLE, STAGGER_CONTAINER } from "@/helpers/motion";
import { motion } from "framer-motion";

interface SectionHeaderProps {
    label?: string;
    title: string;
    highlight?: string;
    description?: string;
}

export default function SectionHeader({
    label = "Lizard Interactive Online",
    title,
    highlight,
    description
}: SectionHeaderProps) {

    return (
        <motion.header
            variants={STAGGER_CONTAINER}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="relative py-16 border-b border-white/5 mb-16 overflow-hidden"
        >
            {/* 1. Label with Emerald Accent Line */}
            <div className="flex items-center gap-4 mb-6">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2px] bg-emerald-500"
                />
                <motion.div variants={HERO_TITLE}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500/70">
                        {label}
                    </span>
                </motion.div>
            </div>

            {/* 2. Main Heading with Original Highlight Color */}
            <div className="overflow-hidden">
                <motion.h2
                    variants={HERO_TITLE}
                    className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white"
                >
                    {title}{" "}
                    {highlight && (
                        <span className="text-emerald-500">
                            {highlight}
                        </span>
                    )}
                </motion.h2>
            </div>

            {/* 3. Description with Emerald Border Accent */}
            {description && (
                <div className="overflow-hidden">
                    <motion.p
                        variants={HERO_TITLE}
                        className="text-zinc-500 mt-8 max-w-2xl font-light leading-relaxed text-base md:text-lg border-l border-emerald-500/30 pl-6 py-1"
                    >
                        {description}
                    </motion.p>
                </div>
            )}

            {/* Background Decorative Detail (Watermark) */}
            <motion.div
                variants={FADE_IN_UP}
                className="absolute -right-4 top-0 -z-10 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none uppercase"
            >
                {title.substring(0, 2)}
            </motion.div>
        </motion.header>
    );
}