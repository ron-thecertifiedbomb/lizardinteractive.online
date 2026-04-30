"use client";

import ScreenContainer from '@/components/shared/ScreenContainer/ScreenContainer';
import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <ScreenContainer>
            <div className="flex flex-col h-screen bg-black text-zinc-100 antialiased selection:bg-emerald-500 selection:text-black">
                
                {/* Fixed Input Bar - at the very bottom */}
                <div className="sticky top-full w-full max-w-2xl mx-auto px-4 pb-6">
                    <form
                        className="relative flex items-center"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!input.trim()) return;
                            sendMessage({ text: input });
                            setInput('');
                        }}
                    >
                        <input
                            className="w-full p-4 pr-16 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all font-mono placeholder:text-zinc-600 shadow-lg"
                            value={input}
                            placeholder="Initialize engineering sequence..."
                            autoComplete="off"
                            onChange={(e) => setInput(e.currentTarget.value)}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 p-2 px-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all font-bold active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            →
                        </button>
                    </form>
                </div>

                {/* Messages Container - scrolls above fixed input */}
                <div className="flex-1 overflow-y-auto w-full max-w-2xl mx-auto px-4 pt-10 pb-4 custom-scrollbar">
                    <div className={`flex flex-col space-y-6 ${messages.length === 0 ? 'h-full justify-center' : ''}`}>
                        
                        {/* Empty State */}
                        {messages.length === 0 && (
                            <div className="text-center space-y-2 opacity-50">
                                <h2 className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase">System Ready</h2>
                                <p className="text-xs-plus text-zinc-500 font-mono">LIZARD_INTERACTIVE_V2.5</p>
                            </div>
                        )}

                        {/* Messages Loop */}
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm border ${
                                    message.role === 'user'
                                        ? 'bg-zinc-900 border-zinc-800 rounded-br-none text-zinc-100'
                                        : 'bg-zinc-950 border-emerald-900/30 rounded-bl-none text-emerald-50'
                                }`}>
                                    <p className={`text-xs-plus mb-2 font-mono uppercase tracking-widest font-bold ${
                                        message.role === 'user' ? 'text-zinc-500' : 'text-emerald-500'
                                    }`}>
                                        {message.role === 'user' ? 'Client Request' : 'Lizrd Engineer'}
                                    </p>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                        {message.parts.map((part, i) => {
                                            if (part.type === 'text') return <div key={i}>{part.text}</div>;
                                            return null;
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

            </div>
        </ScreenContainer>
    );
}