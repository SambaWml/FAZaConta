import React from 'react';
import { Mic, MessageSquare, Zap, ArrowRight, Smartphone } from 'lucide-react';

const FinZaaPromo = () => {
  return (
    <div className="bg-gradient-to-br from-green-900 to-slate-900 rounded-2xl p-8 text-white my-8 shadow-2xl relative overflow-hidden border border-green-800/50">
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4 border border-green-500/30">
              <Zap className="w-3 h-3 mr-1" /> Novo jeito de controlar
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2">
              Aposente sua <span className="text-green-400">planilha de gastos</span>
            </h2>
            <p className="text-slate-300 text-lg">
              Controle tudo pelo <strong>WhatsApp</strong>. Transforme áudios e mensagens em relatórios automáticos.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                <Mic className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <strong className="block text-white">Registre com sua voz</strong>
                <span className="text-slate-400 text-sm">"Abasteci 120 de gasolina no pix". O sistema entende tudo.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg mt-1">
                <Smartphone className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <strong className="block text-white">Direto no WhatsApp</strong>
                <span className="text-slate-400 text-sm">Sem apps complicados. Use a ferramenta que você já ama.</span>
              </div>
            </li>
          </ul>

          <a 
            href="https://www.finzaa.com.br/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/25 group"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-slate-500 mt-2">

          </p>
        </div>

        {/* Right Content - Mockup/Visual */}
        <div className="relative hidden md:block">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">FinZaa</p>
                <p className="text-xs text-green-400">Online agora</p>
              </div>
            </div>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-end">
                <div className="bg-green-600 text-white p-3 rounded-l-xl rounded-tr-xl max-w-[85%] shadow-sm">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 opacity-80" />
                    <span>0:03</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-200 p-3 rounded-r-xl rounded-tl-xl max-w-[90%] shadow-sm border border-slate-600">
                  <p className="text-xs text-slate-400 mb-1">Entendido! ✅</p>
                  <div className="flex justify-between gap-4 mb-1">
                    <span>⛽ Combustível</span>
                    <span className="font-bold text-red-400">- R$ 120,00</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 border-t border-slate-600 pt-2">
                    Saldo atual previsto: <span className="text-green-400">R$ 2.450,00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute -top-4 -right-4 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-xl animate-bounce">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-xl animate-bounce delay-700">
            <span className="text-2xl">💸</span>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default FinZaaPromo;
