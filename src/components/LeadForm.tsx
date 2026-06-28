/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useFirebase } from './FirebaseProvider';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, CheckCircle, CreditCard, Landmark, Smartphone, ShieldCheck, 
  User, Phone, Mail, MapPin, Briefcase, Target, ArrowRight, ArrowLeft, Award
} from 'lucide-react';

interface LeadFormProps {
  onEnrollSuccess: (studentName: string, amount: number) => void;
}

type StepperStep = 'contact' | 'goal' | 'summary' | 'completed';

export const LeadForm: React.FC<LeadFormProps> = ({ onEnrollSuccess }) => {
  const { submitLead, submitEnrollment } = useFirebase();

  // Form fields state with localStorage fallback for persistence across steps and sessions
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('lead_name') || '';
    } catch {
      return '';
    }
  });
  const [phone, setPhone] = useState(() => {
    try {
      return localStorage.getItem('lead_phone') || '';
    } catch {
      return '';
    }
  });
  const [whatsapp, setWhatsapp] = useState(() => {
    try {
      return localStorage.getItem('lead_whatsapp') || '';
    } catch {
      return '';
    }
  });
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem('lead_email') || '';
    } catch {
      return '';
    }
  });
  const [city, setCity] = useState(() => {
    try {
      return localStorage.getItem('lead_city') || '';
    } catch {
      return '';
    }
  });
  const [occupation, setOccupation] = useState(() => {
    try {
      return localStorage.getItem('lead_occupation') || 'Student';
    } catch {
      return 'Student';
    }
  });
  const [goal, setGoal] = useState(() => {
    try {
      return localStorage.getItem('lead_goal') || 'Start Career';
    } catch {
      return 'Start Career';
    }
  });

  // Interactive flow states
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<StepperStep>(() => {
    try {
      const savedStep = localStorage.getItem('lead_form_step');
      if (savedStep === 'contact' || savedStep === 'goal' || savedStep === 'summary') {
        return savedStep as StepperStep;
      }
    } catch {}
    return 'contact';
  });
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'razorpay' | 'card' | 'emi'>('upi');
  const [leadId, setLeadId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Sync WhatsApp state
  const [syncWhatsapp, setSyncWhatsapp] = useState(true);

  // Field touched and validation states for real-time validation feedback
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Synchronize state with localStorage to persist progress across reloads and steps
  useEffect(() => {
    try {
      localStorage.setItem('lead_name', name);
    } catch {}
  }, [name]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_phone', phone);
    } catch {}
  }, [phone]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_whatsapp', whatsapp);
    } catch {}
  }, [whatsapp]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_email', email);
    } catch {}
  }, [email]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_city', city);
    } catch {}
  }, [city]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_occupation', occupation);
    } catch {}
  }, [occupation]);

  useEffect(() => {
    try {
      localStorage.setItem('lead_goal', goal);
    } catch {}
  }, [goal]);

  useEffect(() => {
    try {
      if (formStep !== 'completed') {
        localStorage.setItem('lead_form_step', formStep);
      } else {
        localStorage.removeItem('lead_form_step');
      }
    } catch {}
  }, [formStep]);

  const validateField = (fieldName: string, value: string): boolean => {
    let err = '';
    if (fieldName === 'name') {
      if (!value.trim()) {
        err = 'Your full name is required';
      } else if (value.trim().length < 3) {
        err = 'Please enter your full name (at least 3 characters)';
      }
    } else if (fieldName === 'phone') {
      if (!value.trim()) {
        err = 'Phone number is required';
      } else if (!/^\d{10}$/.test(value)) {
        err = 'Please enter a valid 10-digit phone number';
      }
    } else if (fieldName === 'whatsapp') {
      if (value.trim() && !/^\d{10}$/.test(value)) {
        err = 'Please enter a valid 10-digit WhatsApp number';
      }
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        err = 'Email address is required';
      } else if (!emailRegex.test(value)) {
        err = 'Please enter a valid email address';
      }
    }
    setErrors(prev => ({ ...prev, [fieldName]: err }));
    return !err;
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    if (fieldName === 'name') validateField('name', name);
    else if (fieldName === 'phone') validateField('phone', phone);
    else if (fieldName === 'whatsapp') validateField('whatsapp', whatsapp);
    else if (fieldName === 'email') validateField('email', email);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (val.length > 0) {
      setTouched(prev => ({ ...prev, name: true }));
    }
    validateField('name', val);
  };

  const handlePhoneChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    setPhone(numeric);
    if (numeric.length > 0) {
      setTouched(prev => ({ ...prev, phone: true }));
    }
    if (syncWhatsapp) {
      setWhatsapp(numeric);
      if (numeric.length > 0) {
        setTouched(prev => ({ ...prev, whatsapp: true }));
      }
      validateField('whatsapp', numeric);
    }
    validateField('phone', numeric);
  };

  const handleWhatsappChange = (val: string) => {
    const numeric = val.replace(/[^0-9]/g, '');
    setWhatsapp(numeric);
    setSyncWhatsapp(false);
    if (numeric.length > 0) {
      setTouched(prev => ({ ...prev, whatsapp: true }));
    }
    validateField('whatsapp', numeric);
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.length > 0) {
      setTouched(prev => ({ ...prev, email: true }));
    }
    validateField('email', val);
  };

  const validateContactStep = () => {
    const isNameValid = validateField('name', name);
    const isPhoneValid = validateField('phone', phone);
    const isEmailValid = validateField('email', email);
    const isWhatsappValid = validateField('whatsapp', whatsapp);

    setTouched({
      name: true,
      phone: true,
      email: true,
      whatsapp: true,
    });

    return isNameValid && isPhoneValid && isEmailValid && isWhatsappValid;
  };

  const handleGoToGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContactStep()) {
      setFormStep('goal');
    }
  };

  const handleGoToSummary = () => {
    setFormStep('summary');
  };

  const handleFinalEnrollment = async () => {
    setLoading(true);
    try {
      // Gather browser / environment metrics for lead logging
      const userAgent = navigator.userAgent;
      const device = userAgent.includes('Mobi') ? 'Mobile' : 'Desktop';
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get('utm_source') || 'Direct';
      const utmMedium = searchParams.get('utm_medium') || 'Web-Organic';
      const sourceUrl = window.location.href;

      const leadPayload = {
        name,
        phone,
        whatsapp: whatsapp || phone,
        email,
        city: city || 'Not specified',
        occupation,
        goal,
        utmSource,
        utmMedium,
        device,
        sourceUrl,
        paymentStatus: 'completed',
      };

      const newLeadId = await submitLead(leadPayload);
      setLeadId(newLeadId);

      const generatedTxId = 'TXN-' + Math.floor(Math.random() * 900000000 + 100000000);
      setTransactionId(generatedTxId);

      const enrollPayload = {
        name,
        phone,
        email,
        courseId: 'zenx-ai-marketing-tamil',
        amountPaid: 9999,
        paymentMethod: selectedMethod.toUpperCase(),
        paymentStatus: 'completed',
      };

      await submitEnrollment(enrollPayload);
      
      // Clear localStorage persistence on successful completion
      try {
        localStorage.removeItem('lead_name');
        localStorage.removeItem('lead_phone');
        localStorage.removeItem('lead_whatsapp');
        localStorage.removeItem('lead_email');
        localStorage.removeItem('lead_city');
        localStorage.removeItem('lead_occupation');
        localStorage.removeItem('lead_goal');
        localStorage.removeItem('lead_form_step');
      } catch {}

      setFormStep('completed');
      onEnrollSuccess(name, 9999);
    } catch (err) {
      console.error(err);
      alert('There was an error securing your enrollment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get customized dynamic incentives based on selected profile
  const getGoalIncentive = () => {
    switch (goal) {
      case 'Start Career':
        return {
          title: 'Tamil Career Blueprint Included',
          desc: 'Get exclusive access to the step-by-step digital marketer career starter pack.',
        };
      case 'Get Job':
        return {
          title: 'Resume Customizer & Mock Interviews',
          desc: 'Features AI interview simulators and Tamil mock tests for high-placement success.',
        };
      case 'Freelance':
        return {
          title: 'Proposal Generator Tool Templates',
          desc: 'Instantly download n8n workflows designed to pitch high-ticket international clients.',
        };
      case 'Scale Business':
      case 'Scale My Business / Agency Leads':
        return {
          title: 'B2B Lead Generation Automation Pack',
          desc: 'Unlock raw automation blueprints that collect 500+ local leads per day on auto-pilot.',
        };
      case 'Build SaaS':
        return {
          title: 'Micro-SaaS Code Templates',
          desc: 'Includes pre-built UI components and prompt scripts to launch your first Tamil AI SaaS.',
        };
      default:
        return {
          title: 'Elite Tamil Marketers Community',
          desc: 'Connect with 240+ students and mentors for projects, hiring, and active support.',
        };
    }
  };

  const getOccupationDiscountTag = () => {
    if (occupation === 'Student') {
      return 'Extra ₹500 Student Grant Applied!';
    }
    if (occupation === 'Freelancer') {
      return 'Freelancer Launch Bonus Included!';
    }
    if (occupation === 'Business Owner' || occupation === 'Agency Owner') {
      return 'Tax Deduction Invoice Available!';
    }
    return '';
  };

  const incentive = getGoalIncentive();
  const occDiscount = getOccupationDiscountTag();

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl" id="enroll-form-container">
      
      {/* Steps indicator */}
      {formStep !== 'completed' && (
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4 overflow-x-auto gap-2">
          {/* Step 1 */}
          <button 
            type="button"
            onClick={() => setFormStep('contact')}
            className="flex items-center gap-1.5 focus:outline-none text-left shrink-0"
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              formStep === 'contact' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>1</div>
            <div>
              <span className="text-[10px] block font-extrabold text-slate-400 leading-none uppercase">Step 01</span>
              <span className="text-xs font-extrabold text-slate-700 leading-none">Contact</span>
            </div>
          </button>

          <div className="h-0.5 bg-slate-150 flex-1 min-w-4 max-w-10" />

          {/* Step 2 */}
          <button 
            type="button"
            disabled={!name || !phone || !email || !!errors.name || !!errors.phone || !!errors.email}
            onClick={() => setFormStep('goal')}
            className="flex items-center gap-1.5 focus:outline-none disabled:opacity-50 text-left shrink-0"
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              formStep === 'goal' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>2</div>
            <div>
              <span className="text-[10px] block font-extrabold text-slate-400 leading-none uppercase">Step 02</span>
              <span className="text-xs font-extrabold text-slate-700 leading-none">Goal</span>
            </div>
          </button>

          <div className="h-0.5 bg-slate-150 flex-1 min-w-4 max-w-10" />

          {/* Step 3 */}
          <button 
            type="button"
            disabled={!name || !phone || !email || !!errors.name || !!errors.phone || !!errors.email || formStep === 'contact'}
            onClick={() => setFormStep('summary')}
            className="flex items-center gap-1.5 focus:outline-none disabled:opacity-50 text-left shrink-0"
          >
            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              formStep === 'summary' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}>3</div>
            <div>
              <span className="text-[10px] block font-extrabold text-slate-400 leading-none uppercase">Step 03</span>
              <span className="text-xs font-extrabold text-slate-700 leading-none">Summary & Pay</span>
            </div>
          </button>
        </div>
      )}

      {/* Stepper Content with slide-fade animations */}
      <AnimatePresence mode="wait">
        
        {/* Step 1: Contact Info */}
        {formStep === 'contact' && (
          <motion.form 
            key="contact-step"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleGoToGoal} 
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black text-purple-700 uppercase tracking-widest mb-1.5">
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center rounded bg-gradient-to-br from-purple-400 to-indigo-500 border-b-[2px] border-purple-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)] p-0.5 text-white"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                </motion.span>
                Premium Batch Registration
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Secure Your Spot Today</h3>
              <p className="text-xs text-slate-500 mt-1">Get instant ₹29,000 discount and lock your seat for the next live batch.</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g. Sarath Babu"
                  className={`w-full rounded-xl border pl-11 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 transition-all ${
                    touched.name && errors.name 
                      ? 'border-rose-400 focus:ring-rose-500/10 bg-rose-50/10' 
                      : touched.name && !errors.name && name.trim()
                      ? 'border-purple-500 focus:ring-purple-500/10 bg-purple-50/5'
                      : 'border-slate-200 focus:ring-purple-500/10'
                  }`}
                />
                {touched.name && !errors.name && name.trim() && (
                  <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500 animate-fade-in" />
                )}
              </div>
              {touched.name && errors.name && (
                <p className="text-[10px] text-rose-500 font-bold mt-1 flex items-center gap-1.5 animate-slide-down">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="e.g. 9962999312"
                    className={`w-full rounded-xl border pl-11 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 transition-all ${
                      touched.phone && errors.phone 
                        ? 'border-rose-400 focus:ring-rose-500/10 bg-rose-50/10' 
                        : touched.phone && !errors.phone && phone.trim()
                        ? 'border-purple-500 focus:ring-purple-500/10 bg-purple-50/5'
                        : 'border-slate-200 focus:ring-purple-500/10'
                    }`}
                  />
                  {touched.phone && !errors.phone && phone.trim() && (
                    <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500 animate-fade-in" />
                  )}
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-[10px] text-rose-500 font-bold mt-1 flex items-center gap-1.5 animate-slide-down">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">WhatsApp Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => handleWhatsappChange(e.target.value)}
                    onBlur={() => handleBlur('whatsapp')}
                    placeholder="e.g. 9962999312"
                    className={`w-full rounded-xl border pl-4 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 transition-all ${
                      touched.whatsapp && errors.whatsapp 
                        ? 'border-rose-400 focus:ring-rose-500/10 bg-rose-50/10' 
                        : touched.whatsapp && !errors.whatsapp && whatsapp.trim()
                        ? 'border-purple-500 focus:ring-purple-500/10 bg-purple-50/5'
                        : 'border-slate-200 focus:ring-purple-500/10'
                    }`}
                  />
                  {touched.whatsapp && !errors.whatsapp && whatsapp.trim() && (
                    <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500 animate-fade-in" />
                  )}
                </div>
                {touched.whatsapp && errors.whatsapp && (
                  <p className="text-[10px] text-rose-500 font-bold mt-1 flex items-center gap-1.5 animate-slide-down">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                    {errors.whatsapp}
                  </p>
                )}
                <label className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncWhatsapp}
                    onChange={(e) => {
                      setSyncWhatsapp(e.target.checked);
                      if (e.target.checked) {
                        setWhatsapp(phone);
                        validateField('whatsapp', phone);
                      }
                    }}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-3 w-3"
                  />
                  Same as Phone Number
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="e.g. support@zenxacademy.com"
                  className={`w-full rounded-xl border pl-11 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 transition-all ${
                    touched.email && errors.email 
                      ? 'border-rose-400 focus:ring-rose-500/10 bg-rose-50/10' 
                      : touched.email && !errors.email && email.trim()
                      ? 'border-purple-500 focus:ring-purple-500/10 bg-purple-50/5'
                      : 'border-slate-200 focus:ring-purple-500/10'
                  }`}
                />
                {touched.email && !errors.email && email.trim() && (
                  <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500 animate-fade-in" />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="text-[10px] text-rose-500 font-bold mt-1 flex items-center gap-1.5 animate-slide-down">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1">City / Town</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chennai"
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 text-xs sm:text-sm shadow-lg shadow-slate-900/10 active:scale-95 transition-all mt-4 flex items-center justify-center gap-1.5"
            >
              Next: Select Professional Goal
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* Step 2: Goal Selector */}
        {formStep === 'goal' && (
          <motion.div 
            key="goal-step"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-1.5">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="inline-flex items-center justify-center rounded bg-gradient-to-br from-indigo-400 to-purple-500 border-b-[2px] border-indigo-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)] p-0.5 text-white"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                </motion.span>
                Personalize Your Curriculum
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">What is Your Core Goal?</h3>
              <p className="text-xs text-slate-500 mt-1">We tailor our secondary modules & support system to match your career direction.</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                What is your current occupation?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Student', 'Working Professional', 'Freelancer', 'Business Owner', 'Agency Owner', 'Job Seeker'].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccupation(occ)}
                    className={`rounded-xl border p-3 text-left transition-all font-bold ${
                      occupation === occ 
                        ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900 ring-2 ring-indigo-500/10' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-slate-400" />
                Select your primary training objective
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white font-semibold text-slate-800"
              >
                <option value="Start Career">Start My Digital Marketing Career</option>
                <option value="Get Job">Secure a High-Paying AI-Powered Job</option>
                <option value="Freelance">Build a High-Value Freelancing Income</option>
                <option value="Scale Business">Scale My Business / Agency Leads</option>
                <option value="Build SaaS">Build & Monetize My Own Micro SaaS Tools</option>
                <option value="Other">Other Objective</option>
              </select>
            </div>

            {/* Dynamic visual preview box showing we listened to their choice */}
            <div className="rounded-xl border border-dashed border-indigo-150 bg-indigo-50/10 p-4">
              <div className="flex gap-2">
                <div className="bg-indigo-100 rounded-lg p-1.5 h-fit text-indigo-700 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">Customized Batch Allocation:</div>
                  <div className="text-slate-600 mt-1 font-medium leading-relaxed">
                    Based on your objective, you will receive our <b>{incentive.title}</b>. {incentive.desc}
                  </div>
                  {occDiscount && (
                    <div className="mt-2 text-[10px] text-indigo-600 font-extrabold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {occDiscount}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormStep('contact')}
                className="flex-1 rounded-xl border border-slate-200 bg-white font-bold py-3 text-xs text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <button
                type="button"
                onClick={handleGoToSummary}
                className="flex-[2] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 text-xs shadow-lg shadow-indigo-600/10 transition-all flex items-center justify-center gap-1.5"
              >
                Next: Verify Summary
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Registration / Enrollment Summary & Final Action */}
        {formStep === 'summary' && (
          <motion.div 
            key="summary-step"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black text-purple-700 uppercase tracking-widest mb-1.5">
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center rounded bg-gradient-to-br from-purple-400 to-indigo-500 border-b-[2px] border-purple-600 shadow-[0_2px_4px_rgba(0,0,0,0.1)] p-0.5 text-white"
                >
                  <ShieldCheck className="w-2.5 h-2.5" />
                </motion.span>
                Verified Enrollment Details
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Review & Secure Slot</h3>
              <p className="text-xs text-slate-500 mt-1">Please confirm your registration metrics and choose your payment method below.</p>
            </div>

            {/* Structured Summary Card */}
            <div className="rounded-2xl border border-slate-150 bg-slate-50/50 overflow-hidden divide-y divide-slate-150">
              <div className="p-4 bg-white">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Student Information</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold leading-none">Name:</span>
                    <span className="text-slate-800 font-extrabold">{name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold leading-none">Email:</span>
                    <span className="text-slate-800 font-bold break-all">{email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold leading-none">Phone / WhatsApp:</span>
                    <span className="text-slate-800 font-bold">{phone} {whatsapp && whatsapp !== phone && ` / ${whatsapp}`}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-semibold leading-none">City / Occupation:</span>
                    <span className="text-slate-800 font-bold">{city || 'Not specified'} ({occupation})</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/10">
                <h4 className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider mb-1.5">Your Academic Track</h4>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-800 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    Target: {goal === 'Start Career' ? 'Digital Marketing Career' : goal}
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1 italic">
                    "Includes specialized n8n automation flowcharts and custom AI frameworks designed to achieve your specified target."
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-white space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>ZenX AI Marketing Course Regular Fee</span>
                  <span className="line-through">₹39,000</span>
                </div>
                <div className="flex justify-between text-purple-600 font-extrabold">
                  <span>Inaugural Special Discount (74% Off)</span>
                  <span>-₹29,001</span>
                </div>
                {occupation === 'Student' && (
                  <div className="flex justify-between text-indigo-600 font-extrabold text-[11px]">
                    <span>Exclusive Student Scholarship applied</span>
                    <span>-₹500 Coupon Included</span>
                  </div>
                )}
                <div className="border-t border-slate-150 pt-2 mt-2 flex justify-between items-center">
                  <div>
                    <span className="text-slate-900 font-extrabold text-sm block">Total Net Payable</span>
                    <span className="text-[9px] text-slate-400 block font-medium">All taxes and study materials included</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">₹9,999</span>
                </div>
              </div>
            </div>

            {/* Secure Payment Options integrated right into Step 3 */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  Select Payment Method
                </h4>
                <span className="text-[9px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-black border border-purple-100 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-purple-600" />
                  SECURE SSL
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`rounded-xl border p-3 text-left flex flex-col justify-between h-20 transition-all ${
                    selectedMethod === 'upi' ? 'border-purple-500 bg-purple-50/10 ring-2 ring-purple-500/20' : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-950 leading-none">Instant UPI</div>
                    <div className="text-[9px] text-slate-400 mt-1 leading-none font-semibold">GPay, PhonePe, Paytm</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('razorpay')}
                  className={`rounded-xl border p-3 text-left flex flex-col justify-between h-20 transition-all ${
                    selectedMethod === 'razorpay' ? 'border-purple-500 bg-purple-50/10 ring-2 ring-purple-500/20' : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-950 leading-none">Razorpay</div>
                    <div className="text-[9px] text-slate-400 mt-1 leading-none font-semibold">Net Banking & Cards</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`rounded-xl border p-3 text-left flex flex-col justify-between h-20 transition-all ${
                    selectedMethod === 'card' ? 'border-purple-500 bg-purple-50/10 ring-2 ring-purple-500/20' : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-950 leading-none">Credit/Debit Card</div>
                    <div className="text-[9px] text-slate-400 mt-1 leading-none font-semibold">Visa, MasterCard, RuPay</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('emi')}
                  className={`rounded-xl border p-3 text-left flex flex-col justify-between h-20 transition-all ${
                    selectedMethod === 'emi' ? 'border-purple-500 bg-purple-50/10 ring-2 ring-purple-500/20' : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="text-[11px] font-extrabold text-slate-950 leading-none">Easy EMI</div>
                    <div className="text-[9px] text-slate-400 mt-1 leading-none font-semibold">Cardless installments</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormStep('goal')}
                className="flex-1 rounded-xl border border-slate-200 bg-white font-bold py-3 text-xs text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalEnrollment}
                disabled={loading}
                className="flex-[2] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold py-3 text-xs shadow-lg shadow-purple-600/15 transition-all flex items-center justify-center gap-1.5"
              >
                {loading ? 'Processing Enrollment...' : `Secure Slot & Pay via ${selectedMethod.toUpperCase()}`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Success / Completed View */}
        {formStep === 'completed' && (
          <motion.div 
            key="completed-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Enrollment Completed!</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              Congratulations <b>{name}</b>! Your payment has been securely captured, and your seat inside the Tamil AI Digital Marketing Batch is locked.
            </p>

            <div className="rounded-xl border border-slate-150 bg-slate-50 p-4 text-left text-xs max-w-sm mx-auto space-y-1">
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Student ID:</span> <span className="font-bold text-slate-800">{leadId.substring(0, 8).toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Transaction ID:</span> <span className="font-bold text-slate-800">{transactionId}</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Course:</span> <span className="font-bold text-slate-800">AI Digital Marketing (Tamil)</span></div>
              <div className="flex justify-between"><span className="text-slate-400 font-semibold">Batch:</span> <span className="font-bold text-slate-800">Live (Monday - Friday)</span></div>
            </div>

            <div className="pt-4 flex flex-col gap-2 max-w-sm mx-auto">
              <a
                href={`https://wa.me/919962999312?text=Hi%20Sarath%20Babu!%20I%20have%20completed%20the%20payment%20for%20the%20AI%20Digital%20Marketing%20Course.%20My%20Transaction%20ID%20is%20${transactionId}.%20Please%20verify%20my%20seat.`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3 text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 font-sans"
              >
                <Smartphone className="w-4 h-4 fill-white text-[#25D366]" />
                WhatsApp Admin for Batch Details
              </a>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setPhone('');
                  setWhatsapp('');
                  setEmail('');
                  setCity('');
                  setTouched({});
                  setErrors({});
                  setFormStep('contact');
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 py-2 transition-colors"
              >
                Enroll Another Student
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
