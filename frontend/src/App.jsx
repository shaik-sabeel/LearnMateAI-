import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import PublicProfile from './pages/PublicProfile';
import Leaderboard from './pages/Leaderboard';
import Pricing from './pages/Pricing';
import MockInterview from './pages/MockInterview';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import LiveBackground from './components/LiveBackground';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary relative group cursor-none">
        <CustomCursor />
        <LiveBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/u/:id" element={<PublicProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
