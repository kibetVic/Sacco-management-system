import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  User, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ContactUsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [saccoName, setSaccoName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Schedule Live SACCO Demo');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [generatedMailto, setGeneratedMailto] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`[SaccoMIS Consultation] ${saccoName || 'SACCO Partner'} - ${name || 'Prospective Client'}`);
    const bodyContent = `Hello CompTech Solution Team,

I would like to inquire about the SACCO Management System for our cooperative.

--- SACCO INQUIRY DETAILS ---
Name: ${name || 'N/A'}
SACCO / Cooperative: ${saccoName || 'N/A'}
Phone / WhatsApp: ${phone || 'N/A'}
Email Address: ${email || 'N/A'}
Service of Interest: ${serviceType}

--- MESSAGE ---
${message || 'We would like to schedule a system demonstration and discuss pricing and data migration for our cooperative.'}

Thank you,
${name || 'Inquirer'}
${phone || ''}`;

    const mailto = `mailto:kibetvic98@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    setGeneratedMailto(mailto);
    setSubmitted(true);

    // Open user's default email client directly
    window.location.href = mailto;
  };

  const whatsAppDirectUrl = `https://wa.me/254700276320?text=${encodeURIComponent(
    `Hello CompTech Solution Team, I am ${name || 'interested'} from ${saccoName || 'our SACCO'}. We would like to inquire about the SaccoMIS Blockchain System (${serviceType}). My phone is ${phone || ''}.`
  )}`;

  const copyEmailText = () => {
    navigator.clipboard.writeText('kibetvic98@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-black border border-blue-200 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communications & Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact CompTech Solution & SaccoMIS Engineering
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed">
            Have questions about core banking deployment, data migration from Excel/legacy systems, or SASRA compliance? 
            Reach out directly for an immediate technical and commercial consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Cards & WhatsApp Direct Chat */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct WhatsApp Card */}
            <div className="bg-white border-2 border-emerald-500/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                    <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Fastest Response
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">Direct WhatsApp Chat</h3>
                  </div>
                </div>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-700">
                <p className="leading-relaxed">
                  Chat directly with <strong>CompTech Solution Engineering Team</strong> regarding system trials, architecture, or custom cooperative integrations.
                </p>
                <div className="text-base font-black text-slate-900 font-mono pt-1">
                  +254 700 276 320
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <a
                  href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20I%20am%20inquiring%20about%20the%20SaccoMIS%20cooperative%20platform."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Start WhatsApp Chat Now</span>
                </a>
                <a
                  href="tel:+254700276320"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                  title="Direct Phone Call"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                </a>
              </div>
            </div>

            {/* Direct Email Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Official Support Email
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">kibetvic98@gmail.com</h3>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs text-slate-700">
                <p>
                  Send RFPs, tender invitations, system specification sheets, and trial demo requests directly.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={copyEmailText}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                  </button>
                  <a
                    href="mailto:kibetvic98@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Office & Regional Presence Card with Maroon Accents */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#800020] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Cooperative Hub Headquarters</h4>
                  <p className="text-xs text-slate-700 font-bold">CompTech Solution Ltd in Kahawa, Nairobi</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#800020]" />
                  <span>Support Hours: Monday – Saturday (7:30 AM – 6:30 PM EAT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>On-site presentations available across all 47 counties</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Email & Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="border-b border-slate-200 pb-5 mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-2.5 py-1 rounded border border-[#800020]/20">
                Direct Email Dispatch
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Send an Inquiry to CompTech Solution
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Submitting this form immediately opens your configured mail client addressed to <strong className="text-slate-900">kibetvic98@gmail.com</strong> with all your SACCO details structured.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 animate-in zoom-in-95">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-emerald-950">Email Triggered Successfully!</h4>
                    <p className="text-xs text-emerald-800">
                      Your default email application should now be open with your inquiry ready to send. You can also chat directly on WhatsApp for instant confirmation.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <a
                        href={whatsAppDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-700"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                        <span>Confirm via WhatsApp</span>
                      </a>
                      <a
                        href={generatedMailto}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Re-open Email Client</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Koech / Sarah Maina"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    SACCO / Cooperative Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amalo Farmers SACCO Society Ltd"
                      value={saccoName}
                      onChange={(e) => setSaccoName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 712 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. ceo@amalofarmers.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Nature of Consultation / Inquiry *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="Schedule Live SACCO Demo">Schedule Live SACCO Demo (On-site or Zoom)</option>
                  <option value="Request System Pricing & Licensing Quote">Request System Pricing & Licensing Quote</option>
                  <option value="Legacy Database / Excel Data Migration">Legacy Database / Excel Data Migration</option>
                  <option value="M-Pesa STK Daraja API Integration">M-Pesa STK Daraja API Integration</option>
                  <option value="SASRA Compliance Audit & Reports Setup">SASRA Compliance Audit & Reports Setup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Specific Requirements or Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current SACCO setup, number of members, current pain points, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Email to Technical Support</span>
                </button>

                <a
                  href={whatsAppDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Chat Immediately via WhatsApp</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                * All inquiries are directly sent to <strong>kibetvic98@gmail.com</strong> and logged securely. You will receive a response within 15 minutes.
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
