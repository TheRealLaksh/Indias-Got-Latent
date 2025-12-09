import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { episodes } from '../../data/showData';
import { ArrowLeft, Download, ThumbsUp, Share2, AlertTriangle, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const EpisodePage = () => {
  const { id } = useParams();
  const episode = episodes.find(ep => ep.id === parseInt(id));

  // --- STATE FOR INTERACTIVE BUTTONS ---
  // Initialize with the data from the file (randomized range 4k-15k)
  const [likes, setLikes] = useState(episode ? episode.likes : 0);
  const [shares, setShares] = useState(episode ? episode.shares : 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset state when episode changes
    if (episode) {
      setLikes(episode.likes);
      setShares(episode.shares);
      setHasLiked(false);
    }
  }, [id, episode]);

  if (!episode) {
    return <div className="text-white text-center mt-20">Episode not found</div>;
  }

  // --- HANDLERS ---
  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    setShares(prev => prev + 1);
    // Simple visual feedback
    alert(`Link copied to clipboard! (Shares: ${shares + 1})`);
  };

  // Helper to format numbers (e.g., 14200 -> 14.2K)
  const formatCount = (num) => {
    return num > 1000 ? (num / 1000).toFixed(1) + 'K' : num;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20">
      
      {/* 1. CINEMATIC VIDEO PLAYER (Full Width) */}
      <div className="w-full max-w-[1800px] mx-auto px-0 md:px-4 mb-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-video bg-black shadow-2xl rounded-none md:rounded-xl overflow-hidden"
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

      {/* 2. INFO & ACTIONS BAR */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-latent-yellow mb-4 transition-colors text-sm font-mono uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Archives
        </Link>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          
          {/* LEFT: Title & Stats */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-anton text-white mb-3 uppercase leading-tight">
              {episode.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 font-mono">
              <span className="flex items-center gap-1"><Eye size={14} /> {formatCount(likes * 12)} Views</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> 2 days ago</span>
              <span className="bg-white/10 text-white px-2 py-0.5 rounded text-xs">U/A 16+</span>
            </div>
          </div>

          {/* RIGHT: Action Buttons (The "Working" Part) */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            
            {/* LIKE BUTTON */}
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                hasLiked 
                ? 'bg-white text-black' 
                : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ThumbsUp size={20} fill={hasLiked ? "black" : "none"} />
              <span>{formatCount(likes)}</span>
            </button>

            {/* SHARE BUTTON */}
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-all"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>

            {/* DOWNLOAD BUTTON (Fake but styled) */}
            <button className="flex items-center gap-2 px-6 py-3 bg-latent-yellow hover:bg-yellow-400 rounded-full text-black font-bold transition-all">
              <Download size={20} />
              <span className="hidden md:inline">Download</span>
            </button>
          </div>

        </div>

        {/* DESCRIPTION BOX */}
        <div className="mt-8 p-6 bg-[#111] rounded-xl border border-gray-800">
          <div className="flex gap-2 text-sm font-bold text-white mb-2">
            <span>Description</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            {episode.description}
          </p>
          
          <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-2 text-xs text-red-500 font-mono uppercase">
            <AlertTriangle size={14} />
            Latent Content Warning: High levels of cringe detected.
          </div>
        </div>

      </div>
    </div>
  );
};

export default EpisodePage;