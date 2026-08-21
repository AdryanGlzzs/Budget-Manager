import {
  X,
  Check,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";

type SavingsGoalsModalProps = {
  IsOpen: boolean;
  OnClose: () => void;
  OnSave: (GoalsProps: Goalsprops) => void
  EditingGoals?: Goalsprops | null
};


export interface Goalsprops {
  id: string;
  name: string;
  target: number;
  current: number;
  color: string;
  deadline: string;
}


const colors = [
  "#6366F1",
  "#06B6D4",
  "#10B981",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#F97316",
];

export const SavingsGoalsModal = ({
  IsOpen,
  OnClose,
  OnSave,
  EditingGoals
}: SavingsGoalsModalProps) => {
  const [GoalsProps, setGoalsProps] = useState<Goalsprops>({
    id: "",
    name: "",
    target: 0,
    current: 0,
    color: "",
    deadline: "",
  });

  useEffect(() => {
    if (EditingGoals) {
      setGoalsProps(EditingGoals);
    } else {
      setGoalsProps({
        id: "",
        name: "",
        target: 0,
        current: 0,
        color: "#10b981",
        deadline: "",
      });
    }
  }, [EditingGoals, IsOpen]);

  const IsEditing = Boolean(EditingGoals)

  const HandleChangeGoals = (field: keyof Goalsprops, value: any) => {
    setGoalsProps((prev) => ({ ...prev, [field]: value }));
  };

  const HandleSubmit = () => {
    OnSave({ ...GoalsProps })
    console.log(OnSave)
    OnClose()
  }

  if (!IsOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-[#0a0a18] border border-white/10 rounded-2xl p-7 w-full max-w-[480px] mx-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">
              {IsEditing ? "Editar Meta" : "Nova meta"}
            </p>
            <h2 className="text-[18px] font-semibold text-white">
              {IsEditing ? "Editar objetivo financeiro" : "Criar objetivo financeiro"}
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
            onChange={(e) => HandleChangeGoals("name", e.target.value || "")}
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
              onChange={(e) =>
                HandleChangeGoals("target", e.target.value || "")
              }
              value={GoalsProps.target === 0 ? "" : GoalsProps.target}
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
              value={GoalsProps.current === 0 ? "" : GoalsProps.current}
              onChange={(e) =>
                HandleChangeGoals("current", e.target.value || "")
              }
              type="text"
              placeholder="0,00"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/85 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="text-[12px] text-white/45 block mb-2">Prazo da Meta</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
            <input
              onChange={(e) => HandleChangeGoals("deadline", e.target.value)}
              value={GoalsProps.deadline}
              type="date"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-[14px] text-white/85 outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>



        <div className="mb-7">
          <label className="text-[12px] text-white/45 block mb-3">
            Cor da meta
          </label>
          <div className="flex gap-3">
            {colors.map((color) => {
              const isSelected = GoalsProps.color === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => HandleChangeGoals("color", color)}
                  className="w-7 h-7 rounded-full hover:scale-110 transition-all border-2 flex items-center justify-center"
                  style={{
                    background: color,
                    borderColor: isSelected ? "white" : "transparent",
                  }}
                >
                  {isSelected && (
                    <Check className="w-3 text-white" strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => OnClose()}
            className="flex-1 py-3 bg-transparent border border-white/10 rounded-xl text-[14px] text-white/50 hover:text-white/70 hover:border-white/20 transition-all"
          >
            Cancelar
          </button>
          <button className="flex-[2] py-3 bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl text-[14px] font-semibold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 hover:scale-[1.02] transition-all"
            onClick={() => HandleSubmit()}
          >
            Criar Meta
          </button>
        </div>
      </div>
    </div>
  );
};
