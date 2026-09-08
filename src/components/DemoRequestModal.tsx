import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  User, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { sendDemoRequestEmail, EmailDispatchResult } from '../utils/emailService';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ isOpen, onClose }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [memberCount, setMemberCount] = useState('2,500 - 10,000 members');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM EAT');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Loan Tracking & Lifecycle',
    'Member Contribution Dashboards',
    'Automated Interest Calculator',
    'M-Pesa STK Push Integration',
  ]);
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<EmailDispatchResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const availableModules = [
    'Loan Tracking & Lifecycle',
    'Member Contribution Dashboards',
    'Automated Interest Calculator',
    'M-Pesa STK Push Integration',
    'Permissioned Blockchain Ledger',
    'General Ledger (Chart of Accounts)',
    'Financial Reports (Trial Balance, Balance Sheet, P&L)',
    'CRB Credit Bureau Integration',
  ];

  const handleModuleToggle = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = sendDemoRequestEmail({
        organizationName: organizationName || 'Prospective SACCO Partner',
        contactPerson: contactPerson || 'SACCO Representative',
        email: email || 'user@sacco.org',
        phone: phone || '+254 700 000 000',
        memberCount,
        preferredDate,
        preferredTime,
        modules: selectedModules,
        message,
      });

      setDispatchResult(res);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header with vibrant colors for Book a Live SaccoMIS Demonstration */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-[#800020] border-b-2 border-amber-400/50 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 text-amber-300 border border-white/20 flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight text-white drop-shadow-xs">
                  Book a Live SaccoMIS Demonstration
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                  CompTech Live
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium mt-0.5">
                Technical consultation with CompTech Solution Ltd Engineering Team (Kahawa, Nairobi)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {dispatchResult ? (
            <div className="space-y-5 animate-in zoom-in-95">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Demo Request Prepared & Dispatched!</h4>
                <p className="text-xs text-emerald-900 max-w-md mx-auto font-medium">
                  Your inquiry has been registered under ticket <strong className="font-mono text-emerald-950 font-black">{dispatchResult.messageId}</strong>.
                  A notification has been directed to the technical team at <strong>CompTech Solutions Ltd</strong> (Kahawa, Nairobi).
                </p>
              </div>

              {/* Instant Action Channels */}
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Complete Dispatch via Your Preferred Channel:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Native Email App Launcher */}
                  <a
                    href={dispatchResult.mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:border-blue-400 text-left space-y-1 block group transition-all"
                  >
                    <div className="flex items-center justify-between text-blue-800 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span>Send Official Email</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Opens Gmail or Outlook pre-addressed to CompTech Solutions engineering with all parameters pre-filled.
                    </p>
                  </a>

                  {/* Direct WhatsApp Chat */}
                  <a
                    href={dispatchResult.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 text-left space-y-1 block group transition-all"
                  >
                    <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>Chat on WhatsApp</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Instantly message <strong className="text-slate-900">+254 700 276 320</strong> to schedule a live video walk-through or on-site consultation.
                    </p>
                  </a>
                </div>
              </div>

              {/* Formatted Message Preview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">Formatted Inquiry Copy:</span>
                  <button
                    onClick={() => handleCopy(dispatchResult.body)}
                    className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-800 bg-white p-3 rounded-xl overflow-x-auto whitespace-pre-wrap border border-slate-200 shadow-xs">
                  {dispatchResult.body}
                </pre>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setDispatchResult(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    SACCO / Cooperative Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="e.g., Harambee Cooperative Society"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Contact Person Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g., Jane Wanjiku"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Work Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@sacco.co.ke"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated Members</label>
                  <select
                    value={memberCount}
                    onChange={(e) => setMemberCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none font-medium"
                  >
                    <option value="Under 500 members">Under 500 members</option>
                    <option value="500 - 2,500 members">500 - 2,500 members</option>
                    <option value="2,500 - 10,000 members">2,500 - 10,000 members</option>
                    <option value="10,000 - 55,000 members">10,000 - 55,000 members</option>
                    <option value="55,000+ Tier-1 SACCO">55,000+ Tier-1 SACCO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Preferred Time Window</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none font-medium"
                  >
                    <option value="09:00 AM - 11:00 AM EAT">09:00 AM - 11:00 AM EAT</option>
                    <option value="11:00 AM - 01:00 PM EAT">11:00 AM - 01:00 PM EAT</option>
                    <option value="02:00 PM - 04:00 PM EAT">02:00 PM - 04:00 PM EAT</option>
                    <option value="04:00 PM - 06:00 PM EAT">04:00 PM - 06:00 PM EAT</option>
                  </select>
                </div>
              </div>

              {/* Modules of Interest Checkboxes */}
              <div>
                <label className="block text-slate-700 font-bold mb-2">
                  Select Modules to Cover in the Live Demo:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableModules.map((mod) => (
                    <label
                      key={mod}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                        selectedModules.includes(mod)
                          ? 'bg-blue-50/80 border-blue-600 text-blue-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedModules.includes(mod)}
                        onChange={() => handleModuleToggle(mod)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0"
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Specific Questions / Migration Needs
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., We want to integrate M-Pesa STK push for our 3,000 members and migrate existing loans from Excel..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submit footer with enhanced colors */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-slate-600">
                  Engineering HQ: <span className="text-slate-900 font-bold">CompTech Solution Ltd (Kahawa, Nairobi)</span> | WhatsApp: <span className="text-emerald-700 font-mono font-bold">+254 700 276 320</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-[#800020] hover:from-blue-800 hover:to-[#600018] text-white font-black text-xs flex items-center gap-2 shadow-md hover:shadow-lg shadow-blue-700/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Book Demonstration Now'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
