import {
  Wallet,
  Target,
  TrendingUp,
  Plus,
  Minus,
  Coins,
  ArrowRight,
  Trash2,
  Search,
  Edit,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { SavingsGoalsModal } from "../components/SavingGoalsModal";
import type { Goalsprops } from "../components/SavingGoalsModal";
import {
  SavingGoalAmountModal,
  type SavingGoalActionType,
} from "../components/SavingGoalAmountModal";
import { api } from "../services/api";
import { useThemeColors } from "../contexts/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { useTranslation } from "react-i18next";

const SavingsGoals = () => {
  const { t } = useTranslation();
  const [SavingModal, setSavingModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [Goals, setGoals] = useState<Goalsprops[]>([]);
  const [editing, setEditing] = useState<Goalsprops | null>();
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];

  const [amountModalOpen, setAmountModalOpen] = useState(false);
  const [selectedGoalForAmount, setSelectedGoalForAmount] =
    useState<Goalsprops | null>(null);
  const [amountInitialMode, setAmountInitialMode] =
    useState<SavingGoalActionType>("add");

  const goalReduce = Goals.reduce(
    (total, goal) => total + Number(goal.current || 0),
    0
  );

  useEffect(() => {
    getSavingGoals();
  }, []);

  const getSavingGoals = async () => {
    try {
      const response = await api.get("/savings-goals");
      if (response?.data?.data) {
        setGoals(response.data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    }
  };

  const HandleRemoveGoals = async (id: string) => {
    try {
      await api.delete(`/savings-goals/delete/${id}`);
      setGoals((prev) => prev.filter((goals) => goals.id !== id));
      getSavingGoals();
    } catch (error) {
      console.error("Erro ao deletar meta:", error);
    }
  };

  const HandleSaveGoals = async (newGoals: Goalsprops) => {
    try {
      if (newGoals.id) {
        await api.put(`/savings-goals/edit/${newGoals.id}`, newGoals);
      } else {
        await api.post("/savings-goals", newGoals);
      }
      getSavingGoals();
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    }
  };

  const handleOpenAmountModal = (
    goal: Goalsprops | null,
    mode: SavingGoalActionType = "add"
  ) => {
    setSelectedGoalForAmount(goal);
    setAmountInitialMode(mode);
    setAmountModalOpen(true);
  };

  const handleOpenRemoveModal = (
    goal: Goalsprops | null,
    mode: SavingGoalActionType = "remove"
  ) => {
    setSelectedGoalForAmount(goal);
    setAmountInitialMode(mode);
    setAmountModalOpen(true);
  };

  const handleSaveAmount = async (updatedGoal: Goalsprops) => {
    try {
      await api.put(`/savings-goals/edit/${updatedGoal.id}`, updatedGoal);
      setGoals((prev) =>
        prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
      );
      getSavingGoals();
    } catch (error) {
      console.error("Erro ao atualizar valor da meta:", error);
    }
  };

  const getGoalTheme = (colorStr: string) => {
    const isHex = colorStr?.startsWith("#");
    const hexColor = isHex
      ? colorStr
      : colorStr === "purple"
        ? "#8B5CF6"
        : colorStr === "cyan"
          ? "#06B6D4"
          : colorStr === "pink"
            ? "#EC4899"
            : colorStr === "green"
              ? "#10B981"
              : "#8B5CF6";

    return {
      hex: hexColor,
      textStyle: { color: hexColor },
      bgStyle: { backgroundColor: `${hexColor}20` },
      barStyle: {
        background: `linear-gradient(90deg, ${hexColor}, ${hexColor}dd)`,
        boxShadow: `0 0 10px ${hexColor}60`,
      },
    };
  };

  const GoalsLength = Goals;

  const averageProgress =
    Goals.length > 0
      ? Math.round(
          Goals.reduce(
            (acc, goal) =>
              acc +
              (Number(goal.target) > 0
                ? (Number(goal.current) / Number(goal.target)) * 100
                : 0),
            0
          ) / Goals.length
        )
      : 0;

  return (
    <div
      className={`flex min-h-screen ${theme.bg} text-white overflow-hidden transition-colors duration-500`}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -left-50 -top-50 w-150 h-150 bg-linear-to-br ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}
        ></div>
        <div
          className={`absolute -right-50 -bottom-50 w-150 h-150 bg-linear-to-bl ${theme.glow} rounded-full blur-[140px] opacity-80 transition-all duration-700`}
        ></div>
      </div>

      <div className="pb-0">
        <Header />
      </div>

      <div className="z-20 lg:pr-60">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <main className="flex-1 p-8 max-w-350 relative z-10 overflow-y-auto h-screen mt-15">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold mb-2">
              {t("savingsGoalsPage.title")}
            </h1>
            <p className="text-gray-400 text-[15px] w-[80%]">
              {t("savingsGoalsPage.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenAmountModal(Goals[0] || null, "add")}
              disabled={Goals.length === 0}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title={
                Goals.length === 0
                  ? t("savingsGoalsPage.tooltips.createGoalFirst")
                  : t("savingsGoalsPage.tooltips.manageSavedFunds")
              }
            >
              <Coins className="w-4 h-4 text-emerald-400" />
              {t("savingsGoalsPage.actions.depositWithdraw")}
            </button>
            <button
              onClick={() => {
                setEditing(null);
                setSavingModal(true);
              }}
              className={`${theme.activeBg} text-white px-5 py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer`}
            >
              <Plus className="w-5 h-5" />
              {t("savingsGoalsPage.actions.newGoal")}
            </button>
          </div>
        </header>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div
              className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
            ></div>
            <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">
                    {t("savingsGoalsPage.cards.totalSaved")}
                  </p>
                  <h3 className="text-[24px] font-bold">
                    {formatCurrency(goalReduce)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div
              className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
            ></div>
            <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">
                    {t("savingsGoalsPage.cards.activeGoals")}
                  </p>
                  <h3 className="text-[24px] font-bold">{Goals.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div
              className={`absolute inset-0 bg-linear-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
            ></div>
            <div className="relative bg-linear-to-br from-white/10 to-white/2 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">
                    {t("savingsGoalsPage.cards.averageProgress")}
                  </p>
                  <h3 className="text-[24px] font-bold">{averageProgress} %</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-[20px] font-semibold mb-6">
          {t("savingsGoalsPage.sectionTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Goals.map((Goal) => {
            const currentVal = Number(Goal.current || 0);
            const targetVal = Number(Goal.target || 0);
            const percent =
              targetVal > 0
                ? Math.min(Math.round((currentVal / targetVal) * 100), 100)
                : 0;

            const goalTheme = getGoalTheme(Goal.color);

            return (
              <div key={Goal.id} className="relative group cursor-pointer">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    backgroundColor: `${goalTheme.hex}15`,
                  }}
                ></div>

                <div className="relative bg-[#0a0a14]/60 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-1">
                  <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                    <button
                      className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                      title={t("savingsGoalsPage.actions.editGoal")}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditing(Goal);
                        setSavingModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      className="p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                      title={t("savingsGoalsPage.actions.removeGoal")}
                      onClick={(e) => {
                        e.stopPropagation();
                        HandleRemoveGoals(Goal.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: goalTheme.hex }}
                    />
                    <h3 className="text-[18px] font-bold text-white truncate">
                      {Goal.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      className="text-[24px] font-bold"
                      style={goalTheme.textStyle}
                    >
                      {formatCurrency(currentVal)}
                    </span>
                    <span className="text-[14px] text-gray-500">
                      {t("savingsGoalsPage.goalCard.of")} {formatCurrency(targetVal)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-400">
                        {t("savingsGoalsPage.goalCard.progress")}
                      </span>
                      <span className="font-semibold text-white">
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percent}%`,
                          ...goalTheme.barStyle,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAmountModal(Goal, "add");
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-[12px] font-semibold transition-all hover:scale-[1.02] cursor-pointer"
                      title={t("savingsGoalsPage.tooltips.addSavedAmount")}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("savingsGoalsPage.actions.deposit")}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRemoveModal(Goal, "remove");
                      }}
                      disabled={currentVal <= 0}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-[12px] font-semibold transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      title={t("savingsGoalsPage.tooltips.withdrawSavedAmount")}
                    >
                      <Minus className="w-3.5 h-3.5" />
                      {t("savingsGoalsPage.actions.withdraw")}
                    </button>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleOpenAmountModal(Goal, "add")}
                      className="text-[12px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors group/btn cursor-pointer"
                    >
                      {t("savingsGoalsPage.actions.moveBalance")}
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {GoalsLength.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <div className="text-[18px] font-semibold mb-2">
              {t("savingsGoalsPage.empty.title")}
            </div>
            <div className="text-[14px] text-gray-500">
              {t("savingsGoalsPage.empty.subtitle")}
            </div>
          </div>
        )}
      </main>

      <SavingsGoalsModal
        IsOpen={SavingModal}
        OnClose={() => setSavingModal(false)}
        OnSave={HandleSaveGoals}
        EditingGoals={editing}
      />

      <SavingGoalAmountModal
        isOpen={amountModalOpen}
        onClose={() => setAmountModalOpen(false)}
        goal={selectedGoalForAmount}
        onSave={handleSaveAmount}
        initialType={amountInitialMode}
      />
    </div>
  );
};

export default SavingsGoals;
