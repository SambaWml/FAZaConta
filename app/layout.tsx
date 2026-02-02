import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal de Ferramentas Úteis | Calculadoras Financeiras e Trabalhistas",
  description: "Acesse gratuitamente calculadoras de CLT, Férias, Salário Líquido e Juros Compostos. Ferramentas essenciais para seu planejamento financeiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
