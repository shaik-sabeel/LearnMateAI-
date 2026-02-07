import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-background -z-20" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] -z-10 animate-float" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] -z-10 animate-pulse" />

            <div className="container mx-auto px-4 text-center z-10">
                <div className="inline-block mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium animate-fade-in-up">
                    🚀 Next-Gen AI Learning
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-sm">
                    Master Any Skill with <br />
                    <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">LearnMate AI++</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Your personal AI tutor that adapts to your learning style. Get tailored resources, smart quizzes, and instant feedback.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/login">
                        <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
                            Get Started
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-primary/20 hover:bg-primary/10 hover:text-primary transition-all">
                            Create Account
                        </Button>
                    </Link>
                </div>

                {/* Feature Cards Preview */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {[
                        { title: "AI Tutor", desc: "24/7 technical support from our advanced Gemini-powered assistant.", icon: "🤖" },
                        { title: "Smart Quizzes", desc: "Generate quizzes on any topic instantly and test your knowledge.", icon: "📝" },
                        { title: "Gap Analysis", desc: "Discover your weak spots and get personalized recommendations.", icon: "📊" }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-6 rounded-2xl hover:border-primary/50 transition-colors group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
