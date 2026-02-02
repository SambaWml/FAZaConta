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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7010718300575269"
          crossOrigin="anonymous"
        ></script>
        <script src="https://pl28634450.effectivegatecpm.com/3c/43/0b/3c430b800a0ce421b433bceac9e888d7.js"></script>
      </head>
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
