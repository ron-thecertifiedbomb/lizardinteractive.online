"use client";

import { useState, useEffect, useRef } from "react";
import { saveAs } from "file-saver";
import * as docx from "docx";
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs'
import Button from "../shared/Button/Button";
export default function PDFToWordConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [pdfjsLib, setPdfjsLib] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            (async () => {
                const pdfjs = await import("pdfjs-dist/build/pdf.min.mjs");
                const worker = await import('pdfjs-dist/build/pdf.worker.mjs');
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
        <div className="p-4 bg-blue-700 text-white rounded-lg shadow-lg max-w-xl mx-auto">
        
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mb-4 w-full text-white-200"
            />

            <Button
                onClick={convertPDFtoWord}
                disabled={!file || !pdfjsLib || loading}
                className="w-full px-4 py-2 bg-blue-900 hover:bg-blue-700 rounded disabled:opacity-50 transition-colors"
            >
                Convert PDF to Word
            </Button>

            {file && (
                <p className="mt-2 text-sm text-gray-300">Selected: {file.name}</p>
            )}
        </div>
    );
}
