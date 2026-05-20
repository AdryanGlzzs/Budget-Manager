import { useState } from "react";

import {
  Check,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
} from "lucide-react";

import { themes } from "../themes/themes";

type AccentColor = "purple" | "blue" | "emerald" | "pink";

type ToastType = "success" | "info" | "error";

type PasswordState = {
  current: string;
  new: string;
  confirm: string;
};

type Session = {
  id: string;
  device: string;
  location: string;
  time: string;
  current: boolean;
};

type ModalConfig = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info";
  onConfirm: () => void;
};

const initialPasswords: PasswordState = {
  current: "",
  new: "",
  confirm: "",
};

export const Security = () => {
  const [accentColor] = useState<AccentColor>("purple");

  const [passwords, setPasswords] =
    useState<PasswordState>(initialPasswords);

  const [showPwd, setShowPwd] = useState<Record<string, boolean>>({});

  const [is2faEnabled, setIs2faEnabled] = useState(true);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "mac",
      device: "Chrome no MacBook Pro",
      location: "San Francisco, CA",
      time: "Ativo agora",
      current: true,
    },

    {
      id: "iphone",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      time: "Há 2 horas",
      current: false,
    },
  ]);

  const [modalConfig, setModalConfig] =
    useState<ModalConfig | null>(null);

  const theme = themes[accentColor];

  const styles = {
    cardGlow: `
      absolute inset-0
      bg-gradient-to-br ${theme.glow}
      rounded-2xl blur-xl
      opacity-0 group-hover:opacity-100
      transition-all duration-300
      pointer-events-none
    `,

    cardBase: `
      relative
      bg-gradient-to-br
      from-white/10
      to-white/[0.02]
      p-6 rounded-2xl
      border border-white/10
      backdrop-blur-sm shadow-xl
    `,

    input: `
      w-full bg-white/5
      border border-white/10
      rounded-xl px-4 py-3
      text-sm text-zinc-100
      placeholder-zinc-500
      transition-all backdrop-blur-sm
      hover:bg-white/10
      focus:outline-none focus:bg-white/10
      focus:ring-4
      ${theme.focus}
    `,

    label: `
      text-xs font-semibold
      text-zinc-300 mb-2 block
      uppercase tracking-wider
    `,

    primaryBtn: `
      flex items-center justify-center gap-2
      px-6 py-3 rounded-xl
      text-sm font-semibold
      transition-all active:scale-[0.98]
      cursor-pointer
      bg-gradient-to-r ${theme.primary}
      hover:shadow-lg ${theme.primaryHover}
    `,

    secondaryBtn: `
      px-4 py-2
      bg-white/5
      border border-white/10
      rounded-lg
      text-sm font-medium
      text-zinc-200
      hover:bg-white/10 hover:text-white
      transition-all active:scale-[0.98]
      cursor-pointer
    `,
  };

  const passwordFields = [
    {
      key: "current",
      label: "Senha Atual",
      value: passwords.current,
    },

    {
      key: "new",
      label: "Nova Senha",
      value: passwords.new,
    },

    {
      key: "confirm",
      label: "Confirmar Nova Senha",
      value: passwords.confirm,
    },
  ];

  function updatePasswordField(
    field: keyof PasswordState,
    value: string,
  ) {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function togglePasswordVisibility(field: string) {
    setShowPwd((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  function confirmAction(config: Omit<ModalConfig, "isOpen">) {
    setModalConfig({
      ...config,
      isOpen: true,
    });
  }

  function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();

    if (
      !passwords.current ||
      !passwords.new ||
      !passwords.confirm
    ) {
      return;
    }

    if (passwords.new !== passwords.confirm) {
      return;
    }

    setPasswords(initialPasswords);
  }

  function handleToggle2fa() {
    if (is2faEnabled) {
      confirmAction({
        title: "Desativar Autenticação de Dois Fatores?",
        description:
          "Sua conta ficará menos protegida.",
        confirmText: "Desativar",
        cancelText: "Cancelar",
        type: "warning",

        onConfirm: () => {
          setIs2faEnabled(false);
        },
      });

      return;
    }

    setIs2faEnabled(true);
  }

  function handleRevokeSession(
    sessionId: string,
    deviceName: string,
  ) {
    confirmAction({
      title: "Revogar Sessão?",
      description: `Desconectar "${deviceName}"?`,
      confirmText: "Revogar",
      cancelText: "Cancelar",
      type: "danger",

      onConfirm: () => {
        setSessions((prev) =>
          prev.filter((session) => session.id !== sessionId),
        );
      },
    });
  }

  return (
    <div className="space-y-6">
      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <h2 className="text-lg font-bold tracking-tight mb-6">
            Alterar Senha
          </h2>

          <form
            onSubmit={handleSavePassword}
            className="space-y-5 max-w-xl"
          >
            {passwordFields.map((field) => (
              <div key={field.key}>
                <label className={styles.label}>
                  {field.label}
                </label>

                <div className="relative">
                  <input
                    type={
                      showPwd[field.key]
                        ? "text"
                        : "password"
                    }
                    value={field.value}
                    onChange={(e) =>
                      updatePasswordField(
                        field.key as keyof PasswordState,
                        e.target.value,
                      )
                    }
                    className={`${styles.input} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(field.key)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPwd[field.key] ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className={`${styles.primaryBtn} w-full sm:w-auto`}
            >
              Atualizar Senha
            </button>
          </form>
        </div>
      </section>

      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-1">
                Autenticação 2FA
              </h2>

              <p className="text-sm text-zinc-400">
                Proteção adicional para sua conta
              </p>
            </div>

            <div
              className={`
                self-start flex items-center gap-2
                px-2.5 py-1 rounded-lg
                text-xs font-semibold border

                ${
                  is2faEnabled
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                }
              `}
            >
              {is2faEnabled && (
                <Check className="w-3.5 h-3.5" />
              )}

              {is2faEnabled ? "Ativado" : "Desativado"}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/[0.02] rounded-xl border border-white/5">
            <div
              className={`
                w-12 h-12 rounded-xl
                flex items-center justify-center
                border shrink-0

                ${
                  is2faEnabled
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-zinc-500/10 border-zinc-500/20"
                }
              `}
            >
              <Smartphone
                className={`
                  w-6 h-6

                  ${
                    is2faEnabled
                      ? "text-green-400"
                      : "text-zinc-400"
                  }
                `}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="text-sm font-semibold text-zinc-200">
                Aplicativo Autenticador
              </div>

              <div className="text-xs text-zinc-400 mt-0.5">
                Google Authenticator ou 1Password
              </div>
            </div>

            <button
              onClick={handleToggle2fa}
              className={`
                w-full sm:w-auto
                px-4 py-2 rounded-lg
                text-sm font-semibold
                transition-all active:scale-[0.98]
                cursor-pointer

                ${
                  is2faEnabled
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/10"
                    : `bg-gradient-to-r ${theme.primary} text-white`
                }
              `}
            >
              {is2faEnabled ? "Desativar" : "Ativar"}
            </button>
          </div>
        </div>
      </section>

      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <h2 className="text-lg font-bold tracking-tight mb-6">
            Sessões Ativas
          </h2>

          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white/[0.02] rounded-xl border border-white/5 gap-4 hover:bg-white/[0.03] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${theme.bgLight} rounded-xl flex items-center justify-center border shrink-0`}
                  >
                    <Globe
                      className={`w-6 h-6 ${theme.text}`}
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-zinc-200">
                      {session.device}
                    </div>

                    <div className="text-xs text-zinc-400 mt-0.5">
                      {session.location} • {session.time}
                    </div>
                  </div>
                </div>

                {session.current ? (
                  <span className="w-full sm:w-auto text-center px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold border border-green-500/10">
                    Dispositivo Atual
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleRevokeSession(
                        session.id,
                        session.device,
                      )
                    }
                    className={`${styles.secondaryBtn} w-full sm:w-auto`}
                  >
                    Revogar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};