import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const ArchiveGrid = ({ episodes, onPlay }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      
      <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-4">
        <h2 className="text-4xl md:text-5xl font-anton text-white uppercase">
          The Archives
        </h2>
        <span className="text-gray-500 font-mono hidden md:block">TOTAL DISAPPOINTMENTS: {episodes.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {episodes.map((ep, index) => (
          <motion.div
            key={ep.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => onPlay(ep)}
          >
            {/* THUMBNAIL CONTAINER */}
            <div className="relative aspect-video bg-gray-900 overflow-hidden mb-4 border border-gray-800 group-hover:border-latent-yellow transition-colors">
              <img 
                src={ep.thumbnail} 
                alt={ep.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={48} className="text-latent-yellow" fill="black" />
              </div>

              {/* DURATION BADGE */}
              <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 font-mono">
                24:00
              </div>
            </div>

            {/* TEXT INFO */}
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-latent-yellow transition-colors line-clamp-2 leading-tight uppercase font-anton mb-2">
                {ep.title}
              </h3>
              <p className="text-gray-500 text-xs line-clamp-2">
                {ep.description}
              </p>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ArchiveGrid;