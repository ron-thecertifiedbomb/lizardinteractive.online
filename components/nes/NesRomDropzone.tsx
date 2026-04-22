"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileCode, Zap } from "lucide-react";

type Props = {
    onFile: (file: File) => void;
};

export function NesRomDropzone({ onFile }: Props) {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files?.length) return;
            const file = files[0];
            if (!file.name.toLowerCase().endsWith(".nes")) return;
            onFile(file);
        },
        [onFile],
    );

    const onDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        dragCounter.current++;
        setDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current <= 0) {
            dragCounter.current = 0;
            setDragging(false);
        }
    }, []);

    const onDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            dragCounter.current = 0;
            setDragging(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles],
    );

    return (
        <div
            onDragEnter={onDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            className={[
                "relative group cursor-pointer border transition-colors duration-300",
                dragging
                    ? "border-emerald-500 bg-emerald-500/5"
                    : "border-zinc-900 bg-zinc-950 hover:border-zinc-700"
            ].join(" ")}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".nes"
                className="hidden"
                onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = "";
                }}
            />

            <div className="relative flex flex-col items-center justify-center p-12">
                <div className={`mb-4 flex items-center justify-center p-3 transition-colors ${dragging ? "bg-emerald-500 text-black" : "bg-zinc-900 text-zinc-600 group-hover:text-emerald-500"
                    }`}>
                    {dragging ? <Zap size={24} fill="currentColor" /> : <UploadCloud size={24} />}
                </div>

                <div className="text-center space-y-1">
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${dragging ? "text-emerald-400" : "text-white"
                        }`}>
                        {dragging ? "Release_to_Upload" : "Initialize_Upload"}
                    </h3>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase">
                        Protocol: iNES_v1.0
                    </p>
                </div>
            </div>

            {/* Flat Corner Brackets */}
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}