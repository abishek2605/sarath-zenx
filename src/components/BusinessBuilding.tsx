/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Server, Monitor, Globe, Search, Users, LayoutDashboard, Sparkles, CodeXml } from 'lucide-react';
import { motion } from 'motion/react';

export const BusinessBuilding: React.FC = () => {
  const steps = [
    {
      title: 'Domain & Hosting Setup',
      desc: 'Secure your brand name online, map servers, and configure lightning-fast global routing.',
      icon: Server,
      badge: 'Step 1'
    },
    {
      title: 'Your Professional Website',
      desc: 'Build your digital storefront or high-converting agency landing pages with absolute visual clarity.',
      icon: Monitor,
      badge: 'Step 2'
    },
    {
      title: 'Social Media Authority',
      desc: 'Configure brand assets across LinkedIn, Instagram, and YouTube to drive maximum inbound trust.',
      icon: Users,
      badge: 'Step 3'
    },
    {
      title: 'SEO, AEO & GEO Mastery',
      desc: 'Rank on traditional Google Search, and structure your entity metadata for ChatGPT, Gemini, and Claude.',
      icon: Search,
      badge: 'Step 4'
    },
    {
      title: 'Brand Visibility & Mentions',
      desc: 'Secure listicle features, guest brand co-occurrences, and build high authority citations.',
      icon: Globe,
      badge: 'Step 5'
    },
    {
      title: 'Google & Meta Advertising',
      desc: 'Inject cold traffic into your funnel using high-ROI paid ads that generate immediate customer leads.',
      icon: LayoutDashboard,
      badge: 'Step 6'
    },
    {
      title: 'Your Own Micro SaaS Tools',
      desc: 'Build, package, and list custom AI utility apps or databases. Monetize via recurrent subscription models.',
      icon: CodeXml,
      badge: 'Step 7'
    },
    {
      title: 'Consistent Retainer Growth',
      desc: 'Establish recurring monthly payments with agency clients, automate report generations, and scale operations.',
      icon: Sparkles,
      badge: 'Step 8'
    }
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="bg-slate-950 text-white py-24 sm:py-32 relative overflow-hidden" id="business-building">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-purple-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-indigo-600/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center rounded-full bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-400 ring-1 ring-inset ring-purple-500/20">
            Build While You Learn
          </span>
          <h2 className="text-3xl font-black sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            The Business-Building Blueprint
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed font-medium">
            During this 2-month program, you are not just studying theories. You will build and launch these 8 critical assets step-by-step.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative rounded-[2rem] border border-white/5 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-purple-500/40 hover:bg-slate-900/80 hover:shadow-[0_20px_50px_rgba(147,51,234,0.1)] transition-all backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/20">
                      {step.badge}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white mt-6">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-3.5 leading-relaxed font-semibold">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
