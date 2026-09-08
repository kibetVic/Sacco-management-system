export interface Member {
  id: string;
  memberNo: string;
  idNumber: string;
  surname: string;
  otherNames: string;
  fullName: string;
  phone: string;
  email: string;
  gender: 'Female' | 'Male' | 'Other';
  status: 'Active' | 'Dormant';
  regDate: string;
  county: string;
  department: string;
  address: string;
  age: number;
  maritalStatus: string;
  membershipType: 'Individual' | 'Corporate';
  totalShares: number;
  totalDeposits: number;
  activeLoansCount: number;
}

export type LoanStatus = 'Pending' | 'Active' | 'Approved' | 'Completed' | 'Rejected';

export interface Loan {
  id: string;
  loanNo: string;
  memberNo: string;
  memberName: string;
  loanType: string;
  principal: number;
  approved: number;
  loanBalance: number;
  applicationDate: string;
  status: LoanStatus;
  interestRateMonthly: number; // e.g. 1.25%
  tenureMonths: number;
  monthlyInstallment: number;
  blockchainTxHash: string;
  blockNumber: number;
  purpose?: string;
  guarantorsCount?: number;
}

export interface Contribution {
  id: string;
  receiptNo: string;
  date: string;
  memberNo: string;
  memberName: string;
  shareType: 'Share Capital' | 'Non-Withdrawable Deposits' | 'Withdrawable Deposits' | 'Registration Fees';
  amount: number;
  paymentMethod: 'Cash' | 'M-Pesa STK' | 'Bank Transfer' | 'Cheque';
  referenceNo: string;
  remarks: string;
  blockchainTxHash: string;
  status: 'Confirmed' | 'Pending';
}

export interface AccountEntry {
  accountNo: string;
  accountName: string;
  accountType: 'Balance Sheet' | 'Income Statement';
  accountGroup: 'Assets' | 'Liabilities' | 'Equity' | 'Income' | 'Expenses';
  normalBalance: 'DR' | 'CR';
  category: string;
  currency: string;
  companyCode: string;
  debit: number;
  credit: number;
  isSuspense?: boolean;
}

export interface BlockchainBlock {
  blockNumber: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  txCount: number;
  merkleRoot: string;
  validator: string;
  gasUsed: string;
}

export interface DemoRequest {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  memberCount: string;
  preferredDate: string;
  preferredTime: string;
  modules: string[];
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Confirmed' | 'Contacted';
}

export interface AmortizationMonth {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface DirectContactInquiry {
  id: string;
  name: string;
  saccoName: string;
  phone: string;
  email: string;
  inquiryType: 'Schedule On-site Demo' | 'Get System Quotation' | 'Core Banking Migration' | 'General Consultation';
  message: string;
  submittedAt: string;
}

