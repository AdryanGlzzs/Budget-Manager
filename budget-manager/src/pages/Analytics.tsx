import { useState } from "react";
import {
  LineChart,
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
  Legend,
} from "recharts";
import Logo from "../images/logo.png";
import {
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from "lucide-react";
import Sidebar from "../components/sidebar";

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 6 Months");
  const [selectedView, setSelectedView] = useState("overview");

  // Mock data
  const monthlyData = [
    { month: "Aug", income: 4400, expense: 2200, savings: 2200 },
    { month: "Sep", income: 5100, expense: 2800, savings: 2300 },
    { month: "Oct", income: 4800, expense: 2400, savings: 2400 },
    { month: "Nov", income: 5500, expense: 3100, savings: 2400 },
    { month: "Dec", income: 5200, expense: 2900, savings: 2300 },
    { month: "Jan", income: 6000, expense: 3500, savings: 2500 },
  ];

  const categorySpending = [
    { name: "Food & Dining", value: 1200, percentage: 30, color: "#6366F1" },
    { name: "Transportation", value: 800, percentage: 20, color: "#06B6D4" },
    { name: "Shopping", value: 1000, percentage: 25, color: "#10B981" },
    { name: "Entertainment", value: 600, percentage: 15, color: "#F59E0B" },
    { name: "Bills", value: 400, percentage: 10, color: "#EF4444" },
  ];

  const weeklySpending = [
    { week: "Week 1", spending: 450 },
    { week: "Week 2", spending: 620 },
    { week: "Week 3", spending: 380 },
    { week: "Week 4", spending: 550 },
  ];

  const incomeBreakdown = [
    { source: "Salary", amount: 5500, color: "#10B981" },
    { source: "Freelance", amount: 2500, color: "#6366F1" },
    { source: "Investments", amount: 800, color: "#F59E0B" },
    { source: "Other", amount: 200, color: "#06B6D4" },
  ];

  const stats = [
    {
      label: "Average Monthly Income",
      value: "$5,167",
      change: "+8.2%",
      trend: "up",
    },
    {
      label: "Average Monthly Expense",
      value: "$2,817",
      change: "-3.1%",
      trend: "down",
    },
    {
      label: "Savings Rate",
      value: "45.5%",
      change: "+5.3%",
      trend: "up",
    },
    {
      label: "Largest Expense Category",
      value: "Food",
      change: "30%",
      trend: "neutral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-[#050510]/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <img src={Logo} className="w-32" alt="Daryan Logo" />
                <div className="h-8 w-px bg-white/10"></div>
                <div>
                  <div className="text-[13px] text-gray-500">Welcome back,</div>
                  <div className="text-[17px] font-semibold">Adryan Gomes</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search analytics..."
                    className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[14px] w-72 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                  />
                </div>

                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center font-semibold">
                    AG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <Sidebar currentPage="analytics" />

          {/* Main Content */}
          <main className="flex-1 p-8 max-w-[1400px]">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-[42px] font-bold mb-3">
                Financial Analytics
              </h1>
              <p className="text-[16px] text-gray-400">
                Deep insights into your spending patterns and financial health
              </p>
            </div>

            {/* Period Selector and Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                  <option>This Year</option>
                  <option>All Time</option>
                </select>

                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                  {["overview", "income", "expenses"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`px-4 py-2 rounded-lg text-[14px] font-medium capitalize transition-all ${
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

              <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-5 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                    <div className="text-[13px] text-gray-400 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-[28px] font-bold mb-2">
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

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Income vs Expenses Over Time */}
              <div className="relative group col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[20px] font-semibold mb-2">
                        Income vs Expenses Trend
                      </h2>
                      <div className="flex items-center gap-4 text-[13px]">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-gray-400">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                          <span className="text-gray-400">Expenses</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                          <span className="text-gray-400">Savings</span>
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

              {/* Category Distribution */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Spending by Category
                  </h2>

                  <div className="flex items-center gap-6">
                    <div className="w-48 h-48">
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

              {/* Weekly Spending Trend */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Weekly Spending Pattern
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
              <div className="relative group col-span-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Income Breakdown
                  </h2>

                  <div className="grid grid-cols-4 gap-5">
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

            {/* Financial Insights */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-[20px] font-semibold mb-6">
                  Key Financial Insights
                </h2>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Strong Savings Trend
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Your savings rate has increased by 5.3% over the last
                          6 months, keeping you on track for your financial
                          goals.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          High Food Spending
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Food & Dining represents 30% of your total expenses.
                          Consider setting a stricter budget for this category.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Diversified Income
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          You have 4 different income sources, which provides
                          good financial stability and risk diversification.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-[15px] font-medium mb-2">
                          Expense Reduction
                        </div>
                        <div className="text-[13px] text-gray-400 leading-relaxed">
                          Your average monthly expenses decreased by 3.1%,
                          showing improved spending discipline.
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