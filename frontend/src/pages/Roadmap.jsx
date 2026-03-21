import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar, BookOpen, Search, ArrowRight, Zap } from 'lucide-react';

export default function Roadmap() {
    const [topic, setTopic] = useState('');
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;
        setLoading(true);
        try {
            const res = await api.post('/roadmap', { topic });
            setRoadmap(res.data.roadmap);
        } catch (err) {
            console.error(err);
            alert("Failed to generate roadmap. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            
            <div className="container mx-auto py-12 px-6 pt-32 max-w-5xl">
                
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                        <Zap size={14} className="text-yellow-400" /> AI-Powered Curriculum
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Learning Roadmap
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Input any skill, framework, or concept. Our AI engine will construct a definitive, step-by-step master plan optimized for your current level.
                    </p>
                </div>

                <form onSubmit={generateRoadmap} className="mb-20 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                        <Input
                            placeholder="e.g. Advanced System Design, Fullstack React..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="bg-[#0a0a0a] border border-white/10 hover:border-white/20 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary h-14 pl-12 text-lg rounded-xl transition-all shadow-inner"
                        />
                    </div>
                    <Button type="submit" disabled={loading} size="lg" className="magnet-target h-14 px-8 text-base rounded-xl font-medium bg-foreground text-background hover:bg-muted-foreground transition-colors mix-blend-difference">
                        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Generate Plan'}
                    </Button>
                </form>

                {roadmap && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {roadmap.map((phase, index) => (
                            <div key={index} className="relative flex gap-6 md:gap-8 group perspective-1000">
                                {/* Connector Line */}
                                {index !== roadmap.length - 1 && (
                                    <div className="absolute left-[23px] md:left-[27px] top-16 bottom-[-24px] w-[2px] bg-white/5 -z-10 group-hover:bg-primary/50 transition-colors duration-500"></div>
                                )}

                                {/* Phase Number Icon */}
                                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-muted-foreground font-bold font-mono text-xl group-hover:border-primary group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-500 z-10">
                                    {index + 1}
                                </div>

                                {/* Content Card */}
                                <Card className="hover-tilt transform-style-3d flex-1 glass-card bg-[#0a0a0a] border-white/5 hover:border-white/20 transition-all duration-500">
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                            <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{phase.phase}</CardTitle>
                                            <div className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-foreground font-medium self-start">
                                                <Calendar size={14} className="text-muted-foreground" />
                                                {phase.duration}
                                            </div>
                                        </div>
                                        <CardDescription className="text-base text-muted-foreground/80 leading-relaxed max-w-3xl">
                                            {phase.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-12 gap-6 bg-[#111] rounded-xl p-5 border border-white/5">
                                            <div className="md:col-span-7">
                                                <h4 className="flex items-center gap-2 text-foreground font-medium mb-4 text-sm uppercase tracking-wider">
                                                    <BookOpen size={16} className="text-primary" /> Core Topics
                                                </h4>
                                                <ul className="space-y-3">
                                                    {phase.topics.map((t, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                            <ArrowRight size={16} className="text-primary/50 mt-0.5 shrink-0" />
                                                            <span className="leading-snug">{t}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="md:col-span-5 h-full flex flex-col">
                                                <h4 className="flex items-center gap-2 text-foreground font-medium mb-4 text-sm uppercase tracking-wider">
                                                    <Search size={16} className="text-primary" /> Key Concepts
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.resources.map((r, idx) => (
                                                        <span key={idx} className="magnet-target text-xs bg-black border border-white/10 px-2.5 py-1.5 rounded-md text-muted-foreground hover:bg-white/10 hover:text-foreground cursor-pointer transition-all duration-300">
                                                            {r}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
