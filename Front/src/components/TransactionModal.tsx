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
import React, { useState } from "react";
import { api } from "../services/api";

type TransactionModalProps = {
  Isopen: boolean;
  close: () => void;
  onSave: (transaction: TransactionProps) => void;
};

export interface TransactionProps {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  color: string;
  type: "expense" | "revenue";
  status: boolean;
}

const initialForm: TransactionProps = {
  id: "",
  name: "",
  category: "Alimentação",
  date: new Date().toISOString().split("T")[0],
  amount: 0,
  color: "#6366F1",
  type: "expense",
  status: true,
};


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
  const [formProps, setFormProps] = useState<TransactionProps>(initialForm);


  const HandleChange = (field: keyof TransactionProps, value: any) => {
    setFormProps((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HandleSave = async () => {
    try {
      const dataTransaction = {
        name: formProps.name.trim(),
        category: formProps.category || "Geral",
        date: formProps.date || new Date().toISOString().split("T")[0],
        amount: Number(formProps.amount) || 0,
        color: formProps.color || "#6366F1",
        type: formProps.type || "expense",
        status: typeof formProps.status === "boolean" ? formProps.status : true,
      };

      const req = await api.post('/transactions', dataTransaction);

      console.log(req);

      onSave(req.data.data);

      setFormProps(initialForm);

      close();
    } catch (error) {
      console.log(error);
    }
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
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${formProps.type === "revenue"
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
                Nome
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
                  value={formProps.amount === 0 ? "" : formProps.amount}
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
                Categoria
              </label>
              <input
                type="text"
                value={formProps.category}
                onChange={(e) => HandleChange("category", e.target.value)}
                placeholder="Ex: Alimentação, Lazer..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={formProps.date}
                  onChange={(e) => HandleChange("date", e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase mb-2">
                  Status
                </label>
                <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => HandleChange("status", true)}
                    className={`flex-1 py-2 rounded-lg text-[12px] transition-colors ${formProps.status === true ? "bg-emerald-500/20 text-emerald-400 font-semibold" : "text-gray-500"}`}
                  >
                    Concluído
                  </button>
                  <button
                    type="button"
                    onClick={() => HandleChange("status", false)}
                    className={`flex-1 py-2 rounded-lg text-[12px] transition-colors ${formProps.status === false ? "bg-amber-500/20 text-amber-400 font-semibold" : "text-gray-500"}`}
                  >
                    Pendente
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
                    className={`w-8 h-8 rounded-full border-2 transition-all ${formProps.color === color.hex
                      ? "border-white scale-110"
                      : "border-transparent"
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
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