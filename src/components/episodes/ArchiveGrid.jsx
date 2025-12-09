import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, TrendingUp } from 'lucide-react';

const ArchiveGrid = ({ episodes }) => {
  
  // Separate Standard and Bonus episodes for the Mobile Layout
  const standardEpisodes = episodes.filter(ep => ep.id <= 12);
  const bonusEpisodes = episodes.filter(ep => ep.id > 12);

  const getEpisodeLink = (id) => {
    if (id <= 12) {
      const epNum = id.toString().padStart(2, '0');
      return `/episodes/${epNum}`;
    } else {
      const bonusNum = (id - 12).toString().padStart(2, '0');
      return `/bonus-episodes/${bonusNum}`;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
      
      {/* --- DESKTOP HEADER --- */}
      <div className="hidden md:flex items-end justify-between mb-12 border-b border-gray-800 pb-4">
        <h2 className="text-5xl md:text-6xl font-bebas text-white uppercase tracking-wide">
          The Archives
        </h2>
        <span className="text-gray-500 font-mono">TOTAL DISAPPOINTMENTS: {episodes.length}</span>
      </div>

      {/* ============================== */}
      {/* MOBILE LAYOUT            */}
      {/* ============================== */}
      <div className="md:hidden space-y-12">
        
        {/* 1. Horizontal Scroll Section (Bonus/Trending) */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <TrendingUp size={18} className="text-latent-yellow" />
            <h3 className="text-xl font-bebas tracking-wider text-white">Bonus Content</h3>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {bonusEpisodes.map((ep) => (
              <Link to={getEpisodeLink(ep.id)} key={ep.id} className="snap-center shrink-0 w-[280px]">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 border border-white/10 shadow-lg">
                  <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                    {ep.duration}
                  </div>
                  <PlayCircle className="absolute bottom-2 left-2 text-white/90" size={24} />
                </div>
                <h4 className="font-bebas text-lg leading-tight text-gray-100 line-clamp-1">{ep.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{ep.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Vertical List Section (Standard Episodes) */}
        <section>
          <h3 className="text-xl font-bebas tracking-wider text-white mb-4 px-2">All Episodes</h3>
          <div className="flex flex-col gap-4">
            {standardEpisodes.map((ep) => (
              <Link to={getEpisodeLink(ep.id)} key={ep.id}>
                <div className="flex gap-4 p-2 rounded-xl active:bg-white/5 transition-colors">
                  {/* Small Thumbnail */}
                  <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/5">
                    <img src={ep.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Text Info */}
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-latent-yellow uppercase tracking-wider mb-1">
                      Episode {ep.id}
                    </span>
                    <h4 className="font-bold text-sm text-gray-100 line-clamp-2 leading-snug mb-2">
                      {ep.title.replace("INDIA'S GOT LATENT ｜ ", "")}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={10} /> {ep.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>


      {/* ============================== */}
      {/* DESKTOP GRID             */}
      {/* ============================== */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        {episodes.map((ep, index) => (
          <Link to={getEpisodeLink(ep.id)} key={ep.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden mb-4 border border-gray-800 group-hover:border-latent-yellow transition-colors rounded-sm">
                <img 
                  src={ep.thumbnail} 
                  alt={ep.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                   <PlayCircle size={48} className="text-latent-yellow drop-shadow-lg" fill="black" />
                </div>

                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 font-mono rounded backdrop-blur-md border border-white/10">
                  {ep.duration}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bebas text-white group-hover:text-latent-yellow transition-colors line-clamp-2 leading-none mb-2 tracking-wide">
                  {ep.title}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2 font-mono">
                  {ep.description}
                </p>
              </div>

            </motion.div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default ArchiveGrid;