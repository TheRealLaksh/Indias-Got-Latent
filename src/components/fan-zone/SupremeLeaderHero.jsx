import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodes } from '../../data/showData';

const SupremeLeaderHero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const latestEp = episodes[episodes.length - 1];
  const latestLink = latestEp.id > 12 
    ? `/bonus-episodes/${(latestEp.id - 12).toString().padStart(2, '0')}`
    : `/episodes/${latestEp.id.toString().padStart(2, '0')}`;

  const toggleMuteAndReplay = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-[65vh] md:h-[85vh] overflow-hidden flex items-end border-b border-white/5">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60 md:opacity-80"
        >
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>
        
        {/* Stronger Gradient for Mobile Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent md:hidden"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 md:pb-32 flex flex-col items-center md:items-start text-center md:text-left">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-latent-yellow/30 bg-latent-yellow/10 text-latent-yellow font-bold px-3 py-1 text-[10px] md:text-sm mb-4 uppercase tracking-widest rounded-full backdrop-blur-md">
            <AlertCircle size={12} />
            Unofficial Archive
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-9xl font-bebas text-white leading-[0.85] tracking-wide mb-4 drop-shadow-2xl">
            INDIA'S GOT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              LATENT
            </span>
          </h1>

          <p className="max-w-xl text-gray-300 text-sm md:text-xl font-medium mb-8 leading-relaxed drop-shadow-md hidden md:block">
            The only show where talent is optional and judgment is mandatory. Streaming all banned, deleted, and regretted episodes here.
          </p>

          <div className="flex flex-col w-full md:w-auto gap-4">
            <Link 
              to={latestLink}
              className="w-full md:w-auto px-8 py-3 md:py-4 bg-white text-black font-bebas text-xl md:text-2xl uppercase tracking-wide hover:bg-latent-yellow transition-all flex items-center justify-center gap-2 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Play fill="currentColor" size={20} /> 
              Watch Latest
            </Link>
          </div>
        </motion.div>

      </div>

      {/* VOLUME TOGGLE (Hidden on tiny screens to save space) */}
      <button
        onClick={toggleMuteAndReplay}
        className="hidden md:block absolute bottom-8 right-8 z-50 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

    </div>
  );
};

export default SupremeLeaderHero;