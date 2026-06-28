/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Briefcase, Building2, UserCheck, Share2, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export const WhoShouldJoin: React.FC = () => {
  const audiences = [
    {
      role: 'Students',
      goal: 'Start your career.',
      detail: 'Equip yourself with the absolute highest-paying skills in 2026 before you even graduate.',
      icon: GraduationCap,
      accent: 'border-purple-200 bg-purple-50/50 text-purple-700'
    },
    {
      role: 'Job Seekers',
      goal: 'Get AI digital marketing jobs.',
      detail: 'Differentiate your resume by mastering AEO, GEO, and n8n workflow automation integrations.',
      icon: Briefcase,
      accent: 'border-indigo-200 bg-indigo-50/50 text-indigo-700'
    },
    {
      role: 'Business Owners',
      goal: 'Grow your business with AI.',
      detail: 'Stop wasting massive budgets on agencies. Build your own customer acquisition systems.',
      icon: Building2,
      accent: 'border-purple-200 bg-purple-50/50 text-purple-700'
    },
    {
      role: 'Freelancers',
      goal: 'Start earning online.',
      detail: 'Offer next-generation AI and chatbot consulting services to global clients on Fiverr/Upwork.',
      icon: UserCheck,
      accent: 'border-pink-200 bg-pink-50/50 text-pink-700'
    },
    {
      role: 'Agency Owners',
      goal: 'Scale your agency.',
      detail: 'Deliver higher ROI results to your clients in half the time by automating internal operations.',
      icon: Share2,
      accent: 'border-violet-200 bg-violet-50/50 text-violet-700'
    },
    {
      role: 'Working Professionals',
      goal: 'Upgrade your skills.',
      detail: 'Future-proof your career. Transition from traditional marketing into AI marketing systems.',
      icon: Rocket,
      accent: 'border-indigo-200 bg-indigo-50/50 text-indigo-700'
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section className="bg-slate-50/40 py-24 sm:py-32 relative overflow-hidden" id="who-should-join">
      {/* Accent Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            Target Audience
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Who is this Course Designed For?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Whether you want to get employed, start freelancing, or launch a multi-member marketing agency, our syllabus is tailored to help you win.
          </p>
        </div>

        {/* Audience Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {audiences.map((aud, index) => {
            const Icon = aud.icon;
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-[2rem] border border-white/60 bg-white/70 p-7 shadow-[0_15px_35px_-15px_rgba(109,40,217,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(109,40,217,0.12)] backdrop-blur-md transition-all flex flex-col gap-5"
              >
                <div className={`rounded-2xl p-3 w-12 h-12 flex items-center justify-center border ${aud.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{aud.role}</h3>
                  <div className="text-sm font-bold text-purple-600 mt-1">{aud.goal}</div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-3.5 leading-relaxed font-medium">
                    {aud.detail}
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
