import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, Mic } from 'lucide-react';

export default function MockInterview() {
    const [topic, setTopic] = useState('');
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const startInterview = async (e) => {
        e.preventDefault();
        if (!topic) return;
        setIsInterviewStarted(true);
        setLoading(true);

        try {
            const res = await api.post('/interview', {
                topic,
                history: [],
                message: "start"
            });
            setMessages([{ role: 'ai', message: res.data.response }]);
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.msg || "Failed to start interview.";
            if (errMsg.includes("Premium")) {
                alert("This feature requires LearnMate Pro.");
                setIsInterviewStarted(false);
            } else {
                setMessages([{ role: 'ai', message: 'Error connecting to the interviewer.' }]);
            }
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', message: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const history = newMessages.slice(0, -1); // Exclude the message we just added for context payload
            const res = await api.post('/interview', {
                topic,
                history,
                message: input
            });
            setMessages([...newMessages, { role: 'ai', message: res.data.response }]);
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
                
                {!isInterviewStarted ? (
                    <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                                <Mic size={14} className="text-red-400 animate-pulse" /> Live Interview Simulation
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                                AI Technical Screen
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                                Practice under pressure. Our AI interviewer simulates rigorous technical and behavioral rounds from Big Tech rubrics.
                            </p>
                        </div>

                        <Card className="w-full max-w-md hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-100">
                            <CardContent className="pt-6">
                                <form onSubmit={startInterview} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground ml-1">Focus Area</label>
                                        <Input
                                            placeholder="e.g. React hooks, Data Structures..."
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="h-14 bg-[#111] border-white/10 focus-visible:border-primary text-base shadow-inner rounded-xl"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" disabled={loading} className="magnet-target w-full h-14 text-base font-medium rounded-xl bg-foreground text-background hover:bg-muted-foreground transition-all mix-blend-difference">
                                        {loading ? 'Connecting...' : 'Start Session'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                <h2 className="text-xl font-semibold tracking-tight">Interviewing: <span className="text-primary font-normal">{topic}</span></h2>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsInterviewStarted(false)} className="magnet-target border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors">
                                End Interview
                            </Button>
                        </div>

                        <Card className="flex-1 flex flex-col overflow-hidden glass-card bg-[#0a0a0a] border-white/5 relative z-10 shadow-2xl">
                            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                            
                            <CardContent className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'ai' && (
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
                                            {msg.role === 'ai' ? (
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
                                            <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse"></span>
                                            <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </CardContent>
                            <div className="p-4 bg-[#0a0a0a] border-t border-white/5">
                                <form onSubmit={sendMessage} className="flex gap-3 relative max-w-3xl mx-auto">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your answer..."
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
                )}
            </div>
        </div>
    );
}
