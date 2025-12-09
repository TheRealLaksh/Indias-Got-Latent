import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SupremeLeaderHero from './components/fan-zone/SupremeLeaderHero';
import ArchiveGrid from './components/episodes/ArchiveGrid';
import EpisodePage from './components/pages/EpisodePage';
import { episodes } from './data/showData';
import { Home, Zap, Clapperboard } from 'lucide-react';

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

// HomePage Component handling filters
const HomePage = ({ filter, isHome }) => {
  let displayedEpisodes = episodes;

  if (filter === 'bonus') {
    displayedEpisodes = episodes.filter(ep => ep.id > 12);
  } else if (filter === 'standard') {
    displayedEpisodes = episodes.filter(ep => ep.id <= 12);
  }

  return (
    <>
      <SupremeLeaderHero />
      <ArchiveGrid episodes={displayedEpisodes} isHome={isHome} />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-latent-yellow selection:text-black font-inter pb-24 md:pb-0">
        
        {/* --- DESKTOP NAVBAR --- */}
        <nav className="hidden md:flex fixed top-0 w-full z-40 p-6 justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
          <Link to="/" className="pointer-events-auto text-2xl font-bebas text-latent-yellow tracking-widest hover:text-white transition-colors decoration-none">
            IGL ARCHIVES
          </Link>
        </nav>

        {/* --- MOBILE TOP BAR (Updated) --- */}
        <nav className="md:hidden fixed top-0 w-full z-40 px-4 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
           {/* CHANGED: Text is now IGL */}
           <span className="text-xl font-bebas text-latent-yellow tracking-widest">IGL</span>
           {/* REMOVED: Profile Icon */}
        </nav>

        {/* ROUTE DEFINITIONS */}
        <Routes>
          <Route path="/" element={<HomePage filter="all" isHome={true} />} />
          <Route path="/bonus" element={<HomePage filter="bonus" isHome={false} />} />
          <Route path="/all-episodes" element={<HomePage filter="standard" isHome={false} />} />

          <Route path="/episodes/:epId" element={<EpisodePage type="standard" />} />
          <Route path="/bonus-episodes/:epId" element={<EpisodePage type="bonus" />} />
        </Routes>

        {/* --- MOBILE BOTTOM NAVIGATION (Updated) --- */}
        <div className="md:hidden fixed bottom-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-8 py-4 flex justify-between items-center safe-area-bottom">
          <BottomNavLink to="/" icon={Home} label="Home" />
          <BottomNavLink to="/bonus" icon={Zap} label="Bonus" />
          <BottomNavLink to="/all-episodes" icon={Clapperboard} label="Episodes" />
        </div>

        {/* GLOBAL FOOTER */}
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