import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react'; // Make sure to import Play

const ArchiveGrid = ({ episodes }) => {
  
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
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      
      <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-4">
        <h2 className="text-5xl md:text-6xl font-bebas text-white uppercase tracking-wide">
          The Archives
        </h2>
        <span className="text-gray-500 font-mono hidden md:block">TOTAL DISAPPOINTMENTS: {episodes.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {episodes.map((ep, index) => (
          <Link to={getEpisodeLink(ep.id)} key={ep.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              {/* THUMBNAIL CONTAINER */}
              <div className="relative aspect-video bg-gray-900 overflow-hidden mb-4 border border-gray-800 group-hover:border-latent-yellow transition-colors rounded-sm">
                <img 
                  src={ep.thumbnail} 
                  alt={ep.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* NEW PREMIUM PLAY BUTTON OVERLAY */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <div className="transform scale-50 group-hover:scale-100 transition-transform duration-300 ease-out">
                    <div className="bg-latent-yellow text-black p-4 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)] flex items-center justify-center hover:scale-110 transition-transform">
                      {/* ml-1 centers the play triangle visually */}
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 font-mono rounded backdrop-blur-md border border-white/10">
                  {ep.duration}
                </div>
              </div>

              {/* TEXT INFO */}
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