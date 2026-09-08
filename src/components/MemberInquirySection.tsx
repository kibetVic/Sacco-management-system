import React, { useState } from 'react';
import { 
  Search, 
  UserCheck, 
  CreditCard, 
  PiggyBank, 
  Send, 
  MessageCircle, 
  Printer, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Receipt,
  Download,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import { Member, Loan, Contribution } from '../types';
import { formatKES } from '../utils/calculator';

interface MemberInquirySectionProps {
  members: Member[];
  loans: Loan[];
  contributions: Contribution[];
}

export const MemberInquirySection: React.FC<MemberInquirySectionProps> = ({
  members,
  loans,
  contributions,
}) => {
  const [searchTerm, setSearchTerm] = useState('MBR001');
  const [selectedMember, setSelectedMember] = useState<Member>(members[0] || null);
  
  // Inquiry form states
  const [inquiryType, setInquiryType] = useState<string>('Loan Balance & Clearance Statement');
  const [inquiryNotes, setInquiryNotes] = useState<string>('');
  const [inquiryStatus, setInquiryStatus] = useState<string | null>(null);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);

  // Search handler
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const found = members.find(
      (m) =>
        m.memberNo.toLowerCase().includes(query) ||
        m.fullName.toLowerCase().includes(query) ||
        m.idNumber.toLowerCase().includes(query) ||
        m.phone.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedMember(found);
    }
  };

  // Quick select
  const selectQuickMember = (member: Member) => {
    setSelectedMember(member);
    setSearchTerm(member.memberNo);
    setInquiryStatus(null);
  };

  // Filter member data
  const memberLoans = selectedMember
    ? loans.filter((l) => l.memberNo === selectedMember.memberNo)
    : [];
  
  const memberContributions = selectedMember
    ? contributions.filter((c) => c.memberNo === selectedMember.memberNo)
    : [];

  // Group contributions by share type
  const shareCapitalTotal = memberContributions
    .filter((c) => c.shareType === 'Share Capital')
    .reduce((sum, c) => sum + c.amount, 0) || (selectedMember?.totalShares || 0);

  const nonWithdrawableDeposits = memberContributions
    .filter((c) => c.shareType === 'Non-Withdrawable Deposits')
    .reduce((sum, c) => sum + c.amount, 0) || (selectedMember?.totalDeposits || 0);

  const withdrawableDeposits = memberContributions
    .filter((c) => c.shareType === 'Withdrawable Deposits')
    .reduce((sum, c) => sum + c.amount, 0);

  const registrationFees = memberContributions
    .filter((c) => c.shareType === 'Registration Fees')
    .reduce((sum, c) => sum + c.amount, 0);

  const totalMemberSavings = shareCapitalTotal + nonWithdrawableDeposits + withdrawableDeposits;

  // Loan metrics
  const totalLoanPrincipal = memberLoans.reduce((sum, l) => sum + l.principal, 0);
  const totalLoanBalance = memberLoans.reduce((sum, l) => sum + l.loanBalance, 0);
  const totalMonthlyInstallment = memberLoans.reduce((sum, l) => sum + l.monthlyInstallment, 0);

  // Borrowing eligibility (3x multiplier rule in Kenyan SACCOs)
  const borrowingCapacity = nonWithdrawableDeposits * 3;
  const availableBorrowingHeadroom = Math.max(0, borrowingCapacity - totalLoanBalance);
  const isOverLeveraged = totalLoanBalance > borrowingCapacity;

  // Submit formal inquiry
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const ticketNo = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const subject = encodeURIComponent(`[SACCO Inquiry ${ticketNo}] ${selectedMember.fullName} (${selectedMember.memberNo}) - ${inquiryType}`);
    const body = encodeURIComponent(
      `Hello CompTech Solution Support Team,\n\n` +
      `MEMBER SELF-SERVICE INQUIRY TICKET: ${ticketNo}\n` +
      `Member Name: ${selectedMember.fullName}\n` +
      `Member No: ${selectedMember.memberNo}\n` +
      `National ID: ${selectedMember.idNumber}\n` +
      `Phone: ${selectedMember.phone}\n` +
      `Inquiry Category: ${inquiryType}\n\n` +
      `--- FINANCIAL SUMMARY AT TIME OF INQUIRY ---\n` +
      `Total Share Capital: ${formatKES(shareCapitalTotal)}\n` +
      `Non-Withdrawable Deposits: ${formatKES(nonWithdrawableDeposits)}\n` +
      `Total Active Loan Balance: ${formatKES(totalLoanBalance)}\n` +
      `Available Borrowing Limit: ${formatKES(availableBorrowingHeadroom)}\n\n` +
      `--- INQUIRY DETAILS / REQUEST ---\n` +
      `${inquiryNotes || 'Kindly generate and verify our official loan amortization schedule and statement of shares.'}\n\n` +
      `Thank you,\n${selectedMember.fullName}`
    );

    const mailto = `mailto:kibetvic98@gmail.com?subject=${subject}&body=${body}`;
    setInquiryStatus(ticketNo);
    window.location.href = mailto;
  };

  const whatsAppInquiryUrl = selectedMember
    ? `https://wa.me/254700276320?text=${encodeURIComponent(
        `Hello CompTech Solution Support, I am inquiring on behalf of Member ${selectedMember.fullName} (${selectedMember.memberNo}, Phone: ${selectedMember.phone}). Inquiry: ${inquiryType}. Active Loan Balance: ${formatKES(totalLoanBalance)}, Deposits: ${formatKES(nonWithdrawableDeposits)}.`
      )}`
    : '#';

  return (
    <section id="inquiry" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <Search className="w-3.5 h-3.5" />
              <span>Self-Service Member Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Member Loan & Shares Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">
              Real-time member self-service portal: Look up core share capital, non-withdrawable deposits, active loan obligations, borrowing capacity, and print official statements.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsAppInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </a>
            <button
              onClick={() => setIsStatementModalOpen(true)}
              disabled={!selectedMember}
              className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>Print Statement</span>
            </button>
          </div>
        </div>

        {/* Member Search & Quick Presets */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter Member No (e.g. MBR001), National ID, or Full Name..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs transition-all cursor-pointer"
              >
                Inquire Member
              </button>
            </form>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider shrink-0">
                Quick Sample:
              </span>
              {members.slice(0, 5).map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectQuickMember(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedMember?.id === m.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 hover:border-blue-300'
                  }`}
                >
                  {m.fullName.split(' ')[0]} ({m.memberNo})
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedMember ? (
          <div className="space-y-8">
            
            {/* 1. Member Profile & Status Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl border border-blue-200 shadow-inner">
                  {selectedMember.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      {selectedMember.fullName}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                      {selectedMember.status} KYC Verified
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-200">
                      {selectedMember.membershipType}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                    <span>Member No: <strong className="text-slate-900 font-mono">{selectedMember.memberNo}</strong></span>
                    <span>National ID: <strong className="text-slate-900 font-mono">{selectedMember.idNumber}</strong></span>
                    <span>Phone: <strong className="text-slate-900 font-mono">{selectedMember.phone}</strong></span>
                    <span>County: <strong className="text-slate-900">{selectedMember.county}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                <div className="text-left md:text-right">
                  <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Total Combined Equity</div>
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    {formatKES(totalMemberSavings)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold">
                    Borrowing Limit: {formatKES(borrowingCapacity)}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Key Inquiry Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Share Capital */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-600 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Share Capital</span>
                  <PiggyBank className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {formatKES(shareCapitalTotal)}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Permanent core equity. Non-withdrawable, earns annual dividends.
                </p>
              </div>

              {/* Non-Withdrawable Deposits */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-600 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">BOSA Deposits</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl font-black text-emerald-800 font-mono">
                  {formatKES(nonWithdrawableDeposits)}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Primary loan collateral. Qualifies for 3x loan borrowing multiplier.
                </p>
              </div>

              {/* Outstanding Loans */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-600 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Total Loan Balance</span>
                  <CreditCard className="w-4 h-4 text-[#800020]" />
                </div>
                <div className="text-xl font-black text-[#800020] font-mono">
                  {formatKES(totalLoanBalance)}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  {memberLoans.length} active loan accounts | Due: {formatKES(totalMonthlyInstallment)}/mo
                </p>
              </div>

              {/* Available Borrowing Headroom */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-slate-600 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Borrowing Headroom</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xl font-black text-blue-800 font-mono">
                  {formatKES(availableBorrowingHeadroom)}
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  {isOverLeveraged ? 'Max limit reached' : 'Free loan entitlement capacity'}
                </p>
              </div>

            </div>

            {/* 3. Detailed Tabs: Loans Breakdown & Shares Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Active Loans Inquiry */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#800020]" />
                      <h3 className="text-lg font-black text-slate-900">
                        Active Loan Inquiries ({memberLoans.length})
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Total Financed: {formatKES(totalLoanPrincipal)}
                    </span>
                  </div>

                  {memberLoans.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="text-sm font-black text-slate-900">No Active Debt Obligations</h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                        This member holds zero active loans and qualifies for instant facility approval up to <strong>{formatKES(borrowingCapacity)}</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {memberLoans.map((loan) => {
                        const paidAmount = loan.principal - loan.loanBalance;
                        const progressPct = Math.min(100, Math.round((paidAmount / loan.principal) * 100));

                        return (
                          <div
                            key={loan.id}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-mono text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                  {loan.loanNo}
                                </span>
                                <h4 className="text-sm font-black text-slate-900 mt-1">{loan.loanType}</h4>
                                <div className="text-[11px] text-slate-600 mt-0.5">
                                  Applied on {loan.applicationDate} | {loan.tenureMonths} Months @ {loan.interestRateMonthly}% p.m.
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-slate-500">Balance:</span>
                                <div className="text-base font-black text-[#800020] font-mono">
                                  {formatKES(loan.loanBalance)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-600">
                                  Installment: {formatKES(loan.monthlyInstallment)}/mo
                                </span>
                              </div>
                            </div>

                            {/* Repayment Progress */}
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                                <span className="text-slate-600">Repaid: {formatKES(paidAmount)} ({progressPct}%)</span>
                                <span className="text-slate-900 font-mono">Principal: {formatKES(loan.principal)}</span>
                              </div>
                              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full transition-all"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Contribution Breakdown by Share Type */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-black text-slate-900">
                        Contributions by Share Type
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-black text-blue-700">
                      {formatKES(totalMemberSavings)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                        <div>
                          <div className="font-bold text-slate-900">Share Capital (Class A)</div>
                          <div className="text-[10px] text-slate-500">Core ownership shares</div>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-slate-900">
                        {formatKES(shareCapitalTotal)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-emerald-600" />
                        <div>
                          <div className="font-bold text-slate-900">Non-Withdrawable Deposits</div>
                          <div className="text-[10px] text-slate-500">BOSA monthly savings (3x multiplier)</div>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-slate-900">
                        {formatKES(nonWithdrawableDeposits)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div>
                          <div className="font-bold text-slate-900">Withdrawable Deposits (FOSA)</div>
                          <div className="text-[10px] text-slate-500">Immediate access operational funds</div>
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-slate-900">
                        {formatKES(withdrawableDeposits)}
                      </div>
                    </div>

                    {registrationFees > 0 && (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-3 h-3 rounded-full bg-slate-400" />
                          <div>
                            <div className="font-bold text-slate-900">Registration / Entrance Fee</div>
                            <div className="text-[10px] text-slate-500">One-time cooperative admission fee</div>
                          </div>
                        </div>
                        <div className="text-right font-mono font-bold text-slate-900">
                          {formatKES(registrationFees)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Submit Member Service Inquiry */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
                  <div className="border-b border-slate-200 pb-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Direct Member Dispatch
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-2">
                      Submit Formal Inquiry / Statement Request
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Submitting issues an official support ticket and dispatches to CompTech Solution Ltd systems support.
                    </p>
                  </div>

                  {inquiryStatus && (
                    <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div>Ticket Generated: <strong className="font-mono">{inquiryStatus}</strong></div>
                        <p className="text-[11px] text-emerald-800 font-normal mt-0.5">
                          Your email application opened with full details. You can also confirm immediately via WhatsApp.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Inquiry / Service Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="Loan Balance & Clearance Statement">Loan Balance & Clearance Statement</option>
                        <option value="Share Capital & Deposit Top-Up Advice">Share Capital & Deposit Top-Up Advice</option>
                        <option value="Guarantor Release & Substitution Request">Guarantor Release & Substitution Request</option>
                        <option value="Annual Dividend & Rebates Calculation Query">Annual Dividend & Rebates Calculation Query</option>
                        <option value="Loan Restructuring / Tenure Extension">Loan Restructuring / Tenure Extension</option>
                        <option value="Member KYC & Next of Kin Amendment">Member KYC & Next of Kin Amendment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1">
                        Specific Question or Instructions
                      </label>
                      <textarea
                        rows={4}
                        value={inquiryNotes}
                        onChange={(e) => setInquiryNotes(e.target.value)}
                        placeholder="Provide details about your query (e.g. Please confirm when the school fees loan balance can be cleared for a new development loan application)..."
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:border-blue-600 focus:outline-none resize-none placeholder-slate-400 font-medium"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Email Inquiry</span>
                      </button>

                      <a
                        href={whatsAppInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                        <span>Inquire via WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center">
                      * Inquiries are registered securely in the blockchain ledger audit trail.
                    </p>
                  </form>
                </div>

                {/* Quick Notice */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
                  <div className="font-black text-blue-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <span>SASRA 3X Borrowing Rule Reminder</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-blue-950">
                    A member is entitled to borrow up to 300% of their non-withdrawable savings. For collateral backing, loans must be secured by member's own deposits and/or verified member guarantors.
                  </p>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No member found matching your query.</p>
            <p className="text-xs text-slate-500 mt-1">Try entering member number (e.g. MBR001) or click one of the quick presets above.</p>
          </div>
        )}

      </div>

      {/* Printable Statement Voucher Modal */}
      {isStatementModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            
            <div className="p-5 bg-gradient-to-r from-blue-900 to-[#800020] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-5 h-5 text-amber-300" />
                <div>
                  <h3 className="text-base font-black">Official Member Shares & Loan Statement</h3>
                  <p className="text-xs text-blue-100">CompTech Solution Ltd SaccoMIS Platform</p>
                </div>
              </div>
              <button
                onClick={() => setIsStatementModalOpen(false)}
                className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-slate-800">
              <div className="text-center border-b border-slate-200 pb-3">
                <div className="font-black text-lg text-slate-900">SACCOMIS COOPERATIVE SOCIETY</div>
                <div className="text-[11px] text-slate-600">CompTech Solution Ltd — Kahawa, Nairobi, Kenya</div>
                <div className="text-[11px] font-mono font-bold text-slate-700 mt-0.5">
                  Statement Date: {new Date().toLocaleDateString('en-GB')}
                </div>
              </div>

              {/* Member Details */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Member Name</span>
                  <div className="font-bold text-slate-900 font-sans">{selectedMember.fullName}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Member Number</span>
                  <div className="font-bold text-blue-700">{selectedMember.memberNo}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">National ID</span>
                  <div className="font-bold text-slate-900">{selectedMember.idNumber}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-sans">Phone</span>
                  <div className="font-bold text-slate-900">{selectedMember.phone}</div>
                </div>
              </div>

              {/* Share Breakdown Table */}
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[11px] mb-2 tracking-wider">
                  1. Member Shares & Deposit Holding
                </h4>
                <table className="w-full text-left font-mono">
                  <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-sans">
                    <tr>
                      <th className="p-2">Account Type</th>
                      <th className="p-2 text-right">Balance (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-sans">Share Capital (Permanent Core)</td>
                      <td className="p-2 text-right font-bold">{formatKES(shareCapitalTotal)}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-sans">Non-Withdrawable Savings (BOSA)</td>
                      <td className="p-2 text-right font-bold text-emerald-800">{formatKES(nonWithdrawableDeposits)}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-sans">Withdrawable Savings (FOSA)</td>
                      <td className="p-2 text-right font-bold">{formatKES(withdrawableDeposits)}</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                    <tr>
                      <td className="p-2 font-sans uppercase">Total Member Holding:</td>
                      <td className="p-2 text-right text-blue-800">{formatKES(totalMemberSavings)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Loan Breakdown Table */}
              <div>
                <h4 className="font-black text-slate-900 uppercase text-[11px] mb-2 tracking-wider">
                  2. Loan Accounts & Exposure
                </h4>
                {memberLoans.length === 0 ? (
                  <p className="text-slate-600 font-sans italic">No active loan accounts.</p>
                ) : (
                  <table className="w-full text-left font-mono">
                    <thead className="bg-slate-100 text-slate-700 text-[10px] uppercase font-sans">
                      <tr>
                        <th className="p-2">Loan No</th>
                        <th className="p-2">Type</th>
                        <th className="p-2 text-right">Principal</th>
                        <th className="p-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {memberLoans.map((l) => (
                        <tr key={l.id}>
                          <td className="p-2 text-blue-700">{l.loanNo}</td>
                          <td className="p-2 font-sans">{l.loanType}</td>
                          <td className="p-2 text-right">{formatKES(l.principal)}</td>
                          <td className="p-2 text-right font-bold text-[#800020]">{formatKES(l.loanBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                      <tr>
                        <td colSpan={3} className="p-2 font-sans uppercase">Total Outstanding Debt:</td>
                        <td className="p-2 text-right text-[#800020]">{formatKES(totalLoanBalance)}</td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>

              {/* Summary box */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 font-mono text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="font-sans text-slate-600">Max Borrowing Capacity (3X):</span>
                  <span className="font-bold text-slate-900">{formatKES(borrowingCapacity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-slate-600">Available Borrowing Limit:</span>
                  <span className="font-bold text-emerald-800">{formatKES(availableBorrowingHeadroom)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Generated securely via CompTech Solution SaccoMIS
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsStatementModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
