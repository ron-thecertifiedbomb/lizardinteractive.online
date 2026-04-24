import { useState, useMemo } from 'react';
import { ExamData } from '@/data/exam/exam';
import localExamData from '@/data/exam/exam.json';

export default function ExamTakePage() {
    const [exam, setExam] = useState<ExamData>(localExamData as ExamData);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const stats = useMemo(() => ({
        totalPoints: exam.questions.reduce((a, b) => a + b.points, 0),
        totalQuestions: exam.questions.length
    }), [exam]);

    const [results, setResults] = useState({
        score: 0,
        correctCount: 0,
        percentage: 0
    });

    const handleAnswer = (questionId: string, value: string) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const submitExam = async () => {
        let earnedPoints = 0;
        let correct = 0;

        exam.questions.forEach(q => {
            const studentSelection = (answers[q.id] || "").trim().toLowerCase();
            const correctKey = (q.correctAnswer || "").trim().toLowerCase();

            if (studentSelection === correctKey) {
                earnedPoints += q.points;
                correct += 1;
            }
        });

        const finalResults = {
            score: earnedPoints,
            correctCount: correct,
            percentage: Math.round((earnedPoints / stats.totalPoints) * 100)
        };

        setResults(finalResults);

        // Transmit results to internal Next.js API
        try {
            await fetch('/api/exams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'SUBMISSION_TELEMETRY',
                    protocol: exam.title,
                    results: finalResults,
                    answers: answers,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (err) {
            console.error("TELEMETRY_SYNC_FAILED", err);
        }

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInjectProtocol = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                setExam(data);
                setSubmitted(false);
                setAnswers({});
            } catch (err) {
                console.error("FAILED_TO_LOAD_PROTOCOL", err);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans selection:bg-emerald-500/30">
            {/* Exam Header */}
            <div className="max-w-3xl mx-auto border-b border-zinc-900 pb-10 mb-12 flex justify-between items-center">
                <div>
                    <p className="text-[10px] text-emerald-500 font-mono mb-2 tracking-[0.4em] uppercase opacity-70">
                        System_Protocol: Examination_Mode
                    </p>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        {exam.title}
                    </h1>
                </div>
                <label className="group flex flex-col items-end cursor-pointer">
                    <span className="text-[10px] text-zinc-600 font-mono mb-1 group-hover:text-emerald-500 transition-colors uppercase tracking-widest">Inject_Local_Protocol</span>
                    <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-bold hover:border-emerald-500/50 transition-all text-zinc-400">LOAD_JSON</div>
                    <input type="file" accept=".json" onChange={handleInjectProtocol} className="hidden" />
                </label>
            </div>

            <main className="max-w-3xl mx-auto space-y-10 pb-40">

                {/* RESULT HUD - Appears only after submission */}
                {submitted && (
                    <div className="p-1 bg-gradient-to-br from-emerald-500/40 to-transparent rounded-[2.5rem] animate-in zoom-in duration-500">
                        <div className="bg-zinc-950 p-10 rounded-[2.4rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div>
                                <p className="text-[10px] font-mono text-emerald-500 tracking-[0.4em] uppercase mb-2">Evaluation_Complete</p>
                                <h2 className="text-6xl font-black text-white italic tracking-tighter">
                                    {results.percentage}%
                                </h2>
                                <p className="text-zinc-500 text-[10px] font-mono mt-2 uppercase">
                                    Status: <span className="text-emerald-500">Archived_Success</span>
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 text-center min-w-[120px]">
                                    <p className="text-[8px] text-zinc-500 uppercase font-bold mb-1">Points</p>
                                    <p className="text-xl font-mono text-white">{results.score}/{stats.totalPoints}</p>
                                </div>
                                <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 text-center min-w-[120px]">
                                    <p className="text-[8px] text-zinc-500 uppercase font-bold mb-1">Correct</p>
                                    <p className="text-xl font-mono text-white">{results.correctCount}/{stats.totalQuestions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Question Feed */}
                {exam.questions.map((q, i) => {
                    const isCorrect = answers[q.id]?.toLowerCase() === q.correctAnswer?.toLowerCase();

                    return (
                        <div key={q.id} className={`p-12 bg-zinc-950 border rounded-[3rem] transition-all duration-500 ${submitted
                            ? (isCorrect ? 'border-emerald-500/30' : 'border-red-500/30')
                            : 'border-zinc-900'
                            }`}>
                            <div className="mb-8 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Index_0{i + 1}</span>
                                <span className="px-3 py-1 bg-zinc-900 rounded-full text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                                    {q.points} Points
                                </span>
                            </div>

                            <h2 className="text-2xl font-light mb-10 text-zinc-100 leading-relaxed">
                                {q.prompt}
                            </h2>

                            {/* Option Logic */}
                            <div className="space-y-3">
                                {q.type === 'MCQ' && q.options?.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(q.id, opt)}
                                        className={`w-full p-5 rounded-2xl border text-left text-sm transition-all flex justify-between items-center ${answers[q.id] === opt
                                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                                            : 'bg-zinc-900/30 border-zinc-900 text-zinc-500 hover:border-zinc-700'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="font-mono mr-5 opacity-40">{String.fromCharCode(65 + idx)}</span>
                                            {opt}
                                        </div>
                                    </button>
                                ))}

                                {q.type === 'TF' && (
                                    <div className="flex gap-4">
                                        {['True', 'False'].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => handleAnswer(q.id, val)}
                                                className={`flex-1 py-5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${answers[q.id] === val
                                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                                                    : 'bg-zinc-900/30 border-zinc-900 text-zinc-600'
                                                    }`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {q.type === 'IDENTIFICATION' && (
                                    <input
                                        type="text"
                                        placeholder="INPUT_TEXT_RESPONSE..."
                                        disabled={submitted}
                                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                                        className="w-full bg-zinc-900/30 border border-zinc-900 p-5 rounded-2xl text-white outline-none focus:border-emerald-500 italic placeholder:opacity-20"
                                    />
                                )}
                            </div>

                            {/* Validation Feedback */}
                            {submitted && (
                                <div className={`mt-8 pt-8 border-t border-zinc-900/50 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] ${isCorrect ? 'text-emerald-500' : 'text-red-500'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                    {isCorrect ? 'VALID_RESPONSE' : `ERROR: EXPECTED "${q.correctAnswer}"`}
                                </div>
                            )}
                        </div>
                    );
                })}

                {!submitted && (
                    <button
                        onClick={submitExam}
                        className="w-full py-8 bg-emerald-500 text-black font-black uppercase tracking-[0.6em] rounded-[2rem] hover:bg-emerald-400 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.2)] active:scale-95"
                    >
                        Commit_Submission
                    </button>
                )}
            </main>
        </div>
    );
}