import React, { useState } from 'react';
import SupremeLeaderHero from './components/fan-zone/SupremeLeaderHero';
import ArchiveGrid from './components/episodes/ArchiveGrid';
import LatentPlayer from './components/ui/LatentPlayer';
import { episodes } from './data/showData';

function App() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-latent-yellow selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-40 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto text-2xl font-anton text-latent-yellow tracking-tighter">
          IGL ARCHIVES
        </div>
        <div className="pointer-events-auto font-mono text-xs text-gray-400 border border-gray-700 px-3 py-1 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
          LOGIN / SIGNUP
        </div>
      </nav>

      {/* HERO SECTION */}
      <SupremeLeaderHero />

      {/* EPISODE LIST */}
      <ArchiveGrid 
        episodes={episodes} 
        onPlay={(ep) => setSelectedEpisode(ep)} 
      />

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-900 py-12 text-center">
        <p className="text-gray-600 font-mono text-xs mb-2">
          © 2025 UNOFFICIAL FAN ARCHIVE. NOT AFFILIATED WITH SAMAY RAINA (OFFICIALLY).
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-700 uppercase tracking-widest cursor-pointer hover:text-white transition">
           <span>DMCA</span>
           <span>Privacy Policy</span>
           <span>Submit Abuse</span>
        </div>
      </footer>

      {/* VIDEO MODAL (THE DECEPTION) */}
      <LatentPlayer 
        episode={selectedEpisode} 
        onClose={() => setSelectedEpisode(null)} 
      />

    </div>
  );
}

export default App;