'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileText, Scissors, Combine, Download, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PdfEditor() {
    const [files, setFiles] = useState<{ id: string; file: File; pageCount: number }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(e.target.files || []);
        const newFiles = await Promise.all(uploadedFiles.map(async (f) => {
            const arrayBuffer = await f.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            return {
                id: Math.random().toString(36).substr(2, 9),
                file: f,
                pageCount: pdfDoc.getPageCount()
            };
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const mergePDFs = async () => {
        if (files.length < 2) return alert("MINIMUM_TWO_FILES_REQUIRED");
        setIsProcessing(true);

        try {
            const mergedPdf = await PDFDocument.create();
            for (const item of files) {
                const pdfBytes = await item.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            downloadFile(pdfBytes, "merged_lizard_doc.pdf");
        } catch (err) {
            console.error("SURGICAL_ERROR:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const splitPDF = async (fileItem: typeof files[0]) => {
        setIsProcessing(true);
        try {
            const pdfBytes = await fileItem.file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Example: Split into individual pages
            for (let i = 0; i < pdfDoc.getPageCount(); i++) {
                const newDoc = await PDFDocument.create();
                const [page] = await newDoc.copyPages(pdfDoc, [i]);
                newDoc.addPage(page);
                const bytes = await newDoc.save();
                downloadFile(bytes, `${fileItem.file.name}_page_${i + 1}.pdf`);
            }
        } finally {
            setIsProcessing(false);
        }
    };
    const downloadFile = (bytes: Uint8Array, name: string) => {
        // We wrap 'bytes' in an array as usual, 
        // but the Blob constructor is sometimes picky about the specific flavor of Uint8Array.
        // Casting or just ensuring it's a standard BlobPart usually does the trick.
        const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;

        // Append to body to ensure it works in all browsers (Surgical precision)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up memory to keep the "Lizard" engine lean
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    };
    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-zinc-950 border border-white/5 rounded-[2rem] font-mono shadow-2xl">
            {/* HUD Header */}
            <div className="flex justify-between items-center mb-10 opacity-50 px-2">
                <div className="space-y-1">
                    <span className="text-[10px] text-emerald-500 font-black tracking-[0.3em] block">// PDF_SURGEON_V1</span>
                    <span className="text-[8px] text-zinc-500 uppercase">Status: {isProcessing ? 'PROCESSING_BUFFER' : 'AWAITING_INPUT'}</span>
                </div>
                <FileText className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Upload Zone */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 bg-zinc-900/20 p-10 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center gap-4 text-center mb-8"
            >
                <input type="file" ref={fileInputRef} onChange={handleUpload} accept=".pdf" multiple className="hidden" />
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <Plus className="w-6 h-6" />
                </div>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Inject PDF Assets</p>
            </div>

            {/* Queue List */}
            <div className="space-y-3 mb-10">
                <AnimatePresence>
                    {files.map((f) => (
                        <motion.div
                            key={f.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="flex items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-xl group"
                        >
                            <div className="flex items-center gap-4">
                                <FileText className="w-5 h-5 text-zinc-700" />
                                <div>
                                    <p className="text-[11px] text-white font-bold truncate max-w-[200px]">{f.file.name}</p>
                                    <p className="text-[8px] text-emerald-500 uppercase font-bold tracking-tighter">{f.pageCount} Pages</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => splitPDF(f)} className="p-2 hover:text-emerald-500 text-zinc-500" title="Split into Pages">
                                    <Scissors className="w-4 h-4" />
                                </button>
                                <button onClick={() => removeFile(f.id)} className="p-2 hover:text-red-500 text-zinc-500">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Action HUD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    disabled={files.length < 2 || isProcessing}
                    onClick={mergePDFs}
                    className="flex items-center justify-center gap-3 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all active:scale-95 disabled:opacity-10 disabled:cursor-not-allowed shadow-[0_0_30px_#10b98122]"
                >
                    <Combine className="w-4 h-4" />
                    Execute_Merge
                </button>

                <div className="border border-zinc-800 p-4 rounded-xl flex items-center justify-between opacity-40">
                    <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Queue_Count</span>
                    <span className="text-xl text-white font-black">{files.length}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 flex justify-between items-center pt-6 border-t border-zinc-900 text-[7px] text-zinc-800 uppercase tracking-widest">
                <span>Memory_State: Localhost_Only</span>
                <span>Lizard_Interactive_Hardware_PDF_v1.0</span>
            </div>
        </div>
    );
}