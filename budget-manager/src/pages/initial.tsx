import { useState, useEffect } from "react";
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
import Footer from "../components/footer";

const InitialPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050510]/80 backdrop-blur-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={Logo} className="w-40" alt="Daryan Logo" />
            </div>

            <div className="hidden md:flex items-center gap-10 text-[15px]">
              <Link to="" className="hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Benefits
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Pricing
              </Link>
              <Link to="" className="hover:text-purple-400 transition-colors">
                Testimonials
              </Link>
            </div>

            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-[15px] font-medium transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-16 px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[72px] font-bold mb-5 leading-[1.1] tracking-tight">
            Manage Finances
            <br />
            Easily and Smartly
          </h1>

          <p className="text-[17px] text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
            Daryan helps you control spending, track income, and manage
            <br />
            savings with an intuitive financial dashboard.
          </p>

          <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105 inline-flex items-center gap-2">
            Try it Free
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Dashboard Preview - GLASSMORPHISM PREMIUM BORDER */}
      <section className="relative px-12 pb-16">
        <div className="max-w-[1200px] mx-auto">
          {/* CAMADA 1: Container do Glow Externo (mais difuso) */}
          <div className="relative rounded-[32px] p-[3px]">
            {/* Glow Externo Grande - 60px blur */}
            <div className="absolute -inset-6 bg-gradient-to-br from-purple-500/40 via-purple-600/30 to-blue-600/40 rounded-[40px] blur-[60px] opacity-70"></div>

            {/* CAMADA 2: Borda Gradiente Sólida */}
            <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-purple-500/80 via-purple-600/90 to-blue-600/80">
              {/* Glow Médio - 30px blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-purple-600/40 to-blue-600/50 rounded-[32px] blur-[30px]"></div>

              {/* CAMADA 3: Container Principal com Glassmorphism */}
              <div className="relative bg-[#0a0a14]/95 backdrop-blur-xl rounded-[30px] overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <LayoutGrid className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-[15px]">Daryan</div>
                      <div className="text-[13px] text-gray-500">Dashboard</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-56 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                      />
                    </div>
                    <Bell className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"></div>
                      <span className="text-[14px] font-medium">Adryan G</span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-56 bg-[#08080f]/90 backdrop-blur-sm p-5 space-y-1.5 border-r border-white/10">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] font-medium shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all">
                      <LayoutGrid className="w-4 h-4" />
                      Dashboard
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6 space-y-5 bg-gradient-to-br from-[#0a0a14]/60 to-[#0a0a14]/40">
                    {/* Balance and Spending Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* My Balance Card - com hover glow */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="text-[13px] text-gray-500 mb-1">
                                My Balance
                              </div>
                              <div className="text-[32px] font-bold leading-none bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                                $66,000.00
                              </div>
                            </div>
                            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105">
                              Add Expenses
                            </button>
                          </div>
                          <div className="text-[12px] text-gray-500">
                            Your Balance this Month
                          </div>
                        </div>
                      </div>

                      {/* Spending by Category Card */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="text-[13px] text-gray-500 mb-1">
                                Spending by Category
                              </div>
                              <div className="text-[32px] font-bold leading-none">
                                $15,000.00
                              </div>
                            </div>
                            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                              <option>This Month</option>
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
                                  Total Spent
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2.5 flex-1">
                              {[
                                {
                                  color: "#6366F1",
                                  label: "Food",
                                  percent: "30%",
                                  amount: "19%",
                                },
                                {
                                  color: "#06B6D4",
                                  label: "Shopping",
                                  percent: "20%",
                                  amount: "10%",
                                },
                                {
                                  color: "#10B981",
                                  label: "Transport",
                                  percent: "25%",
                                  amount: "6%",
                                },
                                {
                                  color: "#F59E0B",
                                  label: "Entertainment",
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

                    {/* Income and Expenses Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-5 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                              <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <div className="text-[13px] text-gray-400">
                                Income
                              </div>
                              <div className="text-[24px] font-bold">
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
                        <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-5 rounded-2xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              <TrendingDown className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <div className="text-[13px] text-gray-400">
                                Expenses
                              </div>
                              <div className="text-[24px] font-bold">
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

                    {/* Cash Flow Chart */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <div className="text-[15px] font-semibold mb-1">
                              Cash Flow
                            </div>
                            <div className="flex items-center gap-4 text-[12px]">
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-1 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                                <span className="text-gray-400">Income</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-1 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                                <span className="text-gray-400">Expense</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                              <option>This Year</option>
                            </select>
                            <div className="text-[24px] font-bold">
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

                    {/* Savings Card */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[13px] text-gray-500 mb-1">
                              My Savings (ETH)
                            </div>
                            <div className="text-[28px] font-bold">
                              $24,000.00
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[13px] text-gray-500 mb-1">
                              Financial Health
                            </div>
                            <div className="text-[14px] font-medium text-green-400 px-3 py-1 bg-green-400/10 rounded-md inline-block">
                              Excellent
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

      {/* Features Section */}
      <section className="relative px-12 py-16">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-[56px] font-bold mb-5 leading-[1.1] tracking-tight">
            Powerful Features to Elevate
            <br />
            Your Financial
          </h2>
          <p className="text-[17px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            All the tools you need to manage your money—smart, simple,
            <br />
            and seamless.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feature Card 1 - Comprehensive Financial Overview */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[28px] font-bold mb-3">
                Comprehensive Financial Overview
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                View your total balance, income, and expenses at a glance to
                stay on top of your finances.
              </p>

              <div className="space-y-6">
                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[13px] text-gray-500 mb-2">
                        My Balance
                      </div>
                      <div className="text-[42px] font-bold">$66,000.00</div>
                      <div className="text-[13px] text-gray-500">
                        Your Balance in Month
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
                        Add Transaction
                      </button>
                      <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                        <option>This Month</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-[14px] text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    45.2%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-[13px] text-gray-500">Income</div>
                    </div>
                    <div className="text-[28px] font-bold mb-1">$44,000.00</div>
                    <div className="text-[13px] text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      45.2%
                    </div>
                  </div>

                  <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <TrendingDown className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-[13px] text-gray-500">Expends</div>
                    </div>
                    <div className="text-[28px] font-bold mb-1">$22,000.00</div>
                    <div className="text-[13px] text-red-400 flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3" />
                      36.1%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2 - Smart Saving Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[28px] font-bold mb-3">Smart Saving Plan</h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                Create, manage, and achieve your savings goals with a plan
                tailored to your needs.
              </p>

              <div className="space-y-4">
                <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-[20px] shadow-lg shadow-purple-500/20">
                      <Wallet />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Financial Saving
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
                        Educational Plan
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
                        Retirement Plan
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

          {/* Feature Card 3 - Smart Expense & Income Analytics */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[28px] font-bold mb-3">
                Smart Expense & Income Analytics
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                Monitor, analyze, and optimize your income and expenses with
                real-time data.
              </p>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-[13px] font-semibold text-yellow-400">
                        Fast And Responsive
                      </span>
                    </div>
                    <div className="text-[15px] font-medium mb-2">
                      Cash Flow
                    </div>
                    <div className="flex items-center gap-4 text-[13px]">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-sm shadow-sm shadow-purple-500/50"></div>
                        <span className="text-gray-400">Income</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-sm shadow-sm shadow-cyan-500/50"></div>
                        <span className="text-gray-400">Expends</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12px] focus:outline-none mb-2 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                      <option>This Year</option>
                      <option>This Month</option>
                      <option>This Week</option>
                    </select>
                    <button className="text-gray-500 hover:text-gray-400 transition-colors">
                      <span className="text-[20px]">•••</span>
                    </button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[32px] font-bold">$324,495</span>
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
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <h3 className="text-[28px] font-bold mb-3">
                Automated Budgeting & Forecasting
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
                Set budgets automatically and get financial predictions for
                better money management.
              </p>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[17px] font-semibold">
                    Recent Transaction
                  </h4>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-40 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-4 gap-4 text-[12px] text-gray-500 pb-3 border-b border-white/5">
                    <div>Merchant Name</div>
                    <div>Category</div>
                    <div>Date</div>
                    <div className="text-right">Amount</div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20">
                        <CreditCard className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-[13px] font-medium">
                        iCloud Monthly
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50"></div>
                      <span className="text-[13px] text-gray-400">Premium</span>
                    </div>
                    <div className="text-[13px] text-gray-400">08 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$12.99
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center shadow-md shadow-pink-500/20">
                        <ShoppingBag className="w-4 h-4 text-pink-400" />
                      </div>
                      <span className="text-[13px] font-medium">Shopping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full shadow-sm shadow-pink-500/50"></div>
                      <span className="text-[13px] text-gray-400">
                        Shopping
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">07 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$156.00
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/20">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[13px] font-medium">
                        Subscription
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></div>
                      <span className="text-[13px] text-gray-400">
                        Services
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400">06 Des 2024</div>
                    <div className="text-[13px] font-semibold text-red-400 text-right">
                      -$29.99
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 py-3 items-center hover:bg-white/5 transition-colors rounded-lg px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shadow-md shadow-green-500/20">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-[13px] font-medium">Salary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                      <span className="text-[13px] text-gray-400">Income</span>
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

      {/* Benefits Section */}
      <section className="relative pt-10 pb-20 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-[68px] font-bold mb-6 leading-[1.05] tracking-tight">
                A Smarter Way to
                <br />
                Manage Your Money
              </h1>

              <p className="text-[17px] text-gray-400 mb-10 leading-relaxed max-w-lg">
                Built for professionals and businesses, Daryan provides
                seamless, secure, and intuitive financial management.
              </p>

              <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all transform hover:scale-105 inline-flex items-center gap-2">
                Try it Free
                <ChevronRight />
              </button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-[#0a0a14]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium mb-1">
                        Smart Financial Insights
                      </div>
                      <div className="text-[13px] text-gray-400">
                        Real-time analytics and predictions
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
                        Personalized Financial Goals
                      </div>
                      <div className="text-[13px] text-gray-400">
                        Track and achieve your objectives
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
                        Smart Expense Splitting
                      </div>
                      <div className="text-[13px] text-gray-300">
                        Easily split bills with friends, family, or colleagues,
                        ensuring fair contributions and clear tracking of shared
                        expenses—no more confusion, manual calculations, or
                        missed payments.
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
                        Automated Budgeting & Forecasting
                      </div>
                      <div className="text-[13px] text-gray-400">
                        Set smart budgets automatically
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

      {/* Pricing Section */}
      <section className="relative px-12 py-20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-[56px] font-bold mb-5 leading-[1.1] tracking-tight">
            Flexible Plans for Every Need
          </h2>
          <p className="text-[17px] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose a plan that fits your financial goals – whether you're an
            <br />
            individual or a business.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-b from-white/10 to-white/[0.02] rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="text-[15px] text-gray-400 mb-2">Free Plan</div>
                <div className="text-[24px] font-semibold mb-2">
                  For Individual
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-[48px] font-bold">$0</span>
                  <span className="text-[15px] text-gray-400">per month</span>
                </div>
                <p className="text-[14px] text-gray-400 mb-8">
                  Basic tools to manage your money
                  <br />
                  at no cost.
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
                  Get Started
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Real-time balance tracking",
                  "Basic cash flow insights",
                  "Expense categorization",
                  "Community support",
                  "Up to 2 linked bank accounts",
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

          {/* Pro Plan - Popular with Premium Border */}
          <div className="relative">
            {/* Glow Externo */}
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/40 via-purple-600/30 to-blue-600/40 rounded-[40px] blur-[40px] opacity-80"></div>

            {/* Borda Gradiente */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-purple-500/80 via-purple-600/90 to-blue-600/80">
              {/* Glow Médio */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-purple-600/40 to-blue-600/50 rounded-3xl blur-[20px]"></div>

              <div className="relative bg-[#0a0a14] rounded-3xl p-8 backdrop-blur-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-6 py-1.5 rounded-full text-[13px] font-semibold shadow-lg shadow-purple-600/50">
                    Popular Plan
                  </div>
                </div>

                <div className="text-center mb-8 mt-4">
                  <div className="text-[15px] text-gray-400 mb-2">Pro Plan</div>
                  <div className="text-[24px] font-semibold mb-2">
                    For Freelancers
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-[48px] font-bold">$15</span>
                    <span className="text-[15px] text-gray-400">per month</span>
                  </div>
                  <p className="text-[14px] text-gray-400 mb-8">
                    Advanced insights and automation
                    <br />
                    for power users.
                  </p>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70">
                    Get Started
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    "Everything in Free Plan, plus:",
                    "AI - powered financial insights",
                    "Unlimited linked bank accounts",
                    "Advanced budgeting tools",
                    "Multi-device sync (Desktop & Mobile)",
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

          {/* Enterprise Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-b from-white/10 to-white/[0.02] rounded-3xl border border-white/10 p-8 hover:border-white/20 transition-all backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="text-[15px] text-gray-400 mb-2">
                  Enterprise Plan
                </div>
                <div className="text-[24px] font-semibold mb-2">
                  For Businesses
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span className="text-[48px] font-bold">$35</span>
                  <span className="text-[15px] text-gray-400">per month</span>
                </div>
                <p className="text-[14px] text-gray-400 mb-8">
                  Tailored solutions for
                  <br />
                  businesses.
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded-full text-[15px] font-semibold transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
                  Get Started
                </button>
              </div>

              <div className="space-y-3">
                {[
                  "Everything in Pro Plan, plus:",
                  "Team financial management",
                  "Advanced security & role-based access",
                  "Dedicated account manager",
                  "Custom reporting & analytics",
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

      {/* Testimonials Section */}
      <section className="flex justify-center items-center px-12 py-20">
        <div className="max-w-7xl mx-auto flex items-center flex-row gap-30">
          <div>
            <h2 className="text-[56px] font-bold leading-15 w-90">
              Real Stories, Real Results
            </h2>
            <p className="text-[17px] text-gray-400 mt-5 leading-relaxed">
              See how Drayan is transforming the
              <br />
              way people manage their finances.
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <div className="flex gap-6 overflow-hidden flex-1">
              <div className="bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10 min-w-[200px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  As a business owner, managing finances was overwhelming.
                  Daryan's reporting and analytics helped me optimize my
                  spending and grow my profits.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">David Lee</div>
                    <div className="text-[13px] text-gray-500">
                      Startup Founder
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 min-w-[200px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  I love how Moneta automatically categorizes my expenses. The
                  interface is user-friendly, and it gives me complete control
                  over my finances.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">
                      Sophia Martinez
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Marketing Consultant
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a14]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 min-w-[200px] hover:border-white/20 transition-all">
                <div className="text-[64px] text-gray-600 leading-none mb-4">
                  "
                </div>
                <p className="text-[15px] text-gray-300 leading-relaxed mb-8">
                  I've tried multiple apps before, but Moneta is by far the
                  best. The savings plan and budget tracking features keep me on
                  top of my goals.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg shadow-amber-500/30"></div>
                  <div>
                    <div className="text-[15px] font-semibold">
                      Michael Johnson
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Startup Founder
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-purple-600/30 to-blue-900/50"></div>
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-purple-600 to-transparent blur-3xl opacity-60"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600 to-transparent blur-3xl opacity-60"></div>

            <div className="relative z-10 text-center py-20 px-12">
              <h2 className="text-[52px] font-bold mb-6 leading-[1.1] tracking-tight">
                Take Charge of Your
                <br />
                Finances Today!
              </h2>
              <p className="text-[16px] text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of users who trust Drayan for smarter money
                <br />
                management.
              </p>
              <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-[15px] font-semibold hover:shadow-2xl hover:shadow-white/30 transition-all transform hover:scale-105">
                Get Started
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
