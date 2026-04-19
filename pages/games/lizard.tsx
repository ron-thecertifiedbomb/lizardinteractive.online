import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ScreenContainer from '../../components/shared/ScreenContainer/ScreenContainer';

export default function LizardPage() {
    const [iframeSrc, setIframeSrc] = useState("");

    useEffect(() => {
        // We add a cache-buster (?v=1) to force the browser to ignore previous 403/404 errors
        const origin = window.location.origin;
        const finalUrl = `https://cdn.emulatorjs.org/stable/data/index.html?game=${origin}/roms/lizard.nes?v=1&core=nes`;
        setIframeSrc(finalUrl);
    }, []);

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black relative z-[1]">
            <Head>
                <title>LIZARD | The Void Arcade</title>
                <meta name="description" content="Play the Lizard NES demo on Lizard Interactive." />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                {/* Navigation */}
                <nav className="py-8">
                    <Link href="/games" className="font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors tracking-widest uppercase">
                        ← Back to Arcade
                    </Link>
                </nav>

                <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <header className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <span className="font-mono text-xs text-emerald-500 mb-2 block uppercase tracking-widest">
                                Protocol: Lizard_Exploration
                            </span>
                            <h1 className="text-5xl font-bold italic uppercase tracking-tighter">
                                LIZARD <span className="text-emerald-500">DEMO</span>
                            </h1>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                                Platform: NES | Build: 4.1.9.8
                            </span>
                        </div>
                    </header>

                    {/* The Emulator Player */}
                    <div className="aspect-video w-full bg-zinc-900 border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* CRT Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-20 opacity-50" />

                        {/* Only render the iframe once the origin is known */}
                        {iframeSrc ? (
                            <iframe
                                title="Lizard NES Emulator"
                                src={iframeSrc}
                                className="w-full h-full relative z-10 border-0"
                                allowFullScreen
                                scrolling="no"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-700 animate-pulse">
                                INITIALIZING SYSTEM...
                            </div>
                        )}
                    </div>

                    {/* Technical Specs Footer */}
                    <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Controls</h3>
                            <div className="text-zinc-500 text-sm font-light space-y-1">
                                <p>Arrows: Directional Control</p>
                                <p><strong>X</strong>: A Button (Jump)</p>
                                <p><strong>Z</strong>: B Button (Action)</p>
                                <p><strong>S</strong>: Start | <strong>A</strong>: Select</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Atmosphere</h3>
                            <p className="text-zinc-500 text-sm font-light">
                                Best experienced with the atmospheric textures of "Remorseful Soul" playing in the background.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Integrity</h3>
                            <p className="text-zinc-500 text-sm font-light">
                                Official Demo by Brad Smith (2018). <br />
                                Support the creator at lizardnes.com.
                            </p>
                        </div>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}