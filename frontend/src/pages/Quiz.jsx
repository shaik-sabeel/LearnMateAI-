import { useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [predictedLevel, setPredictedLevel] = useState('');

    const generateQuiz = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/quiz/generate', { topic, difficulty });
            setQuiz(res.data);
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setPredictedLevel('');
        } catch (err) {
            alert('Error generating quiz');
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = async (option) => {
        let newScore = score;
        if (option === quiz[currentQuestion].answer) {
            newScore = score + 1;
            setScore(newScore);
        }

        if (currentQuestion + 1 < quiz.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            await finishQuizWithScore(newScore);
        }
    }

    const finishQuizWithScore = async (finalScore) => {
        setShowResult(true);
        try {
            await api.post('/quiz/save', {
                topic,
                score: finalScore,
                totalQuestions: quiz.length
            });

            // Predict Gap
            const gapRes = await api.post('/quiz/predict-gap', {
                quiz_score: finalScore,
                total_questions: quiz.length
            });
            setPredictedLevel(gapRes.data.level);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="container mx-auto py-12 px-4 flex justify-center">
                <Card className="w-full max-w-xl glass-card border-t-4 border-t-primary shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                            <BrainCircuit className="text-primary" size={32} />
                            AI Quiz Generator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        {!quiz.length && !loading && !showResult && (
                            <form onSubmit={generateQuiz} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base">Topic</Label>
                                    <Input
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. React Hooks, Python Basics..."
                                        required
                                        className="bg-muted/50 border-input/50 h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base">Difficulty</Label>
                                    <select
                                        className="flex h-11 w-full rounded-md border border-input/50 bg-muted/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <Button type="submit" className="w-full h-11 text-lg font-medium shadow-lg shadow-primary/20">
                                    Generate Quiz
                                </Button>
                            </form>
                        )}

                        {loading && (
                            <div className="text-center py-10 space-y-4">
                                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                                <p className="text-muted-foreground animate-pulse">Consulting the AI knowledge base...</p>
                            </div>
                        )}

                        {quiz.length > 0 && !showResult && (
                            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        Question {currentQuestion + 1} of {quiz.length}
                                    </span>
                                    <span className="text-muted-foreground">Score: {score}</span>
                                </div>

                                <h3 className="text-xl font-semibold leading-relaxed">{quiz[currentQuestion].question}</h3>

                                <div className="grid gap-3">
                                    {quiz[currentQuestion].options.map((opt, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            className="justify-start text-left h-auto py-3 px-4 hover:border-primary hover:bg-primary/5 transition-all text-base whitespace-normal"
                                            onClick={() => handleOptionClick(opt)}
                                        >
                                            <span className="mr-3 text-muted-foreground font-mono text-xs border rounded w-5 h-5 flex items-center justify-center">
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {showResult && (
                            <div className="text-center space-y-6 py-4 animate-in fade-in scale-95 duration-500">
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20 mb-6">
                                    <Trophy className="text-white w-12 h-12" />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold">Quiz Completed!</h2>
                                    <p className="text-xl text-muted-foreground">You scored <span className="text-foreground font-bold">{score}</span> out of {quiz.length}</p>
                                </div>

                                {predictedLevel && (
                                    <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-lg text-left relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                                                <CheckCircle2 className="text-primary w-5 h-5" />
                                                Analysis Result
                                            </h3>
                                            <p className="text-muted-foreground">Based on your performance, your predicted skill level is:</p>
                                            <div className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                                                {predictedLevel}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Button onClick={() => setQuiz([])} className="w-full h-11" variant="secondary">
                                    Take Another Quiz
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
