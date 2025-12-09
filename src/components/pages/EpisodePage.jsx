import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { episodes } from '../../data/showData';
import { X, ThumbsUp, Share2, AlertTriangle, Download, ArrowLeft, Check, Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. Import the Grid Component
import ArchiveGrid from '../episodes/ArchiveGrid';

const EpisodePage = ({ type }) => {
  const { epId } = useParams();
  
  let targetId;
  if (type === 'standard') {
    targetId = parseInt(epId);
  } else if (type === 'bonus') {
    targetId = parseInt(epId) + 12;
  }

  const episode = episodes.find(ep => ep.id === targetId);

  // 2. Filter out the current episode so it doesn't show up in the "Up Next" list
  const remainingEpisodes = episodes.filter(ep => ep.id !== targetId);

  const [likes, setLikes] = useState(episode ? episode.likes : 0);
  const [shares, setShares] = useState(episode ? episode.shares : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // NEW: "showOverlay" controls the cover image. 
  // We no longer unmount the iframe. We load it immediately behind the scene.
  const [showOverlay, setShowOverlay] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (episode) {
      setLikes(episode.likes);
      setShares(episode.shares);
      setHasLiked(false);
      setIsCopied(false);
      // Reset overlay when changing episodes
      setShowOverlay(true);
      setIsVideoLoaded(false);
    }
  }, [targetId, episode]);

  if (!episode) return <div className="text-white pt-20 text-center">Episode Not Found</div>;

  const handleDownload = () => {
    try {
      const fileId = episode.videoUrl.match(/file\/d\/(.*?)\/preview/)?.[1];
      if (fileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        window.open(downloadUrl, '_blank');
      } else {
        alert("Download link not available.");
      }
    } catch (error) {
      console.error("Download Error:", error);
    }
  };

  const handleShare = async () => {
    setShares(prev => prev + 1);
    
    const baseUrl = "https://indias-got-latent.netlify.app";
    const sharePath = type === 'standard' 
      ? `/episodes/${epId}` 
      : `/bonus-episodes/${epId}`;
      
    const shareUrl = `${baseUrl}${sharePath}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      alert(`Copy this link: ${shareUrl}`);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const formatCount = (num) => {
    return num > 1000 ? (num / 1000).toFixed(1) + 'K' : num;
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col pt-20 md:pt-0 items-center p-0 md:p-8">
      
      <Link to="/" className="md:hidden absolute top-4 left-4 z-50 text-white flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
        <ArrowLeft size={16} /> Back
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-[1600px] bg-[#121212] rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-800 h-auto md:h-[85vh]"
      >
        
        <Link 
          to="/"
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-[#E50914] rounded-full text-white transition-all group hidden md:block"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </Link>

        {/* --- LEFT: VIDEO PLAYER (65-70%) --- */}
        <div className="w-full md:w-[70%] bg-black relative flex items-center justify-center h-[40vh] md:h-full group">
          
          {/* 1. THE ACTUAL PLAYER (Always Rendered, Hidden Z-Index initially) */}
          <div className="w-full h-full relative z-0">
             <iframe
              src={episode.videoUrl} 
              className="w-full h-full"
              allow="autoplay; fullscreen"
              title={episode.title}
              frameBorder="0"
              onLoad={() => setIsVideoLoaded(true)}
            ></iframe>
          </div>

          {/* 2. THE FACADE OVERLAY (Sit on top until clicked) */}
          <AnimatePresence>
            {showOverlay && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 w-full h-full cursor-pointer bg-black" 
                onClick={() => setShowOverlay(false)}
              >
                {/* Thumbnail Image */}
                <img 
                  src={episode.thumbnail} 
                  alt={episode.title} 
                  className="w-full h-full object-cover opacity-80 transition-all duration-300"
                />
                
                {/* Center Action */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   
                   {/* If video is still buffering in background, show spinner hint, else show Play */}
                   {!isVideoLoaded ? (
                      <div className="bg-black/50 backdrop-blur-md text-white p-4 rounded-full flex flex-col items-center gap-2 border border-white/10">
                         <Loader2 size={32} className="animate-spin text-latent-yellow" />
                         <span className="text-[10px] font-mono tracking-widest">CONNECTING...</span>
                      </div>
                   ) : (
                      <div className="bg-latent-yellow text-black p-6 md:p-8 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.6)] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <Play size={48} fill="currentColor" className="ml-2" />
                      </div>
                   )}

                </div>
                
                <div className="absolute bottom-10 left-0 right-0 text-center">
                  <p className="text-white font-bebas text-xl tracking-wider drop-shadow-md">
                    {isVideoLoaded ? "Click to Start Streaming" : "Preparing Stream..."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* --- RIGHT: METADATA & ACTIONS (30-35%) --- */}
        <div className="w-full md:w-[30%] p-6 md:p-8 bg-[#121212] overflow-y-auto flex flex-col justify-between border-l border-gray-800 h-auto md:h-full">
          
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-mono">
              <span>ARCHIVE</span>
              <span>/</span>
              <span>SEASON 1</span>
              <span>/</span>
              <span className="text-latent-yellow animate-pulse">PLAYING</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bebas text-white mb-4 uppercase tracking-wide leading-none">
              {episode.title}
            </h2>
            
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 font-mono">
               <span className="bg-gray-800 px-2 py-1 rounded text-white">HD</span>
               <span className="flex items-center gap-1 text-green-500">98% Match</span>
               <span>18+</span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-latent-yellow pl-4 italic mb-8">
              {episode.description}
            </p>
          </div>

          <div className="space-y-4 pb-8 md:pb-0">
            
            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-latent-yellow transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              <Download size={18} /> Download Episode
            </button>
            
            <div className="flex gap-4">
               <button 
                 onClick={handleLike}
                 className={`flex-1 py-3 border border-gray-700 font-medium transition-colors flex items-center justify-center gap-2 rounded-sm ${
                   hasLiked ? 'bg-latent-yellow text-black border-latent-yellow' : 'bg-transparent text-white hover:bg-gray-800'
                 }`}
               >
                  <ThumbsUp size={18} fill={hasLiked ? "black" : "none"} /> 
                  {formatCount(likes)}
               </button>

               <button 
                 onClick={handleShare}
                 className="flex-1 py-3 bg-transparent border border-gray-700 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 rounded-sm relative overflow-hidden"
               >
                  {isCopied ? (
                    <span className="flex items-center gap-2 text-green-400 animate-in fade-in">
                      <Check size={18} /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Share2 size={18} /> Share
                    </span>
                  )}
               </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-red-500 mt-4 justify-center opacity-60">
              <AlertTriangle size={12} />
              <span>DMCA Protected Content</span>
            </div>
          </div>

        </div>

      </motion.div>

      {/* 3. NEW SECTION: THE REST OF THE ARCHIVE */}
      <div className="w-full max-w-[1600px] mt-20 border-t border-gray-900 pt-10">
        <h3 className="text-3xl font-bebas text-white mb-8 pl-6 md:pl-0 opacity-80">
          More from the Archives
        </h3>
        {/* We reuse the grid but pass the filtered list */}
        <ArchiveGrid episodes={remainingEpisodes} />
      </div>

    </div>
  );
};

export default EpisodePage;