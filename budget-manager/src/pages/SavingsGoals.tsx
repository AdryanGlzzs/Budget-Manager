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
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

const SavingsGoals = () => {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 15000,
      current: 8500,
      color: "purple",
      icon: ShieldCheck,
      deadline: "Dec 2026",
    },
    {
      id: 2,
      name: "New Car",
      target: 45000,
      current: 12000,
      color: "cyan",
      icon: Car,
      deadline: "Aug 2027",
    },
    {
      id: 3,
      name: "Dream Vacation",
      target: 8000,
      current: 3200,
      color: "pink",
      icon: Plane,
      deadline: "Jul 2026",
    },
    {
      id: 4,
      name: "Home Down Payment",
      target: 100000,
      current: 25000,
      color: "green",
      icon: PiggyBank,
      deadline: "Jan 2030",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="pb-0">
        <Header />
      </div>

      <div className="z-20 pr-60">
        <Sidebar currentPage="savings-goals"/>
      </div>

      <main className="flex-1 p-8 max-w-[1400px] relative z-10 overflow-y-auto h-screen mt-15">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-bold mb-2">Metas de Economia</h1>
            <p className="text-gray-400 text-[15px]">
              Visualize e gerencie seus objetivos financeiros de longo prazo.
            </p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-5 py-3 rounded-xl text-[14px] font-semibold shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all hover:scale-[1.02] flex items-center gap-2">
            <Plus className="w-4 h-4" />
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
                  <h3 className="text-[24px] font-bold">$48,700.00</h3>
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
                  <h3 className="text-[24px] font-bold">4 Metas</h3>
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
                  <h3 className="text-[24px] font-bold">35%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <h2 className="text-[20px] font-semibold mb-6">Suas Metas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percent = Math.round((goal.current / goal.target) * 100);
            const Icon = goal.icon;

            // Helper for dynamic colors
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

            const colors = getColorClasses(goal.color);

            return (
              <div key={goal.id} className="relative group cursor-pointer">
                <div
                  className={`absolute inset-0 bg-${goal.color}-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300`}
                ></div>
                <div className="relative bg-[#0a0a14]/60 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:translate-y-[-4px]">
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow}`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded-lg text-[12px] text-gray-400 border border-white/5">
                      {goal.deadline}
                    </div>
                  </div>

                  <h3 className="text-[18px] font-bold mb-2">{goal.name}</h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-[24px] font-bold ${colors.text}`}>
                      ${goal.current.toLocaleString()}
                    </span>
                    <span className="text-[14px] text-gray-500">
                      de ${goal.target.toLocaleString()}
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

          {/* Add New Goal Card */}
          <button className="group relative h-full min-h-[280px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-purple-500/50 hover:bg-white/[0.02] transition-all">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-purple-500/20">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </div>
            <span className="text-gray-400 font-medium group-hover:text-purple-400 transition-colors">
              Criar Nova Meta
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SavingsGoals;
