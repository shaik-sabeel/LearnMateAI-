import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Make sure this import works, assuming earlier setup

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass">
            <div className="flex h-16 items-center px-6 container mx-auto">
                <Link to="/dashboard" className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                    <span className="w-5 h-5 bg-primary rounded-sm block"></span> LearnMate
                </Link>
                <div className="ml-auto flex items-center space-x-6">
                    <Link
                        to="/dashboard"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/dashboard') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/chat"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/chat') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        AI Tutor
                    </Link>
                    <Link
                        to="/roadmap"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/roadmap') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        Roadmap
                    </Link>
                    <Link
                        to="/mock-interview"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/mock-interview') ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        Interviews
                    </Link>
                    <Link
                        to="/resume-analyzer"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/resume-analyzer') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        📄 Resume Analyzer
                    </Link>
                    <Link
                        to="/quiz"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/quiz') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        Quiz
                    </Link>
                    <Link
                        to="/leaderboard"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/leaderboard') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        Leaderboard
                    </Link>
                    <Link
                        to="/pricing"
                        className="text-sm font-medium bg-foreground text-background px-4 py-1.5 rounded-md hover:bg-foreground/90 transition-colors"
                    >
                        Upgrade
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}
