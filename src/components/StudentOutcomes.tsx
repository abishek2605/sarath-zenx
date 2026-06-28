/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, Landmark, Globe, Hammer, Compass, UserCog } from 'lucide-react';
import { motion } from 'motion/react';

export const StudentOutcomes: React.FC = () => {
  const outcomes = [
    {
      title: 'Get a High-Paying Job',
      desc: 'Qualify for modern AI Digital Marketing Specialist, AI SEO Manager, and automation consultant roles globally.',
      icon: Briefcase,
    },
    {
      title: 'Become an Elite Freelancer',
      desc: 'Operate as an independent freelancer, sourcing contracts on Upwork/Fiverr with optimized pricing grids.',
      icon: Globe,
    },
    {
      title: 'Start Your AI Marketing Agency',
      desc: 'Build an agency business. Offer programmatic SEO, n8n automations, GEO rankings, and high-ROI ads.',
      icon: Landmark,
    },
    {
      title: 'Build and Launch SaaS Products',
      desc: 'Develop simple custom database tools or directory AI platforms, and charge monthly recurring subscription fees.',
      icon: Hammer,
    },
    {
      title: 'Scale Existing Businesses',
      desc: 'Apply your knowledge to multiply leads, sales, and organic visibility for any startup or enterprise.',
      icon: Compass,
    },
    {
      title: 'Become a Certified AI Marketer',
      desc: 'Gain prestigious industry-relevant credentials verifying your capability to operate next-gen AI tools.',
      icon: UserCog,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32 relative overflow-hidden" id="outcomes">
      {/* Dynamic Background Circle */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            Measurable Success
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Concrete Student Outcomes
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            No empty promises. Upon completing this course, you will be equipped with practical skills to launch any of these professional paths.
          </p>
        </div>

        {/* Outcomes Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {outcomes.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-[2rem] border border-slate-100 bg-slate-50/40 p-7 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(109,40,217,0.08)] hover:border-purple-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-slate-900 text-white p-3 shadow-md shadow-slate-900/10">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
