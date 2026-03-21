export default function LiveBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 border-none bg-black">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Glowing Aurora / Orbs moving very slowly for that premium SaaS feel */}
            <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-purple-900/20 rounded-full blur-[100px] opacity-50 animate-blob mix-blend-screen" style={{ animationDuration: '20s' }}></div>
            <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] bg-indigo-900/20 rounded-full blur-[100px] opacity-50 animate-blob animation-delay-2000 mix-blend-screen" style={{ animationDuration: '25s' }}></div>
            <div className="absolute bottom-[-10%] left-1/3 w-[60vw] h-[30vh] bg-primary/10 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-4000 mix-blend-screen" style={{ animationDuration: '30s' }}></div>

            {/* Faint animated noise overlay for texture (Skiper UI style) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
}
