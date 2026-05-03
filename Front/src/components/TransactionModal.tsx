import { X, TrendingDown, TrendingUp, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

type TransactionModalProps = {
  Isopen: boolean;
  close: () => void;
};

interface TransactionProps {
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

export const TransactionModal = ({ Isopen, close }: TransactionModalProps) => {
const [formProps, setFormProps] = useState<TransactionProps>({
    id: 1,
    name: "Misera",
    category: "Caraio",
    dateString: "Hoje",
    amount: 10,
    icon: Coffee,
    color: "Azul",
    type: "expense",
    status: true,
  });  

  const HandleChange = (field: keyof TransactionProps, value: any) => {
    setFormProps((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HandleTeste = () => {
    let teste = formProps;
    console.log(teste);
  };

  if (!Isopen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-[460px] bg-[#0a0a1a] border border-white/10 rounded-3xl overflow-hidden">
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-600/20 rounded-full blur-[55px] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-800/14 rounded-full blur-[55px] pointer-events-none" />

        <div className="relative p-7">
          <div className="flex items-start justify-between mb-7">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[21px] font-bold text-white">
                  Nova Transação
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 ${
                    formProps.type === "revenue"
                      ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${formProps.type == "revenue"
                    ? " bg-emerald-400 shadow-sm"
                    :  "bg-red-400"
                  }`} />
                  <span
                    className={`text-[11px] font-semibold ${
                      formProps.type == "revenue"
                        ? " text-emerald-400 shadow-sm"
                        : " text-red-400"
                    }`}
                  >
                    {formProps.type == "revenue" ? "Receita" : "Despesa"}
                  </span>
                </span>
              </div>
              <p className="text-[13px] text-gray-500">
                Preencha os detalhes abaixo
              </p>
            </div>
            <button
              onClick={close}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-5">
            <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
              Descrição
            </label>
            <input
              value={formProps.name}
              type="text"
              onChange={(e) => HandleChange("name", e.target.value)}
              placeholder="Ex: Assinatura Netflix"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] placeholder:text-gray-700 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Valor
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[14px] pointer-events-none">
                  R$
                </span>
                <input
                  value={formProps.amount}
                  onChange={(e) => HandleChange("amount", e.target.value)}
                  type="number"
                  placeholder="0,00"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-[14px] focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Tipo
              </label>
              <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
                <button
                  onClick={() => HandleChange("type", "expense")}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200
      ${
        formProps.type === "expense"
          ? "bg-red-500/20 text-red-400 shadow-sm"
          : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
      }`}
                >
                  <TrendingDown className="w-3.5 h-3.5" />
                  Despesa
                </button>
                <button
                  onClick={() => HandleChange("type", "revenue")}
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200
      ${
        formProps.type === "revenue"
          ? "bg-emerald-500/20 text-emerald-400 shadow-sm"
          : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
      }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Receita
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-1">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Categoria
              </label>
              <select
                onChange={(e) => HandleChange("category", e.target.value)}
                value={formProps.category}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-purple-500/50 appearance-none transition-colors"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Saúde</option>
                <option>Transporte</option>
                <option>Moradia</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Data
              </label>
              <input
                type="date"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] focus:outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="border-t border-white/[0.06] my-5" />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 font-semibold text-[14px] hover:bg-white/10 hover:text-white transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={HandleTeste}
              type="button"
              className="flex-[2] px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold text-[14px] hover:shadow-lg hover:shadow-purple-600/40 transition-all active:scale-[0.98]"
            >
              Salvar Transação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
