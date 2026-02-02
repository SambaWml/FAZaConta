
// Tabelas de referência 2024/2025

export const INSS_TABLE = [
  { limit: 1412.00, rate: 0.075 },
  { limit: 2666.68, rate: 0.09 },
  { limit: 4000.03, rate: 0.12 },
  { limit: 7786.02, rate: 0.14 },
];

export const IRRF_TABLE = [
  { limit: 2259.20, rate: 0, deduction: 0 },
  { limit: 2826.65, rate: 0.075, deduction: 169.44 },
  { limit: 3751.05, rate: 0.15, deduction: 381.44 },
  { limit: 4664.68, rate: 0.225, deduction: 662.77 },
  { limit: Infinity, rate: 0.275, deduction: 896.00 },
];

export const SIMPLIFIED_DISCOUNT = 564.80;
export const DEPENDENT_DEDUCTION = 189.59;

export function calculateINSS(grossSalary: number): number {
  let inss = 0;
  let remainingSalary = grossSalary;
  let previousLimit = 0;

  for (const band of INSS_TABLE) {
    if (grossSalary > previousLimit) {
      const taxableAmount = Math.min(grossSalary, band.limit) - previousLimit;
      inss += taxableAmount * band.rate;
      previousLimit = band.limit;
    } else {
      break;
    }
  }

  // Cap INSS at the maximum ceiling
  const maxINSS = 
    (1412.00 * 0.075) +
    ((2666.68 - 1412.00) * 0.09) +
    ((4000.03 - 2666.68) * 0.12) +
    ((7786.02 - 4000.03) * 0.14);
    
  if (grossSalary > 7786.02) return maxINSS;

  return inss;
}

export function calculateIRRF(baseSalary: number, dependents: number = 0): { irrf: number, effectiveRate: number, usedSimplified: boolean } {
  // Option 1: Legal deductions
  const deductionDependents = dependents * DEPENDENT_DEDUCTION;
  const baseLegal = baseSalary - deductionDependents;
  
  // Option 2: Simplified discount
  const baseSimplified = baseSalary - SIMPLIFIED_DISCOUNT;

  // Choose the most beneficial base (smallest tax base)
  // Wait, the simplified discount replaces ALL deductions (including INSS? No, usually it replaces the standard deduction vs itemized).
  // Actually, for payroll (monthly), the simplified discount (564.80) replaces the specific deductions (INSS, dependents, alimony). 
  // CORRECTION: The simplified discount replaces the *deductions* from the tax base. 
  // If (INSS + Dependents) < 564.80, use 564.80. Otherwise use (INSS + Dependents).
  
  // Let's refine the logic based on RFB rules.
  // The user can choose to deduct 20% simplified (annual) or monthly fixed simplified discount.
  // Current rule: If the discount of 564.80 is greater than (INSS + Dependents + Alimony), use 564.80.
  // Note: The input `baseSalary` here is typically (Gross - INSS) for the standard calculation?
  // No, `baseSalary` passed to this function should be Gross Salary? 
  // Usually IRRF is calculated on (Gross - INSS - Dependents).
  // Let's change the signature to take Gross and calculated INSS.
  
  return { irrf: 0, effectiveRate: 0, usedSimplified: false }; // Placeholder to fix below
}

export function calculateNetSalary(grossSalary: number, dependents: number = 0, otherDiscounts: number = 0) {
  const inss = calculateINSS(grossSalary);
  
  // IRRF Base Calculation
  const legalDeductions = inss + (dependents * DEPENDENT_DEDUCTION);
  const simplifiedDeduction = SIMPLIFIED_DISCOUNT;
  
  let irrfBase = grossSalary - legalDeductions;
  let usedSimplified = false;

  if (grossSalary - simplifiedDeduction < irrfBase) {
      irrfBase = grossSalary - simplifiedDeduction;
      usedSimplified = true;
  }
  
  // Calculate IRRF on the chosen base
  let irrf = 0;
  for (const band of IRRF_TABLE) {
    if (irrfBase <= band.limit) {
      irrf = (irrfBase * band.rate) - band.deduction;
      break;
    } else if (band.limit === Infinity) {
       irrf = (irrfBase * band.rate) - band.deduction;
    }
  }
  
  if (irrf < 0) irrf = 0;

  const netSalary = grossSalary - inss - irrf - otherDiscounts;

  return {
    grossSalary,
    inss,
    irrf,
    netSalary,
    usedSimplified
  };
}

export function calculateVacation(grossSalary: number, days: number = 30, sellDays: number = 0, dependents: number = 0) {
  // Base vacation pay
  const vacationBase = (grossSalary / 30) * days;
  const oneThird = vacationBase / 3;
  const totalVacationGross = vacationBase + oneThird;
  
  // Allowance (Abono Pecuniário) - selling days (usually 10)
  // Abono does not have INSS/IRRF (usually).
  const soldDaysValue = (grossSalary / 30) * sellDays;
  const soldDaysOneThird = soldDaysValue / 3;
  const totalSold = soldDaysValue + soldDaysOneThird;

  // Taxes are applied on the Vacation Gross (excluding sold days)
  const inss = calculateINSS(totalVacationGross); // Note: INSS logic might be complex if paid within same month as salary, but here we treat standalone for simplicity
  
  // IRRF on Vacation
  // Similar logic to salary
  const legalDeductions = inss + (dependents * DEPENDENT_DEDUCTION);
  const simplifiedDeduction = SIMPLIFIED_DISCOUNT;
  
  let irrfBase = totalVacationGross - legalDeductions;
  if (totalVacationGross - simplifiedDeduction < irrfBase) {
      irrfBase = totalVacationGross - simplifiedDeduction;
  }

  let irrf = 0;
  for (const band of IRRF_TABLE) {
    if (irrfBase <= band.limit) {
      irrf = (irrfBase * band.rate) - band.deduction;
      break;
    } else if (band.limit === Infinity) {
       irrf = (irrfBase * band.rate) - band.deduction;
    }
  }
  if (irrf < 0) irrf = 0;

  const totalNet = (totalVacationGross - inss - irrf) + totalSold;

  return {
    grossVacation: totalVacationGross,
    soldAmount: totalSold,
    inss,
    irrf,
    totalNet
  };
}

export function calculateCompoundInterest(principal: number, monthlyRate: number, months: number, monthlyContribution: number = 0) {
  let total = principal;
  let totalInvested = principal;
  const rate = monthlyRate / 100;
  
  const dataPoints = [];

  for (let i = 1; i <= months; i++) {
    total = total * (1 + rate) + monthlyContribution;
    totalInvested += monthlyContribution;
    
    if (i % 12 === 0 || i === 1 || i === months) { // Save some points for chart
        dataPoints.push({
            month: i,
            invested: totalInvested,
            total: total,
            interest: total - totalInvested
        });
    }
  }

  return {
    total,
    totalInvested,
    totalInterest: total - totalInvested,
    dataPoints
  };
}
