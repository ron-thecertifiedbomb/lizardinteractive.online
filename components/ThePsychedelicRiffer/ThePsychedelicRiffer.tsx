import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { VoidSettings } from "../../config/config";
import { gearList } from "../../data/gearList";

// Local imports from the same components folder
import VoidEntrance from "./components/VoidEntrance";
import Visualizer from "./components/Visualizer";
import SpotifyController from "./components/SpotifyController";
import GearCard from "./components/GearCard";

export default function ThePsychedelicRiffer() {
    const [isEntered, setIsEntered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleEnter = () => {
        setIsEntered(true);
        audioRef.current?.play();
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {!isEntered ? (
                    <VoidEntrance
                        key="entrance"
                        onEnter={handleEnter}
                        tagline={VoidSettings.artistName}
                    />
                ) : (
                    <main key="main-content" className="transition-all duration-1000 pb-20">
                        <Visualizer
                            isPlaying={isPlaying}
                            heroImage={VoidSettings.heroImage}
                            artistName={VoidSettings.artistName}
                        />
                        <SpotifyController
                            uri={VoidSettings.trackUri}
                            onPlayChange={setIsPlaying}
                        />

                        <section className="max-w-4xl mx-auto px-6 mt-24">
                            <h2 className="text-2xl font-bold mb-10 tracking-widest text-center uppercase">
                                The Rig
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {gearList.map((item) => (
                                    <GearCard key={item.id} item={item} />
                                ))}
                            </div>

                            <footer className="mt-16 text-center">
                                <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
                                    Honest Gear • Affiliate Supported
                                </p>
                            </footer>
                        </section>
                    </main>
                )}
            </AnimatePresence>
            <audio ref={audioRef} src={VoidSettings.introAudio} loop />
        </>
    );
}