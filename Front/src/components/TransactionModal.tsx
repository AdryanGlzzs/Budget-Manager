import {
  X,
  Coffee,
  ShoppingCart,
  Car,
  Home,
  Heart,
  Briefcase,
  Utensils,
  Gamepad2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

type TransactionModalProps = {
  Isopen: boolean;
  close: () => void;
  onSave: (transaction: TransactionProps) => void;
};

export interface TransactionProps {
  id: number;
  name: string;
  category: string;
  dateString: string;
  amount: number;
  icon: LucideIcon;
  color: string;
  type: "expense" | "revenue";
  status: boolean;
}

const IconOptions = [
  { id: 1, label: "Café", icon: Coffee },
  { id: 2, label: "Compras", icon: ShoppingCart },
  { id: 3, label: "Carro", icon: Car },
  { id: 4, label: "Casa", icon: Home },
  { id: 5, label: "Saúde", icon: Heart },
  { id: 6, label: "Trabalho", icon: Briefcase },
  { id: 7, label: "Comida", icon: Utensils },
  { id: 8, label: "Lazer", icon: Gamepad2 },
  { id: 9, label: "Energia", icon: Zap },
];

const ColorOptions = [
  { label: "Indigo", hex: "#6366F1" },
  { label: "Violeta", hex: "#8B5CF6" },
  { label: "Rosa", hex: "#EC4899" },
  { label: "Vermelho", hex: "#EF4444" },
  { label: "Laranja", hex: "#F97316" },
  { label: "Amarelo", hex: "#EAB308" },
  { label: "Verde", hex: "#22C55E" },
  { label: "Ciano", hex: "#06B6D4" },
  { label: "Azul", hex: "#3B82F6" },
];

export const TransactionModal = ({
  Isopen,
  close,
  onSave,
}: TransactionModalProps) => {
  const [formProps, setFormProps] = useState<TransactionProps>({
    id: Math.floor(Math.random() * 1000),
    name: "",
    category: "Alimentação",
    dateString: new Date().toISOString().split("T")[0],
    amount: 0,
    icon: Coffee,
    color: "#6366F1",
    type: "revenue",
    status: true,
  });


  const HandleChange = (field: keyof TransactionProps, value: any) => {
    setFormProps((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HandleSave = () => {
    if (!formProps.name || formProps.amount <= 0) return;
    onSave(formProps);

    setFormProps({
      id: Math.floor(Math.random() * 1000),
      name: "",
      category: "Alimentação",
      dateString: new Date().toISOString().split("T")[0],
      amount: 0,
      icon: Coffee,
      color: "#6366F1",
      type: "revenue",
      status: true,
    });

    close();
  };

   

  if (!Isopen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-[460px] bg-[#0a0a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative p-7">
          <div className="flex items-start justify-between mb-7">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[21px] font-bold text-white">
                  Nova Transação
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                    formProps.type === "revenue"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  <span className={`text-[11px] font-semibold`}>
                    {formProps.type === "revenue" ? "Receita" : "Despesa"}
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={close}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                Descrição
              </label>
              <input
                value={formProps.name}
                onChange={(e) => HandleChange("name", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
                placeholder="Ex: Assinatura Netflix"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                  Valor
                </label>
                <input
                  type="number"
                  value={formProps.amount}
                  onChange={(e) =>
                    HandleChange("amount", Number(e.target.value))
                  }
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                  Tipo
                </label>
                <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
                  <button
                    onClick={() => HandleChange("type", "expense")}
                    className={`flex-1 py-2 rounded-lg text-[12px] ${formProps.type === "expense" ? "bg-red-500/20 text-red-400" : "text-gray-500"}`}
                  >
                    Despesa
                  </button>
                  <button
                    onClick={() => HandleChange("type", "revenue")}
                    className={`flex-1 py-2 rounded-lg text-[12px] ${formProps.type === "revenue" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500"}`}
                  >
                    Receita
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                Cor
              </label>
              <div className="flex flex-wrap gap-2">
                {ColorOptions.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => HandleChange("color", color.hex)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formProps.color === color.hex
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                Ícone
              </label>
              <div className="flex flex-wrap gap-2">
                {IconOptions.map(({ label, icon: IconOption, id }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => HandleChange("icon", IconOption)}
                    title={label}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      formProps.icon === IconOption
                        ? "border-purple-500 bg-purple-500/20 text-purple-400"
                        : "border-white/10 bg-white/5 text-gray-400"
                    }`}
                  >
                    <IconOption className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={close}
              className="flex-1 py-3.5 rounded-xl bg-white/5 text-gray-500 font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={HandleSave}
              className="cursor-pointer flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold shadow-lg shadow-purple-600/20"
            >
              Salvar Transação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
