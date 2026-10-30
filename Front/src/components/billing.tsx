import { useState, useEffect, useCallback } from "react";
import { CreditCard, Download, Loader2, AlertCircle } from "lucide-react";
import { themes } from "../themes/themes";
import { useThemeColors } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

type AccentColor = "purple" | "blue" | "emerald" | "pink";

type ModalConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info";
  onConfirm: () => void;
};

type Invoice = {
  id: string;
  amount: number;
  status: string;
  date: string;
  pdfUrl?: string | null;
};

type Subscription = {
  id: string;
  plan: string;
  status: string;
  price: number;
  billingCycle: string;
  currentPeriodStart: string;
  currentPeriodEnd?: string | null;
  cardLastFour?: string | null;
  cardBrand?: string | null;
  invoices: Invoice[];
};

const PLAN_LABELS: Record<string, string> = {
  Free: "Gratuito",
  Pro: "Pro",
  Business: "Business",
};

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  active: {
    label: "Ativo",
    classes: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  cancelled: {
    label: "Cancelado",
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  pending: {
    label: "Pendente",
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
};

const INVOICE_STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  paid: {
    label: "Pago",
    classes: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  pending: {
    label: "Pendente",
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  failed: {
    label: "Falhou",
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export const Billing = () => {
  const { accentColor } = useThemeColors();
  const { showToast } = useToast();
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const theme = themes[accentColor as AccentColor] ?? themes.purple;

  const styles = {
    cardGlow: `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`,
    cardBase: `
      relative
      bg-gradient-to-br
      from-white/10
      to-white/[0.02]
      p-6 rounded-2xl
      border border-white/10
      backdrop-blur-sm shadow-xl
    `,
    primaryBtn: `
      px-4 py-2 rounded-lg
      text-sm font-semibold
      transition-all active:scale-[0.98]
      shadow-md text-white
      bg-gradient-to-r ${theme.primary}
      cursor-pointer
    `,
    secondaryBtn: `
      px-4 py-2
      bg-white/5
      border border-white/10
      rounded-lg
      text-sm font-medium
      text-zinc-200
      hover:bg-white/10
      hover:text-white
      transition-all
      active:scale-[0.98]
      cursor-pointer
    `,
    dangerBtn: `
      px-4 py-2
      text-red-400
      hover:bg-red-500/10
      rounded-lg
      text-sm font-medium
      active:scale-[0.98]
      transition-all
      cursor-pointer
    `,
  };

  // ── Load billing data ──────────────────────────────────────────────────────
  const fetchBilling = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Subscription>("/users/billing");
      setSubscription(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os dados de faturamento.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  // ── Confirm modal helper ───────────────────────────────────────────────────
  function confirmAction(config: Omit<ModalConfig, "isOpen">) {
    setModalConfig({ ...config, isOpen: true });
  }

  // ── Cancel subscription ────────────────────────────────────────────────────
  async function handleCancelSubscription() {
    setCancelling(true);
    try {
      await api.post("/users/billing/cancel");
      showToast("Assinatura cancelada com sucesso.", "success");
      await fetchBilling();
    } catch {
      showToast("Erro ao cancelar assinatura. Tente novamente.", "error");
    } finally {
      setCancelling(false);
      setModalConfig(null);
    }
  }

  // ── Download invoice ───────────────────────────────────────────────────────
  function handleDownloadInvoice(index: number, invoice: Invoice) {
    if (downloadingIndex !== null) return;
    setDownloadingIndex(index);

    setTimeout(() => {
      setDownloadingIndex(null);

      const dateLabel = formatDate(invoice.date);
      const amountLabel = formatCurrency(invoice.amount);
      const statusLabel = INVOICE_STATUS_LABELS[invoice.status]?.label ?? invoice.status;
      const planLabel = PLAN_LABELS[subscription?.plan ?? ""] ?? subscription?.plan ?? "";

      const content = `FATURA BUDGET MANAGER
========================================
Data:   ${dateLabel}
Valor:  ${amountLabel}
Status: ${statusLabel.toUpperCase()}
Plano:  ${planLabel}
ID:     ${invoice.id}
========================================
`;
      const dataStr =
        "data:text/plain;charset=utf-8," + encodeURIComponent(content);
      const anchor = document.createElement("a");
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute(
        "download",
        `Fatura-${dateLabel.replace(/[/\s,]/g, "-")}.txt`
      );
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      showToast(`Fatura de ${dateLabel} baixada com sucesso!`, "success");
    }, 1200);
  }

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !subscription) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-zinc-400">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm">{error ?? "Dados indisponíveis."}</p>
        <button onClick={fetchBilling} className={styles.secondaryBtn}>
          Tentar novamente
        </button>
      </div>
    );
  }

  const planLabel = PLAN_LABELS[subscription.plan] ?? subscription.plan;
  const statusInfo = STATUS_LABELS[subscription.status] ?? {
    label: subscription.status,
    classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };
  const isFree = subscription.plan === "Free";
  const isCancelled = subscription.status === "cancelled";

  return (
    <div className="space-y-6">
      {/* ── Confirm Modal ── */}
      {modalConfig?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">{modalConfig.title}</h3>
            <p className="text-sm text-zinc-400">{modalConfig.description}</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModalConfig(null)}
                className={styles.secondaryBtn}
              >
                {modalConfig.cancelText}
              </button>
              <button
                onClick={modalConfig.onConfirm}
                disabled={cancelling}
                className={`${styles.primaryBtn} ${
                  modalConfig.type === "danger"
                    ? "bg-none bg-red-600 hover:bg-red-700"
                    : ""
                }`}
              >
                {cancelling ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  modalConfig.confirmText
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Current Plan ── */}
      <section className="relative group">
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br ${theme.glow}
            rounded-2xl blur-xl
            opacity-50
            pointer-events-none
          `}
        />
        <div
          className={`
            relative
            bg-gradient-to-br ${theme.bgLight}
            p-6 rounded-2xl
            border ${theme.border}
            backdrop-blur-sm
          `}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2
                  className={`text-xl font-bold tracking-tight ${theme.textMuted}`}
                >
                  Plano {planLabel}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${statusInfo.classes}`}
                >
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                {isFree
                  ? "Funcionalidades essenciais para o seu controle financeiro"
                  : "Recursos avançados e ilimitados para sua gestão financeira"}
              </p>
              {subscription.currentPeriodEnd && (
                <p className="text-xs text-zinc-500 mt-2">
                  {isCancelled ? "Acesso até" : "Renova em"}:{" "}
                  <span className="text-zinc-300 font-medium">
                    {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </p>
              )}
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-3xl font-extrabold tracking-tight text-white">
                {formatCurrency(subscription.price)}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">por mês</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {isFree ? (
              <button
                className={styles.primaryBtn}
                onClick={() =>
                  showToast(
                    "Redirecionando para checkout...",
                    "info"
                  )
                }
              >
                Assinar Pro
              </button>
            ) : (
              <button className={styles.primaryBtn}>Alterar Plano</button>
            )}

            {!isFree && !isCancelled && (
              <button
                onClick={() =>
                  confirmAction({
                    title: "Cancelar Assinatura?",
                    description:
                      "Você continuará com acesso ao plano até o fim do período atual. Após isso, sua conta será rebaixada para o plano gratuito.",
                    confirmText: "Cancelar Assinatura",
                    cancelText: "Manter Assinatura",
                    type: "danger",
                    onConfirm: handleCancelSubscription,
                  })
                }
                className={styles.dangerBtn}
              >
                Cancelar Assinatura
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Payment Method ── */}
      {(subscription.cardLastFour || subscription.cardBrand) && (
        <section className="relative group">
          <div className={styles.cardGlow} />
          <div className={styles.cardBase}>
            <h2 className="text-lg font-bold tracking-tight mb-4">
              Método de Pagamento
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-white/[0.02] rounded-xl flex items-center justify-center border border-white/5 shrink-0">
                <CreditCard className={`w-7 h-7 ${theme.text}`} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-sm font-semibold text-zinc-200">
                  {subscription.cardBrand ?? "Cartão"} final{" "}
                  {subscription.cardLastFour}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">Padrão</div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <button className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-all text-zinc-300 cursor-pointer">
                  Editar
                </button>
                <button
                  onClick={() =>
                    confirmAction({
                      title: "Remover Cartão de Crédito?",
                      description: "Você precisará adicionar outro cartão.",
                      confirmText: "Remover Cartão",
                      cancelText: "Cancelar",
                      type: "danger",
                      onConfirm: () => setModalConfig(null),
                    })
                  }
                  className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Billing History ── */}
      <section className="relative group">
        <div className={styles.cardGlow} />
        <div className={styles.cardBase}>
          <h2 className="text-lg font-bold tracking-tight mb-6">
            Histórico de Faturamento
          </h2>

          {subscription.invoices.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-8">
              Nenhuma fatura encontrada.
            </p>
          ) : (
            <div className="space-y-3">
              {subscription.invoices.map((invoice, index) => {
                const invStatus = INVOICE_STATUS_LABELS[invoice.status] ?? {
                  label: invoice.status,
                  classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
                };
                return (
                  <div
                    key={invoice.id}
                    className="
                      flex flex-col sm:flex-row
                      items-start sm:items-center
                      justify-between
                      p-4
                      bg-white/[0.02]
                      rounded-xl
                      border border-white/5
                      hover:bg-white/[0.04]
                      transition-all
                      gap-4
                    "
                  >
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        Plano {planLabel} - Mensal
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {formatDate(invoice.date)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <span className="text-base font-bold text-zinc-100">
                        {formatCurrency(invoice.amount)}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 border rounded-md text-xs font-semibold ${invStatus.classes}`}
                      >
                        {invStatus.label}
                      </span>

                      <button
                        onClick={() => handleDownloadInvoice(index, invoice)}
                        className="
                          p-2
                          hover:bg-white/5
                          rounded-lg
                          transition-all
                          active:scale-90
                          text-zinc-400
                          hover:text-white
                          cursor-pointer
                        "
                      >
                        {downloadingIndex === index ? (
                          <div className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
