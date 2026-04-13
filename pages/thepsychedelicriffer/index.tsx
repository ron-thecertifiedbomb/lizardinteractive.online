    import { useState, useRef } from "react";
    import { AnimatePresence } from "framer-motion";
    import { VoidSettings } from "./config";
    import VoidEntrance from "./components/VoidEntrance";
    import  Visualizer  from "./components/Visualizer";
    import  SpotifyController  from "./components/SpotifyController";


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
                <AnimatePresence>
                    {!isEntered ? (
                        <VoidEntrance onEnter={handleEnter} />
                    ) : (
                        <main className="transition-all duration-1000">
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