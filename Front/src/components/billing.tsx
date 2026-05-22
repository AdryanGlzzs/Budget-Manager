import { useState } from "react";
import { CreditCard, Download } from "lucide-react";
import { themes } from "../themes/themes";

type AccentColor = "purple" | "blue" | "emerald" | "pink";

type ToastType = "success" | "info" | "error";

type ModalConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info";
  onConfirm: () => void;
};

type BillingHistory = {
  date: string;
  amount: string;
  status: string;
};

const billingHistory: BillingHistory[] = [
  {
    date: "01 de Fev, 2026",
    amount: "$15.00",
    status: "Pago",
  },

  {
    date: "01 de Jan, 2026",
    amount: "$15.00",
    status: "Pago",
  },

  {
    date: "01 de Dez, 2025",
    amount: "$15.00",
    status: "Pago",
  },
];

export const Billing = () => {
  const [accentColor] = useState<AccentColor>("purple");
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const theme = themes[accentColor];
  const styles = {
    cardGlow: `absolute inset-0bg-gradient-to-br ${theme.glow}rounded-2xl blur-xlopacity-0 group-hover:opacity-100transition-all duration-300pointer-events-none`,

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

  function confirmAction(config: Omit<ModalConfig, "isOpen">) {
    setModalConfig({
      ...config,
      isOpen: true,
    });
  }

  function handleDownloadInvoice(index: number, date: string) {
    if (downloadingIndex !== null) return;

    setDownloadingIndex(index);

    setTimeout(() => {
      setDownloadingIndex(null);

      const content = `FATURA BUDGET MANAGER
      Data: ${date}
      Valor: $15.00
      Status: PAGO
      Plano: PRO Mensal
      `;

      const dataStr =
        "data:text/plain;charset=utf-8," + encodeURIComponent(content);

      const anchor = document.createElement("a");

      anchor.setAttribute("href", dataStr);

      anchor.setAttribute(
        "download",
        `Fatura-${date.replace(/[\s,]/g, "")}.txt`,
      );

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();
    }, 1200);
  }

  return (
    <div className="space-y-6">
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
              <h2
                className={`
                  text-xl font-bold
                  tracking-tight
                  ${theme.textMuted}
                `}
              >
                Plano Pro
              </h2>

              <p className="text-sm text-zinc-400 mt-1">
                Recursos avançados e ilimitados para sua gestão financeira
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-3xl font-extrabold tracking-tight text-white">
                $15
              </div>

              <div className="text-xs text-zinc-400 mt-0.5">por mês</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className={styles.primaryBtn}>Alterar Plano</button>

            <button
              onClick={() =>
                confirmAction({
                  title: "Cancelar Assinatura Pro?",

                  description:
                    "Sua conta será rebaixada para o plano gratuito.",

                  confirmText: "Confirmar Cancelamento",

                  cancelText: "Manter Plano Pro",

                  type: "danger",

                  onConfirm: () => {},
                })
              }
              className={styles.dangerBtn}
            >
              Cancelar Assinatura
            </button>
          </div>
        </div>
      </section>

      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold tracking-tight">
              Método de Pagamento
            </h2>

            <button className={`${styles.secondaryBtn} w-full sm:w-auto`}>
              Adicionar Novo Cartão
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/[0.02] rounded-xl border border-white/5">
            <div className="w-14 h-14 bg-white/[0.02] rounded-xl flex items-center justify-center border border-white/5 shrink-0 animate-pulse">
              <CreditCard className={`w-7 h-7 ${theme.text}`} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="text-sm font-semibold text-zinc-200">
                Visa final 4242
              </div>

              <div className="text-xs text-zinc-400 mt-0.5">
                Expira em 12/2026 • Padrão
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-center">
              <button
                className="
                  px-3 py-1.5
                  bg-white/5
                  rounded-lg
                  text-xs font-semibold
                  hover:bg-white/10
                  transition-all
                  text-zinc-300
                  cursor-pointer
                "
              >
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

                    onConfirm: () => {},
                  })
                }
                className="
                  px-3 py-1.5
                  text-red-400
                  hover:bg-red-500/10
                  rounded-lg
                  text-xs font-semibold
                  transition-all
                  cursor-pointer
                "
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <h2 className="text-lg font-bold tracking-tight mb-6">
            Histórico de Faturamento
          </h2>

          <div className="space-y-3">
            {billingHistory.map((invoice, index) => (
              <div
                key={index}
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
                    Plano Pro - Mensal
                  </div>

                  <div className="text-xs text-zinc-400 mt-0.5">
                    {invoice.date}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <span className="text-base font-bold text-zinc-100">
                    {invoice.amount}
                  </span>

                  <span
                    className="
                      px-2.5 py-0.5
                      bg-green-500/10
                      text-green-400
                      border border-green-500/20
                      rounded-md
                      text-xs font-semibold
                    "
                  >
                    {invoice.status}
                  </span>

                  <button
                    onClick={() => handleDownloadInvoice(index, invoice.date)}
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
                      <div
                        className="
                          w-4 h-4
                          border-2
                          border-zinc-400
                          border-t-white
                          rounded-full
                          animate-spin
                        "
                      />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
