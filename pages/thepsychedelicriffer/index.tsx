"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion"; // Add this
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

declare global {
    interface Window {
        onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    }
}

const psychedelicStyles = `
    @keyframes psychedelic-pulse {
        0% { transform: scale(1) rotate(0deg); filter: brightness(100%) hue-rotate(0deg); }
        25% { transform: scale(1.05) rotate(1deg); filter: brightness(130%) hue-rotate(90deg) saturate(150%); }
        50% { transform: scale(1.08) rotate(0deg); filter: brightness(150%) hue-rotate(180deg) saturate(180%); }
        75% { transform: scale(1.05) rotate(-1deg); filter: brightness(130%) hue-rotate(270deg) saturate(150%); }
        100% { transform: scale(1) rotate(0deg); filter: brightness(100%) hue-rotate(360deg); }
    }
    @keyframes grain-drift {
        0% { transform: translate(0, 0); }
        10% { transform: translate(-1%, -1%); }
        100% { transform: translate(0, 0); }
    }
    .grain-overlay {
        position: fixed; top: -50%; left: -50%; width: 200%; height: 200%;
        background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
        opacity: 0.04; pointer-events: none; z-index: 50;
        animation: grain-drift 8s steps(10) infinite; filter: grayscale(100%) contrast(150%);
    }
    .skeleton-loading {
        background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
        background-size: 200% 100%; animation: shimmer 1.5s ease-in-out infinite;
    }
`;

const SpotifyEmbed = dynamic(
    () => Promise.resolve(({ onPlayStateChange }: { onPlayStateChange?: (playing: boolean) => void }) => {
        const [isReady, setIsReady] = useState(false);
        useEffect(() => {
            if (isReady) return;
            const script = document.createElement("script");
            script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
            script.async = true;
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = document.getElementById('spotify-embed');
                IFrameAPI.createController(element, { uri: 'spotify:album:3vzVZ2UJ9QuHJHvRxXCLki', width: '100%', height: '352' }, (EmbedController: any) => {
                    setIsReady(true);
                    EmbedController.addListener('playback_update', (e: any) => {
                        if (onPlayStateChange) onPlayStateChange(!e.data.isPaused);
                    });
                });
            };
            document.body.appendChild(script);
        }, [isReady, onPlayStateChange]);
        return (
            <div style={{ width: '100%', maxWidth: '800px', minHeight: '352px' }}>
                {!isReady && <div className="skeleton-loading" style={{ width: '100%', height: '352px', borderRadius: '12px' }} />}
                <div id="spotify-embed" style={{ width: '100%', minHeight: '352px', display: isReady ? 'block' : 'none' }} />
            </div>
        );
    }), { ssr: false }
);

export default function ThePsychedelicRifferPage() {
    const [isEntered, setIsEntered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const staticPreviewImage = "/thepsychedelicriffer.jpg";

    const handleEnter = () => {
        setIsEntered(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(() => { });
        }
    };

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-purple-500/30">
            <Head>
                <title>The Psychedelic Riffer | Enter the Void</title>
                <style dangerouslySetInnerHTML={{ __html: psychedelicStyles }} />
            </Head>

            <div className="grain-overlay" />

            <AnimatePresence mode="wait">
                {!isEntered ? (
                    /* --- LANDING / THE VOID ENTRANCE --- */
                    <motion.div
                        key="landing"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,40,40,0.5)_0%,_rgba(0,0,0,1)_80%)]" />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative z-10 text-center space-y-12"
                        >
                            <h1 className="font-gotham-thin text-white text-3xl md:text-5xl tracking-[0.5em] uppercase opacity-70">
                                The Vision is Live
                            </h1>
                            <button
                                onClick={handleEnter}
                                className="group relative px-16 py-5 border border-white/10 hover:border-white/60 transition-all duration-700 bg-black/40 backdrop-blur-sm"
                            >
                                <span className="relative z-10 tracking-[0.4em] text-white text-sm uppercase">
                                    Enter the Void
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* --- MAIN CONTENT / THE CASTLE --- */
                    <motion.main
                        key="main"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <ScreenContainer variant="dark" maxWidth="2xl">
                            <motion.div
                                layoutId="visualizer"
                                style={{
                                    position: 'relative', width: '100%', maxWidth: '1000px', aspectRatio: '16/9',
                                    margin: '2rem auto 0 auto', borderRadius: '24px', overflow: 'hidden',
                                    boxShadow: isPlaying ? '0 0 50px rgba(120, 119, 198, 0.4)' : '0 0 20px rgba(0,0,0,0.5)',
                                    transition: 'box-shadow 0.5s ease', backgroundColor: '#0a0a0a'
                                }}
                            >
                                <div className={isPlaying ? 'psychedelic-animate' : ''} style={{ width: '100%', height: '100%', position: 'relative' }}>
                                    <Image
                                        src={staticPreviewImage} alt="The Psychedelic Riffer" fill
                                        priority quality={85} onLoadingComplete={() => setImageLoaded(true)}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-12 pb-20 flex flex-col items-center w-full"
                            >
                                <SpotifyEmbed onPlayStateChange={setIsPlaying} />

                                <p className="mt-8 text-[12px] tracking-[2px] uppercase transition-colors duration-500"
                                    style={{ color: isPlaying ? '#8b5cf6' : '#444' }}>
                                    {isPlaying ? '🎵 PSYCHEDELIC MODE ACTIVE 🎵' : '⚡ PLAY A TRACK TO VISUALIZE ⚡'}
                                </p>
                            </motion.div>
                        </ScreenContainer>
                    </motion.main>
                )}
            </AnimatePresence>

            <audio ref={audioRef} src="/void-intro.mp3" loop />
        </div>
    );
}