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
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  ShoppingBag,
  Calendar,
  CreditCard,
  Zap,
  DollarSign,
  Target,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from '../components/Header'

const Dashboard = () => {
  const cashFlowData = [
    { month: "Jan", income: 4400, expense: 2200 },
    { month: "Feb", income: 5100, expense: 2800 },
    { month: "Mar", income: 4800, expense: 2400 },
    { month: "Apr", income: 5500, expense: 3100 },
    { month: "May", income: 5200, expense: 2900 },
    { month: "Jun", income: 6000, expense: 3500 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 30, color: "#6366F1" },
    { name: "Transportation", value: 20, color: "#06B6D4" },
    { name: "Shopping", value: 25, color: "#10B981" },
    { name: "Entertainment", value: 15, color: "#F59E0B" },
    { name: "Bills", value: 10, color: "#EF4444" },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: "Starbucks Coffee",
      category: "Food & Dining",
      date: "Today, 2:30 PM",
      amount: -12.5,
      icon: ShoppingBag,
      color: "#6366F1",
    },
    {
      id: 2,
      name: "Uber Ride",
      category: "Transportation",
      date: "Today, 10:15 AM",
      amount: -18.75,
      icon: Calendar,
      color: "#06B6D4",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      category: "Entertainment",
      date: "Yesterday",
      amount: -15.99,
      icon: CreditCard,
      color: "#F59E0B",
    },
    {
      id: 4,
      name: "Freelance Payment",
      category: "Income",
      date: "Feb 8",
      amount: 2500.0,
      icon: TrendingUp,
      color: "#10B981",
    },
    {
      id: 5,
      name: "Amazon Purchase",
      category: "Shopping",
      date: "Feb 7",
      amount: -89.99,
      icon: ShoppingBag,
      color: "#10B981",
    },
    {
      id: 6,
      name: "Electricity Bill",
      category: "Bills",
      date: "Feb 6",
      amount: -125.0,
      icon: Zap,
      color: "#EF4444",
    },
  ];

  const upcomingBills = [
    { name: "Netflix", date: "Feb 15", amount: 15.99, status: "warning" },
    { name: "Spotify", date: "Feb 18", amount: 9.99, status: "normal" },
    { name: "Internet", date: "Feb 20", amount: 79.99, status: "normal" },
  ];

  const insights = [
    {
      text: "You spent 20% less on dining this month! Keep it up! 🎉",
      type: "positive",
    },
    {
      text: "Consider setting aside $200 more for savings this month",
      type: "warning",
    },
    {
      text: "Your utility bills increased by 15% compared to last month",
      type: "alert",
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

      <div>
        <Header/>
      </div>

      <div className="relative z-10">
        <div className="flex">
          <Sidebar currentPage="/dashboard" />

          <main className="flex-1 p-8 max-w-[1400px]">
            <section className="mb-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-blue-600/30 rounded-[40px] blur-[60px] opacity-70"></div>

                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-[14px] text-gray-400 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Total Balance
                      </div>
                      <div className="text-[56px] font-bold leading-none bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-3">
                        $66,000.00
                      </div>
                      <div className="flex items-center gap-2 text-[14px]">
                        <span className="text-green-400 flex items-center gap-1 font-medium">
                          <ArrowUpRight className="w-4 h-4" />
                          +5.2%
                        </span>
                        <span className="text-gray-500">vs last month</span>
                      </div>
                    </div>

                    <select
                      defaultValue="This Month"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Year</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="relative group/card">
                      <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <TrendingUp className="w-7 h-7 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] text-gray-400 mb-1">
                              Income
                            </div>
                            <div className="text-[32px] font-bold leading-none mb-2">
                              $44,000.00
                            </div>
                            <div className="text-[13px] text-green-400 flex items-center gap-1">
                              <ArrowUpRight className="w-3 h-3" />
                              +12.5% from last month
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/card">
                      <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <TrendingDown className="w-7 h-7 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] text-gray-400 mb-1">
                              Expenses
                            </div>
                            <div className="text-[32px] font-bold leading-none mb-2">
                              $22,000.00
                            </div>
                            <div className="text-[13px] text-red-400 flex items-center gap-1">
                              <ArrowDownRight className="w-3 h-3" />
                              -2.4% from last month
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-[18px] font-semibold mb-2">
                        Cash Flow Overview
                      </div>
                      <div className="flex items-center gap-4 text-[13px]">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                          <span className="text-gray-400">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-1 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                          <span className="text-gray-400">Expense</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[28px] font-bold mb-1">+$22,000</div>
                      <span className="text-[12px] text-green-400 px-2 py-1 bg-green-400/10 rounded-md">
                        +2.7%
                      </span>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={cashFlowData}>
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
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#6366F1"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#06B6D4"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[12px] text-gray-500 mb-1">
                        Avg Income
                      </div>
                      <div className="text-[20px] font-bold text-purple-400">
                        $5,150
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-500 mb-1">
                        Avg Expense
                      </div>
                      <div className="text-[20px] font-bold text-cyan-400">
                        $2,817
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[18px] font-semibold">
                      Spending by Category
                    </div>
                    <div className="text-[28px] font-bold">$15,000</div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="relative w-40 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[28px] font-bold">100%</div>
                        <div className="text-[11px] text-gray-500">
                          Total Spent
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1">
                      {categoryData.map((item) => (
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
                          <span className="font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-semibold">
                      Recent Transactions
                    </h2>
                    <button className="text-[14px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-medium">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {recentTransactions.map((transaction) => {
                      const Icon = transaction.icon;
                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{
                              backgroundColor: `${transaction.color}20`,
                              boxShadow: `0 4px 12px ${transaction.color}20`,
                            }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: transaction.color }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] font-medium mb-1">
                              {transaction.name}
                            </div>
                            <div className="text-[13px] text-gray-500">
                              {transaction.date} • {transaction.category}
                            </div>
                          </div>

                          <div className="text-right">
                            <div
                              className={`text-[18px] font-bold ${
                                transaction.amount > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}$
                              {Math.abs(transaction.amount).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-[16px] font-semibold">
                      Monthly Budget
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[28px] font-bold">$3,200</span>
                      <span className="text-[14px] text-gray-500">
                        of $5,000
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">
                      64% used • $1,800 remaining
                    </div>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full shadow-lg shadow-purple-600/50 transition-all"
                      style={{ width: "64%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-green-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                      <Wallet className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-[16px] font-semibold">Savings Goal</h3>
                  </div>

                  <div className="mb-4">
                    <div className="text-[13px] text-gray-400 mb-2">
                      Emergency Fund
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[28px] font-bold text-green-400">
                        $2,400
                      </span>
                      <span className="text-[14px] text-gray-500">
                        of $10,000
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">
                      Target: July 2026
                    </div>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-500 h-full rounded-full shadow-lg shadow-green-600/50 transition-all"
                      style={{ width: "24%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-orange-600/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Calendar className="w-5 h-5 text-orange-400" />
                    </div>
                    <h3 className="text-[16px] font-semibold">
                      Upcoming Bills
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {upcomingBills.map((bill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                      >
                        <div>
                          <div className="text-[14px] font-medium mb-1">
                            {bill.name}
                          </div>
                          <div className="text-[12px] text-gray-500">
                            {bill.date}
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <div className="text-[15px] font-bold">
                            ${bill.amount}
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              bill.status === "warning"
                                ? "bg-orange-400 shadow-sm shadow-orange-400/50"
                                : "bg-green-400 shadow-sm shadow-green-400/50"
                            }`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-[20px] font-semibold">
                        AI-Powered Insights
                      </h2>
                      <p className="text-[13px] text-gray-400">
                        Smart recommendations based on your spending
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
                          className={`w-2 h-2 rounded-full mt-2 ${
                            insight.type === "positive"
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

                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 py-3 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                    View More Insights
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
