import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const SupremeLeaderHero = () => {
  return (
    <div className="relative w-full h-[85vh] overflow-hidden flex items-end">
      
      {/* BACKGROUND IMAGE - Use a dark studio background or Samay image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/samay-hero.png" // MAKE SURE TO ADD THIS IMAGE
          alt="Supreme Leader" 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-block bg-latent-yellow text-black font-bold px-3 py-1 text-sm mb-4 uppercase tracking-widest">
            The Unofficial Archive
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-9xl font-anton text-white leading-none tracking-tighter mb-4">
            INDIA'S GOT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              LATENT
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-gray-300 text-lg md:text-xl font-light mb-8">
            The only show where talent is optional and judgment is mandatory. 
            Stream all banned, deleted, and regretted episodes here.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider hover:bg-latent-yellow transition-colors flex items-center gap-2">
              <Play fill="currentColor" size={20} /> Watch Latest Disappointment
            </button>
            <button className="px-8 py-4 bg-transparent border border-gray-600 text-white font-bold text-lg uppercase tracking-wider hover:border-white transition-colors">
              Submit Your Latency
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SupremeLeaderHero;