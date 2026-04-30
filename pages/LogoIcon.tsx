import React from 'react';
import { motion } from 'framer-motion';

export default function LogoIcon({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.svg
            className={className}
            viewBox="0 0 47.801116 49.21283"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate="visible"
        >
            <g transform="translate(-157.91704,-315.55582)">
                <motion.path
                    style={{ fill: '#4ade80', stroke: 'none', strokeWidth: 0.204094 }}
                    d="m 181.37685,324.02074 -15.93936,27.22613 h 32.82269 l -8.02412,-12.93675 -5.6278,0.0693 3.95762,7.24873 -12.92575,-0.0693 9.658,-15.32988 z"
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 0.8, y: 0, transition: { duration: 0.6, ease: "backOut", delay: 0.5 } }
                    }}
                />
                <motion.path
                    style={{ fill: '#4ade80', strokeWidth: 0.204094 }}
                    d="m 187.56996,333.46091 -3.28623,3.47021 h 5.53269 z"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.4, delay: 0.8 } }
                    }}
                />
                <motion.ellipse
                    style={{ display: 'inline', fill: 'none', stroke: '#4ade80', strokeWidth: 2.10545 }}
                    cx="181.8176"
                    cy="340.16223"
                    rx="22.847834"
                    ry="23.55369"
                    variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
                    }}
                />
            </g>
        </motion.svg>
    );
}
