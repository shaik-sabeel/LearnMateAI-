import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar, BookOpen, Search, ArrowRight } from 'lucide-react';

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
            <div className="container mx-auto py-12 px-6 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">
                        AI Learning Roadmap
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Tell us what you want to learn, and our AI will build a step-by-step master plan for you.
                    </p>
                </div>

                <form onSubmit={generateRoadmap} className="mb-16 flex gap-3 max-w-2xl mx-auto glass p-2 rounded-xl">
                    <Input
                        placeholder="e.g. Machine Learning, React, UI/UX Design..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="bg-transparent border-none focus-visible:ring-0 text-lg"
                    />
                    <Button type="submit" disabled={loading} size="lg" className="rounded-lg px-8">
                        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Map It Out'}
                    </Button>
                </form>

                {roadmap && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {roadmap.map((phase, index) => (
                            <div key={index} className="relative flex gap-8 group">
                                {/* Connector Line */}
                                {index !== roadmap.length - 1 && (
                                    <div className="absolute left-[27px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent -z-10 group-hover:from-primary transition-colors duration-500"></div>
                                )}

                                {/* Phase Number Icon */}
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                                    {index + 1}
                                </div>

                                {/* Content Card */}
                                <Card className="flex-1 glass-card border-l-4 border-l-primary/50 hover:bg-card/80 transition-all">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <CardTitle className="text-2xl font-bold text-primary">{phase.phase}</CardTitle>
                                            <div className="flex items-center gap-1 text-xs bg-secondary px-3 py-1 rounded-full text-secondary-foreground font-medium">
                                                <Calendar size={14} />
                                                {phase.duration}
                                            </div>
                                        </div>
                                        <CardDescription className="text-base text-card-foreground/80 italic">
                                            \"{phase.description}\"
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="flex items-center gap-2 text-primary font-semibold mb-3">
                                                    <BookOpen size={18} /> What to learn:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {phase.topics.map((t, idx) => (
                                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                                            <ArrowRight size={14} className="text-primary/50" />
                                                            {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                                                <h4 className="flex items-center gap-2 text-primary font-semibold mb-3">
                                                    <Search size={18} /> Recommended Searches:
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {phase.resources.map((r, idx) => (
                                                        <span key={idx} className="text-xs bg-background/50 border border-border px-2 py-1 rounded hover:border-primary/50 cursor-pointer transition-colors">
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
