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
import { DeductModal, } from "../components/deductModal";
import type { PropsModalDeduct } from '../components/deductModal'
import { api } from "../services/api";

const Budgets = () => {
  const [open, setOpen] = useState(false);

  const [deductModalOpen, setDeductModalOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selected, setSelected] = useState<BudgetsProps | null>(null);
  const [editingBudget, setEditingBudget] = useState<BudgetsProps | null>(null);


  const [budgets, setBudgets] = useState<BudgetsProps[]>([]);

  const getBudgets = async () => {
    try {
      const response = await api.get('/budgets')

      if (!response) {
        throw new Error("Falha ao buscar os dados do servidor")
      }

      setBudgets(response.data.data)

      console.log(response)
    } catch (error) {

    }
  }

  useEffect(() => {
    getBudgets()
  }, [])



  const HandleSaveBudget = (newBudget: BudgetsProps) => {
    getBudgets()
  };

  const HandleSaveDeduct = (data: PropsModalDeduct) => {

  };



  const handleRemove = async (id: string) => {
    try {
      const removeBudget = await api.delete(`/budgets/delete/${id}`)
      console.log(removeBudget)

      getBudgets()
    } catch (error) {
      console.log(error)
    }
  };



  const handleEdit = (budget: BudgetsProps) => {

    setEditingBudget(budget);
    setBudgetOpen(true);

    console.log("=== EDITAR BUDGET ===");
    console.log("Budget recebido:", budget);
    console.log("ID recebido:", budget.id);
  };

  const handleClose = () => {
    setBudgetOpen(false);
    setEditingBudget(null);
  };

  const FilterBudgets = budgets;

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalPercentage =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;


  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-50 -top-50 w-150 h-150 bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute -right-50 -top-50 w-150 h-150 bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute -left-50 -bottom-50 w-150 h-150 bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute -right-50 -bottom-50 w-150 h-150 bg-purple-600/30 rounded-full blur-[120px]"></div>
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
                  Gerenciador de Orçamento
                </h1>
                <p className="text-[14px] md:text-[16px] text-gray-400">
                  Crie e acompanhe orçamentos para diferentes categorias de
                  gastos
                </p>
              </div>

              <button
                className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 bg-linear-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] md:text-[15px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02] w-full sm:w-auto shrink-0"
                onClick={() => {
                  setEditingBudget(null);
                  setBudgetOpen(true);
                }}
              >
                <Plus className="w-5 h-5" />
                Criar Orçamento
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-linear-to-br from-purple-600/20 to-purple-800/10 p-5 md:p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      Orçamento Total
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    R${totalBudget.toLocaleString()}
                  </div>
                  <div className="text-[12px] md:text-[13px] text-gray-400">
                    Em todas as categorias
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-linear-to-br from-cyan-600/20 to-cyan-800/10 p-5 md:p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      Total Gasto
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    R${totalSpent.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[12px] md:text-[13px] text-cyan-400">
                      {totalPercentage}% do orçamento
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-green-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-linear-to-br from-green-600/20 to-green-800/10 p-5 md:p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    </div>
                    <div className="text-[13px] md:text-[14px] text-gray-400">
                      Restante
                    </div>
                  </div>
                  <div className="text-[28px] md:text-[36px] font-bold mb-1 md:mb-2">
                    R${(totalBudget - totalSpent).toLocaleString()}
                  </div>
                  <div className="text-[12px] md:text-[13px] text-green-400">
                    {100 - totalPercentage}% disponível
                  </div>
                </div>
              </div>
            </div>



            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-linear-to-br from-white/10 to-white/2 p-4 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-6">
                  <h2 className="text-[18px] md:text-[20px] font-semibold">
                    Categorias de Orçamento
                  </h2>
                  <select
                    defaultValue="Este Mês"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[13px] focus:outline-none backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <option>Este Mês</option>
                    <option>Mês Passado</option>
                    <option>Este Ano</option>
                  </select>
                </div>

                {FilterBudgets.length === 0 ? (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="text-[18px] font-semibold mb-2">
                      Nenhum orçamento encontrado
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Tente ajustar seus filtros
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
                                className={`text-[22px] md:text-[28px] font-bold ${isOverBudget ? "text-red-400" : "text-white"
                                  }`}
                              >
                                R${item.spent}
                              </span>
                              <span className="text-[14px] md:text-[16px] text-gray-500">
                                de R${item.limit}
                              </span>
                              <span
                                className={`text-[13px] md:text-[14px] ml-auto font-medium ${isOverBudget
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
                                className={`h-full rounded-full shadow-lg transition-all ${isOverBudget
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
                              R$
                              {item.limit - item.spent > 0
                                ? item.limit - item.spent
                                : 0}{" "}
                              restante
                              {isOverBudget && (
                                <span className="text-red-400 ml-2">
                                  • R${item.spent - item.limit} acima do
                                  orçamento
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
