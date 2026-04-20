"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";

import NesEmulator, { NesEmulatorRef } from "../../components/emulator/NesEmulator";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";
import { EMULATORS } from "../../data/emulatorList";


export default function EmulatorSlugPage() {
    const { slug } = useParams();
    const emulatorRef = useRef<NesEmulatorRef>(null);

    // State for the HUD/UI
    const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
    const [msg, setMsg] = useState("SYSTEM_READY");

    // Find data
    const data = EMULATORS.find((e) => e.id === slug);

    if (!data) return <div className="text-white p-20">SYSTEM_ERROR: INVALID_SLUG</div>;

    return (
        <ScreenContainer variant="dark" maxWidth="xl">
            <div className="flex flex-col gap-6">

                {/* EMULATOR HEADER / HUD */}
                {/* <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
                    <div>
                        <span className="text-[10px] font-mono text-emerald-500 tracking-[0.3em] uppercase">
                            {data.system} // {status}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            {data.name}
                        </h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[9px] font-mono text-zinc-600 uppercase leading-relaxed">
                            {msg}
                        </p>
                    </div>
                </div> */}

                {/* MAIN ENGINE VIEWPORT */}
                <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-black border border-zinc-800 shadow-2xl">
                    {/* Only render NES engine if the slug is nes or gbc (assuming jsnes usage) */}
                    <NesEmulator
                        ref={emulatorRef}
                        onStatusChange={setStatus}
                        onMessageChange={setMsg}
                    />

                    {/* LOADING OVERLAY */}
                    {status === "idle" && (
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                            <p className="text-zinc-500 font-mono text-[10px] tracking-[0.5em] mb-4">
                                DROP_.NES_FILE_TO_INITIALIZE
                            </p>
                            <div className="w-12 h-[1px] bg-emerald-500/30" />
                        </div>
                    )}
                </div>

                {/* INPUT REFERENCE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 opacity-50">
                    <div className="border border-zinc-900 p-3 text-[9px] font-mono text-zinc-500">
                        [ X ] - BUTTON_A (JUMP)
                    </div>
                    <div className="border border-zinc-900 p-3 text-[9px] font-mono text-zinc-500">
                        [ Z ] - BUTTON_B (ACTION)
                    </div>
                    <div className="border border-zinc-900 p-3 text-[9px] font-mono text-zinc-500">
                        [ ENTER ] - START
                    </div>
                    <div className="border border-zinc-900 p-3 text-[9px] font-mono text-zinc-500">
                        [ SHIFT ] - SELECT
                    </div>
                </div>
            </div>
        </ScreenContainer>
    );
}