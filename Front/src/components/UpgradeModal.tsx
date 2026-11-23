import React, { useEffect } from "react";
import { X, Crown, Sparkles, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  featureName?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  title = "Desbloqueie Todo o Potencial",
  description = "Este recurso ou limite é exclusivo para os planos Pro e Business. Faça upgrade para ter acesso ilimitado!",
  featureName,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUpgradeClick = () => {
    onClose();
    navigate("/pricing");
  };

  const proPerks = [
    "Orçamentos e Metas de economia ilimitados",
    "Exportação completa de dados (CSV e PDF)",
    "Relatórios avançados & AI Insights",
    "Suporte prioritário 24/7",
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0a0a14] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 text-white backdrop-blur-xl overflow-hidden">
        
        {/* Glow de fundo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícone e Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/40">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-yellow-400 text-black rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h3>

          {featureName && (
            <span className="mt-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Recurso Pro: {featureName}
            </span>
          )}

          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Lista de Vantagens Pro */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 space-y-2.5">
          <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
            No plano Pro você ganha:
          </p>
          {proPerks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
              <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <button
            onClick={handleUpgradeClick}
            className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver Planos & Fazer Upgrade</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer text-center"
          >
            Talvez depois
          </button>
        </div>

      </div>
    </div>
  );
};

export default UpgradeModal;
