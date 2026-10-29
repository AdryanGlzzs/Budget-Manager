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
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { TransactionModal } from "../components/TransactionModal";
import type { TransactionProps } from "../components/TransactionModal";
import { api } from "../services/api";
import { useThemeColors } from "../contexts/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation();
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

  const TotalRevenue = transaction
    .filter((tr) => tr.type === "revenue")
    .reduce((sun, tr) => sun + Number(tr.amount || 0), 0);

  const TotalExpense = transaction
    .filter((tr) => tr.type === "expense")
    .reduce((decrease, tr) => decrease + Number(tr.amount || 0), 0);

  const TotalBalance = TotalRevenue - TotalExpense;

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

  const selectedFilter = "all";

  const filterOptions = [
    { key: "all", label: t("transactions.filters.all") },
    { key: "revenue", label: t("transactions.filters.revenue") },
    { key: "expenses", label: t("transactions.filters.expenses") },
    { key: "pending", label: t("transactions.filters.pending") },
  ];

  const filteredTransactions = transaction;

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
                    <div className="text-[13px] text-green-400">{t("transactions.thisMonth")}</div>
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
                    <div className="text-[13px] text-red-400">{t("transactions.thisMonth")}</div>
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
                    <div className="text-[13px] text-green-400">{t("transactions.thisMonth")}</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="relative group mb-6">
              <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter.key}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all ${selectedFilter === filter.key
                            ? theme.activeBg
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>

                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[13px] sm:text-[14px] hover:bg-white/10 transition-all">
                      <Filter className="w-4 h-4" />
                      {t("transactions.allCategories")}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[13px] sm:text-[14px] hover:bg-white/10 transition-all">
                      <Calendar className="w-4 h-4" />
                      {t("transactions.thisMonth")}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <button className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 ${theme.activeBg} rounded-xl text-[13px] sm:text-[14px] font-semibold transition-all hover:scale-[1.02]`}>
                      <Download className="w-4 h-4 sm:ml-1" />
                      {t("transactions.export")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
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
                              {tr.date?.split('T')[0]}
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
                            {tr.date.split("T")[0]}
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
