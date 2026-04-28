"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Save, Plus, Trash2, FileText, Upload } from "lucide-react";
import toast from "react-hot-toast";

type Section = {
    type: string;
    content: string;
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
    const { register, control, handleSubmit, reset, setValue } = useForm<ArticleFormData>({
        defaultValues: {
            id: "",
            title: "",
            category: "Engineering",
            image: "",
            ogImage: "",
            sections: [{ type: "paragraph", content: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sections",
    });

    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "image" | "ogImage") => {
        const file = e.target.files?.[0];
        if (!file) return;

        const loadingToast = toast.loading(`Uploading ${fieldName}...`);
        setIsUploading(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Image = reader.result;

                const response = await fetch("/api/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64Image }),
                });

                const data = await response.json();

                if (response.ok) {
                    setValue(fieldName, data.url, { shouldValidate: true, shouldDirty: true });
                    toast.success("Image uploaded successfully!", { id: loadingToast });
                } else {
                    throw new Error(data.message || "Upload failed");
                }
            };
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
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 text-zinc-100">
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
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                    <Save size={18} />
                    Save Article
                </button>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Meta Section */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl space-y-4">
                    <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Meta Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                            <input {...register("title")} placeholder="E.g., High Performance Next.js..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Slug (URL ID)</label>
                            <input {...register("id")} placeholder="high-performance-nextjs" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                            <input {...register("category")} placeholder="Engineering" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Featured Image URL</label>
                            <div className="flex gap-2">
                                <input {...register("image")} placeholder="https://res.cloudinary.com/..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                <label className={`flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={16} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-zinc-300">Upload</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "image")} disabled={isUploading} />
                                </label>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-zinc-400 mb-1">OG Image URL (For Social Sharing)</label>
                            <div className="flex gap-2">
                                <input {...register("ogImage")} placeholder="https://res.cloudinary.com/..." className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                <label className={`flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <Upload size={16} className="text-emerald-500" />
                                    <span className="text-sm font-bold text-zinc-300">Upload</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "ogImage")} disabled={isUploading} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections builder */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                        <h2 className="text-xl font-bold">Content Sections</h2>
                        <button type="button" onClick={() => append({ type: "paragraph", content: "" })} className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md text-emerald-500 font-medium transition-colors">
                            <Plus size={16} /> Add Block
                        </button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="relative bg-zinc-950 border border-zinc-800 p-5 rounded-lg space-y-3 group">
                            <button type="button" onClick={() => remove(index)} className="absolute top-5 right-5 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={18} />
                            </button>
                            <div className="pr-12">
                                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Block {index + 1} Type</label>
                                <select {...register(`sections.${index}.type`)} className="w-full md:w-64 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm mb-3">
                                    <option value="paragraph">Paragraph</option>
                                    <option value="heading">Heading</option>
                                    <option value="code">Code Block</option>
                                    <option value="quote">Quote</option>
                                    <option value="image">Image / Graphic</option>
                                </select>
                            </div>
                            <div>
                                <textarea {...register(`sections.${index}.content`)} placeholder="Enter your content here..." rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-emerald-500 font-mono text-sm resize-y min-h-[100px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};