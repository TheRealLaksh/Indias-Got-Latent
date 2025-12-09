import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, Share2, AlertTriangle, Download } from 'lucide-react';

const LatentPlayer = ({ episode, onClose }) => {
  return (
    <AnimatePresence>
      {episode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-0 md:p-6 backdrop-blur-md">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-6xl bg-[#121212] rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full md:h-auto max-h-screen border border-gray-800"
          >
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#E50914] rounded-full text-white transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            {/* --- VIDEO SECTION (65%) --- */}
            <div className="w-full md:w-[65%] bg-black relative flex items-center justify-center aspect-video md:aspect-auto">
              {/* GOOGLE DRIVE IFRAME */}
              <iframe
                src={episode.videoUrl} 
                className="w-full h-full min-h-[300px] md:min-h-[500px]"
                allow="autoplay; fullscreen"
                title={episode.title}
              ></iframe>
            </div>

            {/* --- METADATA SECTION (35%) --- */}
            <div className="w-full md:w-[35%] p-6 md:p-8 bg-[#121212] overflow-y-auto flex flex-col justify-between border-l border-gray-800">
              
              <div>
                {/* Fake Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-mono">
                  <span>ARCHIVE</span>
                  <span>/</span>
                  <span>SEASON 1</span>
                  <span>/</span>
                  <span className="text-latent-yellow">PLAYING</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-anton leading-tight uppercase">
                  {episode.title}
                </h2>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 font-mono">
                   <span className="bg-gray-800 px-2 py-1 rounded text-white">HD</span>
                   <span className="flex items-center gap-1 text-green-500"><Download size={12}/> 998K</span>
                   <span>18+</span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-latent-yellow pl-4 italic">
                  {episode.description}
                </p>
              </div>

              {/* Fake Actions */}
              <div className="mt-8 space-y-4">
                <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-latent-yellow transition-colors flex items-center justify-center gap-2">
                  <Download size={18} /> Download Episode
                </button>
                
                <div className="flex gap-4">
                   <button className="flex-1 py-3 bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <ThumbsUp size={18} /> Like
                   </button>
                   <button className="flex-1 py-3 bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <Share2 size={18} /> Share
                   </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-red-500 mt-4 justify-center opacity-60">
                  <AlertTriangle size={12} />
                  <span>DMCA Protected Content</span>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LatentPlayer;