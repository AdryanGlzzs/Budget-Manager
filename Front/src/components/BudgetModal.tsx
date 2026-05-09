import {
  Plus,
  Coffee,
  Car,
  ShoppingBag,
  Zap,
  Home,
  Smartphone,
  Clapperboard,
  Dumbbell,
  Plane,
  Pill,
  BookOpen,
  PawPrint,
  Check,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: BudgetsProps) => void;
  onDelete?: (id: number) => void;
  editingBudget?: BudgetsProps | null;
};

export interface BudgetsProps {
  id: number;
  name: string;
  icon: LucideIcon;
  color: string;
  spent: number;
  limit: number;
  percentage: number;
  trend: string;
  trendType: "Up" | "Down";
  description?: string;
  alertThreshold?: number;
  autoRenew?: boolean;
  startDate?: string;
  endDate?: string;
  period?: string;
}

type Errors = Partial<Record<keyof BudgetsProps, string>>;

const iconOptions: LucideIcon[] = [
  Coffee,
  Car,
  ShoppingBag,
  Zap,
  Home,
  Smartphone,
  Clapperboard,
  Dumbbell,
  Plane,
  Pill,
  BookOpen,
  PawPrint,
];

const colors = [
  "#6366F1",
  "#06B6D4",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
];

const PERIOD_OPTIONS = [
  "Este mês",
  "Próximo mês",
  "Trimestral",
  "Anual",
  "Personalizado",
];

const emptyBudget = (): BudgetsProps => ({
  id: Math.floor(Math.random() * 1_000_000),
  color: colors[0],
  icon: Coffee,
  limit: 0,
  name: "",
  percentage: 0,
  spent: 0,
  trend: "",
  trendType: "Up",
  description: "",
  alertThreshold: 80,
  autoRenew: true,
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  period: "Este mês",
});

const BudgetModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingBudget,
}: BudgetModalProps) => {
  const isEditing = !!editingBudget;

  const [budget, setBudget] = useState<BudgetsProps>(emptyBudget());
  const [errors, setErrors] = useState<Errors>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBudget(editingBudget ? { ...editingBudget } : emptyBudget());
      setErrors({});
      setShowDeleteConfirm(false);
    }
  }, [isOpen, editingBudget]);

  const handleChange = (field: keyof BudgetsProps, value: any) => {
    setBudget((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...budget, limit: Number(budget.limit) });
    onClose();
  };

  const handleDelete = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    onDelete?.(budget.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0a0a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? "Editar Orçamento" : "Criar Orçamento"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isEditing
                  ? "Atualize as configurações do orçamento"
                  : "Defina limites para controlar seus gastos"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nome da Categoria
              </label>
              <input
                value={budget.name}
                onChange={(e) => handleChange("name", e.target.value)}
                type="text"
                placeholder="Ex: Alimentação, Lazer..."
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-white/10 focus:border-purple-500/50"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Descrição{" "}
                <span className="text-gray-600 font-normal">(opcional)</span>
              </label>
              <textarea
                value={budget.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={2}
                placeholder="Adicione uma nota sobre este orçamento..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Limite Mensal
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    value={budget.limit || ""}
                    onChange={(e) =>
                      handleChange("limit", Number(e.target.value))
                    }
                    type="number"
                    min={0}
                    placeholder="0.00"
                    className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-colors ${
                      errors.limit
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-purple-500/50"
                    }`}
                  />
                </div>
                {errors.limit && (
                  <p className="mt-1 text-xs text-red-400">{errors.limit}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Período
                </label>
                <select
                  value={budget.period}
                  onChange={(e) => handleChange("period", e.target.value)}
                  className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none transition-colors"
                >
                  {PERIOD_OPTIONS.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {budget.period === "Personalizado" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    value={budget.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      errors.startDate
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-purple-500/50"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data de Fim
                  </label>
                  <input
                    type="date"
                    value={budget.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      errors.endDate
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-purple-500/50"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-400">
                  Alerta de Gasto
                </label>
                <span className="text-sm font-semibold text-purple-400">
                  {budget.alertThreshold}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={budget.alertThreshold}
                onChange={(e) =>
                  handleChange("alertThreshold", Number(e.target.value))
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="mt-1 text-xs text-gray-600">
                Você será alertado ao atingir {budget.alertThreshold}% do limite
                (R${" "}
                {budget.limit
                  ? (
                      (Number(budget.limit) * (budget.alertThreshold ?? 80)) /
                      100
                    ).toFixed(2)
                  : "0,00"}
                )
              </p>
            </div>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">
                  Renovação Automática
                </p>
                <p className="text-xs text-gray-500">
                  Reinicia o limite automaticamente a cada período
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChange("autoRenew", !budget.autoRenew)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  budget.autoRenew ? "bg-purple-600" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    budget.autoRenew ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Ícone
              </label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((Icon, i) => {
                  const isSelected = budget.icon === Icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleChange("icon", Icon)}
                      className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-500/60 text-white"
                          : "bg-white/5 border-white/10 hover:bg-purple-500/10 hover:border-purple-500/40 text-gray-300 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cor
              </label>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => {
                  const isSelected = budget.color === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleChange("color", color)}
                      className="w-7 h-7 rounded-full hover:scale-110 transition-all border-2 flex items-center justify-center"
                      style={{
                        background: color,
                        borderColor: isSelected ? "white" : "transparent",
                        boxShadow: isSelected ? `0 0 8px ${color}` : "none",
                      }}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {isEditing && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`px-4 py-3.5 rounded-xl font-semibold border transition-all flex items-center gap-2 ${
                    showDeleteConfirm
                      ? "bg-red-600 border-red-500 text-white hover:bg-red-700"
                      : "bg-white/5 border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {showDeleteConfirm ? "Confirmar" : "Excluir"}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex-[2] px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
              >
                {isEditing ? "Atualizar" : "Salvar Orçamento"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
