import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ScreenContainer from '../../components/shared/ScreenContainer/ScreenContainer';

const GAMES = [
    {
        id: 'lizard',
        name: 'LIZARD',
        version: 'v1.0 Demo',
        file: 'lizard.nes',
        core: 'nes',
        desc: 'Atmospheric exploration. Perfect match for lizardinteractive.online.',
        color: 'emerald',
        path: '/games/lizard' // Dedicated page
    },
    {
        id: 'batman',
        name: 'BATMAN RETURNS',
        version: 'MD Tech Demo',
        file: 'batman.bin',
        core: 'megaDrive',
        desc: 'High-performance Sega Genesis remake. A technical masterpiece.',
        color: 'blue'
    }
];

export default function Arcade() {
    const [activeGame, setActiveGame] = useState<any>(null);

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-emerald-500 selection:text-black relative z-[1]">
            <Head>
                <title>The Void Arcade | Lizard Interactive</title>
            </Head>

            <ScreenContainer variant="dark" maxWidth="xl">
                <header className="py-16 border-b border-white/5 mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-1 w-12 bg-emerald-500" />
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500/60">System Protocol: Active</span>
                    </div>
                    <h1 className="text-6xl font-bold tracking-tighter italic uppercase">The Void <span className="text-emerald-500">Arcade</span></h1>
                </header>

                {!activeGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {GAMES.map((game) => {
                            const CardContent = (
                                <div className="group relative overflow-hidden border border-white/10 bg-zinc-900/20 p-8 rounded-sm hover:border-emerald-500/50 transition-all duration-500 cursor-pointer h-full">
                                    <div className="absolute -right-8 -top-8 text-white/5 font-bold text-9xl group-hover:text-emerald-500/10 transition-colors pointer-events-none uppercase italic">{game.id[0]}</div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 px-2 py-1">{game.version}</span>
                                            <div className={`h-2 w-2 rounded-full animate-pulse bg-${game.color}-500`} />
                                        </div>
                                        <h2 className="text-4xl font-bold italic uppercase group-hover:tracking-widest transition-all duration-500">{game.name}</h2>
                                        <p className="text-zinc-400 mt-4 text-sm leading-relaxed max-w-xs">{game.desc}</p>
                                        <div className="mt-12 flex items-center gap-2 text-xs font-mono uppercase tracking-tighter text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>Initiate Boot</span> <span className="animate-bounce">→</span>
                                        </div>
                                    </div>
                                </div>
                            );

                            return game.path ? (
                                <Link href={game.path} key={game.id}>{CardContent}</Link>
                            ) : (
                                <div key={game.id} onClick={() => setActiveGame(game)}>{CardContent}</div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-4xl font-bold italic uppercase">{activeGame.name}</h2>
                            <button onClick={() => setActiveGame(null)} className="font-mono text-[10px] uppercase border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ Close ]</button>
                        </div>
                        <div className="aspect-video w-full bg-zinc-900 border border-white/10 relative arcade-monitor">
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-20" />
                            <iframe src={`https://cdn.emulatorjs.org/stable/data/index.html?game=/roms/${activeGame.file}&core=${activeGame.core}`} className="w-full h-full relative z-10 border-0" allowFullScreen scrolling="no" />
                        </div>
                    </div>
                )}
            </ScreenContainer>
        </div>
    );
}