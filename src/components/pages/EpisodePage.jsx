import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { episodes } from '../../data/showData';
import { ArrowLeft, Download, ThumbsUp, Share2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const EpisodePage = () => {
  const { id } = useParams();
  // Find the episode that matches the URL ID
  const episode = episodes.find(ep => ep.id === parseInt(id));

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!episode) {
    return <div className="text-white text-center mt-20">Episode not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20">
      
      {/* 1. CINEMATIC VIDEO CONTAINER */}
      <div className="w-full max-w-[1600px] mx-auto px-0 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full aspect-video bg-black border border-gray-800 shadow-2xl rounded-none md:rounded-xl overflow-hidden"
        >
          <iframe
            src={episode.videoUrl} 
            className="w-full h-full"
            allow="autoplay; fullscreen"
            title={episode.title}
            frameBorder="0"
          ></iframe>
        </motion.div>
      </div>

      {/* 2. EPISODE METADATA (Designed like a streaming site) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Navigation Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-latent-yellow mb-6 transition-colors text-sm font-mono uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Archives
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Title & Desc */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-anton text-white mb-4 uppercase leading-tight">
              {episode.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-mono text-gray-400 mb-6">
              <span className="bg-latent-yellow text-black px-2 py-0.5 rounded font-bold">HD</span>
              <span>SEASON 1</span>
              <span className="text-green-500">98% MATCH</span>
              <span>2025</span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-latent-yellow pl-6">
              {episode.description}
            </p>
          </div>

          {/* Right Column: Fake Actions */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <button className="w-full py-4 bg-white text-black font-anton text-xl uppercase tracking-wider hover:bg-latent-yellow transition-colors flex items-center justify-center gap-3 rounded">
              <Download size={24} /> Download 
            </button>
            
            <div className="flex gap-4">
               <button className="flex-1 py-3 bg-gray-900 border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 rounded">
                  <ThumbsUp size={20} /> Like
               </button>
               <button className="flex-1 py-3 bg-gray-900 border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 rounded">
                  <Share2 size={20} /> Share
               </button>
            </div>

            <div className="bg-red-900/20 border border-red-900/50 p-4 rounded mt-4">
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
                <AlertTriangle size={14} /> content warning
              </div>
              <p className="text-gray-400 text-xs">
                This episode contains high levels of cringe, bad coding jokes, and unauthorized usage of Samay Raina's likeness. Viewer discretion advised.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EpisodePage;