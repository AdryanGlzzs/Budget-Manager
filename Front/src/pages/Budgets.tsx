import {
  Plus,
  Target,
  TrendingUp,
  Coffee,
  AlertCircle,
  Edit,
  Trash2,
  Search,
  MinusCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import BudgetModal, { iconOptions } from "../components/BudgetModal";
import type { BudgetsProps } from "../../src/components/BudgetModal";
import { DeductModal, } from "../components/deductModal";
import type { PropsModalDeduct } from '../components/deductModal'

const Budgets = () => {
  const [open, setOpen] = useState(false);
  
  const [deductModalOpen, setDeductModalOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [selected, setSelected] = useState<BudgetsProps | null>(null);
  const [editingBudget, setEditingBudget] = useState<BudgetsProps | null>(null);

  const [budgets, setBudgets] = useState<BudgetsProps[]>([
    {
      name: "Alimentação",
      icon: AlertCircle,
      color: "#6366F1",
      description: '',
      period: '',
      spent: 450,
      limit: 600,
    },
  ]);






  const HandleSaveBudget = (newBudget: BudgetsProps) => {

  };

  const HandleSaveDeduct = (data: PropsModalDeduct) => {

  };



  const handleRemove = (id: string) => {


  };



  const handleEdit = (budget: BudgetsProps) => {
    setEditingBudget(budget);
    setBudgetOpen(true);
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
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <div className="pb-20">
          <Header />
        </div>

        <div className="flex">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 w-full p-4 sm:p-6 md:p-8 max-w-[1400px] overflow-x-hidden">
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
                className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] md:text-[15px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02] w-full sm:w-auto flex-shrink-0"
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
                <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-5 md:p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
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
                <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-5 md:p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
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
                <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/10 p-5 md:p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-4 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
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

                {FilterBudgets.length === 0 && (
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
