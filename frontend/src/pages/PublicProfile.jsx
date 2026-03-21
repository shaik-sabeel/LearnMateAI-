import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User as UserIcon, Calendar, Zap, Award } from 'lucide-react';

export default function PublicProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`/auth/users/${id}`);
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-transparent pt-32 text-center text-muted-foreground animate-pulse">Loading profile data...</div>;
    if (!profile) return <div className="min-h-screen bg-transparent pt-32 text-center text-red-500">User not found on the network.</div>;

    const joinDate = new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="container mx-auto py-12 px-6 pt-32">
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    
                    {/* Header Card */}
                    <Card className="hover-tilt transform-style-3d glass-card border-none bg-[#0a0a0a] relative overflow-hidden group">
                        <div className="absolute top-0 inset-x-0 h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500"></div>
                        <div className="absolute -left-32 -top-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] z-0 group-hover:bg-primary/20 transition-colors duration-1000"></div>
                        
                        <CardContent className="pt-16 pb-12 flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10 px-8 md:px-12">
                            <div className="w-36 h-36 rounded-full border border-white/10 bg-[#111] flex items-center justify-center text-6xl shadow-2xl relative">
                                <UserIcon size={64} className="text-muted-foreground/30" />
                                {profile.isPro && (
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-background shadow-lg">
                                        Pro
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{profile.name}</h1>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 text-left">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Level</p>
                                        <p className="text-2xl font-mono text-foreground">{profile.level}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">XP Earned</p>
                                        <p className="text-2xl font-mono text-foreground">{profile.xp}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Joined</p>
                                        <p className="text-lg text-foreground flex items-center gap-2 mt-1">
                                            <Calendar size={16} className="text-muted-foreground" /> {joinDate}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 text-center min-w-[140px] shadow-inner">
                                <Zap size={24} className="mx-auto mb-3 text-orange-400" />
                                <div className="text-4xl font-bold text-foreground font-mono">{profile.streak}</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-2">Day Streak</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Badges Box */}
                    <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 transition-colors">
                        <CardHeader className="border-b border-white/5 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2 font-medium">
                                <Award size={18} className="text-primary" /> Credentials & Badges
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 pb-10 px-8">
                            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                {profile.badges && profile.badges.length > 0 ? profile.badges.map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 bg-[#111] border border-white/5 p-6 rounded-2xl hover:border-primary/50 transition-all w-36 text-center group cursor-default">
                                        <div className="text-5xl group-hover:scale-110 transition-transform filter drop-shadow-md">{badge.icon || '🏆'}</div>
                                        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{badge.title}</span>
                                    </div>
                                )) : (
                                    <div className="py-12 text-center w-full flex flex-col items-center justify-center opacity-50">
                                        <Award size={48} className="text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">This developer hasn't earned any credentials yet.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
