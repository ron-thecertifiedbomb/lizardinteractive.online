import Head from 'next/head';
import Link from 'next/link';
import ScreenContainer from '../../components/shared/ScreenContainer/ScreenContainer';

export default function LizardPage() {
    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black relative z-[1]">
            <Head>
                <title>LIZARD | The Void Arcade</title>
                <meta name="description" content="Play the Lizard NES demo on Lizard Interactive." />
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                {/* Navigation Back */}
                <nav className="py-8">
                    <Link href="/games" className="font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors tracking-widest uppercase">
                        ← Back to Arcade
                    </Link>
                </nav>

                <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <span className="font-mono text-xs text-emerald-500 mb-2 block uppercase tracking-widest">
                                Protocol: Lizard_Exploration
                            </span>
                            <h1 className="text-5xl font-bold italic uppercase tracking-tighter">LIZARD <span className="text-emerald-500">DEMO</span></h1>
                        </div>
                        <div className="hidden md:block text-right">
                            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                                Platform: NES | Dev: Rainwarrior
                            </span>
                        </div>
                    </div>

                    {/* The Emulator Player */}
                    <div className="aspect-video w-full bg-zinc-900 border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* CRT Effect Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-20 opacity-50" />

                        <iframe
                            title="Lizard NES Emulator"
                            src="https://cdn.emulatorjs.org/stable/data/index.html?game=/roms/lizard.nes&core=nes"
                            className="w-full h-full relative z-10 border-0"
                            allowFullScreen
                            scrolling="no"
                        />
                    </div>

                    {/* Technical Specs Footer */}
                    <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Controls</h3>
                            <p className="text-zinc-500 text-sm font-light">Arrows to move, Z/X to jump/interact, Enter to start.</p>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Atmosphere</h3>
                            <p className="text-zinc-500 text-sm font-light">Best experienced with "Remorseful Soul" playing in the background.</p>
                        </div>
                        <div>
                            <h3 className="font-mono text-xs text-emerald-500 uppercase mb-2">Integrity</h3>
                            <p className="text-zinc-500 text-sm font-light">100% Legal homebrew demo hosted via EmulatorJS CDN.</p>
                        </div>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}