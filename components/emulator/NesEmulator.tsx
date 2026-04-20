"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { NES, Controller } from "jsnes";

interface NesEmulatorProps {
    onStatusChange?: (status: "idle" | "loading" | "running") => void;
    onMessageChange?: (msg: string) => void;
}

export interface NesEmulatorRef {
    loadFromUrl: (url: string, name: string) => Promise<void>;
}

const NesEmulator = forwardRef<NesEmulatorRef, NesEmulatorProps>(({ onStatusChange, onMessageChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the hidden button logic
    const nesRef = useRef<any>(null);
    const requestRef = useRef<number | null>(null);

    // Audio Refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
    const audioBufferRef = useRef<number[]>([]);

    useImperativeHandle(ref, () => ({
        loadFromUrl: async (url: string, name: string) => {
            onStatusChange?.("loading");
            initAudio();
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                bootRom(arrayBuffer, name);
            } catch (err) {
                onStatusChange?.("idle");
            }
        }
    }));

    const initAudio = () => {
        if (audioCtxRef.current) {
            if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
            return;
        }
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        const scriptNode = ctx.createScriptProcessor(4096, 0, 2);

        scriptNode.onaudioprocess = (e) => {
            const left = e.outputBuffer.getChannelData(0);
            const right = e.outputBuffer.getChannelData(1);
            const samples = audioBufferRef.current;
            for (let i = 0; i < 4096; i++) {
                const sample = samples.length > 0 ? samples.shift() : 0;
                left[i] = right[i] = sample || 0;
            }
        };

        scriptNode.connect(ctx.destination);
        audioCtxRef.current = ctx;
        scriptNodeRef.current = scriptNode;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", {
            alpha: false,
            desynchronized: true
        });
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, 256, 240);
        const buf = new ArrayBuffer(imageData.data.length);
        const buf8 = new Uint8ClampedArray(buf);
        const buf32 = new Uint32Array(buf);

        const nes = new NES({
            onFrame: (frameBuffer) => {
                for (let i = 0; i < 256 * 240; i++) {
                    buf32[i] = 0xff000000 | frameBuffer[i];
                }
                imageData.data.set(buf8);
                ctx.putImageData(imageData, 0, 0);
            },
            onAudioSample: (left, right) => {
                if (audioBufferRef.current.length < 8192) {
                    audioBufferRef.current.push(left, right);
                }
            }
        });

        nesRef.current = nes;

        const handleKey = (isDown: boolean, event: KeyboardEvent) => {
            const player = 1;
            const callback = isDown ? nesRef.current.buttonDown : nesRef.current.buttonUp;
            switch (event.code) {
                case "ArrowUp": event.preventDefault(); callback(player, Controller.BUTTON_UP); break;
                case "ArrowDown": event.preventDefault(); callback(player, Controller.BUTTON_DOWN); break;
                case "ArrowLeft": event.preventDefault(); callback(player, Controller.BUTTON_LEFT); break;
                case "ArrowRight": event.preventDefault(); callback(player, Controller.BUTTON_RIGHT); break;
                case "KeyX": event.preventDefault(); callback(player, Controller.BUTTON_A); break;
                case "KeyZ": event.preventDefault(); callback(player, Controller.BUTTON_B); break;
                case "Enter": event.preventDefault(); callback(player, Controller.BUTTON_START); break;
                case "ShiftLeft":
                case "ShiftRight": event.preventDefault(); callback(player, Controller.BUTTON_SELECT); break;
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
            handleKey(true, e);
        }
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", (e) => handleKey(false, e));

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            audioCtxRef.current?.close();
        };
    }, []);

    const bootRom = (arrayBuffer: ArrayBuffer, fileName: string) => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        const romData = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "");

        nesRef.current.loadROM(romData);
        onStatusChange?.("running");
        onMessageChange?.(`NOW PLAYING: ${fileName.toUpperCase()}`);

        let lastTime = performance.now();
        const frame = (now: number) => {
            const dt = now - lastTime;
            if (dt >= 16.66) {
                nesRef.current.frame();
                lastTime = now - (dt % 16.66);
            }
            requestRef.current = requestAnimationFrame(frame);
        };
        requestRef.current = requestAnimationFrame(frame);
    };

    // Handler for the new button select
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.toLowerCase().endsWith(".nes")) {
            initAudio();
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    bootRom(ev.target.result as ArrayBuffer, file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="group w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
            {/* Hidden Input for ROM loading */}
            <input
                type="file"
                ref={fileInputRef}
                accept=".nes"
                onChange={handleFileChange}
                className="hidden"
            />

            <canvas
                ref={canvasRef}
                width="256"
                height="240"
                className="w-full h-full object-contain [image-rendering:pixelated]  relative z-10"
            />

            {/* Locate Button Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 border border-emerald-500 bg-emerald-500/10 text-emerald-500 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-emerald-500 hover:text-black transition-all"
                >
                    Locate_.NES_File
                </button>
            </div>
        </div>
    );
});

NesEmulator.displayName = "NesEmulator";
export default NesEmulator;