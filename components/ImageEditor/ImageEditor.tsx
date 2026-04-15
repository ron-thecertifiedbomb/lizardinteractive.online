"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { ImagePickerConf } from "react-image-picker-editor";
import { Upload, RotateCcw, Image as ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-image-picker-editor/dist/index.css";

const ReactImagePickerEditor = dynamic(
    () => import("react-image-picker-editor"),
    { ssr: false }
);

export default function ImageEditorModal() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const config: ImagePickerConf = {
        borderRadius: "0px",
        language: "en",
        width: "100%",
        height: "320px",
        objectFit: "contain",
        compressInitial: null,
        darkMode: true,
        hideDownloadBtn: false,
    };

    const handleImageChange = useCallback((newDataUri: string) => {
        setEditedImage(newDataUri);
        setIsEditing(true);
    }, []);

    const handleInitialImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setOriginalImage(result);
                setEditedImage(result);
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReset = useCallback(() => {
        setOriginalImage(null);
        setEditedImage(null);
        setIsEditing(false);
    }, []);

    return (
        /* 1. CENTERED WRAPPER: Flex justify-center and items-center */
        <div className="w-full flex justify-center items-center py-10 selection:bg-emerald-500 selection:text-black">

            {/* 2. MAIN HUB: Added shadow-2xl for depth against the Vantablack background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >

                {/* HUD HEADER */}
                <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${originalImage ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                                Media.Processor_v2
                            </h2>
                        </div>
                        <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter italic">
                            {originalImage ? "Buffer: IMAGE_LOADED" : "Buffer: EMPTY // WAITING_FOR_INPUT"}
                        </p>
                    </div>
                    {originalImage && (
                        <button
                            onClick={handleReset}
                            className="group flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <RotateCcw className="w-3 h-3 group-hover:rotate-[-90deg] transition-transform" />
                            Reset_Canvas
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* LEFT: EDITOR CONTROLS */}
                    <div className="space-y-6">
                        {!originalImage ? (
                            <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-zinc-900 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] cursor-pointer transition-all group/upload">
                                <Upload className="w-10 h-10 text-zinc-800 group-hover/upload:text-emerald-500 transition-colors mb-4" />
                                <span className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-600 group-hover/upload:text-white">Initialize_Upload</span>
                                <input type="file" accept="image/*" onChange={handleInitialImageUpload} className="hidden" />
                            </label>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-black border border-zinc-900 overflow-hidden">
                                    <ReactImagePickerEditor
                                        config={config}
                                        imageChanged={handleImageChange}
                                        imageSrcProp={originalImage}
                                    />
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-black border border-zinc-900">
                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest">
                                        Editor tools active. Adjust crop & filters above.
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: PREVIEW OUTPUT */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Output_Render</span>
                            <AnimatePresence>
                                {isEditing && editedImage !== originalImage && (
                                    <motion.span
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="flex items-center gap-1.5 text-[8px] font-mono text-emerald-500 uppercase animate-pulse"
                                    >
                                        <CheckCircle2 className="w-3 h-3" /> Real-time_Sync
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[370px] bg-black border border-zinc-900 flex items-center justify-center overflow-hidden shadow-inner">
                            {editedImage ? (
                                <img
                                    src={editedImage}
                                    alt="Rendered"
                                    className="max-h-full max-w-full object-contain"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-3 opacity-20">
                                    <ImageIcon className="w-12 h-12 stroke-[1px]" />
                                    <span className="text-[8px] tracking-[0.5em] uppercase">No_Data_Signal</span>
                                </div>
                            )}

                            {/* Decorative HUD corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-800" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-800" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-800" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-800" />
                        </div>
                    </div>
                </div>

                {/* BACKGROUND DECOR */}
                <div className="absolute -bottom-6 -left-4 text-8xl font-black text-white/[0.02] select-none uppercase italic pointer-events-none">
                    IMG_EDT
                </div>
            </motion.div>
        </div>
    );
}