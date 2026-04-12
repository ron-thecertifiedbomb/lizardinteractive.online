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

// CSS-only animations (replaces framer-motion for better performance)
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
    
    @keyframes shimmer {
        0% { background-position: -100% 0; }
        100% { background-position: 200% 0; }
    }
    
    .psychedelic-animate {
        animation: psychedelic-pulse 0.6s ease-in-out infinite;
        will-change: transform, filter;
    }
    
    .glow-animate {
        animation: glow-pulse 0.6s ease-in-out infinite;
    }
    
    .ring-animate {
        animation: ring-pulse 0.6s ease-out infinite;
    }
    
    .skeleton-loading {
        background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .psychedelic-animate, .glow-animate, .ring-animate {
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
            script.src = "https://open.spotify.com/embed/iframe-api/v1";
            script.async = true;

            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                const element = document.getElementById('spotify-embed');
                const options = {
                    uri: 'spotify:album:3vzVZ2UJ9QuHJHvRxXCLki',
                    width: '100%',
                    height: '352',
                };

                IFrameAPI.createController(element, options, (EmbedController) => {
                    setIsReady(true);

                    EmbedController.addListener('playback_update', (e: any) => {
                        const { isPaused } = e.data;
                        if (onPlayStateChange) {
                            onPlayStateChange(!isPaused);
                        }
                    });
                });
            };

            document.body.appendChild(script);

            return () => {
                delete window.onSpotifyIframeApiReady;
                const oldScript = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]');
                if (oldScript) oldScript.remove();
            };
        }, [isReady, onPlayStateChange]);

        return (
            <div style={{ width: '100%', maxWidth: '800px', minHeight: '352px' }}>
                {!isReady && (
                    <div className="skeleton-loading" style={{
                        width: '100%',
                        height: '352px',
                        borderRadius: '12px',
                        background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
                        backgroundSize: '200% 100%'
                    }} />
                )}
                <div id="spotify-embed" style={{ width: '100%', minHeight: '352px', display: isReady ? 'block' : 'none' }} />
            </div>
        );
    }),
    {
        ssr: false,
        loading: () => (
            <div style={{
                width: '100%',
                maxWidth: '800px',
                height: '352px',
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite'
            }} />
        )
    }
);

export default function ThePsychedelicRifferPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const staticPreviewImage = "/thepsychedelicriffer.jpg";
    const siteUrl = "https://lizardinteractive.online";

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const handlePlayStateChange = useCallback((playing: boolean) => {
        setIsPlaying(playing);
    }, []);

    return (
        <>
            <Head>
                <title>The Psychedelic Riffer | Lizard Interactive Online</title>
                <meta name="description" content="Remorseful 100 BPM melodic instrumentals - Psychedelic visualizer experience" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

                {/* Open Graph */}
                <meta property="og:title" content="The Psychedelic Riffer | Lizard Interactive Online" />
                <meta property="og:description" content="Explore remorseful, 100 BPM melodic instrumentals and atmospheric guitar textures." />
                <meta property="og:image" content={`${siteUrl}${staticPreviewImage}`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${siteUrl}/thepsychedelicriffer`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="The Psychedelic Riffer | Lizard Interactive Online" />
                <meta name="twitter:description" content="Slow, melodic instrumentals focused on reflection and regret." />
                <meta name="twitter:image" content={`${siteUrl}${staticPreviewImage}`} />

                {/* Preconnect for performance */}
                <link rel="preconnect" href="https://open.spotify.com" />
                <link rel="dns-prefetch" href="https://open.spotify.com" />

                {/* Inject CSS animations */}
                <style dangerouslySetInnerHTML={{ __html: psychedelicStyles }} />
            </Head>

            <ScreenContainer variant="dark" maxWidth="2xl">
                {/* Psychedelic Visualizer Image - Optimized */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    aspectRatio: '16/9',
                    margin: '2rem auto 0 auto',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: isPlaying && !prefersReducedMotion
                        ? '0 0 50px rgba(120, 119, 198, 0.5)'
                        : '0 0 20px rgba(120, 119, 198, 0.2)',
                    transition: 'box-shadow 0.3s ease',
                    backgroundColor: '#0a0a0a'
                }}>
                    {/* Image with optimized loading */}
                    <div
                        className={isPlaying && !prefersReducedMotion ? 'psychedelic-animate' : ''}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            willChange: isPlaying ? 'transform, filter' : 'auto'
                        }}
                    >
                        <Image
                            src={staticPreviewImage}
                            alt="The Psychedelic Riffer - Psychedelic Visualizer Album Art"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                            style={{ objectFit: 'cover' }}
                            priority
                            loading="eager"
                            quality={85}
                            onLoadingComplete={() => setImageLoaded(true)}
                        />
                    </div>

                    {/* Glow effect on beat - CSS animated for performance */}
                    {isPlaying && !prefersReducedMotion && (
                        <div
                            className="glow-animate"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(circle, rgba(120,119,198,0.4), transparent)',
                                pointerEvents: 'none'
                            }}
                        />
                    )}

                    {/* Psychedelic ring pulse */}
                    {isPlaying && !prefersReducedMotion && (
                        <div
                            className="ring-animate"
                            style={{
                                position: 'absolute',
                                inset: '10%',
                                borderRadius: '50%',
                                border: '2px solid rgba(120,119,198,0.6)',
                                pointerEvents: 'none'
                            }}
                        />
                    )}

                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className="skeleton-loading" style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
                            backgroundSize: '200% 100%'
                        }} />
                    )}
                </div>

                {/* Spotify Player - Lazy loaded */}
                <div style={{
                    marginTop: '3rem',
                    paddingBottom: '5rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <SpotifyEmbed onPlayStateChange={handlePlayStateChange} />
                </div>

                {/* Visualizer status indicator */}
                <div style={{ textAlign: 'center', marginTop: '-2rem', marginBottom: '2rem' }}>
                    <p style={{
                        fontSize: '12px',
                        opacity: 0.7,
                        color: isPlaying ? '#8b5cf6' : '#666',
                        transition: 'color 0.3s ease',
                        letterSpacing: '1px'
                    }}>
                        {isPlaying ? '🎵 PSYCHEDELIC MODE ACTIVE 🎵' : '⚡ PLAY A TRACK TO VISUALIZE ⚡'}
                    </p>
                    {!isPlaying && (
                        <p style={{
                            fontSize: '10px',
                            opacity: 0.4,
                            marginTop: '8px'
                        }}>
                            Click play on any track and watch the visualizer come alive
                        </p>
                    )}
                </div>
            </ScreenContainer>
        </>
    );
}