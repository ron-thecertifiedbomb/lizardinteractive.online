import QuestionNode from '@/components/QuestionNode/QuestionNode';
import { useState } from 'react';


export default function ExamIndex() {
    const [examTitle, setExamTitle] = useState("NEW_ASSESSMENT_PROTOCOL");
    const [questions, setQuestions] = useState<any[]>([]);

    const addQuestion = (type: string) => {
        const safeId = typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 11);

        const newQ = {
            id: safeId,
            type: type,
            prompt: "",
            points: 5,
            options: type === 'MCQ' ? ["", "", "", ""] : [],
            correctAnswer: ""
        };
        setQuestions(prev => [...prev, newQ]);
    };

    const updateQuestion = (id: string, updatedFields: any) => {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updatedFields } : q));
    };

    const deleteQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    // --- THE OBJECT GENERATOR ---
    const exportExam = async () => {
        const fullObject = {
            title: examTitle,
            timestamp: new Date().toISOString(),
            totalNodes: questions.length,
            questions: questions
        };

        // POST to Local API
        try {
            await fetch('/api/exams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullObject)
            });
            console.log("PROTOCOL_UPLOAD_SUCCESS");
        } catch (err) {
            console.error("UPLOAD_FAILURE", err);
        }

        // Download the object as a .json file
        const blob = new Blob([JSON.stringify(fullObject, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${examTitle.toLowerCase().replace(/\s+/g, '_')}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans selection:bg-emerald-500/30">
            {/* Header HUD */}
            <div className="max-w-5xl mx-auto border-b border-zinc-900 pb-10 mb-12 flex justify-between items-end">
                <div className="flex-1">
                    <p className="text-[10px] text-emerald-500 font-mono mb-2 tracking-[0.3em] uppercase opacity-70">Lizard_Exam_System_v1</p>
                    <input
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value.toUpperCase())}
                        className="bg-transparent border-none text-4xl font-black italic tracking-tighter outline-none w-full"
                        placeholder="UNTITLED_PROTOCOL"
                    />
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl text-right min-w-[200px]">
                    <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Nodes: <span className="text-white ml-2">{questions.length}</span></p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Score: <span className="text-emerald-500 ml-2">{questions.reduce((acc, q) => acc + q.points, 0)}</span></p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                <aside className="space-y-4">
                    <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Injection Controls</h2>

                    {['MCQ', 'TF', 'IDENTIFICATION'].map((type) => (
                        <button key={type} onClick={() => addQuestion(type)} className="w-full py-4 px-6 bg-zinc-900/50 border border-zinc-800 rounded-xl text-[10px] font-bold hover:border-emerald-500 transition-all text-left uppercase tracking-wider">
                            [+] {type.replace('_', ' ')}
                        </button>
                    ))}

                    <div className="pt-10">
                        <button
                            onClick={exportExam}
                            className="w-full py-5 px-6 bg-emerald-600 text-black text-[11px] font-black uppercase rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                        >
                            Generate_Data_Object
                        </button>
                    </div>
                </aside>

                <main className="lg:col-span-3 space-y-10 pb-32">
                    {questions.map((q, i) => (
                        <QuestionNode
                            key={q.id}
                            data={q}
                            index={i}
                            onUpdate={(fields) => updateQuestion(q.id, fields)}
                            onDelete={() => deleteQuestion(q.id)}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}