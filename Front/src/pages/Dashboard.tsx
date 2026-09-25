import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Zap,
  DollarSign,
  Target,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useThemeColors } from "../contexts/ThemeContext";
import { api } from "../services/api";
import type { TransactionProps } from "../components/TransactionModal";
import type { BudgetsProps } from "../components/BudgetModal";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];
  const [cash, setCash] = useState<TransactionProps[]>([]);
  const [transaction, setTransaction] = useState<TransactionProps[]>([]);
  const [budgets, setBudgets] = useState<BudgetsProps[]>([]);

  const getTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      if (response?.data?.data) {
        setTransaction(response.data?.data);
        setCash(response.data?.data);
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  const getBudgets = async () => {
    try {
      const response = await api.get('/budgets');
      if (response?.data?.data) {
        setBudgets(response.data.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Erro ao buscar orçamentos:", error);
    }
  };

  useEffect(() => {
    getTransactions();
    getBudgets();
  }, []);

  const chartData = (() => {
    const grouped = cash.reduce(
      (acc, transaction) => {
        const rawDate = transaction.date;
        const date = new Date(transaction.date).toLocaleDateString("pt-BR");

        let existing = acc.find((item) => item.date === date);

        if (!existing) {
          existing = {
            rawDate,
            date,
            revenue: 0,
            expense: 0,
          };
          acc.push(existing);
        }

        if (transaction.type === "revenue" || transaction.type === "expense") {
          existing.revenue += Number(transaction.amount);
        }

        if (transaction.type === "expense") {
          existing.expense += Number(transaction.amount);
        }

        return acc;
      },
      [] as {
        rawDate: string;
        date: string;
        revenue: number;
        expense: number;
      }[]
    );

    grouped.sort(
      (a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
    );

    let accRevenue = 0;
    let accExpense = 0;

    const accumulated = grouped.map((item) => {
      accRevenue += item.revenue;
      accExpense += item.expense;

      return {
        ...item,
        revenue: accRevenue,
        expense: accExpense,
      };
    });

    if (accumulated.length === 0) return [];

    const startPoint = {
      rawDate: accumulated[0].rawDate,
      date: "Início",
      revenue: 0,
      expense: 0,
    };

    return [startPoint, ...accumulated];
  })();

  const expensesCategory = transaction
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find(
        (item) => item.name === t.category
      );

      if (existing) {
        existing.value += Number(t.amount);
      } else {
        acc.push({
          name: t.category,
          value: Number(t.amount),
          color: t.color
        });
      }

      return acc;
    }, [] as { name: string; value: number; color: string }[]);


  const TotalRevenue = transaction.filter((t) => t.type === 'revenue').reduce((acc, t) => acc + Number(t.amount || 0), 0)

  const TotalExpense = transaction.filter((t) => t.type === "expense").reduce((acc, t) => acc + Number(t.amount || 0), 0)


  const Total = TotalRevenue - TotalExpense


  const totalFlow = TotalExpense + TotalRevenue;





  const insights = [
    {
      text: "Você gastou 20% a menos em alimentação este mês! Continue assim! 🎉",
      type: "positive",
    },
  ];

  return (
    <div className={`min-h-screen ${theme.bg} text-white overflow-hidden transition-colors duration-500`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -left-50 -top-50 w-150 h-150 bg-linear-to-br ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -right-50 -top-50 w-150 h-150 bg-linear-to-bl ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -left-50 -bottom-50 w-150 h-150 bg-linear-to-tr ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -right-50 -bottom-50 w-150 h-150 bg-linear-to-tl ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
      </div>

      <div>
        <Header />
      </div>

      <div className="lg:block sm:relative z-20">
        <div className="flex">
          <div className="hidden lg:block w-64 shrink-0 z-100">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="sm:flex-1 p-4 max-w-350 z-10">
            <section className="mb-8 mt-20">
              <div className="relative group">
                <div className={`absolute -inset-4 bg-linear-to-br ${theme.glow} rounded-[40px] blur-[60px] opacity-80 transition-all duration-700`}></div>
                <div className="flex flex-col bg-linear-to-br from-white/10 to-white/2 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6">
                    <div>
                      <div className="text-[14px] text-gray-400 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Saldo Total
                      </div>
                      <div className="mt-5 text-[45px] font-bold leading-none bg-linear-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-3">
                        R$ {Total.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <span className="text-green-400 flex items-center gap-1 font-medium">
                          <ArrowUpRight className="w-4 h-4" />
                          +5.2%
                        </span>
                        <span className="text-gray-500">vs mês anterior</span>
                      </div>
                    </div>

                    <section className="absolute top-5 right-5 sm:top-10">
                      <select
                        defaultValue="Este Mês"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <option>Este Mês</option>
                        <option>Mês Passado</option>
                        <option>Este Ano</option>
                      </select>
                    </section>
                  </div>

                  <div className="sm:grid sm:grid-cols-2 gap-5 flex flex-col">
                    <div className="block sm:relative group/card">
                      <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity"></div>
                      <div className="relative bg-linear-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <TrendingUp className="w-7 h-7 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] text-gray-400 mb-1">
                              Receita
                            </div>
                            <div className="text-[32px] font-bold leading-none mb-2">
                              R$ {TotalRevenue.toFixed(2)}
                            </div>
                            <div className="text-[13px] text-green-400 flex items-center gap-1">
                              <ArrowUpRight className="w-3 h-3" />
                              +12.5% desde o mês passado
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/card">
                      <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity"></div>
                      <div className="relative bg-linear-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <TrendingDown className="w-7 h-7 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] text-gray-400 mb-1">
                              Despesas
                            </div>
                            <div className="text-[32px] font-bold leading-none mb-2">
                              R$ {TotalExpense.toFixed(2)}
                            </div>
                            <div className="text-[13px] text-red-400 flex items-center gap-1">
                              <ArrowDownRight className="w-3 h-3" />
                              -2.4% desde o mês passado
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="sm:grid sm:grid-cols-2 sm:gap-6 sm:mb-8 sm:items-stretch">
              <div className="relative group min-w-0">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all min-w-0">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-[18px] font-semibold mb-2">
                        Visão Geral de Fluxo de Caixa
                      </div>
                      <div className="flex items-center gap-4 text-[13px]">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                          <span className="text-gray-400">Receita</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                          <span className="text-gray-400">Despesa</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[28px] font-bold mb-1">R$ {totalFlow.toFixed(2).replace(".", ",")}</div>
                      <span className="text-[12px] text-green-400 px-2 py-1 bg-green-400/10 rounded-md">
                        +2.7%
                      </span>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1a1a2e"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        stroke="#6B7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        orientation="right"
                        stroke="#6B7280"
                        style={{ fontSize: "11px" }}
                        domain={[0, "auto"]}
                        tickFormatter={(val) =>
                          val >= 1000 ? `R$ ${(val / 1000).toFixed(1)}k` : `R$ ${val}`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d0e1b",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                        formatter={(val: any, name: any) => [
                          `R$ ${Number(val || 0).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}`,
                          name === "revenue" ? "Receita Acumulada" : "Despesa Acumulada",
                        ]}
                      />
                      <Line
                        type="linear"
                        dataKey="revenue"
                        name="revenue"
                        stroke="#6366F1"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#6366F1" }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="linear"
                        dataKey="expense"
                        name="expense"
                        stroke="#06B6D4"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#06B6D4" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="m t-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[12px] text-gray-500 mb-1">
                        Receita Média
                      </div>
                      <div className="text-[20px] font-bold text-purple-400">
                        $5,150
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-500 mb-1">
                        Despesa Média
                      </div>
                      <div className="text-[20px] font-bold text-cyan-400">
                        $2,817
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group min-w-0">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[18px] font-semibold">
                      Gastos por Categoria
                    </div>
                    <div className="text-[28px] font-bold">R$ {TotalExpense.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className={`relative w-40 h-40 ${expensesCategory.length === 0 ? "hidden" : 'relative'}`}>
                      <PieChart width={160} height={160}>
                        <Pie
                          data={expensesCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {expensesCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[13px] text-gray-500">
                          Total Gasto
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1">
                      {expensesCategory.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between text-[13px]"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full shadow-md"
                              style={{
                                backgroundColor: item.color,
                                boxShadow: `0 0 8px ${item.color}40`,
                              }}
                            ></div>
                            <span className="text-gray-400">{item.name}</span>
                          </div>
                          <span className="font-medium">R$ {item.value.toFixed(2)}</span>
                          <span className="font-medium">{TotalExpense > 0 ? `${((item.value / TotalExpense) * 100).toFixed(1)}%` : "0%"}</span>
                        </div>
                      ))}

                      {expensesCategory.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <div
                            className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center mb-3"
                          >
                            <span className="text-gray-500 text-lg">∅</span>
                          </div>

                          <span className="text-sm font-medium text-gray-400">
                            Nenhuma categoria encontrada
                          </span>

                          <span className="text-xs text-gray-600 mt-1">
                            Não há gastos registrados por categoria.
                          </span>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            </section>

            <section className="mb-8 mt-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-semibold">
                      Transações Recentes
                    </h2>
                    <button className="text-[14px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-medium">
                      Ver Tudo
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {transaction.length === 0 ? (
                      <div className="text-[14px] text-gray-500 py-4 text-center">
                        Nenhuma transação encontrada.
                      </div>
                    ) : (
                      transaction.slice(0, 3).map((item) => {
                        const isRevenue = item.type === "revenue";
                        const amountNumber = Number(item.amount);
                        const displayDate = new Date(item.date).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "short",
                        });

                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                              style={{
                                backgroundColor: `${item.color || (isRevenue ? "#22c55e" : "#ef4444")}20`,
                                boxShadow: `0 4px 12px ${item.color || (isRevenue ? "#22c55e" : "#ef4444")}20`,
                              }}
                            >
                              {isRevenue ? (
                                <TrendingUp className="w-5 h-5 text-green-400" />
                              ) : (
                                <TrendingDown className="w-5 h-5 text-red-400" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-[15px] font-medium mb-1">
                                {item.name || item.category}
                              </div>
                              <div className="text-[13px] text-gray-500">
                                {displayDate} • {item.category}
                              </div>
                            </div>

                            <div className="text-right">
                              <div
                                className={`text-[18px] font-bold ${isRevenue ? "text-green-400" : "text-red-400"
                                  }`}
                              >
                                {isRevenue ? "+" : "-"}R${" "}
                                {amountNumber.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-semibold">Orçamentos</h2>
                <span className="text-[13px] text-gray-400">
                  Mostrando {Math.min(3, budgets.length)} de {budgets.length}
                </span>
              </div>

              {budgets.length === 0 ? (
                <div className="bg-linear-to-br from-white/10 to-white/2 p-8 rounded-2xl border border-white/10 text-center text-gray-400">
                  Nenhum orçamento cadastrado.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {budgets.slice(0, 3).map((budget) => {
                    const spent = Number(budget.spent || 0);
                    const limit = Number(budget.limit || 0);
                    const remaining = Math.max(0, limit - spent);
                    const percentage =
                      limit > 0
                        ? Math.min(100, Math.round((spent / limit) * 100))
                        : 0;
                    const cardColor = budget.color || "#8B5CF6";

                    return (
                      <div key={budget.id} className="relative group">
                        <div
                          className="absolute inset-0 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity"
                          style={{ backgroundColor: `${cardColor}40` }}
                        ></div>
                        <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                                style={{
                                  backgroundColor: `${cardColor}30`,
                                  boxShadow: `0 4px 12px ${cardColor}30`,
                                }}
                              >
                                <Target className="w-5 h-5" style={{ color: cardColor }} />
                              </div>
                              <div>
                                <h3 className="text-[16px] font-semibold truncate max-w-35">
                                  {budget.name}
                                </h3>
                                <span className="text-[12px] text-gray-500">
                                  {budget.period === "monthly" ? "Mensal" : budget.period === "next-month" ? "Próximo mês" : budget.period === "quarterly" ? "Trimestral" : budget.period === "yearly" ? "Anual" : budget.period === "custom" ? "Personalizado" : budget.period}
                                </span>
                              </div>
                            </div>
                            <span
                              className="text-[12px] font-bold px-2 py-1 rounded-md"
                              style={{
                                backgroundColor: `${cardColor}20`,
                                color: cardColor,
                              }}
                            >
                              {percentage}%
                            </span>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-[26px] font-bold">
                                R$ {spent.toFixed(2)}
                              </span>
                              <span className="text-[13px] text-gray-500">
                                de R$ {limit.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-[12px] text-gray-400">
                              R$ {remaining.toFixed(2)} restante
                            </div>
                          </div>

                          <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: cardColor,
                                boxShadow: `0 0 12px ${cardColor}80`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-500/20 via-transparent to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-linear-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-semibold">
                        Insights com IA
                      </h2>
                      <p className="text-[13px] text-gray-400">
                        Recomendações inteligentes baseadas nos seus gastos
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${insight.type === "positive"
                            ? "bg-green-400 shadow-sm shadow-green-400/50"
                            : insight.type === "warning"
                              ? "bg-yellow-400 shadow-sm shadow-yellow-400/50"
                              : "bg-red-400 shadow-sm shadow-red-400/50"
                            }`}
                        ></div>
                        <p className="text-[14px] text-gray-300 leading-relaxed">
                          {insight.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-linear-to-r from-purple-600 to-purple-500 py-3 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                    Ver Mais Insights
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;