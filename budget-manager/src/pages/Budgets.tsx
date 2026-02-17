import Logo from "../images/logo.png";
import {
  Search,
  Bell,
  Plus,
  Target,
  TrendingUp,
  ShoppingBag,
  Coffee,
  Car,
  Zap,
  Home,
  Smartphone,
  Calendar,
  AlertCircle,
  ChevronRight,
  Edit,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const Budgets = () => {
  const budgets = [
    {
      id: 1,
      name: "Food & Dining",
      icon: Coffee,
      color: "#6366F1",
      spent: 450,
      limit: 600,
      percentage: 75,
      trend: "+5%",
      trendType: "up",
    },
    {
      id: 2,
      name: "Transportation",
      icon: Car,
      color: "#06B6D4",
      spent: 180,
      limit: 300,
      percentage: 60,
      trend: "-12%",
      trendType: "down",
    },
    {
      id: 3,
      name: "Shopping",
      icon: ShoppingBag,
      color: "#10B981",
      spent: 890,
      limit: 800,
      percentage: 111,
      trend: "+25%",
      trendType: "up",
    },
    {
      id: 4,
      name: "Bills & Utilities",
      icon: Zap,
      color: "#EF4444",
      spent: 320,
      limit: 400,
      percentage: 80,
      trend: "+8%",
      trendType: "up",
    },
    {
      id: 5,
      name: "Entertainment",
      icon: Smartphone,
      color: "#F59E0B",
      spent: 150,
      limit: 250,
      percentage: 60,
      trend: "-5%",
      trendType: "down",
    },
    {
      id: 6,
      name: "Housing",
      icon: Home,
      color: "#8B5CF6",
      spent: 1800,
      limit: 1800,
      percentage: 100,
      trend: "0%",
      trendType: "neutral",
    },
  ];

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalPercentage = Math.round((totalSpent / totalBudget) * 100);

  const overBudgetCategories = budgets.filter((b) => b.percentage > 100);
  const warningCategories = budgets.filter(
    (b) => b.percentage >= 80 && b.percentage <= 100,
  );

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
                    placeholder="Search budgets..."
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
          <Sidebar currentPage="budgets" />

          {/* Main Content */}
          <main className="flex-1 p-8 max-w-[1400px]">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[42px] font-bold mb-3">Budget Manager</h1>
                <p className="text-[16px] text-gray-400">
                  Create and track budgets for different spending categories
                </p>
              </div>

              <button className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[15px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02]">
                <Plus className="w-5 h-5" />
                Create Budget
              </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Total Budget */}
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Target className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">
                      Total Budget
                    </div>
                  </div>
                  <div className="text-[36px] font-bold mb-2">
                    ${totalBudget.toLocaleString()}
                  </div>
                  <div className="text-[13px] text-gray-400">
                    Across all categories
                  </div>
                </div>
              </div>

              {/* Total Spent */}
              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">Total Spent</div>
                  </div>
                  <div className="text-[36px] font-bold mb-2">
                    ${totalSpent.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] text-cyan-400">
                      {totalPercentage}% of budget
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining */}
              <div className="relative group">
                <div className="absolute inset-0 bg-green-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/10 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Target className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">Remaining</div>
                  </div>
                  <div className="text-[36px] font-bold mb-2">
                    ${(totalBudget - totalSpent).toLocaleString()}
                  </div>
                  <div className="text-[13px] text-green-400">
                    {100 - totalPercentage}% available
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            {(overBudgetCategories.length > 0 ||
              warningCategories.length > 0) && (
              <div className="mb-8 space-y-4">
                {overBudgetCategories.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl opacity-60"></div>
                    <div className="relative bg-gradient-to-br from-red-600/20 to-red-800/10 p-5 rounded-2xl border border-red-500/30 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-[15px] font-semibold text-red-400 mb-2">
                            Over Budget Alert
                          </div>
                          <div className="text-[14px] text-gray-300">
                            You've exceeded your budget in{" "}
                            {overBudgetCategories.length} category
                            {overBudgetCategories.length > 1 ? "ies" : ""}:{" "}
                            <span className="font-medium">
                              {overBudgetCategories
                                .map((b) => b.name)
                                .join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {warningCategories.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-600/20 rounded-2xl blur-xl opacity-60"></div>
                    <div className="relative bg-gradient-to-br from-yellow-600/20 to-yellow-800/10 p-5 rounded-2xl border border-yellow-500/30 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-[15px] font-semibold text-yellow-400 mb-2">
                            Budget Warning
                          </div>
                          <div className="text-[14px] text-gray-300">
                            You're approaching your limit in{" "}
                            {warningCategories.length} category
                            {warningCategories.length > 1 ? "ies" : ""}:{" "}
                            <span className="font-medium">
                              {warningCategories.map((b) => b.name).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Budget Categories */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-semibold">
                    Budget Categories
                  </h2>
                  <select
                    defaultValue="This Month"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {budgets.map((budget) => {
                    const Icon = budget.icon;
                    const isOverBudget = budget.percentage > 100;
                    const isWarning =
                      budget.percentage >= 80 && budget.percentage <= 100;

                    return (
                      <div key={budget.id} className="relative group/card">
                        <div
                          className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-60 transition-opacity ${
                            isOverBudget
                              ? "bg-red-600/30"
                              : isWarning
                                ? "bg-yellow-600/30"
                                : "bg-purple-600/20"
                          }`}
                        ></div>
                        <div
                          className={`relative bg-white/5 p-6 rounded-2xl border backdrop-blur-sm hover:bg-white/10 transition-all ${
                            isOverBudget
                              ? "border-red-500/30"
                              : isWarning
                                ? "border-yellow-500/30"
                                : "border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            {/* Icon */}
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                              style={{
                                backgroundColor: `${budget.color}20`,
                                boxShadow: `0 4px 12px ${budget.color}20`,
                              }}
                            >
                              <Icon
                                className="w-7 h-7"
                                style={{ color: budget.color }}
                              />
                            </div>

                            {/* Name and Stats */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-[18px] font-semibold">
                                  {budget.name}
                                </div>
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`text-[13px] px-2 py-1 rounded-md ${
                                      budget.trendType === "up"
                                        ? "text-red-400 bg-red-400/10"
                                        : budget.trendType === "down"
                                          ? "text-green-400 bg-green-400/10"
                                          : "text-gray-400 bg-gray-400/10"
                                    }`}
                                  >
                                    {budget.trend} vs last month
                                  </div>
                                  <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                                    <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                                  </button>
                                  <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-baseline gap-2 mb-3">
                                <span
                                  className={`text-[28px] font-bold ${
                                    isOverBudget ? "text-red-400" : "text-white"
                                  }`}
                                >
                                  ${budget.spent}
                                </span>
                                <span className="text-[16px] text-gray-500">
                                  of ${budget.limit}
                                </span>
                                <span
                                  className={`text-[14px] ml-auto ${
                                    isOverBudget
                                      ? "text-red-400"
                                      : isWarning
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                  }`}
                                >
                                  {budget.percentage}%
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                                <div
                                  className={`h-full rounded-full shadow-lg transition-all ${
                                    isOverBudget
                                      ? "bg-gradient-to-r from-red-600 to-red-500 shadow-red-600/50"
                                      : isWarning
                                        ? "bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-yellow-600/50"
                                        : "bg-gradient-to-r from-purple-600 to-purple-500 shadow-purple-600/50"
                                  }`}
                                  style={{
                                    width: `${Math.min(budget.percentage, 100)}%`,
                                  }}
                                ></div>
                              </div>

                              <div className="mt-3 text-[13px] text-gray-400">
                                $
                                {budget.limit - budget.spent > 0
                                  ? budget.limit - budget.spent
                                  : 0}{" "}
                                remaining
                                {isOverBudget && (
                                  <span className="text-red-400 ml-2">
                                    • ${budget.spent - budget.limit} over budget
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
