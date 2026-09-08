import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  DollarSign, 
  Users, 
  FileSpreadsheet, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Check, 
  PhoneCall, 
  MessageCircle,
  Building,
  Scale
} from 'lucide-react';
import { formatKES } from '../utils/calculator';

interface CustomerConvictionProps {
  onOpenDemoModal: () => void;
  onNavigate: (tab: string) => void;
}

export const CustomerConviction: React.FC<CustomerConvictionProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  // Interactive ROI Calculator State
  const [memberCount, setMemberCount] = useState<number>(3500);
  const [avgMonthlyLoans, setAvgMonthlyLoans] = useState<number>(140);
  const [avgLoanSize, setAvgLoanSize] = useState<number>(150000);

  // Financial impact calculation
  const roiMetrics = useMemo(() => {
    // Paperwork & printing savings: ~KES 320 per loan file + passbooks
    const annualStationerySavings = (avgMonthlyLoans * 12 * 320) + (memberCount * 180);
    
    // M-Pesa manual reconciliation staff hours saved: ~45 hours/month @ KES 1,000/hr
    const annualStaffReconciliationSavings = 45 * 12 * 1100;
    
    // Default & Non-Performing Loan reduction: ~2.8% recovery improvement from blockchain guarantor locks & CRB vetting
    const annualLoanDisbursed = avgMonthlyLoans * 12 * avgLoanSize;
    const defaultReductionSavings = annualLoanDisbursed * 0.024;
    
    // Total annual monetary benefit
    const totalAnnualSavings = annualStationerySavings + annualStaffReconciliationSavings + defaultReductionSavings;

    // Reconciliation turnaround time
    const turnaroundDays = {
      legacy: '4 - 7 Business Days',
      saccoMis: 'Real-time (3.2 seconds)',
    };

    return {
      annualStationerySavings,
      annualStaffReconciliationSavings,
      defaultReductionSavings,
      totalAnnualSavings,
      turnaroundDays,
      paybackPeriodMonths: Math.max(1, Math.round((280000 / totalAnnualSavings) * 12 * 10) / 10),
    };
  }, [memberCount, avgMonthlyLoans, avgLoanSize]);

  return (
    <section id="why-us" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-extrabold border border-[#800020]/20 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Why Board Members & CEOs Choose SaccoMIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Stop Losing Millions to Manual Errors, <br className="hidden sm:inline" />
            Paper Files & Delayed Reconciliations
          </h2>
          <p className="mt-3 text-base text-slate-700 leading-relaxed font-normal">
            Kenya's first purpose-built cooperative management system running on an immutable blockchain ledger. 
            Designed to guarantee 100% SASRA compliance, eliminate fraud, and satisfy audit requirements in seconds.
          </p>
        </div>

        {/* 1. Interactive ROI & Cost-Savings Calculator for Board Decision Makers */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-16 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                Interactive Board ROI Tool
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Calculate Your Cooperative's Annual Cost Savings
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Slide your current SACCO membership and loan volume to project immediate financial returns.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution%20Team,%20I%20used%20the%20SaccoMIS%20ROI%20Calculator%20and%20would%20like%20a%20detailed%20proposal%20for%20our%20SACCO."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-emerald-700 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Discuss ROI on WhatsApp</span>
              </a>
              <button
                onClick={onOpenDemoModal}
                className="px-4 py-2.5 rounded-xl bg-[#800020] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#630018] shadow-sm transition-all cursor-pointer"
              >
                <span>Request Formal Quote</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Member Slider */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Total Active SACCO Members</span>
                  </label>
                  <span className="text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-mono">
                    {memberCount.toLocaleString()} Members
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="25000"
                  step="100"
                  value={memberCount}
                  onChange={(e) => setMemberCount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
                  <span>200 (Chama / Small Sacco)</span>
                  <span>10,000</span>
                  <span>25,000+ (Tier-1 Sacco)</span>
                </div>
              </div>

              {/* Monthly Loans Slider */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#800020]" />
                    <span>Monthly Loan Applications</span>
                  </label>
                  <span className="text-sm font-black text-[#800020] bg-[#800020]/10 px-2.5 py-0.5 rounded border border-[#800020]/20 font-mono">
                    {avgMonthlyLoans} Loans/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={avgMonthlyLoans}
                  onChange={(e) => setAvgMonthlyLoans(Number(e.target.value))}
                  className="w-full accent-[#800020] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
                  <span>10 loans</span>
                  <span>500 loans</span>
                  <span>1,000+ loans/month</span>
                </div>
              </div>

              {/* Average Loan Size */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Average Principal per Loan</span>
                  </label>
                  <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                    {formatKES(avgLoanSize)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={avgLoanSize}
                  onChange={(e) => setAvgLoanSize(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
                  <span>KES 20K</span>
                  <span>KES 500K</span>
                  <span>KES 1M</span>
                </div>
              </div>

            </div>

            {/* Live Projected Savings Output Card */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border-2 border-blue-600 shadow-md">
              <div className="text-xs uppercase font-black tracking-wider text-slate-600">
                Estimated Annual Cooperative Value Created
              </div>
              <div className="text-3xl sm:text-4xl font-black text-blue-700 mt-1 font-mono">
                {formatKES(roiMetrics.totalAnnualSavings)}
                <span className="text-xs font-bold text-slate-600 ml-1">/ year savings</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-600 uppercase">Stationery & Paperless</div>
                  <div className="text-base font-black text-slate-900 font-mono mt-1">
                    {formatKES(roiMetrics.annualStationerySavings)}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">Eliminates physical ledger printing</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold text-slate-600 uppercase">M-Pesa Reconciliation</div>
                  <div className="text-base font-black text-slate-900 font-mono mt-1">
                    {formatKES(roiMetrics.annualStaffReconciliationSavings)}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">540+ staff hours saved annually</div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 sm:col-span-2">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase">
                    Guarantor Lock & NPL Default Reduction (2.4%)
                  </div>
                  <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                    {formatKES(roiMetrics.defaultReductionSavings)}
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">
                    Smart contract cryptographic holds prevent members from guarantor release before clearance
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Projected System Payback Period:</span>
                <span className="font-black text-blue-700 font-mono bg-white px-2.5 py-1 rounded shadow-xs">
                  {roiMetrics.paybackPeriodMonths} Months
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Side-by-Side Comparison Matrix (Why SaccoMIS Beats Legacy & Excel) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#800020] bg-[#800020]/10 px-3 py-1 rounded border border-[#800020]/20">
              System Comparison
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              How SaccoMIS Compares to Traditional Methods
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              See why forward-thinking SACCOs in Bomet, Kericho, Nakuru, and Nairobi are switching from legacy desktop systems.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <thead className="bg-slate-100 text-slate-900 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Operational Capability</th>
                  <th className="p-4 text-slate-500">Excel / Manual Registers</th>
                  <th className="p-4 text-slate-700">Legacy Desktop Systems</th>
                  <th className="p-4 bg-blue-50 text-blue-900 font-black border-l-2 border-blue-600">
                    SACCO Management System
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Audit Trail & Record Tampering</td>
                  <td className="p-4 text-rose-600 font-semibold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Easily edited / No audit trail</span>
                  </td>
                  <td className="p-4 text-amber-700">Standard database, can be altered by DB admin</td>
                  <td className="p-4 bg-blue-50/70 font-black text-emerald-800 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cryptographic SHA-256 blocks (100% Immutable)</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">M-Pesa STK & Instant Receipting</td>
                  <td className="p-4 text-rose-600 font-semibold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Manual entry of SMS codes</span>
                  </td>
                  <td className="p-4 text-slate-700">Delayed batch file imports (end of day)</td>
                  <td className="p-4 bg-blue-50/70 font-black text-blue-900 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Live Daraja STK Push & Instant SMS voucher</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Interest Rate Calculation Engine</td>
                  <td className="p-4 text-rose-600 font-semibold">Error-prone manual formulas</td>
                  <td className="p-4 text-slate-700">Flat rate only / rigid reducing balance</td>
                  <td className="p-4 bg-blue-50/70 font-black text-blue-900 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automated Annuity Reducing Balance + Insurance</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">SASRA Regulatory Return Generation</td>
                  <td className="p-4 text-rose-600 font-semibold">2 - 3 weeks of manual auditor overtime</td>
                  <td className="p-4 text-slate-700">Several days of export & manual adjustments</td>
                  <td className="p-4 bg-blue-50/70 font-black text-emerald-800 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>1-Click Automated SASRA C-30 Form & Trial Balance</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Guarantor Multi-Sign & Loan Security</td>
                  <td className="p-4 text-rose-600 font-semibold">Paper signature slips (easily forged)</td>
                  <td className="p-4 text-slate-700">Manual teller verification</td>
                  <td className="p-4 bg-blue-50/70 font-black text-blue-900 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Automated Share Capital & Deposit Lock hold</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Member Portal & Mobile Access</td>
                  <td className="p-4 text-rose-600 font-semibold">Physical visits to SACCO branch only</td>
                  <td className="p-4 text-slate-700">Requires on-premise local network</td>
                  <td className="p-4 bg-blue-50/70 font-black text-blue-900 border-l-2 border-blue-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>24/7 Mobile & Web self-service portal</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. SASRA & Kenyan Regulatory Certifications Trust Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">SASRA Act (Cap 490B) Compliant</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Adheres strictly to Sacco Societies Regulatory Authority standards, core capital ratios, liquidity requirements, and classification of loan assets.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#800020]/5 border border-[#800020]/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#800020] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Data Protection Act 2019 (ODPC)</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Strict data privacy controls, end-to-end 256-bit encryption, role-based access control (RBAC), and audited teller activity logs.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Direct Cooperative Bank & KRA Integration</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Direct EFT/RTGS bank reconciliation, automated Withholding Tax (WHT) on member dividends, and KRA iTax schedule exports.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#800020] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-xl sm:text-2xl font-black">
              Ready to Upgrade Your SACCO to Blockchain Precision?
            </h4>
            <p className="text-xs text-rose-100 mt-1 max-w-xl">
              Schedule a 30-minute private consultation with the <strong>CompTech Solution Engineering Team</strong>. We can demo with your sample chart of accounts or test data.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/254700276320?text=Hello%20CompTech%20Solution,%20we%20want%20to%20schedule%20a%20SaccoMIS%20cooperative%20system%20demo."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp Us: +254 700 276 320</span>
            </a>
            <button
              onClick={onOpenDemoModal}
              className="px-5 py-3 rounded-xl bg-white text-[#800020] hover:bg-rose-50 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Book System Presentation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
