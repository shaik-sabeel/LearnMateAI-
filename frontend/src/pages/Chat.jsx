import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from 'lucide-react';

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
            <div className="flex-1 container mx-auto p-4 md:p-8 flex flex-col max-w-5xl h-[calc(100vh-64px)]">
                <div className="mb-4 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">AI Tutor</h1>
                    <p className="text-muted-foreground text-sm">Ask anything, I'm here to help.</p>
                </div>

                <Card className="flex-1 flex flex-col mb-4 overflow-hidden glass-card border-primary/10">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                                <Bot size={48} className="mb-4" />
                                <p>Start a conversation...</p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shrink-0">
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div className={`
                    max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed
                    ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                        : 'bg-muted/50 backdrop-blur-md rounded-bl-none border border-border/50'}
                `}>
                                    {msg.role === 'model' ? (
                                        <div className="prose prose-invert prose-sm max-w-none">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '')
                                                        return !inline && match ? (
                                                            <div className="rounded-md overflow-hidden my-2">
                                                                <div className="bg-muted px-4 py-1 text-xs text-muted-foreground border-b border-border/50 flex justify-between items-center">
                                                                    <span>{match[1]}</span>
                                                                </div>
                                                                <code className={`${className} block bg-black/50 p-4 overflow-x-auto`} {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className="bg-muted/50 px-1 py-0.5 rounded text-primary-foreground font-mono text-xs" {...props}>
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
                                {msg.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground shrink-0">
                                        <User size={16} />
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-muted/50 rounded-2xl rounded-bl-none p-4 flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="p-4 bg-background/40 backdrop-blur-md border-t border-border/50">
                        <form onSubmit={sendMessage} className="flex gap-3 relative">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question..."
                                disabled={loading}
                                className="bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background h-12 rounded-xl pr-12"
                            />
                            <Button type="submit" disabled={loading || !input.trim()} size="icon" className="absolute right-1 top-1 h-10 w-10 rounded-lg">
                                <Send size={18} />
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
