/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item expanded by default

  const faqs: FAQItem[] = [
    {
      q: 'What is AI Digital Marketing?',
      a: 'AI Digital Marketing is the practice of leveraging artificial intelligence systems (such as Large Language Models, visual generators, and visual flow node automations) to conduct market research, automate content generation, run highly-targeted advertising, build code-free website pipelines, and rank on both traditional and generative search engines.',
    },
    {
      q: 'Is this course taught in Tamil?',
      a: 'Yes, 100%! All course lectures, direct group mentorship sessions, and student queries are handled in simple, clean Tamil. However, technical software interfaces, prompts, and templates are built in English, preparing you for global markets and international clients.',
    },
    {
      q: 'Can I get a job after this course?',
      a: 'Absolutely. Traditional digital marketers do not understand AI prompt structures, AEO, and n8n integrations. Adding these specialized skillsets to your portfolio makes you incredibly valuable to agencies and corporations searching for AI Marketing Specialists and Automation Managers.',
    },
    {
      q: 'Can I start freelancing?',
      a: 'Yes, we have a dedicated module on international freelancing. You will learn how to configure high-converting gigs on Fiverr/Upwork, price retainer packages, write compelling bids, and execute deliverables lightning-fast using AI systems.',
    },
    {
      q: 'Can I build my own business?',
      a: 'Yes. Our Business Building Module walks you through launching a digital agency, acquiring local/international clients, and establishing consistent recurring revenue streams.',
    },
    {
      q: 'What is GEO (Generative Engine Optimization)?',
      a: 'GEO is the successor to traditional SEO. It is the strategy of structuring, optimizing, and citing your brand profile across the web so that AI Search Engines (such as ChatGPT Search, Claude, Gemini, and Perplexity) recommend your products and cite your links in conversational results.',
    },
    {
      q: 'What is AEO (Answer Engine Optimization)?',
      a: 'AEO focuses on optimizing online assets to solve direct customer questions. It is critical for ranking inside voice search assistants (Alexa, Siri, Google Assistant) and Google AI Overviews by utilizing precise schema tags, semantic heading lists, and factual formatting.',
    },
    {
      q: 'What is ChatGPT ranking?',
      a: 'ChatGPT ranking refers to getting your brand listed, cited, or recommended when users query ChatGPT about services in your industry. We teach the entity-association structures needed to build authority for LLM indexing.',
    },
    {
      q: 'What is n8n?',
      a: 'n8n is a powerful, node-based visual workflow automation tool that allows you to connect different software (like CRMs, WhatsApp, Sheets, and GPT models) to execute operations autonomously without typing traditional code.',
    },
    {
      q: 'What is Micro SaaS?',
      a: 'Micro SaaS refers to small, focused, subscription-based software products designed to solve a specific problem. We teach you how to build database-backed AI utility tools or templates using code-free AI web editors and monetize them.',
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32 relative overflow-hidden" id="faqs">
      {/* Dynamic background lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 text-purple-700 rounded-full p-3.5 shadow-md shadow-purple-100/50">
              <HelpCircle className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Frequently Asked Questions (AEO FAQs)
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Have questions about syllabus depth, Tamil language instruction, or career outcomes? Find direct, structured answers below.
          </p>
        </div>

        {/* FAQs Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`rounded-[1.75rem] border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-purple-500 bg-purple-50/10 shadow-[0_15px_30px_-10px_rgba(109,40,217,0.06)]' 
                    : 'border-slate-200/80 hover:border-slate-300 bg-white hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left font-extrabold text-slate-900 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base pr-4 font-sans font-extrabold text-slate-900 leading-snug">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100/80 p-6 bg-white/70 backdrop-blur-sm text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
