/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Star, ShieldCheck, Flame, Users2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onScrollToEnroll: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onScrollToEnroll }) => {
  // Real-time Countdown Timer (2 hours loop or midnight loop)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 45 });
  // Dynamic Seats Remaining (randomly ticks down from 6 to 2 over sessions to simulate real-time sales)
  const [seatsLeft, setSeatsLeft] = useState(4);

  useEffect(() => {
    // 1. Timer loop
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 0, seconds: 0 }; // reset to 2 hours
        }
      });
    }, 1000);

    // 2. Seats ticking down
    const seatTick = setTimeout(() => {
      setSeatsLeft((prev) => (prev > 2 ? prev - 1 : 2));
    }, 45000);

    return () => {
      clearInterval(timer);
      clearTimeout(seatTick);
    };
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-slate-50/50 py-24 sm:py-32 border-y border-slate-100 relative overflow-hidden" id="pricing">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-1/4 w-[35rem] h-[35rem] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3.5 py-1.5 text-xs font-bold text-red-700">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            Limited Promotional Slots
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl tracking-tight mt-4 font-display">
            Incredible Value. Risk-Free Investment.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            Gain skills that replace traditional ₹15 Lakhs MBA degrees for less than the cost of a weekend meal. Price increases when this countdown hits zero.
          </p>
        </div>

        {/* High Conversion Offer Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mx-auto max-w-lg rounded-[2.5rem] border border-slate-900 bg-slate-900 text-white p-8 sm:p-10 shadow-[0_30px_70px_rgba(109,40,217,0.15)] relative overflow-hidden"
        >
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />

          {/* Top Ribbons */}
          <div className="flex justify-between items-center border-b border-slate-800 pb-6 relative z-10">
            <div>
              <span className="bg-purple-500/20 text-purple-300 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-purple-500/20">
                PROMO BATCH OFFER
              </span>
              <h3 className="text-xl font-black mt-3 leading-none font-display">Full Program Access</h3>
            </div>
            
            <div className="text-right">
              <div className="text-slate-500 text-xs font-bold line-through">₹39,000</div>
              <div className="text-3xl sm:text-4xl font-black text-purple-400 leading-none mt-1.5 font-display">₹9,999</div>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">GST Included</span>
            </div>
          </div>

          {/* Real-time seats & timer indicators */}
          <div className="grid grid-cols-2 gap-4 my-6 border-b border-slate-800 pb-6 relative z-10">
            <div>
              <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Seats Remaining</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Users2 className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-black text-purple-300">Only {seatsLeft} Left!</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest text-right">Price Lock Expires In</div>
              <div className="flex justify-end gap-1 font-mono text-base sm:text-lg font-black text-red-400 mt-1.5">
                <span>{formatNum(timeLeft.hours)}</span>:
                <span>{formatNum(timeLeft.minutes)}</span>:
                <span>{formatNum(timeLeft.seconds)}</span>
              </div>
            </div>
          </div>

          {/* Bullet Benefits list */}
          <ul className="space-y-4 text-xs sm:text-sm text-slate-300 mb-8 relative z-10">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-black">✓</span>
              <span>Complete 16-Module Training in simple <b>Tamil</b></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-black">✓</span>
              <span>2 Months of Live Interactive evening classes (6-8 PM)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-black">✓</span>
              <span>Dedicated 1-on-1 Mentorship & Doubts clearing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-black">✓</span>
              <span>Step-by-step Freelancing & Business setup guidance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-black">✓</span>
              <span>Official <b>ZenX Academy</b> Certificate signed by Sarath Babu</span>
            </li>
          </ul>

          {/* Secure Badge & CTA */}
          <div className="space-y-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onScrollToEnroll}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-black py-4.5 text-xs sm:text-sm tracking-widest text-center uppercase transition-all shadow-xl shadow-purple-600/25 cursor-pointer"
            >
              Secure My Seat (₹9,999 Only)
            </motion.button>

            <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              100% Secure Checkout via Razorpay & UPI
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
