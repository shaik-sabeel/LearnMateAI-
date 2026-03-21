import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Activity } from 'lucide-react';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ goal: '', level: 'Beginner' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNext = () => setStep((prev) => prev + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/onboard', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-xl w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="mb-10 flex flex-col items-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111] border border-white/10 mb-6 shadow-xl">
                <Sparkles size={20} className="text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-3">Initialize Workspace</h2>
            <p className="text-muted-foreground text-lg">Calibrate your neural learning pathways.</p>
            
            {/* Step Indicators */}
            <div className="flex gap-2 mt-8">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'w-12 bg-primary' : 'w-8 bg-white/10'}`}></div>
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'w-12 bg-primary' : 'w-8 bg-white/10'}`}></div>
            </div>
        </div>

        <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            <CardContent className="p-8 md:p-10">
                {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <Target size={20} className="text-primary" />
                        <h3 className="text-xl font-semibold tracking-tight">Set Objective</h3>
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Primary Trajectory</label>
                        <input
                            type="text"
                            placeholder="e.g. Master Full Stack Next.js Development"
                            className="w-full bg-[#111] border border-white/10 focus-visible:border-primary shadow-inner rounded-xl h-14 px-4 text-base outline-none transition-all placeholder:text-muted-foreground/50"
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!formData.goal}
                        className="magnet-target w-full h-14 bg-foreground text-background hover:bg-muted-foreground transition-all rounded-xl font-medium text-base disabled:opacity-30 disabled:pointer-events-none mix-blend-difference mt-2"
                    >
                        Confirm Objective
                    </button>
                </div>
                )}

                {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity size={20} className="text-primary" />
                        <h3 className="text-xl font-semibold tracking-tight">Current Velocity</h3>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Baseline Proficiency</label>
                        <select
                            className="w-full bg-[#111] border border-white/10 focus-visible:border-primary shadow-inner rounded-xl h-14 px-4 text-base outline-none transition-all appearance-none cursor-pointer text-foreground"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        >
                            <option value="Beginner">L1 - Initiate (Fundamentals)</option>
                            <option value="Intermediate">L2 - Practitioner (Building Projects)</option>
                            <option value="Advanced">L3 - Architect (Optimization & Scale)</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => setStep(1)}
                            className="w-1/3 py-4 bg-transparent border border-white/10 hover:bg-white/5 text-muted-foreground font-medium rounded-xl transition-colors text-sm"
                        >
                            Rewind
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="magnet-target w-2/3 py-4 bg-foreground text-background hover:bg-muted-foreground font-medium rounded-xl transition-all mix-blend-difference text-sm flex items-center justify-center gap-2"
                        >
                            Boot Sequence <Sparkles size={14} />
                        </button>
                    </div>
                </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
