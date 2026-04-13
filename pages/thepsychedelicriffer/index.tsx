import { useState, useRef } from "react";
import Head from "next/head"; // Added Head for SEO
import { AnimatePresence } from "framer-motion";
import { VoidSettings } from "./config";
import VoidEntrance from "./components/VoidEntrance";
import Visualizer from "./components/Visualizer";
import SpotifyController from "./components/SpotifyController";

export default function TheVoid() {
    const [isEntered, setIsEntered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleEnter = () => {
        setIsEntered(true);
        audioRef.current?.play();
    };

    return (
        <div className="bg-black min-h-screen">
            <Head>
                {/* Dynamic Metadata from Config */}
                <title>{VoidSettings.metadata.title}</title>
                <meta name="description" content={VoidSettings.metadata.description} />

                {/* Open Graph / Social Media Preview */}
                <meta property="og:title" content={VoidSettings.metadata.title} />
                <meta property="og:description" content={VoidSettings.metadata.description} />
                <meta property="og:image" content={VoidSettings.heroImage} />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={VoidSettings.metadata.title} />
                <meta name="twitter:image" content={VoidSettings.heroImage} />
            </Head>

            <AnimatePresence mode="wait">
                {!isEntered ? (
                    <VoidEntrance
                        key="entrance"
                        onEnter={handleEnter}
                        tagline={VoidSettings.artistName} // Pass artist name to entrance
                    />
                ) : (
                    <main key="main-content" className="transition-all duration-1000">
                        <Visualizer
                            isPlaying={isPlaying}
                            heroImage={VoidSettings.heroImage}
                            artistName={VoidSettings.artistName}
                        />
                        <SpotifyController
                            uri={VoidSettings.trackUri}
                            onPlayChange={setIsPlaying}
                        />
                    </main>
                )}
            </AnimatePresence>

            <audio ref={audioRef} src={VoidSettings.introAudio} loop />
        </div>
    );
}