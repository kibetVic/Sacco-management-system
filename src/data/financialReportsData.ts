export interface BalanceSheetItem {
  code: string;
  name: string;
  notes?: string;
  currentYear: number;
  previousYear: number;
}

export interface BalanceSheetSection {
  title: string;
  category: 'Assets' | 'Liabilities' | 'Equity';
  items: BalanceSheetItem[];
}

export interface ProfitLossItem {
  code: string;
  name: string;
  notes?: string;
  currentYear: number;
  previousYear: number;
}

export interface ProfitLossSection {
  title: string;
  type: 'Income' | 'Expense';
  items: ProfitLossItem[];
}

// Balance Sheet Data (Kenyan SACCO SASRA Format in KES)
export const BALANCE_SHEET_DATA: BalanceSheetSection[] = [
  {
    title: 'Current & Liquid Assets',
    category: 'Assets',
    items: [
      { code: 'A101', name: 'Cash in Hand & FOSA Tills', notes: 'Daily branch liquidity', currentYear: 4500000, previousYear: 3800000 },
      { code: 'A102', name: 'Cash at Commercial Banks (Co-op Bank, KCB)', notes: 'Operational clearing accounts', currentYear: 38200000, previousYear: 31500000 },
      { code: 'A103', name: 'Mobile Money Float (M-Pesa Paybill / STK Float)', notes: 'Instant member settlements', currentYear: 6850000, previousYear: 5200000 },
      { code: 'A104', name: 'Short-Term Government Treasury Bills (91-day)', notes: 'Central Bank of Kenya liquidity buffer', currentYear: 25000000, previousYear: 20000000 },
    ],
  },
  {
    title: 'Loan Portfolio to Members (Earning Assets)',
    category: 'Assets',
    items: [
      { code: 'A201', name: 'Normal / Development Loans to Members', notes: 'Long term development loans', currentYear: 185400000, previousYear: 162000000 },
      { code: 'A202', name: 'Emergency & School Fees Loans', notes: 'Short term 12-month facility', currentYear: 42600000, previousYear: 36800000 },
      { code: 'A203', name: 'Instant Mobile & Salary Advance Loans', notes: 'Digital 30-90 day advances', currentYear: 16800000, previousYear: 12400000 },
      { code: 'A204', name: 'Asset Finance & Agri-Business Loans', notes: 'Vehicle & agricultural machinery financing', currentYear: 28500000, previousYear: 22100000 },
      { code: 'A205', name: 'Less: IFRS 9 Loan Loss Impairment Provision', notes: 'General and specific provisions', currentYear: -4800000, previousYear: -4100000 },
    ],
  },
  {
    title: 'Non-Current & Capital Assets',
    category: 'Assets',
    items: [
      { code: 'A301', name: 'Financial Investments (Co-op Bank Shares & CIC Insurance)', notes: 'Unquoted cooperative equity', currentYear: 15400000, previousYear: 14200000 },
      { code: 'A302', name: 'Core Banking Software & Distributed Blockchain Infrastructure', notes: 'SaccoMIS node software & hardware', currentYear: 8200000, previousYear: 6500000 },
      { code: 'A303', name: 'Office Furniture, Equipment & Power Backup (Solar/UPS)', notes: 'Branch network physical assets', currentYear: 4150000, previousYear: 4500000 },
    ],
  },

  // LIABILITIES
  {
    title: 'Member Deposits & Short-Term Liabilities',
    category: 'Liabilities',
    items: [
      { code: 'L101', name: 'Non-Withdrawable Member Deposits (BOSA Savings)', notes: 'Primary loan security buffer', currentYear: 242000000, previousYear: 215000000 },
      { code: 'L102', name: 'Withdrawable Member Savings (FOSA Current Accounts)', notes: 'Demand accounts and salary accounts', currentYear: 38400000, previousYear: 32200000 },
      { code: 'L103', name: 'Holiday & Junior / Education Savings Schemes', notes: 'Designated earmarked savings', currentYear: 14200000, previousYear: 11800000 },
      { code: 'L104', name: 'Trade Payables, Accrued Audit & Regulatory SASRA Levies', notes: 'Outstanding operational obligations', currentYear: 3650000, previousYear: 3100000 },
      { code: 'L105', name: 'Benevolent / Welfare Fund Reserve', notes: 'Member bereavement & welfare claims', currentYear: 5850000, previousYear: 4900000 },
    ],
  },

  // EQUITY
  {
    title: 'Member Equity & Institutional Capital',
    category: 'Equity',
    items: [
      { code: 'E101', name: 'Member Share Capital (Permanent Core Equity)', notes: 'Non-withdrawable transferable shares', currentYear: 24500000, previousYear: 21000000 },
      { code: 'E102', name: 'Statutory Reserve Fund (20% Mandatory Allocation)', notes: 'Section 43 of Cooperative Societies Act', currentYear: 18200000, previousYear: 14800000 },
      { code: 'E103', name: 'General Retained Surplus / Revaluation Reserves', notes: 'Cumulative undistributed earnings', currentYear: 8900000, previousYear: 7200000 },
      { code: 'E104', name: 'Net Operating Surplus for the Current Period', notes: 'Comprehensive surplus available for distribution', currentYear: 5100000, previousYear: 4900000 },
    ],
  },
];

// Profit and Loss Data (Statement of Comprehensive Income in KES)
export const PROFIT_LOSS_DATA: ProfitLossSection[] = [
  {
    title: 'Financial Operating Revenue (Interest Income)',
    type: 'Income',
    items: [
      { code: 'INC101', name: 'Interest Income on Development Loans (1.25% p.m.)', notes: 'Primary credit portfolio income', currentYear: 27800000, previousYear: 23600000 },
      { code: 'INC102', name: 'Interest on Emergency & School Fees Loans (1.0% p.m.)', notes: 'Short term loan interest', currentYear: 6150000, previousYear: 5100000 },
      { code: 'INC103', name: 'Interest on Instant Mobile / Digital Loans (2.0% p.m.)', notes: 'Rapid turnaround digital lending', currentYear: 3420000, previousYear: 2450000 },
      { code: 'INC104', name: 'Loan Appraisal, Processing & Search Fees', notes: 'Administrative application revenue', currentYear: 1980000, previousYear: 1650000 },
    ],
  },
  {
    title: 'Investment & Other Operating Revenue',
    type: 'Income',
    items: [
      { code: 'INC201', name: 'Interest on Treasury Bills & Bank Fixed Deposits', notes: 'Liquidity buffer returns', currentYear: 2750000, previousYear: 2100000 },
      { code: 'INC202', name: 'Dividend Income from Cooperative Bank of Kenya', notes: 'Equity investment payout', currentYear: 1680000, previousYear: 1450000 },
      { code: 'INC203', name: 'Mobile Banking (M-Pesa STK & USSD) Commission', notes: 'Digital transaction commissions', currentYear: 1420000, previousYear: 980000 },
      { code: 'INC204', name: 'Entrance / New Member Registration Fees', notes: 'One-off capital entrance fees', currentYear: 640000, previousYear: 520000 },
    ],
  },
  {
    title: 'Financial Expenses (Cost of Funds)',
    type: 'Expense',
    items: [
      { code: 'EXP101', name: 'Interest on Member Non-Withdrawable Deposits (8.5% p.a.)', notes: 'Annual member rebate entitlement', currentYear: 19500000, previousYear: 16800000 },
      { code: 'EXP102', name: 'Interest on Holiday & Fixed Deposit Savings', notes: 'Designated investment account returns', currentYear: 1250000, previousYear: 980000 },
      { code: 'EXP103', name: 'Bank Charges, MPesa B2C Transaction Costs & SMS Gateway', notes: 'Payment rail clearing fees', currentYear: 1120000, previousYear: 940000 },
    ],
  },
  {
    title: 'Operating, Administrative & Governance Expenses',
    type: 'Expense',
    items: [
      { code: 'EXP201', name: 'Staff Salaries, Allowances, Medical & Pension', notes: 'Core personnel compensation', currentYear: 6850000, previousYear: 5900000 },
      { code: 'EXP202', name: 'Board & Supervisory Committee Sitting & Travel Allowances', notes: 'Governance oversight meetings', currentYear: 1950000, previousYear: 1750000 },
      { code: 'EXP203', name: 'Annual General Meeting (AGM) & Member Education', notes: 'Mandatory annual member congress', currentYear: 1480000, previousYear: 1320000 },
      { code: 'EXP204', name: 'SaccoMIS Cloud Infrastructure, Blockchain Nodes & Security', notes: 'CompTech Solution enterprise license', currentYear: 980000, previousYear: 820000 },
      { code: 'EXP205', name: 'Office Rent, Utilities, Internet, Stationery & Postage', notes: 'Branch daily operations', currentYear: 1150000, previousYear: 1050000 },
      { code: 'EXP206', name: 'SASRA Regulatory Supervision Levy & External Audit Fee', notes: 'Annual statutory audit and compliance', currentYear: 820000, previousYear: 750000 },
      { code: 'EXP207', name: 'Depreciation of Computer Equipment & Assets', notes: 'Straight-line asset write-down', currentYear: 650000, previousYear: 580000 },
      { code: 'EXP208', name: 'IFRS 9 Expected Credit Loss (Loan Impairment Provision)', notes: 'Provision for classified non-performing debt', currentYear: 1100000, previousYear: 950000 },
    ],
  },
];
