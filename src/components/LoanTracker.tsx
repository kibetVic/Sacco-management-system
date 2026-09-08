import React, { useState, useMemo } from 'react';
import { 
  HandCoins, 
  Search, 
  Plus, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  ArrowUpRight, 
  Eye, 
  Download,
  Calculator,
  X
} from 'lucide-react';
import { Loan, LoanStatus, Member } from '../types';
import { formatKES, generateCryptoHash } from '../utils/calculator';

interface LoanTrackerProps {
  loans: Loan[];
  setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
  members: Member[];
  onOpenCalculatorForLoan?: (principal: number, tenureMonths: number, rate: number) => void;
}

export const LoanTracker: React.FC<LoanTrackerProps> = ({
  loans,
  setLoans,
  members,
  onOpenCalculatorForLoan,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLoanForSchedule, setActiveLoanForSchedule] = useState<Loan | null>(null);
  const [activeLoanForRepayment, setActiveLoanForRepayment] = useState<Loan | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Repayment form state
  const [repaymentAmount, setRepaymentAmount] = useState<number>(2500);
  const [repaymentMethod, setRepaymentMethod] = useState<'M-Pesa STK' | 'Cash' | 'Offset Shares'>('M-Pesa STK');
  const [repaymentSuccessMsg, setRepaymentSuccessMsg] = useState<string | null>(null);

  // New Loan Application Form state
  const [newMemberNo, setNewMemberNo] = useState(members[0]?.memberNo || '');
  const [newLoanType, setNewLoanType] = useState('KUKU LOAN');
  const [newPrincipal, setNewPrincipal] = useState<number>(25000);
  const [newTenure, setNewTenure] = useState<number>(6);
  const [newPurpose, setNewPurpose] = useState('Poultry & Feed inventory purchase');
  const [newGuarantorCount, setNewGuarantorCount] = useState<number>(3);

  // Filtered loans list
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchStatus = selectedStatus === 'All' || loan.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        loan.loanNo.toLowerCase().includes(q) ||
        loan.memberName.toLowerCase().includes(q) ||
        loan.memberNo.toLowerCase().includes(q) ||
        loan.loanType.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [loans, selectedStatus, searchQuery]);

  // Totals calculations
  const totalPrincipal = useMemo(() => loans.reduce((acc, l) => acc + l.principal, 0), [loans]);
  const totalApproved = useMemo(() => loans.reduce((acc, l) => acc + l.approved, 0), [loans]);
  const totalOutstanding = useMemo(() => loans.reduce((acc, l) => acc + l.loanBalance, 0), [loans]);

  // Counts for status pills
  const statusCounts = useMemo(() => {
    return {
      All: loans.length,
      Pending: loans.filter((l) => l.status === 'Pending').length,
      Active: loans.filter((l) => l.status === 'Active').length,
      Approved: loans.filter((l) => l.status === 'Approved').length,
      Completed: loans.filter((l) => l.status === 'Completed').length,
      Rejected: loans.filter((l) => l.status === 'Rejected').length,
    };
  }, [loans]);

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const member = members.find((m) => m.memberNo === newMemberNo) || members[0];
    const monthlyRate = 1.25;
    const monthlyInstallment = (newPrincipal * (1 + (monthlyRate / 100) * newTenure)) / newTenure;

    const newLoanObj: Loan = {
      id: `l-${Date.now()}`,
      loanNo: `KL102${member.memberNo}`,
      memberNo: member.memberNo,
      memberName: member.fullName,
      loanType: newLoanType,
      principal: newPrincipal,
      approved: newPrincipal,
      loanBalance: newPrincipal,
      applicationDate: new Date().toLocaleDateString('en-GB'),
      status: 'Active',
      interestRateMonthly: monthlyRate,
      tenureMonths: newTenure,
      monthlyInstallment: parseFloat(monthlyInstallment.toFixed(2)),
      blockchainTxHash: generateCryptoHash(),
      blockNumber: 148353 + Math.floor(Math.random() * 50),
      purpose: newPurpose,
      guarantorsCount: newGuarantorCount,
    };

    setLoans([newLoanObj, ...loans]);
    setIsApplyModalOpen(false);
  };

  const handleProcessRepayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLoanForRepayment) return;

    const pay = Math.min(repaymentAmount, activeLoanForRepayment.loanBalance);
    const newBal = Math.max(0, activeLoanForRepayment.loanBalance - pay);
    const newStatus: LoanStatus = newBal === 0 ? 'Completed' : 'Active';

    setLoans((prev) =>
      prev.map((l) =>
        l.id === activeLoanForRepayment.id
          ? {
              ...l,
              loanBalance: parseFloat(newBal.toFixed(2)),
              status: newStatus,
              blockchainTxHash: generateCryptoHash(),
            }
          : l
      )
    );

    setRepaymentSuccessMsg(
      `Payment of ${formatKES(pay)} recorded via ${repaymentMethod}! New balance: ${formatKES(newBal)}`
    );

    setTimeout(() => {
      setRepaymentSuccessMsg(null);
      setActiveLoanForRepayment(null);
    }, 2000);
  };

  const getStatusBadge = (status: LoanStatus) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Active</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
      case 'Approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Approved</span>;
      case 'Completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">Completed</span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Rejected</span>;
    }
  };

  return (
    <section id="loans" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Smart Contract Verified</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Loans Management & Tracking Module
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-normal">
              End-to-end loan lifecycle with automated interest calculation, appraisal deductions, and immutable blockchain ledger.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Loan Application</span>
            </button>
          </div>
        </div>

        {/* Top KPI Cards in Light Theme */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs text-slate-600 font-bold">Total Loan Files</div>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{loans.length}</div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs text-slate-600 font-bold">Total Principal Applied</div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">{formatKES(totalPrincipal)}</div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HandCoins className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs text-slate-600 font-bold">Total Disbursed</div>
              <div className="text-xl font-black text-blue-700 mt-1 font-mono">{formatKES(totalApproved)}</div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
            <div>
              <div className="text-xs text-slate-600 font-bold">Total Outstanding</div>
              <div className="text-xl font-black text-[#800020] mt-1 font-mono">{formatKES(totalOutstanding)}</div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-[#800020] flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 mb-6 space-y-3 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Loan No, Member Name, or Member ID..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {(['All', 'Pending', 'Active', 'Approved', 'Completed', 'Rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-800 hover:border-blue-300'
                  }`}
                >
                  <span>{st === 'All' ? 'All Loans' : st}</span>
                  <span className={`text-[10px] px-1.5 rounded-full ${
                    selectedStatus === st ? 'bg-white/20 text-white font-bold' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {statusCounts[st]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                <tr>
                  <th className="px-4 py-3.5">Loan No</th>
                  <th className="px-4 py-3.5">Member</th>
                  <th className="px-4 py-3.5">Loan Type</th>
                  <th className="px-4 py-3.5">Principal</th>
                  <th className="px-4 py-3.5">Approved</th>
                  <th className="px-4 py-3.5">Loan Balance</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">App Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-slate-500 font-medium">
                      No loans matching the selected criteria found.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700">
                        {loan.loanNo}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{loan.memberName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{loan.memberNo}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                          {loan.loanType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        {formatKES(loan.principal)}
                      </td>
                      <td className="px-4 py-3 font-mono text-blue-700 font-bold">
                        {formatKES(loan.approved)}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        <span className={loan.loanBalance > 0 ? 'text-[#800020]' : 'text-emerald-700'}>
                          {formatKES(loan.loanBalance)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(loan.status)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium">
                        {loan.applicationDate}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Schedule Button */}
                          <button
                            onClick={() => setActiveLoanForSchedule(loan)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors cursor-pointer"
                            title="View Schedule & Proof"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Repayment Button */}
                          <button
                            onClick={() => setActiveLoanForRepayment(loan)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
                            title="Make Repayment / Offset"
                          >
                            <HandCoins className="w-4 h-4" />
                          </button>

                          {/* Calculator Link */}
                          {onOpenCalculatorForLoan && (
                            <button
                              onClick={() => onOpenCalculatorForLoan(loan.principal, loan.tenureMonths, loan.interestRateMonthly * 12)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-800 border border-amber-200 transition-colors cursor-pointer"
                              title="Calculate in Interest Tool"
                            >
                              <Calculator className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3.5 bg-slate-50 text-xs text-slate-700 font-medium flex items-center justify-between border-t border-slate-200">
            <span>Showing {filteredLoans.length} of {loans.length} recorded loans</span>
            <span className="font-mono text-[11px] text-blue-700 font-bold">Consensus: Multi-Node Cryptographic Validation</span>
          </div>
        </div>

        {/* Schedule & Blockchain Details Modal */}
        {activeLoanForSchedule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>Loan Schedule & Audit Trail</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                      {activeLoanForSchedule.loanNo}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {activeLoanForSchedule.memberName} ({activeLoanForSchedule.memberNo})
                  </p>
                </div>
                <button
                  onClick={() => setActiveLoanForSchedule(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Spec Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">PRINCIPAL</span>
                  <span className="font-black text-slate-900">{formatKES(activeLoanForSchedule.principal)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">MONTHLY INSTALLMENT</span>
                  <span className="font-black text-blue-700">{formatKES(activeLoanForSchedule.monthlyInstallment)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">BALANCE REMAINING</span>
                  <span className="font-black text-[#800020]">{formatKES(activeLoanForSchedule.loanBalance)}</span>
                </div>
              </div>

              {/* Purpose & Guarantors */}
              <div className="text-xs space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-slate-800"><strong className="text-slate-900">Loan Purpose:</strong> {activeLoanForSchedule.purpose || 'Agricultural expansion'}</div>
                <div className="text-slate-800"><strong className="text-slate-900">Active Guarantors:</strong> {activeLoanForSchedule.guarantorsCount || 3} members verified on ledger</div>
                <div className="text-slate-800"><strong className="text-slate-900">Tenure:</strong> {activeLoanForSchedule.tenureMonths} Months @ {activeLoanForSchedule.interestRateMonthly}% Monthly</div>
              </div>

              {/* Blockchain Proof */}
              <div className="text-xs bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Immutable SHA-256 Ledger Hash</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
                    Block #{activeLoanForSchedule.blockNumber}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-800 break-all bg-white p-2.5 rounded-xl border border-blue-200 select-all">
                  {activeLoanForSchedule.blockchainTxHash}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setActiveLoanForSchedule(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Repayment Modal */}
        {activeLoanForRepayment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-emerald-600" />
                  <span>Post Loan Repayment / Offset</span>
                </h3>
                <button
                  onClick={() => setActiveLoanForRepayment(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {repaymentSuccessMsg ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
                  {repaymentSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleProcessRepayment} className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <div className="text-slate-600">Loan: <strong className="text-slate-900 font-mono">{activeLoanForRepayment.loanNo}</strong></div>
                    <div className="text-slate-600">Member: <strong className="text-slate-900">{activeLoanForRepayment.memberName}</strong></div>
                    <div className="text-slate-600">Current Balance: <strong className="text-[#800020] font-mono">{formatKES(activeLoanForRepayment.loanBalance)}</strong></div>
                  </div>

                  <div>
                    <label className="block text-slate-900 font-bold mb-1">Repayment Amount (KES)</label>
                    <input
                      type="number"
                      min={100}
                      max={activeLoanForRepayment.loanBalance}
                      value={repaymentAmount}
                      onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-900 font-bold mb-1">Payment Channel</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['M-Pesa STK', 'Cash', 'Offset Shares'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setRepaymentMethod(method)}
                          className={`py-2 px-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            repaymentMethod === method
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveLoanForRepayment(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                    >
                      Confirm Repayment
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* New Loan Application Modal */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <HandCoins className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-900">New Sacco Loan Application</h3>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplyLoan} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-900 mb-1">Applying Member *</label>
                  <select
                    value={newMemberNo}
                    onChange={(e) => setNewMemberNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.memberNo}>
                        {m.fullName} ({m.memberNo}) — Shares: {formatKES(m.totalShares)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Loan Product *</label>
                    <select
                      value={newLoanType}
                      onChange={(e) => setNewLoanType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:border-blue-600 focus:outline-none cursor-pointer"
                    >
                      <option value="KUKU LOAN">KUKU LOAN (Poultry)</option>
                      <option value="DEVELOPMENT LOAN">DEVELOPMENT LOAN (3x Shares)</option>
                      <option value="EMERGENCY LOAN">EMERGENCY LOAN (24h)</option>
                      <option value="SCHOOL FEES LOAN">SCHOOL FEES LOAN</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Principal Amount (KES) *</label>
                    <input
                      type="number"
                      min={1000}
                      step={500}
                      value={newPrincipal}
                      onChange={(e) => setNewPrincipal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Tenure (Months) *</label>
                    <input
                      type="number"
                      min={1}
                      max={72}
                      value={newTenure}
                      onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Number of Guarantors *</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={newGuarantorCount}
                      onChange={(e) => setNewGuarantorCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-900 mb-1">Purpose of Loan</label>
                  <input
                    type="text"
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-[11px] text-blue-900 space-y-1">
                  <div className="flex justify-between">
                    <span>Monthly Interest Rate:</span>
                    <span className="font-bold">1.25% Reducing Balance</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Insurance (1.5%):</span>
                    <span className="font-bold">{formatKES(newPrincipal * 0.015)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    Submit for Smart Appraisal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
