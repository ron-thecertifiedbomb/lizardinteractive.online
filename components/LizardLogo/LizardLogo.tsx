"use client";

import { motion, Variants } from "framer-motion";

export default function LizardLogo() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const drawVariants: Variants = {
        hidden: {
            // We start with pathLength at 0, but use 'offset' to flip the direction
            pathLength: 0,
            pathOffset: 1, // This pushes the start point to the end
            opacity: 0.2
        },
        visible: {
            pathLength: 1,
            pathOffset: 0, // This pulls the line back to the start
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1
                },
                pathOffset: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1
                },
                opacity: { duration: 0.01 }
            }
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <motion.svg
                viewBox="75 115 65 65"
                width="400"
                height="400"
                className="text-emerald-100"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    filter: `
                        drop-shadow(0px 0px 2px rgba(16, 185, 129, 0.9))
                        drop-shadow(0px 0px 4px rgba(16, 185, 129, 0.8))
                        drop-shadow(0px 0px 10px rgba(52, 211, 153, 0.7))
                        drop-shadow(0px 0px 24px rgba(5, 150, 105, 0.4))
                    `
                }}
            >
                {/* Outer Ring */}
                <motion.ellipse
                    cx="107.81747"
                    cy="146.51802"
                    rx="28.099249"
                    ry="28.96734"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    variants={drawVariants}
                />

                {/* Lizard Body */}
                <motion.path
                    d="M 107.22209,123.20609 87.026462,159.319 h 41.587358 l -10.16682,-17.15938 -7.13058,0.092 5.0144,9.61478 -16.377318,-0.092 12.236988,-20.33364 z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={drawVariants}
                />

                {/* Eye/Detail */}
                <motion.path
                    d="m 115.31126,137.00598 -4.16378,4.60293 h 7.01012 z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.0"
                    strokeLinecap="round"
                    variants={drawVariants}
                />
            </motion.svg>
        </div>
    );
}