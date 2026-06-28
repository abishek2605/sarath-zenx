/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { X, MessageCircle, Sparkles, PhoneCall } from 'lucide-react';

interface PopupsProps {
  onScrollToEnroll: () => void;
  onOpenDemo: () => void;
}

export const Popups: React.FC<PopupsProps> = ({ onScrollToEnroll, onOpenDemo }) => {
  // Exit Popup State
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupDismissed, setExitPopupDismissed] = useState(false);

  // Scroll Popup State (WhatsApp bubble)
  const [showScrollPopup, setShowScrollPopup] = useState(false);
  const [scrollPopupDismissed, setScrollPopupDismissed] = useState(false);

  useEffect(() => {
    // 1. Exit Intent Listener
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor leaves top of screen and popup was not dismissed
      if (e.clientY < 20 && !exitPopupDismissed && !showExitPopup) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // 2. Scroll Depth Listener
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        const scrollPercent = (scrollPos / totalHeight) * 100;
        
        // Show after 40% scroll depth
        if (scrollPercent > 40 && !scrollPopupDismissed && !showScrollPopup) {
          setShowScrollPopup(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [exitPopupDismissed, showExitPopup, scrollPopupDismissed, showScrollPopup]);

  const handleDismissExit = () => {
    setShowExitPopup(false);
    setExitPopupDismissed(true);
  };

  const handleDismissScroll = () => {
    setShowScrollPopup(false);
    setScrollPopupDismissed(true);
  };

  const handleExitClick = () => {
    onScrollToEnroll();
    setShowExitPopup(false);
    setExitPopupDismissed(true);
  };

  return (
    <>
      {/* 1. Exit Intent Modal Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-2xl">
            <button
              onClick={handleDismissExit}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-3 text-red-500 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              WAIT! DON'T MISS OUT! ⚠️
            </h3>
            
            <p className="text-sm text-slate-500 mt-2">
              Next Tamil Batch starts soon with only 15 seats. Lock your exclusive discount before it expires today!
            </p>

            <div className="my-6 rounded-2xl bg-purple-50 border border-purple-100 p-5">
              <div className="text-[10px] font-black text-purple-800 uppercase tracking-widest leading-none">Special Exit Discount</div>
              <div className="text-3xl font-black text-purple-700 mt-2">Get ₹29,000 OFF</div>
              <div className="text-xs text-slate-500 mt-1">Enroll today for <b>₹9,999</b> instead of ₹39,000</div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleExitClick}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md shadow-purple-600/10"
              >
                Enroll & Claim Offer Now
              </button>
              
              <button
                onClick={handleDismissExit}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold transition-colors py-1.5"
              >
                No, I want to pay full ₹39,000 later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Scroll-Triggered WhatsApp Sticky Popup (Need Career Guidance?) */}
      {showScrollPopup && (
        <div className="fixed bottom-24 right-4 z-40 max-w-xs rounded-2xl border border-slate-150 bg-white p-4 shadow-xl shadow-slate-200/50 flex gap-3 animate-slide-up">
          <button
            onClick={handleDismissScroll}
            className="absolute -top-2 -right-2 p-1 rounded-full border border-slate-100 bg-white text-slate-400 hover:text-slate-700 shadow"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="rounded-full bg-[#25D366]/10 flex items-center justify-center p-2.5 h-10 w-10 shrink-0">
            <MessageCircle className="w-5 h-5 fill-[#25D366] text-white" />
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">Need Career Guidance?</h4>
            <p className="text-[10px] text-slate-500 mt-1 leading-normal">
              Chat directly with our AI Training experts on WhatsApp for immediate support.
            </p>
            <div className="flex gap-2 mt-3">
              <a
                href="https://wa.me/919962999312?text=Hi%20ZenX%20Academy!%20I%20have%20questions%20about%20the%20AI%20Digital%20Marketing%20Course.%20Please%20guide%20me."
                target="_blank"
                referrerPolicy="no-referrer"
                className="rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-white text-[10px] font-bold py-1.5 px-3 flex items-center gap-1 shadow"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => {
                  onOpenDemo();
                  setShowScrollPopup(false);
                  setScrollPopupDismissed(true);
                }}
                className="rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold py-1.5 px-3"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
