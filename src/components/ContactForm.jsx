import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail, ShieldCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for anti-spam
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const { developer } = PORTFOLIO_CONFIG;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message,
          delivered: data.delivered,
          isLocalLogMode: data.isLocalLogMode,
        });

        // Trigger celebratory sci-fi confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f5ff', '#a855f7', '#10b981'],
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          website: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Submission failed. Server rejected the transmission.',
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Network transmission failure. Is the backend server running on port 5000? Check your connection.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050814]/60 dark:bg-[#050814]/60 light:bg-slate-100/60">
      
      {/* Decorative gradient dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transmission Frequencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cyber font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Establish <span className="text-cyan-400 text-glow-cyan">Contact</span>
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-base sm:text-lg">
            Have a project in mind, an internship opportunity, or a collaborative venture? Transmit a direct encrypted message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 space-y-6">
              <h3 className="font-cyber font-bold text-xl text-slate-100 dark:text-slate-100 light:text-slate-900">
                Direct Coordinates
              </h3>
              
              <div className="space-y-4 text-sm font-mono text-slate-300 dark:text-slate-300 light:text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Personal Email</div>
                    <a href={`mailto:${developer.email}`} className="text-cyan-400 hover:underline">
                      {developer.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Availability Status</div>
                    <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-sans text-xs">
                      {developer.availability}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Target Latency</div>
                    <span className="text-emerald-400">Response within 24 hours</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-400 space-y-2">
                <div className="font-bold text-cyan-400 font-mono">BACKEND ARCHITECTURE NOTE:</div>
                <p>
                  This form communicates with a real Express endpoint (<code className="text-cyan-300">/api/contact</code>). In default setup, messages are logged securely to the server console. When SMTP credentials are added to <code className="text-cyan-300">.env</code>, it delivers real emails to your personal inbox!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/20 shadow-2xl relative space-y-6"
            >
              {/* Anti-spam Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm font-mono flex items-start gap-3 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/60 border-red-500/40 text-red-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">
                      {statusMessage.type === 'success' ? 'TRANSMISSION STATUS: SUCCESS' : 'TRANSMISSION ERROR'}
                    </div>
                    <p className="mt-1 leading-relaxed">{statusMessage.text}</p>
                    {statusMessage.isLocalLogMode && (
                      <p className="mt-2 text-[11px] text-amber-300">
                        Check your server terminal to inspect the full logged message payload!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase mb-2">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Maya Lin"
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-900/80 border ${
                      errors.name ? 'border-red-500 focus:ring-red-400' : 'border-slate-700 focus:border-cyan-400'
                    } text-slate-100 placeholder-slate-500 outline-none transition-all font-mono`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. maya@example.com"
                    className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-900/80 border ${
                      errors.email ? 'border-red-500 focus:ring-red-400' : 'border-slate-700 focus:border-cyan-400'
                    } text-slate-100 placeholder-slate-500 outline-none transition-all font-mono`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>

              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs font-mono font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase mb-2">
                  Subject / Topic <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Junior Developer Role / Project Collaboration"
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-900/80 border ${
                    errors.subject ? 'border-red-500 focus:ring-red-400' : 'border-slate-700 focus:border-cyan-400'
                  } text-slate-100 placeholder-slate-500 outline-none transition-all font-mono`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 uppercase mb-2">
                  Message Payload <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message, project specifications, or collaboration inquiry here..."
                  className={`w-full px-4 py-3 rounded-xl text-sm bg-slate-900/80 border ${
                    errors.message ? 'border-red-500 focus:ring-red-400' : 'border-slate-700 focus:border-cyan-400'
                  } text-slate-100 placeholder-slate-500 outline-none transition-all font-mono resize-y`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold font-mono text-sm uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-neon-cyan hover:shadow-lg disabled:opacity-50 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Encrypting & Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
