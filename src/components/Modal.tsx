/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useFirebase } from './FirebaseProvider';
import { X, CheckCircle, FileText, ArrowDownToLine, Users, Video } from 'lucide-react';

interface ModalProps {
  type: 'demo' | 'syllabus' | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
  const { submitLead } = useFirebase();

  // Modal form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Demo specifics
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('6:00 PM - 8:00 PM');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setLoading(true);
    try {
      const isSyllabus = type === 'syllabus';
      
      const leadPayload = {
        name,
        phone,
        whatsapp: phone,
        email,
        city: 'Inquiry Modal',
        occupation: 'Prospect',
        goal: isSyllabus ? 'Downloaded Syllabus' : `Booked Free Demo (${preferredDate} at ${preferredTime})`,
        utmSource: 'Modal-Popup',
        utmMedium: 'CRO-Conversion',
        device: navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop',
        sourceUrl: window.location.href,
        paymentStatus: 'pending',
      };

      await submitLead(leadPayload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {type === 'demo' ? (
              <div className="text-center mb-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-2">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-none">Book Your Free Demo Slot</h3>
                <p className="text-xs text-slate-500 mt-2">Attend a live 60-minute virtual onboarding with Sarath Babu.</p>
              </div>
            ) : (
              <div className="text-center mb-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-2">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-none">Unlock PDF Course Syllabus</h3>
                <p className="text-xs text-slate-500 mt-2">Provide your info below to get instant download access to the complete 16-module blueprint.</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarath Babu"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9962999312"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@gmail.com"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {type === 'demo' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Time Slot *</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-white"
                  >
                    <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
                    <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 text-white font-bold py-3 hover:bg-slate-900 transition-colors shadow-lg"
            >
              {loading ? 'Submitting Inquiry...' : type === 'demo' ? 'Confirm Free Demo Slot' : 'Download Complete Course Syllabus'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            
            {type === 'demo' ? (
              <>
                <h3 className="text-xl font-black text-slate-900">Demo Confirmed!</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Congratulations <b>{name}</b>! Your live virtual demo slot is registered. An admissions counselor will reach out on WhatsApp at <b>{phone}</b> with your joining links.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-900">Syllabus Unlocked!</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Thank you <b>{name}</b>! The complete 16-Module ZenX Academy curriculum is now fully prepared for download.
                </p>
                
                {/* Instant Action download button simulating PDF delivery */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/919962999312?text=Hi%20ZenX%20Academy!%20I%20have%20submitted%20my%20details%20for%20the%20course%20syllabus.%20Please%20share%20the%20complete%20PDF%20curriculum."
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold py-3 px-6 text-xs shadow-md transition-all"
                  >
                    <ArrowDownToLine className="w-4 h-4 animate-bounce" />
                    Get instant PDF via WhatsApp
                  </a>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onClose}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
