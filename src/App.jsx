import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SupremeLeaderHero from './components/fan-zone/SupremeLeaderHero';
import ArchiveGrid from './components/episodes/ArchiveGrid';
import EpisodePage from './components/pages/EpisodePage';
import { episodes } from './data/showData';
import { Home, Zap, Search, User } from 'lucide-react'; // Icons for navbar

// Helper component to highlight active link
const BottomNavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-latent-yellow' : 'text-gray-500'}`}>
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-medium tracking-wide uppercase">{label}</span>
    </Link>
  );
};

const HomePage = () => (
  <>
    <SupremeLeaderHero />
    <ArchiveGrid episodes={episodes} />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-latent-yellow selection:text-black font-inter pb-20 md:pb-0">
        
        {/* --- DESKTOP NAVBAR (Hidden on Mobile) --- */}
        <nav className="hidden md:flex fixed top-0 w-full z-40 p-6 justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
          <Link to="/" className="pointer-events-auto text-2xl font-bebas text-latent-yellow tracking-widest hover:text-white transition-colors decoration-none">
            IGL ARCHIVES
          </Link>
        </nav>

        {/* --- MOBILE TOP BAR (Minimal) --- */}
        <nav className="md:hidden fixed top-0 w-full z-40 px-4 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
           <span className="text-xl font-bebas text-latent-yellow tracking-widest">LATENT</span>
           <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={16} className="text-gray-400" />
           </div>
        </nav>

        {/* ROUTE DEFINITIONS */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/episodes/:epId" element={<EpisodePage type="standard" />} />
          <Route path="/bonus-episodes/:epId" element={<EpisodePage type="bonus" />} />
        </Routes>

        {/* --- MOBILE BOTTOM NAVIGATION (Hidden on Desktop) --- */}
        <div className="md:hidden fixed bottom-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center safe-area-bottom">
          <BottomNavLink to="/" icon={Home} label="Home" />
          <BottomNavLink to="/bonus-episodes/01" icon={Zap} label="Bonus" />
          {/* Dummy links for aesthetic */}
          <div className="flex flex-col items-center gap-1 text-gray-600">
             <Search size={24} />
             <span className="text-[10px] font-medium tracking-wide uppercase">Search</span>
          </div>
        </div>

        {/* GLOBAL FOOTER (Desktop Only) */}
        <footer className="hidden md:block w-full border-t border-gray-900 py-12 text-center bg-[#050505]">
          <p className="text-gray-600 font-mono text-xs mb-2">
            © 2025 UNOFFICIAL FAN ARCHIVE.
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;