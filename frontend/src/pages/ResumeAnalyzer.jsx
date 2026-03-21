import { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FileText, Briefcase, CheckCircle2, AlertTriangle, Compass, Target } from 'lucide-react';

export default function ResumeAnalyzer() {
    const [resumeText, setResumeText] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/resume/analyze', { resumeText, targetRole });
            setAnalysis(res.data);
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || "Failed to analyze resume.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            
            <div className="container mx-auto py-12 px-6 pt-32 max-w-6xl">
                
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                        <FileText size={14} className="text-primary" /> Skill Match Engine
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Resume & Skill Analyzer
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Input your current resume and desired target role. Our AI computes your exact skill gap and generates a bespoke learning pathway.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Input Section */}
                    <Card className="hover-tilt transform-style-3d lg:col-span-5 glass-card border-none bg-gradient-to-br from-[#111] to-[#0a0a0a] h-fit relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 delay-100">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10"></div>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Target size={20} className="text-primary" /> Analysis Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAnalyze} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Desired Job Title</label>
                                    <Input 
                                        placeholder="e.g. Senior Frontend Engineer" 
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        required
                                        className="h-14 bg-[#0a0a0a] border-white/10 focus-visible:border-primary shadow-inner rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Resume Content (Plain Text)</label>
                                    <Textarea 
                                        placeholder="Paste your entire resume content here..." 
                                        value={resumeText}
                                        onChange={(e) => setResumeText(e.target.value)}
                                        required
                                        className="min-h-[280px] bg-[#0a0a0a] border-white/10 focus-visible:border-primary shadow-inner rounded-xl resize-y"
                                    />
                                </div>
                                <Button type="submit" className="magnet-target w-full h-14 text-base font-medium rounded-xl bg-foreground text-background hover:bg-muted-foreground transition-all mix-blend-difference" disabled={loading || !resumeText || !targetRole}>
                                    {loading ? 'Processing Algorithms...' : 'Generate Skill Gap Report'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Results Bento Box */}
                    <div className="lg:col-span-7 space-y-6">
                        {analysis ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                                {/* Match Score Card */}
                                <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 hover:border-white/20 transition-all overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Alignment Score</h3>
                                                <div className="text-5xl font-bold tracking-tighter">{analysis.matchPercentage}<span className="text-2xl text-primary">%</span></div>
                                            </div>
                                            <Briefcase size={40} className="text-primary/20 mb-2" />
                                        </div>
                                        <Progress value={analysis.matchPercentage} className="h-2 mb-6 bg-white/5" indicatorClassName="bg-primary" />
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {analysis.feedback}
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Strengths & Weaknesses Grid */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Card className="hover-tilt transform-style-3d glass-card bg-green-500/5 hover:bg-green-500/10 border-green-500/20 transition-all">
                                        <CardHeader className="pb-3 border-b border-green-500/10 mb-3">
                                            <CardTitle className="text-base text-green-400 flex items-center gap-2">
                                                <CheckCircle2 size={18} /> Verified Strengths
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {analysis.strengths?.map((s, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="text-green-500 text-lg leading-none mt-0.5">•</span>
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="hover-tilt transform-style-3d glass-card bg-red-500/5 hover:bg-red-500/10 border-red-500/20 transition-all">
                                        <CardHeader className="pb-3 border-b border-red-500/10 mb-3">
                                            <CardTitle className="text-base text-red-400 flex items-center gap-2">
                                                <AlertTriangle size={18} /> Identifying Gaps
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {analysis.missingSkills?.map((s, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="text-red-500 text-lg leading-none mt-0.5">•</span>
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Recommended Roadmaps */}
                                <h3 className="text-xl font-bold tracking-tight mt-8 mb-4 flex items-center gap-2">
                                    <Compass size={20} className="text-purple-400" /> Prescribed Roadmaps
                                </h3>
                                <div className="grid gap-4">
                                    {analysis.recommendedRoadmaps?.map((roadmap, i) => (
                                        <Card key={i} className="magnet-target hover-tilt transform-style-3d glass-card bg-[#111] border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group">
                                            <CardContent className="p-5">
                                                <h4 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors mb-2">{roadmap.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{roadmap.reason}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a] opacity-50">
                                <FileText size={48} className="mb-6 text-muted-foreground/30" />
                                <h3 className="text-xl font-medium text-foreground mb-2">Awaiting Context</h3>
                                <p className="text-sm text-muted-foreground max-w-sm">Provide your resume and target role parameters to initiate the AI gap analysis subsystem.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
