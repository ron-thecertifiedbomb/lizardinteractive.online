"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

declare global {
    interface Window {
        onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    }
}

// CSS-only animations (includes your original psychedelic styles + reveal transition + NEW GRAY MOTION)
const psychedelicStyles = `
    @keyframes psychedelic-pulse {
        0% { transform: scale(1) rotate(0deg); filter: brightness(100%) hue-rotate(0deg); }
        25% { transform: scale(1.05) rotate(1deg); filter: brightness(130%) hue-rotate(90deg) saturate(150%); }
        50% { transform: scale(1.08) rotate(0deg); filter: brightness(150%) hue-rotate(180deg) saturate(180%); }
        75% { transform: scale(1.05) rotate(-1deg); filter: brightness(130%) hue-rotate(270deg) saturate(150%); }
        100% { transform: scale(1) rotate(0deg); filter: brightness(100%) hue-rotate(360deg); }
    }
    
    @keyframes glow-pulse {
        0% { opacity: 0; }
        50% { opacity: 0.8; }
        100% { opacity: 0; }
    }
    
    @keyframes ring-pulse {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.5); opacity: 0; }
    }
    
    /* NEW: Grayish Grain/Smoke Motion */
    @keyframes grain-drift {
        0% { transform: translate(0, 0); }
        10% { transform: translate(-1%, -1%); }
        20% { transform: translate(1%, 1%); }
        30% { transform: translate(-2%, -2%); }
        40% { transform: translate(2%, 2%); }
        50% { transform: translate(-1%, 1%); }
        60% { transform: translate(1%, -1%); }
        70% { transform: translate(-2%, 1%); }
        80% { transform: translate(2%, -1%); }
        90% { transform: translate(-1%, 2%); }
        100% { transform: translate(0, 0); }
    }

    .grain-overlay {
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png'); /* Subtle gray texture */
        opacity: 0.04;
        pointer-events: none;
        z-index: 50;
        animation: grain-drift 8s steps(10) infinite;
        filter: grayscale(100%) contrast(150%);
    }
    
    .skeleton-loading {
        background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .psychedelic-animate, .glow-animate, .ring-animate, .grain-overlay {
            animation: none;
        }
    }
`;

// Lazy load Spotify embed with skeleton
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
                const options = {
                    uri: 'spotify:album:3vzVZ2UJ9QuHJHvRxXCLki',
                    width: '100%', height: '352',
                };
                IFrameAPI.createController(element, options, (EmbedController: any) => {
                    setIsReady(true);
                    EmbedController.addListener('playback_update', (e: any) => {
                        const { isPaused } = e.data;
                        if (onPlayStateChange) onPlayStateChange(!isPaused);
                    });
                });
            };
            document.body.appendChild(script);
            return () => {
                delete window.onSpotifyIframeApiReady;
                const oldScript = document.querySelector('script[src="https://open.spotify.com/embed-podcast/iframe-api/v1"]');
                if (oldScript) oldScript.remove();
            };
        }, [isReady, onPlayStateChange]);

        return (
            <div style={{ width: '100%', maxWidth: '800px', minHeight: '352px' }}>
                {!isReady && <div className="skeleton-loading" style={{ width: '100%', height: '352px', borderRadius: '12px' }} />}
                <div id="spotify-embed" style={{ width: '100%', minHeight: '352px', display: isReady ? 'block' : 'none' }} />
            </div>
        );
    }),
    { ssr: false }
);

export default function ThePsychedelicRifferPage() {
    const [isEntered, setIsEntered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const staticPreviewImage = "/thepsychedelicriffer.jpg";
    const siteUrl = "https://lizardinteractive.online";

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const handleEnter = () => {
        setIsEntered(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
    };

    const handlePlayStateChange = useCallback((playing: boolean) => {
        setIsPlaying(playing);
    }, []);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden selection:bg-purple-500/30">
            <Head>
                <title>The Psychedelic Riffer | Lizard Interactive Online</title>
                <style dangerouslySetInnerHTML={{ __html: psychedelicStyles }} />
            </Head>

            {/* NEW: Grayish Motion Overlay (Always Active for Atmosphere) */}
            <div className="grain-overlay" />

            {/* THE VOID OVERLAY */}
            {!isEntered && (
                <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden">

                    {/* NEW: Grayish Motion Gradient & Grain Layer */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* The Smoky Gradient */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,40,40,0.5)_0%,_rgba(0,0,0,1)_80%)]" />

                        {/* The Animated Grain */}
                        <div
                            className="absolute inset-0 opacity-[0.03] mix-blend-screen"
                            style={{
                                backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
                                animation: 'grain-drift 8s steps(10) infinite',
                                filter: 'grayscale(100%) brightness(1.2)'
                            }}
                        />
                    </div>

                    <div className="relative z-10 text-center space-y-12">
                        <div className="space-y-4">
                            <h1 className="font-gotham-thin text-white text-3xl md:text-5xl tracking-[0.5em] uppercase opacity-70 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                The Vision is Live
                            </h1>
                            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                                High Gain Atmosphere Ahead
                            </p>
                        </div>

                        <button
                            onClick={handleEnter}
                            className="group relative px-16 py-5 border border-white/10 hover:border-white/60 transition-all duration-700 bg-black/40 backdrop-blur-sm"
                        >
                            <span className="relative z-10 font-gotham-thin tracking-[0.4em] text-white text-sm uppercase">
                                Enter the Void
                            </span>
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
            )}

            {/* INTRO AUDIO FILE (Upload your mp3 to /public/void-intro.mp3) */}
            <audio ref={audioRef} src="/void-intro.mp3" loop />

            {/* MAIN CONTENT */}
            <main className={`transition-all duration-[2000ms] ease-in-out ${isEntered ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-xl pointer-events-none'}`}>
                <ScreenContainer variant="dark" maxWidth="2xl">
                    <div style={{
                        position: 'relative', width: '100%', maxWidth: '1000px', aspectRatio: '16/9',
                        margin: '2rem auto 0 auto', borderRadius: '24px', overflow: 'hidden',
                        boxShadow: isPlaying && !prefersReducedMotion ? '0 0 50px rgba(120, 119, 198, 0.5)' : '0 0 20px rgba(120, 119, 198, 0.2)',
                        transition: 'box-shadow 0.3s ease', backgroundColor: '#0a0a0a'
                    }}>
                        <div className={isPlaying && !prefersReducedMotion ? 'psychedelic-animate' : ''} style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image
                                src={staticPreviewImage} alt="The Psychedelic Riffer" fill
                                sizes="(max-width: 768px) 100vw, 1000px" style={{ objectFit: 'cover' }}
                                priority quality={85} onLoadingComplete={() => setImageLoaded(true)}
                            />
                        </div>

                        {isPlaying && !prefersReducedMotion && (
                            <>
                                <div className="glow-animate" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(120,119,198,0.4), transparent)', pointerEvents: 'none' }} />
                                <div className="ring-animate" style={{ position: 'absolute', inset: '10%', borderRadius: '50%', border: '2px solid rgba(120,119,198,0.6)', pointerEvents: 'none' }} />
                            </>
                        )}
                        {!imageLoaded && <div className="skeleton-loading" style={{ position: 'absolute', inset: 0 }} />}
                    </div>

                    <div className="mt-12 pb-20 flex justify-center w-full">
                        <SpotifyEmbed onPlayStateChange={handlePlayStateChange} />
                    </div>

                    <div className="text-center -mt-8 mb-8">
                        <p style={{ fontSize: '12px', opacity: 0.7, color: isPlaying ? '#8b5cf6' : '#666', letterSpacing: '1px' }}>
                            {isPlaying ? '🎵 PSYCHEDELIC MODE ACTIVE 🎵' : '⚡ PLAY A TRACK TO VISUALIZE ⚡'}
                        </p>
                    </div>
                </ScreenContainer>
            </main>
        </div>
    );
}