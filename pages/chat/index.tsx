import { useChat } from '@ai-sdk/react';

// 1. Define the types for your tool's arguments and results to keep TS happy
type LighthouseArgs = { url: string };
type LighthouseResult = { score: number; label: string; details: string };

export default function Chat() {
    const { messages, input, setInput, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
    });

    return (
        <div className="max-w-2xl mx-auto p-6 font-sans bg-white min-h-screen pb-32">
            <header className="mb-10 py-4 border-b border-slate-100 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">LIZRD INTERACTIVE</h1>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Precision Engineering AI</p>
                </div>
                <div className="text-[10px] font-mono text-emerald-500 bg-emerald-50 px-2 py-1 rounded">
                    STATUS: 100/100 OPTIMIZED
                </div>
            </header>

            <div className="space-y-8">
                {messages.map((m) => (
                    <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                        {/* Message Bubble */}
                        {m.content && (
                            <div className={`max-w-[85%] p-4 shadow-sm ${m.role === 'user'
                                ? 'bg-blue-600 text-white rounded-2xl rounded-br-none'
                                : 'bg-slate-100 text-slate-800 rounded-2xl rounded-bl-none'
                                }`}>
                                <div className="text-[10px] mb-1 opacity-60 font-bold uppercase tracking-tighter">
                                    {m.role === 'user' ? 'Client Request' : 'Lizrd Engineer'}
                                </div>
                                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {m.content}
                                </div>
                            </div>
                        )}

                        {/* Tool Invocation Rendering */}
                        {m.toolInvocations?.map((toolInvocation) => {
                            const { toolCallId, toolName, state } = toolInvocation;

                            if (toolName === 'checkLighthouse') {
                                // 2. Safely cast the args and results using the types defined above
                                const args = toolInvocation.args as LighthouseArgs;
                                const result = state === 'result' ? (toolInvocation.result as LighthouseResult) : null;

                                return (
                                    <div key={toolCallId} className="mt-3 w-full max-w-[80%] p-4 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-[11px]">
                                        {state === 'result' && result ? (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center text-emerald-400">
                                                    <span>[SUCCESS] AUDIT_COMPLETED: {args.url}</span>
                                                    <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                        {result.score}/100
                                                    </span>
                                                </div>
                                                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-emerald-500 h-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${result.score}%` }}
                                                    />
                                                </div>
                                                <p className="text-zinc-500 italic text-[10px] border-l border-zinc-700 pl-3">
                                                    {result.details}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 text-zinc-400">
                                                <span className="animate-spin text-blue-400">⚡</span>
                                                <span>ANALYZING_CORE_WEB_VITALS...</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3 items-center">
                    <input
                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your performance bottleneck..."
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-800 disabled:bg-slate-200 transition-all active:scale-95"
                    >
                        {isLoading ? '...' : '→'}
                    </button>
                </form>
            </div>
        </div>
    );
}