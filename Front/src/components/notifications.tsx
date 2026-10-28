import { themes } from "../themes/themes";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useThemeColors } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { api } from "../services/api";

interface NotificationItem {
  key: string;
  title: string;
  description: string;
  enabled: boolean;
}

export const Notifications = () => {
  const { accentColor } = useThemeColors();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
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
  ]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/users/notifications/preferences");
        if (response.data) {
          const data = response.data;
          setNotifications((prev) =>
            prev.map((item) => ({
              ...item,
              enabled:
                typeof data[item.key] === "boolean"
                  ? data[item.key]
                  : item.enabled,
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao carregar preferências de notificação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const theme = themes[accentColor];

  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;

  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";

  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`;

  const toggleNotification = (key: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.key === key ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = notifications.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.enabled }),
        {}
      );

      await api.put("/users/notifications/preferences", payload);
      showToast("Preferências de notificação salvas com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      showToast("Erro ao salvar preferências. Tente novamente.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative group">
      <div className={cardGlow} />
      <div className={cardBase}>
        <h2 className="text-lg font-bold tracking-tight mb-6">
          Preferências de Notificação
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-zinc-400 gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Carregando preferências...</span>
          </div>
        ) : (
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
                  className={`relative w-14 h-7 rounded-full shrink-0 transition-all active:scale-95 cursor-pointer ${
                    item.enabled
                      ? `bg-gradient-to-r ${theme.primary} shadow-lg ${theme.shadow}`
                      : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      item.enabled ? "translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6 border-t border-white/5 pt-5">
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className={primaryBtn}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Salvar Preferências
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
