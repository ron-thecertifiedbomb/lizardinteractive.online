'use client'

import Link from 'next/link';
import ScreenContainer from '../../components/shared/ScreenContainer/ScreenContainer';
import SectionHeader from '../../components/shared/SectionHeader/SectionHeader';

const GAMES = [
    {
        id: 'lizard',
        name: 'LIZARD',
        version: 'v4.1.9.8 Demo',
        desc: 'Atmospheric exploration. Perfect match for lizardinteractive.online.',
        color: 'emerald'
    },
    {
        id: 'malasombra',
        name: 'MALASOMBRA',
        version: 'v1.1 Demo',
        desc: 'Gothic action-platformer. Matches the Psychedelic Riffer aesthetic.',
        color: 'purple'
    }
];

export default function GamesPage() {
    return (
  
            <ScreenContainer variant="dark" maxWidth="xl">

                <SectionHeader
                    title="Online Gaming"
                    highlight="Hub"
                    description="Low-latency, zero-tracker, and optimized for performance."
                />

                {/* Game Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                    {GAMES.map((game) => (
                        <Link
                            key={game.id}
                            href={`/games/${game.id}`}
                            className="group relative block overflow-hidden border border-white/10 bg-zinc-900/20 p-8 rounded-sm hover:border-emerald-500/50 transition-all duration-500 cursor-pointer"
                        >
                            {/* Decorative background element */}
                            <div className="absolute -right-8 -top-8 text-white/5 font-bold text-9xl group-hover:text-emerald-500/10 transition-colors pointer-events-none uppercase italic">
                                {game.id[0]}
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 px-2 py-1">
                                        {game.version}
                                    </span>
                                    <div className={`h-2 w-2 rounded-full animate-pulse ${game.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-purple-500 shadow-[0_0_10px_#a855f7]'
                                        }`} />
                                </div>

                                <h2 className="text-4xl font-bold italic uppercase group-hover:tracking-widest transition-all duration-500">
                                    {game.name}
                                </h2>
                                <p className="text-zinc-400 mt-4 text-sm leading-relaxed max-w-xs">
                                    {game.desc}
                                </p>

                                <div className="mt-12 flex items-center gap-2 text-xs font-mono uppercase tracking-tighter text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Initiate Boot Sequence</span>
                                    <span className="animate-bounce">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Simple Footer Note */}
                {/* <div className="border-t border-white/5 pt-8 mb-12">
                    <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                        Terminal Status: Ready for Input // Select Module to Begin
                    </p>
                </div> */}

            </ScreenContainer>
   
    );
}