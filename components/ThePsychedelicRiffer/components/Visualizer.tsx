"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface VisualizerProps {
    isPlaying: boolean;
    heroImage: string;
    artistName: string;
    accentColor?: string;
}

export default function Visualizer({
    isPlaying,
    heroImage,
    artistName,
    accentColor = "rgba(120, 119, 198, 0.4)"
}: VisualizerProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="relative w-full max-w-[1000px] aspect-video mx-auto mt-8 rounded-[24px] overflow-hidden bg-zinc-950 shadow-2xl transition-shadow duration-700"
            style={{
                boxShadow: isPlaying ? `0 0 50px ${accentColor}` : '0 0 20px rgba(0,0,0,0.5)'
            }}>

            {/* THE MAIN IMAGE LAYER */}
            <div className={`relative w-full h-full transition-all duration-[2000ms] ${isPlaying ? 'animate-[psychedelic-pulse_8s_infinite]' : ''}`}>
                <Image
                    src={heroImage}
                    alt={artistName}
                    fill
                    priority
                    quality={90}
                    onLoadingComplete={() => setImageLoaded(true)}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1000px"
                />
            </div>

            {/* OVERLAY EFFECTS WHEN PLAYING */}
            {isPlaying && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    {/* Central Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(120,119,198,0.3),transparent)] animate-pulse" />

                    {/* Gothic Ring Effect */}
                    <div className="absolute inset-[10%] rounded-full border border-purple-500/20 animate-[ping_3s_infinite]" />
                </motion.div>
            )}

            {/* LOADING SKELETON */}
            {!imageLoaded && (
                <div className="absolute inset-0 skeleton-loading" />
            )}
        </div>
    );
}