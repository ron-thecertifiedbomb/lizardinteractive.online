import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { NES, Controller } from "jsnes";

interface EmulatorProps {
    onStatusChange?: (status: "idle" | "loading" | "running") => void;
    onMessageChange?: (msg: string) => void;
}

const Emulator = forwardRef(({ onStatusChange, onMessageChange }: EmulatorProps, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const nesRef = useRef<any>(null);
    const requestRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
        loadFromUrl: async (url: string, name: string) => {
            onStatusChange?.("loading");
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error();
                const arrayBuffer = await response.arrayBuffer();
                bootRom(arrayBuffer, name);
            } catch (err) {
                onMessageChange?.("SERVER ERROR: CHECK PUBLIC FOLDER");
                onStatusChange?.("idle");
            }
        }
    }));

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
        });

        nesRef.current = nes;

        const handleKey = (isDown: boolean, event: KeyboardEvent) => {
            const player = 1;
            const callback = isDown ? nesRef.current.buttonDown : nesRef.current.buttonUp;

            // We use both event.code (physical position) and event.key (the letter) 
            // to make sure JUMP always triggers
            switch (event.code) {
                case "ArrowUp": event.preventDefault(); callback(player, Controller.BUTTON_UP); break;
                case "ArrowDown": event.preventDefault(); callback(player, Controller.BUTTON_DOWN); break;
                case "ArrowLeft": event.preventDefault(); callback(player, Controller.BUTTON_LEFT); break;
                case "ArrowRight": event.preventDefault(); callback(player, Controller.BUTTON_RIGHT); break;

                // JUMP BUTTON (A) - Usually X key
                case "KeyX":
                case "x":
                case "X":
                    event.preventDefault();
                    callback(player, Controller.BUTTON_A);
                    break;

                // ACTION BUTTON (B) - Usually Z key
                case "KeyZ":
                case "z":
                case "Z":
                    event.preventDefault();
                    callback(player, Controller.BUTTON_B);
                    break;

                case "Enter":
                    event.preventDefault();
                    callback(player, Controller.BUTTON_START);
                    break;

                case "ShiftLeft":
                case "ShiftRight":
                    event.preventDefault();
                    callback(player, Controller.BUTTON_SELECT);
                    break;
            }
        };
        const onKeyDown = (e: KeyboardEvent) => handleKey(true, e);
        const onKeyUp = (e: KeyboardEvent) => handleKey(false, e);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [onStatusChange, onMessageChange]);

    const bootRom = (arrayBuffer: ArrayBuffer, fileName: string) => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        const romData = new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "");
        nesRef.current.loadROM(romData);
        onStatusChange?.("running");
        onMessageChange?.(`NOW PLAYING: ${fileName}`);
        const frame = () => {
            nesRef.current.frame();
            requestRef.current = requestAnimationFrame(frame);
        };
        requestRef.current = requestAnimationFrame(frame);
    };

    // FIX: stopPropagation() prevents the browser from downloading the dropped file
    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
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
            className="w-full h-full relative bg-black cursor-copy outline-none"
        >
            <canvas
                ref={canvasRef}
                width="256"
                height="240"
                className="w-full h-full [image-rendering:pixelated] relative z-10"
            />
        </div>
    );
});

Emulator.displayName = "Emulator";
export default Emulator;