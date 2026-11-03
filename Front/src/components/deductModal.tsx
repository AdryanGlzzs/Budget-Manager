import { X, Utensils, ChevronDown, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { BudgetsProps } from "./BudgetModal";
import { formatCurrency } from "../utils/formatCurrency";

type PaymentCategory = "debito" | "credito" | "dinheiro" | "pix";
type CategoryType = "Alimentação" | "Lazer" | "Saúde" | "Transporte";

export interface DeductModalProps {
  isOpen: boolean;
  close: () => void;
  selectedBudget: BudgetsProps | null;
  saveDeduct: (data: PropsModalDeduct) => void;
}

export interface PropsModalDeduct {
  value: number;
  paymentType: PaymentCategory;
  description: string;
  category: CategoryType;
  datestring: string;
}

export const DeductModal = ({
  isOpen,
  close,
  selectedBudget,
  saveDeduct,
}: DeductModalProps) => {
  const [value, setValue] = useState<number>(0);
  const [formDeduct, setFormDeduct] = useState<{
    paymentType: PaymentCategory;
    description: string;
    category: CategoryType;
    datestring: string;
  }>({
    category: "Alimentação",
    datestring: new Date().toISOString().split("T")[0],
    description: "",
    paymentType: "credito",
  });

  useEffect(() => {
    if (isOpen) {
      setValue(0);
      setFormDeduct({
        category: (selectedBudget?.name as CategoryType) || "Alimentação",
        datestring: new Date().toISOString().split("T")[0],
        description: "",
        paymentType: "credito",
      });
    }
  }, [isOpen, selectedBudget]);

  if (!isOpen) return null;

  const currentSpent = Number(selectedBudget?.spent ?? 0);
  const budgetLimit = Number(selectedBudget?.limit ?? 0);
  const numValue = Number(value || 0);
  const totalWithNewValue = currentSpent + numValue;
  const remaining = Math.max(0, budgetLimit - currentSpent);
  const percentage = budgetLimit > 0 ? Math.min(100, Math.round((currentSpent / budgetLimit) * 100)) : 0;

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value) || 0;
    setValue(inputValue);
  };

  const handleConfirmDeduct = () => {
    if (!selectedBudget) return;

    if (numValue <= 0) {
      alert("Por favor, informe um valor maior que zero para deduzir.");
      return;
    }

    if (totalWithNewValue > budgetLimit) {
      const confirmExceed = window.confirm(
        "Atenção: esse valor ultrapassará o limite estipulado para esse orçamento! Deseja continuar mesmo assim?"
      );
      if (!confirmExceed) return;
    }

    const payload: PropsModalDeduct = {
      value: numValue,
      paymentType: formDeduct.paymentType,
      description: formDeduct.description,
      category: formDeduct.category,
      datestring: formDeduct.datestring,
    };

    saveDeduct(payload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-[460px] bg-[#0c0c1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white font-sans animate-in fade-in zoom-in-95 duration-200">
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
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${selectedBudget?.color || "#6366F1"}20`,
                    color: selectedBudget?.color || "#6366F1",
                  }}
                >
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[15px]">
                    {selectedBudget?.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    <span className="text-purple-400 font-medium">
                      {formatCurrency(currentSpent)}
                    </span>{" "}
                    de {formatCurrency(budgetLimit)} gastos
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-500 uppercase font-medium tracking-wider">
                  disponível
                </p>
                <p className="text-base font-bold text-indigo-400">
                  {formatCurrency(remaining)}
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: selectedBudget?.color || "#6366F1",
                }}
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
                    onChange={handleValueChange}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={value === 0 ? "" : value}
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
                    onChange={(e) =>
                      setFormDeduct((prev) => ({
                        ...prev,
                        paymentType: e.target.value as PaymentCategory,
                      }))
                    }
                    className="w-full bg-[#0c0c1e] border border-white/10 rounded-xl px-4 py-3 appearance-none text-white font-medium focus:outline-none transition-colors"
                  >
                    <option value="debito">Débito</option>
                    <option value="credito">Crédito</option>
                    <option value="pix">Pix</option>
                    <option value="dinheiro">Dinheiro</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                Descrição <span className="text-gray-500">(opcional)</span>
              </label>
              <input
                value={formDeduct.description}
                placeholder="Ex: Almoço de domingo"
                onChange={(e) =>
                  setFormDeduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                type="text"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Data
                </label>
                <input
                  value={formDeduct.datestring}
                  onChange={(e) =>
                    setFormDeduct((prev) => ({
                      ...prev,
                      datestring: e.target.value,
                    }))
                  }
                  type="date"
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
                    onChange={(e) =>
                      setFormDeduct((prev) => ({
                        ...prev,
                        category: e.target.value as CategoryType,
                      }))
                    }
                    className="w-full bg-[#0c0c1e] border border-white/10 rounded-xl px-4 py-3 appearance-none text-white font-medium focus:outline-none transition-colors"
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
              <p className="text-xl font-bold text-red-400">– {formatCurrency(numValue)}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600" />
            <div className="text-right">
              <p className="text-[11px] text-gray-500 uppercase font-medium tracking-wider mb-1">
                Novo total gasto
              </p>
              <p className="text-base font-bold text-gray-300">
                {formatCurrency(totalWithNewValue)}
                <span className="text-gray-600 text-sm font-normal">
                  {" "}
                  / {formatCurrency(budgetLimit)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={close}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDeduct}
              type="button"
              className="flex-[2] py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-lg shadow-red-900/20 cursor-pointer"
            >
              Deduzir valor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeductModal;