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
  Calendar

} from "lucide-react";

const InitialPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          scrolled ? "bg-[#050510]/80 backdrop-blur-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={Logo} className="w-40" />
            </div>

            <div className="hidden md:flex items-center gap-10 text-[15px]">
              <Link to={""}>Home</Link>
              <Link to={""}>Features</Link>
              <Link to={""}>Benefits</Link>
              <Link to={""}>Pricing</Link>
              <Link to={""}>Testimonials</Link>
            </div>

            <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-[15px] font-medium transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

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

      <section className="relative px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative rounded-[32px] p-[2px] bg-gradient-to-b from-purple-500/50 to-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent rounded-[32px] blur-2xl"></div>

            <div className="relative bg-[#0a0a14] rounded-[30px] overflow-hidden border border-white/5">
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <LayoutGrid />
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
                      className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-56 focus:outline-none focus:border-purple-500/50 placeholder-gray-600"
                    />
                  </div>
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-[14px] font-medium">Adryan G</span>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="w-56 bg-[#08080f] p-5 space-y-1.5 border-r border-white/5">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3 rounded-xl flex items-center gap-3 text-[14px] font-medium">
                    <LayoutGrid />
                    Dashboard
                  </div>
                </div>

                <div className="flex-1 p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[13px] text-gray-500 mb-1">
                            My Balance
                          </div>
                          <div className="text-[32px] font-bold leading-none">
                            $66,000.00
                          </div>
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors">
                          Add Expenses
                        </button>
                      </div>
                      <div className="text-[12px] text-gray-500">
                        Your Balance this Month
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="text-[13px] text-gray-500 mb-1">
                            Spending by Category
                          </div>
                          <div className="text-[32px] font-bold leading-none">
                            $15,000.00
                          </div>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none">
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
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: item.color }}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-5 rounded-2xl border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center">
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
                      <div className="text-[12px] text-green-400 flex align-center">
                        <ArrowUpRight />
                        +5.2%
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-5 rounded-2xl border border-cyan-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-cyan-500/30 rounded-xl flex items-center justify-center">
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
                      <div className="text-[12px] text-red-400 flex">
                        <ArrowDownRight /> -2.4%
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <div className="text-[15px] font-semibold mb-1">
                          Cash Flow
                        </div>
                        <div className="flex items-center gap-4 text-[12px]">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-1 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-400">Income</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-1 bg-cyan-500 rounded-full"></div>
                            <span className="text-gray-400">Expense</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none">
                          <option>This Year</option>
                        </select>
                        <div className="text-[24px] font-bold">+$264,455</div>
                        <span className="text-[12px] text-green-400">
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

                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] text-gray-500 mb-1">
                          My Savings (ETH)
                        </div>
                        <div className="text-[28px] font-bold">$24,000.00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] text-gray-500 mb-1">
                          Financial Health
                        </div>
                        <div className="text-[14px] font-medium text-gray-300">
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
      </section>

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
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-3xl border border-white/10">
            <h3 className="text-[28px] font-bold mb-3">
              Comprehensive Financial Overview
            </h3>
            <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
              View your total balance, income, and expenses at a glance to stay
              on top of your finances.
            </p>

            <div className="space-y-6">
              <div className="bg-[#0a0a14] p-6 rounded-2xl border border-white/5">
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
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-colors">
                      Add Transaction
                    </button>
                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none">
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
                <div className="bg-[#0a0a14] p-5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
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

                <div className="bg-[#0a0a14] p-5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
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

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-3xl border border-white/10">
            <h3 className="text-[28px] font-bold mb-3">Smart Saving Plan</h3>
            <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
              Create, manage, and achieve your savings goals with a plan
              tailored to your needs.
            </p>

            <div className="space-y-4">
              <div className="bg-[#0a0a14] p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-[20px]">
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
                      <span className="text-purple-400 font-semibold">50%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-purple-500 h-full rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#0a0a14] p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-[20px]">
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
                    className="bg-gradient-to-r from-pink-600 to-pink-500 h-full rounded-full"
                    style={{ width: "32%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#0a0a14] p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-[20px]">
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
                      <span className="text-amber-400 font-semibold">18%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-amber-500 h-full rounded-full"
                    style={{ width: "18%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-3xl border border-white/10">
            <h3 className="text-[28px] font-bold mb-3">
              Smart Expense & Income Analytics
            </h3>
            <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
              Monitor, analyze, and optimize your income and expenses with
              real-time data.
            </p>

            <div className="bg-[#0a0a14] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-[13px] font-semibold text-yellow-400">
                      Fast And Responsif
                    </span>
                  </div>
                  <div className="text-[15px] font-medium mb-2">
                    Cash Flow
                  </div>
                  <div className="flex items-center gap-4 text-[13px]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                      <span className="text-gray-400">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-sm"></div>
                      <span className="text-gray-400">Expends</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12px] focus:outline-none mb-2">
                    <option>This Year</option>
                    <option>This Month</option>
                    <option>This Week</option>
                  </select>
                  <button className="text-gray-500 hover:text-gray-400">
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

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-3xl border border-white/10">
            <h3 className="text-[28px] font-bold mb-3">
              Automated Budgeting & Forecasting
            </h3>
            <p className="text-gray-400 text-[15px] mb-8 leading-relaxed">
              Set budgets automatically and get financial predictions for
              better money management.
            </p>

            <div className="bg-[#0a0a14] p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[17px] font-semibold">
                  Recent Transaction
                </h4>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-40 focus:outline-none focus:border-purple-500/50 placeholder-gray-600"
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
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[13px] font-medium">
                      iCloud Monthly
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-[13px] text-gray-400">Premium</span>
                  </div>
                  <div className="text-[13px] text-gray-400">08 Des 2024</div>
                  <div className="text-[13px] font-semibold text-red-400 text-right">
                    -$12.99
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors rounded-lg px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4 text-pink-400" />
                    </div>
                    <span className="text-[13px] font-medium">Shopping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
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
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[13px] font-medium">
                      Subscription
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
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
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-[13px] font-medium">Salary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
      </section>
    </div>
  );
};

export default InitialPage;