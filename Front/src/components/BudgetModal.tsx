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
} from "lucide-react";

type BudgetModalProps = {
  IsOpen: boolean;
  OnClose: () => void;
};

const iconOptions = [
  Coffee, Car, ShoppingBag, Zap,
  Home, Smartphone, Clapperboard, Dumbbell,
  Plane, Pill, BookOpen, PawPrint,
];

const colors = [
  "#6366F1", "#06B6D4", "#10B981", "#EF4444",
  "#F59E0B", "#8B5CF6", "#EC4899", "#F97316",
];

const BudgetModal = ({ IsOpen, OnClose }: BudgetModalProps) => {
  if (!IsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-lg bg-[#0a0a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px]" />

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Criar Orçamento</h2>
              <p className="text-gray-400 text-sm">Defina limites para controlar seus gastos</p>
            </div>
            <button
              onClick={OnClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nome da Categoria
              </label>
              <input
                type="text"
                placeholder="Ex: Alimentação, Lazer..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
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
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Período
                </label>
                <select className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none transition-colors">
                  <option>Este mês</option>
                  <option>Próximo mês</option>
                  <option>Trimestral</option>
                  <option>Anual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Ícone
              </label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="aspect-square rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all text-gray-300 hover:text-white"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cor
              </label>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-7 h-7 rounded-full hover:scale-110 transition-all border-2 border-transparent"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={OnClose}
                className="flex-1 px-6 py-3.5 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-[2] px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
              >
                Salvar Orçamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;