import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NES, Controller } from "jsnes";

import ScreenContainer from "../../components/shared/ScreenContainer/ScreenContainer";

export default function LizardProPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const nesRef = useRef<any>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
    const [message, setMessage] = useState("Insert Disk to Begin");

    // 1. Initialize the NES Engine
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const imageData = ctx?.getImageData(0, 0, 256, 240);
        const buf = new ArrayBuffer(imageData?.data.length || 0);
        const buf8 = new Uint8ClampedArray(buf);
        const buf32 = new Uint32Array(buf);

        // Setup JSNES
        const nes = new NES({
            onFrame: (frameBuffer) => {
                for (let i = 0; i < 256 * 240; i++) {
                    buf32[i] = 0xff000000 | frameBuffer[i];
                }
                imageData?.data.set(buf8);
                ctx?.putImageData(imageData!, 0, 0);
            },
            onAudioSample: (left, right) => {
                // Audio logic can be added here later
            }
        });

        nesRef.current = nes;

        // Keyboard Controls
        const keyboard = (callback: any, event: KeyboardEvent) => {
            const player = 1;
            switch (event.keyCode) {
                case 38: callback(player, Controller.BUTTON_UP); break;
                case 40: callback(player, Controller.BUTTON_DOWN); break;
                case 37: callback(player, Controller.BUTTON_LEFT); break;
                case 39: callback(player, Controller.BUTTON_RIGHT); break;
                case 88: callback(player, Controller.BUTTON_A); break; // X key
                case 90: callback(player, Controller.BUTTON_B); break; // Z key
                case 13: callback(player, Controller.BUTTON_START); break; // Enter
                case 17: callback(player, Controller.BUTTON_SELECT); break; // Ctrl
            }
        };

        document.addEventListener("keydown", (e) => keyboard(nes.buttonDown, e));
        document.addEventListener("keyup", (e) => keyboard(nes.buttonUp, e));

        return () => {
            stopGame();
        };
    }, []);

    // 2. Load the ROM
    async function loadLizard() {
        setStatus("loading");
        setMessage("Downloading Lizard Kernel...");
        try {
            const response = await fetch("/roms/lizard.nes");
            if (!response.ok) throw new Error("ROM not found on server");
            const arrayBuffer = await response.arrayBuffer();
            const romData = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "");

            nesRef.current.loadROM(romData);
            setStatus("running");
            setMessage("System Online: Enjoy Lizard");
            startGame();
        } catch (err) {
            setMessage("Error: ROM failed to load");
            setStatus("idle");
        }
    }

    function startGame() {
        const frame = () => {
            if (nesRef.current) {
                nesRef.current.frame();
                requestAnimationFrame(frame);
            }
        };
        requestAnimationFrame(frame);
    }

    function stopGame() {
        nesRef.current = null;
    }

    return (
        <div className="min-h-screen w-full bg-black text-white">
            <Head><title>LIZARD | Native Console</title></Head>
            <ScreenContainer variant="dark" maxWidth="xl">
                <nav className="py-8">
                    <Link href="/games" className="font-mono text-xs text-zinc-500 hover:text-emerald-500 uppercase tracking-widest">
                        ← Back to Arcade
                    </Link>
                </nav>

                <main className="max-w-4xl mx-auto">
                    <header className="mb-6">
                        <h1 className="text-4xl font-bold italic uppercase tracking-tighter">
                            LIZARD <span className="text-emerald-500">PRO</span>
                        </h1>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase">{message}</p>
                    </header>

                    <div className="relative aspect-[256/240] w-full bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
                        <canvas
                            ref={canvasRef}
                            width="256"
                            height="240"
                            className="w-full h-full [image-rendering:pixelated]"
                        />

                        {status === "idle" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                                <button
                                    onClick={loadLizard}
                                    className="bg-emerald-500 text-black px-8 py-3 font-bold uppercase hover:scale-105 transition-transform"
                                >
                                    Initialize Lizard_Demo
                                </button>
                            </div>
                        )}

                        {/* CRT Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-20 opacity-20" />
                    </div>

                    <footer className="mt-8 grid grid-cols-2 gap-4 text-[10px] font-mono uppercase text-zinc-600">
                        <div>
                            <p className="text-emerald-500">Controls</p>
                            <p>Arrows: Move | X: A | Z: B | Enter: Start</p>
                        </div>
                        <div className="text-right">
                            <p className="text-emerald-500">Engine</p>
                            <p>Native JSNES v1.2.1</p>
                        </div>
                    </footer>
                </main>
            </ScreenContainer>
        </div>
    );
}