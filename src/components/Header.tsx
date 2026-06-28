/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageCircle, Shield, Award, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface HeaderProps {
  onScrollToEnroll: () => void;
  onOpenDemo: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onScrollToEnroll,
  onOpenDemo,
  activePath,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Who Should Join', href: '#who-should-join' },
    { name: 'Student Outcomes', href: '#outcomes' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      {/* Top Banner (Scarcity & Trust) */}
      <div className="bg-slate-900 text-white px-4 py-2 text-center text-xs font-medium sm:text-sm">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-semibold text-red-500 animate-pulse">
            LIVE BATCH
          </span>
          <span>Next Tamil Batch limited to only <b>15 Students</b>!</span>
          <span className="hidden md:inline">|</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
            <motion.span
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500 border-b-2 border-orange-700 shadow-[0_2px_4px_rgba(0,0,0,0.15)] p-0.5 text-white"
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            74% OFF Today Only
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div 
          onClick={() => onNavigate('/')} 
          className="flex cursor-pointer items-center gap-3 active:scale-95 transition-transform"
          id="header-logo-container"
        >
          <Logo variant="full" theme="light" height={44} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-purple-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* SEO Pages Link Tooltip Dropdown */}
          <div className="relative group">
            <button className="text-sm font-semibold text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1">
              Course Paths
              <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-2 hidden w-72 rounded-xl border border-slate-100 bg-white p-2 shadow-xl group-hover:block animate-fade-in z-50">
              <div className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase px-3 py-1.5 border-b border-slate-50 mb-1">
                Target SEO Core Skills
              </div>
              <div className="max-h-80 overflow-y-auto">
                <button onClick={() => onNavigate('/online-ai-digital-marketing-course-in-tamil')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  Tamil AI Digital Marketing
                </button>
                <button onClick={() => onNavigate('/ai-seo-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  AI & Semantic SEO Program
                </button>
                <button onClick={() => onNavigate('/geo-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  GEO (ChatGPT, Claude Ranking)
                </button>
                <button onClick={() => onNavigate('/aeo-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  AEO (Answer Engine Opt)
                </button>
                <button onClick={() => onNavigate('/n8n-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  n8n AI Agents & Automation
                </button>
                <button onClick={() => onNavigate('/micro-saas-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  Micro SaaS & AI App Building
                </button>
                <button onClick={() => onNavigate('/chatgpt-marketing-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  ChatGPT & Prompt Engineering
                </button>
                <button onClick={() => onNavigate('/google-ads-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  Google Paid Ads (PMax)
                </button>
                <button onClick={() => onNavigate('/meta-ads-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  Meta Ads Lead Generation
                </button>
                <button onClick={() => onNavigate('/freelancing-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  AI International Freelancing
                </button>
                <button onClick={() => onNavigate('/business-course')} className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-all">
                  AI Marketing Agency Setup
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Action Button Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:9962999312"
            className="flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-purple-600 transition-colors"
            id="phone-link-header"
          >
            <div className="bg-slate-100 p-2 rounded-full">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <span className="hidden lg:inline">Call Expert:</span> 9962999312
          </a>
          <button
            onClick={onOpenDemo}
            className="rounded-lg border-2 border-slate-950 bg-transparent px-4 py-2 text-sm font-bold text-slate-950 hover:bg-slate-50 transition-colors"
          >
            Book Free Demo
          </button>
          <button
            onClick={onScrollToEnroll}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-purple-600/10 active:scale-95 transition-transform"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar drawer from the right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-md bg-white shadow-2xl z-50 lg:hidden flex flex-col border-l border-slate-100"
            >
              {/* Drawer Header with Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }} className="flex cursor-pointer items-center gap-2.5">
                  <Logo variant="full" theme="light" height={36} />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Main section navigation */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-3">
                    Website Navigation
                  </div>
                  {navLinks.map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, ease: "easeOut" }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 py-2.5 px-3 rounded-xl transition-all"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Core tracks navigation */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-3">
                    Core Learning Tracks
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {[
                      { name: 'Tamil AI Marketing', path: '/online-ai-digital-marketing-course-in-tamil' },
                      { name: 'Advanced AI SEO', path: '/ai-seo-course' },
                      { name: 'GEO & Search Rankings', path: '/geo-course' },
                      { name: 'n8n Automation & Agents', path: '/n8n-course' },
                    ].map((track, idx) => (
                      <motion.button
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (idx + navLinks.length) * 0.04, ease: "easeOut" }}
                        key={track.path}
                        onClick={() => {
                          onNavigate(track.path);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors"
                      >
                        {track.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Contact and Support Section */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3">
                    Admissions Helpline
                  </div>
                  <a
                    href="tel:9962999312"
                    className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 px-4 py-3 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-purple-600" />
                    +91 9962999312
                  </a>
                </div>

              </div>

              {/* Persistent Call-to-Actions (Bottom Sticky) */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl border border-slate-900 bg-white py-3 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Book Free Demo
                </button>
                <button
                  onClick={() => {
                    onScrollToEnroll();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white py-3 text-xs font-black shadow-md shadow-purple-600/10 active:scale-95 transition-transform uppercase tracking-wider"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
