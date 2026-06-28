/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { FirebaseProvider, useFirebase } from './components/FirebaseProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { StudentOutcomes } from './components/StudentOutcomes';
import { CourseCurriculum } from './components/CourseCurriculum';
import { BusinessBuilding } from './components/BusinessBuilding';
import { SocialProof } from './components/SocialProof';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { LeadForm } from './components/LeadForm';
import { Popups } from './components/Popups';
import { StickyCTA } from './components/StickyCTA';
import { AdminDashboard } from './components/AdminDashboard';
import { Modal } from './components/Modal';
import { seoPagesData } from './data/seoPages';
import { Lock, Award, ShieldCheck, Heart, ArrowUpRight, Sparkles, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { ThreeDIcon } from './components/ThreeDIcon';
import { Logo } from './components/Logo';

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

function AppContent() {
  const { user, isAdmin } = useFirebase();

  // Active SEO Course / Track Path
  const [activePath, setActivePath] = useState<string>('/');

  // Active Dialog Modals
  const [activeModal, setActiveModal] = useState<'demo' | 'syllabus' | null>(null);

  // References for scrolling
  const enrollSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      // Check hash first (safe for iframe), then pathname
      let path = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
      
      // Clean up leading hashes or slashes
      if (path.startsWith('#')) path = path.substring(1);
      if (!path.startsWith('/')) path = '/' + path;

      if (path && seoPagesData[path]) {
        setActivePath(path);
        document.title = seoPagesData[path].title;
      } else if (path === '/admin') {
        setActivePath('/admin');
        document.title = 'Admin Console | ZenX Academy';
      } else {
        setActivePath('/');
        document.title = seoPagesData['/'].title;
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // run on initial mount

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (path: string) => {
    // Update hash for SPA responsiveness inside iframes
    window.location.hash = '#' + path;
    setActivePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToEnroll = () => {
    if (enrollSectionRef.current) {
      enrollSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Safe Fallback page data
  const pageData = seoPagesData[activePath] || seoPagesData['/'];

  // If Admin panel path is active, render only the Admin dashboard
  if (activePath === '/admin') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans antialiased">
        <div className="bg-slate-900 text-white text-xs px-4 py-1.5 flex justify-between items-center">
          <button 
            onClick={() => handleNavigate('/')} 
            className="hover:text-purple-400 font-bold flex items-center gap-1 transition-colors"
          >
            ← Back to Public Website
          </button>
          <span>ZenX Admin Control Portal</span>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-purple-500/10 selection:text-purple-800">
      
      {/* 1. Header (Sticky Nav & Scarcity Alerts) */}
      <Header 
        onScrollToEnroll={handleScrollToEnroll} 
        onOpenDemo={() => setActiveModal('demo')} 
        activePath={activePath} 
        onNavigate={handleNavigate} 
      />

      {/* 2. Hero Section (Dynamic headlines based on current SEO Route) */}
      <Hero 
        headline={pageData.headline} 
        subheadline={pageData.subheadline} 
        focusArea={pageData.focusArea} 
        onScrollToEnroll={handleScrollToEnroll}
        onOpenDemo={() => setActiveModal('demo')}
        onOpenSyllabus={() => setActiveModal('syllabus')}
      />

      {/* 3. Trust Section (Highlights & Unique Selling Propositions) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <TrustSection />
      </motion.div>

      {/* 4. Student outcomes (Visual placements grid) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <StudentOutcomes />
      </motion.div>

      {/* 5. Course Modules (Interactive Syllabus Explorer) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <CourseCurriculum onOpenSyllabus={() => setActiveModal('syllabus')} />
      </motion.div>

      {/* 6. Business Assets Tracker (checklist / timeline) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <BusinessBuilding />
      </motion.div>

      {/* 7. Social Proof Dashboard (Case studies & Reel frame) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <SocialProof />
      </motion.div>

      {/* 8. Conversion-focused Pricing Section (countdown & seats remaining) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <PricingSection onScrollToEnroll={handleScrollToEnroll} />
      </motion.div>

      {/* 9. FAQs Section (AEO optimised headers) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
      >
        <FAQSection />
      </motion.div>

      {/* 10. Enroll Form & Secure Simulated Gateway (Firestore integration) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUpVariant}
        className="bg-slate-50 py-16 sm:py-24" 
        ref={enrollSectionRef} 
        id="enroll"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Form Left pitch info */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
                Admissions Open
                <motion.span
                  animate={{ y: [0, -2, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 border-b-[2px] border-purple-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)] p-0.5 text-white"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                </motion.span>
              </span>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl tracking-tight leading-none">
                Start Your AI Transformation Today
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Fill out your details to lock your exclusive discount. Next step directs you to choose a secure payment option (UPI, Cards, EMI) to complete your seat enrollment.
              </p>

              <div className="space-y-5 pt-4 border-t border-slate-150">
                <div className="flex gap-4 items-start">
                  <ThreeDIcon icon={Award} color="purple" size="lg" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-none mt-1">Authorized Certificate</h4>
                    <p className="text-xs text-slate-500 mt-1.5">Get certified by ZenX Academy, boosting your portfolio on LinkedIn.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <ThreeDIcon icon={ShieldCheck} color="purple" size="lg" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-none mt-1">100% Satisfaction Checked</h4>
                    <p className="text-xs text-slate-500 mt-1.5">We maintain the highest standard of live practical teaching and mentoring support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquire/Enroll form component */}
            <div className="lg:col-span-6">
              <LeadForm onEnrollSuccess={(name, amount) => {
                console.log(`Student ${name} successfully enrolled with ₹${amount}`);
              }} />
            </div>

          </div>
        </div>
      </motion.div>

      {/* 11. SEO Multi-path Linkages Footer (Ensures crawlers indexing of all paths) */}
      <footer className="bg-slate-950 text-slate-200 border-t border-slate-900 pt-16 pb-28 md:pb-16 relative overflow-hidden" id="footer">
        {/* Ambient background glow effects */}
        <div className="absolute top-0 left-1/4 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Flexible CSS Grid with 4 logical columns that wraps beautifully on tablet (md:grid-cols-2) and stacks on mobile (grid-cols-1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
            
            {/* Column 1 - Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo variant="full" theme="dark" height={44} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                ZenX Academy is Chennai's premium online training institute empowering students, graduates, and business owners with next-generation AI SEO, n8n automations, GEO, and ads in simple Tamil.
              </p>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Premium AI & SEO Learning Hub</span>
              </div>
            </div>

            {/* Column 2 - Specialized Paths */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest border-l-2 border-purple-500 pl-3">Specialized Paths</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li>
                  <button onClick={() => handleNavigate('/online-ai-digital-marketing-course-in-tamil')} className="hover:text-purple-400 transition-colors text-left">
                    Tamil AI Digital Marketing
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('/ai-seo-course')} className="hover:text-purple-400 transition-colors text-left">
                    Advanced AI & Semantic SEO
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('/n8n-course')} className="hover:text-purple-400 transition-colors text-left">
                    n8n AI Agents & Automation
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('/geo-course')} className="hover:text-purple-400 transition-colors text-left">
                    GEO & Search Rankings
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 - Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest border-l-2 border-purple-500 pl-3">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-semibold">
                <li><a href="#trust" className="hover:text-purple-400 transition-colors">Why ZenX</a></li>
                <li><a href="#curriculum" className="hover:text-purple-400 transition-colors">Syllabus Curriculum</a></li>
                <li><a href="#outcomes" className="hover:text-purple-400 transition-colors">Student Placements</a></li>
                <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Tuition Fees</a></li>
                <li>
                  <button onClick={() => handleNavigate('/admin')} className="hover:text-purple-400 transition-colors text-left font-bold flex items-center gap-1">
                    Admin Panel <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 - Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest border-l-2 border-purple-500 pl-3">Inquiries & Support</h4>
              <div className="space-y-3.5 text-xs text-slate-400">
                <p className="leading-relaxed">Admissions Office: Chennai, Tamil Nadu, India</p>
                <p className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Helpline</span>
                  <a href="tel:9962999312" className="text-white hover:text-purple-400 transition-colors font-black text-sm">
                    +91 9962999312
                  </a>
                </p>
                <p className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Admissions Email</span>
                  <code className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-purple-400 font-mono text-[11px] select-all w-fit">
                    support@zenxacademy.com
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Crawler Index Links (All 13 paths with keywords) */}
          <div className="border-t border-slate-900 pt-8 mt-8">
            <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-4">
              Explore Our Specialized SEO Learning Pathways (AEO & GEO optimized)
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.values(seoPagesData).map((page) => (
                <button
                  key={page.path}
                  onClick={() => handleNavigate(page.path)}
                  className={`rounded-lg px-3 py-1.5 border font-semibold transition-all ${
                    activePath === page.path
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-md shadow-purple-600/10'
                      : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  {page.focusArea}
                </button>
              ))}
            </div>
          </div>

          {/* Important Notice Disclaimer */}
          <div className="mt-8 rounded-xl border border-slate-900/60 bg-slate-900/40 p-4 text-left">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest mb-1">Important Notice</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  ZenX Academy and ZenX AI are independent brands with separate ownership, services, and operations. ZenX Academy specializes in AI education and career-focused training programs.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
            <p>© 2026 ZenX Academy. All Rights Reserved. Mentored by Sarath Babu K.</p>
            <p className="flex items-center gap-1.5 font-semibold">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Chennai for Global Impact.
            </p>
          </div>

        </div>
      </footer>

      {/* 12. Dialog Modals */}
      <Modal type={activeModal} onClose={() => setActiveModal(null)} />

      {/* 13. Exit Intent & Scroll Triggered widgets */}
      <Popups onScrollToEnroll={handleScrollToEnroll} onOpenDemo={() => setActiveModal('demo')} />

      {/* 14. Mobile Persistent bottom Sticky bar */}
      <StickyCTA onScrollToEnroll={handleScrollToEnroll} />

    </div>
  );
}
