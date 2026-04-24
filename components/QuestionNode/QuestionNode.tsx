interface QuestionData {
    id: string;
    type: 'MCQ' | 'TF' | 'IDENTIFICATION' | 'ESSAY_AI';
    prompt: string;
    points: number;
    options?: string[];
    correctAnswer?: string;
}

interface NodeProps {
    data: QuestionData;
    index: number;
    onUpdate: (fields: any) => void;
    onDelete: () => void;
}

export default function QuestionNode({ data, index, onUpdate, onDelete }: NodeProps) {
    const typeNames: Record<QuestionData['type'], string> = {
        MCQ: "Choice Matrix",
        TF: "Logic Verification",
        IDENTIFICATION: "Direct Return",
        ESSAY_AI: "Open Analysis"
    };

    return (
        <div className="relative p-12 bg-zinc-950 border border-zinc-900 rounded-[3rem] transition-all hover:border-emerald-500/30 group">

            <button
                onClick={onDelete}
                className="absolute top-10 right-12 text-[9px] font-bold text-zinc-800 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
            >
                [ Remove_Question ]
            </button>

            <div className="flex justify-between items-start mb-10">
                <div>
                    <h3 className="text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-2">Question {index + 1}</h3>
                    <p className="text-zinc-600 text-[10px] uppercase font-mono italic">{typeNames[data.type]}</p>
                </div>

                <div className="mr-40 flex flex-col items-end">
                    <label className="text-[8px] text-zinc-600 font-bold uppercase mb-2 tracking-widest">Weight_Points</label>
                    <input
                        type="number"
                        value={data.points}
                        onChange={(e) => onUpdate({ points: parseInt(e.target.value) || 0 })}
                        className="bg-zinc-900 border border-zinc-800 text-white font-mono text-sm p-2 w-20 rounded-xl text-center outline-none focus:border-emerald-500"
                    />
                </div>
            </div>

            <div className="mb-12">
                <label className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em] block mb-4">Input Prompt</label>
                <textarea
                    placeholder="Enter question text..."
                    value={data.prompt}
                    onChange={(e) => onUpdate({ prompt: e.target.value })}
                    className="w-full bg-transparent border-b border-zinc-900 py-4 text-white text-2xl font-light outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-zinc-900"
                    rows={1}
                />
            </div>

            <div className="bg-zinc-900/20 p-8 rounded-[2rem] border border-zinc-900/50">
                {data.type === 'MCQ' && (
                    <div className="space-y-4">
                        {data.options?.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-600">
                                    {String.fromCharCode(65 + optIdx)}
                                </div>
                                <input
                                    className="bg-zinc-900/50 border border-zinc-800 p-4 text-sm w-full outline-none focus:border-emerald-500 text-zinc-300 rounded-2xl transition-all"
                                    value={opt}
                                    onChange={(e) => {
                                        const newOptions = [...(data.options || [])];
                                        newOptions[optIdx] = e.target.value;
                                        onUpdate({ options: newOptions });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {data.type === 'TF' && (
                    <div className="flex gap-4">
                        <button
                            onClick={() => onUpdate({ correctAnswer: "True" })}
                            className={`flex-1 py-5 border text-[10px] font-black uppercase rounded-2xl transition-all tracking-widest ${data.correctAnswer === "True" ? "bg-emerald-500/20 border-emerald-500 text-emerald-500" : "border-zinc-800 text-zinc-500 hover:text-emerald-500"}`}
                        >
                            True
                        </button>
                        <button
                            onClick={() => onUpdate({ correctAnswer: "False" })}
                            className={`flex-1 py-5 border text-[10px] font-black uppercase rounded-2xl transition-all tracking-widest ${data.correctAnswer === "False" ? "bg-red-500/20 border-red-500 text-red-500" : "border-zinc-800 text-zinc-500 hover:text-red-500"}`}
                        >
                            False
                        </button>
                    </div>
                )}

                {data.type === 'IDENTIFICATION' && (
                    <input
                        className="bg-zinc-900/50 border border-zinc-800 p-5 text-sm w-full outline-none focus:border-emerald-500 text-white rounded-2xl italic"
                        placeholder="Expected answer key..."
                        value={data.correctAnswer || ""}
                        onChange={(e) => onUpdate({ correctAnswer: e.target.value })}
                    />
                )}
            </div>
        </div>
    );
}