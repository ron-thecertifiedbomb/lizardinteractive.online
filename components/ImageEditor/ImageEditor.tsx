    "use client";

    import React, { useState, useCallback } from "react";
    import dynamic from "next/dynamic";
    import type { ImagePickerConf } from "react-image-picker-editor";
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
            borderRadius: "8px",
            language: "en",
            width: "100%",
            height: "320px",
            objectFit: "cover",
            compressInitial: null,
            darkMode: true,
            hideDownloadBtn: false,
        };

        // This should only be called when a NEW image is loaded
        const handleImageChange = useCallback((newDataUri: string) => {
            // Only update the edited image, not the original
            setEditedImage(newDataUri);
            setIsEditing(true);
        }, []);

        // Handle initial image upload separately
        const handleInitialImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    setOriginalImage(result);
                    setEditedImage(result); // Start with the same image
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
            <div className="w-full max-w-3xl p-8 space-y-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl mt-8">
                {/* HEADER */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Image Editor
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {isEditing ? "Editing in real-time" : "Upload an image to start editing"}
                    </p>
                </div>

                {/* FILE UPLOAD - Only show when no image is loaded */}
                {!originalImage && (
                    <div className="flex justify-center">
                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleInitialImageUpload}
                                className="hidden text-slate-50"
                            />
                        </label>
                    </div>
                )}

                {/* PREVIEW */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-300">Edited Preview:</p>
                        {originalImage && (
                            <button
                                onClick={handleReset}
                                className="px-3 py-1 text-xs bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                                Reset All
                            </button>
                        )}
                    </div>

                    <div className="
            w-full min-h-[200px] bg-slate-900/50 border border-white/10 
            rounded-xl flex items-center justify-center overflow-hidden
            backdrop-blur-xl shadow-inner shadow-black/20
            ">
                        {editedImage ? (
                            <img
                                src={editedImage}
                                alt="Edited Preview"
                                className="max-h-[500px] w-full object-contain"
                            />
                        ) : (
                            <span className="text-gray-500">No image selected</span>
                        )}
                    </div>
                </div>

                {/* Editor - Only show when we have an original image */}
                {originalImage && (
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-3xl overflow-hidden">
                            <ReactImagePickerEditor
                                config={config}
                                imageChanged={handleImageChange}
                                imageSrcProp={originalImage} // Pass the ORIGINAL image to editor
                            />
                        </div>
                    </div>
                )}

                {/* Status indicator */}
                {isEditing && editedImage !== originalImage && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Real-time edits applied</span>
                    </div>
                )}
            </div>
        );
    }