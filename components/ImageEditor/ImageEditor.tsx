"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { ImagePickerConf } from "react-image-picker-editor";
import { RotateCcw, Download, Activity } from "lucide-react";
import { motion } from "framer-motion";
import "react-image-picker-editor/dist/index.css";

const ReactImagePickerEditor = dynamic(
    () => import("react-image-picker-editor"),
    { ssr: false }
);

export default function SimpleImageProcessor() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const config: ImagePickerConf = {
        borderRadius: "0px",
        language: "en",
        width: "100%",
        height: "320px",
        objectFit: "contain",
        compressInitial: null,
        darkMode: true,
        hideDownloadBtn: true,
    };

    const handleImageChange = useCallback((newDataUri: string) => {
        setEditedImage(newDataUri);
        if (!originalImage && newDataUri) {
            setOriginalImage(newDataUri);
        }
    }, [originalImage]);

    const handleReset = useCallback(() => {
        setOriginalImage(null);
        setEditedImage(null);
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }, []);

    const handleExport = () => {
        if (!editedImage) return;
        const link = document.createElement("a");
        link.href = editedImage;
        const extension = editedImage.substring(editedImage.indexOf("/") + 1, editedImage.indexOf(";"));
        link.download = `lizard-export-${Date.now()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full text-white font-sans flex flex-col items-center justify-center p-4 bg-black min-h-[500px]">
            <main className="max-w-md mx-auto w-full flex flex-col">
                <section className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-zinc-900/20 p-4 rounded-sm shadow-2xl border border-zinc-900">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <Activity className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-white">Image Editor</span>
                                </div>
                                {editedImage && (
                                    <button onClick={handleReset} className="text-zinc-500 hover:text-red-500 transition-colors">
                                        <RotateCcw className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                            <div className="rounded-sm overflow-hidden border border-zinc-800 bg-black min-h-[320px]">
                                <ReactImagePickerEditor
                                    config={config}
                                    imageChanged={handleImageChange}
                                    imageSrcProp={originalImage}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleExport}
                            disabled={!editedImage}
                            className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm flex items-center justify-center gap-2 
                                ${editedImage
                                    ? "bg-emerald-600 text-black hover:bg-emerald-500 active:scale-[0.98]"
                                    : "bg-zinc-900 text-zinc-700 cursor-not-allowed"}`}
                        >
                            <Download className="w-3 h-3" /> Export 
                        </button>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}