import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodes } from '../../data/showData';

const SupremeLeaderHero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Automatically find the last episode to link to
  const latestEp = episodes[episodes.length - 1];

  const latestLink = latestEp.id > 12 
    ? `/bonus-episodes/${(latestEp.id - 12).toString().padStart(2, '0')}`
    : `/episodes/${latestEp.id.toString().padStart(2, '0')}`;

  const toggleMuteAndReplay = () => {
    if (videoRef.current) {
      // 1. Unmute (or mute)
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // 2. REPLAY LOGIC: Always reset to start and play
      // This handles the "Replay on click" requirement
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden flex items-end">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted} // Starts muted to allow autoplay
          playsInline
          className="w-full h-full object-cover opacity-80"
          // loop prop is REMOVED so it stops at the last frame automatically
        >
          {/* Ensure 'intro.mp4' is inside public/assets/ folder */}
          <source src="/assets/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-latent-yellow/50 bg-latent-yellow/10 text-latent-yellow font-bold px-4 py-1.5 text-xs md:text-sm mb-6 uppercase tracking-widest rounded-sm backdrop-blur-sm">
            <AlertCircle size={14} />
            The Unofficial Archive
          </div>

          {/* Title */}
          <h1 className="text-7xl md:text-9xl font-bebas text-white leading-[0.85] tracking-wide mb-6 drop-shadow-2xl">
            INDIA'S GOT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 animate-flicker">
              LATENT
            </span>
          </h1>

          <p className="max-w-xl text-gray-300 text-lg md:text-xl font-medium mb-10 leading-relaxed drop-shadow-md">
            The only show where talent is optional and judgment is mandatory. Celebrating India's Hidden (and Often Hilarious) Talents! on Your Favourite Pointless Reality Show. Streaming all banned, deleted, and regretted episodes here.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              to={latestLink}
              className="px-8 py-4 bg-white text-black font-bebas text-2xl uppercase tracking-wide hover:bg-latent-yellow transition-all flex items-center justify-center gap-3 rounded-sm hover:scale-105"
            >
              <Play fill="currentColor" size={24} /> 
              Watch Latest Disappointment
            </Link>
          </div>
        </motion.div>

      </div>

      {/* VOLUME / REPLAY TOGGLE */}
      <button
        onClick={toggleMuteAndReplay}
        className="absolute bottom-8 right-8 z-50 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
        title={isMuted ? "Unmute & Replay" : "Mute & Replay"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

    </div>
  );
};

export default SupremeLeaderHero;