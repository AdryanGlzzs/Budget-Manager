import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Plus,
  Trash2,
  Check,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";
import { TransactionModal } from "../components/TransactionModal";
import type { TransactionProps } from "../components/TransactionModal";
import { api } from "../services/api";
import { useThemeColors } from "../contexts/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { useTranslation } from "react-i18next";
import { useToast } from "../contexts/ToastContext";

const Transactions = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransactions] = useState<TransactionProps[]>([]);
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];

  const getTransactions = async () => {
    try {
      const response = await api.get('/transactions');
      if (response?.data?.data) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao puxar os dados de transações:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const HandleSaveTransaction = (NewTransaction: TransactionProps) => {
    setTransactions((prev) => [...prev, NewTransaction]);
    setOpenModal(false);
  };

  const HandleRemove = async (id: string) => {
    try {
      await api.delete(`/transactions/delete/${id}`);
      setTransactions((prev) => prev.filter((item) => item.id !== id));
      getTransactions();
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "thisMonth" | "lastMonth" | "thisYear">("thisMonth");
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const periodDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        periodDropdownRef.current &&
        !periodDropdownRef.current.contains(event.target as Node)
      ) {
        setPeriodDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = [
    { key: "all", label: t("transactions.filters.all") },
    { key: "revenue", label: t("transactions.filters.revenue") },
    { key: "expenses", label: t("transactions.filters.expenses") },
    { key: "pending", label: t("transactions.filters.pending") },
  ];

  const periodOptions: { key: "all" | "thisMonth" | "lastMonth" | "thisYear"; label: string }[] = [
    { key: "thisMonth", label: t("transactions.periods.thisMonth") },
    { key: "lastMonth", label: t("transactions.periods.lastMonth") },
    { key: "thisYear", label: t("transactions.periods.thisYear") },
    { key: "all", label: t("transactions.periods.all") },
  ];

  const isDateInPeriod = (dateStr?: string) => {
    if (!dateStr || selectedPeriod === "all") return true;

    const [year, month] = dateStr.split("T")[0].split("-").map(Number);
    if (!year || !month) return true;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (selectedPeriod === "thisMonth") {
      return year === currentYear && month === currentMonth;
    }

    if (selectedPeriod === "lastMonth") {
      const prevDate = new Date(currentYear, currentMonth - 2, 1);
      return year === prevDate.getFullYear() && month === prevDate.getMonth() + 1;
    }

    if (selectedPeriod === "thisYear") {
      return year === currentYear;
    }

    return true;
  };

  const periodTransactions = transaction.filter((tr) => isDateInPeriod(tr.date));

  const TotalRevenue = periodTransactions
    .filter((tr) => tr.type === "revenue")
    .reduce((sun, tr) => sun + Number(tr.amount || 0), 0);

  const TotalExpense = periodTransactions
    .filter((tr) => tr.type === "expense")
    .reduce((decrease, tr) => decrease + Number(tr.amount || 0), 0);

  const TotalBalance = TotalRevenue - TotalExpense;

  const filteredTransactions = periodTransactions.filter((tr) => {
    if (selectedFilter === "revenue" && tr.type !== "revenue") return false;
    if (selectedFilter === "expenses" && tr.type !== "expense") return false;
    if (selectedFilter === "pending" && tr.status !== false) return false;

    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      const matchName = tr.name?.toLowerCase().includes(search);
      const matchCategory = tr.category?.toLowerCase().includes(search);
      const matchAmount = String(tr.amount).includes(search);
      return matchName || matchCategory || matchAmount;
    }

    return true;
  });

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showToast(t("transactions.exportEmpty"), "warning");
      return;
    }

    const headers = [
      t("transactions.table.transaction"),
      t("transactions.table.category"),
      t("transactions.table.dateTime"),
      t("transactions.table.status"),
      "Tipo",
      t("transactions.table.amount"),
    ];

    const rows = filteredTransactions.map((tr) => {
      const typeLabel = tr.type === "revenue" ? t("transactions.filters.revenue") : t("transactions.filters.expenses");
      const statusLabel = tr.status ? t("transactions.table.completed") : t("transactions.table.pending");
      const safeName = `"${(tr.name || "").replace(/"/g, '""')}"`;
      const safeCategory = `"${(tr.category || "").replace(/"/g, '""')}"`;
      const safeDate = `"${formatDate(tr.date)}"`;
      const safeAmount = `"${tr.type === "revenue" ? "+" : "-"}${Number(tr.amount || 0).toFixed(2)}"`;

      return [safeName, safeCategory, safeDate, `"${statusLabel}"`, `"${typeLabel}"`, safeAmount].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split("T")[0];

    link.setAttribute("href", url);
    link.setAttribute("download", `transacoes_${selectedPeriod}_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(t("transactions.exportSuccess"), "success");
  };

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

        <div className="flex ">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 w-full p-4 sm:p-8 max-w-350 overflow-x-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-[42px] font-bold mb-3 mt-20">
                  {t("transactions.title")}
                </h1>
                <p className="w-full sm:text-[16px] text-gray-400">
                  {t("transactions.subtitle")}
                </p>
              </div>
              <button
                className={`flex items-center justify-center gap-2 px-5 py-3 ${theme.activeBg} rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02] w-full sm:w-auto shrink-0 sm:mt-20 z-[20]`}
                onClick={() => setOpenModal(true)}
              >
                <Plus className="w-5 h-5" />
                {t("transactions.newTransaction")}
              </button>
            </div>

            <section className="flex flex-col items-center justify-center w-full">
              <div className="w-full p-4 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="relative group w-full">
                  <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity`}></div>
                  <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">
                        {t("transactions.totalRevenue")}
                      </div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{formatCurrency(TotalRevenue)}</div>
                    <div className="text-[13px] text-green-400">
                      {periodOptions.find((p) => p.key === selectedPeriod)?.label || t("transactions.periods.thisMonth")}
                    </div>
                  </div>
                </div>

                <div className="relative group w-full">
                  <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity`}></div>
                  <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <TrendingDown className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">
                        {t("transactions.totalExpenses")}
                      </div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{formatCurrency(TotalExpense)}</div>
                    <div className="text-[13px] text-red-400">
                      {periodOptions.find((p) => p.key === selectedPeriod)?.label || t("transactions.periods.thisMonth")}
                    </div>
                  </div>
                </div>

                <div className="relative group w-full">
                  <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover/card:opacity-80 transition-opacity`}></div>
                  <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/10 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                        <ArrowUpRight className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">{t("transactions.balance")}</div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{formatCurrency(TotalBalance)}</div>
                    <div className="text-[13px] text-green-400">
                      {periodOptions.find((p) => p.key === selectedPeriod)?.label || t("transactions.periods.thisMonth")}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="relative group mb-6 z-30">
              <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("transactions.searchPlaceholder")}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-[13px] sm:text-[14px] text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.key}
                          onClick={() => setSelectedFilter(filter.key)}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all ${selectedFilter === filter.key
                            ? theme.activeBg
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>

                   
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <div className="relative flex-1 sm:flex-none z-30" ref={periodDropdownRef}>
                      <button
                        onClick={() => setPeriodDropdownOpen((prev) => !prev)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[13px] sm:text-[14px] hover:bg-white/10 transition-all text-white"
                      >
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {periodOptions.find((p) => p.key === selectedPeriod)?.label || t("transactions.periods.thisMonth")}
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${periodDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {periodDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#0e0e1e] border border-white/10 rounded-xl shadow-2xl py-1 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                          {periodOptions.map((period) => (
                            <button
                              key={period.key}
                              onClick={() => {
                                setSelectedPeriod(period.key);
                                setPeriodDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2 text-left text-[13px] transition-colors ${
                                selectedPeriod === period.key
                                  ? `${theme.text} bg-white/10 font-semibold`
                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              <span>{period.label}</span>
                              {selectedPeriod === period.key && <Check className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 ${theme.activeBg} rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all hover:scale-[1.02] cursor-pointer`}
                    >
                      <Download className="w-4 h-4 sm:ml-1" />
                      {t("transactions.export")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group z-10">
              <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-white/5 text-[13px] text-gray-400 font-medium">
                  <div className="col-span-4">{t("transactions.table.transaction")}</div>
                  <div className="col-span-2">{t("transactions.table.category")}</div>
                  <div className="col-span-2">{t("transactions.table.dateTime")}</div>
                  <div className="col-span-2 text-center">{t("transactions.table.status")}</div>
                  <div className="col-span-1 text-right">{t("transactions.table.amount")}</div>
                  <div className="col-span-1 text-right">{t("transactions.table.actions")}</div>
                </div>

                <div className="divide-y divide-white/5">
                  {filteredTransactions.map((tr) => {
                    return (
                      <div
                        key={tr.id}
                        className="px-4 py-4 sm:px-6 sm:py-5 hover:bg-white/5 transition-all cursor-pointer group/item"
                      >
                        <div className="flex flex-col gap-4 sm:hidden">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="text-[14px] font-medium mb-0.5">
                                  {tr.name}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                  ID: #
                                  {tr.id.toString().padStart(6, "0")}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div
                                className={`text-[16px] font-bold ${tr.type === "revenue"
                                  ? "text-green-400"
                                  : "text-red-400"
                                  } flex items-center justify-end gap-1 tabular-nums`}
                              >
                                <span className="w-4 inline-block text-center">{tr.type === "revenue" ? "+" : "-"}</span>
                                <span>{formatCurrency(Math.abs(tr.amount))}</span>
                              </div>
                              <button
                                onClick={() => HandleRemove(tr.id)}
                                className="p-2 bg-red-500/10 text-red-400 rounded-lg z-20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-[11px]">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: tr.color,
                                  boxShadow: `0 0 6px ${tr.color}60`,
                                }}
                              ></div>
                              {tr.category}
                            </div>
                            <div className="text-[12px] text-gray-400 flex-1 text-center px-2">
                              {formatDate(tr.date)}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${tr.status === true
                                ? "bg-green-400/10 text-green-400"
                                : "bg-yellow-400/10 text-yellow-400"
                                }`}
                            >
                              {tr.status === true
                                ? t("transactions.table.completed")
                                : t("transactions.table.pending")}
                            </span>
                          </div>
                        </div>

                        <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-4 flex items-center gap-4">
                            <div>
                              <div className="text-[15px] font-medium mb-1">
                                {tr.name}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                ID: #
                                {tr.id ? String(tr.id).slice(0, 2) : "N/A"}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-[13px]">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: tr.color,
                                  boxShadow: `0 0 6px ${tr.color}60`,
                                }}
                              ></div>
                              {tr.category}
                            </div>
                          </div>

                          <div className="col-span-2 text-[14px] text-gray-400">
                            {formatDate(tr.date)}
                          </div>

                          <div className="col-span-2 flex justify-center">
                            <span
                              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${tr.status === true
                                ? "bg-green-400/10 text-green-400"
                                : "bg-yellow-400/10 text-yellow-400"
                                }`}
                            >
                              {tr.status === true
                                ? t("transactions.table.completed")
                                : t("transactions.table.pending")}
                            </span>
                          </div>

                          <div className="col-span-1 text-right">
                            <div
                              className={`text-[16px] font-bold ${tr.type === 'revenue'
                                ? "text-green-400"
                                : "text-red-400"
                                } flex items-center justify-end gap-1 tabular-nums`}
                            >
                              <span className="w-4 inline-block text-center">{tr.type === 'revenue' ? "+" : "-"}</span>
                              <span>{formatCurrency(Math.abs(tr.amount))}</span>
                            </div>
                          </div>

                          <div className="col-span-1 text-right">
                            <button
                              onClick={() => HandleRemove(tr.id)}
                              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="text-[18px] font-semibold mb-2">
                      {t("transactions.table.emptyTitle")}
                    </div>
                    <div className="text-[14px] text-gray-500">
                      {t("transactions.table.emptySubtitle")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <div>
        <TransactionModal
          Isopen={openModal}
          close={() => setOpenModal(false)}
          onSave={HandleSaveTransaction}
        />
      </div>
    </div>
  );
};

export default Transactions;
