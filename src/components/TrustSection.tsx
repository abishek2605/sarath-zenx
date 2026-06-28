/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Users, Laptop, FileText, Globe, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDIcon } from './ThreeDIcon';

export const TrustSection: React.FC = () => {
  const highlights = [
    {
      title: 'Learn in Tamil',
      desc: 'All concepts are explained in simple Tamil, ensuring absolute conceptual clarity.',
      icon: Globe,
      color: 'indigo' as const,
    },
    {
      title: 'Live Interactive Classes',
      desc: 'No recorded-only traps. Participate in live discussions, ask doubts, and solve queries.',
      icon: Laptop,
      color: 'purple' as const,
    },
    {
      title: 'Only 15 Students Per Batch',
      desc: 'We restrict seats to 15 to provide dedicated personal mentoring and high interaction.',
      icon: Users,
      color: 'purple' as const,
    },
    {
      title: 'Build Real Projects',
      desc: 'Get hands-on experience by launching a real website, active campaigns, and bots.',
      icon: Sparkles,
      color: 'amber' as const,
    },
    {
      title: 'Freelancing Guidance',
      desc: 'Complete support to set up Fiverr/Upwork profiles, draft proposals, and attract clients.',
      icon: FileText,
      color: 'indigo' as const,
    },
    {
      title: 'Business Setup Support',
      desc: 'Learn how to form your agency, price services, and run high-ROI marketing funnels.',
      icon: Lightbulb,
      color: 'purple' as const,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32 border-y border-slate-100 relative overflow-hidden" id="trust">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            Why ZenX Academy
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Why Hundreds Choose ZenX Academy
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Our Tamil digital marketing program is built from the ground up to focus on high-income AI skills, active creation, and personal guidance.
          </p>
        </div>

        {/* Dynamic Grid of Cards with Scroll Triggered Reveals */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {highlights.map((item, index) => {
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative rounded-[2rem] border border-slate-150/80 bg-slate-50/40 p-7 hover:bg-white hover:border-purple-200/80 hover:shadow-[0_20px_50px_rgba(109,40,217,0.06)] transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <ThreeDIcon icon={item.icon} color={item.color} size="lg" className="group-hover:rotate-[5deg]" />
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
