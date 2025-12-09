import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SupremeLeaderHero from './components/fan-zone/SupremeLeaderHero';
import ArchiveGrid from './components/episodes/ArchiveGrid';
import EpisodePage from './components/pages/EpisodePage';
import { episodes } from './data/showData';

const HomePage = () => (
  <>
    <SupremeLeaderHero />
    <ArchiveGrid episodes={episodes} />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-latent-yellow selection:text-black">
        
        {/* GLOBAL NAVBAR */}
        <nav className="fixed top-0 w-full z-40 p-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
          <Link to="/" className="pointer-events-auto text-2xl font-anton text-latent-yellow tracking-tighter hover:text-white transition-colors decoration-none">
            IGL ARCHIVES
          </Link>
        </nav>

        {/* ROUTE DEFINITIONS */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* STANDARD EPISODES (e.g., /episodes/01) */}
          <Route path="/episodes/:epId" element={<EpisodePage type="standard" />} />
          
          {/* BONUS EPISODES (e.g., /bonus-episodes/01) */}
          <Route path="/bonus-episodes/:epId" element={<EpisodePage type="bonus" />} />
          
        </Routes>

        {/* GLOBAL FOOTER */}
        <footer className="w-full border-t border-gray-900 py-12 text-center bg-[#050505]">
          <p className="text-gray-600 font-mono text-xs mb-2">
            © 2025 UNOFFICIAL FAN ARCHIVE. NOT AFFILIATED WITH SAMAY RAINA (OFFICIALLY).
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-700 uppercase tracking-widest cursor-pointer hover:text-white transition">
             <span>DMCA</span>
             <span>Privacy Policy</span>
             <span>Submit Abuse</span>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;