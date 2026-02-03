import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
          <span className="text-blue-500">QA</span>
          <span className="text-white">Venture</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Início
          </Link>
          <Link href="/calculadora-clt" className="text-slate-300 hover:text-white transition-colors">
            Salário Líquido
          </Link>
          <Link href="/calculadora-ferias" className="text-slate-300 hover:text-white transition-colors">
            Férias
          </Link>
          <Link href="/calculadora-rescisao" className="text-slate-300 hover:text-white transition-colors">
            Rescisão
          </Link>
          <Link href="/juros-compostos" className="text-slate-300 hover:text-white transition-colors">
            Juros Compostos
          </Link>
        </nav>
      </div>
    </header>
  );
}
