import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QAVenture - Calculadoras Financeiras e Trabalhistas Precisas",
  description: "Ferramentas gratuitas para cálculos trabalhistas e financeiros: Salário Líquido, Férias, Rescisão e Juros Compostos.",
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
        <script
          src="https://quge5.com/88/tag.min.js"
          data-zone="208166"
          async
          data-cfasync="false"
        ></script>
      </head>
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col`}>
        <ServiceWorkerRegister />
        <Header />
        {children}
      </body>
    </html>
  );
}
