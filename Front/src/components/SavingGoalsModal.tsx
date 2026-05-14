import {
  ShieldCheck,
  Car,
  Plane,
  PiggyBank,
  X,
  type LucideIcon,
  Coffee,
} from "lucide-react";
import { useState } from "react";

type SavingsGoalsModalProps = {
  IsOpen: boolean;
  OnClose: () => void;
};

export interface GoalsProps {
  id: number;
  name: string;
  target: number;
  current: number;
  color: string;
  icon: LucideIcon;
  deadline: string;
}

export const SavingsGoalsModal = ({
  IsOpen,
  OnClose,
}: SavingsGoalsModalProps) => {
  const [GoalsProps, setGoalsProps] = useState<GoalsProps>({
    id: Math.floor(Math.random() * 1000),
    name: "",
    target: 0,
    current: 0,
    color: "",
    icon: Coffee,
    deadline: "",
  });

  if (!IsOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-500">
      <div className="bg-[#0a0a18] border border-white/10 rounded-2xl p-7 w-full max-w-[480px] mx-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
              Nova meta
            </p>
            <h2 className="text-[18px] font-semibold text-white">
              Criar objetivo financeiro
            </h2>
          </div>
          <button
            onClick={() => OnClose()}
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-5">
          <label className="text-[12px] text-white/45 block mb-2">
            Nome da meta
          </label>
          <input
            value={GoalsProps.name}
            
            type="text"
            placeholder="Ex: Fundo de emergência"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-[12px] text-white/45 block mb-2">
              Valor alvo (R$)
            </label>
            <input
              type="text"
              placeholder="0,00"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <div>
            <label className="text-[12px] text-white/45 block mb-2">
              Valor inicial (R$)
            </label>
            <input
              type="text"
              placeholder="0,00"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-[12px] text-white/45 block mb-2">Prazo</label>
          <input
            type="text"
            placeholder="Ex: Dez 2026"
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
          />
        </div>

        <div className="mb-5">
          <label className="text-[12px] text-white/45 block mb-3">
            Ícone da meta
          </label>
          <div className="flex gap-3">
            {[
              { icon: ShieldCheck, active: true },
              { icon: Car, active: false },
              { icon: Plane, active: false },
              { icon: PiggyBank, active: false },
            ].map(({ icon: Icon, active }, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  active
                    ? "bg-purple-500/25 border-2 border-purple-500/60"
                    : "bg-white/[0.04] border border-white/10"
                }`}
              >
                <Icon
                  className={`w-[18px] h-[18px] ${active ? "text-purple-400" : "text-white/40"}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-7">
          <label className="text-[12px] text-white/45 block mb-3">
            Cor da meta
          </label>
          <div className="flex gap-3">
            {[
              { hex: "#8b5cf6", active: true },
              { hex: "#06b6d4", active: false },
              { hex: "#ec4899", active: false },
              { hex: "#22c55e", active: false },
              { hex: "#f59e0b", active: false },
            ].map(({ hex, active }, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full cursor-pointer transition-all"
                style={{
                  backgroundColor: hex,
                  opacity: active ? 1 : 0.5,
                  outline: active ? `2px solid white` : "none",
                  outlineOffset: "2px",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => OnClose()}
            className="flex-1 py-3 bg-transparent border border-white/10 rounded-xl text-[14px] text-white/50 hover:text-white/70 hover:border-white/20 transition-all"
          >
            Cancelar
          </button>
          <button className="flex-[2] py-3 bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl text-[14px] font-semibold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 hover:scale-[1.02] transition-all">
            Criar Meta
          </button>
        </div>
      </div>
    </div>
  );
};
