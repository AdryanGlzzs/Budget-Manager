import {
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useThemeColors } from "../contexts/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { api } from "../services/api";
import type { TransactionProps } from "../components/TransactionModal";
import type { Goalsprops } from "../components/SavingGoalsModal";

const Analytics = () => {
  const [open, setOpen] = useState(false);
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];
  const [transaction, setTransaction] = useState<TransactionProps[]>([])
  const [savings, setSavings] = useState<Goalsprops[]>([])

  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 6 Meses");
  const [selectedView, setSelectedView] = useState("visão geral");

  const getTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      if (response?.data?.data) {
        setTransaction(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar transações no Analytics:", error);
    }
  };

  const getSavingGoals = async () => {
    try {
      const response = await api.get('/savings-goals');
      if (response?.data?.data) {
        setSavings(response.data.data);
        console.log(response)
      }
    } catch (error) {
      console.error("Erro ao carregar metas no Analytics:", error);
    }
  };

  useEffect(() => {
    getTransactions();
    getSavingGoals();
  }, []);

  const revenues = transaction.filter((t) => t.type === 'revenue')
  const expenses = transaction.filter((t) => t.type === 'expense')

  console.log(revenues)
  console.log(expenses)

  const totalRevenue = revenues.reduce((acc, item) => acc + Number(item.amount), 0)
  const totalExpense = expenses.reduce((acc, item) => acc + Number(item.amount), 0)



  const savingRate = totalRevenue > 0 ? (((totalRevenue - totalExpense) / totalRevenue) * 100).toFixed(1) : "0.0"

  const topCategory = expenses.reduce((acc, t) => {
    const sum = (acc.totals[t.category] || 0) + Number(t.amount);
    acc.totals[t.category] = sum;
    if (sum > acc.amount) { acc.name = t.category; acc.amount = sum; }
    return acc;
  }, { name: "-", amount: 0, totals: {} as Record<string, number> });

  const topCategoryPercent = totalExpense > 0 ? ((topCategory.amount / totalExpense) * 100).toFixed(0) : "0"

  console.log(revenues)
  console.log(expenses)


  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const monthlyData = Array.from({ length: 6 }).map((_, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - (5 - index));
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthTransactions = transaction.filter((t) => {
      if (!t.date) return false;
      const [tYear, tMonth] = t.date.split("-").map(Number);
      return tMonth - 1 === month && tYear === year;
    });

    const income = monthTransactions
      .filter((t) => t.type === "revenue")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);

    return {
      month: months[month],
      income,
      expense,
      savings: Math.max(0, income - expense),
    };
  });

  const categoryColors: Record<string, string> = {
    Alimentação: "#6366F1",
    Transporte: "#06B6D4",
    Moradia: "#10B981",
    Saúde: "#EF4444",
    Educação: "#8B5CF6",
    Lazer: "#F59E0B",
    Compras: "#EC4899",
    Contas: "#F97316",
    Assinaturas: "#3B82F6",
    Investimentos: "#14B8A6",
    Viagens: "#A855F7",
    Outros: "#64748B",
  };

  const defaultPalette = [
    "#6366F1",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
    "#3B82F6",
    "#14B8A6",
  ];

  const categoryTotals = expenses.reduce((acc, t) => {
    const cat = t.category?.trim() || "Outros";
    const amount = Number(t.amount) || 0;

    if (!acc[cat]) {
      acc[cat] = {
        name: cat,
        value: 0,
        color:
          t.color ||
          categoryColors[cat] ||
          defaultPalette[Object.keys(acc).length % defaultPalette.length],
      };
    }

    acc[cat].value += amount;
    return acc;
  }, {} as Record<string, { name: string; value: number; color: string }>);

  const categorySpending = Object.values(categoryTotals)
    .map((item) => ({
      ...item,
      percentage: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const weeklySpending = [
    { week: "Semana 1", spending: 450 },
    { week: "Semana 2", spending: 620 },
    { week: "Semana 3", spending: 380 },
    { week: "Semana 4", spending: 550 },
  ];

  const incomeBreakdown = [
    { source: "Salário", amount: 5500, color: "#10B981" },
    { source: "Freelancer", amount: 2500, color: "#6366F1" },
    { source: "Investimentos", amount: 800, color: "#F59E0B" },
    { source: "Outros", amount: 200, color: "#06B6D4" },
  ];

  const stats = [
    {
      label: "Receita Mensal Média",
      value: formatCurrency(totalRevenue),
      change: "+8.2%",
      trend: "up",
    },
    {
      label: "Despesa Mensal Média",
      value: formatCurrency(totalExpense),
      change: "-3.1%",
      trend: "down",
    },
    {
      label: "Taxa de Economia",
      value: `${savingRate} %`,
      change: "+5.3%",
      trend: "up",
    },
    {
      label: "Maior Categoria de Gastos",
      value: `${topCategory.name}`,
      change: `${topCategoryPercent}%`,
      trend: "neutral",
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

      <div className="relative z-10">
        <div>
          <Header />
        </div>

        <div className="flex">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 p-4 md:p-8 max-w-350 mt-20">
            <div className="mb-8">
              <h1 className="text-[24px] md:text-[35px] font-bold mb-3">
                Análise Financeira
              </h1>
              <p className="text-[14px] md:text-[16px] text-gray-400 w-full md:w-[50%]">
                Insights detalhados sobre seus padrões de gastos e saúde
                financeira
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <option value="Últimos 6 Meses">Últimos 6 Meses</option>
                  <option value="Últimos 12 Meses">Últimos 12 Meses</option>
                  <option value="Este Ano">Este Ano</option>
                  <option value="Todo o Tempo">Todo o Tempo</option>
                </select>

                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                  {["visão geral", "receita", "despesas"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`px-3 md:px-4 py-2 rounded-lg text-[13px] md:text-[14px] font-medium capitalize transition-all flex-1 sm:flex-none cursor-pointer ${selectedView === view
                        ? theme.activeBg
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <button className={`flex items-center justify-center gap-2 px-5 py-2.5 ${theme.activeBg} rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02] w-full sm:w-auto`}>
                <Download className="w-4 h-4" />
                Exportar Relatório
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className="text-[13px] text-gray-400 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-[20px] md:text-[28px] font-bold mb-2">
                      {stat.value}
                    </div>
                    <div
                      className={`text-[13px] flex items-center gap-1 ${stat.trend === "up"
                        ? "text-green-400"
                        : stat.trend === "down"
                          ? "text-red-400"
                          : "text-gray-400"
                        }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : stat.trend === "down" ? (
                        <ArrowDownRight className="w-3 h-3" />
                      ) : null}
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative group md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[20px] font-semibold mb-2">
                        Tendência de Receitas vs Despesas
                      </h2>
                      <div className="flex items-center gap-4 text-[13px]">
                        {(selectedView === "visão geral" || selectedView === "receita") && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            <span className="text-gray-400">Receita</span>
                          </div>
                        )}
                        {(selectedView === "visão geral" || selectedView === "despesas") && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span className="text-gray-400">Despesas</span>
                          </div>
                        )}
                        {selectedView === "visão geral" && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                            <span className="text-gray-400">Economias</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient
                          id="colorIncome"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorExpense"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#EF4444"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#EF4444"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1a1a2e"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#6B7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0a0a14",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                        }}
                        formatter={(value: any, name: any) => [
                          formatCurrency(Number(value) || 0),
                          name === "income"
                            ? "Receita"
                            : name === "expense"
                              ? "Despesas"
                              : name === "savings"
                                ? "Economias"
                                : name,
                        ]}
                      />
                      {(selectedView === "visão geral" || selectedView === "receita") && (
                        <Area
                          type="monotone"
                          dataKey="income"
                          name="Receita"
                          stroke="#10B981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorIncome)"
                        />
                      )}
                      {(selectedView === "visão geral" || selectedView === "despesas") && (
                        <Area
                          type="monotone"
                          dataKey="expense"
                          name="Despesas"
                          stroke="#EF4444"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorExpense)"
                        />
                      )}
                      {selectedView === "visão geral" && (
                        <Line
                          type="monotone"
                          dataKey="savings"
                          name="Economias"
                          stroke="#6366F1"
                          strokeWidth={2}
                          dot={false}
                        />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Gastos por Categoria
                  </h2>

                  {categorySpending.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <p className="text-[14px]">Nenhum gasto registrado ainda.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-40 h-40 sm:w-48 sm:h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categorySpending}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={85}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {categorySpending.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#0a0a14",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                              }}
                              formatter={(value: any) => [
                                formatCurrency(Number(value) || 0),
                                "Gasto",
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3 flex-1 max-h-56 overflow-y-auto pr-1">
                        {categorySpending.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{
                                  backgroundColor: item.color,
                                  boxShadow: `0 0 8px ${item.color}40`,
                                }}
                              ></div>
                              <span className="text-[14px] text-gray-400 truncate max-w-[120px]">
                                {item.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[13px] text-gray-500">
                                {formatCurrency(item.value)}
                              </span>
                              <span className="text-[14px] font-medium">
                                {item.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Padrão de Gastos Semanal
                  </h2>

                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={weeklySpending}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1a1a2e"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="week"
                        stroke="#6B7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0a0a14",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                        }}
                      />
                      <Bar
                        dataKey="spending"
                        fill="url(#barGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="relative group md:col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Detalhamento de Receitas
                  </h2>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {incomeBreakdown.map((source, index) => (
                      <div
                        key={index}
                        className="bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                          style={{
                            backgroundColor: `${source.color}20`,
                            boxShadow: `0 4px 12px ${source.color}20`,
                          }}
                        >
                          <DollarSign
                            className="w-6 h-6"
                            style={{ color: source.color }}
                          />
                        </div>
                        <div className="text-[14px] text-gray-400 mb-2">
                          {source.source}
                        </div>
                        <div className="text-[24px] font-bold">
                          {formatCurrency(source.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-[20px] font-semibold mb-6">
                  Principais Insights Financeiros
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Forte Tendência de Economia
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Sua taxa de economia aumentou 5,3% nos últimos 6
                          meses, mantendo você no caminho certo para seus
                          objetivos financeiros.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Gastos Elevados com {topCategory.name !== "-" ? topCategory.name : "Alimentação"}
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          {topCategory.name !== "-"
                            ? `${topCategory.name} representa ${topCategoryPercent}% das suas despesas totais. Considere definir um orçamento mais rigoroso para esta categoria.`
                            : "Alimentação representa 30% das suas despesas totais. Considere definir um orçamento mais rigoroso para esta categoria."}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Receita Diversificada
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Você tem 4 fontes de receita diferentes, o que
                          proporciona boa estabilidade financeira e
                          diversificação de riscos.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Redução de Despesas
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Suas despesas mensais médias diminuíram 3,1%,
                          mostrando uma melhoria na disciplina de gastos.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>


    </div>
  );
};

export default Analytics;
