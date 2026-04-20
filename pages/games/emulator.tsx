import { useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

// Ensure this path matches: components/emulator/Emulator.tsx
const Emulator = dynamic(() => import("../../components/emulator/NesEmulator"), {
    ssr: false,
    loading: () => <div className="p-10 font-mono text-zinc-800 text-[10px]">SYNCING_HARDWARE...</div>
});

export default function EmulatorPage() {

    const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
    const [message, setMessage] = useState("AWAITING ROM DATA");
    const emulatorRef = useRef<any>(null);

    const handleBootFile = (path: string, name: string) => {
        const instance = emulatorRef.current as any;
        if (instance?.loadFromUrl) {
            instance.loadFromUrl(path, name);
        }
    };

    const stopDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div

            onDragOver={stopDefaults}
            onDrop={stopDefaults}
        >
            <Head>
                <title>Super Nintendo Entertainment System</title>
            </Head>

            <ScreenContainer variant="dark" maxWidth="full">
        

                <main className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6">

                    <div className="relative aspect-[4/3] w-full max-w-[950px] bg-zinc-950 border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.05)] overflow-hidden transition-all duration-700">
                        <Emulator
                            ref={emulatorRef}
                            onStatusChange={setStatus}
                            onMessageChange={setMessage}
                        />

                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_3px] z-20 opacity-30" />
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] z-20" />

                        {status !== "running" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-30 p-10 text-center backdrop-blur-sm pointer-events-none">
                                <button
                                    onClick={() => handleBootFile("/roms/lizard.nes", "Lizard Demo")}
                                    className="group relative px-12 py-5 text-[11px] text-emerald-500 border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500 hover:text-black transition-all pointer-events-auto font-bold tracking-[0.4em] overflow-hidden"
                                >
                                    <span className="relative z-10">
                                        {status === "loading" ? "SYNCING..." : "INITIALIZE KERNEL"}
                                    </span>
                                </button>
                                <p className="mt-8 text-[9px] text-zinc-700 uppercase tracking-[0.6em] animate-pulse">
                                    Drop .nes file to bypass
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer: Controls and Engine Info */}
                    <footer className="mt-10 w-full max-w-[950px] flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5  transition-opacity duration-500">
                        <div className="flex gap-8 text-[9px] text-zinc-500 uppercase tracking-widest">
                            <p><span className="text-zinc-400">Move:</span> Arrows</p>
                            <p><span className="text-zinc-400">A/B:</span> X / Z</p>
                            <p><span className="text-zinc-400">Start:</span> Enter</p>
                        </div>
                        <p className="text-[9px] text-emerald-500/40 uppercase tracking-[0.5em]">
                            Lizard Interactive // Native Core v1.2.1
                        </p>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}