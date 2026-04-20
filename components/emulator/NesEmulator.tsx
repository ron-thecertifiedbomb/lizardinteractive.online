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
    const nesRef = useRef<any>(null);
    const requestRef = useRef<number | null>(null);

    // Audio Refs
    const audioCtxRef = useRef<AudioContext | null>(null);
    const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
    const audioBufferRef = useRef<number[]>([]);

    useImperativeHandle(ref, () => ({
        loadFromUrl: async (url: string, name: string) => {
            onStatusChange?.("loading");
            // Start Audio Context on user gesture
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

    // Initialize Audio Context
    const initAudio = () => {
        if (audioCtxRef.current) {
            if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
            return;
        }

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();

        // 4096 is a good buffer size for JSNES
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
        const ctx = canvas.getContext("2d");
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
            // Pipe audio samples to our ref buffer
            onAudioSample: (left, right) => {
                if (audioBufferRef.current.length < 8192) {
                    audioBufferRef.current.push(left, right);
                }
            }
        });

        nesRef.current = nes;

        // Key handlers...
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
            // Resume audio on first key press if suspended
            if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
            handleKey(true, e);
        }
        const onKeyUp = (e: KeyboardEvent) => handleKey(false, e);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
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

        const frame = () => {
            nesRef.current.frame();
            requestRef.current = requestAnimationFrame(frame);
        };
        requestRef.current = requestAnimationFrame(frame);
    };

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e: React.DragEvent) => {
        preventDefaults(e);
        initAudio(); // Initialize audio on file drop
        const file = e.dataTransfer.files[0];
        if (file?.name.toLowerCase().endsWith(".nes")) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) bootRom(ev.target.result as ArrayBuffer, file.name);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div
            onDragEnter={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={onDrop}
            onClick={initAudio} // Initialize audio on click
            className="w-full h-full relative bg-[#050505] border border-white/5 cursor-crosshair overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                width="256"
                height="240"
                className="w-full h-full [image-rendering:pixelated] relative z-10"
            />
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%]" />
        </div>
    );
});

NesEmulator.displayName = "NesEmulator";
export default NesEmulator;