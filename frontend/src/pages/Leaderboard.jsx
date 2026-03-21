import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, User as UserIcon } from 'lucide-react';

export default function Leaderboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const res = await api.get('/auth/users/top');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopUsers();
    }, []);

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            <div className="container mx-auto py-12 px-6 pt-32">
                <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                            <Trophy size={14} className="text-yellow-500" /> Engineering Rankings
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Global Leaderboard
                        </h1>
                        <p className="text-muted-foreground text-lg">Compare your progress against the top developers on the platform.</p>
                    </div>

                    <Card className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 inset-x-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-20 text-center text-muted-foreground animate-pulse flex flex-col items-center">
                                    <Trophy size={48} className="mb-4 opacity-20" />
                                    Loading rankings...
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {users.map((user, idx) => (
                                        <Link to={`/u/${user._id}`} key={user._id} className="block group/row">
                                            <div className="flex items-center gap-6 p-6 hover:bg-[#111] transition-colors">
                                                <div className="w-12 text-center font-mono font-bold text-xl text-muted-foreground/50 group-hover/row:text-primary transition-colors">
                                                    {idx < 3 ? (
                                                        idx === 0 ? <span className="text-yellow-400">1</span> :
                                                        idx === 1 ? <span className="text-gray-300">2</span> :
                                                        <span className="text-amber-600">3</span>
                                                    ) : idx + 1}
                                                </div>
                                                
                                                <div className="w-14 h-14 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-muted-foreground group-hover/row:border-primary/50 transition-all shadow-inner relative">
                                                    <UserIcon size={24} />
                                                    {user.isPro && (
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-[#111] bg-primary"></div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-foreground group-hover/row:text-primary transition-colors tracking-tight">{user.name}</h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-0.5 rounded">Lv. {user.level}</span>
                                                        <span className="text-xs text-muted-foreground">{user.badges?.length || 0} Badges</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right flex flex-col items-end gap-1">
                                                    <div className="font-bold text-foreground font-mono text-lg">{user.xp.toLocaleString()} <span className="text-primary text-sm font-sans tracking-widest uppercase">XP</span></div>
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                                                        <Zap size={14} className="text-orange-400" /> {user.streak} Days
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {users.length === 0 && (
                                        <div className="p-20 text-center flex flex-col items-center opacity-50">
                                            <Trophy size={48} className="text-muted-foreground mb-4" />
                                            <div className="text-foreground font-medium">No users found.</div>
                                            <div className="text-sm text-muted-foreground mt-1">Be the first to join the leaderboard!</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
