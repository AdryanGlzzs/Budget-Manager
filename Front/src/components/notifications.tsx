import { themes } from "../themes/themes";
import { useState } from "react";
import { Save } from "lucide-react";

export const Notifications = () => {
  const [accentColor, setAccentColor] = useState<
    "purple" | "blue" | "emerald" | "pink"
  >("purple");

  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "info" | "error" }[]
  >([]);

  const initialNotifications = [
    {
      key: "transactions",
      title: "Transações",
      description: "Receba notificações para cada transação realizada",
      enabled: true,
    },
    {
      key: "budgetAlerts",
      title: "Alertas de Orçamento",
      description: "Alertas ao se aproximar dos limites do seu orçamento",
      enabled: true,
    },
    {
      key: "savingsGoals",
      title: "Metas de Economia",
      description: "Atualizações sobre o progresso das suas economias",
      enabled: true,
    },
    {
      key: "monthlyReports",
      title: "Relatórios Mensais",
      description: "Relatórios mensais detalhados do seu resumo financeiro",
      enabled: false,
    },
    {
      key: "marketing",
      title: "Novidades e Produto",
      description: "Notícias, dicas e atualizações de novos recursos",
      enabled: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const theme = themes[accentColor];

  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;

  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";

  const secondaryBtn =
    "px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white text-zinc-200 active:scale-[0.98] transition-all cursor-pointer";

  const dangerBtn =
    "px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium active:scale-[0.98] transition-all cursor-pointer";

  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;

  const showToast = (
    message: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000,
    );
  };
  const toggleNotification = (key: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.key === key ? { ...n, enabled: !n.enabled } : n)),
    );
    const item = notifications.find((n) => n.key === key);
    if (item) {
      showToast(
        `${item.title} ${!item.enabled ? "ativado" : "desativado"}.`,
        "info",
      );
    }
  };

  return (
    <section className="relative group">
      <div className={cardGlow} />
      <div className={cardBase}>
        <h2 className="text-lg font-bold tracking-tight mb-6">
          Preferências de Notificação
        </h2>
        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-5 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/10 transition-all gap-4"
            >
              <div>
                <div className="text-sm font-semibold text-zinc-200 mb-0.5">
                  {item.title}
                </div>
                <div className="text-xs text-zinc-400">{item.description}</div>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification(item.key)}
                className={`relative w-14 h-7 rounded-full shrink-0 transition-all active:scale-95 cursor-pointer ${item.enabled ? `bg-gradient-to-r ${theme.primary} shadow-lg ${theme.shadow}` : "bg-white/10"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${item.enabled ? "translate-x-7" : ""}`}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 border-t border-white/5 pt-5">
          <button
            onClick={() =>
              showToast("Preferências de notificação salvas!", "success")
            }
            className={primaryBtn}
          >
            <Save className="w-4 h-4" /> Salvar Preferências
          </button>
        </div>
      </div>
    </section>
  );
};
