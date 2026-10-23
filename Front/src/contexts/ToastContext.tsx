import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "info" | "error" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Container Global de Toasts */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          const typeStyles = {
            success: {
              bg: "bg-emerald-950/90 border-emerald-500/30 text-emerald-200 shadow-emerald-950/50",
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
            },
            error: {
              bg: "bg-rose-950/90 border-rose-500/30 text-rose-200 shadow-rose-900/50",
              icon: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
            },
            warning: {
              bg: "bg-amber-950/90 border-amber-500/30 text-amber-200 shadow-amber-900/50",
              icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
            },
            info: {
              bg: "bg-blue-950/90 border-blue-500/30 text-blue-200 shadow-blue-900/50",
              icon: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
            },
          }[toast.type] || {
            bg: "bg-zinc-900/90 border-zinc-700/30 text-zinc-200 shadow-black/50",
            icon: <Info className="w-4 h-4 text-zinc-400 shrink-0" />,
          };

          return (
            <div
              key={toast.id}
              className={`
                p-4 rounded-xl border shadow-xl
                flex items-center gap-3
                backdrop-blur-md
                transition-all duration-300
                pointer-events-auto
                animate-in fade-in slide-in-from-bottom-3
                ${typeStyles.bg}
              `}
            >
              {typeStyles.icon}
              <div className="flex-1 text-xs font-semibold leading-relaxed">{toast.message}</div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastContextProvider");
  }
  return context;
};
