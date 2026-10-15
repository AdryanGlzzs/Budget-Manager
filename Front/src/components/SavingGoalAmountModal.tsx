import {
  X,
  Plus,
  Minus,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  Wallet,
  Calendar,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Goalsprops } from "./SavingGoalsModal";
import { formatCurrency } from "../utils/formatCurrency";

export type SavingGoalActionType = "add" | "remove";

type SavingGoalAmountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  goal: Goalsprops | null;
  onSave: (updatedGoal: Goalsprops) => void;
  initialType?: SavingGoalActionType;
};

export const SavingGoalAmountModal = ({
  isOpen,
  onClose,
  goal,
  onSave,
  initialType = "add",
}: SavingGoalAmountModalProps) => {
  const [type, setType] = useState<SavingGoalActionType>(initialType);
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setValue("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [isOpen, initialType]);

  if (!isOpen || !goal) return null;

  const current = Number(goal.current || 0);
  const target = Number(goal.target || 0);
  const numValue = Number(value) || 0;

  const newTotal =
    type === "add" ? current + numValue : Math.max(0, current - numValue);

  const currentPercent =
    target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
  const newPercent =
    target > 0 ? Math.min(Math.round((newTotal / target) * 100), 100) : 0;
  const remainingBefore = Math.max(0, target - current);

  const handleSubmit = () => {
    onSave({
      ...goal,
      current: newTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[500px] bg-[#0c0c1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 text-white z-10">

        <div
          className={`absolute -top-24 -left-24 w-52 h-52 rounded-full blur-[90px] opacity-60 pointer-events-none transition-all duration-500 ${type === "add" ? "bg-emerald-500" : "bg-rose-500"
            }`}
        />

        <div className="p-6 sm:p-7 relative">

          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
                  style={{ backgroundColor: goal.color || "#10B981" }}
                />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">
                  Movimentar Meta
                </span>
              </div>
              <h2 className="text-[20px] font-bold text-white tracking-tight">
                {type === "add"
                  ? "Adicionar Valor Salvo"
                  : "Remover Valor Salvo"}
              </h2>
              <p className="text-[13px] text-white/50 mt-0.5">
                {type === "add"
                  ? "Deposite dinheiro guardado para avançar seu objetivo."
                  : "Resgate um valor economizado desta meta."}
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: `${goal.color || "#6366F1"}25`,
                    color: goal.color || "#6366F1",
                  }}
                >
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-white leading-tight">
                    {goal.name}
                  </h4>
                  <p className="text-[12px] text-white/45">
                    Alvo: {formatCurrency(target)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-white/40 block">
                  Saldo Salvo Atual
                </span>
                <span className="text-[16px] font-bold text-white">
                  {formatCurrency(current)}
                </span>
              </div>
            </div>

            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${currentPercent}%`,
                  backgroundColor: goal.color || "#10B981",
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-white/40 mt-1.5">
              <span>{currentPercent}% concluído</span>
              <span>
                {remainingBefore > 0
                  ? `Faltam ${formatCurrency(remainingBefore)}`
                  : "Meta alcançada!"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => setType("add")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${type === "add"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/20"
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <Plus className="w-4 h-4" />
              Adicionar (Guardar)
            </button>

            <button
              type="button"
              onClick={() => setType("remove")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${type === "remove"
                ? "bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/20"
                : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
            >
              <Minus className="w-4 h-4" />
              Remover (Resgatar)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-medium text-white/50 uppercase tracking-wider block mb-1.5">
                {type === "add" ? "Valor a Guardar" : "Valor a Retirar"}
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-semibold text-[15px] pointer-events-none">
                  R$
                </span>
                <input
                  type="number"
                  placeholder="0,00"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-white/4 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-[18px] font-bold text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {type === "add" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setValue("20")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      + R$ 20
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("50")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      + R$ 50
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("100")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      + R$ 100
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("250")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      + R$ 250
                    </button>
                    {remainingBefore > 0 && (
                      <button
                        type="button"
                        onClick={() => setValue(String(remainingBefore))}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Completar Meta ({formatCurrency(remainingBefore)})
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setValue("50")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      - R$ 50
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue("100")}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      - R$ 100
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue(String(Math.round(current * 0.5)))}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-[11px] font-medium text-white/60 transition-all cursor-pointer"
                    >
                      50%
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue(String(current))}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[11px] font-semibold text-rose-300 transition-all cursor-pointer"
                    >
                      Tudo ({formatCurrency(current)})
                    </button>
                  </>
                )}
              </div>
            </div>

            {numValue > 0 && (
              <div
                className={`p-4 rounded-2xl border transition-all ${type === "add"
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-rose-500/5 border-rose-500/20"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block mb-0.5">
                      {type === "add" ? "Aporte" : "Resgate"}
                    </span>
                    <span
                      className={`text-[16px] font-extrabold ${type === "add" ? "text-emerald-400" : "text-rose-400"
                        }`}
                    >
                      {type === "add" ? "+" : "–"} {formatCurrency(numValue)}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-white/30" />

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block mb-0.5">
                      Novo Saldo Salvo
                    </span>
                    <span className="text-[16px] font-extrabold text-white">
                      {formatCurrency(newTotal)}
                      <span className="text-[11px] font-normal text-white/40 ml-1">
                        / {formatCurrency(target)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-white/50 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Progresso previsto
                    </span>
                    <span className="font-semibold text-white">
                      {currentPercent}% → {newPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${type === "add"
                        ? "bg-linear-to-r from-emerald-500 to-teal-400"
                        : "bg-linear-to-r from-rose-500 to-amber-500"
                        }`}
                      style={{ width: `${newPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-medium text-white/45 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Descrição{" "}
                  <span className="text-white/30 lowercase">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    type === "add"
                      ? "Ex: Aporte do salário"
                      : "Ex: Resgate para compra"
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-white/45 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Data
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/4 border border-white/10 rounded-xl px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/25 transition-colors scheme-dark"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[13px] font-medium text-white/60 hover:text-white transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className={`flex-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] ${type === "add"
                  ? "bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-600/30"
                  : "bg-linear-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 shadow-rose-600/30"
                  }`}
              >
                {type === "add" ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    Confirmar Depósito
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4" />
                    Confirmar Resgate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
