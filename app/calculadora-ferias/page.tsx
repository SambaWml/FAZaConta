"use client";

import { useState } from "react";
import { calculateVacation } from "@/utils/calculations";
import FinZaaPromo from "@/components/FinZaaPromo";
import Link from "next/link";
import { ArrowLeft, Plane } from "lucide-react";

export default function VacationCalculator() {
  const [grossSalary, setGrossSalary] = useState<number | "">("");
  const [days, setDays] = useState<number>(30);
  const [sellDays, setSellDays] = useState<number>(0);
  const [dependents, setDependents] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (typeof grossSalary !== "number") return;
    
    const res = calculateVacation(
      grossSalary,
      days,
      sellDays,
      dependents
    );
    setResult(res);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-green-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Plane className="w-8 h-8 text-green-200" />
            <h1 className="text-2xl md:text-3xl font-bold">Calculadora de Férias</h1>
          </div>
          <p className="text-green-100">
            Planeje seu descanso. Calcule o valor exato das suas férias, incluindo 1/3 e abono.
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Salário Bruto (R$)</label>
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value ? parseFloat(e.target.value) : "")}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ex: 4000.00"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dias de Férias</label>
                <select
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value={30}>30 dias</option>
                  <option value={20}>20 dias</option>
                  <option value={15}>15 dias</option>
                  <option value={10}>10 dias</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vender Dias?</label>
                <select
                  value={sellDays}
                  onChange={(e) => setSellDays(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value={0}>Não vender</option>
                  <option value={10}>Vender 10 dias</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número de Dependentes</label>
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                min="0"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/30 mt-4"
            >
              Calcular Férias
            </button>
          </div>

          {/* Result */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Resultado</h3>
            
            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Férias + 1/3</span>
                  <span className="font-medium">R$ {result.grossVacation.toFixed(2)}</span>
                </div>
                {result.soldAmount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Abono Pecuniário (Venda)</span>
                    <span className="font-medium">+ R$ {result.soldAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-red-500">
                  <span>- INSS</span>
                  <span className="font-medium">R$ {result.inss.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>- IRRF</span>
                  <span className="font-medium">R$ {result.irrf.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 mt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Total a Receber</span>
                    <span className="text-2xl font-bold text-green-600">R$ {result.totalNet.toFixed(2)}</span>
                  </div>
                </div>
                 <p className="text-xs text-slate-400 mt-2">
                    * O cálculo do IRRF pode variar dependendo de outros rendimentos no mês.
                  </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Plane className="w-12 h-12 mb-2 opacity-20" />
                <p>Preencha os dados para simular.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="prose prose-slate max-w-none">
          <h2>Entenda o cálculo de férias</h2>
          <p>
            Todo trabalhador CLT tem direito a 30 dias de férias após 12 meses de trabalho. 
            O valor recebido corresponde ao salário adiantado + 1/3 constitucional.
          </p>
          
          <h3>O que é o 1/3 constitucional?</h3>
          <p>
            É um adicional de 33,33% sobre o valor do salário das férias, garantido pela Constituição Federal 
            para que o trabalhador tenha recursos extras para aproveitar o descanso.
          </p>

          <h3>Posso vender minhas férias?</h3>
          <p>
            Sim, a lei permite converter até 1/3 das férias (geralmente 10 dias) em dinheiro. 
            Isso é chamado de <strong>Abono Pecuniário</strong>. A vantagem é que sobre este valor não incide imposto de renda nem INSS, 
            o que aumenta o valor líquido recebido.
          </p>
        </div>
      </div>

      <FinZaaPromo />
    </div>
  );
}
