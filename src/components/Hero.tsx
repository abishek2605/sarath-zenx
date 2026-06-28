/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, Award, Users, BookOpen, Clock, Linkedin, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  headline: string;
  subheadline: string;
  focusArea: string;
  onScrollToEnroll: () => void;
  onOpenDemo: () => void;
  onOpenSyllabus: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  focusArea,
  onScrollToEnroll,
  onOpenDemo,
  onOpenSyllabus,
}) => {
  // Master parent stagger orchestrator
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.12,
      }
    }
  };

  // 1. Tag animation: subtle drop with bounce
  const tagVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
      }
    }
  };

  // 2. Headline: robust and responsive spring reveal
  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 16,
        mass: 1.1,
      }
    }
  };

  // 3. Subheadline: smooth sliding fade-in
  const subheadlineVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 18,
      }
    }
  };

  // 4. Interactive Offer Box: scale up and fade
  const offerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 18,
      }
    }
  };

  // 5. Button Container & Buttons stagger
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  // 6. Indicators Container & Items stagger
  const indicatorsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      }
    }
  };

  const indicatorItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      }
    }
  };

  // 7. Spotlight Card: elegant late entry
  const spotlightVariants = {
    hidden: { opacity: 0, y: 45, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 16,
        mass: 1.2,
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-purple-50/20 py-24 lg:py-36" id="hero">
      {/* Dynamic drifting background visual accents */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(109,40,217,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,40,217,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80 pointer-events-none" />
      
      {/* Drifting background circles to create depth */}
      <motion.div 
        animate={{ 
          x: [0, 20, -15, 0],
          y: [0, -25, 25, 0]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[50rem] w-[50rem] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          x: [0, -25, 20, 0],
          y: [0, 20, -20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto gap-10"
        >
          {/* 1. Dynamic Segment Tag */}
          <motion.div 
            variants={tagVariants}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 border border-purple-200/60 px-5 py-2.5 text-xs font-black text-purple-800 backdrop-blur-sm shadow-sm select-none"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-purple-600 animate-pulse" />
            Focusing on: <span className="text-purple-950 font-black">{focusArea}</span>
          </motion.div>

          {/* 2. Dynamic Headline with Gradient Fades */}
          <motion.h1 
            variants={headlineVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15] font-display max-w-4xl"
          >
            {headline.split(' ').map((word, i) => {
              const isHighlight = 
                word.toLowerCase().includes('ai') || 
                word.toLowerCase().includes('tamil') || 
                word.toLowerCase().includes('marketing') || 
                word.toLowerCase().includes('seo') || 
                word.toLowerCase().includes('aeo') ||
                word.toLowerCase().includes('automation');
              return (
                <span key={i} className={isHighlight ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent mr-2.5 inline-block font-black" : "mr-2.5 inline-block"}>
                  {word}
                </span>
              );
            })}
          </motion.h1>

          {/* 3. Subheadline with Premium typography */}
          <motion.p 
            variants={subheadlineVariants}
            className="text-base text-slate-600 sm:text-lg md:text-xl font-semibold leading-relaxed max-w-3xl mx-auto px-4"
          >
            {subheadline}
          </motion.p>

          {/* 4. Interactive Offer Banner with Glow & Glassmorphism */}
          <motion.div 
            variants={offerVariants}
            whileHover={{ scale: 1.015, borderColor: "rgba(147, 51, 234, 0.4)", boxShadow: "0 30px 60px -10px rgba(109,40,217,0.15)" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="w-full max-w-2xl bg-slate-950 border border-slate-800/80 rounded-[2.5rem] p-7 sm:p-8 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.4)] relative overflow-hidden text-left mt-2 transition-colors duration-300"
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center sm:divide-x sm:divide-slate-800 relative z-10 text-center">
              <div className="px-2">
                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Standard Price</div>
                <div className="text-xl font-bold text-slate-400 line-through mt-1.5">₹39,000</div>
              </div>
              
              <div className="px-2">
                <div className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest">Special Tamil Offer</div>
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text leading-none mt-2 font-display">₹9,999</div>
                <span className="inline-block text-[9px] text-white font-extrabold bg-purple-600 px-3 py-1 rounded-full mt-2.5 tracking-widest uppercase">74% ONE-TIME DISCOUNT</span>
              </div>
              
              <div className="px-2">
                <div className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest">Strict Batch Limit</div>
                <div className="text-lg font-black text-white mt-2">15 Seats Max</div>
                <span className="inline-block text-[9px] text-white font-extrabold bg-indigo-600 px-3 py-1 rounded-full mt-2.5 tracking-widest uppercase">CLASSES FILLING FAST</span>
              </div>
            </div>
          </motion.div>

          {/* 5. Centered CTA Button Group */}
          <motion.div 
            variants={buttonContainerVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4.5 justify-center items-center w-full mt-4 max-w-4xl"
          >
            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onScrollToEnroll}
              className="w-full sm:w-auto min-w-[200px] rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:opacity-95 text-white px-8 py-5 font-black text-base shadow-[0_12px_40px_rgba(124,58,237,0.35)] cursor-pointer transition-all border border-purple-500/20"
            >
              Enroll Now (₹9,999)
            </motion.button>
            
            <motion.a
              variants={buttonVariants}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/919962999312?text=Hi%20ZenX%20Academy!%20I'm%20interested%20in%20the%20AI%20Digital%20Marketing%20Course%20in%20Tamil.%20Please%20share%20details."
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba56] text-white px-8 py-5 font-black text-base shadow-[0_12px_40px_rgba(37,211,102,0.25)] cursor-pointer transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              WhatsApp Us
            </motion.a>

            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSyllabus}
              className="w-full sm:w-auto min-w-[200px] rounded-2xl border-2 border-slate-900 bg-white hover:bg-slate-50 px-8 py-5 font-black text-base text-slate-900 shadow-md cursor-pointer transition-all"
            >
              Download Syllabus
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenDemo}
              className="w-full sm:w-auto min-w-[200px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white px-8 py-5 font-black text-base shadow-lg cursor-pointer transition-all"
            >
              Book Free Demo
            </motion.button>
          </motion.div>

          {/* 6. Centered Trust Indicators */}
          <motion.div 
            variants={indicatorsContainerVariants}
            className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-4 text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-widest"
          >
            <motion.div 
              variants={indicatorItemVariants}
              className="flex items-center gap-2.5 bg-slate-100/90 border border-slate-200/40 px-5 py-2.5 rounded-full shadow-sm"
            >
              <Clock className="w-4 h-4 text-purple-600 animate-pulse" />
              2 Months Program
            </motion.div>
            <motion.div 
              variants={indicatorItemVariants}
              className="flex items-center gap-2.5 bg-slate-100/90 border border-slate-200/40 px-5 py-2.5 rounded-full shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              Mon to Fri Interactive
            </motion.div>
            <motion.div 
              variants={indicatorItemVariants}
              className="flex items-center gap-2.5 bg-slate-100/90 border border-slate-200/40 px-5 py-2.5 rounded-full shadow-sm"
            >
              <Users className="w-4 h-4 text-purple-600" />
              Live Online Classes (6-8 PM)
            </motion.div>
          </motion.div>

          {/* 7. Centered Instructor Spotlight Showcase */}
          <motion.div 
            variants={spotlightVariants}
            whileHover={{ y: -5, borderColor: "rgba(147, 51, 234, 0.35)", boxShadow: "0 35px 80px -20px rgba(109,40,217,0.15)" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-3xl mt-12 border border-slate-150/80 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-7 sm:p-9 shadow-[0_30px_70px_-15px_rgba(109,40,217,0.08)] relative overflow-hidden transition-all duration-300"
          >
            {/* Tag/Label Ribbon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[9px] uppercase tracking-widest px-5 py-2 rounded-b-2xl border-x border-b border-purple-500/20 shadow-md">
              Learn From Chennai's Leading AI SEO Expert
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 text-left mt-4 relative z-10">
              {/* Profile Avatar Column */}
              <div className="relative flex-shrink-0">
                {/* Breathing glow rings */}
                <motion.div 
                  animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2.5 rounded-full border border-purple-500/30 bg-purple-500/5 blur-sm pointer-events-none"
                />
                
                {/* Simulated Portrait with stylish gradient letter initials */}
                <div className="relative h-28 w-28 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 border-4 border-white shadow-[0_10px_25px_rgba(147,51,234,0.3)] flex flex-col items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">SB</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-purple-200 mt-1 leading-none">MENTOR</span>
                </div>

                {/* Star Floating Overlay badge */}
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-1 rounded-full border-2 border-white shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>

              {/* Mentor Details Column */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
                  <h3 className="text-xl font-black text-slate-900 font-display">Sarath Babu K</h3>
                  <span className="inline-flex items-center gap-1 self-center sm:self-start rounded-full bg-purple-100 px-3 py-0.5 text-[9px] font-black text-purple-800 uppercase tracking-widest border border-purple-200/50">
                    AI SEO SPECIALIST
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1.5">
                  Founder of ZenX Academy • AI Digital Marketer & AEO/GEO Optimization Specialist
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold mt-3 italic">
                  "I combine advanced AI SEO, modern n8n automations, and Meta Ads to build high-converting digital marketing systems that deliver compound growth."
                </p>

                {/* LinkedIn and Meta Partner Info Group */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-5">
                  <motion.a 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.linkedin.com/in/sarathbabuk/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 justify-center rounded-xl bg-slate-900 hover:bg-purple-950 text-white text-xs font-black px-4.5 py-2.5 transition-all w-full sm:w-auto shadow-md cursor-pointer border border-slate-800"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                    LinkedIn (5,000+ Followers)
                  </motion.a>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4 text-purple-600" />
                    Google & Meta Certified Partner
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
