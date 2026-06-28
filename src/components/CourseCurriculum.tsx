/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Search, Zap, Code, Layout, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface Module {
  id: number;
  title: string;
  category: 'core_ai' | 'seo_geo' | 'dev_automation' | 'paid_channels';
  items: string[];
}

export const CourseCurriculum: React.FC<{ onOpenSyllabus: () => void }> = ({ onOpenSyllabus }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core_ai' | 'seo_geo' | 'dev_automation' | 'paid_channels'>('all');
  const [expandedModule, setExpandedModule] = useState<number | null>(1); // Default expand Module 1
  const [searchQuery, setSearchQuery] = useState('');

  const modules: Module[] = [
    {
      id: 1,
      category: 'core_ai',
      title: 'Module 1: AI Foundations & Core LLMs',
      items: ['ChatGPT & Advanced Prompt Engineering', 'Claude (Anthropic) for Complex Logic', 'Gemini & DeepMind Research Models', 'Google AI Studio Environments', 'System Instruction Structuring'],
    },
    {
      id: 2,
      category: 'seo_geo',
      title: 'Module 2: Next-Gen AI Search Engine Optimization (SEO)',
      items: ['AI Crawling Behaviors', 'Semantic SEO & Intent Modeling', 'Topical Authority Architectures', 'Programmatic SEO (pSEO) Landing Pages', 'Entity SEO Connection Building'],
    },
    {
      id: 3,
      category: 'seo_geo',
      title: 'Module 3: Answer Engine Optimization (AEO)',
      items: ['AEO Overview: Voice & Assistant Optimization', 'Conversational AI Search Integrations', 'Capturing Featured Snippets', 'Structured Schema & Knowledge Graph Entities'],
    },
    {
      id: 4,
      category: 'seo_geo',
      title: 'Module 4: Generative Engine Optimization (GEO)',
      items: ['GEO Core Mechanics & Strategy', 'ChatGPT, Claude & Gemini Engine Rankings', 'Perplexity Citation Positioning', 'Optimizing Digital Footprints for AI Search Recommendations'],
    },
    {
      id: 5,
      category: 'seo_geo',
      title: 'Module 5: ChatGPT Ranking Mastery',
      items: ['Citations, Co-Occurrences & Mentions', 'Brand Placement inside User Query Listicles', 'Increasing AI Recommendation Visibility', 'Entity Building for LLM Knowledge Stores'],
    },
    {
      id: 6,
      category: 'core_ai',
      title: 'Module 6: Claude Mastery (Anthropic Workspace)',
      items: ['Deep Research Workflows with Claude Artifacts', 'Content Engineering & Long-form Copy', 'Structured Code Prompting', 'Client Task & Workflow Automation'],
    },
    {
      id: 7,
      category: 'core_ai',
      title: 'Module 7: Google AI Studio Developer Sandbox',
      items: ['Direct Google API Sandbox Access', 'Fine-Tuning System Instructions', 'Building Custom Server-Side Agents', 'API Key Handling & Workspace Deployments'],
    },
    {
      id: 8,
      category: 'dev_automation',
      title: 'Module 8: n8n Flow Automation Engine',
      items: ['Visual Drag-and-Drop Workflow Building', 'Autonomous AI Agents Integration', 'Lead Routing & Capture Node Automation', 'CRM Synchronization & Automated Notifications'],
    },
    {
      id: 9,
      category: 'dev_automation',
      title: 'Module 9: Conversational AI Voice Agents',
      items: ['Building Custom Voice Calling Bots', 'Interactive AI Customer Support Nodes', 'Inbound Booking & Screening Bots', 'High-Response Appointment Management Automation'],
    },
    {
      id: 10,
      category: 'dev_automation',
      title: 'Module 10: AI Website Development & Vibe Coding',
      items: ['Rapid Prototyping with Bolt.new', 'Code Sandboxes with Replit & Claude', 'Vibe Coding Fundamentals', 'Deploying Scalable Modern Web Apps'],
    },
    {
      id: 11,
      category: 'dev_automation',
      title: 'Module 11: Micro SaaS & Dynamic AI Products',
      items: ['What is Micro SaaS: Opportunities', 'Building database-backed AI utility tools', 'Custom App UI Designing', 'Setting up subscription models & monetization'],
    },
    {
      id: 12,
      category: 'paid_channels',
      title: 'Module 12: WordPress Development & CRO',
      items: ['Domain Mapping & Hosting Configuration', 'Designing High-Conversion Landing Pages', 'WordPress Site Setup & Security', 'Conversion Rate Optimization (CRO) Secrets'],
    },
    {
      id: 13,
      category: 'paid_channels',
      title: 'Module 13: Google PPC Advertising',
      items: ['Google Search Ads & Bidding Models', 'GDN (Google Display Network) Targeting', 'High-Impact YouTube Video Ads', 'Performance Max (PMax) AI Campaign setup'],
    },
    {
      id: 14,
      category: 'paid_channels',
      title: 'Module 14: Meta Ads (Facebook & Instagram)',
      items: ['High-Conversion Lead Generation Campaigns', 'Custom Audience & Lookalike Retargeting', 'Meta Pixel & Conversion API setups', 'Ad Creative Angle Designs'],
    },
    {
      id: 15,
      category: 'paid_channels',
      title: 'Module 15: Reddit Marketing & organic SEO',
      items: ['Reddit Search Engine Optimization', 'Subreddit Authority Building', 'Ethical Community Marketing', 'Creating Viral Growth Hooks'],
    },
    {
      id: 16,
      category: 'core_ai',
      title: 'Module 16: AI Creative & Graphics Workspace',
      items: ['Midjourney & Flux Image Architectures', 'Synthesia & Runway Gen AI Videos', 'Presentations & Slide Decks Automation', 'Dynamic Music & Commercial Ad Soundtrack Generation'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Modules', icon: BookOpen },
    { id: 'core_ai', name: 'Core AI & Tools', icon: Zap },
    { id: 'seo_geo', name: 'SEO & GEO (Rank in AI)', icon: Search },
    { id: 'dev_automation', name: 'Development & Automation', icon: Code },
    { id: 'paid_channels', name: 'WordPress & Paid Ads', icon: Layout },
  ];

  const filteredModules = modules.filter((m) => {
    const matchesCategory = activeCategory === 'all' || m.category === activeCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <section className="bg-slate-50/50 py-24 sm:py-32 relative overflow-hidden" id="curriculum">
      {/* Dynamic Background Circle */}
      <div className="absolute top-1/2 right-1/4 w-[40rem] h-[40rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
              Syllabus & Core Modules
            </span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
              Our 16-Module Curriculum: From Beginner to Expert
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
              An incredibly comprehensive, practical roadmap designed to build real-world marketing and automation skills. Click any module to view topics.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenSyllabus}
            className="rounded-2xl bg-slate-900 hover:bg-purple-950 text-white font-extrabold text-sm px-6 py-4 transition-all duration-300 shadow-md shrink-0 cursor-pointer"
          >
            Download Full PDF Syllabus
          </motion.button>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-white/60 bg-white/70 backdrop-blur-md rounded-[2rem] p-5 shadow-[0_15px_35px_-15px_rgba(109,40,217,0.04)] mb-10">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setExpandedModule(null);
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20'
                      : 'text-slate-600 bg-white/50 border border-slate-100 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </motion.button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics (e.g. n8n)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/80 pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 bg-white/80 font-semibold"
            />
          </div>
        </div>

        {/* Accordion Modules with entry reveals */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          {filteredModules.length > 0 ? (
            filteredModules.map((m) => {
              const isExpanded = expandedModule === m.id;
              return (
                <motion.div
                  key={m.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  className={`rounded-[1.75rem] border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-purple-500 bg-white shadow-[0_20px_40px_-15px_rgba(109,40,217,0.12)]'
                      : 'border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Accordion Title Header */}
                  <button
                    onClick={() => toggleModule(m.id)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs ${
                          isExpanded ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {m.id}
                      </div>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        {m.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  {/* Accordion Content Panel */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-slate-100 bg-slate-50/50 p-6"
                    >
                      <div className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-4">
                        Key Subtopics Taught:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {m.items.map((sub, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                            <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-[9px]">
                              ✓
                            </span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No modules matched your search filters. Try search keywords like 'Ads' or 'SaaS'.
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
