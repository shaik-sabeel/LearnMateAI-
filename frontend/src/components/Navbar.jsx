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
                <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    LearnMate AI++
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
                        to="/quiz"
                        className={cn(
                            "text-sm font-medium transition-all hover:text-primary",
                            isActive('/quiz') ? "text-primary scale-105" : "text-muted-foreground"
                        )}
                    >
                        Quiz
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}
