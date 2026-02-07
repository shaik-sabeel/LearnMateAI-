import { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState('');
    const [recommendations, setRecommendations] = useState({ paid_courses: [], free_youtube_resources: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await api.get('/resources');
            // Mock data for UI preview if empty
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
            // In a real scenario, search likely returns specific matches from DB
            // and /recommend returns new suggestions from ML.
            const res = await api.get(`/resources?search=${search}`);
            setResources(res.data.length ? res.data : resources); // Keep default if empty for demo

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
            <div className="container mx-auto py-12 px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">Manage your learning journey and explore new topics.</p>
                    </div>
                    <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2 glass p-1 rounded-lg">
                        <Input
                            placeholder="Search topics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-80 bg-transparent border-none focus-visible:ring-0"
                        />
                        <Button type="submit" disabled={loading} className="rounded-md">
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                    </form>
                </div>

                {recommendations.paid_courses?.length > 0 && (
                    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="text-primary">🎓</span> Top Paid Courses
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recommendations.paid_courses.map((rec, i) => (
                                <Card key={i} className="glass-card hover:bg-card/80 transition-all border-l-4 border-l-primary/50 group h-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">{rec.title}</CardTitle>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">{rec.is_paid}</span>
                                            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">{rec.level}</span>
                                            {rec.price > 0 && <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">${rec.price}</span>}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                            Level up your skills with this comprehensive course.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <a href={rec.url} target="_blank" rel="noreferrer" className="w-full">
                                            <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                                                View Course
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {recommendations.free_youtube_resources?.length > 0 && (
                    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="text-red-500">▶️</span> Free YouTube Tutorials
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recommendations.free_youtube_resources.map((rec, i) => (
                                <Card key={i} className="glass-card hover:bg-card/80 transition-all border-l-4 border-l-red-500/50 group h-full flex flex-col">
                                    <CardHeader>
                                        {rec.thumbnail && (
                                            <img src={rec.thumbnail} alt={rec.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                        )}
                                        <CardTitle className="text-lg line-clamp-2 group-hover:text-red-400 transition-colors">{rec.title}</CardTitle>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">YouTube</span>
                                            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">{rec.channel}</span>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="mt-auto">
                                        <a href={rec.url} target="_blank" rel="noreferrer" className="w-full">
                                            <Button variant="outline" className="w-full group-hover:border-red-500 group-hover:text-red-400">
                                                Watch Now
                                            </Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-2xl font-semibold mb-6">Learning Resources</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map((res) => (
                        <Card key={res._id} className="glass-card group hover:scale-[1.02] transition-transform duration-300">
                            <CardHeader>
                                <CardTitle className="group-hover:text-primary transition-colors">{res.title}</CardTitle>
                                <CardDescription>{res.type} • {res.difficulty}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{res.description || 'No description available.'}</p>
                                <a href={res.url} target="_blank" rel="noreferrer">
                                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground border-primary/20">
                                        View Resource
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
