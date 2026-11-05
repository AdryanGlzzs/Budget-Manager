import { useState, useEffect, useCallback } from "react";
import { CreditCard, Download, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { themes } from "../themes/themes";
import { useThemeColors } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
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

export const Billing = () => {
  const { accentColor } = useThemeColors();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const fetchBilling = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Subscription>("/users/billing");
      setSubscription(data);
    } catch (err) {
      console.error(err);
      setError(t("billingPage.errorLoad"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  function confirmAction(config: Omit<ModalConfig, "isOpen">) {
    setModalConfig({ ...config, isOpen: true });
  }

  async function handleCancelSubscription() {
    setCancelling(true);
    try {
      await api.post("/users/billing/cancel");
      showToast(t("billingPage.cancelSuccess"), "success");
      await fetchBilling();
    } catch {
      showToast(t("billingPage.cancelError"), "error");
    } finally {
      setCancelling(false);
      setModalConfig(null);
    }
  }

  function handleDownloadInvoice(index: number, invoice: Invoice) {
    if (downloadingIndex !== null) return;
    setDownloadingIndex(index);

    setTimeout(() => {
      setDownloadingIndex(null);

      const dateLabel = formatDate(invoice.date);
      const amountLabel = formatCurrency(invoice.amount);
      const statusLabel = t(`billingPage.invoiceStatus.${invoice.status}`, { defaultValue: invoice.status });
      const planName = t(`billingPage.plans.${subscription?.plan ?? ""}`, { defaultValue: subscription?.plan ?? "" });

      const content = `INVOICE / FATURA BUDGET MANAGER
========================================
Data:   ${dateLabel}
Valor:  ${amountLabel}
Status: ${statusLabel.toUpperCase()}
Plano:  ${planName}
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

      showToast(t("billingPage.downloadSuccess"), "success");
    }, 1000);
  }

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

  if (error || !subscription) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-zinc-400">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm">{error ?? t("billingPage.errorLoad")}</p>
        <button onClick={fetchBilling} className={styles.secondaryBtn}>
          {t("common.save", { defaultValue: "Recarregar" })}
        </button>
      </div>
    );
  }

  const planLabel = t(`billingPage.plans.${subscription.plan}`, { defaultValue: subscription.plan });
  const statusLabel = t(`billingPage.status.${subscription.status}`, { defaultValue: subscription.status });
  
  const statusClasses: Record<string, string> = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  const statusClass = statusClasses[subscription.status] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  const isFree = subscription.plan === "Free";
  const isCancelled = subscription.status === "cancelled";

  return (
    <div className="space-y-6">
      {/* Modal de Confirmação */}
      {modalConfig?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
            <h3 className="text-lg font-bold mb-2">{modalConfig.title}</h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {modalConfig.description}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModalConfig(null)}
                className={styles.secondaryBtn}
              >
                {modalConfig.cancelText}
              </button>
              <button
                onClick={modalConfig.onConfirm}
                disabled={cancelling}
                className={
                  modalConfig.type === "danger"
                    ? styles.dangerBtn
                    : styles.primaryBtn
                }
              >
                {cancelling ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processando...
                  </span>
                ) : (
                  modalConfig.confirmText
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plano Atual */}
      <section className="relative group">
        <div className={styles.cardGlow} />
        <div className={styles.cardBase}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className={`text-xl font-bold tracking-tight ${theme.textMuted}`}>
                  {t("billingPage.currentPlan", { plan: planLabel })}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${statusClass}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                {isFree ? t("billingPage.freeDesc") : t("billingPage.proDesc")}
              </p>
              {subscription.currentPeriodEnd && (
                <p className="text-xs text-zinc-500 mt-2">
                  {isCancelled ? t("billingPage.accessUntil") : t("billingPage.renewsOn")}:{" "}
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
              <div className="text-xs text-zinc-400 mt-0.5">
                {t("billingPage.perMonth")}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {isFree ? (
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/pricing")}
              >
                {t("billingPage.upgradePro")}
              </button>
            ) : (
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/pricing")}
              >
                {t("billingPage.changePlan")}
              </button>
            )}

            {!isFree && !isCancelled && (
              <button
                onClick={() =>
                  confirmAction({
                    title: t("billingPage.cancelTitle"),
                    description: t("billingPage.cancelDesc"),
                    confirmText: t("billingPage.cancelSub"),
                    cancelText: t("billingPage.keepSub"),
                    type: "danger",
                    onConfirm: handleCancelSubscription,
                  })
                }
                className={styles.dangerBtn}
              >
                {t("billingPage.cancelSub")}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Método de Pagamento */}
      {(subscription.cardLastFour || subscription.cardBrand) && (
        <section className="relative group">
          <div className={styles.cardGlow} />
          <div className={styles.cardBase}>
            <h2 className="text-lg font-bold tracking-tight mb-4">
              {t("billingPage.paymentMethod")}
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 bg-white/[0.02] rounded-xl flex items-center justify-center border border-white/5 shrink-0">
                <CreditCard className={`w-7 h-7 ${theme.text}`} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-sm font-semibold text-zinc-200">
                  {subscription.cardBrand ?? "Cartão"} final {subscription.cardLastFour}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t("billingPage.cardDefault")}
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <button
                  onClick={() => navigate("/pricing")}
                  className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-all text-zinc-300 cursor-pointer"
                >
                  {t("billingPage.editCard")}
                </button>
                <button
                  onClick={() =>
                    confirmAction({
                      title: t("billingPage.removeCardTitle"),
                      description: t("billingPage.removeCardDesc"),
                      confirmText: t("billingPage.removeCard"),
                      cancelText: t("common.cancel"),
                      type: "danger",
                      onConfirm: () => setModalConfig(null),
                    })
                  }
                  className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  {t("billingPage.removeCard")}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Histórico de Faturas */}
      <section className="relative group">
        <div className={styles.cardGlow} />
        <div className={styles.cardBase}>
          <h2 className="text-lg font-bold tracking-tight mb-6">
            {t("billingPage.history")}
          </h2>

          {subscription.invoices.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-8">
              {t("billingPage.noInvoices")}
            </p>
          ) : (
            <div className="space-y-3">
              {subscription.invoices.map((invoice, index) => {
                const invStatusClasses: Record<string, string> = {
                  paid: "bg-green-500/10 text-green-400 border-green-500/20",
                  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                  failed: "bg-red-500/10 text-red-400 border-red-500/20",
                };
                const statusBadge = invStatusClasses[invoice.status] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
                const invoiceStatusText = t(`billingPage.invoiceStatus.${invoice.status}`, { defaultValue: invoice.status });

                return (
                  <div
                    key={invoice.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.04] transition-all gap-4"
                  >
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        {t("billingPage.monthlyInvoice", { plan: planLabel })}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {formatDate(invoice.date)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <span className="text-base font-bold text-zinc-100">
                        {formatCurrency(invoice.amount)}
                      </span>

                      <span className={`px-2.5 py-0.5 border rounded-md text-xs font-semibold ${statusBadge}`}>
                        {invoiceStatusText}
                      </span>

                      <button
                        onClick={() => handleDownloadInvoice(index, invoice)}
                        className="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-90 text-zinc-400 hover:text-white cursor-pointer"
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

export default Billing;