import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  Percent, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  FileSpreadsheet, 
  ArrowRight, 
  Check, 
  Sparkles,
  ChevronDown,
  Layers,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { calculateLoanDetails, formatKES } from '../utils/calculator';

interface InterestCalculatorProps {
  onApplyWithDetails?: (principal: number, tenure: number, rate: number) => void;
  initialPrincipal?: number;
  initialTenure?: number;
  initialRate?: number;
}

export const InterestCalculator: React.FC<InterestCalculatorProps> = ({
  onApplyWithDetails,
  initialPrincipal = 50000,
  initialTenure = 12,
  initialRate = 14,
}) => {
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [tenureMonths, setTenureMonths] = useState<number>(initialTenure);
  const [interestRateAnnual, setInterestRateAnnual] = useState<number>(initialRate);
  const [method, setMethod] = useState<'reducing' | 'flat'>('reducing');
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(1.0);
  const [insurancePercent, setInsurancePercent] = useState<number>(1.5);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const presets = [10000, 25000, 50000, 100000, 250000, 500000];

  const results = useMemo(() => {
    return calculateLoanDetails({
      principal,
      tenureMonths,
      interestRateAnnual,
      method,
      processingFeePercent,
      insurancePercent,
    });
  }, [principal, tenureMonths, interestRateAnnual, method, processingFeePercent, insurancePercent]);

  const copyScheduleSummary = () => {
    const summary = `--- SACCO LOAN CALCULATION BREAKDOWN ---
Method: ${method === 'reducing' ? 'Reducing Balance (Annuity)' : 'Flat Rate'}
Principal: ${formatKES(principal)}
Tenure: ${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} years)
Interest Rate: ${interestRateAnnual}% p.a. (${(interestRateAnnual / 12).toFixed(2)}% monthly)
--- DEDUCTIONS ---
Processing Fee (${processingFeePercent}%): ${formatKES(results.processingFee)}
Insurance (${insurancePercent}%): ${formatKES(results.insuranceFee)}
Net Disbursed to Member: ${formatKES(results.netDisbursement)}
--- REPAYMENTS ---
Monthly Installment: ${formatKES(results.monthlyPayment)}
Total Interest: ${formatKES(results.totalInterest)}
Total Repayment: ${formatKES(results.totalRepayment)}
Effective APR: ${results.effectiveApr}%`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <section id="calculator" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Automated Financial Modeling</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Automated SACCO Interest Rate & Loan Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Simulate monthly loan repayments, compare Reducing Balance vs. Flat Rate algorithms, and compute net disbursements with SACCO insurance deductions.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Form (Left Column) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-5">
            
            {/* Method Switcher */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Interest Calculation Method
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setMethod('reducing')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    method === 'reducing'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Reducing Balance (Annuity)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('flat')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    method === 'flat'
                      ? 'bg-[#800020] text-white shadow-xs'
                      : 'text-slate-700 hover:text-black'
                  }`}
                >
                  Flat Rate
                </button>
              </div>
            </div>

            {/* Principal Slider & Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Loan Principal (KES)
                </label>
                <span className="text-sm font-black text-blue-700 font-mono">
                  {formatKES(principal)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={2000000}
                step={5000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {presets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPrincipal(amt)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                      principal === amt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-blue-400'
                    }`}
                  >
                    {amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Repayment Tenure
                </label>
                <span className="text-sm font-black text-slate-900 font-mono">
                  {tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} yrs)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={72}
                step={1}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
                <span>1 Mo</span>
                <span>12 Mo (1 yr)</span>
                <span>24 Mo (2 yr)</span>
                <span>48 Mo (4 yr)</span>
                <span>72 Mo (6 yr)</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Annual Interest Rate (%)
                </label>
                <span className="text-sm font-black text-slate-900 font-mono">
                  {interestRateAnnual}% p.a. ({(interestRateAnnual / 12).toFixed(2)}% / mo)
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={36}
                step={0.5}
                value={interestRateAnnual}
                onChange={(e) => setInterestRateAnnual(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Deductions Config */}
            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Processing Fee %</label>
                <input
                  type="number"
                  step={0.25}
                  value={processingFeePercent}
                  onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Insurance Fee %</label>
                <input
                  type="number"
                  step={0.25}
                  value={insurancePercent}
                  onChange={(e) => setInsurancePercent(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Results Card (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Result Hero */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                Estimated Monthly Repayment
              </div>
              <div className="text-4xl sm:text-5xl font-black text-blue-700 font-mono tracking-tight">
                {formatKES(results.monthlyPayment)}
                <span className="text-sm text-slate-500 font-sans font-normal ml-2">/ month</span>
              </div>

              {/* Net Disbursement Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-black">Net Cash Disbursed</span>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                    {formatKES(results.netDisbursement)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-black">Total Interest</span>
                  <div className="text-base font-black text-[#800020] font-mono mt-0.5">
                    {formatKES(results.totalInterest)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-black">Total Sacco Repayment</span>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                    {formatKES(results.totalRepayment)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyScheduleSummary}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedNotification ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Loan Quote</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>{showFullSchedule ? 'Hide Amortization Table' : 'View Full Amortization Table'}</span>
                </button>

                {onApplyWithDetails && (
                  <button
                    type="button"
                    onClick={() => onApplyWithDetails(principal, tenureMonths, interestRateAnnual)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
                  >
                    <span>Apply This Loan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Amortization Table Collapse */}
            {showFullSchedule && (
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs animate-in fade-in">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {method === 'reducing' ? 'Reducing Balance' : 'Flat Rate'} Amortization Schedule (First 12 Months)
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Currency: KES</span>
                </div>

                <div className="overflow-x-auto max-h-72">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-800 uppercase font-black text-[10px] sticky top-0">
                      <tr>
                        <th className="px-3 py-2">Month</th>
                        <th className="px-3 py-2">Principal Paid</th>
                        <th className="px-3 py-2">Interest Paid</th>
                        <th className="px-3 py-2">Total Installment</th>
                        <th className="px-3 py-2">Ending Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                      {results.schedule.slice(0, 12).map((row) => (
                        <tr key={row.month} className="hover:bg-blue-50/40">
                          <td className="px-3 py-2 font-sans font-bold text-slate-900">Mo {row.month}</td>
                          <td className="px-3 py-2">{formatKES(row.principal)}</td>
                          <td className="px-3 py-2 text-[#800020]">{formatKES(row.interest)}</td>
                          <td className="px-3 py-2 font-bold text-slate-900">{formatKES(row.totalPayment)}</td>
                          <td className="px-3 py-2 text-blue-700">{formatKES(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
