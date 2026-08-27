import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  LayoutGrid,
  TrendingUp,
  Target,
} from "lucide-react";
import Logo from "../images/logo.png";

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid, desc: "Visão geral das finanças" },
    { label: "Análises", href: "/analytics", icon: TrendingUp, desc: "Gráficos e estatísticas" },
    { label: "Metas", href: "/savings-goals", icon: Target, desc: "Acompanhe suas metas" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <header className="w-full border-b border-purple-900/30 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img
              src={Logo}
              alt="Budget Manager Logo"
              className="h-8 w-auto"
            />
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-900/20"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Início</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center w-full">
        <h1 className="text-8xl sm:text-9xl font-bold text-purple-500 mb-6 tracking-tight">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-base sm:text-lg mb-12 leading-relaxed">
          Desculpe, não conseguimos encontrar essa página. Ela pode ter sido movida ou removida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-16">
          <Link
            to="/"
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Página Anterior</span>
          </button>
        </div>

        <div className="w-full max-w-3xl border-t border-purple-900/30 pt-12">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Talvez você esteja procurando
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group p-5 rounded-lg bg-slate-900/50 border border-purple-900/30 hover:border-purple-700/50 hover:bg-slate-900 transition-all duration-200 text-left"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2.5 rounded-md bg-purple-900/30 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm">
                        {link.label}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-purple-900/30 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Budget Manager. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default NotFound;