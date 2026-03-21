import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, Sparkles } from 'lucide-react';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/chat/history');
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', message: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await api.post('/chat', { message: userMsg.message });
            setMessages(prev => [...prev, { role: 'model', message: res.data.response }]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-transparent overflow-hidden">
            <Navbar />
            <div className="flex-1 container mx-auto p-4 md:p-8 pt-24 md:pt-32 flex flex-col max-w-4xl h-[calc(100vh-80px)]">
                
                <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                        <Sparkles size={14} className="text-primary" /> Intelligent Tutor
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">AI Engineering Assistant</h1>
                </div>

                <Card className="flex-1 flex flex-col mb-6 overflow-hidden glass-card bg-[#0a0a0a] border-white/5 relative z-10 shadow-2xl">
                    <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                                <Bot size={48} className="mb-6 text-primary/40" />
                                <p className="text-lg">What are we learning today?</p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 rounded-md bg-[#111] border border-white/10 flex items-center justify-center text-primary shrink-0 mt-1 shadow-sm">
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div className={`
                                    max-w-[85%] rounded-2xl p-5 shadow-sm text-[15px] leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-foreground text-background rounded-tr-sm font-medium'
                                        : 'bg-[#111] border border-white/5 text-foreground rounded-tl-sm'}
                                `}>
                                    {msg.role === 'model' ? (
                                        <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-black prose-pre:border prose-pre:border-white/10 prose-headings:text-foreground prose-a:text-primary">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '')
                                                        return !inline && match ? (
                                                            <div className="rounded-lg overflow-hidden my-4 border border-white/10 bg-[#0a0a0a]">
                                                                <div className="bg-[#111] px-4 py-2 text-xs text-muted-foreground border-b border-white/5 flex justify-between items-center font-mono uppercase tracking-wider">
                                                                    <span>{match[1]}</span>
                                                                </div>
                                                                <code className={`${className} block p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-green-400`} {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-primary-foreground font-mono text-[13px]" {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {msg.message}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.message
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-md bg-[#111] border border-white/10 flex items-center justify-center text-primary shrink-0 mt-1 shadow-sm">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-[#111] border border-white/5 rounded-2xl rounded-tl-sm p-5 flex gap-1.5 items-center w-24">
                                    <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                        <form onSubmit={sendMessage} className="flex gap-3 relative max-w-3xl mx-auto">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                disabled={loading}
                                className="bg-[#111] border-white/10 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary h-14 rounded-xl pr-14 text-base shadow-inner"
                            />
                            <Button type="submit" disabled={loading || !input.trim()} size="icon" className="magnet-target absolute right-2 top-2 bottom-2 h-10 w-10 rounded-lg bg-foreground text-background hover:bg-muted-foreground transition-colors mix-blend-difference">
                                <Send size={18} />
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
