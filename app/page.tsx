import Link from "next/link";
import { Calculator, Plane, TrendingUp, ArrowRight, FileX } from "lucide-react";
import AdSpace from "@/components/AdSpace";
import FinZaaPromo from "@/components/FinZaaPromo";

export default function Home() {
  const tools = [
    {
      title: "Calculadora de Salário Líquido (CLT)",
      description: "Descubra quanto você realmente vai receber após descontos de INSS e IRRF. Atualizada para 2024/2025.",
      icon: <Calculator className="w-8 h-8 text-blue-500" />,
      href: "/calculadora-clt",
      color: "bg-blue-50 hover:border-blue-200",
    },
    {
      title: "Cálculo de Férias",
      description: "Simule o valor das suas férias, incluindo o terço constitucional e abono pecuniário (venda de dias).",
      icon: <Plane className="w-8 h-8 text-green-500" />,
      href: "/calculadora-ferias",
      color: "bg-green-50 hover:border-green-200",
    },
    {
      title: "Calculadora de Rescisão",
      description: "Calcule seus direitos trabalhistas ao sair da empresa: Aviso prévio, 13º, férias e saldo de salário.",
      icon: <FileX className="w-8 h-8 text-red-500" />,
      href: "/calculadora-rescisao",
      color: "bg-red-50 hover:border-red-200",
    },
    {
      title: "Simulador de Juros Compostos",
      description: "Planeje seu futuro financeiro. Veja como seus investimentos crescem ao longo do tempo.",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      href: "/juros-compostos",
      color: "bg-purple-50 hover:border-purple-200",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <AdSpace position="top" />

      <header className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          QAVenture
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Calculadoras financeiras e trabalhistas precisas e simplificadas.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className={`block p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${tool.color}`}
          >
            <div className="mb-4 bg-white p-3 rounded-xl inline-block shadow-sm">
              {tool.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              {tool.title}
            </h2>
            <p className="text-slate-600 text-xs mb-4 h-16 overflow-hidden">
              {tool.description}
            </p>
            <div className="flex items-center text-sm font-semibold text-slate-900">
              Acessar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>

      <FinZaaPromo />

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="prose prose-slate">
          <h3>Por que usar nossas calculadoras?</h3>
          <p>
            Nossas ferramentas são atualizadas constantemente com as últimas tabelas da Receita Federal e legislação trabalhista.
            Garanta precisão nos seus cálculos de rescisão, férias e investimentos.
          </p>
        </div>
        <div>
           <AdSpace position="inline" />
        </div>
      </div>
    </main>
  );
}
