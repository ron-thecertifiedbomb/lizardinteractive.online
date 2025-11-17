"use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { toast } from "react-hot-toast";
import Button from "../shared/Button/Button";

export default function ImageToTextConverter() {
    const [image, setImage] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setImage(e.dataTransfer.files[0]);
            setText("");
            setProgress(0);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setText("");
            setProgress(0);
        }
    };

    const handleConvert = async () => {
        if (!image) return toast.error("Please select an image first");
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
            toast.success("Text extracted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to extract text");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-blue-700 text-white rounded-lg shadow-lg max-w-xl mx-auto">
            {/* Drag & Drop Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="mb-4 p-6 border-2 border-dashed bg-blue-600 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
                {!image && <p>Drag & drop an image here, or click to select</p>}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Thumbnail Preview */}
            {image && (
                <div className="relative mb-4">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full max-h-64 object-contain rounded-lg border border-gray-600"
                    />
                    <button
                        onClick={() => {
                            setImage(null);  // remove image
                            setText("");      // clear extracted text
                            setProgress(0);   // optional: reset progress
                        }}
                        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center font-bold"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Convert Button */}
            <Button
                onClick={handleConvert}
                disabled={loading || !image}
                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 transition-colors w-full"
            >
                {loading ? `Converting... ${progress}%` : "Convert Image to Text"}
            </Button>

            {/* Progress Bar */}
            {loading && (
                <div className="w-full bg-gray-700 h-2 rounded mb-4">
                    <div
                        className="bg-blue-500 h-2 rounded transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Output */}
            {text && (
                <div className="flex flex-col gap-2">
                    <textarea
                        className="w-full p-2 bg-gray-800 rounded h-40 resize-none"
                        value={text}
                        readOnly
                    />
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(text);
                            toast.success("Copied to clipboard!");
                        }}
                        className="w-full px-4 py-2 bg-blue-900 hover:bg-blue-700 rounded disabled:opacity-50 transition-colors"
                    >
                        Copy Text
                    </Button>
                </div>
            )}
        </div>
    );
}
