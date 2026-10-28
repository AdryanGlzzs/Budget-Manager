import {
  Plus,
  Target,
  TrendingUp,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import BudgetModal from "../components/BudgetModal";
import type { BudgetsProps } from "../../src/components/BudgetModal";
import { DeductModal } from "../components/deductModal";
import type { PropsModalDeduct } from '../components/deductModal';
import { api } from "../services/api";
import { useThemeColors } from "../contexts/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useTranslation } from "react-i18next";

const Budgets = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];

  const [deductModalOpen, setDeductModalOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selected, setSelected] = useState<BudgetsProps | null>(null);
  const [editingBudget, setEditingBudget] = useState<BudgetsProps | null>(null);

  const [budgets, setBudgets] = useState<BudgetsProps[]>([]);

  const getBudgets = async () => {
    try {
      const response = await api.get('/budgets');
      if (response?.data?.data) {
        setBudgets(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar orçamentos:", error);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  const HandleSaveBudget = (newBudget: BudgetsProps) => {
    getBudgets();
  };

  const HandleSaveDeduct = (data: PropsModalDeduct) => {};

  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/budgets/delete/${id}`);
      getBudgets();
    } catch (error) {
      console.error("Erro ao excluir orçamento:", error);
    }
  };

  const handleEdit = (budget: BudgetsProps) => {
    setEditingBudget(budget);
    setBudgetOpen(true);
  };

  const handleClose = () => {
    setBudgetOpen(false);
    setEditingBudget(null);
  };

  const FilterBudgets = budgets;

  const totalBudget = budgets.reduce((sum, b) => sum + Number(b.limit || 0), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);
  const totalPercentage =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <div className={`min-h-screen ${theme.bg} text-white overflow-hidden transition-colors duration-500`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -left-50 -top-50 w-150 h-150 bg-linear-to-br ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -right-50 -top-50 w-150 h-150 bg-linear-to-bl ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -left-50 -bottom-50 w-150 h-150 bg-linear-to-tr ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
        <div className={`absolute -right-50 -bottom-50 w-150 h-150 bg-linear-to-tl ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}></div>
      </div>

      <div className="relative z-10">
        <div className="pb-20">
          <Header />
        </div>

        <div className="flex">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 w-full p-4 sm:p-6 md:p-8 max-w-350 overflow-x-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold mb-2 md:mb-3">
                  {t("budgetsPage.title")}
                </h1>
                <p className="text-[14px] md:text-[16px] text-gray-400">
                  {t("budgetsPage.subtitle")}
                </p>
              </div>

              <button
                className={`flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 ${theme.activeBg} rounded-xl text-[14px] md:text-[15px] font-semibold transition-all hover:scale-[1.02] w-full sm:w-auto shrink-0`}
                onClick={() => {
                  setEditingBudget(null);
                  setBudgetOpen(true);
                }}
              >
                <Plus className="w-5 h-5" />
                {t("budgetsPage.createBudget")}
              </button>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Orçamento Total */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                <div className="relative bg-linear-to-br from-purple-600/20 to-purple-800/10 p-5 md:p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      {t("budgetsPage.cards.totalBudget")}
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    {formatCurrency(totalBudget)}
                  </div>
                  <div className="text-[12px] md:text-[13px] text-gray-400">
                    {t("budgetsPage.cards.allCategories")}
                  </div>
                </div>
              </div>

              {/* Total Gasto */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                <div className="relative bg-linear-to-br from-cyan-600/20 to-cyan-800/10 p-5 md:p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      {t("budgetsPage.cards.totalSpent")}
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    {formatCurrency(totalSpent)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[12px] md:text-[13px] text-cyan-400">
                      {totalPercentage}% {t("budgetsPage.cards.ofBudget")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Restante */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity`}></div>
                <div className="relative bg-linear-to-br from-green-600/20 to-green-800/10 p-5 md:p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      {t("budgetsPage.cards.remaining")}
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    {formatCurrency(totalBudget - totalSpent)}
                  </div>
                  <div className="text-[12px] md:text-[13px] text-green-400">
                    {100 - totalPercentage}% {t("budgetsPage.cards.available")}
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Categorias de Orçamento */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <div className="relative bg-linear-to-br from-white/10 to-white/2 p-4 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-6">
                  <h2 className="text-[18px] md:text-[20px] font-semibold">
                    {t("budgetsPage.categories.title")}
                  </h2>
                  <select
                    defaultValue={t("budgetsPage.categories.periods.thisMonth")}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <option>{t("budgetsPage.categories.periods.thisMonth")}</option>
                    <option>{t("budgetsPage.categories.periods.lastMonth")}</option>
                    <option>{t("budgetsPage.categories.periods.thisYear")}</option>
                  </select>
                </div>

                {FilterBudgets.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="text-[18px] font-semibold mb-2">
                      {t("budgetsPage.categories.emptyTitle")}
                    </div>
                    <div className="text-[14px] text-gray-500">
                      {t("budgetsPage.categories.emptySubtitle")}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 w-full">
                    {FilterBudgets.map((item, index) => {
                      const percentage =
                        item.limit > 0
                          ? Math.round((item.spent / item.limit) * 100)
                          : 0;
                      const isOverBudget = percentage > 100;
                      const isWarning = percentage >= 80 && percentage <= 100;

                      return (
                        <div
                          key={index}
                          className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {item.name}
                                </h3>
                                {item.description && (
                                  <p className="text-xs text-gray-400">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="gap-2">
                                <button
                                  onClick={() => handleRemove(item.id)}
                                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-baseline gap-2 mb-3">
                              <span
                                className={`text-[22px] md:text-[28px] font-bold ${
                                  isOverBudget ? "text-red-400" : "text-white"
                                }`}
                              >
                                {formatCurrency(item.spent)}
                              </span>
                              <span className="text-[14px] md:text-[16px] text-gray-500">
                                {t("budgetsPage.categories.of")} {formatCurrency(item.limit)}
                              </span>
                              <span
                                className={`text-[13px] md:text-[14px] ml-auto font-medium ${
                                  isOverBudget
                                    ? "text-red-400"
                                    : isWarning
                                      ? "text-yellow-400"
                                      : "text-green-400"
                                }`}
                              >
                                {percentage}%
                              </span>
                            </div>

                            <div className="w-full bg-white/5 rounded-full h-2.5 md:h-3 overflow-hidden">
                              <div
                                className={`h-full rounded-full shadow-lg transition-all ${
                                  isOverBudget
                                    ? "bg-linear-to-r from-red-600 to-red-500 shadow-red-600/50"
                                    : isWarning
                                      ? "bg-linear-to-r from-yellow-600 to-yellow-500 shadow-yellow-600/50"
                                      : "bg-linear-to-r from-purple-600 to-purple-500 shadow-purple-600/50"
                                }`}
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                }}
                              ></div>
                            </div>

                            <div className="mt-2.5 md:mt-3 text-[12px] md:text-[13px] text-gray-400">
                              {formatCurrency(item.limit - item.spent > 0 ? item.limit - item.spent : 0)}{" "}
                              {t("budgetsPage.categories.remaining")}
                              {isOverBudget && (
                                <span className="text-red-400 ml-2">
                                  • {formatCurrency(item.spent - item.limit)} {t("budgetsPage.categories.overBudget")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <BudgetModal
        isOpen={budgetOpen}
        onClose={handleClose}
        onSave={HandleSaveBudget}
        onDelete={handleRemove}
        editingBudget={editingBudget}
      />

      <DeductModal
        isOpen={deductModalOpen}
        close={() => setDeductModalOpen(false)}
        selectedBudget={selected}
        saveDeduct={HandleSaveDeduct}
      />
    </div>
  );
};

export default Budgets;
