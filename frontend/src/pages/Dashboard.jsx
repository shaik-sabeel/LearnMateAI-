import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Map, Bot, FileText, Search, Trophy, Star, ChevronRight, Activity, Zap } from 'lucide-react';

export default function Dashboard() {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState('');
    const [recommendations, setRecommendations] = useState({ paid_courses: [], free_youtube_resources: [] });
    const [loading, setLoading] = useState(false);
    const [userStats, setUserStats] = useState({ xp: 0, level: 1, badges: [], name: 'User', streak: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await api.get('/auth/user');
                if (res.data && res.data.onboardingCompleted === false) {
                    navigate('/onboarding');
                }
                if (res.data && res.data.username) {
                    setUserStats(prev => ({ ...prev, name: res.data.username, streak: res.data.streak || 0 }));
                }
            } catch (err) {
                console.error(err);
            }
        };
        checkUser();
        fetchResources();
        fetchStats();
    }, [navigate]);

    const fetchStats = async () => {
        try {
            const res = await api.get('/achievement/stats');
            setUserStats(prev => ({ ...prev, ...res.data }));
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    };

    const fetchResources = async () => {
        try {
            const res = await api.get('/resources');
            if (res.data.length === 0) {
                setResources([
                    { _id: '1', title: 'React Performance Optimization', type: 'Article', difficulty: 'Advanced', url: '#', description: 'Learn how to optimize your React apps.' },
                    { _id: '2', title: 'Understanding Asynchronous JS', type: 'Video', difficulty: 'Intermediate', url: '#', description: 'Deep dive into promises and async/await.' },
                ]);
            } else {
                setResources(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.get(`/resources?search=${search}`);
            setResources(res.data.length ? res.data : resources);

            const recRes = await api.post('/resources/recommend', { topic: search });
            setRecommendations(recRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />
            
            <div className="container mx-auto py-12 px-6 pt-32 max-w-6xl">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                            <Activity size={14} className="text-green-400" /> Welcome back, {userStats.name}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                            Overview
                        </h1>
                        <p className="text-muted-foreground text-lg">Track your progress and command your learning journey.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2 glass border border-white/5 p-1 rounded-xl animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Search new skills..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent border-none focus-visible:ring-0 pl-10"
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="magnet-target rounded-lg bg-foreground text-background hover:bg-muted-foreground/80">
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                    </form>
                </div>

                {/* Bento Grid: Stats & Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
                    
                    {/* Main Stats Card */}
                    <Card className="hover-tilt transform-style-3d md:col-span-8 glass-card border-none bg-gradient-to-br from-[#111] to-[#0a0a0a] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors duration-700"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-muted-foreground text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                                <Trophy size={16} className="text-yellow-500" /> Current Standing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 z-10">
                            <div>
                                <h2 className="text-6xl font-bold tracking-tighter mb-2">Lv. {userStats.level}</h2>
                                <p className="text-muted-foreground mb-6">You are in the top 15% of active learners.</p>
                                
                                <div className="space-y-2 w-full max-w-sm">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-primary">{userStats.xp} XP</span>
                                        <span className="text-muted-foreground">{userStats.level * 100} XP</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden shadow-inner">
                                        <div
                                            className="bg-primary h-full transition-all duration-1000 ease-out relative"
                                            style={{ width: `${(userStats.xp / (userStats.level * 100)) * 100}%` }}
                                        >
                                            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white/30 to-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <div className="glass px-6 py-4 rounded-xl border border-white/5 flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-500">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Streak</p>
                                        <p className="text-2xl font-bold">{userStats.streak} Days</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Bento */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <Link to="/roadmap" className="h-full">
                            <Card className="h-full magnet-target hover-tilt transform-style-3d glass-card bg-[#0f0f0f] border-white/5 hover:border-primary/50 transition-colors group cursor-pointer flex items-center p-6 gap-4">
                                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                                    <Map size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">New Roadmap</h3>
                                    <p className="text-xs text-muted-foreground">Generate AI curriculum</p>
                                </div>
                                <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </Card>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <Link to="/mock-interview" className="h-full">
                                <Card className="h-full magnet-target hover-tilt transform-style-3d glass-card bg-[#0f0f0f] border-white/5 hover:border-blue-500/50 transition-colors group cursor-pointer flex flex-col justify-center items-center p-4 text-center">
                                    <Bot size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Mock Interview</span>
                                </Card>
                            </Link>
                            <Link to="/resume-analyzer" className="h-full">
                                <Card className="h-full magnet-target hover-tilt transform-style-3d glass-card bg-[#0f0f0f] border-white/5 hover:border-green-500/50 transition-colors group cursor-pointer flex flex-col justify-center items-center p-4 text-center">
                                    <FileText size={24} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">Resume Match</span>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* AI Recommendations Section */}
                {(recommendations.paid_courses?.length > 0 || recommendations.free_youtube_resources?.length > 0) && (
                    <div className="mb-16 mt-20">
                        <div className="flex items-center gap-3 mb-8">
                            <Star size={24} className="text-primary fill-primary/20" />
                            <h2 className="text-3xl font-bold tracking-tight">AI Recommendations</h2>
                        </div>
                        
                        {/* YouTube */}
                        {recommendations.free_youtube_resources?.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xl font-medium mb-6 text-muted-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Free YouTube Tutorials
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {recommendations.free_youtube_resources.map((rec, i) => (
                                        <Card key={i} className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 hover:border-red-500/30 transition-colors group overflow-hidden flex flex-col">
                                            {rec.thumbnail && (
                                                <div className="relative w-full h-48 overflow-hidden">
                                                    <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                                                </div>
                                            )}
                                            <CardContent className="pt-6 flex-grow">
                                                <h4 className="text-lg font-semibold line-clamp-2 group-hover:text-red-400 transition-colors mb-2">{rec.title}</h4>
                                                <p className="text-sm text-muted-foreground">{rec.channel}</p>
                                            </CardContent>
                                            <CardFooter className="pt-0">
                                                <a href={rec.url} target="_blank" rel="noreferrer" className="w-full">
                                                    <Button variant="outline" className="magnet-target w-full bg-transparent border-white/10 hover:bg-white/5 text-foreground group-hover:border-red-500/50">
                                                        Watch Automatically
                                                    </Button>
                                                </a>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Paid Courses */}
                        {recommendations.paid_courses?.length > 0 && (
                            <div>
                                <h3 className="text-xl font-medium mb-6 text-muted-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span> Premium Masterclasses
                                </h3>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {recommendations.paid_courses.map((rec, i) => (
                                        <Card key={i} className="hover-tilt transform-style-3d glass-card bg-[#0a0a0a] border-white/5 hover:border-primary/30 transition-colors group h-full flex flex-col">
                                            <CardHeader>
                                                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">{rec.title}</CardTitle>
                                                <div className="flex gap-2 mt-3">
                                                    <span className="text-xs px-3 py-1 bg-white/5 text-muted-foreground rounded-full border border-white/5">Paid</span>
                                                    <span className="text-xs px-3 py-1 bg-white/5 text-muted-foreground rounded-full border border-white/5">{rec.level}</span>
                                                    {rec.price > 0 && <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">${rec.price}</span>}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <p className="text-sm text-muted-foreground/60 line-clamp-3">
                                                    Curated high-quality content heavily aligning with your recent roadmap generation.
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <a href={rec.url} target="_blank" rel="noreferrer" className="w-full">
                                                    <Button className="magnet-target w-full bg-foreground text-background hover:bg-muted-foreground transition-colors mix-blend-difference">
                                                        Enroll Now
                                                    </Button>
                                                </a>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Standard Resources */}
                <h2 className="text-2xl font-bold mb-8 mt-20 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Saved Resources
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
                    {resources.map((res) => (
                        <Card key={res._id} className="hover-tilt transform-style-3d glass-card bg-[#0f0f0f] border-white/5 hover:border-white/20 transition-all duration-500 group">
                            <CardHeader>
                                <CardTitle className="group-hover:text-white transition-colors">{res.title}</CardTitle>
                                <CardDescription>{res.type} • {res.difficulty}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{res.description || 'No description available for this module.'}</p>
                                <a href={res.url} target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="magnet-target w-full border-white/10 hover:bg-white/10 transition-colors">
                                        Open Resource
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
