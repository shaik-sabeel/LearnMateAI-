import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Trophy, BrainCircuit } from 'lucide-react';

export default function Quiz() {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [predictedLevel, setPredictedLevel] = useState('');

    const generateQuiz = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/quiz/generate', { topic, difficulty });
            setQuiz(res.data.quiz);
            setCurrentQuestion(0);
            setScore(0);
            setUserAnswers([]);
            setShowResult(false);
            setPredictedLevel('');
        } catch (err) {
            alert('Error generating quiz');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = (option) => {
        const currentAnswer = option;
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = currentAnswer;
        setUserAnswers(newAnswers);

        if (currentQuestion + 1 < quiz.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            finishQuizWithSubmit(newAnswers);
        }
    };

    const finishQuizWithSubmit = async (finalAnswers) => {
        setLoading(true);
        try {
            const res = await api.post('/quiz/submit', {
                topic,
                difficulty,
                questions: quiz,
                userAnswers: finalAnswers
            });

            setScore(res.data.score);
            setShowResult(true);

            // Optional ML prediction
            const gapRes = await api.post('/quiz/predict-gap', {
                quiz_score: res.data.score,
                total_questions: quiz.length
            });
            setPredictedLevel(gapRes.data.level);

        } catch (err) {
            console.error(err);
            alert('Error submitting quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="container mx-auto py-12 px-4 flex justify-center pt-32">
                <Card className="hover-tilt transform-style-3d w-full max-w-2xl glass-card bg-[#0a0a0a] border-white/5 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="absolute top-0 inset-x-0 h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 opacity-50"></div>
                    
                    <CardHeader className="text-center pb-6 pt-10">
                        <div className="mx-auto w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                            <BrainCircuit className="text-primary" size={28} />
                        </div>
                        <CardTitle className="text-3xl font-bold tracking-tight">AI Knowledge Assessment</CardTitle>
                        <CardDescription className="text-base mt-2">Generate dynamically synthesized quizzes to validate your expertise.</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-8 md:p-12 pt-0">
                        {!quiz.length && !loading && !showResult && (
                            <form onSubmit={generateQuiz} className="space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-muted-foreground font-semibold uppercase tracking-wider text-[11px] ml-1">Subject Matter</Label>
                                    <Input
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. AWS Architecture, React Fiber..."
                                        required
                                        className="bg-[#111] border-white/10 hover:border-white/20 focus-visible:border-primary h-14 text-base shadow-inner rounded-xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-muted-foreground font-semibold uppercase tracking-wider text-[11px] ml-1">Calibration</Label>
                                    <select
                                        className="flex h-14 w-full rounded-xl border border-white/10 bg-[#111] px-4 py-2 text-base text-foreground focus-visible:outline-none focus-visible:border-primary shadow-inner appearance-none cursor-pointer"
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                    >
                                        <option value="Beginner">Beginner (Fundamentals)</option>
                                        <option value="Intermediate">Intermediate (Implementation)</option>
                                        <option value="Advanced">Advanced (Architecture & Edge Cases)</option>
                                    </select>
                                </div>
                                <Button type="submit" className="magnet-target w-full h-14 text-base font-medium rounded-xl bg-foreground text-background hover:bg-muted-foreground transition-all mix-blend-difference mt-4">
                                    Synthesize Assessment
                                </Button>
                            </form>
                        )}

                        {loading && (
                            <div className="text-center py-20 flex flex-col items-center">
                                <Loader2 className="w-10 h-10 animate-spin text-primary mb-6" />
                                <p className="text-muted-foreground font-medium animate-pulse">Running generative models...</p>
                            </div>
                        )}

                        {quiz.length > 0 && !showResult && (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                <div className="flex justify-between items-center text-sm font-medium border-b border-white/5 pb-4">
                                    <span className="font-mono text-muted-foreground">
                                        Question <span className="text-foreground">{currentQuestion + 1}</span> / {quiz.length}
                                    </span>
                                    <span className="text-primary font-mono bg-primary/10 px-3 py-1 rounded">Score: {score}</span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight text-foreground">{quiz[currentQuestion].question}</h3>

                                <div className="grid gap-3 pt-4">
                                    {quiz[currentQuestion].options.map((opt, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            className="magnet-target justify-start text-left h-auto py-5 px-6 border-white/10 bg-[#111] hover:border-primary/50 hover:bg-primary/5 transition-all text-[15px] whitespace-normal rounded-xl group"
                                            onClick={() => handleOptionClick(opt)}
                                        >
                                            <span className="mr-4 text-muted-foreground font-mono text-xs border border-white/10 bg-black rounded w-7 h-7 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className="leading-snug">{opt}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showResult && (
                            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-700">
                                <div className="w-28 h-28 bg-[#111] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                                    <Trophy className="text-primary w-12 h-12 relative z-10" />
                                </div>

                                <h2 className="text-3xl font-bold tracking-tight mb-3">Assessment Complete</h2>
                                <p className="text-xl text-muted-foreground mb-10">You scored <span className="text-foreground font-bold font-mono text-2xl mx-1">{score}</span> out of {quiz.length}</p>

                                {predictedLevel && (
                                    <div className="p-6 bg-[#111] border border-white/5 rounded-2xl text-left mb-10 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="text-primary w-4 h-4" /> Machine Learning Insight
                                        </h3>
                                        <p className="text-foreground text-lg">Based on exact rubric matching, your operative engineering level is:</p>
                                        <div className="mt-4 text-3xl font-bold tracking-tight text-primary">
                                            {predictedLevel}
                                        </div>
                                    </div>
                                )}

                                <Button onClick={() => setQuiz([])} className="magnet-target w-full h-14 text-base font-medium rounded-xl bg-foreground text-background hover:bg-muted-foreground transition-colors mix-blend-difference">
                                    Initiate New Assessment
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
