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
  
  // Note: This helper function seems unused or placeholder in previous context, 
  // keeping structure but it's not fully utilized by calculateNetSalary which does its own logic.
  // For consistency, I'll leave it as a stub or basic implementation if needed later.
  return { irrf: 0, effectiveRate: 0, usedSimplified: false }; 
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
  const inss = calculateINSS(totalVacationGross); 
  
  // IRRF on Vacation
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

export function calculateTermination(
  salary: number,
  startDate: string,
  endDate: string,
  terminationType: 'sem-justa-causa' | 'com-justa-causa' | 'pedido-demissao',
  hasAccruedVacation: boolean
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneDay = 24 * 60 * 60 * 1000;

  // Years worked (for Notice Period)
  let yearsWorked = end.getFullYear() - start.getFullYear();
  const m = end.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
      yearsWorked--;
  }

  // 1. Saldo de Salário
  // Days in termination month usually.
  const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  const daysWorkedInMonth = end.getDate();
  const saldoSalario = (salary / 30) * daysWorkedInMonth;

  // 2. Aviso Prévio Indenizado
  let avisoPrevioIndenizado = 0;
  let avisoDays = 0;
  
  if (terminationType === 'sem-justa-causa') {
    const extraDays = Math.min(yearsWorked * 3, 60); 
    avisoDays = 30 + extraDays;
    avisoPrevioIndenizado = (salary / 30) * avisoDays;
  }

  // 3. 13º Proporcional
  // Counts months in current year where worked >= 15 days
  let months13 = 0;
  const startYear = new Date(end.getFullYear(), 0, 1);
  const effectiveStart = start > startYear ? start : startYear;
  
  let currentMonth = new Date(effectiveStart);
  // Normalize to start of month to avoid skipping issues
  currentMonth.setDate(1);
  
  const endIterate = new Date(end);
  endIterate.setDate(1); // Compare months

  while (currentMonth <= endIterate) {
      let daysWorked = 30;
      
      // If it's the start month
      if (currentMonth.getMonth() === effectiveStart.getMonth() && currentMonth.getFullYear() === effectiveStart.getFullYear()) {
         daysWorked = 30 - effectiveStart.getDate() + 1;
      }
      
      // If it's the end month
      if (currentMonth.getMonth() === end.getMonth() && currentMonth.getFullYear() === end.getFullYear()) {
          daysWorked = end.getDate();
      }

      if (daysWorked >= 15) {
          months13++;
      }
      
      currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  // Projection of Aviso Previo for 13th
  if (terminationType === 'sem-justa-causa') {
      const projectedDate = new Date(end.getTime() + (avisoDays * oneDay));
      // Simple logic: if projected date extends into next month >= 15 days, or adds full months
      // Calculate months diff between end and projected
      // If end is 01/03 and projected is 05/04.
      // March: 31 days. April: 5 days.
      // March counts? Yes. April counts? No (<15).
      
      // Let's iterate months from End+1Day to ProjectedDate
      let pDate = new Date(end);
      pDate.setDate(pDate.getDate() + 1);
      
      while (pDate <= projectedDate) {
          // Check if this month has >= 15 days overlapping with the period [pDate...projectedDate]
          // Actually, standard is: add the notice days to the service time. Then calculate 13th on the new total time.
          // Let's use the projected date as the effective termination date for 13th calculation purposes.
          // BUT, we already calculated months13 up to 'end'.
          // Let's just calculate how many extra months the projection adds.
          
          // Easiest: 1/12 for every 30 days of notice? No.
          // Correct: Date projection.
          
          // Let's check the date of the projected end.
          if (projectedDate.getMonth() !== end.getMonth() || projectedDate.getFullYear() !== end.getFullYear()) {
              // It crossed a month boundary.
              // Calculate 13th months based on Projected Date instead of End Date.
              // Recalculate months13 fully using projectedDate?
              
              let pMonths13 = 0;
              let pCurrent = new Date(effectiveStart);
              pCurrent.setDate(1);
              const pEndIterate = new Date(projectedDate);
              pEndIterate.setDate(1);
              
              while (pCurrent <= pEndIterate) {
                  let d = 30;
                   if (pCurrent.getMonth() === effectiveStart.getMonth() && pCurrent.getFullYear() === effectiveStart.getFullYear()) {
                       d = 30 - effectiveStart.getDate() + 1;
                   }
                   if (pCurrent.getMonth() === projectedDate.getMonth() && pCurrent.getFullYear() === projectedDate.getFullYear()) {
                       d = projectedDate.getDate();
                   }
                   if (d >= 15) pMonths13++;
                   pCurrent.setMonth(pCurrent.getMonth() + 1);
              }
              months13 = pMonths13;
          }
          break; // only do this check once
      }
  }

  if (months13 > 12) months13 = 12;
  if (terminationType === 'com-justa-causa') months13 = 0;
  
  const decimoTerceiro = (salary / 12) * months13;

  // 4. Férias Proporcionais
  // Logic: Months from anniversary to end (plus projection)
  let vacationStart = new Date(start);
  vacationStart.setFullYear(end.getFullYear());
  if (vacationStart > end) {
      vacationStart.setFullYear(end.getFullYear() - 1);
  }
  
  let monthsVacation = 0;
  
  // Use projected date for vacation calculation if sem-justa-causa
  let vacCalcEnd = end;
  if (terminationType === 'sem-justa-causa') {
      vacCalcEnd = new Date(end.getTime() + (avisoDays * oneDay));
  }
  
  // Count months from vacationStart to vacCalcEnd
  let vCurrent = new Date(vacationStart);
  vCurrent.setDate(1); // normalize
  const vEndIterate = new Date(vacCalcEnd);
  vEndIterate.setDate(1);
  
  // This iteration is tricky because vacation period is not calendar month based (1-30), but anniversary based (e.g. 15th to 14th).
  // Let's stick to the "days >= 14" rule on the remainder.
  
  // Full months diff
  let diffMonths = (vacCalcEnd.getFullYear() - vacationStart.getFullYear()) * 12 + (vacCalcEnd.getMonth() - vacationStart.getMonth());
  
  // Adjust based on day of month
  // If start 15/02. End 10/04.
  // Feb 15 to Mar 14 (1 mo). Mar 15 to Apr 14 (incomplete).
  // End is 10/04. So it didn't complete the 2nd month.
  // Remainder: Mar 15 to Apr 10. -> 26 days. >= 15? Yes. +1 month.
  
  let vDay = vacationStart.getDate();
  let vEndDay = vacCalcEnd.getDate();
  
  if (vEndDay < vDay) {
      diffMonths--;
      // Check remainder
      // Previous cycle end: Day 'vDay' of previous month relative to vacCalcEnd
      // e.g. Start 15. End 10/04.
      // Last full cycle ended 14/03.
      // Remainder: 15/03 to 10/04.
      // Approx days: (30 - 15) + 10 = 25 days.
      const prevCycleEnd = new Date(vacCalcEnd.getFullYear(), vacCalcEnd.getMonth() - 1, vDay);
      const daysRemainder = Math.floor((vacCalcEnd.getTime() - prevCycleEnd.getTime()) / oneDay);
       if (daysRemainder >= 14) diffMonths++;
  } else {
      // End 20/04. Start 15.
      // Remainder: 15/04 to 20/04 = 5 days. < 14. No extra month.
      // But we have the full months already in diffMonths.
      // Wait, diffMonths (Feb to Apr) = 2.
      // 15/02 to 15/04 is 2 months.
      // 15/04 to 20/04 is 5 days.
      // So result is 2.
      // What if End 10/04? Start 15.
      // diffMonths = 2.
      // vEndDay (10) < vDay (15).
      // diffMonths becomes 1.
      // Remainder (15/03 to 10/04) is ~25 days. +1.
      // Result 2.
  }
  
  monthsVacation = diffMonths;
  if (monthsVacation < 0) monthsVacation = 0; // Should not happen
  if (monthsVacation > 12) monthsVacation = 12;

  if (terminationType === 'com-justa-causa') monthsVacation = 0;

  const feriasProporcionaisBase = (salary / 12) * monthsVacation;
  const feriasProporcionais = feriasProporcionaisBase + (feriasProporcionaisBase / 3);

  // 5. Férias Vencidas
  let feriasVencidas = 0;
  if (hasAccruedVacation) {
      feriasVencidas = salary + (salary / 3);
  }

  // Discounts (INSS on Saldo and 13th)
  const inssSaldo = calculateINSS(saldoSalario);
  const inss13 = calculateINSS(decimoTerceiro);
  
  const totalProventos = saldoSalario + avisoPrevioIndenizado + decimoTerceiro + feriasProporcionais + feriasVencidas;
  const totalDescontos = inssSaldo + inss13;
  
  return {
    saldoSalario,
    avisoPrevioIndenizado,
    decimoTerceiro,
    feriasProporcionais,
    feriasVencidas,
    totalProventos,
    inssDiscount: totalDescontos,
    totalLiquido: totalProventos - totalDescontos,
    months13,
    monthsVacation,
    avisoDays
  };
}
