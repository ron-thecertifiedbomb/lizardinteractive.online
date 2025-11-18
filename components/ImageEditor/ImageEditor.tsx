"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { ImagePickerConf } from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import Container from "../container";
import Button from "../shared/Button/Button";

// Load only on client to avoid “window is not defined”
const ReactImagePickerEditor = dynamic(
    () => import("react-image-picker-editor"),
    { ssr: false }
);

export default function ImageEditorModal() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const config: ImagePickerConf = {
        borderRadius: "1px",
        language: "en",
        width: "100%",
        height: "300px", // proper height
        objectFit: "cover",
        compressInitial: null,
        darkMode: true,
        hideDeleteBtn: false,
  
    
    };

    return (
        <Container>
            <div className=" w-full flex items-center rie-container ">
                <div className=" rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6">

         

                    {/* Preview */}
                    <div className="w-full  mt-4">
                        {imageSrc &&  <p className="text-sm text-gray-200 mb-2">Preview:</p>}
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt="Edited"
                                className="max-h-[500px] mx-auto w-full object-contain rounded-md bg-black"
                            />
                        ) : (
                            <h3 className="text-gray-200 text-lg text-center font-medium">
                                No image loaded yet
                            </h3>
                        )}
                    </div>

                    {/* Editor */}
                    {imageSrc && <p className="text-sm text-gray-200 ">Source Image:</p>}   
                    <div className=" rounded-md overflow-hidden  ">
                        <ReactImagePickerEditor
                            config={config}
                            // ❌ Remove imageSrcProp
                            imageChanged={(newDataUri: string) => setImageSrc(newDataUri)}
                        />
                    </div>

                

                </div>
            </div>
        </Container>
    );
}
