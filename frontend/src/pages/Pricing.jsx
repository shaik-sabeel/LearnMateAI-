import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import api from '../services/api';

export default function Pricing() {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const res = await api.post('/payment/create-checkout-session');
            window.location.href = res.data.url; // Redirect to Stripe
        } catch (err) {
            console.error(err);
            alert("Payment initialization failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="container mx-auto py-20 px-6 max-w-5xl pt-32">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                        <Sparkles size={14} className="text-primary" /> Transparent Pricing
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
                        Invest in your trajectory.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Whether you're exploring new skills or actively hunting for senior engineering roles, we have a plan for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                    {/* Free Plan */}
                    <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 hover:border-white/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-100 flex flex-col">
                        <CardHeader className="text-center pb-4 pt-10">
                            <CardTitle className="text-2xl font-bold tracking-tight">Standard</CardTitle>
                            <CardDescription className="mt-2">For casual explorers</CardDescription>
                            <div className="mt-6 mb-2">
                                <span className="text-6xl font-bold tracking-tighter">$0</span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Free Forever</span>
                        </CardHeader>
                        <CardContent className="mt-8 flex-1">
                            <ul className="space-y-5 px-6">
                                <li className="flex items-start gap-4 text-[15px] text-muted-foreground"><Check className="text-primary/50 size-5 shrink-0 mt-0.5" /> 5 AI Roadmap Generations</li>
                                <li className="flex items-start gap-4 text-[15px] text-muted-foreground"><Check className="text-primary/50 size-5 shrink-0 mt-0.5" /> Basic Course Recommendations</li>
                                <li className="flex items-start gap-4 text-[15px] text-muted-foreground"><Check className="text-primary/50 size-5 shrink-0 mt-0.5" /> Access to Global Leaderboard</li>
                                <li className="flex items-start gap-4 text-[15px] text-muted-foreground/40"><span className="size-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">-</span> No AI Mock Interviews</li>
                            </ul>
                        </CardContent>
                        <CardFooter className="pb-10 px-10">
                            <Button variant="outline" className="w-full h-14 bg-transparent border-white/10 text-muted-foreground hover:bg-white/5 transition-colors" disabled>
                                Current Plan
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="hover-tilt transform-style-3d glass-card relative bg-gradient-to-b from-[#111] to-[#0a0a0a] border-primary/30 shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-200 flex flex-col overflow-hidden group">
                        <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10 group-hover:bg-primary/30 transition-colors duration-700"></div>
                        
                        <div className="absolute top-6 right-6">
                            <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">Pro</span>
                        </div>
                        
                        <CardHeader className="text-center pb-4 pt-10">
                            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Pro Scholar</CardTitle>
                            <CardDescription className="mt-2 text-primary/80">For serious career advancers</CardDescription>
                            <div className="mt-6 mb-2">
                                <span className="text-6xl font-bold tracking-tighter">$15</span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Per Month</span>
                        </CardHeader>
                        <CardContent className="mt-8 flex-1">
                            <ul className="space-y-5 px-6">
                                <li className="flex items-start gap-4 text-[15px] font-medium text-foreground"><Check className="text-primary size-5 shrink-0 mt-0.5" /> Unlimited AI Roadmaps</li>
                                <li className="flex items-start gap-4 text-[15px] font-medium text-foreground"><Check className="text-primary size-5 shrink-0 mt-0.5" /> Unlimited AI Mock Interviews</li>
                                <li className="flex items-start gap-4 text-[15px] font-medium text-foreground"><Check className="text-primary size-5 shrink-0 mt-0.5" /> Custom Resume Analyzer</li>
                                <li className="flex items-start gap-4 text-[15px] font-medium text-foreground"><Check className="text-primary size-5 shrink-0 mt-0.5" /> Premium Leaderboard Badge</li>
                            </ul>
                        </CardContent>
                        <CardFooter className="pb-10 px-10">
                            <Button 
                                onClick={handleSubscribe} 
                                disabled={loading}
                                className="magnet-target w-full h-14 bg-foreground text-background hover:bg-muted-foreground transition-all shadow-[0_0_20px_rgba(147,51,234,0.15)] text-[15px] mix-blend-difference"
                            >
                                {loading ? 'Initializing Stripe...' : 'Upgrade to Pro'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
