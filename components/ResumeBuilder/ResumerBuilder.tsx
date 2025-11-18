"use client";

import React, { useEffect, useRef, useState } from "react";
import DateRangePicker from "../DateRangePicker/DateRangePicker";


export default function ResumeBuilder() {
    
    const [hasLoaded, setHasLoaded] = useState(false);
    const [personal, setPersonal] = useState({ fullName: "", title: "", email: "", phone: "", location: "", summary: "" });
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [references, setReferences] = useState([]);
    const previewRef = useRef<HTMLDivElement | null>(null);

    // Load from localStorage only on client
    useEffect(() => {
        const loadFromStorage = () => {
            try {
                const raw = localStorage.getItem("resumeBuilder:v1");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    setPersonal(parsed.personal || { fullName: "", title: "", email: "", phone: "", location: "", summary: "" });
                    setExperience(parsed.experience || []);
                    setEducation(parsed.education || []);
                    setSkills(parsed.skills || []);
                    setReferences(parsed.references || []);
                } else {
                    // Set empty states if no storage data
                    setExperience([{ id: Date.now(), company: "", role: "", start: "", end: "", details: "" }]);
                    setEducation([{ id: Date.now() + 1, school: "", degree: "", start: "", end: "", details: "" }]);
                    setReferences([{ id: Date.now() + 2, name: "", contact: "", relation: "" }]);
                }
            } catch (e) {
                // Fallback to empty states
                setExperience([{ id: Date.now(), company: "", role: "", start: "", end: "", details: "" }]);
                setEducation([{ id: Date.now() + 1, school: "", degree: "", start: "", end: "", details: "" }]);
                setReferences([{ id: Date.now() + 2, name: "", contact: "", relation: "" }]);
            }
            setHasLoaded(true);
        };

        loadFromStorage();
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (hasLoaded) {
            const payload = { personal, experience, education, skills, references };
            localStorage.setItem("resumeBuilder:v1", JSON.stringify(payload));
        }
    }, [personal, experience, education, skills, references, hasLoaded]);

    // Don't render until client-side data is loaded
    if (!hasLoaded) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">Loading...</div>
            </div>
        );
    }

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

    function printPDF() {
        if (!previewRef.current) return;
        const printWindow = window.open("", "PRINT", "height=800,width=1000");
        if (!printWindow) return;
        printWindow.document.write(`
      <html>
        <head>
          <title>${personal.fullName || "Resume"}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body{font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:24px; color:#1a1a1a;}
            .container{max-width:900px;margin:0 auto}
            h1{font-size:24px;margin-bottom:4px}
            h2{font-size:16px;margin-top:18px;margin-bottom:8px}
            .muted{color:#1a1a1a}
            .section{margin-bottom:12px}
          </style>
        </head>
        <body>
           <div class="container">${previewRef.current.innerHTML}<time datetime="2016-10-25" suppressHydrationWarning /></div>
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);
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
        <div className="min-h-screen  p-6">
            <div className="max-w-4xl mx-auto">
            

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
                        {Object.entries(personal).filter(([k]) => k !== "summary").map(([key, value]) => (
                            <input
                                key={key}
                                className="input mb-2"
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={value}
                                onChange={(e) => updatePersonal(key as keyof typeof personal, e.target.value)}
                                suppressHydrationWarning
                            />
                        ))}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Summary</h2>
                        <textarea
                            className="input h-32"
                            placeholder="Summary"
                            value={personal.summary}
                            onChange={(e) => updatePersonal("summary", e.target.value)}
                            suppressHydrationWarning
                        />
                    </div>
                </div>

                {/* Experience */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Experience</h2>
                    {experience.map((exp) => (
                        <div key={exp.id} className="mb-4  p-3 rounded">
                            <input
                                className="input mb-2"
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                suppressHydrationWarning
                            />
                            <input
                                className="input mb-2"
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                                suppressHydrationWarning
                            />
                            <div className="flex gap-2 mb-2">
                                <DateRangePicker
                                    className="input"
                                    placeholder="Start"
                                    value={exp.start}
                                    onChange={(value) => updateExperience(exp.id, "start", value)}
                                />
                                <DateRangePicker
                                    className="input"
                                    placeholder="End"
                                    value={exp.end}
                                    onChange={(value) => updateExperience(exp.id, "end", value)}
                                />
                            </div>
                            <textarea
                                className="input mb-2"
                                placeholder="Details"
                                value={exp.details}
                                onChange={(e) => updateExperience(exp.id, "details", e.target.value)}
                                suppressHydrationWarning
                            />
                            <button className="btn  bg-slate-600" onClick={() => removeExperience(exp.id)}>Remove</button>
                        </div>
                    ))}
                    <button className="btn primary  bg-slate-600" onClick={addExperience}>Add Experience</button>
                </div>

                {/* Education */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Education</h2>
                    {education.map((edu) => (
                        <div key={edu.id} className="mb-4  p-3 rounded">
                            <input
                                className="input mb-2"
                                placeholder="School"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                suppressHydrationWarning
                            />
                            <input
                                className="input mb-2"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                suppressHydrationWarning
                            />
                            <div className="flex gap-2 mb-2">
                                <DateRangePicker
                                    className="input"
                                    placeholder="Start"
                                    value={edu.start}
                                    onChange={(value) => updateEducation(edu.id, "start", value)}
                                />
                                <DateRangePicker
                                    className="input"
                                    placeholder="End"
                                    value={edu.end}
                                    onChange={(value) => updateEducation(edu.id, "end", value)}
                                />
                              
                            </div>
                            <textarea
                                className="input mb-2"
                                placeholder="Details"
                                value={edu.details}
                                onChange={(e) => updateEducation(edu.id, "details", e.target.value)}
                                suppressHydrationWarning
                            />
                            <button className="btn " onClick={() => removeEducation(edu.id)}>Remove</button>
                        </div>
                    ))}
                    <button className="btn primary" onClick={addEducation}>Add Education</button>
                </div>

                {/* References */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">References</h2>
                    {references.map((ref) => (
                        <div key={ref.id} className="mb-4  p-3 rounded">
                            <input
                                className="input mb-2"
                                placeholder="Name"
                                value={ref.name}
                                onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                                suppressHydrationWarning
                            />
                            <input
                                className="input mb-2"
                                placeholder="Contact"
                                value={ref.contact}
                                onChange={(e) => updateReference(ref.id, "contact", e.target.value)}
                                suppressHydrationWarning
                            />
                            <input
                                className="input mb-2"
                                placeholder="Relation"
                                value={ref.relation}
                                onChange={(e) => updateReference(ref.id, "relation", e.target.value)}
                                suppressHydrationWarning
                            />
                            <button className="btn " onClick={() => removeReference(ref.id)}>Remove</button>
                        </div>
                    ))}
                    <button className="btn primary" onClick={addReference}>Add Reference</button>
                </div>

                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Skills</h2>
                    <div className="flex gap-2 mb-2">
                        <input
                            className="input"
                            placeholder="Add Skill"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            suppressHydrationWarning
                        />
                        <button className="btn primary" onClick={addSkill}>Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <span key={i} className="btn ghost" onClick={() => removeSkill(i)} suppressHydrationWarning>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Preview */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Preview</h2>
                    <div
                        ref={previewRef}
                        className="preview p-4 bg-white border rounded shadow"
                        suppressHydrationWarning
                    >
                        <h1 suppressHydrationWarning>{personal.fullName}</h1>
                        <h2 className="muted" suppressHydrationWarning>{personal.title}</h2>
                        <p suppressHydrationWarning>{personal.summary}</p>
                        <div suppressHydrationWarning><strong>Skills:</strong> {skills.join(", ")}</div>
                        <div suppressHydrationWarning>
                            <strong>Experience:</strong>
                            {experience.map(exp => (
                                <div key={exp.id} className="mb-2" suppressHydrationWarning>
                                    <div suppressHydrationWarning>{exp.role} at {exp.company} ({exp.start} - {exp.end})</div>
                                    <div suppressHydrationWarning>{exp.details}</div>
                                </div>
                            ))}
                        </div>
                        <div suppressHydrationWarning>
                            <strong>Education:</strong>
                            {education.map(edu => (
                                <div key={edu.id} className="mb-2" suppressHydrationWarning>
                                    <div suppressHydrationWarning>{edu.degree} at {edu.school} ({edu.start} - {edu.end})</div>
                                    <div suppressHydrationWarning>{edu.details}</div>
                                </div>
                            ))}
                        </div>
                        <div suppressHydrationWarning>
                            <strong>References:</strong>
                            {references.map(ref => (
                                <div key={ref.id} className="mb-2" suppressHydrationWarning>
                                    <div suppressHydrationWarning>{ref.name} ({ref.relation})</div>
                                    <div suppressHydrationWarning>Contact: {ref.contact}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-4">
                    <button className="btn primary" onClick={downloadJSON}>Download JSON</button>
                    <button className="btn primary" onClick={printPDF}>Print PDF</button>
                    <button className="btn " onClick={resetAll}>Reset</button>
                </div>
            </div>

            <style>{`
        .input{width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:8px;color:#1a1a1a}
        .btn{background:#f3f4f6;padding:8px 12px;border-radius:8px;border:1px solid #e5e7eb;color:#1a1a1a;cursor:pointer}
        .btn.primary{background:#0ea5a0;color:white}
        .btn.ghost{background:transparent;border:1px dashed #e5e7eb;color:#1a1a1a}
        .muted{color:#1a1a1a}
        .preview{font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;color:#1a1a1a}
      `}</style>
        </div>
    );
}