"use client";

import React, { useEffect, useRef, useState } from "react";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import Input from "../shared/Input/Input";
import Textarea from "../shared/TextArea/TextArea";
import Button from "../shared/Button/Button";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { twolayoutPDF } from "../../lib/printPdf.ts/twolayoutPDF";
import { modernMinimalistPDF } from "../../lib/printPdf.ts/modernMinimalistPDF";
import { TableLayout } from "docx";
import { TwoLayoutPreview } from "./preview/TwoLayoutPreview";
import { ModernMinimalistPreview } from "./preview/ModernMinimalistPreview";
import Container from "../container";


export default function ResumeBuilder() {

    const [hasLoaded, setHasLoaded] = useState(false);
    const [personal, setPersonal] = useState({ fullName: "", title: "", email: "", phone: "", location: "", summary: "" });
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [references, setReferences] = useState([]);
    const previewRef = useRef<HTMLDivElement | null>(null);

    // Load data from localStorage only on client
    useEffect(() => {
        const raw = localStorage.getItem("resumeBuilder:v1");
        if (raw) {
            const parsed = JSON.parse(raw);
            setPersonal(parsed.personal || personal);
            setExperience(parsed.experience || []);
            setEducation(parsed.education || []);
            setSkills(parsed.skills || []);
            setReferences(parsed.references || []);
        } else {
            // initialize empty arrays with IDs on client
            setExperience([{ id: Date.now(), company: "", role: "", start: "", end: "", details: "" }]);
            setEducation([{ id: Date.now() + 1, school: "", degree: "", start: "", end: "", details: "" }]);
            setReferences([{ id: Date.now() + 2, name: "", contact: "", relation: "" }]);
        }
        setHasLoaded(true);
    }, []);

    // Persist data to localStorage
    useEffect(() => {
        if (hasLoaded) {
            const payload = { personal, experience, education, skills, references };
            localStorage.setItem("resumeBuilder:v1", JSON.stringify(payload));
        }
    }, [personal, experience, education, skills, references, hasLoaded]);


    // Personal info handlers
    function updatePersonal<K extends keyof typeof personal>(key: K, value: string) {
        setPersonal(s => ({ ...s, [key]: value }));
    }

    // Experience handlers
    function addExperience() {
        setExperience(s => [...s, { id: Date.now(), company: "", role: "", start: "", end: "", details: "" }]);
    }
    function removeExperience(id: number) {
        setExperience(s => s.filter(x => x.id !== id));
    }
    function updateExperience(id: number, key: string, value: string) {
        setExperience(s => s.map(row => (row.id === id ? { ...row, [key]: value } : row)));
    }

    // Education handlers
    function addEducation() {
        setEducation(s => [...s, { id: Date.now(), school: "", degree: "", start: "", end: "", details: "" }]);
    }
    function removeEducation(id: number) {
        setEducation(s => s.filter(x => x.id !== id));
    }
    function updateEducation(id: number, key: string, value: string) {
        setEducation(s => s.map(row => (row.id === id ? { ...row, [key]: value } : row)));
    }

    // References handlers
    function addReference() {
        setReferences(s => [...s, { id: Date.now(), name: "", contact: "", relation: "" }]);
    }
    function removeReference(id: number) {
        setReferences(s => s.filter(x => x.id !== id));
    }
    function updateReference(id: number, key: string, value: string) {
        setReferences(s => s.map(row => (row.id === id ? { ...row, [key]: value } : row)));
    }

    // Skills handlers
    function addSkill() {
        const v = skillInput.trim();
        if (!v || skills.includes(v)) return;
        setSkills(s => [...s, v]);
        setSkillInput("");
    }
    function removeSkill(index: number) {
        setSkills(s => s.filter((_, i) => i !== index));
    }

    // Export and print
    function downloadJSON() {
        const payload = { personal, experience, education, skills, references };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${personal.fullName || "resume"}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }


    function resetAll() {
        if (!confirm("Reset all fields?")) return;
        setPersonal({ fullName: "", title: "", email: "", phone: "", location: "", summary: "" });
        setExperience([{ id: Date.now(), company: "", role: "", start: "", end: "", details: "" }]);
        setEducation([{ id: Date.now() + 1, school: "", degree: "", start: "", end: "", details: "" }]);
        setSkills([]);
        setReferences([{ id: Date.now() + 2, name: "", contact: "", relation: "" }]);
        localStorage.removeItem("resumeBuilder:v1");
    }

    return (

        <div className="p-6 bg-slate-800 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <SectionTitle >Personal Information</SectionTitle>

                    {Object.entries(personal).filter(([k]) => k !== "summary").map(([key, value]) => (
                        <Input
                            key={key}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                            onChange={(val) => updatePersonal(key as keyof typeof personal, val)}
                        />
                    ))}
                </div>
                <div>
                    <SectionTitle >Summary</SectionTitle>
                    <Textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                        placeholder="Summary"
                        value={personal.summary}
                        onChange={(val) => updatePersonal("summary", val)}

                    />
                </div>
            </div>

            {/* Experience */}
            <div className="mt-6">
                <SectionTitle >Experience</SectionTitle>
                {experience.map((exp) => (
                    <div key={exp.id} className="rounded mb-6">
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Company"
                            value={exp.company}
                            onChange={(val) => updateExperience(exp.id, "company", val)}

                        />
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Role"
                            value={exp.role}
                            onChange={(val) => updateExperience(exp.id, "role", val)}

                        />
                        <div className="flex gap-2 mb-2">
                            <DateRangePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                                placeholder="Start"
                                value={exp.start}
                                onChange={(value) => updateExperience(exp.id, "start", value)}
                            />
                            <DateRangePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                                placeholder="End"
                                value={exp.end}
                                onChange={(value) => updateExperience(exp.id, "end", value)}
                            />
                        </div>
                        <Textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Details"
                            value={exp.details}
                            onChange={(val) => updateExperience(exp.id, "details", val)}
                        />
                        <Button className=" rounded-md max-w-28 mt-2  bg-red-700 hover:bg-red-800" onClick={() => removeExperience(exp.id)}>Remove</Button>
                    </div>
                ))}
                <Button className=" rounded-md max-w-48" onClick={addExperience}>Add Experience</Button>
            </div>

            {/* Education */}
            <div className="mt-6">
                <SectionTitle >Education</SectionTitle>
                {education.map((edu) => (
                    <div key={edu.id} className="mb-2 rounded mb-6">
                        <Input className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="School"
                            value={edu.school}
                            onChange={(val) => updateEducation(edu.id, "school", val)}

                        />
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(val) => updateEducation(edu.id, "degree", val)}

                        />
                        <div className="flex gap-2 mb-2">
                            <DateRangePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                                placeholder="Start"
                                value={edu.start}
                                onChange={(value) => updateEducation(edu.id, "start", value)}
                            />
                            <DateRangePicker
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                                placeholder="End"
                                value={edu.end}
                                onChange={(value) => updateEducation(edu.id, "end", value)}
                            />

                        </div>
                        <Textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Details"
                            value={edu.details}
                            onChange={(val) => updateEducation(edu.id, "details", val)}

                        />
                        <Button className=" rounded-md max-w-28 mt-2  bg-red-700 hover:bg-red-800" onClick={() => removeEducation(edu.id)}>Remove</Button>
                    </div>
                ))}
                <Button className=" rounded-md max-w-48" onClick={addEducation}>Add Education</Button>
            </div>

            {/* References */}
            <div className="mt-6">
                <SectionTitle >References</SectionTitle>
                {references.map((ref) => (
                    <div key={ref.id} className=" rounded mb-6">
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Name"
                            value={ref.name}
                            onChange={(val) => updateReference(ref.id, "name", val)}

                        />
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Contact"
                            value={ref.contact}
                            onChange={(val) => updateReference(ref.id, "contact", val)}

                        />
                        <Input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 mb-2 focus:border-blue-950 focus:outline-none"
                            placeholder="Relation"
                            value={ref.relation}
                            onChange={(val) => updateReference(ref.id, "relation", val)}

                        />
                        <Button className=" rounded-md max-w-28 mt-2  bg-red-700 hover:bg-red-800" onClick={() => removeReference(ref.id)}>Remove</Button>
                    </div>
                ))}
                <Button className=" rounded-md max-w-48 " onClick={addReference}>Add Reference</Button>
            </div>

            {/* Skills */}
            <div className="mt-6 mb-4">
                <SectionTitle >Skills</SectionTitle>
                <div className="flex gap-2 mb-2 items-center justify-center place-items-center">
                    <Input className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900  focus:border-blue-950 focus:outline-none"
                        placeholder="Add Skill"
                        value={skillInput}
                        onChange={(val) => setSkillInput(val)}

                    />
                    <Button className=" rounded-md max-w-28 " onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                        <span key={i} className="btn" onClick={() => removeSkill(i)} suppressHydrationWarning>
                            {skill}{i < skills.length - 1 ? "," : ""}
                        </span>
                    ))}
                </div>
            </div>

            {/* Preview */}
            <ModernMinimalistPreview personal={personal} experience={experience} education={education} references={references} skills={skills} />

            {/* Actions */}
            <div className="mt-6 flex gap-4">
                <Button className="rounded-md" onClick={downloadJSON}>Download JSON</Button>
                <Button className="rounded-md" onClick={() => twolayoutPDF(personal, experience, education, references, skills)}>Print PDF</Button>
                <Button className="rounded-md" onClick={resetAll}>Reset</Button>
            </div>


        </div>
    );
}