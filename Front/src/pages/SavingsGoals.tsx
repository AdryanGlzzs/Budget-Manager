import {
  Wallet,
  Target,
  TrendingUp,
  Plus,
  ArrowRight,
  PiggyBank,
  ShieldCheck,
  Plane,
  Car,
  Trash2,
  Search,
  Goal,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { SavingsGoalsModal } from "../components/SavingGoalsModal";
import type { Goalsprops, } from "../components/SavingGoalsModal";
import { api } from "../services/api";

const SavingsGoals = () => {
  const [SavingModal, setSavingModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [Goals, setGoals] = useState<Goalsprops[]>([]);


  const HandleRemoveGoals = (id: number) => {

    setGoals((prev) => prev.filter((goals) => goals.id !== id));
  };

  const HandleSaveGoals = async (newGoals: Goalsprops) => {

    const response = await api.post('/savings-goals', newGoals)

    console.log("Meta Criada", {
      id: newGoals.id,
      name: newGoals.name,
      target: newGoals.target,
      current: newGoals.current,
      color: newGoals.color,
      deadline: newGoals.deadline
    })

    console.log(response)

    setGoals((prev) => {
      return [...prev, newGoals]
    })
  };

  const GoalsLength = Goals;

  return (
    <div className="flex min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="pb-0">
        <Header />
      </div>

      <div className="z-20 lg:pr-60">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      <main className="flex-1 p-8 max-w-[1400px] relative z-10 overflow-y-auto h-screen mt-15">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-bold mb-2">Metas de Economia</h1>
            <p className="text-gray-400 text-[15px] w-[80%]">
              Visualize e gerencie seus objetivos financeiros de longo prazo.
            </p>


          </div>
          <button
            onClick={() => setSavingModal(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-5 py-3 rounded-xl text-[14px] font-semibold shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Meta
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">Total Economizado</p>
                  <h3 className="text-[24px] font-bold">R$ {Goals.reduce((total, goal) => total + goal.current, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">Metas Ativas</p>
                  <h3 className="text-[24px] font-bold">{Goals.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-400">Progresso Médio</p>
                  <h3 className="text-[24px] font-bold">{Goals.length > 0 ? Math.round(Goals.reduce((a, e) => a + (e.current / e.target) * 100, 0) / Goals.length) : 0} %</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-[20px] font-semibold mb-6">Suas Metas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Goals.map((Goal) => {
            const percent = Math.round((Goal.current / Goal.target) * 100);


            const getColorClasses = (color: string) => {
              switch (color) {
                case "purple":
                  return {
                    bg: "bg-purple-500/20",
                    text: "text-purple-400",
                    shadow: "shadow-purple-500/20",
                    barFrom: "from-purple-600",
                    barTo: "to-purple-500",
                    barShadow: "shadow-purple-600/50",
                  };
                case "cyan":
                  return {
                    bg: "bg-cyan-500/20",
                    text: "text-cyan-400",
                    shadow: "shadow-cyan-500/20",
                    barFrom: "from-cyan-600",
                    barTo: "to-cyan-500",
                    barShadow: "shadow-cyan-600/50",
                  };
                case "pink":
                  return {
                    bg: "bg-pink-500/20",
                    text: "text-pink-400",
                    shadow: "shadow-pink-500/20",
                    barFrom: "from-pink-600",
                    barTo: "to-pink-500",
                    barShadow: "shadow-pink-600/50",
                  };
                case "green":
                  return {
                    bg: "bg-green-500/20",
                    text: "text-green-400",
                    shadow: "shadow-green-500/20",
                    barFrom: "from-green-600",
                    barTo: "to-green-500",
                    barShadow: "shadow-green-600/50",
                  };
                default:
                  return {
                    bg: "bg-purple-500/20",
                    text: "text-purple-400",
                    shadow: "shadow-purple-500/20",
                    barFrom: "from-purple-600",
                    barTo: "to-purple-500",
                    barShadow: "shadow-purple-600/50",
                  };
              }
            };

            const colors = getColorClasses(Goal.color);

            return (
              <div key={Goal.id} className="relative group cursor-pointer">
                <div
                  className={`absolute inset-0 bg-${Goal.color}-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
                ></div>

                <div className="relative bg-[#0a0a14]/60 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:translate-y-[-4px]">
                  <button
                    className="absolute top -4 right-4 p-2 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                    title="Remover meta"
                    onClick={() => HandleRemoveGoals(Goal.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <h3 className="text-[18px] font-bold mb-2">{Goal.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-[24px] font-bold ${colors.text}`}>
                      ${Goal.current.toLocaleString()}
                    </span>
                    <span className="text-[14px] text-gray-500">
                      de ${Goal.target.toLocaleString()}
                    </span>

                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-400">Progresso</span>
                      <span className="font-semibold text-white">
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${colors.barFrom} ${colors.barTo} h-full rounded-full shadow-lg ${colors.barShadow} transition-all duration-1000 ease-out`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                    <button className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors group/btn">
                      Ver Detalhes
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {GoalsLength.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <div className="text-[18px] font-semibold mb-2">
              Nenhuma meta encontrada
            </div>
            <div className="text-[14px] text-gray-500">
              Tente ajustar seus filtros
            </div>
          </div>
        )}
      </main>

      <SavingsGoalsModal
        IsOpen={SavingModal}
        OnClose={() => setSavingModal(false)}
        OnSave={HandleSaveGoals}
      />
    </div>
  );
};

export default SavingsGoals;
