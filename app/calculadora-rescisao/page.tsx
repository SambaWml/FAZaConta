"use client";

import { useState } from "react";
import { calculateTermination } from "@/utils/calculations";
import FinZaaPromo from "@/components/FinZaaPromo";
import Link from "next/link";
import { ArrowLeft, FileX, Info } from "lucide-react";

export default function TerminationCalculator() {
  const [salary, setSalary] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [terminationType, setTerminationType] = useState<'sem-justa-causa' | 'com-justa-causa' | 'pedido-demissao'>("sem-justa-causa");
  const [hasAccruedVacation, setHasAccruedVacation] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (typeof salary !== "number" || !startDate || !endDate) return;
    
    const res = calculateTermination(
      salary,
      startDate,
      endDate,
      terminationType,
      hasAccruedVacation
    );
    setResult(res);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-8">
        <div className="bg-red-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <FileX className="w-8 h-8 text-red-200" />
            <h1 className="text-2xl md:text-3xl font-bold">Calculadora de Rescisão de Contrato</h1>
          </div>
          <p className="text-red-100">
            Calcule seus direitos trabalhistas exatos: Aviso Prévio, Férias, 13º e Saldo de Salário.
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Salário Bruto (R$)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value ? parseFloat(e.target.value) : "")}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="Ex: 3500.00"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Início</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data de Saída</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Motivo da Rescisão</label>
              <select
                value={terminationType}
                onChange={(e) => setTerminationType(e.target.value as any)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white"
              >
                <option value="sem-justa-causa">Demissão Sem Justa Causa</option>
                <option value="pedido-demissao">Pedido de Demissão</option>
                <option value="com-justa-causa">Demissão Com Justa Causa</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="vacation"
                checked={hasAccruedVacation}
                onChange={(e) => setHasAccruedVacation(e.target.checked)}
                className="w-5 h-5 text-red-600 border-slate-300 rounded focus:ring-red-500"
              />
              <label htmlFor="vacation" className="text-slate-700">Possui férias vencidas?</label>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-500/30 mt-4"
            >
              Calcular Rescisão
            </button>
          </div>

          {/* Result */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Resultado da Rescisão</h3>
            
            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Saldo de Salário</span>
                  <span className="font-medium text-slate-800">{formatCurrency(result.saldoSalario)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Aviso Prévio Indenizado {result.avisoDays > 0 && `(${result.avisoDays} dias)`}</span>
                  <span className="font-medium text-slate-800">{formatCurrency(result.avisoPrevioIndenizado)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>13º Proporcional ({result.months13}/12 avos)</span>
                  <span className="font-medium text-slate-800">{formatCurrency(result.decimoTerceiro)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Férias Proporcionais + 1/3 ({result.monthsVacation}/12 avos)</span>
                  <span className="font-medium text-slate-800">{formatCurrency(result.feriasProporcionais)}</span>
                </div>
                {result.feriasVencidas > 0 && (
                  <div className="flex justify-between text-slate-600 text-sm">
                    <span>Férias Vencidas + 1/3</span>
                    <span className="font-medium text-slate-800">{formatCurrency(result.feriasVencidas)}</span>
                  </div>
                )}
                
                <div className="border-t border-slate-200 my-2 pt-2">
                   <div className="flex justify-between text-slate-700 font-semibold">
                    <span>Total de Proventos</span>
                    <span>{formatCurrency(result.totalProventos)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-red-500 text-sm">
                  <span>Descontos Estimados (INSS)</span>
                  <span>- {formatCurrency(result.inssDiscount)}</span>
                </div>

                <div className="border-t border-slate-300 my-3 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-800 font-bold text-lg">Valor Líquido Estimado</span>
                    <span className="text-2xl font-bold text-red-600">{formatCurrency(result.totalLiquido)}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-right">
                    *Valores aproximados. Consulte um contador ou advogado trabalhista.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FileX className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-center text-sm">Preencha os dados ao lado e clique em calcular para ver o resultado detalhado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <FinZaaPromo />
      
      <div className="mt-12">
        <div className="prose prose-slate max-w-none">
          <h2>Entenda o Cálculo de Rescisão</h2>
          <p>
            A rescisão de contrato de trabalho envolve o pagamento de diversas verbas rescisórias, que variam de acordo com o motivo do desligamento e o tempo de serviço.
          </p>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm my-6">
            <h3 className="flex items-center text-red-600 mt-0">
              <Info className="w-5 h-5 mr-2" /> Principais Verbas
            </h3>
            <ul className="mt-4 space-y-2">
              <li><strong>Saldo de Salário:</strong> Pagamento pelos dias trabalhados no mês da saída.</li>
              <li><strong>Aviso Prévio:</strong> Pode ser trabalhado ou indenizado. Quando indenizado, corresponde a um salário + 3 dias por ano completo de empresa.</li>
              <li><strong>13º Proporcional:</strong> 1/12 do salário por mês trabalhado no ano (fração &ge; 15 dias).</li>
              <li><strong>Férias Proporcionais:</strong> 1/12 do salário por mês do período aquisitivo incompleto + 1/3 constitucional.</li>
            </ul>
          </div>

          <h3>Tipos de Demissão</h3>
          <ul>
            <li><strong>Sem Justa Causa:</strong> O trabalhador recebe todas as verbas, incluindo aviso prévio indenizado (se não trabalhado) e multa de 40% do FGTS (não calculada aqui).</li>
            <li><strong>Pedido de Demissão:</strong> O trabalhador não recebe aviso prévio (pode ter que pagar) e não saca o FGTS. Recebe saldo de salário, 13º e férias.</li>
            <li><strong>Com Justa Causa:</strong> O trabalhador perde quase todos os direitos, recebendo apenas saldo de salário e férias vencidas (se houver).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
