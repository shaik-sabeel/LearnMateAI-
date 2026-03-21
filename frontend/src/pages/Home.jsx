import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlayCircle, ShieldCheck, Zap, Server, ChevronRight } from "lucide-react";

export default function Home() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-start bg-background overflow-hidden pt-32 relative">
            
            {/* Live Background Overlay - A subtle grid that pans with mouse might also be nice, but Shery follower is active */}
            <div className="container mx-auto px-6 max-w-5xl z-10 flex flex-col items-center text-center relative">
                
                {/* Subtle Update Badge */}
                <div className="magnet-target inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground text-xs font-semibold cursor-pointer hover:bg-secondary/80 transition-colors">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span> 
                    LearnMate Pro officially out of private beta <ChevronRight size={14} className="opacity-70" />
                </div>

                {/* Main Headline */}
                <h1 className="text-animate text-5xl sm:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl cursor-default">
                    The modern standard <br className="hidden sm:block" />
                    for <span className="text-muted-foreground">learning engineering.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                    Instantly generate structured curriculums, mock interviews, and skill assessments. Engineered for speed and precision.
                </p>

                {/* High-Contrast CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20">
                    <Link to="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="magnet-target w-full h-12 px-8 text-base font-medium transition-transform active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm">
                            Start Building Now
                        </Button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="magnet-target w-full h-12 px-8 text-base font-medium rounded-md gap-2 border-border bg-transparent hover:bg-secondary transition-colors">
                            <PlayCircle size={18} /> View Documentation
                        </Button>
                    </Link>
                </div>

                {/* Developer-focused image / code mockup area */}
                <div className="hover-3d mt-20 w-full relative group cursor-crosshair perspective-1000">
                    <div className="w-full h-[400px] rounded-xl border border-border bg-[#0a0a0a] shadow-2xl overflow-hidden flex flex-col hover-tilt transform-style-3d">
                        <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <div className="p-6 font-mono text-sm text-left opacity-70">
                            <div className="text-purple-400">import</div> {'{'} LearnMate {'}'} <div className="text-purple-400 inline">from</div> <span className="text-green-300">'@ai/core'</span>;
                            <br/><br/>
                            <div className="text-blue-400">const</div> tutor = <div className="text-blue-400 inline">new</div> LearnMate();
                            <br/><br/>
                            <div className="text-gray-500">// Start generating a complete roadmap in ms</div>
                            <br/>
                            <div className="text-blue-400">await</div> tutor.<div className="text-yellow-200">generateRoadmap</div>({'{'}<br/>
                            &nbsp;&nbsp;topic: <span className="text-green-300">'System Design'</span>,<br/>
                            &nbsp;&nbsp;depth: <span className="text-green-300">'Senior Engineer'</span>,<br/>
                            {'}'});
                            <br/><br/>
                            <span className="animate-pulse">_</span>
                        </div>
                    </div>
                </div>

                {/* Minimalist Feature Grid */}
                <div className="mt-40 w-full pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="magnet-target text-left border-l border-border pl-6 p-4 rounded-xl hover:bg-secondary/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-foreground">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl text-foreground font-semibold mb-3">Sub-second generation</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Built on blazing-fast Gemini architectures. Don't wait minutes for a curriculum map—get it instantly.</p>
                        </div>
                        
                        <div className="magnet-target text-left border-l border-border pl-6 p-4 rounded-xl hover:bg-secondary/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-foreground">
                                <Server size={24} />
                            </div>
                            <h3 className="text-xl text-foreground font-semibold mb-3">Production grade accuracy</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Mock interviews simulate real-world technical screens sourced from Big Tech engineering rubrics.</p>
                        </div>

                        <div className="magnet-target text-left border-l border-border pl-6 p-4 rounded-xl hover:bg-secondary/20 transition-colors">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-foreground">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl text-foreground font-semibold mb-3">Absolute privacy</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">Your resume and mock interview transcripts are localized. We never train public models on your private goals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
