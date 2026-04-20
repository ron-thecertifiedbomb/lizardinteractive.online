"use client";

import { Emulator } from "@/data/lists/emulatorList";
import Link from "next/link";



interface EmulatorGridProps {
    emulators: Emulator[];
}

export default function EmulatorGrid({ emulators }: EmulatorGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
            {emulators.map((emu) => (
                <Link
                    key={emu.id}
                    href={emu.status === "Offline" ? "#" : `/emulator/${emu.id}`}
                    className={`group relative block overflow-hidden border border-white/5 bg-[#080808] p-8 transition-all duration-500 
                        ${emu.status === "Offline" ? "cursor-not-allowed" : "hover:border-emerald-500/40 cursor-pointer"}`}
                >
                    {/* Background Hardware ID */}
                    <div className="absolute -right-4 -top-6 text-white/[0.02] font-black text-9xl group-hover:text-emerald-500/[0.05] transition-all duration-700 pointer-events-none uppercase italic select-none">
                        {emu.system}
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex gap-2">
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500/60 border border-emerald-500/20 px-2 py-1 bg-emerald-500/5">
                                    {emu.system}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 border border-zinc-800 px-2 py-1">
                                    {emu.version}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {emu.status}
                                </span>
                                <div className={`h-1.5 w-1.5 rounded-full ${emu.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' :
                                        emu.color === 'purple' ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-zinc-700'
                                    } ${emu.status === 'Operational' ? 'animate-pulse' : ''}`} />
                            </div>
                        </div>

                        <h2 className="text-3xl font-black uppercase tracking-tighter group-hover:text-emerald-400 transition-colors duration-300">
                            {emu.name}
                        </h2>

                        <p className="text-zinc-500 mt-3 text-xs leading-relaxed max-w-sm font-light">
                            {emu.desc}
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-zinc-800 group-hover:w-16 group-hover:bg-emerald-500/50 transition-all duration-500" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-700 group-hover:text-white transition-colors">
                                {emu.status === "Offline" ? "SYSTEM_LOCKED" : "Initialize_System"}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}