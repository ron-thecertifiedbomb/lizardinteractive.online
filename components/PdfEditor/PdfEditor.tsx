'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
    FileText,
    Scissors,
    Combine,
    Trash2,
    Plus,
    Loader2,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PDFFile {
    id: string;
    file: File;
    pageCount: number;
}

export default function PdfEditor() {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 1. Unified Upload Handler
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(e.target.files || []);
        if (uploadedFiles.length === 0) return;

        setIsProcessing(true);
        try {
            const newFiles = await Promise.all(uploadedFiles.map(async (f) => {
                const arrayBuffer = await f.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                return {
                    id: Math.random().toString(36).substring(2, 9),
                    file: f,
                    pageCount: pdfDoc.getPageCount()
                };
            }));
            setFiles(prev => [...prev, ...newFiles]);
        } catch (err) {
            console.error("LIZARD_ERROR: PDF_LOAD_FAILED", err);
            alert("FILE_PROTOCOL_ERROR: CORRUPT_OR_ENCRYPTED_PDF");
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    // 2. Surgical Download Protocol (Fixed TS Uint8Array issue)
    const downloadFile = (bytes: Uint8Array, name: string) => {
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    };

    // 3. The Merging Engine
    const mergePDFs = async () => {
        if (files.length < 2) return;
        setIsProcessing(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const item of files) {
                const pdfBytes = await item.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedBytes = await mergedPdf.save();
            downloadFile(mergedBytes, `merged_protocol_${Date.now()}.pdf`);
        } catch (err) {
            console.error("LIZARD_ERROR: MERGE_FAILED", err);
        } finally {
            setIsProcessing(false);
        }
    };

    // 4. The Splitting Engine
    const splitPDF = async (fileItem: PDFFile) => {
        setIsProcessing(true);
        try {
            const pdfBytes = await fileItem.file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);

            for (let i = 0; i < pdfDoc.getPageCount(); i++) {
                const newDoc = await PDFDocument.create();
                const [page] = await newDoc.copyPages(pdfDoc, [i]);
                newDoc.addPage(page);
                const bytes = await newDoc.save();
                downloadFile(bytes, `${fileItem.file.name.replace('.pdf', '')}_page_${i + 1}.pdf`);
            }
        } catch (err) {
            console.error("LIZARD_ERROR: SPLIT_FAILED", err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-[#050505] border border-white/5 rounded-[2.5rem] shadow-2xl font-mono relative overflow-hidden">

            {/* HUD Diagnostic Header */}
            <div className="flex justify-between items-center mb-10 opacity-50 px-2">
                <div className="space-y-1">
                    <span className="text-[10px] text-emerald-500 font-black tracking-[0.4em] block">// PDF_SURGEON_SYSTEM</span>
                    <span className="text-[7px] text-zinc-500 uppercase tracking-widest">
                        Status: {isProcessing ? 'PROCESSING_BUFFER' : 'SIGNAL_IDLE'}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                    {isProcessing && <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />}
                </div>
            </div>

            {/* Surgical Injection Zone (Uploader) */}
            <div
                onClick={() => !isProcessing && fileInputRef.current?.click()}
                className={`group relative border-2 border-dashed transition-all duration-500 p-12 rounded-3xl cursor-pointer flex flex-col items-center justify-center gap-4 text-center mb-10
                    ${isProcessing ? 'border-zinc-900 opacity-50' : 'border-zinc-900 hover:border-emerald-500/30 bg-zinc-950'}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf"
                    multiple
                    className="hidden"
                />
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_40px_#10b98133]">
                    <Plus className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-white font-black uppercase tracking-[0.2em]">Inject PDF Data</p>
                    <p className="text-[8px] text-zinc-600 uppercase">Multi-file local stream active</p>
                </div>
            </div>

            {/* The Processing Queue */}
            <div className="space-y-3 mb-10 min-h-[120px]">
                <AnimatePresence mode='popLayout'>
                    {files.map((f) => (
                        <motion.div
                            key={f.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 10, opacity: 0 }}
                            className="flex items-center justify-between p-5 bg-zinc-900/20 border border-white/5 rounded-2xl group hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-zinc-950 rounded-xl border border-white/5">
                                    <FileText className="w-4 h-4 text-zinc-500" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[11px] text-white font-bold truncate max-w-[150px] sm:max-w-[280px]">{f.file.name}</p>
                                    <p className="text-[7px] text-emerald-500 uppercase font-black tracking-widest flex items-center gap-2">
                                        <Zap className="w-2 h-2" /> {f.pageCount} Pages Loaded
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); splitPDF(f); }}
                                    className="p-3 hover:bg-emerald-500/10 rounded-xl text-zinc-600 hover:text-emerald-500 transition-all"
                                    title="Split to Pages"
                                >
                                    <Scissors className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                                    className="p-3 hover:bg-red-500/10 rounded-xl text-zinc-600 hover:text-red-500 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {files.length === 0 && (
                        <div className="h-24 flex flex-col items-center justify-center border border-white/[0.02] rounded-3xl opacity-20 gap-2">
                            <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Awaiting_Input_Signal</span>
                            <div className="w-24 h-[1px] bg-zinc-800" />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Master Action HUD */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                    disabled={files.length < 2 || isProcessing}
                    onClick={mergePDFs}
                    className="w-full flex items-center justify-center gap-4 py-5 bg-emerald-500 text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all active:scale-95 disabled:opacity-5 disabled:grayscale shadow-[0_0_50px_#10b98122]"
                >
                    <Combine className="w-4 h-4" />
                    Run_Merge_Protocol
                </button>

                <div className="w-full sm:w-32 py-5 px-6 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center bg-zinc-950/50">
                    <span className="text-[6px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Assets</span>
                    <span className="text-xl text-white font-black leading-none">{files.length}</span>
                </div>
            </div>

            {/* Security/Metadata Footer */}
            <div className="mt-14 flex justify-between items-center pt-8 border-t border-zinc-900 text-[7px] text-zinc-800 uppercase tracking-widest">
                <div className="flex gap-4">
                    <span>Privacy: Local_Only</span>
                    <span>Encryption: AES_256_Compatible</span>
                </div>
                <span>LIZARD_INT_DIAG_PDF_V1.5</span>
            </div>
        </div>
    );
}