import { X, Utensils, ChevronDown, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import type { BudgetsProps } from "./BudgetModal";

type PaymentCategory = "debito" | "credito" | "dinheiro" | "pix";
type CategoryType = "Alimentação" | "Lazer" | "Saúde" | "Transporte";
type ValueChange = number;

export interface DeductModalProps {
  isOpen: boolean;
  close: () => void;
  selectedBudget: BudgetsProps | null;
}

interface PropsModalDeduct {
  id: number;
  value: ValueChange;
  paymentType: PaymentCategory;
  description: string;
  category: CategoryType;
  datestring: string;
}

export const DeductModal = ({
  isOpen,
  close,
  selectedBudget,
}: DeductModalProps) => {
  const [value, setValue] = useState<ValueChange>(0);
  const [formDeduct, setFormDeduct] = useState<PropsModalDeduct>({
    id: selectedBudget?.id ?? 0,
    value: 0,
    category: "Alimentação",
    datestring: "",
    description: "",
    paymentType: "credito",
  });

  const AvailableBudget =
    (selectedBudget?.limit ?? 0) - (selectedBudget?.spent ?? 0);

  const HandleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value) || 0);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-[460px] bg-[#0c0c1e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl text-white font-sans">
        <div className="p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[22px] font-bold tracking-wide">
                Registrar gasto
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Deduza um valor do orçamento selecionado
              </p>
            </div>
            <button
              onClick={close}
              className="p-1 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[15px]">
                    {selectedBudget?.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    R${" "}
                    <span className="text-purple-400 font-medium">
                      {selectedBudget?.spent}{" "}
                    </span>
                    de R$ {selectedBudget?.limit},00 gastos
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-500 uppercase font-medium tracking-wider">
                  disponível
                </p>
                <p className="text-base font-bold text-indigo-400">R$ 150.00</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Valor *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500 text-sm font-medium">
                    R$
                  </span>
                  <input
                    onChange={HandleChangeValue}
                    type="number"
                    defaultValue={0}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 font-bold text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Tipo de pagamento
                </label>
                <div className="relative">
                  <select
                    value={formDeduct.paymentType}
                    defaultValue="Débito"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 appearance-none text-white font-medium focus:outline-none transition-colors"
                  >
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Pix">Pix</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                  <ChevronDown className="absolute right-4 t  op-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                Descrição <span className="text-gray-500">(opcional)</span>
              </label>
              <input
                type="text"
                defaultValue="Supermercado"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Data
                </label>
                <input
                  type="date"
                  defaultValue="2025-05-29"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Categoria
                </label>
                <div className="relative">
                  <select
                    value={formDeduct.category}
                    defaultValue="Alimentação"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 appearance-none text-white font-medium focus:outline-none transition-colors"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Transporte">Transporte</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500 uppercase font-medium tracking-wider mb-1">
                A deduzir
              </p>
              <p className="text-xl font-bold text-red-400">– R$ {value}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600" />
            <div className="text-right">
              <p className="text-[11px] text-gray-500 uppercase font-medium tracking-wider mb-1">
                Novo total gasto
              </p>
              <p className="text-base font-bold text-gray-300">
                R$ {((selectedBudget?.spent ?? 0) + value).toFixed(2)}
                <span className="text-gray-600 text-sm font-normal">
                  {" "}
                  / R$ {selectedBudget?.limit}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => console.log("clicado")}
              type="button"
              className="flex-[2] py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-lg shadow-red-900/20"
            >
              Deduzir valor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
