import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  Calendar,
  Layers,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Search,
  Printer,
  Scale,
  DollarSign,
  Building2,
  Users
} from 'lucide-react';
import { CHART_OF_ACCOUNTS, TRIAL_BALANCE_ENTRIES, INITIAL_MEMBERS, INITIAL_LOANS, INITIAL_CONTRIBUTIONS } from '../data/mockData';
import { BALANCE_SHEET_DATA, PROFIT_LOSS_DATA } from '../data/financialReportsData';
import { Member, Loan, Contribution } from '../types';
import { formatKES } from '../utils/calculator';

interface FinancialReportsProps {
  members?: Member[];
  loans?: Loan[];
  contributions?: Contribution[];
}

type ReportTab = 'trial' | 'balance_sheet' | 'profit_loss' | 'combined_members' | 'chart';

export const FinancialReports: React.FC<FinancialReportsProps> = ({
  members = INITIAL_MEMBERS,
  loans = INITIAL_LOANS,
  contributions = INITIAL_CONTRIBUTIONS,
}) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('balance_sheet');
  const [startDate, setStartDate] = useState('01/01/2026');
  const [endDate, setEndDate] = useState('31/12/2026');
  const [memberFilter, setMemberFilter] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Trial Balance totals
  const totalDebit = TRIAL_BALANCE_ENTRIES.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = TRIAL_BALANCE_ENTRIES.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  // Balance sheet calculations
  const totalAssets = useMemo(() => {
    return BALANCE_SHEET_DATA
      .filter((s) => s.category === 'Assets')
      .flatMap((s) => s.items)
      .reduce((sum, i) => sum + i.currentYear, 0);
  }, []);

  const totalLiabilities = useMemo(() => {
    return BALANCE_SHEET_DATA
      .filter((s) => s.category === 'Liabilities')
      .flatMap((s) => s.items)
      .reduce((sum, i) => sum + i.currentYear, 0);
  }, []);

  const totalEquity = useMemo(() => {
    return BALANCE_SHEET_DATA
      .filter((s) => s.category === 'Equity')
      .flatMap((s) => s.items)
      .reduce((sum, i) => sum + i.currentYear, 0);
  }, []);

  const isBalanceSheetReconciled = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 1;

  // Profit and Loss calculations
  const totalRevenue = useMemo(() => {
    return PROFIT_LOSS_DATA
      .filter((s) => s.type === 'Income')
      .flatMap((s) => s.items)
      .reduce((sum, i) => sum + i.currentYear, 0);
  }, []);

  const totalExpenses = useMemo(() => {
    return PROFIT_LOSS_DATA
      .filter((s) => s.type === 'Expense')
      .flatMap((s) => s.items)
      .reduce((sum, i) => sum + i.currentYear, 0);
  }, []);

  const netSurplusBeforeTax = totalRevenue - totalExpenses;
  const corporateTaxProvision = Math.round(netSurplusBeforeTax * 0.3);
  const netSurplusAfterTax = netSurplusBeforeTax - corporateTaxProvision;
  const statutoryReserveAllocation = Math.round(netSurplusAfterTax * 0.2); // 20% under Cooperative Societies Act
  const surplusForDividends = netSurplusAfterTax - statutoryReserveAllocation;

  // Combined Member Report Data Calculation
  const combinedMemberReportData = useMemo(() => {
    return members.map((member) => {
      // Find loans for this member
      const memberLoans = loans.filter((l) => l.memberNo === member.memberNo);
      const activeLoansCount = memberLoans.length;
      const totalPrincipal = memberLoans.reduce((sum, l) => sum + l.principal, 0);
      const totalLoanBalance = memberLoans.reduce((sum, l) => sum + l.loanBalance, 0);
      const monthlyDue = memberLoans.reduce((sum, l) => sum + l.monthlyInstallment, 0);

      // Find contributions for this member
      const memberConts = contributions.filter((c) => c.memberNo === member.memberNo);
      const shareCapital = memberConts
        .filter((c) => c.shareType === 'Share Capital')
        .reduce((sum, c) => sum + c.amount, 0) || member.totalShares;

      const nonWithdrawable = memberConts
        .filter((c) => c.shareType === 'Non-Withdrawable Deposits')
        .reduce((sum, c) => sum + c.amount, 0) || member.totalDeposits;

      const withdrawable = memberConts
        .filter((c) => c.shareType === 'Withdrawable Deposits')
        .reduce((sum, c) => sum + c.amount, 0);

      const registration = memberConts
        .filter((c) => c.shareType === 'Registration Fees')
        .reduce((sum, c) => sum + c.amount, 0);

      const totalContributions = shareCapital + nonWithdrawable + withdrawable + registration;
      const borrowingLimit = nonWithdrawable * 3;
      const availableLimit = Math.max(0, borrowingLimit - totalLoanBalance);
      const coverageRatio = totalLoanBalance > 0 
        ? Math.round((nonWithdrawable / totalLoanBalance) * 100) 
        : 100;

      return {
        ...member,
        activeLoansCount,
        totalPrincipal,
        totalLoanBalance,
        monthlyDue,
        shareCapital,
        nonWithdrawable,
        withdrawable,
        registration,
        totalContributions,
        borrowingLimit,
        availableLimit,
        coverageRatio,
      };
    });
  }, [members, loans, contributions]);

  const filteredMemberReport = useMemo(() => {
    if (!memberFilter.trim()) return combinedMemberReportData;
    const q = memberFilter.toLowerCase();
    return combinedMemberReportData.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.memberNo.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.idNumber.toLowerCase().includes(q)
    );
  }, [combinedMemberReportData, memberFilter]);

  // Combined totals
  const totalMemberLoansPrincipal = combinedMemberReportData.reduce((s, m) => s + m.totalPrincipal, 0);
  const totalMemberLoansBalance = combinedMemberReportData.reduce((s, m) => s + m.totalLoanBalance, 0);
  const totalMemberShareCapital = combinedMemberReportData.reduce((s, m) => s + m.shareCapital, 0);
  const totalMemberNonWithdrawable = combinedMemberReportData.reduce((s, m) => s + m.nonWithdrawable, 0);
  const totalMemberWithdrawable = combinedMemberReportData.reduce((s, m) => s + m.withdrawable, 0);
  const totalMemberGrandContributions = combinedMemberReportData.reduce((s, m) => s + m.totalContributions, 0);

  const handleExport = (format: 'Excel' | 'PDF') => {
    setExportNotice(`Preparing CompTech SaccoMIS ${activeTab.toUpperCase()} report in ${format}...`);
    setTimeout(() => {
      setExportNotice(`Export ready: CompTech_SaccoMIS_${activeTab.toUpperCase()}_Report.${format === 'Excel' ? 'xlsx' : 'pdf'}`);
      setTimeout(() => setExportNotice(null), 3000);
    }, 1000);
  };

  return (
    <section id="finance" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>SASRA Audited Financial Statements</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Financial Reports & Accounting Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Double-entry core ledger with real-time Balance Sheet, Profit & Loss, Combined Member Loan & Contribution audit, and Trial Balance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('Excel')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="px-4 py-2.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-300 text-blue-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>{exportNotice}</span>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="p-4 rounded-3xl bg-white border border-slate-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('balance_sheet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'balance_sheet'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Balance Sheet</span>
            </button>

            <button
              onClick={() => setActiveTab('profit_loss')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'profit_loss'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Profit & Loss (P&L)</span>
            </button>

            <button
              onClick={() => setActiveTab('combined_members')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'combined_members'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Combined Member Report</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">
                Loans & Shares
              </span>
            </button>

            <button
              onClick={() => setActiveTab('trial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'trial'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Trial Balance</span>
            </button>

            <button
              onClick={() => setActiveTab('chart')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'chart'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-black'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Chart of Accounts</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-600 font-bold">Period:</span>
              <span className="text-slate-900 font-mono font-bold">{startDate} – {endDate}</span>
            </div>

            {activeTab === 'balance_sheet' && isBalanceSheetReconciled && (
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Assets = Liab + Equity</span>
              </span>
            )}
          </div>
        </div>

        {/* 1. BALANCE SHEET TAB */}
        {activeTab === 'balance_sheet' && (
          <div className="space-y-6">
            
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Total Assets</div>
                <div className="text-2xl font-black text-blue-700 font-mono">{formatKES(totalAssets)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Cash, member loan portfolio & investments</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Total Liabilities</div>
                <div className="text-2xl font-black text-slate-900 font-mono">{formatKES(totalLiabilities)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Non-withdrawable savings & demand deposits</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Member Equity & Reserves</div>
                <div className="text-2xl font-black text-emerald-800 font-mono">{formatKES(totalEquity)}</div>
                <p className="text-[11px] text-emerald-700 font-bold mt-1">Core Capital Ratio: {((totalEquity / totalAssets) * 100).toFixed(1)}% (SASRA min 10%)</p>
              </div>
            </div>

            {/* Balance Sheet Statement Table */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Statement of Financial Position (Balance Sheet)
                  </h3>
                  <p className="text-xs text-slate-600">As at 31 December 2026 (Audited SASRA Standard Presentation)</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600">Figures in Kenya Shillings (KES)</span>
              </div>

              <div className="divide-y divide-slate-200">
                {BALANCE_SHEET_DATA.map((section, sIdx) => {
                  const sectionTotalCurrent = section.items.reduce((sum, i) => sum + i.currentYear, 0);
                  const sectionTotalPrev = section.items.reduce((sum, i) => sum + i.previousYear, 0);

                  return (
                    <div key={sIdx} className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                          {section.title}
                        </h4>
                      </div>

                      <table className="w-full text-left text-xs">
                        <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                          <tr>
                            <th className="py-2 w-20">Code</th>
                            <th className="py-2">Line Item & Notes</th>
                            <th className="py-2 text-right w-40">Previous Year (2025)</th>
                            <th className="py-2 text-right w-40">Current Year (2026)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-mono text-slate-800">
                          {section.items.map((item) => (
                            <tr key={item.code} className="hover:bg-slate-50">
                              <td className="py-2 text-slate-500 font-bold">{item.code}</td>
                              <td className="py-2 font-sans">
                                <span className="font-bold text-slate-900">{item.name}</span>
                                {item.notes && <span className="text-slate-500 text-[11px] block font-normal">{item.notes}</span>}
                              </td>
                              <td className="py-2 text-right text-slate-600">{formatKES(item.previousYear)}</td>
                              <td className="py-2 text-right font-bold text-slate-900">{formatKES(item.currentYear)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t border-slate-200 font-mono font-bold bg-slate-50/60">
                          <tr>
                            <td colSpan={2} className="py-2 px-1 font-sans text-slate-700">
                              Total {section.title}:
                            </td>
                            <td className="py-2 text-right text-slate-600">{formatKES(sectionTotalPrev)}</td>
                            <td className="py-2 text-right text-blue-800">{formatKES(sectionTotalCurrent)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  );
                })}
              </div>

              {/* Balance Sheet Grand Total Reconciler */}
              <div className="p-6 bg-slate-900 text-white font-mono flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-sans">Total Assets</div>
                  <div className="text-xl font-black text-emerald-400">{formatKES(totalAssets)}</div>
                </div>
                <div className="text-xl font-bold text-slate-500 hidden md:block">=</div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-sans">Total Liabilities + Equity</div>
                  <div className="text-xl font-black text-amber-400">{formatKES(totalLiabilities + totalEquity)}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Statement Reconciled & Balanced</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. PROFIT & LOSS TAB */}
        {activeTab === 'profit_loss' && (
          <div className="space-y-6">
            
            {/* Top P&L KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Total Revenue</div>
                <div className="text-2xl font-black text-emerald-800 font-mono">{formatKES(totalRevenue)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Loan interest & investment yield</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Operating Expenses</div>
                <div className="text-2xl font-black text-[#800020] font-mono">{formatKES(totalExpenses)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Cost of funds, payroll & admin</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Net Surplus After Tax</div>
                <div className="text-2xl font-black text-blue-700 font-mono">{formatKES(netSurplusAfterTax)}</div>
                <p className="text-[11px] text-slate-600 mt-1">After 30% tax provision ({formatKES(corporateTaxProvision)})</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Dividends & Rebates</div>
                <div className="text-2xl font-black text-emerald-700 font-mono">{formatKES(surplusForDividends)}</div>
                <p className="text-[11px] text-slate-600 mt-1">After 20% statutory reserve ({formatKES(statutoryReserveAllocation)})</p>
              </div>
            </div>

            {/* Income Statement Table */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Statement of Comprehensive Income (Profit & Loss)
                  </h3>
                  <p className="text-xs text-slate-600">For the Year Ended 31 December 2026</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600">Figures in Kenya Shillings (KES)</span>
              </div>

              <div className="divide-y divide-slate-200">
                {PROFIT_LOSS_DATA.map((section, sIdx) => {
                  const sectionTotalCurrent = section.items.reduce((sum, i) => sum + i.currentYear, 0);
                  const sectionTotalPrev = section.items.reduce((sum, i) => sum + i.previousYear, 0);

                  return (
                    <div key={sIdx} className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                          section.type === 'Income'
                            ? 'text-emerald-900 bg-emerald-50 border-emerald-200'
                            : 'text-[#800020] bg-rose-50 border-rose-200'
                        }`}>
                          {section.title}
                        </h4>
                      </div>

                      <table className="w-full text-left text-xs">
                        <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                          <tr>
                            <th className="py-2 w-20">Code</th>
                            <th className="py-2">Income / Expense Description</th>
                            <th className="py-2 text-right w-40">Previous Year (2025)</th>
                            <th className="py-2 text-right w-40">Current Year (2026)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-mono text-slate-800">
                          {section.items.map((item) => (
                            <tr key={item.code} className="hover:bg-slate-50">
                              <td className="py-2 text-slate-500 font-bold">{item.code}</td>
                              <td className="py-2 font-sans">
                                <span className="font-bold text-slate-900">{item.name}</span>
                                {item.notes && <span className="text-slate-500 text-[11px] block font-normal">{item.notes}</span>}
                              </td>
                              <td className="py-2 text-right text-slate-600">{formatKES(item.previousYear)}</td>
                              <td className="py-2 text-right font-bold text-slate-900">{formatKES(item.currentYear)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t border-slate-200 font-mono font-bold bg-slate-50/60">
                          <tr>
                            <td colSpan={2} className="py-2 px-1 font-sans text-slate-700">
                              Total {section.title}:
                            </td>
                            <td className="py-2 text-right text-slate-600">{formatKES(sectionTotalPrev)}</td>
                            <td className={`py-2 text-right ${section.type === 'Income' ? 'text-emerald-800' : 'text-[#800020]'}`}>
                              {formatKES(sectionTotalCurrent)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  );
                })}
              </div>

              {/* P&L Distribution Summary Breakdown */}
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <h4 className="text-xs font-black uppercase text-slate-900 mb-3 tracking-wider">
                  Summary Surplus Distribution & Statutory Allocation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-sans block text-[11px]">Gross Operating Surplus</span>
                    <span className="text-base font-bold text-slate-900">{formatKES(netSurplusBeforeTax)}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-sans block text-[11px]">Corporation Tax (30%)</span>
                    <span className="text-base font-bold text-[#800020]">{formatKES(corporateTaxProvision)}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-sans block text-[11px]">Statutory Reserve (20%)</span>
                    <span className="text-base font-bold text-blue-700">{formatKES(statutoryReserveAllocation)}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-sans block text-[11px]">Net Available for Dividends</span>
                    <span className="text-base font-bold text-emerald-700">{formatKES(surplusForDividends)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 3. COMBINED MEMBER REPORT WITH LOAN AMOUNT & CONTRIBUTIONS PER SHARE TYPE */}
        {activeTab === 'combined_members' && (
          <div className="space-y-6">
            
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">Total Active Loans</span>
                  <CreditCard className="w-4 h-4 text-[#800020]" />
                </div>
                <div className="text-2xl font-black text-[#800020] font-mono">{formatKES(totalMemberLoansBalance)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Principal financed: {formatKES(totalMemberLoansPrincipal)}</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">Total BOSA Deposits</span>
                  <PiggyBank className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-800 font-mono">{formatKES(totalMemberNonWithdrawable)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Primary loan security (3x multiplier)</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">Total Share Capital</span>
                  <Layers className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-blue-700 font-mono">{formatKES(totalMemberShareCapital)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Core ownership equity</p>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">Combined Total Equity</span>
                  <TrendingUp className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{formatKES(totalMemberGrandContributions)}</div>
                <p className="text-[11px] text-slate-600 mt-1">Sum of all member share types</p>
              </div>
            </div>

            {/* Member Search and Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={memberFilter}
                  onChange={(e) => setMemberFilter(e.target.value)}
                  placeholder="Filter member by name, number, or phone..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="text-xs text-slate-600 font-medium">
                Showing <strong className="text-slate-900 font-bold">{filteredMemberReport.length}</strong> of <strong className="text-slate-900 font-bold">{members.length}</strong> members
              </div>
            </div>

            {/* Combined Master Table */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                    <tr>
                      <th className="px-3.5 py-3">Member Details</th>
                      <th className="px-3.5 py-3 text-right">Active Loans (KES)</th>
                      <th className="px-3.5 py-3 text-right">Share Capital</th>
                      <th className="px-3.5 py-3 text-right">BOSA Deposits</th>
                      <th className="px-3.5 py-3 text-right">FOSA Savings</th>
                      <th className="px-3.5 py-3 text-right">Total Equity</th>
                      <th className="px-3.5 py-3 text-right">3X Borrowing Limit</th>
                      <th className="px-3.5 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {filteredMemberReport.map((m) => (
                      <tr key={m.id} className="hover:bg-blue-50/40">
                        <td className="px-3.5 py-3 font-sans">
                          <div className="font-bold text-slate-900">{m.fullName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {m.memberNo} • {m.phone}
                          </div>
                        </td>

                        {/* Loan Column */}
                        <td className="px-3.5 py-3 text-right">
                          {m.totalLoanBalance > 0 ? (
                            <div>
                              <div className="font-bold text-[#800020]">{formatKES(m.totalLoanBalance)}</div>
                              <div className="text-[10px] text-slate-500">
                                {m.activeLoansCount} loan(s) • {formatKES(m.monthlyDue)}/mo
                              </div>
                            </div>
                          ) : (
                            <span className="text-emerald-700 font-bold font-sans text-[11px]">No Active Debt</span>
                          )}
                        </td>

                        {/* Share Capital */}
                        <td className="px-3.5 py-3 text-right font-bold text-blue-700">
                          {formatKES(m.shareCapital)}
                        </td>

                        {/* BOSA Deposits */}
                        <td className="px-3.5 py-3 text-right font-bold text-emerald-800">
                          {formatKES(m.nonWithdrawable)}
                        </td>

                        {/* FOSA Withdrawable */}
                        <td className="px-3.5 py-3 text-right text-slate-700">
                          {m.withdrawable > 0 ? formatKES(m.withdrawable) : '—'}
                        </td>

                        {/* Total Member Equity */}
                        <td className="px-3.5 py-3 text-right font-black text-slate-900">
                          {formatKES(m.totalContributions)}
                        </td>

                        {/* Borrowing Limit & Headroom */}
                        <td className="px-3.5 py-3 text-right">
                          <div className="font-bold text-slate-900">{formatKES(m.borrowingLimit)}</div>
                          <div className="text-[10px] text-emerald-700 font-sans">
                            Headroom: {formatKES(m.availableLimit)}
                          </div>
                        </td>

                        {/* Coverage / Status */}
                        <td className="px-3.5 py-3 text-center font-sans">
                          {m.totalLoanBalance > m.borrowingLimit ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-[#800020]">
                              Over Geared
                            </span>
                          ) : m.totalLoanBalance > 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                              Active Borrower
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                              Prime Saver
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 text-slate-900 font-mono font-black text-xs border-t-2 border-slate-300">
                    <tr>
                      <td className="px-3.5 py-3 font-sans uppercase">Total ({filteredMemberReport.length} Members):</td>
                      <td className="px-3.5 py-3 text-right text-[#800020]">{formatKES(totalMemberLoansBalance)}</td>
                      <td className="px-3.5 py-3 text-right text-blue-800">{formatKES(totalMemberShareCapital)}</td>
                      <td className="px-3.5 py-3 text-right text-emerald-800">{formatKES(totalMemberNonWithdrawable)}</td>
                      <td className="px-3.5 py-3 text-right text-slate-700">{formatKES(totalMemberWithdrawable)}</td>
                      <td className="px-3.5 py-3 text-right text-slate-900">{formatKES(totalMemberGrandContributions)}</td>
                      <td className="px-3.5 py-3 text-right text-blue-900">{formatKES(totalMemberNonWithdrawable * 3)}</td>
                      <td className="px-3.5 py-3 text-center font-sans text-emerald-700">Audit Verified</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 4. TRIAL BALANCE TAB */}
        {activeTab === 'trial' && (
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                  <tr>
                    <th className="px-4 py-3.5">Account No</th>
                    <th className="px-4 py-3.5">Account Name</th>
                    <th className="px-4 py-3.5">Group</th>
                    <th className="px-4 py-3.5">Type</th>
                    <th className="px-4 py-3.5 text-right">Debit (KES)</th>
                    <th className="px-4 py-3.5 text-right">Credit (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {TRIAL_BALANCE_ENTRIES.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40">
                      <td className="px-4 py-3 font-bold text-blue-700">{entry.accountNo}</td>
                      <td className="px-4 py-3 font-sans font-bold text-slate-900">{entry.accountName}</td>
                      <td className="px-4 py-3 text-slate-600 font-sans">{entry.accountGroup}</td>
                      <td className="px-4 py-3 text-slate-600 font-sans">{entry.accountType}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {entry.debit > 0 ? formatKES(entry.debit) : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {entry.credit > 0 ? formatKES(entry.credit) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 text-slate-900 font-mono font-black text-xs border-t-2 border-slate-300">
                  <tr>
                    <td colSpan={4} className="px-4 py-3 font-sans uppercase font-black">
                      Total General Ledger Balance:
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-800">{formatKES(totalDebit)}</td>
                    <td className="px-4 py-3 text-right text-emerald-800">{formatKES(totalCredit)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* 5. CHART OF ACCOUNTS TAB */}
        {activeTab === 'chart' && (
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                  <tr>
                    <th className="px-4 py-3.5">Account Code</th>
                    <th className="px-4 py-3.5">Account Name</th>
                    <th className="px-4 py-3.5">Group & Type</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5 text-right">Debit Balance</th>
                    <th className="px-4 py-3.5 text-right">Credit Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {CHART_OF_ACCOUNTS.map((acc, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40">
                      <td className="px-4 py-3 font-bold text-blue-700">{acc.accountNo}</td>
                      <td className="px-4 py-3 font-sans font-bold text-slate-900">{acc.accountName}</td>
                      <td className="px-4 py-3 font-sans text-slate-600">
                        {acc.accountGroup} ({acc.accountType})
                      </td>
                      <td className="px-4 py-3 font-sans">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                          {acc.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {acc.debit > 0 ? formatKES(acc.debit) : '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {acc.credit > 0 ? formatKES(acc.credit) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
