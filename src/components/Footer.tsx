import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Sparkles,
  Lock,
  ArrowUp,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 tracking-tight">SACCO Management System</span>
                <span className="text-white font-bold ml-1.5 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#800020]">
                  SaccoMIS
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Enterprise cooperative management software uniting permissioned blockchain ledgers, real-time M-Pesa STK disbursements, automated reducing balance loans, and SASRA regulatory reporting.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>SASRA & Cap 490B Compliant</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>SHA-256 Ledger</span>
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider">Core Modules</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li><a href="#why-us" className="hover:text-blue-600 transition-colors">Why SaccoMIS (ROI Calc)</a></li>
              <li><a href="#contributions" className="hover:text-blue-600 transition-colors">Member Contributions & Savings</a></li>
              <li><a href="#inquiry" className="hover:text-blue-600 transition-colors">Member Loan & Shares Inquiry</a></li>
              <li><a href="#members" className="hover:text-blue-600 transition-colors">Members Directory & KYC</a></li>
              <li><a href="#loans" className="hover:text-blue-600 transition-colors">Loan Tracking & Management</a></li>
              <li><a href="#calculator" className="hover:text-blue-600 transition-colors">Automated Interest Calculator</a></li>
              <li><a href="#blockchain" className="hover:text-blue-600 transition-colors">Permissioned Ledger Explorer</a></li>
              <li><a href="#finance" className="hover:text-blue-600 transition-colors">Financial Reports (Balance Sheet, P&L)</a></li>
            </ul>
          </div>

          {/* Contact Direct Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider">Direct Communications</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a
                  href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20I%20am%20interested%20in%20a%20SaccoMIS%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                  <span>WhatsApp Technical Support</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:kibetvic98@gmail.com"
                  className="text-blue-700 hover:text-blue-800 flex items-center gap-1.5 font-bold"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Technical Support Email</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254700276320"
                  className="text-slate-800 hover:text-blue-600 flex items-center gap-1.5 font-bold font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span>+254 700 276 320</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDemoModal}
                  className="text-[#800020] hover:text-[#600018] font-black text-left cursor-pointer"
                >
                  Request Technical Demonstration
                </button>
              </li>
            </ul>
          </div>

          {/* Lead Contact Info */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider">Hub Headquarters</h4>
            <div className="space-y-2 text-xs">
              <div className="text-slate-900 font-black">CompTech Solution Ltd</div>
              <p className="text-slate-700 font-medium">
                Kahawa, Nairobi, Kenya
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 leading-relaxed shadow-xs">
                Cooperative Technology Center — Deployment & engineering support across Nairobi, Kiambu, Central, Rift Valley, and Western Kenya.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 text-[11px] font-medium">
            &copy; {new Date().getFullYear()} SACCO Management System. Engineered by CompTech Solution Ltd (Kahawa, Nairobi). Built for Kenyan SACCOs and Cooperatives.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 text-xs font-bold transition-colors p-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
