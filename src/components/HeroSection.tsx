import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp, 
  Users, 
  Coins, 
  Calculator, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Sparkles,
  Play,
  MessageCircle,
  Mail,
  Building2
} from 'lucide-react';
import { formatKES } from '../utils/calculator';
import { SACCO_METRICS } from '../data/mockData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenDemoModal }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Real-Time Member Contribution & M-Pesa Engine',
      category: 'Fintech Integration',
      metric: 'KES 407,451,251',
      metricLabel: 'Total Member Contributions Under Management',
      description: 'Post Share Capital, Non-Withdrawable Deposits, and Registration Fees via instant Safaricom Daraja STK Push with auto-generated receipt vouchers.',
      badge: '55,601 Verified Members',
      stats: [
        { label: 'Active Savers', value: '2,921' },
        { label: 'Share Capital', value: 'KES 78.2M' },
        { label: 'Non-Withdrawable', value: 'KES 329.1M' },
      ],
      actionTab: 'contributions',
    },
    {
      title: 'Automated Loan Tracking & Guarantor Ledger',
      category: 'Smart Credit Engine',
      metric: 'KES 169,997,134',
      metricLabel: 'Disbursed with Cryptographic Integrity',
      description: 'Streamlined 6-step lifecycle: Online application, guarantor deposit locks, credit committee appraisal, disbursement, and automated share offsets.',
      badge: '5,841 Total Loans Disbursed',
      stats: [
        { label: 'Active Performing', value: '2,219' },
        { label: 'Fully Repaid', value: '2,066' },
        { label: 'NPL Ratio', value: '3.4% (Healthy)' },
      ],
      actionTab: 'loans',
    },
    {
      title: 'Automated SACCO Interest Calculator',
      category: 'Financial Modeling',
      metric: '1.0% - 1.25%',
      metricLabel: 'Configurable Monthly Interest Rates',
      description: 'Simulate Reducing Balance Annuity vs. Flat Rate amortization with mandatory SACCO deductions (Loan Insurance 1.5%, Processing Fee 1.0%).',
      badge: 'Instant Amortization Schedules',
      stats: [
        { label: 'Calculation Formula', value: 'Reducing Bal.' },
        { label: 'Loan Protection', value: '1.5% Net' },
        { label: 'Monthly Schedules', value: '1 - 72 Mos' },
      ],
      actionTab: 'calculator',
    },
    {
      title: 'Permissioned Blockchain & SASRA Reports',
      category: 'Distributed Security',
      metric: '100% Audit-Proof',
      metricLabel: 'Zero Tampering via SHA-256 Ledger',
      description: 'Instant generation of SASRA Form 1 (C-30), Trial Balances, Chart of Accounts, and Dividend schedules with immutable block verification.',
      badge: 'Full Cap 490B Compliance',
      stats: [
        { label: 'Block Time', value: '3.0 sec' },
        { label: 'Consensus', value: 'Multi-Node' },
        { label: 'SASRA Returns', value: '1-Click Ready' },
      ],
      actionTab: 'finance',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-10 pb-16 border-b border-slate-200">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Next-Generation Kenyan Sacco Core Banking</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#800020]" />
            <span className="text-[#800020] font-black uppercase tracking-wider text-[10px]">
              Blockchain Verified
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Transparent, Modern <br className="hidden sm:inline" />
            <span className="text-blue-600">
              SACCO Management
            </span>{' '}
            & Blockchain Core
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Digitize your cooperative with cryptographic certainty. Streamline member contributions, 
            M-Pesa STK deposits, automated reducing-balance loans, and SASRA-ready financial statements.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('contributions')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Member Contributions</span>
            </button>

            <button
              onClick={() => onNavigate('loans')}
              className="px-6 py-3.5 rounded-xl bg-[#800020] hover:bg-[#630018] text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-[#800020]/25 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Test Loan Tracker</span>
            </button>

            <a
              href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20I%20am%20reviewing%20the%20SaccoMIS%20system%20and%20would%20like%20to%20chat."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Direct WhatsApp (+254 700 276 320)</span>
            </a>
          </div>
        </div>

        {/* Feature Showcase Card */}
        <div className="relative max-w-4xl mx-auto mt-6">
          <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden">
            
            {/* Slide Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded bg-[#800020] text-white">
                  {slide.category}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Feature {activeSlide + 1} of {slides.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                  className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <div className="inline-block text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                  {slide.badge}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {slide.description}
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => onNavigate(slide.actionTab)}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-700 hover:text-blue-800 group cursor-pointer"
                  >
                    <span>Jump to interactive module below</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Big Metric Box */}
              <div className="md:col-span-5 bg-white p-5 rounded-2xl border-2 border-blue-200 shadow-xs">
                <div className="text-xs text-slate-500 uppercase font-black tracking-wider">
                  {slide.metricLabel}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1 font-mono">
                  {slide.metric}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
                  {slide.stats.map((st, i) => (
                    <div key={i}>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{st.label}</div>
                      <div className="text-xs font-black text-slate-900 font-mono mt-0.5">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-200">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Live Cooperative Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-blue-700 font-mono">100%</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Data Integrity</div>
            <div className="text-[11px] text-slate-500">SHA-256 Block Proof</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-[#800020] font-mono">15 Mins</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Rapid Support</div>
            <div className="text-[11px] text-slate-500">Direct WhatsApp Link</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-emerald-700 font-mono">SASRA</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Cap 490B Ready</div>
            <div className="text-[11px] text-slate-500">1-Click C-30 Returns</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="text-2xl font-black text-blue-800 font-mono">KES 407M+</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Capital Tracked</div>
            <div className="text-[11px] text-slate-500">Multi-branch Cooperatives</div>
          </div>
        </div>

      </div>
    </section>
  );
};
