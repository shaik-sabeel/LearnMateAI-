import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Registration Failed: ' + (err.response?.data?.msg || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-transparent">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

            <div className="w-full max-w-[400px] px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111] border border-white/10 mb-6 shadow-xl">
                        <UserPlus size={20} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Create Account</h1>
                    <p className="text-muted-foreground">Start your learning journey today.</p>
                </div>

                <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    
                    <CardContent className="pt-8">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 bg-[#111] border-white/10 focus-visible:border-primary shadow-inner rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 bg-[#111] border-white/10 focus-visible:border-primary shadow-inner rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold ml-1">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 bg-[#111] border-white/10 focus-visible:border-primary shadow-inner rounded-xl font-mono"
                                />
                            </div>
                            <Button type="submit" className="magnet-target w-full h-12 text-sm font-medium rounded-xl bg-foreground text-background hover:bg-muted-foreground transition-all flex items-center justify-center gap-2 mt-4 mix-blend-difference" disabled={loading}>
                                {loading ? 'Provisioning Workspace...' : (
                                    <>Sign Up <ArrowRight size={16} /></>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/5 pt-6 pb-6 bg-[#111]/50">
                        <p className="text-sm text-muted-foreground">
                            Already have an account? <Link to="/login" className="text-foreground font-medium hover:text-primary transition-colors ml-1">Sign in</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
