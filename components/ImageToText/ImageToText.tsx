"use client";

import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { toast } from "react-hot-toast";
import { Upload, X, Cpu, Copy, Check, FileText, Scan } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageToTextConverter() {
    const [image, setImage] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        setImage(file);
        setText("");
        setProgress(0);
    };

    const handleConvert = async () => {
        if (!image) return toast.error("SOURCE_ERROR: No image selected");
        setLoading(true);
        setProgress(0);
        setText("");

        try {
            const result = await Tesseract.recognize(image, "eng", {
                logger: (m) => {
                    if (m.status === "recognizing text") {
                        setProgress(Math.floor(m.progress * 100));
                    }
                },
            });
            setText(result.data.text);
            toast.success("DATA_SYNC: Extraction complete");
        } catch (error) {
            console.error(error);
            toast.error("RUNTIME_ERROR: Extraction failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#080808] border border-zinc-900 p-8 relative overflow-hidden group selection:bg-emerald-500 selection:text-black">

            {/* HUD HEADER */}
            <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Scan className={`w-3 h-3 ${loading ? 'text-emerald-500 animate-pulse' : 'text-zinc-800'}`} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                            System.OCR_v2
                        </h2>
                    </div>
                    <p className="text-[9px] text-zinc-600 uppercase font-mono tracking-tighter italic">
                        {loading ? `PROCESS: RECOGNIZING_TEXT // ${progress}%` : image ? 'Status: READY_FOR_PARSING' : 'Status: WAITING_FOR_INPUT'}
                    </p>
                </div>
                <Cpu className={`w-4 h-4 ${loading ? 'text-emerald-500 animate-spin-slow' : 'text-zinc-900'}`} />
            </div>

            <div className="space-y-8">
                {/* DROPZONE / PREVIEW */}
                <div className="relative">
                    {!image ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                            onDragOver={(e) => e.preventDefault()}
                            className="h-80 border-2 border-dashed border-zinc-900 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] cursor-pointer transition-all flex flex-col items-center justify-center gap-4 group/drop"
                        >
                            <Upload className="w-10 h-10 text-zinc-800 group-hover/drop:text-emerald-500 transition-colors" />
                            <span className="text-[10px] tracking-[0.3em] font-black uppercase text-zinc-600 group-hover/drop:text-white">Initialize_Source_Upload</span>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative bg-black border border-zinc-900 p-2">
                            <img src={URL.createObjectURL(image)} alt="Buffer" className="w-full max-h-[400px] object-contain" />
                            <button
                                onClick={() => { setImage(null); setText(""); }}
                                className="absolute top-4 right-4 p-2 bg-red-600 text-white hover:bg-red-500 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} className="hidden" />
                </div>

                {/* ACTION BAR */}
                <div className="flex flex-col items-center gap-6">
                    {!text && (
                        <button
                            onClick={handleConvert}
                            disabled={loading || !image}
                            className="flex items-center gap-3 bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all disabled:opacity-20"
                        >
                            {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                            {loading ? `PARSING_BUFFER...` : "Execute_Extraction"}
                        </button>
                    )}

                    {/* PROGRESS HUD */}
                    {loading && (
                        <div className="w-full max-w-md space-y-2">
                            <div className="flex justify-between text-[8px] font-mono text-zinc-600 uppercase">
                                <span>Engine_Load</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-px bg-zinc-900">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* OUTPUT TERMINAL */}
                <AnimatePresence>
                    {text && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Output_Buffer</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(text);
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 2000);
                                    }}
                                    className="flex items-center gap-2 text-[8px] font-mono text-emerald-500 uppercase hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Data_Copied' : 'Copy_to_Clipboard'}
                                </button>
                            </div>
                            <textarea
                                readOnly
                                value={text}
                                className="w-full h-64 bg-black border border-zinc-900 p-6 font-mono text-sm text-zinc-400 outline-none focus:border-emerald-500/30 transition-all resize-none leading-relaxed"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* BACKGROUND DECOR */}
            <div className="absolute -bottom-6 -right-6 text-9xl font-black text-white/[0.02] select-none uppercase italic pointer-events-none">
                OCR_MOD
            </div>
        </div>
    );
}

const RefreshCcw = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
    </svg>
);