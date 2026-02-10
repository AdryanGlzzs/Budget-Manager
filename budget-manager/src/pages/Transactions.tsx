import { useState } from "react";
import Logo from "../images/logo.png";
import {
  Search,
  Bell,
  Filter,
  Download,
  ArrowUpRight,
  Calendar,
  ShoppingBag,
  CreditCard,
  Zap,
  TrendingUp,
  TrendingDown,
  Coffee,
  Car,
  Home,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import Sidebar from "../components/sidebar";

const Transactions = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const transactions = [
    {
      id: 1,
      name: "Starbucks Coffee",
      category: "Food & Dining",
      date: "Today, 2:30 PM",
      amount: -12.5,
      icon: Coffee,
      color: "#6366F1",
      type: "expense",
      status: "completed",
    },
    {
      id: 2,
      name: "Uber Ride",
      category: "Transportation",
      date: "Today, 10:15 AM",
      amount: -18.75,
      icon: Car,
      color: "#06B6D4",
      type: "expense",
      status: "completed",
    },
    {
      id: 3,
      name: "Netflix Subscription",
      category: "Entertainment",
      date: "Yesterday, 8:00 PM",
      amount: -15.99,
      icon: CreditCard,
      color: "#F59E0B",
      type: "expense",
      status: "completed",
    },
    {
      id: 4,
      name: "Freelance Payment",
      category: "Income",
      date: "Feb 8, 3:45 PM",
      amount: 2500.0,
      icon: TrendingUp,
      color: "#10B981",
      type: "income",
      status: "completed",
    },
    {
      id: 5,
      name: "Amazon Purchase",
      category: "Shopping",
      date: "Feb 7, 6:20 PM",
      amount: -89.99,
      icon: ShoppingBag,
      color: "#10B981",
      type: "expense",
      status: "completed",
    },
    {
      id: 6,
      name: "Electricity Bill",
      category: "Bills & Utilities",
      date: "Feb 6, 9:00 AM",
      amount: -125.0,
      icon: Zap,
      color: "#EF4444",
      type: "expense",
      status: "completed",
    },
    {
      id: 7,
      name: "Salary Deposit",
      category: "Income",
      date: "Feb 5, 12:00 PM",
      amount: 5500.0,
      icon: TrendingUp,
      color: "#10B981",
      type: "income",
      status: "completed",
    },
    {
      id: 8,
      name: "Grocery Shopping",
      category: "Food & Dining",
      date: "Feb 4, 4:30 PM",
      amount: -156.43,
      icon: ShoppingBag,
      color: "#6366F1",
      type: "expense",
      status: "completed",
    },
    {
      id: 9,
      name: "iPhone Purchase",
      category: "Shopping",
      date: "Feb 3, 2:15 PM",
      amount: -999.0,
      icon: Smartphone,
      color: "#10B981",
      type: "expense",
      status: "pending",
    },
    {
      id: 10,
      name: "Rent Payment",
      category: "Bills & Utilities",
      date: "Feb 1, 10:00 AM",
      amount: -1800.0,
      icon: Home,
      color: "#EF4444",
      type: "expense",
      status: "completed",
    },
  ];

  const filterOptions = ["All", "Income", "Expenses", "Pending"];
  const categories = [
    "All Categories",
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Income",
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (selectedFilter === "Income" && t.type !== "income") return false;
    if (selectedFilter === "Expenses" && t.type !== "expense") return false;
    if (selectedFilter === "Pending" && t.status !== "pending") return false;
    if (
      selectedCategory !== "All Categories" &&
      t.category !== selectedCategory
    )
      return false;
    return true;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

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
                    placeholder="Search transactions..."
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
          <Sidebar currentPage="transactions" />

          {/* Main Content */}
          <main className="flex-1 p-8 max-w-[1400px]">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-[42px] font-bold mb-3">Transactions</h1>
              <p className="text-[16px] text-gray-400">
                Track and manage all your financial transactions
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">
                      Total Income
                    </div>
                  </div>
                  <div className="text-[32px] font-bold mb-1">
                    ${totalIncome.toFixed(2)}
                  </div>
                  <div className="text-[13px] text-green-400">This month</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <TrendingDown className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">
                      Total Expenses
                    </div>
                  </div>
                  <div className="text-[32px] font-bold mb-1">
                    ${totalExpenses.toFixed(2)}
                  </div>
                  <div className="text-[13px] text-red-400">This month</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-green-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/10 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <ArrowUpRight className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-[14px] text-gray-400">Net Income</div>
                  </div>
                  <div className="text-[32px] font-bold mb-1">
                    ${(totalIncome - totalExpenses).toFixed(2)}
                  </div>
                  <div className="text-[13px] text-green-400">This month</div>
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setSelectedFilter(filter)}
                          className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${
                            selectedFilter === filter
                              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[14px] hover:bg-white/10 transition-all"
                      >
                        <Filter className="w-4 h-4" />
                        {selectedCategory}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {showFilterMenu && (
                        <div className="absolute top-full mt-2 left-0 bg-[#0a0a14] border border-white/10 rounded-xl p-2 min-w-[200px] shadow-2xl shadow-black/50 z-50">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setShowFilterMenu(false);
                              }}
                              className={`w-full text-left px-4 py-2 rounded-lg text-[14px] transition-all ${
                                selectedCategory === cat
                                  ? "bg-purple-600/20 text-purple-400"
                                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[14px] hover:bg-white/10 transition-all">
                      <Calendar className="w-4 h-4" />
                      This Month
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-white/5 text-[13px] text-gray-400 font-medium">
                  <div className="col-span-4">Transaction</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-3">Date & Time</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-1 text-right">Amount</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-white/5">
                  {filteredTransactions.map((transaction) => {
                    const Icon = transaction.icon;
                    return (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-all cursor-pointer items-center"
                      >
                        {/* Transaction Name */}
                        <div className="col-span-4 flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
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
                          <div>
                            <div className="text-[15px] font-medium mb-1">
                              {transaction.name}
                            </div>
                            <div className="text-[12px] text-gray-500">
                              ID: #{transaction.id.toString().padStart(6, "0")}
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className="col-span-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-[13px]">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: transaction.color,
                                boxShadow: `0 0 6px ${transaction.color}60`,
                              }}
                            ></div>
                            {transaction.category}
                          </div>
                        </div>

                        {/* Date */}
                        <div className="col-span-3 text-[14px] text-gray-400">
                          {transaction.date}
                        </div>

                        {/* Status */}
                        <div className="col-span-2 flex justify-center">
                          <span
                            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${
                              transaction.status === "completed"
                                ? "bg-green-400/10 text-green-400"
                                : "bg-yellow-400/10 text-yellow-400"
                            }`}
                          >
                            {transaction.status === "completed"
                              ? "Completed"
                              : "Pending"}
                          </span>
                        </div>

                        {/* Amount */}
                        <div className="col-span-1 text-right">
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

                {/* Empty State */}
                {filteredTransactions.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="text-[18px] font-semibold mb-2">
                      No transactions found
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Try adjusting your filters
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transactions;