import { BlogArticle } from '@/data/lists/blogArticle';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';


export const BlogArticleCMS = ({ initialData }: { initialData?: BlogArticle }) => {
    const { register, control, handleSubmit } = useForm<BlogArticle>({
        defaultValues: initialData || {
            sections: [{ heading: '', content: '', items: [] }]
        }
    });

    // Main Section Controller
    const { fields: sectionFields, append: appendSection, remove: removeSection } =
        useFieldArray({ control, name: "sections" });

    const onSubmit = (data: BlogArticle) => {
        console.log("Final JSON for Export:", JSON.stringify(data, null, 2));
        // Here you would save to your database or local JSON file
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 bg-gray-900 text-white">
            <header className="border-b border-gray-700 pb-4">
                <h1 className="text-2xl font-bold">Article Editor</h1>
                <input {...register("title")} placeholder="Article Title" className="w-full bg-transparent text-4xl font-bold outline-none" />
            </header>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
                <input {...register("id")} placeholder="slug-id" className="p-2 bg-gray-800 rounded" />
                <select {...register("category")} className="p-2 bg-gray-800 rounded">
                    <option value="GEAR_AUDIT">Gear Audit</option>
                    <option value="DEV_LESSONS">Dev Lessons</option>
                    <option value="SECURITY_GUIDES">Security</option>
                </select>
            </div>

            {/* SECTIONS BUILDER */}
            <div className="space-y-6">
                {sectionFields.map((section, sIndex) => (
                    <div key={section.id} className="p-6 border border-gray-700 rounded-lg bg-gray-800 relative">
                        <button onClick={() => removeSection(sIndex)} className="absolute top-2 right-2 text-red-400 text-sm">Delete Section</button>

                        <input
                            {...register(`sections.${sIndex}.heading`)}
                            placeholder="Section Heading"
                            className="w-full mb-2 bg-transparent text-xl font-semibold border-b border-gray-600"
                        />

                        <textarea
                            {...register(`sections.${sIndex}.content`)}
                            placeholder="Section content (Markdown supported)"
                            className="w-full h-32 p-2 bg-gray-900 rounded mt-2"
                        />

                        {/* NESTED ITEMS BUILDER */}
                        <ItemsBuilder sectionIndex={sIndex} control={control} register={register} />
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <button type="button" onClick={() => appendSection({ heading: '', content: '' })} className="px-4 py-2 bg-blue-600 rounded">
                    + Add Section
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 rounded font-bold">
                    Export Blog JSON
                </button>
            </div>
        </form>
    );
};

// Sub-component for the nested "items" and "details"
const ItemsBuilder = ({ sectionIndex, control, register }: any) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `sections.${sectionIndex}.items`
    });

    return (
        <div className="mt-4 ml-6 border-l-2 border-blue-500 pl-4">
            <h4 className="text-sm uppercase text-blue-400 font-bold mb-2">Items / Products</h4>
            {fields.map((item, iIndex) => (
                <div key={item.id} className="mb-4 p-4 bg-gray-700 rounded relative">
                    <input {...register(`sections.${sectionIndex}.items.${iIndex}.name`)} placeholder="Item Name" className="font-bold bg-transparent block" />
                    <input {...register(`sections.${sectionIndex}.items.${iIndex}.description`)} placeholder="Description" className="text-sm w-full bg-transparent text-gray-300" />
                    {/* Here you would add the Details mapping similarly */}
                    <button onClick={() => remove(iIndex)} className="text-xs text-red-300 mt-2">Remove Item</button>
                </div>
            ))}
            <button type="button" onClick={() => append({ name: '', description: '', details: [] })} className="text-sm text-blue-300">
                + Add Item (Product/Tip)
            </button>
        </div>
    );
};