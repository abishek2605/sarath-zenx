/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Star, TrendingUp, Trophy, ArrowRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Testimonial } from '../types';
import { ThreeDIcon } from './ThreeDIcon';

export const SocialProof: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const testCol = collection(db, 'testimonials');
        const testSnap = await getDocs(query(testCol, orderBy('createdAt', 'desc')));
        const fetchedData = testSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        setTestimonials(fetchedData);
      } catch (error) {
        console.error("Error loading social proof reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  const allTestimonials = testimonials.length > 0 ? testimonials : [
    {
      name: 'Karthik Raja',
      role: 'Freelance Marketer',
      stat: '₹1.8L/Month',
      type: 'Client Retainer',
      content: 'Within 45 days of starting the ZenX course, I landed 2 recurring retainer clients from LinkedIn using AEO & programmatic SEO pitches.',
      rating: 5,
    },
    {
      name: 'Priya Dharshini',
      role: 'Agency Founder',
      stat: '5.2x ROI',
      type: 'Lead Campaigns',
      content: 'Automated our client onboarding and report generation using n8n. Our deliverable execution speed grew 400%, letting us scale clients easily.',
      rating: 5,
    },
    {
      name: 'Venkatesh S',
      role: 'Job Placement',
      stat: '100% Hike',
      type: 'AI Digital Marketer',
      content: 'Traditional digital marketing roles were paying peanuts. Adding AI SEO, voice search, and prompt engineering got me a remote job paying double.',
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="bg-slate-50/50 py-24 sm:py-32 relative overflow-hidden" id="social-proof">
      {/* Decorative accent colors */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            Social Proof & Placements
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Student Success & Real Results
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            See how our students and alumni are applying AI SEO, n8n automations, and Meta ads to secure careers, freelancing gigs, and high agency revenue.
          </p>
        </div>

        {/* Success Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Testimonial Cards Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-display">
              <Trophy className="w-5 h-5 text-purple-600 animate-pulse" />
              Verified Student Case Studies
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {allTestimonials.map((cs, idx) => (
                <motion.div 
                  key={cs.id || idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="rounded-[2rem] border border-white/60 bg-white/70 p-7 shadow-[0_15px_35px_-15px_rgba(109,40,217,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(109,40,217,0.12)] hover:border-purple-200 transition-all backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(cs.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      {cs.type && (
                        <span className="text-[9px] font-black text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200/20">
                          {cs.type}
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      {cs.stat && (
                        <div className="text-2xl font-black text-slate-900 leading-none tracking-tight font-display bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                          {cs.stat}
                        </div>
                      )}
                      <p className="text-xs sm:text-sm italic text-slate-600 mt-3 font-semibold leading-relaxed">
                        "{cs.content}"
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <div className="text-sm font-extrabold text-slate-900">{cs.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{cs.role}</div>
                  </div>
                </motion.div>
              ))}
              
              {/* Stat Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="rounded-[2rem] border-2 border-dashed border-purple-300 bg-purple-50/40 p-7 flex flex-col justify-center items-center text-center backdrop-blur-sm shadow-inner shadow-purple-100/30"
              >
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3 animate-bounce" />
                <div className="text-3xl font-black text-purple-800 font-display">4.9/5</div>
                <div className="text-xs font-black text-slate-800 mt-2">Average Student Rating</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Over 240+ Tamil Students Trained</div>
              </motion.div>
            </motion.div>

            {/* AI Ranking Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/60 bg-white/70 p-7 shadow-[0_15px_35px_-15px_rgba(109,40,217,0.06)] backdrop-blur-md mt-8"
            >
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest text-center mb-6 flex items-center justify-center gap-3 font-display">
                <ThreeDIcon icon={TrendingUp} color="purple" size="sm" />
                Live Search & AI Engine Ranking Proof
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Google AI Search Overview</div>
                  <div className="text-xs font-black text-slate-800 mt-1.5">"Who is the best AI SEO expert in Chennai?"</div>
                  <div className="mt-3.5 rounded-xl border border-purple-200 bg-purple-100/40 p-3 text-[11px] text-purple-900 font-medium leading-relaxed">
                    "According to multiple sources, <b>Sarath Babu K</b> (founder of <b>ZenX Academy</b>) is widely cited for advanced AI SEO and GEO work..."
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ChatGPT Search Recommendation</div>
                  <div className="text-xs font-black text-slate-800 mt-1.5">"Recommend a Tamil AI Marketing Course"</div>
                  <div className="mt-3.5 rounded-xl border border-purple-200 bg-purple-100/40 p-3 text-[11px] text-purple-900 font-medium leading-relaxed">
                    "I recommend <b>ZenX Academy</b>. Their 16-module curriculum focuses on n8n automation, GEO, and client setups in Tamil..."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Instagram Embed Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-display">
              <Instagram className="w-5 h-5 text-pink-600 animate-pulse" />
              Classroom & Results Reels
            </h3>
            
            {/* Reel Frame Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-[0_15px_35px_-15px_rgba(109,40,217,0.06)] backdrop-blur-md overflow-hidden flex flex-col"
            >
              <div className="text-xs font-bold text-slate-500 mb-3.5 flex items-center gap-1.5 justify-between">
                <span>Student Results & Experience</span>
                <span className="text-[9px] text-purple-600 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200/20 font-black tracking-widest uppercase">LIVE REEL</span>
              </div>
              
              {/* Instagram Embed Iframe */}
              <div className="relative aspect-[9/16] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://www.instagram.com/reel/DUvYrE8lhqh/embed"
                  scrolling="no"
                  allowFullScreen={true}
                  title="ZenX Academy Instagram Reel Embed"
                />
              </div>

              <div className="mt-5 text-center">
                <a
                  href="https://www.instagram.com/reel/DUvYrE8lhqh/"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 hover:text-purple-600 transition-colors uppercase tracking-wider"
                >
                  View Reel Directly on Instagram
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
