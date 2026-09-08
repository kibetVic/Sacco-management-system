import React, { useState } from 'react';
import { 
  Users, 
  Coins, 
  PiggyBank, 
  Smartphone, 
  FileText, 
  Printer, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck,
  Plus,
  Send,
  Sparkles,
  X,
  CreditCard,
  Building2
} from 'lucide-react';
import { Contribution, Member } from '../types';
import { formatKES, formatNumber, generateCryptoHash } from '../utils/calculator';
import { SACCO_METRICS } from '../data/mockData';

interface ContributionDashboardProps {
  contributions: Contribution[];
  setContributions: React.Dispatch<React.SetStateAction<Contribution[]>>;
  members: Member[];
}

export const ContributionDashboard: React.FC<ContributionDashboardProps> = ({
  contributions,
  setContributions,
  members,
}) => {
  // Bulk contribution form state
  const [selectedMemberNo, setSelectedMemberNo] = useState<string>(members[0]?.memberNo || '');
  const [shareType, setShareType] = useState<Contribution['shareType']>('Non-Withdrawable Deposits');
  const [amount, setAmount] = useState<number>(1000);
  const [paymentMethod, setPaymentMethod] = useState<Contribution['paymentMethod']>('M-Pesa STK');
  const [referenceNo, setReferenceNo] = useState<string>('QK' + Math.floor(10000000 + Math.random() * 90000000));
  const [remarks, setRemarks] = useState<string>('Monthly member contribution');
  const [promptMpesa, setPromptMpesa] = useState<boolean>(true);

  // Search in recent table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Contribution | null>(null);

  // M-Pesa STK Push Simulation state
  const [stkPushActive, setStkPushActive] = useState<boolean>(false);
  const [postSuccessNotice, setPostSuccessNotice] = useState<string | null>(null);

  const selectedMember = members.find((m) => m.memberNo === selectedMemberNo) || members[0];

  const handlePostContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    if (promptMpesa && paymentMethod === 'M-Pesa STK') {
      setStkPushActive(true);
      setTimeout(() => {
        completePosting();
        setStkPushActive(false);
      }, 2000);
    } else {
      completePosting();
    }
  };

  const completePosting = () => {
    const newReceiptNo = `REC0715${Math.floor(10000 + Math.random() * 90000)}`;
    const newContribution: Contribution = {
      id: `c-${Date.now()}`,
      receiptNo: newReceiptNo,
      date: new Date().toLocaleDateString('en-GB'),
      memberNo: selectedMember.memberNo,
      memberName: selectedMember.fullName,
      shareType: shareType,
      amount: amount,
      paymentMethod: paymentMethod,
      referenceNo: referenceNo || `REF-${Date.now().toString(36).toUpperCase()}`,
      remarks: remarks || `${shareType} posting`,
      blockchainTxHash: generateCryptoHash(),
      status: 'Confirmed',
    };

    setContributions([newContribution, ...contributions]);
    setPostSuccessNotice(`Successfully posted ${formatKES(amount)} for ${selectedMember.fullName}. Official Receipt #${newReceiptNo}`);
    setReferenceNo('QK' + Math.floor(10000000 + Math.random() * 90000000));

    setTimeout(() => {
      setPostSuccessNotice(null);
    }, 4500);
  };

  const filteredContributions = contributions.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.receiptNo.toLowerCase().includes(q) ||
      c.memberName.toLowerCase().includes(q) ||
      c.memberNo.toLowerCase().includes(q) ||
      c.shareType.toLowerCase().includes(q) ||
      c.referenceNo.toLowerCase().includes(q)
    );
  });

  return (
    <section id="contributions" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
            <Coins className="w-3.5 h-3.5 text-blue-600" />
            <span>Cooperative Capital Intelligence</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Member Contribution & Savings Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Real-time tracking of share capital, non-withdrawable deposits, M-Pesa STK receipts, and demographic analytics.
          </p>
        </div>

        {/* Executive Metrics Grid in Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Members Overview */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-2">
              <span>TOTAL MEMBERS</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {formatNumber(SACCO_METRICS.totalMembers)}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between text-xs font-semibold">
              <span className="text-emerald-700">Active: {formatNumber(SACCO_METRICS.activeMembers)}</span>
              <span className="text-slate-500">Dormant: {formatNumber(SACCO_METRICS.dormantMembers)}</span>
            </div>
          </div>

          {/* Gender & Demographic Split */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-2">
              <span>GENDER SEGMENTATION</span>
              <TrendingUp className="w-4 h-4 text-[#800020]" />
            </div>
            <div className="text-2xl font-black text-[#800020] font-mono">
              55.6% Women
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-800 font-semibold">
              <span>Women: {formatNumber(SACCO_METRICS.totalWomen)}</span>
              <span>Men: {formatNumber(SACCO_METRICS.totalMen)}</span>
            </div>
          </div>

          {/* Total Contributions */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-2">
              <span>TOTAL CONTRIBUTIONS</span>
              <PiggyBank className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-black text-blue-700 font-mono">
              {formatKES(SACCO_METRICS.totalContributions)}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-700 font-medium">
              <span>Share Cap: KES 78.2M</span>
              <span>Dep: KES 329.1M</span>
            </div>
          </div>

          {/* Grants & Portfolios */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold mb-2">
              <span>GRANTS & MATCHING FUNDS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-slate-900 font-mono">
              {formatKES(SACCO_METRICS.inclusionGrant + SACCO_METRICS.matchingGrant)}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between text-xs text-slate-700 font-medium">
              <span>Inclusion: 14.3M</span>
              <span>Matching: 20.5M</span>
            </div>
          </div>

        </div>

        {/* Contribution Posting Form */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Post Contribution / Receipting (M-Pesa STK Push)
                </h3>
                <p className="text-xs text-slate-600">
                  Record member savings or dispatch instant Daraja STK Push to the member's Safaricom phone
                </p>
              </div>
            </div>

            {postSuccessNotice && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{postSuccessNotice}</span>
              </div>
            )}
          </div>

          <form onSubmit={handlePostContribution} className="space-y-6">
            
            {/* Step 1: Member Selection */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-blue-700 mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Cooperative Member</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <select
                    value={selectedMemberNo}
                    onChange={(e) => setSelectedMemberNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.memberNo}>
                        {m.fullName} — No: {m.memberNo} | ID: {m.idNumber} | Phone: {m.phone}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between text-slate-800 font-semibold shadow-xs">
                  <span>Current Shares:</span>
                  <span className="font-mono font-black text-blue-700">{formatKES(selectedMember.totalShares)}</span>
                </div>
              </div>
            </div>

            {/* Step 2: Contribution Specs */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#800020] mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#800020] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Contribution & Payment Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Share / Deposit Type *</label>
                  <select
                    value={shareType}
                    onChange={(e) => setShareType(e.target.value as Contribution['shareType'])}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    <option value="Non-Withdrawable Deposits">Non-Withdrawable Deposits</option>
                    <option value="Share Capital">Share Capital</option>
                    <option value="Withdrawable Deposits">Withdrawable Deposits</option>
                    <option value="Registration Fees">Registration Fees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Amount (KES) *</label>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono font-bold focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as Contribution['paymentMethod'])}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:border-blue-600 focus:outline-none cursor-pointer"
                  >
                    <option value="M-Pesa STK">M-Pesa STK Push (Daraja)</option>
                    <option value="Cash">Cash at Counter</option>
                    <option value="Bank Transfer">Bank Transfer (EFT/RTGS)</option>
                    <option value="Cheque">Banker's Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Reference / M-Pesa Code</label>
                  <input
                    type="text"
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-900 mb-1">Remarks</label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="e.g., Monthly group CIG share capital"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={promptMpesa}
                      onChange={(e) => setPromptMpesa(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0"
                    />
                    <span>Prompt M-Pesa Phone PIN</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-700">
                Member phone for STK prompt: <strong className="text-slate-900 font-mono">{selectedMember.phone}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={stkPushActive}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {stkPushActive ? (
                    <>
                      <Smartphone className="w-4 h-4 animate-bounce text-amber-300" />
                      <span>Sending M-Pesa STK Push...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Post & Record on Blockchain Ledger</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Recent Contributions Table */}
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900">Recent Contributions Ledger</h3>
              <p className="text-xs text-slate-600">Real-time receipts with cryptographic SHA-256 validation</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search receipt, member, code..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                <tr>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Member No</th>
                  <th className="px-4 py-3.5">Member Name</th>
                  <th className="px-4 py-3.5">Receipt No</th>
                  <th className="px-4 py-3.5">Share Type</th>
                  <th className="px-4 py-3.5">Amount</th>
                  <th className="px-4 py-3.5">Method</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredContributions.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-3 text-slate-600 font-medium">{item.date}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{item.memberNo}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.memberName}</td>
                    <td className="px-4 py-3 font-mono text-blue-700">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-black">
                        {item.receiptNo}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                        {item.shareType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-black text-emerald-700">
                      {formatKES(item.amount)}
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{item.paymentMethod}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedReceipt(item)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                      >
                        Re-Print PT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt Voucher Printable Preview Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl shadow-2xl p-6 space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-600" />
                  <span className="font-black text-sm uppercase tracking-wider text-slate-900">
                    SACCO OFFICIAL RECEIPT
                  </span>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-2 border-b border-slate-100">
                <h4 className="font-black text-lg text-blue-800">SACCOMIS BLOCKCHAIN PLATFORM</h4>
                <p className="text-[11px] text-slate-600">CompTech Solution Ltd — Kahawa, Nairobi | Support: +254 700 276 320</p>
                <div className="text-xs font-mono font-bold text-slate-800 mt-1">Receipt No: {selectedReceipt.receiptNo}</div>
              </div>

              <div className="text-xs space-y-2 py-2">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-600">Date:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-600">Received From:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.memberName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-600">Member No:</span>
                  <span className="font-mono font-black text-slate-900">{selectedReceipt.memberNo}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-600">Share / Account:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.shareType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-600">Payment Mode / Ref:</span>
                  <span className="font-mono text-slate-800">{selectedReceipt.paymentMethod} ({selectedReceipt.referenceNo})</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-black text-blue-900">
                  <span>AMOUNT PAID:</span>
                  <span className="font-mono">{formatKES(selectedReceipt.amount)}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-mono break-all text-slate-600">
                <strong className="text-slate-900">Blockchain Hash:</strong> {selectedReceipt.blockchainTxHash}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
