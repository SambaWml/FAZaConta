"use client";

import { useState } from "react";
import { calculateCompoundInterest } from "@/utils/calculations";
import FinZaaPromo from "@/components/FinZaaPromo";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CompoundInterestCalculator() {
  const [initialValue, setInitialValue] = useState<number | "">("");
  const [monthlyValue, setMonthlyValue] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (typeof initialValue !== "number" || typeof rate !== "number" || typeof years !== "number") return;
    
    const res = calculateCompoundInterest(
      initialValue,
      rate,
      years * 12,
      typeof monthlyValue === "number" ? monthlyValue : 0
    );
    setResult(res);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-purple-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-purple-200" />
            <h1 className="text-2xl md:text-3xl font-bold">Simulador de Juros Compostos</h1>
          </div>
          <p className="text-purple-100">
            Veja o poder dos juros compostos trabalhando para você.
          </p>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor Inicial (R$)</label>
              <input
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value ? parseFloat(e.target.value) : "")}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Ex: 1000.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Aporte Mensal (R$)</label>
              <input
                type="number"
                value={monthlyValue}
                onChange={(e) => setMonthlyValue(e.target.value ? parseFloat(e.target.value) : "")}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Ex: 200.00"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Taxa Mensal (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value ? parseFloat(e.target.value) : "")}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: 0.8"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Período (Anos)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value ? parseFloat(e.target.value) : "")}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/30 mt-4"
            >
              Simular Investimento
            </button>
          </div>

          {/* Result */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center">
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Valor Total Acumulado</p>
                  <p className="text-3xl md:text-4xl font-bold text-purple-600">
                    R$ {result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <p className="text-slate-500">Total Investido</p>
                    <p className="font-bold text-slate-800">
                      R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <p className="text-slate-500">Total em Juros</p>
                    <p className="font-bold text-green-600">
                      + R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="h-40 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.dataPoints}>
                      <XAxis dataKey="month" hide />
                      <Tooltip 
                        formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, 'Total']}
                        labelFormatter={(label) => `Mês ${label}`}
                      />
                      <Line type="monotone" dataKey="total" stroke="#9333ea" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="invested" stroke="#cbd5e1" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <TrendingUp className="w-12 h-12 mb-2 opacity-20" />
                <p>Preencha os dados para ver a mágica dos juros.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="prose prose-slate max-w-none">
          <h2>O Milagre dos Juros Compostos</h2>
          <p>
            Albert Einstein teria dito que "os juros compostos são a oitava maravilha do mundo". 
            Diferente dos juros simples, onde o rendimento é calculado apenas sobre o valor inicial, 
            nos juros compostos você ganha "juros sobre juros".
          </p>
          <p>
            Isso significa que, com o tempo, o crescimento do seu dinheiro não é linear, mas exponencial. 
            Começar cedo, mesmo com pouco dinheiro, é o segredo para construir patrimônio.
          </p>
        </div>
      </div>

      <FinZaaPromo />
    </div>
  );
}
