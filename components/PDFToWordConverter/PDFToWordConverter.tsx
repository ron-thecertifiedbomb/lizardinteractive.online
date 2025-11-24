"use client";

import { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import * as docx from "docx";
import Button from "../shared/Button/Button";
import Container from "../container";

export default function PDFToWordConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [pdfjsLib, setPdfjsLib] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (async () => {
                const pdfjs = await import("pdfjs-dist/build/pdf.min.mjs");
                const worker = await import("pdfjs-dist/build/pdf.worker.mjs");

                pdfjs.GlobalWorkerOptions.workerSrc = worker?.default || "";
                setPdfjsLib(pdfjs);
            })();
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const convertPDFtoWord = async () => {
        if (!file) return alert("Select a PDF first");
        if (!pdfjsLib) return alert("PDF library is loading...");
        setLoading(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map((item: any) => item.str);
                fullText += strings.join(" ") + "\n\n";
            }

            const doc = new docx.Document({
                sections: [{ children: [new docx.Paragraph(fullText)] }],
            });

            const blob = await docx.Packer.toBlob(doc);
            saveAs(blob, file.name.replace(".pdf", ".docx"));
        } catch (err) {
            console.error(err);
            alert("Failed to convert PDF to Word.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
        <div className="w-full  mx-auto p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-white/10 shadow-2xl animate-fadeIn">

            {/* Title */}
            <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text drop-shadow-xl">
                PDF → Word Converter
            </h2>

            {/* Upload Box */}
            <label
                className={`
                    group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition 
                    ${file ? "border-blue-500 bg-slate-800/60" : "border-gray-500 hover:border-cyan-400 hover:bg-slate-800/50"}
                `}
            >
                <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <svg
                    className="w-12 h-12 text-gray-300 group-hover:text-cyan-300 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                    />
                </svg>

                <p className="mt-3 text-gray-300 text-sm">
                    {file ? (
                        <span className="text-cyan-400 font-medium">{file.name}</span>
                    ) : (
                        "Click to upload a PDF"
                    )}
                </p>
            </label>

            {/* Convert Button */}
            <Button
                onClick={convertPDFtoWord}
                disabled={!file || !pdfjsLib || loading}
                className={`
                    w-full py-3 mt-6 rounded-xl text-white font-semibold transition 
                    ${loading
                        ? "bg-blue-700 cursor-not-allowed animate-pulse"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"}
                `}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="loader w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                        Converting...
                    </span>
                ) : (
                    "Convert PDF to Word"
                )}
            </Button>

            {/* Fade-in animation */}
            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .loader {
                    border-right-color: transparent;
                }
            `}</style>
        </div>
        </Container> 
    );
}
