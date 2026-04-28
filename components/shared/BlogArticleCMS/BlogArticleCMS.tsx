"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Plus, Trash2, FileText, Upload, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Section = {
    type: string;
    heading: string;
    content: string;
    image?: string;
};

type ArticleFormData = {
    id: string;
    title: string;
    category: string;
    image: string;
    ogImage: string;
    sections: Section[];
};

export const BlogArticleCMS = ({ initialData }: { initialData?: any }) => {
    const { register, control, handleSubmit, reset, setValue, watch } = useForm<ArticleFormData>({
        defaultValues: {
            id: "",
            title: "",
            category: "Engineering",
            image: "",
            ogImage: "",
            sections: [{ type: "paragraph", heading: "", content: "", image: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sections",
    });

    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const imageUrl = watch("image");
    const ogImageUrl = watch("ogImage");
    const watchedSections = watch("sections");
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const friendlyName = String(fieldName).includes('sections') ? 'section image' : fieldName;
        const loadingToast = toast.loading(`Uploading ${friendlyName}...`);
        setIsUploading(true);

        try {
            const base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target?.result as string;
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 1200;
                        const MAX_HEIGHT = 1200;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx?.drawImage(img, 0, 0, width, height);

                        const mimeType = fieldName === "ogImage" ? "image/jpeg" : "image/webp";

                        // Compress with 80% quality
                        resolve(canvas.toDataURL(mimeType, 0.8));
                    };
                    img.onerror = reject;
                };
                reader.onerror = reject;
            });

            const response = await fetch("/api/articles/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64Image }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            setValue(fieldName, data.url, { shouldValidate: true, shouldDirty: true });
            toast.success("Image uploaded successfully!", { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image.", { id: loadingToast });
        } finally {
            setIsUploading(false);
            e.target.value = ""; // Reset input so same file can be selected again
        }
    };


    // Populate form when initialData is fetched
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit = async (data: ArticleFormData) => {
        const loadingToast = toast.loading("Saving article...");
        setIsSaving(true);

        try {
            // Example API call to save the article. 
            // You will need to create an API route like /api/articles/save to handle the MongoDB upsert.
            const response = await fetch("/api/articles/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Article saved successfully!", { id: loadingToast });
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while saving.", { id: loadingToast });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 text-zinc-100">
            {/* Add Toaster so the notifications actually render on the screen! */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#18181b',
                        color: '#fff',
                        border: '1px solid #27272a'
                    }
                }}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
                        <FileText className="text-emerald-500" size={28} />
                        {initialData ? "Edit Article" : "New Article"}
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage the content and SEO data for your blog post.</p>
                </div>

                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSaving}
                    className={`flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Article"}
                </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Keep the ID hidden so we can still pass it when editing an existing article */}
                <input type="hidden" {...register("id")} />

                {/* Meta Section */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl space-y-4">
                    <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Meta Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                            <input {...register("title")} placeholder="E.g., High Performance Next.js..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                            <input {...register("category")} placeholder="Engineering" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Featured Image</label>
                            {/* Keep the image URL hidden, but still register it */}
                            <input type="hidden" {...register("image")} />

                            {imageUrl ? (
                                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-zinc-800 group">
                                    <img src={imageUrl.startsWith('http') || imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`} alt="Featured" className="object-cover w-full h-full" />
                                    <label className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                                        <div className="flex flex-col items-center">
                                            <Upload size={24} className="text-white mb-2" />
                                            <span className="text-sm font-bold text-white">Change Image</span>
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "image")} disabled={isUploading} />
                                    </label>
                                </div>
                            ) : (
                                <label className={`flex flex-col items-center justify-center w-full h-48 md:h-64 bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={32} className="text-zinc-600 mb-3" />
                                    <span className="text-sm font-medium text-zinc-400">Click to upload featured image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "image")} disabled={isUploading} />
                                </label>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Social / OG Image</label>
                            <input type="hidden" {...register("ogImage")} />
                            {ogImageUrl ? (
                                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-zinc-800 group">
                                    <img src={ogImageUrl.startsWith('http') || ogImageUrl.startsWith('/') ? ogImageUrl : `/${ogImageUrl}`} alt="OG" className="object-cover w-full h-full" />
                                    <label className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                                        <div className="flex flex-col items-center">
                                            <Upload size={24} className="text-white mb-2" />
                                            <span className="text-sm font-bold text-white">Change OG Image</span>
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "ogImage")} disabled={isUploading} />
                                    </label>
                                </div>
                            ) : (
                                <label className={`flex flex-col items-center justify-center w-full h-48 md:h-64 bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={32} className="text-zinc-600 mb-3" />
                                    <span className="text-sm font-medium text-zinc-400">Click to upload OG image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "ogImage")} disabled={isUploading} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Sections builder */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                        <h2 className="text-xl font-bold">Content Sections</h2>
                        <button type="button" onClick={() => append({ type: "paragraph", heading: "", content: "", image: "" })} className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md text-emerald-500 font-medium transition-colors">
                            <Plus size={16} /> Add Block
                        </button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="relative bg-zinc-950 border border-zinc-800 p-5 rounded-lg space-y-3 group">
                            <button type="button" onClick={() => remove(index)} className="absolute top-5 right-5 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={18} />
                            </button>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Section Heading (Optional)</label>
                                    <input {...register(`sections.${index}.heading`)} placeholder="Section Title..." className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm" />
                                </div>

                                <div className="w-full md:w-1/3 pr-12">
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Block {index + 1} Type</label>
                                    <select {...register(`sections.${index}.type`)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm">
                                        <option value="paragraph">Paragraph</option>
                                        <option value="heading">Heading</option>
                                        <option value="code">Code Block</option>
                                        <option value="quote">Quote</option>
                                        <option value="image">Image / Graphic</option>
                                    </select>
                                </div>

                                {/* Optional Section Image (for text blocks) */}
                                {watchedSections?.[index]?.type !== "image" && (
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Accompanying Image (Optional)</label>
                                        <input type="hidden" {...register(`sections.${index}.image`)} />
                                        {watchedSections?.[index]?.image ? (
                                            <div className="relative w-full h-32 md:h-48 rounded-xl overflow-hidden border border-zinc-800 group">
                                                <img src={watchedSections[index].image?.startsWith('http') || watchedSections[index].image?.startsWith('/') ? watchedSections[index].image : `/${watchedSections[index].image}`} alt="Section accompanying" className="object-cover w-full h-full" />
                                                <label className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                                                    <div className="flex flex-col items-center">
                                                        <Upload size={20} className="text-white mb-2" />
                                                        <span className="text-sm font-bold text-white">Change Image</span>
                                                    </div>
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `sections.${index}.image`)} disabled={isUploading} />
                                                </label>
                                            </div>
                                        ) : (
                                            <label className={`flex flex-col items-center justify-center w-full h-16 bg-zinc-950 border border-dashed border-zinc-800 hover:border-emerald-500 rounded-lg cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                <span className="text-xs font-medium text-zinc-500 flex items-center gap-2"><Upload size={14} /> Add an image to this section</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `sections.${index}.image`)} disabled={isUploading} />
                                            </label>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Content</label>
                                    {watchedSections?.[index]?.type === "image" ? (
                                        <div className="space-y-4">
                                            <input type="hidden" {...register(`sections.${index}.content`)} />
                                            {watchedSections?.[index]?.content ? (
                                                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-zinc-800 group">
                                                    <img src={watchedSections[index].content.startsWith('http') || watchedSections[index].content.startsWith('/') ? watchedSections[index].content : `/${watchedSections[index].content}`} alt="Section" className="object-cover w-full h-full" />
                                                    <label className={`absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                                                        <div className="flex flex-col items-center">
                                                            <Upload size={24} className="text-white mb-2" />
                                                            <span className="text-sm font-bold text-white">Change Image</span>
                                                        </div>
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `sections.${index}.content`)} disabled={isUploading} />
                                                    </label>
                                                </div>
                                            ) : (
                                                <label className={`flex flex-col items-center justify-center w-full h-48 md:h-64 bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                    <Upload size={32} className="text-zinc-600 mb-3" />
                                                    <span className="text-sm font-medium text-zinc-400">Click to upload section image</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `sections.${index}.content`)} disabled={isUploading} />
                                                </label>
                                            )}
                                        </div>
                                    ) : (
                                        <textarea {...register(`sections.${index}.content`)} placeholder="Enter your content here..." rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-emerald-500 font-mono text-sm resize-y min-h-[100px]" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};