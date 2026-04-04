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
import { useState } from "react";

const Analytics = () => {

  const [open, setOpen] = useState(false)

  const selectedPeriod = "Últimos 6 Meses";
  const selectedView = "visão geral";

  const monthlyData = [
    { month: "Ago", income: 4400, expense: 2200, savings: 2200 },
    { month: "Set", income: 5100, expense: 2800, savings: 2300 },
    { month: "Out", income: 4800, expense: 2400, savings: 2400 },
    { month: "Nov", income: 5500, expense: 3100, savings: 2400 },
    { month: "Dez", income: 5200, expense: 2900, savings: 2300 },
    { month: "Jan", income: 6000, expense: 3500, savings: 2500 },
  ];

  const categorySpending = [
    { name: "Alimentação", value: 1200, percentage: 30, color: "#6366F1" },
    { name: "Transporte", value: 800, percentage: 20, color: "#06B6D4" },
    { name: "Compras", value: 1000, percentage: 25, color: "#10B981" },
    { name: "Entretenimento", value: 600, percentage: 15, color: "#F59E0B" },
    { name: "Contas", value: 400, percentage: 10, color: "#EF4444" },
  ];

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
      value: "$5,167",
      change: "+8.2%",
      trend: "up",
    },
    {
      label: "Despesa Mensal Média",
      value: "$2,817",
      change: "-3.1%",
      trend: "down",
    },
    {
      label: "Taxa de Economia",
      value: "45.5%",
      change: "+5.3%",
      trend: "up",
    },
    {
      label: "Maior Categoria de Gastos",
      value: "Alimentação",
      change: "30%",
      trend: "neutral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <div>
          <Header />
        </div>

        <div className="flex">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen}/>
          </div>

          <main className="flex-1 p-4 md:p-8 max-w-[1400px] mt-20">
            <div className="mb-8">
              <h1 className="text-[24px] md:text-[35px] font-bold mb-3">Análise Financeira</h1>
              <p className="text-[14px] md:text-[16px] text-gray-400 w-full md:w-[50%]">
                Insights detalhados sobre seus padrões de gastos e saúde
                financeira
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                <select
                  defaultValue={selectedPeriod}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <option>Últimos 6 Meses</option>
                  <option>Últimos 12 Meses</option>
                  <option>Este Ano</option>
                  <option>Todo o Tempo</option>
                </select>

                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                  {["visão geral", "receita", "despesas"].map((view) => (
                    <button
                      key={view}
                      className={`px-3 md:px-4 py-2 rounded-lg text-[13px] md:text-[14px] font-medium capitalize transition-all flex-1 sm:flex-none ${
                        selectedView === view
                          ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all w-full sm:w-auto">
                <Download className="w-4 h-4" />
                Exportar Relatório
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className="text-[13px] text-gray-400 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-[20px] md:text-[28px] font-bold mb-2">
                      {stat.value}
                    </div>
                    <div
                      className={`text-[13px] flex items-center gap-1 ${
                        stat.trend === "up"
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
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-gray-400">Receita</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                          <span className="text-gray-400">Despesas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                          <span className="text-gray-400">Economias</span>
                        </div>
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
                      />
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                      />
                      <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#EF4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorExpense)"
                      />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={false}
                      />
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
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3 flex-1">
                      {categorySpending.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: item.color,
                                boxShadow: `0 0 8px ${item.color}40`,
                              }}
                            ></div>
                            <span className="text-[14px] text-gray-400">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-500">
                              ${item.value}
                            </span>
                            <span className="text-[14px] font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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

              {/* Income Sources */}
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
                          ${source.amount.toLocaleString()}
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
                          Gastos Elevados com Alimentação
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Alimentação representa 30% das suas despesas totais.
                          Considere definir um orçamento mais rigoroso para esta
                          categoria.
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
