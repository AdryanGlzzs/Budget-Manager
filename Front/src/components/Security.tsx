import React, { useState, useEffect } from "react";

import {
  Check,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
  Loader2,
  QrCode,
  ShieldAlert,
  Key,
  X,
  Trash2,
} from "lucide-react";

import { themes } from "../themes/themes";
import { useThemeColors } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/authContext";
import { api } from "../services/api";

type PasswordState = {
  current: string;
  new: string;
  confirm: string;
};

type Session = {
  id: string;
  device: string;
  browser?: string;
  os?: string;
  location: string;
  time: string;
  current: boolean;
};

const initialPasswords: PasswordState = {
  current: "",
  new: "",
  confirm: "",
};

export const Security = () => {
  const { accentColor } = useThemeColors();
  const { showToast } = useToast();
  const { User, setUser } = useAuth();

  const [passwords, setPasswords] =
    useState<PasswordState>(initialPasswords);

  const [showPwd, setShowPwd] = useState<Record<string, boolean>>({});

  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [loading2fa, setLoading2fa] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying2fa, setIsVerifying2fa] = useState(false);

  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
  const [disablePassword, setDisablePassword] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [isDisabling2fa, setIsDisabling2fa] = useState(false);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [revokingSessionId, setRevokingSessionId] = useState<string | null>(null);
  const [isRevokingOthers, setIsRevokingOthers] = useState(false);

  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const theme = themes[accentColor];

  useEffect(() => {
    if (User?.twoFactorEnabled !== undefined) {
      setIs2faEnabled(User.twoFactorEnabled);
    }
    fetchSessions();
  }, [User]);

  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);
      const res = await api.get<Session[]>("/users/sessions");
      setSessions(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar sessões:", err);
    } finally {
      setLoadingSessions(false);
    }
  };

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

  async function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();

    if (
      !passwords.current ||
      !passwords.new ||
      !passwords.confirm
    ) {
      showToast("Preencha todos os campos de senha.", "error");
      return;
    }

    if (passwords.new.length < 6) {
      showToast("A nova senha deve ter no mínimo 6 caracteres.", "warning");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      showToast("A nova senha e a confirmação não coincidem.", "error");
      return;
    }

    try {
      setIsSavingPassword(true);
      const response = await api.put("/users/password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });

      showToast(response.data?.message || "Senha alterada com sucesso!", "success");
      setPasswords(initialPasswords);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Não foi possível alterar a senha. Verifique seus dados.";
      showToast(msg, "error");
    } finally {
      setIsSavingPassword(false);
    }
  }

  async function handleStartEnable2fa() {
    try {
      setLoading2fa(true);
      const res = await api.post("/users/2fa/generate");
      setQrCodeUrl(res.data.qrCodeUrl);
      setTotpSecret(res.data.secret);
      setVerificationCode("");
      setIsQrModalOpen(true);
    } catch (err: any) {
      showToast(err.response?.data?.message || "Erro ao gerar QR Code do 2FA", "error");
    } finally {
      setLoading2fa(false);
    }
  }

  async function handleConfirmEnable2fa(e: React.FormEvent) {
    e.preventDefault();
    if (verificationCode.trim().length !== 6) {
      showToast("Digite o código de 6 dígitos do autenticador.", "warning");
      return;
    }

    try {
      setIsVerifying2fa(true);
      const res = await api.post("/users/2fa/enable", {
        code: verificationCode.trim(),
      });

      setIs2faEnabled(true);
      if (User) {
        setUser({ ...User, twoFactorEnabled: true });
      }
      setIsQrModalOpen(false);
      showToast(res.data?.message || "Autenticação em duas etapas ativada com sucesso!", "success");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Código incorreto ou expirado.", "error");
    } finally {
      setIsVerifying2fa(false);
    }
  }

  async function handleConfirmDisable2fa(e: React.FormEvent) {
    e.preventDefault();
    if (!disablePassword && !disableCode) {
      showToast("Informe sua senha ou o código de autenticação.", "warning");
      return;
    }

    try {
      setIsDisabling2fa(true);
      const res = await api.post("/users/2fa/disable", {
        password: disablePassword || undefined,
        code: disableCode || undefined,
      });

      setIs2faEnabled(false);
      if (User) {
        setUser({ ...User, twoFactorEnabled: false });
      }
      setIsDisableModalOpen(false);
      setDisablePassword("");
      setDisableCode("");
      showToast(res.data?.message || "2FA desativado com sucesso.", "info");
    } catch (err: any) {
      showToast(err.response?.data?.message || "Credenciais inválidas.", "error");
    } finally {
      setIsDisabling2fa(false);
    }
  }

  async function handleRevokeSession(sessionId: string, deviceName: string) {
    if (!window.confirm(`Deseja realmente desconectar "${deviceName}"?`)) {
      return;
    }

    try {
      setRevokingSessionId(sessionId);
      await api.delete(`/users/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      showToast(`Sessão "${deviceName}" encerrada com sucesso.`, "info");
    } catch (err) {
      showToast("Erro ao encerrar sessão.", "error");
    } finally {
      setRevokingSessionId(null);
    }
  }

  async function handleRevokeOtherSessions() {
    if (!window.confirm("Deseja desconectar todas as outras sessões ativas além da atual?")) {
      return;
    }

    try {
      setIsRevokingOthers(true);
      await api.delete("/users/sessions/other");
      setSessions((prev) => prev.filter((s) => s.current));
      showToast("Todas as outras sessões foram encerradas.", "success");
    } catch (err) {
      showToast("Erro ao encerrar outras sessões.", "error");
    } finally {
      setIsRevokingOthers(false);
    }
  }

  function formatTime(isoOrStr: string) {
    if (!isoOrStr) return "Ativo agora";
    const date = new Date(isoOrStr);
    if (isNaN(date.getTime())) return isoOrStr;
    const now = new Date();
    const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffMin < 2) return "Ativo agora";
    if (diffMin < 60) return `Há ${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `Há ${diffHours} h`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
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
              disabled={isSavingPassword}
              className={`${styles.primaryBtn} w-full sm:w-auto flex items-center justify-center gap-2 ${isSavingPassword ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isSavingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Atualizando...</span>
                </>
              ) : (
                "Atualizar Senha"
              )}
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
                Proteção adicional via aplicativo autenticador (TOTP)
              </p>
            </div>

            <div
              className={`
                self-start flex items-center gap-2
                px-2.5 py-1 rounded-lg
                text-xs font-semibold border
                ${is2faEnabled
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
                ${is2faEnabled
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-zinc-500/10 border-zinc-500/20"
                }
              `}
            >
              <Smartphone
                className={`
                  w-6 h-6
                  ${is2faEnabled
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
                Google Authenticator, Authy, Microsoft Authenticator ou 1Password
              </div>
            </div>

            <button
              onClick={() => {
                if (is2faEnabled) {
                  setIsDisableModalOpen(true);
                } else {
                  handleStartEnable2fa();
                }
              }}
              disabled={loading2fa}
              className={`
                w-full sm:w-auto
                px-5 py-2.5 rounded-lg
                text-sm font-semibold
                transition-all active:scale-[0.98]
                cursor-pointer flex items-center justify-center gap-2
                ${is2faEnabled
                  ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                  : `bg-gradient-to-r ${theme.primary} text-white hover:shadow-lg ${theme.primaryHover}`
                }
              `}
            >
              {loading2fa ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : is2faEnabled ? (
                "Desativar"
              ) : (
                "Configurar 2FA"
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="relative group">
        <div className={styles.cardGlow} />

        <div className={styles.cardBase}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Sessões Ativas
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Dispositivos conectados à sua conta
              </p>
            </div>

            {sessions.filter((s) => !s.current).length > 0 && (
              <button
                onClick={handleRevokeOtherSessions}
                disabled={isRevokingOthers}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                {isRevokingOthers ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                Encerrar outras sessões
              </button>
            )}
          </div>

          <div className="space-y-4">
            {loadingSessions ? (
              <div className="p-8 text-center text-zinc-400 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Carregando dispositivos conectados...</span>
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-6 text-center text-zinc-400 text-sm">
                Nenhuma sessão registrada.
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white/[0.02] rounded-xl border border-white/5 gap-4 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${theme.bgLight} rounded-xl flex items-center justify-center border shrink-0`}
                    >
                      <Globe className={`w-6 h-6 ${theme.text}`} />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        {session.device}
                      </div>

                      <div className="text-xs text-zinc-400 mt-0.5">
                        {session.location} • {formatTime(session.time)}
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
                      disabled={revokingSessionId === session.id}
                      className={`${styles.secondaryBtn} w-full sm:w-auto flex items-center justify-center gap-2`}
                    >
                      {revokingSessionId === session.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Revogar"
                      )}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0e0e1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Configurar 2FA</h3>
                <p className="text-xs text-zinc-400">Escaneie o QR Code com seu aplicativo</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl flex items-center justify-center mx-auto my-4 w-fit shadow-md">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code 2FA" className="w-48 h-48" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-black animate-spin" />
                </div>
              )}
            </div>

            {totpSecret && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> Chave manual de backup
                </div>
                <div className="font-mono text-xs text-zinc-200 select-all break-all">
                  {totpSecret}
                </div>
              </div>
            )}

            <form onSubmit={handleConfirmEnable2fa} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
                  Código de 6 dígitos
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center text-xl tracking-widest font-mono bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 text-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isVerifying2fa || verificationCode.length !== 6}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${theme.primary} text-white disabled:opacity-50`}
                >
                  {isVerifying2fa ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verificar e Ativar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0e0e1a] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsDisableModalOpen(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Desativar 2FA</h3>
                <p className="text-xs text-zinc-400">Confirme sua identidade para desativar a proteção</p>
              </div>
            </div>

            <form onSubmit={handleConfirmDisable2fa} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
                  Senha Atual ou Código do Autenticador
                </label>
                <input
                  type="password"
                  placeholder="Sua senha atual"
                  value={disablePassword}
                  onChange={(e) => setDisablePassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Ou código 2FA de 6 dígitos"
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono tracking-widest text-center"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDisableModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 text-zinc-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isDisabling2fa || (!disablePassword && !disableCode)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
                >
                  {isDisabling2fa ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Desativação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};