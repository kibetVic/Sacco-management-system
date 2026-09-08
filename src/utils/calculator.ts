import { AmortizationMonth } from '../types';

export interface LoanCalculationParams {
  principal: number;
  tenureMonths: number;
  interestRateAnnual: number; // e.g. 14%
  method: 'reducing' | 'flat';
  processingFeePercent: number; // e.g. 1%
  insurancePercent: number; // e.g. 1.5%
}

export interface LoanCalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  totalDeductions: number;
  netDisbursement: number;
  processingFee: number;
  insuranceFee: number;
  effectiveApr: number;
  schedule: AmortizationMonth[];
}

export function calculateLoanDetails(params: LoanCalculationParams): LoanCalculationResult {
  const { principal, tenureMonths, interestRateAnnual, method, processingFeePercent, insurancePercent } = params;

  if (principal <= 0 || tenureMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalRepayment: 0,
      totalDeductions: 0,
      netDisbursement: 0,
      processingFee: 0,
      insuranceFee: 0,
      effectiveApr: 0,
      schedule: [],
    };
  }

  const processingFee = (principal * processingFeePercent) / 100;
  const insuranceFee = (principal * insurancePercent) / 100;
  const totalDeductions = processingFee + insuranceFee;
  const netDisbursement = Math.max(0, principal - totalDeductions);

  const monthlyRate = interestRateAnnual / 100 / 12;
  const schedule: AmortizationMonth[] = [];

  let monthlyPayment = 0;
  let totalInterest = 0;

  if (method === 'reducing') {
    if (monthlyRate === 0) {
      monthlyPayment = principal / tenureMonths;
      totalInterest = 0;
      let balance = principal;
      for (let i = 1; i <= tenureMonths; i++) {
        const p = principal / tenureMonths;
        balance -= p;
        schedule.push({
          month: i,
          payment: p,
          principal: p,
          interest: 0,
          remainingBalance: Math.max(0, balance),
        });
      }
    } else {
      // Standard Annuity / Amortized reducing balance formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const factor = Math.pow(1 + monthlyRate, tenureMonths);
      monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
      
      let balance = principal;
      for (let i = 1; i <= tenureMonths; i++) {
        const interest = balance * monthlyRate;
        const principalPaid = monthlyPayment - interest;
        balance = Math.max(0, balance - principalPaid);
        totalInterest += interest;
        schedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPaid,
          interest: interest,
          remainingBalance: balance,
        });
      }
    }
  } else {
    // Flat Rate method: Total Interest = Principal * Rate * (Years)
    const years = tenureMonths / 12;
    totalInterest = principal * (interestRateAnnual / 100) * years;
    const totalPayable = principal + totalInterest;
    monthlyPayment = totalPayable / tenureMonths;

    const monthlyPrincipal = principal / tenureMonths;
    const monthlyInterest = totalInterest / tenureMonths;
    let balance = principal;

    for (let i = 1; i <= tenureMonths; i++) {
      balance = Math.max(0, balance - monthlyPrincipal);
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        remainingBalance: balance,
      });
    }
  }

  const totalRepayment = principal + totalInterest;
  const effectiveApr = method === 'flat' ? (totalInterest / principal / (tenureMonths / 12)) * 100 * 1.85 : interestRateAnnual;

  return {
    monthlyPayment,
    totalInterest,
    totalRepayment,
    totalDeductions,
    netDisbursement,
    processingFee,
    insuranceFee,
    effectiveApr: parseFloat(effectiveApr.toFixed(2)),
    schedule,
  };
}

export function formatKES(amount: number): string {
  return 'KES ' + Number(amount || 0).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatNumber(num: number): string {
  return Number(num || 0).toLocaleString('en-KE');
}

export function generateCryptoHash(prefix = '0x'): string {
  const chars = '0123456789abcdef';
  let hash = prefix;
  for (let i = 0; i < 40; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}
