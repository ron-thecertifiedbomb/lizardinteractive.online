import React, { useState } from 'react';
import { BlogArticle } from '@/data/lists/blogArticle';

// Helper function to generate a unique ID (for new items/sections)
const generateUniqueId = () => Math.random().toString(36).slice(2, 11);

interface BlogArticleFormProps {
    onArticleSubmit: (article: BlogArticle) => void;
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({ onArticleSubmit }) => {
    const [article, setArticle] = useState<BlogArticle>({
        id: generateUniqueId(),
        title: '',
        category: '',
        image: '',
        ogImage: '',
        createdAt: new Date().toISOString(),
        sections: [],
    });

    const handleArticleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleSectionChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const newSections = [...article.sections];
        newSections[index] = {
            ...newSections[index],
            [name]: value,
        };
        setArticle((prevArticle) => ({
            ...prevArticle,
            sections: newSections,
        }));
    };

    const addSection = () => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            sections: [
                ...prevArticle.sections,
                { heading: '', content: '', items: [] },
            ],
        }));
    };

    const removeSection = (index: number) => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            sections: prevArticle.sections.filter((_, i) => i !== index),
        }));
    };

    const handleItemChange = (
        sectionIndex: number,
        itemIndex: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const newSections = [...article.sections];
        if (newSections[sectionIndex].items) {
            newSections[sectionIndex].items![itemIndex] = {
                ...newSections[sectionIndex].items![itemIndex],
                [name]: value,
            };
            setArticle((prevArticle) => ({
                ...prevArticle,
                sections: newSections,
            }));
        }
    };

    const addItem = (sectionIndex: number) => {
        const newSections = [...article.sections];
        if (!newSections[sectionIndex].items) {
            newSections[sectionIndex].items = [];
        }
        newSections[sectionIndex].items!.push({
            name: '',
            description: '',
            details: [],
        });
        setArticle((prevArticle) => ({
            ...prevArticle,
            sections: newSections,
        }));
    };

    const removeItem = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...article.sections];
        if (newSections[sectionIndex].items) {
            newSections[sectionIndex].items = newSections[sectionIndex].items!.filter(
                (_, i) => i !== itemIndex
            );
            setArticle((prevArticle) => ({
                ...prevArticle,
                sections: newSections,
            }));
        }
    };

    const handleDetailChange = (
        sectionIndex: number,
        itemIndex: number,
        detailIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const newSections = [...article.sections];
        if (newSections[sectionIndex].items && newSections[sectionIndex].items![itemIndex].details) {
            newSections[sectionIndex].items![itemIndex].details![detailIndex] = {
                ...newSections[sectionIndex].items![itemIndex].details![detailIndex],
                [name]: value,
            };
            setArticle((prevArticle) => ({
                ...prevArticle,
                sections: newSections,
            }));
        }
    };

    const addDetail = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...article.sections];
        if (newSections[sectionIndex].items) {
            if (!newSections[sectionIndex].items![itemIndex].details) {
                newSections[sectionIndex].items![itemIndex].details = [];
            }
            newSections[sectionIndex].items![itemIndex].details!.push({
                label: '',
                value: '',
            });
            setArticle((prevArticle) => ({
                ...prevArticle,
                sections: newSections,
            }));
        }
    };

    const removeDetail = (sectionIndex: number, itemIndex: number, detailIndex: number) => {
        const newSections = [...article.sections];
        if (newSections[sectionIndex].items && newSections[sectionIndex].items![itemIndex].details) {
            newSections[sectionIndex].items![itemIndex].details = newSections[sectionIndex].items![itemIndex].details!.filter(
                (_, i) => i !== detailIndex
            );
            setArticle((prevArticle) => ({
                ...prevArticle,
                sections: newSections,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onArticleSubmit(article);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Add New Blog Article</h2>

            {/* Article Details */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={article.category}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (UI)</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={article.image}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">OG Image URL (Social)</label>
                <input
                    type="text"
                    id="ogImage"
                    name="ogImage"
                    value={article.ogImage || ''}
                    onChange={handleArticleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Created At</label>
                <input
                    type="datetime-local"
                    id="createdAt"
                    name="createdAt"
                    value={article.createdAt.substring(0, 16)} // Format for datetime-local input
                    onChange={(e) => setArticle({ ...article, createdAt: new Date(e.target.value).toISOString() })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>

            {/* Sections */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Sections</h3>
            {article.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border p-4 rounded-md space-y-3 bg-gray-50">
                    <h4 className="font-medium">Section {sectionIndex + 1}</h4>
                    <div>
                        <label htmlFor={`section-${sectionIndex}-heading`} className="block text-sm font-medium text-gray-700">Heading</label>
                        <input
                            type="text"
                            id={`section-${sectionIndex}-heading`}
                            name="heading"
                            value={section.heading}
                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor={`section-${sectionIndex}-content`} className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id={`section-${sectionIndex}-content`}
                            name="content"
                            value={section.content}
                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        ></textarea>
                    </div>

                    {/* Items within Section */}
                    <h5 className="text-md font-medium mt-4 mb-2">Items (Optional)</h5>
                    {section.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="border-l-2 border-blue-300 pl-3 py-2 space-y-2 bg-white">
                            <h6 className="text-sm font-normal">Item {itemIndex + 1}</h6>
                            <div>
                                <label htmlFor={`section-${sectionIndex}-item-${itemIndex}-name`} className="block text-xs font-medium text-gray-600">Name</label>
                                <input
                                    type="text"
                                    id={`section-${sectionIndex}-item-${itemIndex}-name`}
                                    name="name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(sectionIndex, itemIndex, e)}
                                    className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-1 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor={`section-${sectionIndex}-item-${itemIndex}-image`} className="block text-xs font-medium text-gray-600">Image URL (Optional)</label>
                                <input
                                    type="text"
                                    id={`section-${sectionIndex}-item-${itemIndex}-image`}
                                    name="image"
                                    value={item.image || ''}
                                    onChange={(e) => handleItemChange(sectionIndex, itemIndex, e)}
                                    className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-1 text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor={`section-${sectionIndex}-item-${itemIndex}-description`} className="block text-xs font-medium text-gray-600">Description</label>
                                <textarea
                                    id={`section-${sectionIndex}-item-${itemIndex}-description`}
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(sectionIndex, itemIndex, e)}
                                    rows={2}
                                    className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-1 text-sm"
                                    required
                                ></textarea>
                            </div>

                            {/* Details within Item */}
                            <h6 className="text-xs font-medium mt-3 mb-1">Details (Optional)</h6>
                            {item.details?.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex space-x-2 items-center bg-gray-100 p-1 rounded-sm">
                                    <input
                                        type="text"
                                        name="label"
                                        placeholder="Label"
                                        value={detail.label}
                                        onChange={(e) => handleDetailChange(sectionIndex, itemIndex, detailIndex, e)}
                                        className="block w-1/2 border border-gray-200 rounded-md shadow-sm p-1 text-xs"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="value"
                                        placeholder="Value"
                                        value={detail.value}
                                        onChange={(e) => handleDetailChange(sectionIndex, itemIndex, detailIndex, e)}
                                        className="block w-1/2 border border-gray-200 rounded-md shadow-sm p-1 text-xs"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeDetail(sectionIndex, itemIndex, detailIndex)}
                                        className="text-red-500 hover:text-red-700 text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addDetail(sectionIndex, itemIndex)}
                                className="mt-2 px-3 py-1 bg-green-200 text-green-800 text-xs rounded-md hover:bg-green-300"
                            >
                                Add Detail
                            </button>
                            <button
                                type="button"
                                onClick={() => removeItem(sectionIndex, itemIndex)}
                                className="ml-2 px-3 py-1 bg-red-200 text-red-800 text-xs rounded-md hover:bg-red-300"
                            >
                                Remove Item
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addItem(sectionIndex)}
                        className="mt-3 px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 text-sm"
                    >
                        Add Item to Section
                    </button>
                    <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                        Remove Section
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addSection}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
                Add Section
            </button>

            <button
                type="submit"
                className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
            >
                Submit Blog Article
            </button>
        </form>
    );
};

export default BlogArticleForm;