/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useFirebase } from './FirebaseProvider';
import { motion } from 'motion/react';
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc, addDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { Lead, Enrollment, Testimonial, Blog } from '../types';
import { 
  Users, Mail, Phone, MapPin, Briefcase, Award, Plus, Trash2, 
  CheckCircle, Database, FileText, LayoutDashboard, LogOut, Lock, 
  Chrome, Download, Search, RefreshCw, Send, Check, ShieldAlert, ShieldCheck,
  Eye, Save, Smartphone, Laptop, CheckSquare, Sparkles, Sliders, Linkedin
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, logOut } = useFirebase();

  // Active Admin Tabs
  const [activeTab, setActiveTab] = useState<'leads' | 'students' | 'testimonials' | 'blogs' | 'certificates'>('leads');

  // Firestore Lists
  const [leads, setLeads] = useState<Lead[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Form states for creating resources
  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialRole, setNewTestimonialRole] = useState('');
  const [newTestimonialContent, setNewTestimonialContent] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);
  const [newTestimonialStat, setNewTestimonialStat] = useState('');
  const [newTestimonialType, setNewTestimonialType] = useState('');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogSlug, setNewBlogSlug] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('Sarath Babu K');
  const [newBlogTags, setNewBlogTags] = useState('SEO, AI, Digital Marketing');

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Certificate Generator State
  const [certStudentName, setCertStudentName] = useState('');
  const [certCourse, setCertCourse] = useState('Advanced AI Digital Marketing & GEO');
  const [certId, setCertId] = useState('ZX-CERT-2026-001');
  const [showCertificate, setShowCertificate] = useState(false);

  // Advanced Certificate Customizer Options
  const [certTemplate, setCertTemplate] = useState<'classic' | 'emerald' | 'charcoal' | 'gold'>('classic');
  const [certSignature, setCertSignature] = useState('Sarath Babu K.');
  const [certSignRole, setCertSignRole] = useState('Mentor & CEO, ZenX');
  const [certGrade, setCertGrade] = useState('Distinction');
  const [certHasBadge, setCertHasBadge] = useState(true);
  const [certIssueDate, setCertIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [certLogoText, setCertLogoText] = useState('ZENX ACADEMY');
  const [certDeviceSim, setCertDeviceSim] = useState<'desktop' | 'mobile'>('desktop');
  const [savingTemplate, setSavingTemplate] = useState(false);

  // Load Admin Data on tab switch / component load
  const loadAdminData = async () => {
    if (!isAdmin) return;
    setRefreshing(true);
    try {
      // 1. Fetch Leads
      try {
        const leadsCol = collection(db, 'leads');
        const leadsSnap = await getDocs(query(leadsCol, orderBy('createdAt', 'desc')));
        const leadsData = leadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
        setLeads(leadsData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'leads');
      }

      // 2. Fetch Enrollments
      try {
        const enrollCol = collection(db, 'enrollments');
        const enrollSnap = await getDocs(query(enrollCol, orderBy('createdAt', 'desc')));
        const enrollData = enrollSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
        setEnrollments(enrollData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'enrollments');
      }

      // 3. Fetch Testimonials
      try {
        const testCol = collection(db, 'testimonials');
        const testSnap = await getDocs(query(testCol, orderBy('createdAt', 'desc')));
        const testData = testSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        setTestimonials(testData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'testimonials');
      }

      // 4. Fetch Blogs
      try {
        const blogsCol = collection(db, 'blogs');
        const blogsSnap = await getDocs(query(blogsCol, orderBy('createdAt', 'desc')));
        const blogsData = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
        setBlogs(blogsData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'blogs');
      }

      // 5. Fetch Saved Certificate Template Configuration
      try {
        const docRef = doc(db, 'settings', 'certificate_template');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.template) setCertTemplate(data.template as any);
          if (data.signature) setCertSignature(data.signature);
          if (data.signRole) setCertSignRole(data.signRole);
          if (data.grade) setCertGrade(data.grade);
          if (data.hasBadge !== undefined) setCertHasBadge(data.hasBadge);
          if (data.logoText) setCertLogoText(data.logoText);
          if (data.course) setCertCourse(data.course);
        }
      } catch (error) {
        console.error("Error loading cert template config:", error);
      }

    } catch (error) {
      console.error("Error loading admin data: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  // Operations
  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    const path = `leads/${id}`;
    try {
      await updateDoc(doc(db, 'leads', id), { paymentStatus: newStatus });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, paymentStatus: newStatus } : l));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleDeleteDoc = async (col: 'leads' | 'enrollments' | 'testimonials' | 'blogs', id: string) => {
    if (!confirm('Are you sure you want to delete this record? This is irreversible.')) return;
    const path = `${col}/${id}`;
    try {
      await deleteDoc(doc(db, col, id));
      if (col === 'leads') setLeads(prev => prev.filter(item => item.id !== id));
      if (col === 'enrollments') setEnrollments(prev => prev.filter(item => item.id !== id));
      if (col === 'testimonials') setTestimonials(prev => prev.filter(item => item.id !== id));
      if (col === 'blogs') setBlogs(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName || !newTestimonialContent) return;
    const path = 'testimonials';
    try {
      const payload = {
        name: newTestimonialName,
        role: newTestimonialRole || 'Student Alumnus',
        content: newTestimonialContent,
        rating: Number(newTestimonialRating),
        stat: newTestimonialStat || '100% Hike',
        type: newTestimonialType || 'Placement',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newTestimonialName)}`,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, path), payload);
      setNewTestimonialName('');
      setNewTestimonialRole('');
      setNewTestimonialContent('');
      setNewTestimonialRating(5);
      setNewTestimonialStat('');
      setNewTestimonialType('');
      loadAdminData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent || !newBlogSlug) return;
    const path = 'blogs';
    try {
      const payload = {
        title: newBlogTitle,
        slug: newBlogSlug.toLowerCase().replace(/\s+/g, '-'),
        content: newBlogContent,
        author: newBlogAuthor,
        tags: newBlogTags.split(',').map(t => t.trim()),
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, path), payload);
      setNewBlogTitle('');
      setNewBlogSlug('');
      setNewBlogContent('');
      loadAdminData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleSaveTemplate = async () => {
    setSavingTemplate(true);
    try {
      const docRef = doc(db, 'settings', 'certificate_template');
      await setDoc(docRef, {
        template: certTemplate,
        signature: certSignature,
        signRole: certSignRole,
        grade: certGrade,
        hasBadge: certHasBadge,
        logoText: certLogoText,
        course: certCourse,
        updatedAt: serverTimestamp(),
      });
      alert('Certificate template configuration saved successfully to Firestore!');
    } catch (error) {
      console.error("Error saving certificate template:", error);
      alert('Failed to save certificate template configuration.');
    } finally {
      setSavingTemplate(false);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'WhatsApp', 'Email', 'City', 'Goal', 'Occupation', 'UTM Source', 'UTM Medium', 'Device', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id, l.name, l.phone, l.whatsapp, l.email, l.city, l.goal, l.occupation, l.utmSource, l.utmMedium, l.device, l.paymentStatus, l.createdAt ? new Date(l.createdAt.seconds * 1000).toLocaleString() : ''
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ZenX_Academy_Leads_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateCertificate = (studentName: string) => {
    setCertStudentName(studentName);
    setCertId(`ZX-CERT-${Math.floor(1000 + Math.random() * 9000)}`);
    setActiveTab('certificates');
    setShowCertificate(true);
  };

  // If not logged in as Admin, show Auth Portal
  if (!user || !isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white mb-6 shadow-md">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">Admin Gatekeeper</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
            This space is restricted to authorized ZenX Academy instructors. Please sign in with your administrator account.
          </p>

          <div className="my-6 rounded-2xl bg-amber-50 border border-amber-100 p-4 text-left text-xs text-amber-800 space-y-2">
            <b className="flex items-center gap-1.5 font-black text-amber-900">
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center rounded bg-gradient-to-br from-amber-400 to-amber-500 border-b-[2px] border-amber-600 shadow-sm p-0.5 text-amber-950"
              >
                <Lock className="w-3 h-3" />
              </motion.span>
              Required Admin Credentials:
            </b>
            <p>Email: <code className="bg-white/60 px-1 rounded font-bold">abishekabishek55337@gmail.com</code></p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 text-xs flex items-center justify-center gap-2 shadow"
          >
            <Chrome className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            Sign In with Google Auth
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 border-t border-slate-200">
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white px-4 py-4 sm:px-6 lg:px-8 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center font-extrabold text-sm text-white">
              ZX
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">ZenX Console</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider leading-none">Administration</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-300">Signed in: <b>{user.email}</b></span>
            <button
              onClick={logOut}
              className="rounded-lg bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs and Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-4 mb-8">
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('leads'); setShowCertificate(false); }}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeTab === 'leads' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              Inbound Leads ({leads.length})
            </button>
            <button
              onClick={() => { setActiveTab('students'); setShowCertificate(false); }}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeTab === 'students' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              Paid Students ({enrollments.length})
            </button>
            <button
              onClick={() => { setActiveTab('testimonials'); setShowCertificate(false); }}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeTab === 'testimonials' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Testimonials ({testimonials.length})
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setShowCertificate(false); }}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeTab === 'blogs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              SEO Blogs ({blogs.length})
            </button>
            <button
              onClick={() => { setActiveTab('certificates'); setShowCertificate(true); }}
              className={`rounded-xl px-4 py-2.5 text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                activeTab === 'certificates' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Check className="w-4 h-4" />
              Certificates Engine
            </button>
          </div>

          <div className="flex gap-2 items-center w-full md:w-auto">
            <button
              onClick={loadAdminData}
              disabled={refreshing}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            {activeTab === 'leads' && (
              <button
                onClick={exportLeadsToCSV}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Tab Panel Renderings */}

        {/* 1. LEADS Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-150 flex justify-between items-center flex-wrap gap-4 bg-slate-50/50">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                  Lead Registration History
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search leads by name or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-4">Student</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Goal & Target</th>
                      <th className="p-4">UTM & Source</th>
                      <th className="p-4">Status Gate</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads
                      .filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm))
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-slate-900">{lead.name}</div>
                            <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{lead.occupation}</div>
                          </td>
                          <td className="p-4 space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              {lead.email}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-slate-800">{lead.goal}</div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                              <MapPin className="w-3 h-3" />
                              {lead.city}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-700 font-medium">Source: <b className="text-slate-900">{lead.utmSource}</b></div>
                            <div className="text-[10px] text-slate-400 mt-0.5">Device: {lead.device || 'Unknown'}</div>
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.paymentStatus}
                              onChange={(e) => handleUpdateLeadStatus(lead.id!, e.target.value)}
                              className={`rounded-lg px-2.5 py-1 font-bold text-[10px] border focus:outline-none ${
                                lead.paymentStatus === 'paid'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : lead.paymentStatus === 'contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="paid">Paid Student</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleGenerateCertificate(lead.name)}
                                className="rounded bg-slate-100 hover:bg-slate-200 p-1.5 text-slate-700 text-[10px] font-bold"
                                title="Generate Certificate"
                              >
                                Cert
                              </button>
                              <button
                                onClick={() => handleDeleteDoc('leads', lead.id!)}
                                className="rounded bg-rose-50 hover:bg-rose-100 p-1.5 text-rose-600"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center p-8 text-slate-400">
                          No inbound leads collected yet. Submit the registration forms on the frontend to populate records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. STUDENTS Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-500" />
                Active Enrollments & Payment Records
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Amount Paid</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Registration Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enrollments.map((en) => (
                    <tr key={en.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900">{en.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">ID: {en.id?.substring(0,8).toUpperCase()}</div>
                      </td>
                      <td className="p-4 space-y-1">
                        <div>{en.phone}</div>
                        <div className="text-slate-400">{en.email}</div>
                      </td>
                      <td className="p-4 font-extrabold text-emerald-600">
                        ₹{en.amountPaid.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-700">
                          {en.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">
                        {en.createdAt ? new Date(en.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleGenerateCertificate(en.name)}
                            className="rounded bg-slate-950 text-white hover:bg-slate-800 text-[10px] font-bold px-3 py-1"
                          >
                            Certificate
                          </button>
                          <button
                            onClick={() => handleDeleteDoc('enrollments', en.id!)}
                            className="rounded bg-rose-50 hover:bg-rose-100 p-1.5 text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {enrollments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-slate-400">
                        No financial enrollment records recorded yet. complete a payment using the secure demo checkout on the landing page to populate paid student accounts.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TESTIMONIALS Tab */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Testimonial Column */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                Add Student Review
              </h3>
              <form onSubmit={handleAddTestimonial} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={newTestimonialName}
                    onChange={(e) => setNewTestimonialName(e.target.value)}
                    placeholder="e.g. Anand G"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Role / Placement Status</label>
                  <input
                    type="text"
                    value={newTestimonialRole}
                    onChange={(e) => setNewTestimonialRole(e.target.value)}
                    placeholder="e.g. Freelancer (Fiverr Retainer)"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Earning Stat / ROI</label>
                    <input
                      type="text"
                      value={newTestimonialStat}
                      onChange={(e) => setNewTestimonialStat(e.target.value)}
                      placeholder="e.g. ₹1.8L/Month"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Achievement Type</label>
                    <input
                      type="text"
                      value={newTestimonialType}
                      onChange={(e) => setNewTestimonialType(e.target.value)}
                      placeholder="e.g. Client Retainer"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Star Rating</label>
                  <select
                    value={newTestimonialRating}
                    onChange={(e) => setNewTestimonialRating(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 bg-white"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Review Content *</label>
                  <textarea
                    required
                    rows={4}
                    value={newTestimonialContent}
                    onChange={(e) => setNewTestimonialContent(e.target.value)}
                    placeholder="Describe how the course modules helped land jobs or scale businesses in Tamil..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-950 text-white font-bold py-2.5 hover:bg-slate-900 transition-colors"
                >
                  Publish Testimonial
                </button>
              </form>
            </div>

            {/* Testimonial Directory */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-150 bg-slate-50/50">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">
                  Live Testimonials Registry
                </h3>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {testimonials.map((test) => (
                  <div key={test.id} className="p-5 flex justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex gap-4">
                      <img src={test.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-100" />
                      <div className="text-xs">
                        <div className="font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                          {test.name}
                          {test.stat && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-100">
                              {test.stat}
                            </span>
                          )}
                          {test.type && (
                            <span className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100">
                              {test.type}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold">{test.role}</div>
                        <p className="text-slate-600 mt-2 italic leading-relaxed">
                          "{test.content}"
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full shrink-0">
                      <button
                        onClick={() => handleDeleteDoc('testimonials', test.id!)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No custom testimonials added yet. Use the sidebar form to populate student reviews.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. BLOGS Tab */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create SEO Blog Column */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                Write SEO Article
              </h3>
              <form onSubmit={handleAddBlog} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={newBlogTitle}
                    onChange={(e) => {
                      setNewBlogTitle(e.target.value);
                      setNewBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }}
                    placeholder="e.g. Master GEO Ranking in 2026"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Slug URL (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={newBlogSlug}
                    onChange={(e) => setNewBlogSlug(e.target.value)}
                    placeholder="e.g. master-geo-ranking-2026"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={newBlogTags}
                    onChange={(e) => setNewBlogTags(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">Article Body *</label>
                  <textarea
                    required
                    rows={6}
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    placeholder="Write article details..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-950 text-white font-bold py-2.5 hover:bg-slate-900 transition-colors"
                >
                  Publish Article
                </button>
              </form>
            </div>

            {/* Blogs Directory */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-150 bg-slate-50/50">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest">
                  Published Blog Articles (GEO Indexable)
                </h3>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-5 flex justify-between gap-4 hover:bg-slate-50 transition-colors text-xs">
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{blog.title}</div>
                      <div className="text-[10px] font-mono text-emerald-600 mt-1">/{blog.slug}</div>
                      <p className="text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {blog.content}
                      </p>
                      <div className="flex gap-1 flex-wrap mt-3">
                        {blog.tags.map((t, i) => (
                          <span key={i} className="rounded bg-slate-100 text-slate-600 px-2 py-0.5 text-[9px] font-bold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDoc('blogs', blog.id!)}
                      className="text-rose-500 hover:text-rose-700 p-1 h-fit shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No articles published yet. Publishing articles automatically indexes them for Google SEO and GEO scrapers.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. CERTIFICATES Tab */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {/* Template Generator Control Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    Certificate Template Customizer & Verification Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Configure and verify the official credential template that students will receive upon graduation.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveTemplate}
                    disabled={savingTemplate}
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {savingTemplate ? 'Saving...' : 'Save Live Template'}
                  </button>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                  1. Select Design Theme
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {[
                    { id: 'classic', name: 'Classic Navy', desc: 'Formal traditional layout', colors: 'bg-slate-900 border-slate-300' },
                    { id: 'emerald', name: 'Emerald Minimalist', desc: 'Modern high-contrast emerald', colors: 'bg-emerald-700 border-emerald-250' },
                    { id: 'charcoal', name: 'Luxury Charcoal', desc: 'Dark-mode gold accent look', colors: 'bg-slate-950 border-amber-500' },
                    { id: 'gold', name: 'Elite Gold Accent', desc: 'Premium serif prestige style', colors: 'bg-amber-100 border-amber-600' }
                  ].map((themeOpt) => (
                    <button
                      key={themeOpt.id}
                      onClick={() => {
                        setCertTemplate(themeOpt.id as any);
                        setShowCertificate(true);
                      }}
                      className={`rounded-xl border p-3 text-left transition-all flex flex-col justify-between h-24 ${
                        certTemplate === themeOpt.id 
                          ? 'border-emerald-600 bg-emerald-50/10 ring-2 ring-emerald-500/20 shadow-sm' 
                          : 'border-slate-150 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-extrabold text-slate-950">{themeOpt.name}</span>
                        <div className={`w-3.5 h-3.5 rounded-full ${themeOpt.colors} border`} />
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold leading-snug mt-1">{themeOpt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Import from Active Enrollments */}
              {enrollments.length > 0 && (
                <div className="mb-6 bg-slate-900/5 border border-slate-200 rounded-2xl p-4.5 text-xs">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Quick Import: Auto-fill From Active Student Database
                  </label>
                  <div className="flex gap-2.5 items-center">
                    <select
                      onChange={(e) => {
                        const selectedVal = e.target.value;
                        if (selectedVal) {
                          setCertStudentName(selectedVal);
                          setCertId(`ZX-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`);
                          setShowCertificate(true);
                        }
                      }}
                      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-bold text-slate-800 flex-1 cursor-pointer shadow-sm hover:border-slate-350"
                    >
                      <option value="">-- Choose an Enrolled Student to Auto-fill --</option>
                      {enrollments.map((en) => (
                        <option key={en.id} value={en.name}>
                          {en.name} (Amount Paid: ₹{en.amountPaid.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <div className="text-[10px] font-extrabold text-purple-700 bg-purple-100 rounded-xl px-3 py-2 border border-purple-200 shrink-0">
                      {enrollments.length} Active Records
                    </div>
                  </div>
                </div>
              )}

              {/* Configurable Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Preview Student Name</label>
                  <input
                    type="text"
                    value={certStudentName || 'Sarath Babu K.'}
                    onChange={(e) => {
                      setCertStudentName(e.target.value);
                      setShowCertificate(true);
                    }}
                    placeholder="e.g. Sarath Babu K."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold"
                  />
                  <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">Simulates student completion credentials.</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Course Title</label>
                  <input
                    type="text"
                    value={certCourse}
                    onChange={(e) => {
                      setCertCourse(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Certificate Credential ID</label>
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => {
                      setCertId(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Authorized Signatory Name</label>
                  <input
                    type="text"
                    value={certSignature}
                    onChange={(e) => {
                      setCertSignature(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Authorized Signatory Role</label>
                  <input
                    type="text"
                    value={certSignRole}
                    onChange={(e) => {
                      setCertSignRole(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Evaluation Grade / Honor</label>
                  <select
                    value={certGrade}
                    onChange={(e) => {
                      setCertGrade(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 bg-white font-semibold"
                  >
                    <option value="Distinction">Distinction (Top 5%)</option>
                    <option value="Outstanding">Outstanding Performance</option>
                    <option value="First Class">First Class Honors</option>
                    <option value="None">None (Standard Certificate)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Logo Header Text</label>
                  <input
                    type="text"
                    value={certLogoText}
                    onChange={(e) => {
                      setCertLogoText(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={certIssueDate}
                    onChange={(e) => {
                      setCertIssueDate(e.target.value);
                      setShowCertificate(true);
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-bold"
                  />
                </div>
                <div className="flex items-center gap-6 h-full pt-4">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certHasBadge}
                      onChange={(e) => {
                        setCertHasBadge(e.target.checked);
                        setShowCertificate(true);
                      }}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    Verify Holographic Badge
                  </label>
                </div>
              </div>

              {/* View/Print actions */}
              <div className="flex gap-2 border-t border-slate-100 pt-4 items-center justify-between flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Device Simulator:</span>
                  <button
                    onClick={() => setCertDeviceSim('desktop')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-1 transition-all ${
                      certDeviceSim === 'desktop' ? 'bg-slate-900 text-white' : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    Desktop View
                  </button>
                  <button
                    onClick={() => setCertDeviceSim('mobile')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-1 transition-all ${
                      certDeviceSim === 'mobile' ? 'bg-slate-900 text-white' : 'border border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile View
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowCertificate(true);
                      setTimeout(() => window.print(), 200);
                    }}
                    className="rounded-xl border border-slate-250 bg-white font-extrabold px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:border-slate-350 transition-colors text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    Print / Export PDF
                  </button>
                  <button
                    onClick={() => {
                      setCertStudentName('');
                      setShowCertificate(false);
                    }}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Reset Fields
                  </button>
                </div>
              </div>
            </div>

            {/* Live Certificate Renderer Stage */}
            {showCertificate && (
              <div className="space-y-6">
                <div className="text-center font-black text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  Live Dynamic Template preview
                </div>

                {/* Outer sizing box based on simulator mode */}
                <div className={`mx-auto transition-all duration-300 ${certDeviceSim === 'mobile' ? 'max-w-sm border-8 border-slate-900 rounded-[2.5rem] bg-slate-900 p-3 shadow-2xl relative h-[680px] overflow-y-auto' : 'w-full'}`}>
                  
                  {certDeviceSim === 'mobile' && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-10" />
                  )}

                  <div className={`relative aspect-[1.414/1] w-full rounded-2xl p-6 md:p-12 text-center shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 border-8 ${
                    certTemplate === 'classic' 
                      ? 'border-slate-900 bg-[#fbfbfa] text-slate-900' 
                      : certTemplate === 'emerald'
                      ? 'border-emerald-700 bg-emerald-50/20 text-slate-900'
                      : certTemplate === 'charcoal'
                      ? 'border-amber-600 bg-slate-950 text-white'
                      : 'border-double border-amber-500 bg-[#faf8f2] text-slate-900'
                  }`}>
                    
                    {/* Visual Watermarks / Accents */}
                    {certTemplate === 'classic' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 select-none pointer-events-none transform -rotate-12 font-black text-6xl md:text-8xl opacity-15">
                        {certLogoText}
                      </div>
                    )}
                    {certTemplate === 'emerald' && (
                      <div className="absolute inset-0 border border-emerald-500/10 rounded-xl pointer-events-none m-2" />
                    )}
                    {certTemplate === 'charcoal' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800 select-none pointer-events-none transform -rotate-12 font-black text-6xl md:text-8xl opacity-10">
                        OFFICIAL GRADUATE
                      </div>
                    )}
                    {certTemplate === 'gold' && (
                      <div className="absolute inset-4 border-2 border-amber-400/20 rounded pointer-events-none" />
                    )}

                    {/* Top Headers */}
                    <div>
                      <div className={`text-lg md:text-2xl font-black tracking-widest ${
                        certTemplate === 'classic' 
                          ? 'text-slate-900 font-sans' 
                          : certTemplate === 'emerald'
                          ? 'text-emerald-700 font-sans'
                          : certTemplate === 'charcoal'
                          ? 'text-amber-500 font-mono'
                          : 'text-amber-700 font-serif'
                      }`}>{certLogoText}</div>
                      <div className={`text-[8px] md:text-[10px] font-extrabold uppercase tracking-widest mt-1 ${
                        certTemplate === 'charcoal' ? 'text-slate-400' : 'text-slate-500'
                      }`}>AI Marketing & Automations Certification Program</div>
                    </div>

                    {/* Body Content */}
                    <div className="space-y-2 md:space-y-4 my-4 md:my-6">
                      <div className={`text-[9px] md:text-xs font-bold uppercase tracking-widest ${
                        certTemplate === 'charcoal' ? 'text-slate-500' : 'text-slate-400'
                      }`}>This dynamic Credential confirms that</div>
                      
                      <div className={`text-2xl md:text-4xl font-serif font-black border-b max-w-lg mx-auto pb-1 italic ${
                        certTemplate === 'charcoal' ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                      }`}>
                        {certStudentName || 'Sarath Babu K.'}
                      </div>

                      <div className={`text-[10px] md:text-xs max-w-md mx-auto leading-relaxed font-medium ${
                        certTemplate === 'charcoal' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        has successfully satisfied all evaluations, programmatic marketing requirements, and n8n workflows in Tamil to qualify as a certified expert in
                      </div>

                      <div className={`text-sm md:text-lg font-extrabold px-4 py-1.5 rounded-xl max-w-md mx-auto border transition-colors ${
                        certTemplate === 'classic'
                          ? 'bg-slate-100 border-slate-200 text-slate-950'
                          : certTemplate === 'emerald'
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-100'
                          : certTemplate === 'charcoal'
                          ? 'bg-slate-900 text-amber-500 border-slate-800'
                          : 'bg-amber-50/50 text-amber-950 border-amber-100 font-serif'
                      }`}>
                        {certCourse}
                      </div>

                      {/* Display Grade Block if configured */}
                      {certGrade !== 'None' && (
                        <div className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-black text-amber-800 uppercase tracking-wide">
                          <CheckCircle className="w-3 h-3 text-amber-600" />
                          Passed with {certGrade}
                        </div>
                      )}
                    </div>

                    {/* Footer Signatures */}
                    <div className="flex justify-between items-end border-t border-slate-100 pt-4 md:pt-6">
                      <div className="text-left text-[9px] md:text-[10px]">
                        <div className="font-mono text-slate-400 font-bold uppercase">ID: {certId}</div>
                        <div className="text-slate-400 font-bold mt-0.5">Date: {new Date(certIssueDate).toLocaleDateString()}</div>
                        <div className="text-emerald-600 font-extrabold mt-1 uppercase tracking-wider text-[8px] flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          VERIFIED BLOCKCHAIN ATTEST
                        </div>
                      </div>

                      {/* Holographic Verification Badge stamp */}
                      {certHasBadge && (
                        <div className="relative group flex items-center justify-center shrink-0">
                          <div className="absolute w-12 h-12 rounded-full bg-amber-400 blur-sm opacity-20 animate-pulse" />
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-amber-400 bg-[#fbf9f2] text-amber-600 flex flex-col items-center justify-center text-[7px] md:text-[8px] font-black leading-none uppercase tracking-tighter shadow-md">
                            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow mb-0.5" />
                            <span>ZenX</span>
                            <span>VERIFIED</span>
                          </div>
                        </div>
                      )}

                      <div className="text-center max-w-44 border-b border-slate-300 pb-1">
                        <span className="font-serif italic font-extrabold text-slate-800 tracking-wider text-xs md:text-sm block">
                          {certSignature}
                        </span>
                        <div className="text-[8px] md:text-[9px] text-slate-400 uppercase font-black mt-1 tracking-wider leading-none">
                          {certSignRole}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulator Student Verification Checker Simulator */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs">
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-700">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Simulated Verification Checker Portal
                  </div>
                  <p className="text-slate-500 leading-relaxed mb-3">
                    Students and recruiters can scan the secure Attestation QR code on the physical certificate to visit our live public validation lookup portal to verify its integrity.
                  </p>
                  <div className="rounded-xl border border-slate-150 bg-white p-3.5 space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block text-[9px] leading-none">attested holder</span>
                        <span className="text-slate-800 font-black">{certStudentName || 'Sarath Babu K.'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block text-[9px] leading-none">qualification</span>
                        <span className="text-slate-800 font-extrabold text-emerald-600">{certCourse}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block text-[9px] leading-none">Status</span>
                        <span className="rounded bg-emerald-50 border border-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
                          Active & Secured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
