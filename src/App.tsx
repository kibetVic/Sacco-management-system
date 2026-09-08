/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CustomerConviction } from './components/CustomerConviction';
import { ContributionDashboard } from './components/ContributionDashboard';
import { MembersDirectory } from './components/MembersDirectory';
import { LoanTracker } from './components/LoanTracker';
import { InterestCalculator } from './components/InterestCalculator';
import { BlockchainExplorer } from './components/BlockchainExplorer';
import { FinancialReports } from './components/FinancialReports';
import { MemberInquirySection } from './components/MemberInquirySection';
import { ContactUsSection } from './components/ContactUsSection';
import { DemoRequestModal } from './components/DemoRequestModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_LOANS, 
  INITIAL_CONTRIBUTIONS, 
  INITIAL_MEMBERS 
} from './data/mockData';
import { Loan, Contribution, Member } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Global domain state
  const [loans, setLoans] = useState<Loan[]>(INITIAL_LOANS);
  const [contributions, setContributions] = useState<Contribution[]>(INITIAL_CONTRIBUTIONS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle calculator "Apply with calculation" bridge
  const handleApplyFromCalculator = (principal: number, tenure: number, rate: number) => {
    handleNavigate('loans');
    setToastMessage(`Calculator quote loaded: KES ${principal.toLocaleString()} for ${tenure} months @ ${rate}% p.a. Ready to apply.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-white text-xs font-semibold flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Modules */}
      <main className="flex-1">
        
        {/* 1. Overview / Hero Showcase with Live Metrics */}
        <HeroSection 
          onNavigate={handleNavigate}
          onOpenDemoModal={() => setIsDemoModalOpen(true)} 
        />

        {/* 2. Customer Conviction & ROI Calculator */}
        <CustomerConviction
          onNavigate={handleNavigate}
          onOpenDemoModal={() => setIsDemoModalOpen(true)}
        />

        {/* 3. Member Self-Service Inquiry Portal (Loans & Shares) */}
        <MemberInquirySection
          members={members}
          loans={loans}
          contributions={contributions}
        />

        {/* 4. Member Contributions & Savings Dashboard */}
        <ContributionDashboard
          contributions={contributions}
          setContributions={setContributions}
          members={members}
        />

        {/* 5. Cooperative Membership Register & KYC */}
        <MembersDirectory 
          members={members} 
          setMembers={setMembers} 
        />

        {/* 6. Loan Tracking & Management Module */}
        <LoanTracker 
          loans={loans} 
          setLoans={setLoans} 
          members={members} 
          onOpenCalculatorForLoan={(principal, tenure, rate) => {
            handleNavigate('calculator');
          }}
        />

        {/* 7. Automated Interest Rate & Amortization Calculator */}
        <InterestCalculator onApplyWithDetails={handleApplyFromCalculator} />

        {/* 8. Permissioned Distributed Blockchain Ledger Explorer */}
        <BlockchainExplorer />

        {/* 9. Financial Reports: Balance Sheet, Profit & Loss, Combined Member Audit, Trial Balance */}
        <FinancialReports 
          members={members}
          loans={loans}
          contributions={contributions}
        />

        {/* 10. Direct Contact Us Section */}
        <ContactUsSection />

      </main>

      {/* Footer */}
      <Footer onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Demo Booking Modal */}
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

    </div>
  );
}
