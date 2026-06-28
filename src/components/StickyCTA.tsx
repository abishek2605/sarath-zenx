/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageCircle, CreditCard } from 'lucide-react';

interface StickyCTAProps {
  onScrollToEnroll: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onScrollToEnroll }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-150 py-3 px-4 shadow-xl backdrop-blur-md md:hidden flex items-center gap-2">
      {/* Phone Call */}
      <a
        href="tel:9962999312"
        className="flex-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-3 flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
      >
        <Phone className="w-4 h-4 text-slate-700" />
        Call
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919962999312?text=Hi%20ZenX%20Academy!%20I'm%20interested%20in%20the%20AI%20Digital%20Marketing%20Course%20in%20Tamil.%20Please%20share%20details."
        target="_blank"
        referrerPolicy="no-referrer"
        className="flex-1 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-xs py-3 flex items-center justify-center gap-1.5 shadow"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        WhatsApp
      </a>

      {/* Enroll Now */}
      <button
        onClick={onScrollToEnroll}
        className="flex-[1.5] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs py-3 flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20"
      >
        <CreditCard className="w-4 h-4 text-purple-100" />
        Enroll Now
      </button>
    </div>
  );
};
