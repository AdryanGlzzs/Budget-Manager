import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  LayoutGrid,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  GraduationCap,
  Palmtree,
  CreditCard,
  Zap,
  ShoppingBag,
  Calendar,
} from "lucide-react";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const InitialPage = () => {
  const [IsScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          IsScrolled ? "bg-[#050510]/80 backdrop-blur-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={Logo} className="w-40" alt="Daryan Logo" />
            </div>

            <div className="hidden md:flex items-center gap-10 text-[15px]">
              <Link to="" className="hover:text-purple-400 transition-colors">
                Início
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Funcionalidades
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Benefícios
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Preços
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Depoimentos
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Link to="/login">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-[15px] font-medium transition-all  justify-center align-bottom">
                  Começar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-bold mb-4 sm:mb-5 leading-[1.1] tracking-tight">
            Gerencie Finanças
            <br />
            de Forma Inteligente
          </h1>

          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
            Daryan ajuda você a controlar gastos, acompanhar receitas e
            gerenciar
            <br />
            economias com um dashboard financeiro intuitivo.
          </p>

          <Link to="/signup">
            <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105 inline-flex items-center gap-2">
              Experimente Grátis
              <ChevronRight />
            </button>
          </Link>
        </div>
      </section>

      <section className="relative px-2 sm:px-6 md:px-12 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-[32px] p-[3px]">
            <div className="absolute -inset-6 bg-gradient-to-br from-purple-500/40 via-purple-600/30 to-blue-600/40 rounded-[40px] blur-[60px] opacity-70"></div>

            <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-purple-500/80 via-purple-600/90 to-blue-600/80">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-purple-600/40 to-blue-600/50 rounded-[32px] blur-[30px]"></div>

              <div className="relative bg-[#0a0a14]/95 backdrop-blur-xl rounded-[20px] sm:rounded-[30px] overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
                <div className="flex items-center justify-between px-3 sm:px-6 md:px-8 py-3 sm:py-5 border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-[15px]">Daryan</div>
                      <div className="text-[13px] text-gray-500">Painel</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
                    <div className="relative hidden md:block">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Buscar"
                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-40 lg:w-56 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                      />
                    </div>
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"></div>
                      <span className="hidden sm:inline text-[13px] sm:text-[14px] font-medium">
                        Adryan G
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="hidden md:block md:w-40 lg:w-56 bg-[#08080f]/90 backdrop-blur-sm p-3 lg:p-5 space-y-1.5 border-r border-white/10">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl flex items-center gap-2 lg:gap-3 text-[13px] lg:text-[14px] font-medium shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all">
                      <LayoutGrid className="w-4 h-4" />
                      Painel
                    </div>
                  </div>

                  <div className="flex-1 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-5 bg-gradient-to-br from-[#0a0a14]/60 to-[#0a0a14]/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-3 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="text-[13px] text-gray-500 mb-1">
                                Meu Saldo
                              </div>
                              <div className="text-[22px] sm:text-[28px] md:text-[32px] font-bold leading-none bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                                $66,000.00
                              </div>
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[13px] font-medium transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105">
                              Adicionar Despesas
                            </button>
                          </div>
                          <div className="text-[12px] text-gray-500">
                            Seu Saldo este Mês
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-3 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="text-[13px] text-gray-500 mb-1">
                                Gastos por Categoria
                              </div>
                              <div className="text-[22px] sm:text-[28px] md:text-[32px] font-bold leading-none">
                                $15,000.00
                              </div>
                            </div>
                            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                              <option>Este Mês</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-5">
                            <div className="relative w-28 h-28">
                              <svg className="w-full h-full -rotate-90">
                                <circle
                                  cx="56"
                                  cy="56"
                                  r="48"
                                  fill="none"
                                  stroke="#1a1a2e"
                                  strokeWidth="12"
                                />
                                <circle
                                  cx="56"
                                  cy="56"
                                  r="48"
                                  fill="none"
                                  stroke="#6366F1"
                                  strokeWidth="12"
                                  strokeDasharray="120 301"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="56"
                                  cy="56"
                                  r="48"
                                  fill="none"
                                  stroke="#06B6D4"
                                  strokeWidth="12"
                                  strokeDasharray="90 301"
                                  strokeDashoffset="-120"
                                  strokeLinecap="round"
                                />
                                <circle
                                  cx="56"
                                  cy="56"
                                  r="48"
                                  fill="none"
                                  stroke="#10B981"
                                  strokeWidth="12"
                                  strokeDasharray="60 301"
                                  strokeDashoffset="-210"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-[24px] font-bold">80%</div>
                                <div className="text-[11px] text-gray-500">
                                  Total Gasto
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2.5 flex-1">
                              {[
                                {
                                  color: "#6366F1",
                                  label: "Alimentação",
                                  percent: "30%",
                                  amount: "19%",
                                },
                                {
                                  color: "#06B6D4",
                                  label: "Compras",
                                  percent: "20%",
                                  amount: "10%",
                                },
                                {
                                  color: "#10B981",
                                  label: "Transporte",
                                  percent: "25%",
                                  amount: "6%",
                                },
                                {
                                  color: "#F59E0B",
                                  label: "Entretenimento",
                                  percent: "20%",
                                  amount: "9%",
                                },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="flex items-center justify-between text-[13px]"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-2.5 h-2.5 rounded-full shadow-md"
                                      style={{
                                        backgroundColor: item.color,
                                        boxShadow: `0 0 8px ${item.color}40`,
                                      }}
                                    ></div>
                                    <span className="text-gray-400">
                                      {item.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500">
                                      {item.percent}
                                    </span>
                                    <span className="font-medium w-8 text-right">
                                      {item.amount}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-3 sm:p-5 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                              <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <div className="hidden sm:block text-[13px] text-gray-400">
                                Receitas
                              </div>
                              <div className="text-[18px] sm:text-[22px] md:text-[24px] font-bold">
                                $44,000.00
                              </div>
                            </div>
                          </div>
                          <div className="text-[12px] text-green-400 flex items-center">
                            <ArrowUpRight className="w-3 h-3" />
                            +5.2%
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-3 sm:p-5 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              <TrendingDown className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <div className="hidden sm:block text-[13px] text-gray-400">
                                Despesas
                              </div>
                              <div className="text-[18px] sm:text-[22px] md:text-[24px] font-bold">
                                $22,000.00
                              </div>
                            </div>
                          </div>
                          <div className="text-[12px] text-red-400 flex items-center">
                            <ArrowDownRight className="w-3 h-3" />
                            -2.4%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-3 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-5">
                          <div>
                            <div className="text-[15px] font-semibold mb-1">
                              Fluxo de Caixa
                            </div>
                            <div className="flex items-center gap-4 text-[12px]">
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-1 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                                <span className="text-gray-400">Receitas</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-1 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                                <span className="text-gray-400">Despesas</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                              <option>Este Ano</option>
                            </select>
                            <div className="text-[18px] sm:text-[22px] md:text-[24px] font-bold">
                              +$264,455
                            </div>
                            <span className="text-[12px] text-green-400 px-2 py-1 bg-green-400/10 rounded-md">
                              +2.7%
                            </span>
                          </div>
                        </div>

                        <ResponsiveContainer width="100%" height={180}>
                          <LineChart>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#1a1a2e"
                              vertical={false}
                            />
                            <XAxis hide />
                            <YAxis hide />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="url(#colorGradient)"
                              strokeWidth={3}
                              dot={false}
                              animationDuration={2000}
                            />
                            <defs>
                              <linearGradient
                                id="colorGradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="0%" stopColor="#6366F1" />
                                <stop offset="50%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#06B6D4" />
                              </linearGradient>
                            </defs>
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-3 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[13px] text-gray-500 mb-1">
                              Minhas Economias
                            </div>
                            <div className="text-[20px] sm:text-[24px] md:text-[28px] font-bold">
                              $24,000.00
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] text-gray-500 mb-1">
                              Saúde Financeira
                            </div>
                            <div className="text-[14px] font-medium text-green-400 px-3 py-1 bg-green-400/10 rounded-md inline-block">
                              Excelente
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-[56px] font-bold mb-5 leading-[1.1] tracking-tight">
            Funcionalidades Poderosas para
            <br />
            Suas Finanças
          </h2>
          <p className="text-[17px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Todas as ferramentas que você precisa para gerenciar seu dinheiro —
            inteligente,
            <br />
            simples e prático.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold mb-2 sm:mb-3">
                Visão Financeira Abrangente
              </h3>
              <p className="text-gray-400 text-[14px] sm:text-[15px] mb-5 sm:mb-8 leading-relaxed">
                Veja seu saldo total, receitas e despesas de relance para manter
                o controle de suas finanças.
              </p>

              <div className="space-y-6">
                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-3 sm:p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                    <div>
                      <div className="text-[12px] sm:text-[13px] text-gray-500 mb-1 sm:mb-2">
                        Meu Saldo
                      </div>
                      <div className="text-[26px] sm:text-[34px] md:text-[42px] font-bold leading-none">
                        $66,000.00
                      </div>
                      <div className="text-[12px] sm:text-[13px] text-gray-500 mt-1">
                        Seu Saldo no Mês
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="bg-purple-600 hover:bg-purple-700 px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-xl text-[11px] sm:text-[13px] md:text-[14px] font-medium transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 whitespace-nowrap">
                        Adicionar Transação
                      </button>
                      <select className="bg-white/5 border border-white/10 rounded-xl px-2 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                        <option>Este Mês</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-[13px] sm:text-[14px] text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    45.2%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-3 sm:p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                      </div>
                      <div className="text-[11px] sm:text-[13px] text-gray-500">
                        Receitas
                      </div>
                    </div>
                    <div className="text-[18px] sm:text-[22px] md:text-[28px] font-bold mb-1">
                      $44,000.00
                    </div>
                    <div className="text-[11px] sm:text-[13px] text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      45.2%
                    </div>
                  </div>

                  <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-3 sm:p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                      </div>
                      <div className="text-[11px] sm:text-[13px] text-gray-500">
                        Despesas
                      </div>
                    </div>
                    <div className="text-[18px] sm:text-[22px] md:text-[28px] font-bold mb-1">
                      $22,000.00
                    </div>
                    <div className="text-[11px] sm:text-[13px] text-red-400 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      36.1%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[28px] font-bold mb-3">
                Plano de Economia Inteligente
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                Crie, gerencie e alcance seus objetivos de economia com um plano
                feito para você.
              </p>

              <div className="space-y-4">
                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-[20px] shadow-lg shadow-purple-500/20">
                      <Wallet />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Economia Financeira
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-400">
                          $8,000.00-$20,000.00
                        </span>
                        <span className="text-purple-400 font-semibold">
                          50%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full shadow-lg shadow-purple-600/50"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-[20px] shadow-lg shadow-pink-500/20">
                      <GraduationCap />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Plano Educacional
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-400">
                          $8,000.00-$20,000.00
                        </span>
                        <span className="text-pink-400 font-semibold">32%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-600 to-pink-500 h-full rounded-full shadow-lg shadow-pink-600/50"
                      style={{ width: "32%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-[20px] shadow-lg shadow-amber-500/20">
                      <Palmtree />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Plano de Aposentadoria
                      </div>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="text-gray-400">
                          $8,000.00-$20,000.00
                        </span>
                        <span className="text-amber-400 font-semibold">
                          18%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-600 to-amber-500 h-full rounded-full shadow-lg shadow-amber-600/50"
                      style={{ width: "18%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold mb-2 sm:mb-3">
                Análise Inteligente de Despesas e Receitas
              </h3>
              <p className="text-gray-400 text-[14px] sm:text-[15px] mb-5 sm:mb-8 leading-relaxed">
                Monitore, analise e otimize suas receitas e despesas com dados
                em tempo real.
              </p>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-3 sm:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-[13px] font-semibold text-yellow-400">
                        Rápido e Responsivo
                      </span>
                    </div>
                    <div className="text-[15px] font-medium mb-2">
                      Fluxo de Caixa
                    </div>
                    <div className="flex items-center gap-4 text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-sm shadow-sm shadow-purple-500/50"></div>
                        <span className="text-gray-400">Receitas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-sm shadow-sm shadow-cyan-500/50"></div>
                        <span className="text-gray-400">Despesas</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12px] focus:outline-none mb-2 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                      <option>Este Ano</option>
                      <option>Este Mês</option>
                      <option>Esta Semana</option>
                    </select>
                    <button className="text-gray-500 hover:text-gray-400 transition-colors">
                      <span className="text-[20px]">•••</span>
                    </button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[22px] sm:text-[28px] md:text-[32px] font-bold">
                      $324,495
                    </span>
                    <span className="text-[14px] text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      5.3%
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500 mb-1">Jan 2024</div>
                </div>

                <ResponsiveContainer width="100%" height={140}>
                  <LineChart
                    data={[
                      { income: 100, expense: 80 },
                      { income: 180, expense: 140 },
                      { income: 120, expense: 100 },
                      { income: 220, expense: 180 },
                      { income: 160, expense: 130 },
                      { income: 280, expense: 220 },
                      { income: 200, expense: 170 },
                      { income: 320, expense: 260 },
                      { income: 240, expense: 200 },
                      { income: 360, expense: 290 },
                    ]}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1a1a2e"
                      vertical={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-[11px] text-gray-500 mb-1">$0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-gray-500 mb-1">$200</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-gray-500 mb-1">$400</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold mb-2 sm:mb-3">
                Orçamento Automatizado e Previsão
              </h3>
              <p className="text-gray-400 text-[14px] sm:text-[15px] mb-5 sm:mb-8 leading-relaxed">
                Defina orçamentos automaticamente e obtenha previsões
                financeiras para um melhor gerenciamento.
              </p>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-3 sm:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  <h4 className="text-[17px] font-semibold">
                    Transações Recentes
                  </h4>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar"
                      className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-24 sm:w-40 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-4 gap-1 sm:gap-4 text-[10px] sm:text-[12px] text-gray-500 pb-3 border-b border-white/5">
                    <div>Nome do Estabelecimento</div>
                    <div>Categoria</div>
                    <div>Data</div>
                    <div className="text-right">Valor</div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 sm:gap-4 py-2 sm:py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-1 sm:px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20">
                        <CreditCard className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-medium">
                        Assinatura iCloud
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                      <span className="hidden sm:inline text-[13px] text-gray-400">
                        Premium
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">08 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$12.99
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 sm:gap-4 py-2 sm:py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-1 sm:px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center shadow-md shadow-pink-500/20">
                        <ShoppingBag className="w-4 h-4 text-pink-400" />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-medium">
                        Compras
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full shadow-sm shadow-pink-500/50"></div>
                      <span className="hidden sm:inline text-[13px] text-gray-400">
                        Compras
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">07 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$156.00
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 sm:gap-4 py-2 sm:py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-1 sm:px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/20">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-medium">
                        Assinatura
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                      <span className="hidden sm:inline text-[13px] text-gray-400">
                        Serviços
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">06 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$29.99
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 sm:gap-4 py-2 sm:py-3 items-center hover:bg-white/5 transition-colors rounded-lg px-1 sm:px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shadow-md shadow-green-500/20">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-[11px] sm:text-[13px] font-medium">
                        Salário
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                      <span className="hidden sm:inline text-[13px] text-gray-400">
                        Receita
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">01 Des 2024</div>
                    <div className="text-[13px] font-semibold text-green-400 text-right">
                      +$5,500.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-8 pb-12 sm:pt-10 sm:pb-20 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-[38px] sm:text-[50px] md:text-[60px] lg:text-[68px] font-bold mb-4 sm:mb-6 leading-[1.05] tracking-tight text-center lg:text-left">
                Uma Forma Mais Inteligente de
                <br />
                Gerenciar seu Dinheiro
              </h1>

              <p className="text-[14px] sm:text-[16px] md:text-[17px] text-gray-400 mb-6 sm:mb-10 leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0">
                Desenvolvido para profissionais e empresas, Daryan oferece um
                gerenciamento financeiro prático, seguro e intuitivo.
              </p>

              <div className="flex justify-center lg:justify-start">
                <button className="bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[14px] sm:text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105 inline-flex items-center gap-2">
                  Experimente Grátis
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-[#0a0a14]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Insights Financeiros Inteligentes
                      </div>
                      <div className="hidden sm:block text-[13px] text-gray-400">
                        Análises e previsões em tempo real
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Wallet className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Metas Financeiras Personalizadas
                      </div>
                      <div className="hidden sm:block text-[13px] text-gray-400">
                        Acompanhe e alcance seus objetivos
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 transition-all cursor-pointer backdrop-blur-sm">
                    <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <ShoppingBag className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Divisão Inteligente de Despesas
                      </div>
                      <div className="text-[13px] text-gray-300">
                        Divida contas facilmente com amigos, família ou colegas,
                        garantindo contribuições justas e acompanhamento claro
                        das despesas compartilhadas.
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Orçamento e Previsão Automatizados
                      </div>
                      <div className="hidden sm:block text-[13px] text-gray-400">
                        Defina orçamentos inteligentes automaticamente
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-bold mb-4 sm:mb-5 leading-[1.1] tracking-tight">
            Planos Flexíveis para Cada Necessidade
          </h2>
          <p className="text-[17px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Escolha um plano que se adapte aos seus objetivos financeiros – seja
            você
            <br />
            um indivíduo ou uma empresa.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-b from-white/10 to-white/[0.02] rounded-3xl border border-white/10 p-5 sm:p-8 hover:border-white/20 transition-all backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="text-[15px] text-gray-400 mb-2">
                  Plano Grátis
                </div>
                <div className="text-[24px] font-semibold mb-2">
                  Para Indivíduos
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-[48px] font-bold">$0</span>
                  <span className="text-[15px] text-gray-400">por mês</span>
                </div>
                <p className="text-[14px] text-gray-400 mb-8">
                  Ferramentas básicas para gerenciar seu dinheiro
                  <br />
                  sem custo.
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
                  Começar
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Rastreamento de saldo em tempo real",
                  "Insights básicos de fluxo de caixa",
                  "Categorização de despesas",
                  "Suporte da comunidade",
                  "Até 2 contas bancárias vinculadas",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-[14px]">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/40 via-purple-600/30 to-blue-600/40 rounded-[40px] blur-[40px] opacity-80"></div>

            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-purple-500/80 via-purple-600/90 to-blue-600/80">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-purple-600/40 to-blue-600/50 rounded-3xl blur-[20px]"></div>

              <div className="relative bg-[#0a0a14] rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-6 py-1.5 rounded-full text-[13px] font-semibold shadow-lg shadow-purple-600/50">
                    Plano Popular
                  </div>
                </div>

                <div className="text-center mb-8 mt-4">
                  <div className="text-[15px] text-gray-400 mb-2">
                    Plano Pro
                  </div>
                  <div className="text-[24px] font-semibold mb-2">
                    Para Freelancers
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-[48px] font-bold">$15</span>
                    <span className="text-[15px] text-gray-400">por mês</span>
                  </div>
                  <p className="text-[14px] text-gray-400 mb-8">
                    Insights avançados e automação
                    <br />
                    para usuários experientes.
                  </p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70">
                    Começar
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    "Tudo no Plano Grátis, mais:",
                    "Insights financeiros via IA",
                    "Contas bancárias vinculadas ilimitadas",
                    "Ferramentas de orçamento avançadas",
                    "Sincronização multi-dispositivo (Desktop e Mobile)",
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[14px]"
                    >
                      <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                      </div>
                      <span
                        className={i === 0 ? "text-gray-400" : "text-gray-300"}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-b from-white/10 to-white/[0.02] rounded-3xl border border-white/10 p-5 sm:p-8 hover:border-white/20 transition-all backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="text-[15px] text-gray-400 mb-2">
                  Plano Enterprise
                </div>
                <div className="text-[24px] font-semibold mb-2">
                  Para Empresas
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-[48px] font-bold">$35</span>
                  <span className="text-[15px] text-gray-400">por mês</span>
                </div>
                <p className="text-[14px] text-gray-400 mb-8">
                  Soluções personalizadas para
                  <br />
                  empresas.
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
                  Começar
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Tudo no Plano Pro, mais:",
                  "Gestão financeira de equipes",
                  "Segurança avançada e acesso por funções",
                  "Gerente de conta dedicado",
                  "Relatórios e análises personalizados",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-[14px]">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                    <span
                      className={i === 0 ? "text-gray-400" : "text-gray-300"}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center px-4 sm:px-8 md:px-12 py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20 xl:gap-30 w-full">
          <div>
            <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-bold leading-tight">
              Histórias Reais, Resultados Reais
            </h2>
            <p className="text-[17px] text-gray-400 mt-5 leading-relaxed">
              Veja como o Daryan está transformando a
              <br />
              forma como as pessoas gerenciam suas finanças.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 items-center w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-hidden flex-1">
              <div className="bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-white/10 w-full sm:min-w-[280px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  Como proprietário de uma empresa, gerenciar finanças era
                  exaustivo. Os relatórios e análises do Daryan me ajudaram a
                  otimizar meus gastos e aumentar meus lucros.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">David Lee</div>
                    <div className="text-[13px] text-gray-500">
                      Fundador de Startup
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-white/10 sm:min-w-[280px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  Adoro como o Daryan categoriza automaticamente minhas
                  despesas. A interface é amigável e me dá controle total sobre
                  minhas finanças.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">
                      Sophia Martinez
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Consultora de Marketing
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-5 sm:p-8 border border-white/10 sm:min-w-[280px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  Já experimentei vários aplicativos antes, mas o Daryan é de
                  longe o melhor. O plano de economia e os recursos de
                  acompanhamento de orçamento me mantêm no controle dos meus
                  objetivos.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">
                      Michael Johnson
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Fundador de Startup
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-purple-600/30 to-blue-900/50"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-purple-600 to-transparent blur-3xl opacity-60"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600 to-transparent blur-3xl opacity-60"></div>

            <div className="relative z-10 text-center py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12">
              <h2 className="text-[28px] sm:text-[38px] md:text-[52px] font-bold mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Assuma o Controle de Suas
                <br />
                Finanças Hoje!
              </h2>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto">
                Junte-se a milhares de usuários que confiam no Daryan para um
                <br />
                gerenciamento financeiro mais inteligente.
              </p>
              <button className="bg-white text-slate-900 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-[14px] sm:text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105">
                Começar
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InitialPage;
