import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Send, 
  Calculator, 
  PieChart, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Mail,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDemoModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'why-us', label: 'Why SaccoMIS', badge: 'ROI' },
    { id: 'inquiry', label: 'Member Inquiry', badge: 'New' },
    { id: 'contributions', label: 'Contributions', badge: 'M-Pesa' },
    { id: 'members', label: 'Members' },
    { id: 'loans', label: 'Loan Tracker' },
    { id: 'calculator', label: 'Interest Calc' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'finance', label: 'Financial Reports', badge: 'SASRA' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-200">
      {/* Top Corporate Strip with Maroon & Blue accents */}
      <div className="bg-[#800020] text-white text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>SASRA & Cooperative Societies Act Compliant</span>
          </span>
          <span className="hidden md:inline text-white/40">|</span>
          <span className="hidden md:inline text-white/90">
            Permissioned Blockchain Core Banking for SACCOs
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a 
            href="mailto:kibetvic98@gmail.com" 
            className="hover:text-amber-200 flex items-center gap-1 transition-colors"
          >
            <Mail className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">kibetvic98@gmail.com</span>
          </a>
          <span className="text-white/40">•</span>
          <a 
            href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20I%20am%20interested%20in%20a%20SaccoMIS%20consultation." 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-emerald-200 flex items-center gap-1 font-bold text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3 h-3 fill-emerald-300 text-[#800020]" />
            <span>WhatsApp: +254 700 276 320</span>
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-all">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                SACCO Management System
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#800020] text-white">
                SaccoMIS
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-semibold tracking-tight">Cooperative Core Ledger & Accounting Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-800 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase ${
                  activeTab === item.id 
                    ? 'bg-white/25 text-white' 
                    : item.badge === 'M-Pesa' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.badge === 'SASRA'
                    ? 'bg-[#800020]/15 text-[#800020]'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct WhatsApp Quick Chat */}
          <a
            href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20we%20would%20like%20to%20learn%20more%20about%20SaccoMIS%20for%20our%20SACCO."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition-all"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Chat WhatsApp</span>
          </a>

          {/* Direct Email / Request Demo CTA */}
          <button
            onClick={onOpenDemoModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#800020] text-white font-extrabold text-xs shadow-md shadow-[#800020]/25 hover:bg-[#600018] border border-amber-400/40 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Book Live Demo</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex xl:hidden items-center gap-2">
          <a
            href="https://wa.me/254700276320"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600 text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-blue-600 bg-slate-100 border border-slate-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-2.5 rounded-lg text-left text-xs font-bold flex items-center justify-between border ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    activeTab === item.id ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-2.5 rounded-lg bg-[#800020] text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#600018]"
            >
              <Send className="w-4 h-4" />
              <span>Book Live Demo / Consultation</span>
            </button>
            
            <a
              href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20we%20would%20like%20to%20learn%20more%20about%20SaccoMIS."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp Support (+254 700 276 320)</span>
            </a>

            <a
              href="mailto:kibetvic98@gmail.com"
              className="w-full py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-200"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Direct Email: kibetvic98@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
