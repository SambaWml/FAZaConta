"use client";

import { useState } from "react";
import { calculateNetSalary } from "@/utils/calculations";
import FinZaaPromo from "@/components/FinZaaPromo";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

export default function CLTCalculator() {
  const [grossSalary, setGrossSalary] = useState<number | "">("");
  const [dependents, setDependents] = useState<number>(0);
  const [otherDiscounts, setOtherDiscounts] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (typeof grossSalary !== "number") return;
    
    const res = calculateNetSalary(
      grossSalary,
      dependents,
      typeof otherDiscounts === "number" ? otherDiscounts : 0
    );
    setResult(res);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o início
      </Link>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-blue-200" />
            <h1 className="text-2xl md:text-3xl font-bold">Calculadora de Salário Líquido 2024/2025</h1>
          </div>
          <p className="text-blue-100">
            Descubra exatamente quanto vai cair na sua conta. Cálculo completo com INSS e IRRF.
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
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ex: 3500.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número de Dependentes</label>
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Outros Descontos (R$)</label>
              <input
                type="number"
                value={otherDiscounts}
                onChange={(e) => setOtherDiscounts(e.target.value ? parseFloat(e.target.value) : "")}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ex: Vale transporte, plano de saúde..."
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 mt-4"
            >
              Calcular Salário Líquido
            </button>
          </div>

          {/* Result */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Resultado do Cálculo</h3>
            
            {result ? (
              <div className="space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Salário Bruto</span>
                  <span className="font-medium">R$ {result.grossSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>- INSS</span>
                  <span className="font-medium">R$ {result.inss.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>- IRRF</span>
                  <span className="font-medium">R$ {result.irrf.toFixed(2)}</span>
                </div>
                {Number(otherDiscounts) > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>- Outros</span>
                    <span className="font-medium">R$ {Number(otherDiscounts).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 mt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Salário Líquido</span>
                    <span className="text-2xl font-bold text-blue-600">R$ {result.netSalary.toFixed(2)}</span>
                  </div>
                </div>

                {result.usedSimplified && (
                  <p className="text-xs text-green-600 mt-2 bg-green-50 p-2 rounded">
                    * Foi utilizado o desconto simplificado do IRRF pois é mais vantajoso para você.
                  </p>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Calculator className="w-12 h-12 mb-2 opacity-20" />
                <p>Preencha os dados ao lado para ver o resultado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 prose prose-slate max-w-none">
          <h2>Como calcular o Salário Líquido em 2024?</h2>
          <p>
            O cálculo do salário líquido envolve subtrair os descontos obrigatórios (INSS e IRRF) do seu salário bruto. 
            É importante entender cada etapa para conferir se seu holerite está correto.
          </p>
          
          <h3>1. Desconto do INSS</h3>
          <p>
            O INSS (Instituto Nacional do Seguro Social) é o primeiro desconto aplicado. A tabela é progressiva, 
            o que significa que a alíquota varia de 7,5% a 14% dependendo da faixa salarial. 
            O teto do INSS em 2024 é de R$ 908,85 (para salários acima de R$ 7.786,02).
          </p>

          <h3>2. Desconto do IRRF</h3>
          <p>
            O Imposto de Renda Retido na Fonte (IRRF) é calculado sobre o salário base (Salário Bruto - INSS - Dependentes).
            Desde maio de 2024, existe a opção do <strong>desconto simplificado</strong> de R$ 564,80, que isenta quem ganha até dois salários mínimos.
            Nossa calculadora verifica automaticamente qual opção é melhor para o seu bolso (deduções legais ou desconto simplificado).
          </p>

          <h3>3. Outros Descontos</h3>
          <p>
            Além dos impostos, podem haver descontos como Vale Transporte (até 6%), Plano de Saúde, Vale Refeição, etc.
            Insira esses valores no campo "Outros Descontos" para ter o valor exato.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-bold text-yellow-800 mb-2">Dica Financeira</h4>
            <p className="text-sm text-yellow-700">
              Recebeu um aumento? Use a diferença para investir no seu futuro. Simule rendimentos na nossa calculadora de juros compostos.
            </p>
            <Link href="/juros-compostos" className="text-blue-600 text-sm font-semibold hover:underline mt-2 inline-block">
              Ir para Simulador de Juros →
            </Link>
          </div>
        </div>
      </div>

      <FinZaaPromo />
    </div>
  );
}
