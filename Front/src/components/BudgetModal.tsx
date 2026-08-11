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
  Calendar,
  ChevronDown
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { api } from "../services/api";

type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: BudgetsProps) => void;
  onDelete?: (id: string) => void;
  editingBudget?: BudgetsProps | null;
};

export const iconOptions = {
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
  PawPrint
} as const

export type IconName = keyof typeof iconOptions

export interface BudgetsProps {
  name: string;
  icon: string;
  color: string;
  spent: number;
  limit: number;
  description: string;
  period: string;
}

type Errors = Partial<Record<keyof BudgetsProps, string>>;



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
  { label: "Este mês", value: "current-month" },
  { label: "Próximo mês", value: "next-month" },
  { label: "Trimestral", value: "quarterly" },
  { label: "Anual", value: "yearly" },
  { label: "Personalizado", value: "custom" },
];



const BudgetModal = ({ isOpen, onClose, onSave, onDelete }: BudgetModalProps) => {
  const [errors, setErrors] = useState<Errors>({});
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<IconName>("BookOpen")
  const [budget, setBudget] = useState<BudgetsProps>({
    name: "",
    icon: "BookOpen",
    color: "",
    spent: 0,
    limit: 0,
    description: '',
    period: ''
  })
  const handleDelete = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    onClose();
  };

  const handleSave = async (newBudget: BudgetsProps) => {
    try {

      console.log(budget.name)
      console.log(budget.color)
      console.log(budget.description)
      console.log(budget.limit)
      console.log(budget.period)
      console.log(budget.spent)
      console.log(budget.icon)

      const { data } = await api.post("/budgets", newBudget);

      console.log("Enviando:", newBudget);

      onSave({ ...newBudget, ...data });
      onClose();  
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    console.log(e.target.name, e.target.value);


    const { name, value } = e.target

    setBudget((prev) => ({
      ...prev,
      [name]: name === 'limit' || name === "spent" ? Number(value) : value
    }))
  };




  if (!isOpen) {
    return null
  }


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
                name="name"
                value={budget.name}
                onChange={handleChange}
                type="text"
                placeholder="Ex: Alimentação, Lazer..."
                className={`w-full bg-white/5   border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none transition-colors ${errors.name
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
                name="description"
                value={budget.description}
                onChange={handleChange}
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
                    name="limit"
                    value={budget.limit === 0 ? "" : budget.limit}
                    onChange={handleChange}
                    type="number"
                    min={""}
                    placeholder="0.00"
                    className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-colors ${errors.limit
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
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <select
                    name="period"
                    value={budget.period || "current-month"}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                  >
                    {PERIOD_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gasto Atual
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    R$
                  </span>
                  <input
                    name="spent"
                    value={budget.spent === 0 ? "" : budget.spent}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none transition-colors ${errors.spent
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/10 focus:border-purple-500/50"
                      }`}
                  />
                </div>
                {errors.spent && (
                  <p className="mt-1 text-xs text-red-400">{errors.spent}</p>
                )}
              </div>

              <div></div>
              <div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Ícone
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {Object.entries(iconOptions).map(([iconName, IconComponent]) => {
                    const isSelected = selectedIcon === iconName

                    return (
                      <button
                        name="icon"
                        key={iconName}
                        value={iconName}
                        type="button"
                        onClick={() => {
                          setSelectedIcon(iconName as IconName);

                          setBudget((prev) => ({
                            ...prev,
                            icon: iconName
                          }))

                          console.log(iconName)
                        }}
                        className={`aspect-square rounded-xl flex items-center justify-center border transition-all ${isSelected
                          ? "bg-purple-500/20 border-purple-500/60 text-white"
                          : "bg-white/5 border-white/10 hover:bg-purple-500/10 hover:border-purple-500/40 text-gray-300 hover:text-white"
                          }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              {errors.limit && (
                <p className="mt-1 text-xs text-red-400">{errors.limit}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cor
            </label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    value={budget.color}
                    name="color"
                    key={color}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color);
                      setBudget((prev) => ({
                        ...prev,
                        color
                      }));

                      console.log(budget.color);
                    }}
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
                className={`px-4   py-3.5 rounded-xl font-semibold border transition-all flex items-center gap-2 ${showDeleteConfirm
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
              onClick={() => handleSave(budget)}
              className="flex-[2] px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
            >
              {isEditing ? "Atualizar" : "Salvar Orçamento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}








export default BudgetModal;
