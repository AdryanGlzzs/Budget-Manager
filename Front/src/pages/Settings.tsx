import {
  Bell,
  User,
  Lock,
  CreditCard,
  Globe,
  Smartphone,
  Eye,
  EyeOff,
  Camera,
  Save,
  Check,
  Download,
  AlertTriangle,
  FileDown,
  UserCircle,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useRef } from "react";
import { themes } from "../themes/themes";

type TabId =
  | "profile"
  | "security"
  | "notifications"
  | "preferences"
  | "billing";

type TabItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const tabs: TabItem[] = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "security", label: "Segurança", icon: Lock },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "preferences", label: "Preferências", icon: Globe },
  { id: "billing", label: "Faturamento", icon: CreditCard },
];

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

const billingHistory = [
  { date: "01 de Fev, 2026", amount: "$15.00", status: "Pago" },
  { date: "01 de Jan, 2026", amount: "$15.00", status: "Pago" },
  { date: "01 de Dez, 2025", amount: "$15.00", status: "Pago" },
];

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [fadeKey, setFadeKey] = useState(0);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [accentColor, setAccentColor] = useState<
    "purple" | "blue" | "emerald" | "pink"
  >("purple");

  const [name, setName] = useState("Adryan Gomes");
  const [email, setEmail] = useState("adryan.gomes@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [birthdate, setBirthdate] = useState("1995-03-15");
  const [address, setAddress] = useState(
    "123 Main Street, San Francisco, CA 94102",
  );
  const [avatar, setAvatar] = useState<{
    hasPhoto: boolean;
    photoUrl?: string;
  }>({ hasPhoto: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState<Record<string, boolean>>({});

  const [is2faEnabled, setIs2faEnabled] = useState(true);
  const [sessions, setSessions] = useState([
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

  const [currency, setCurrency] = useState("USD - Dólar Americano");
  const [language, setLanguage] = useState("Português (BR)");
  const [timezone, setTimezone] = useState("GMT-3 (Horário de Brasília)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "info" | "error" }[]
  >([]);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  } | null>(null);

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

  const confirmAction = (config: {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  }) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const switchTab = (id: TabId) => {
    setActiveTab(id);
    setFadeKey((k) => k + 1);
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar({ hasPhoto: true, photoUrl: reader.result as string });
        showToast("Foto de perfil atualizada com sucesso!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    showToast("Informações pessoais salvas com sucesso!", "success");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showToast("Preencha todos os campos de senha.", "error");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showToast("A nova senha e a confirmação não coincidem.", "error");
      return;
    }
    showToast("Senha atualizada com sucesso!", "success");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleToggle2fa = () => {
    if (is2faEnabled) {
      confirmAction({
        title: "Desativar Autenticação de Dois Fatores (2FA)?",
        description:
          "Sua conta estará menos protegida. Recomendamos manter a segurança de dois fatores ativa para proteger suas informações financeiras.",
        confirmText: "Sim, Desativar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => {
          setIs2faEnabled(false);
          showToast("Autenticação de 2 fatores desativada.", "info");
        },
      });
    } else {
      setIs2faEnabled(true);
      showToast("Autenticação de 2 fatores ativada!", "success");
    }
  };

  const handleRevokeSession = (sessionId: string, deviceName: string) => {
    confirmAction({
      title: "Revogar Sessão Ativa?",
      description: `Tem certeza que deseja desconectar o dispositivo "${deviceName}"? O usuário precisará realizar o login novamente.`,
      confirmText: "Revogar Conexão",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm: () => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        showToast(`Sessão do dispositivo "${deviceName}" revogada.`, "success");
      },
    });
  };

  const handleExportData = () => {
    confirmAction({
      title: "Exportar Dados da Conta?",
      description:
        "Será gerado um arquivo de dados no formato JSON com todas as suas configurações atuais de perfil e preferências gerais.",
      confirmText: "Exportar Dados",
      cancelText: "Cancelar",
      type: "info",
      onConfirm: () => {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify(
              {
                name,
                email,
                phone,
                birthdate,
                address,
                preferences: {
                  theme: accentColor,
                  currency,
                  language,
                  timezone,
                  dateFormat,
                },
              },
              null,
              2,
            ),
          );
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "budget_manager_settings.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Dados exportados com sucesso!", "success");
      },
    });
  };

  const handleDeleteAccount = () => {
    confirmAction({
      title: "Excluir Conta Permanentemente?",
      description:
        "ESTA AÇÃO É IRREVERSÍVEL. Todos os seus dados financeiros, orçamentos, históricos de transações e assinaturas serão apagados definitivamente do nosso sistema.",
      confirmText: "Excluir Conta",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm: () => {
        showToast("Processando exclusão permanente...", "info");
        setTimeout(
          () => showToast("Conta desativada. Redirecionando...", "error"),
          1500,
        );
      },
    });
  };

  const handleDownloadInvoice = (index: number, date: string) => {
    if (downloadingIndex !== null) return;
    setDownloadingIndex(index);
    showToast(`Gerando arquivo da fatura de ${date}...`, "info");
    setTimeout(() => {
      setDownloadingIndex(null);
      showToast(`Fatura de ${date} baixada com sucesso!`, "success");
      const dataStr =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          `FATURA BUDGET MANAGER\nData: ${date}\nValor: $15.00\nStatus: PAGO\nPlano: PRO Mensal`,
        );
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `Fatura-${date.replace(/[\s,]/g, "")}.txt`,
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 1200);
  };

  const handleSavePreferences = () => {
    showToast("Preferências gerais salvas com sucesso!", "success");
  };

  const steps = [
    { key: "name", label: "Nome adicionado", done: name.trim().length > 0 },
    {
      key: "email",
      label: "E-mail verificado",
      done: email.trim().length > 0 && email.includes("@"),
    },
    {
      key: "phone",
      label: "Telefone adicionado",
      done: phone.trim().length > 0,
    },
    { key: "photo", label: "Foto de perfil", done: avatar.hasPhoto },
  ];
  const completedCount = steps.filter((s) => s.done).length;
  const completionPercentage = Math.round(
    (completedCount / steps.length) * 100,
  );

  const theme = themes[accentColor];

  const pageBg = "min-h-screen bg-[#050510] text-white overflow-x-hidden pb-12";
  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";
  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;
  const inputBase = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none ${theme.focus} focus:bg-white/10 focus:ring-4 backdrop-blur-sm hover:bg-white/10 transition-all text-zinc-100 placeholder-zinc-500`;
  const labelBase =
    "text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider";
  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;
  const secondaryBtn =
    "px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white text-zinc-200 active:scale-[0.98] transition-all cursor-pointer";
  const dangerBtn =
    "px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium active:scale-[0.98] transition-all cursor-pointer";

  const bgGlowColors = {
    purple: { accent1: "bg-purple-600/15", accent2: "bg-blue-600/10" },
    blue: { accent1: "bg-blue-600/15", accent2: "bg-purple-600/10" },
    emerald: { accent1: "bg-emerald-600/15", accent2: "bg-teal-600/10" },
    pink: { accent1: "bg-pink-600/15", accent2: "bg-rose-600/10" },
  };
  const glows = bgGlowColors[accentColor];

  const personalFields = [
    { label: "Nome Completo", value: name, setter: setName, type: "text" },
    { label: "E-mail", value: email, setter: setEmail, type: "email" },
    { label: "Telefone", value: phone, setter: setPhone, type: "tel" },
    {
      label: "Data de Nascimento",
      value: birthdate,
      setter: setBirthdate,
      type: "date",
    },
  ];

  const passwordFields = [
    {
      label: "Senha Atual",
      value: passwords.current,
      setter: (val: string) => setPasswords((p) => ({ ...p, current: val })),
      key: "current",
    },
    {
      label: "Nova Senha",
      value: passwords.new,
      setter: (val: string) => setPasswords((p) => ({ ...p, new: val })),
      key: "new",
    },
    {
      label: "Confirmar Nova Senha",
      value: passwords.confirm,
      setter: (val: string) => setPasswords((p) => ({ ...p, confirm: val })),
      key: "confirm",
    },
  ];

  const preferencesFields = [
    {
      label: "Moeda Local",
      value: currency,
      setter: setCurrency,
      options: [
        "USD - Dólar Americano",
        "BRL - Real Brasileiro",
        "EUR - Euro",
        "GBP - Libra Esterlina",
      ],
    },
    {
      label: "Idioma da Interface",
      value: language,
      setter: setLanguage,
      options: ["Português (BR)", "English (US)", "Español", "Français"],
    },
    {
      label: "Fuso Horário",
      value: timezone,
      setter: setTimezone,
      options: [
        "GMT-3 (Horário de Brasília)",
        "PST - Pacific Standard Time",
        "EST - Eastern Standard Time",
        "GMT+0 - Greenwich Mean Time",
      ],
    },
    {
      label: "Formato de Data",
      value: dateFormat,
      setter: setDateFormat,
      options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    },
  ];

  const colors = ["purple", "blue", "emerald", "pink"] as const;
  const themeLabels = {
    purple: "Roxo",
    blue: "Azul",
    emerald: "Esmeralda",
    pink: "Rosa",
  };
  const themeAccentColors = {
    purple: {
      bg: "bg-purple-500",
      border: "border-purple-500",
      activeBg: "bg-purple-500/10",
    },
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-500",
      activeBg: "bg-blue-500/10",
    },
    emerald: {
      bg: "bg-emerald-500",
      border: "border-emerald-500",
      activeBg: "bg-emerald-500/10",
    },
    pink: {
      bg: "bg-pink-500",
      border: "border-pink-500",
      activeBg: "bg-pink-500/10",
    },
  };

  const getModalTheme = () => {
    if (!modalConfig) return "";
    if (modalConfig.type === "danger")
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    if (modalConfig.type === "warning")
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    return `${theme.bgLight} ${theme.text}`;
  };

  const getConfirmBtnStyle = () => {
    if (!modalConfig) return "";
    if (modalConfig.type === "danger")
      return "px-4 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer";
    if (modalConfig.type === "warning")
      return "px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer";
    return `px-4 py-2 bg-gradient-to-r ${theme.primary} text-white rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <section className="relative group">
              <div className={cardGlow} />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02]">
                <div
                  className={`h-32 bg-gradient-to-r ${theme.primary} relative`}
                />
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-10 text-center sm:text-left">
                    <div className="relative">
                      {avatar.hasPhoto && avatar.photoUrl ? (
                        <img
                          src={avatar.photoUrl}
                          alt="Profile"
                          className={`w-20 h-20 rounded-full object-cover shadow-xl ${theme.shadow} ring-4 ring-[#050510]`}
                        />
                      ) : (
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${theme.primary} rounded-full shadow-xl ${theme.shadow} ring-4 ring-[#050510] flex items-center justify-center text-2xl font-bold`}
                        >
                          {name
                            ? name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "U"}
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all border border-[#050510] bg-gradient-to-r ${theme.primary} cursor-pointer`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="pb-1 flex-1">
                      <div className="flex flex-col sm:flex-row items-center gap-2.5">
                        <h2 className="text-xl font-bold tracking-tight">
                          {name || "Usuário"}
                        </h2>
                        <span
                          className={`px-2 py-0.5 bg-gradient-to-r ${theme.primary} text-white rounded-md text-xs font-bold border ${theme.border} tracking-wide`}
                        >
                          PRO
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {email || "email@exemplo.com"}
                      </p>
                    </div>
                    <div className="flex gap-2 pb-1 w-full sm:w-auto justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={secondaryBtn}
                      >
                        Alterar Foto
                      </button>
                      {avatar.hasPhoto && (
                        <button
                          onClick={() => {
                            setAvatar({ hasPhoto: false });
                            showToast("Foto de perfil removida.", "info");
                          }}
                          className={dangerBtn}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-zinc-200">
                    Perfil {completionPercentage}% completo
                  </div>
                  <span
                    className={`text-xs font-medium ${theme.text} ${theme.bgLight} px-2 py-0.5 rounded-md`}
                  >
                    {completedCount} de {steps.length} etapas
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden mb-4 border border-white/5">
                  <div
                    className={`bg-gradient-to-r ${theme.primary} h-full rounded-full shadow-lg ${theme.shadow} transition-all duration-500`}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {steps.map((step) => (
                    <span
                      key={step.key}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-300 ${step.done ? "bg-green-500/10 text-green-400 border-green-500/10" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/10"}`}
                    >
                      {step.done ? "✓" : "○"} {step.label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-11 h-11 ${theme.bgLight} rounded-xl flex items-center justify-center shadow-lg ${theme.shadow} border ${theme.border}`}
                  >
                    <UserCircle className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">
                      Informações Pessoais
                    </h2>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      Atualize seus dados pessoais e de contato
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {personalFields.map(({ label, value, setter, type }) => (
                    <div key={label}>
                      <label className={labelBase}>{label}</label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className={inputBase}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className={labelBase}>Endereço</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 border-t border-white/5 pt-5">
                  <button onClick={handleSaveProfile} className={primaryBtn}>
                    <Save className="w-4 h-4" /> Salvar Alterações
                  </button>
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
              <div className="relative bg-gradient-to-br from-red-500/[0.03] to-white/[0.01] p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-red-400">
                      Zona de Perigo
                    </h2>
                    <p className="text-sm text-zinc-400 mt-0.5">
                      Ações irreversíveis e críticas na sua conta
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        Exportar Dados da Conta
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        Baixe todos os seus dados e históricos em formato JSON
                        de forma segura.
                      </div>
                    </div>
                    <button
                      onClick={handleExportData}
                      className={`${secondaryBtn} w-full sm:w-auto flex items-center justify-center gap-2`}
                    >
                      <FileDown className="w-4 h-4" /> Exportar
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-red-500/[0.02] rounded-xl border border-red-500/10 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-red-400">
                        Excluir Conta Permanentemente
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        Esta ação apagará de forma definitiva todos os seus
                        dados e assinaturas vigentes.
                      </div>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full sm:w-auto px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Excluir Conta
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
                <h2 className="text-lg font-bold tracking-tight mb-6">
                  Alterar Senha
                </h2>

                <form
                  onSubmit={handleSavePassword}
                  className="space-y-5 max-w-xl"
                >
                  {passwordFields.map(({ label, value, setter, key }) => (
                    <div key={key}>
                      <label className={labelBase}>{label}</label>
                      <div className="relative">
                        <input
                          type={showPwd[key] ? "text" : "password"}
                          value={value}
                          onChange={(e) => setter(e.target.value)}
                          className={`${inputBase} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPwd((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {showPwd[key] ? (
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
                    className={`${primaryBtn} sm:w-auto w-full`}
                  >
                    Atualizar Senha
                  </button>
                </form>
              </div>
            </section>

            <section className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
              <div className={cardBase}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight mb-1">
                      Autenticação de Dois Fatores (2FA)
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Adicione uma camada extra de segurança robusta à sua conta
                      financeira
                    </p>
                  </div>
                  <div
                    className={`self-start flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold border ${is2faEnabled ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
                  >
                    {is2faEnabled && <Check className="w-3.5 h-3.5" />}{" "}
                    {is2faEnabled ? "Ativado" : "Desativado"}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/[0.02] rounded-xl border border-white/5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${is2faEnabled ? "bg-green-500/10 border-green-500/20" : "bg-zinc-500/10 border-zinc-500/20"}`}
                  >
                    <Smartphone
                      className={`w-6 h-6 ${is2faEnabled ? "text-green-400" : "text-zinc-400"}`}
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="text-sm font-semibold text-zinc-200">
                      Aplicativo de Autenticação
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      Utilize apps como Google Authenticator ou 1Password para
                      gerar tokens temporários.
                    </div>
                  </div>
                  <button
                    onClick={handleToggle2fa}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer ${is2faEnabled ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/10" : `bg-gradient-to-r ${theme.primary} text-white shadow-md`}`}
                  >
                    {is2faEnabled ? "Desativar" : "Ativar"}
                  </button>
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
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
                          <Globe className={`w-6 h-6 ${theme.text}`} />
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
                            handleRevokeSession(session.id, session.device)
                          }
                          className={`${secondaryBtn} w-full sm:w-auto`}
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

      case "notifications":
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
                      <div className="text-xs text-zinc-400">
                        {item.description}
                      </div>
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

      case "preferences":
        return (
          <section className="relative group">
            <div className={cardGlow} />
            <div className={cardBase}>
              <h2 className="text-lg font-bold tracking-tight mb-6">
                Preferências Gerais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {preferencesFields.map(({ label, value, setter, options }) => (
                  <div key={label}>
                    <label className={labelBase}>{label}</label>
                    <div className="relative">
                      <select
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className={`${inputBase} appearance-none pr-10`}
                      >
                        {options.map((opt) => (
                          <option key={opt} className="bg-[#050510] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                ))}

                {/* Ambient Highlight Color selector */}
                <div className="md:col-span-2 mt-4 pt-4 border-t border-white/5">
                  <label className={labelBase}>
                    Cor de Destaque da Interface
                  </label>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {colors.map((color) => {
                      const isActive = accentColor === color;
                      const c = themeAccentColors[color];
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setAccentColor(color);
                            showToast(
                              `Tema alterado para ${themeLabels[color]}!`,
                              "success",
                            );
                          }}
                          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${isActive ? `${c.activeBg} ${c.border} text-white shadow-lg ${theme.shadow}` : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"}`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full ${c.bg}`}
                          />
                          {themeLabels[color]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 border-t border-white/5 pt-5">
                <button onClick={handleSavePreferences} className={primaryBtn}>
                  <Save className="w-4 h-4" /> Salvar Configurações
                </button>
              </div>
            </div>
          </section>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <section className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-50 pointer-events-none`}
              />
              <div
                className={`relative bg-gradient-to-br ${theme.bgLight} p-6 rounded-2xl border ${theme.border} backdrop-blur-sm`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <h2
                      className={`text-xl font-bold tracking-tight ${theme.textMuted}`}
                    >
                      Plano Pro
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      Recursos avançados e ilimitados liberados para sua gestão
                      financeira
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
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all shadow-md text-white bg-gradient-to-r ${theme.primary} cursor-pointer`}
                  >
                    Alterar Plano
                  </button>
                  <button
                    onClick={() => {
                      confirmAction({
                        title: "Cancelar Assinatura Pro?",
                        description:
                          "Sua conta será rebaixada ao plano gratuito no final do período de faturamento. Você perderá acesso às metas ilimitadas e relatórios avançados.",
                        confirmText: "Confirmar Cancelamento",
                        cancelText: "Manter Plano Pro",
                        type: "danger",
                        onConfirm: () =>
                          showToast(
                            "Assinatura cancelada com sucesso.",
                            "info",
                          ),
                      });
                    }}
                    className={dangerBtn}
                  >
                    Cancelar Assinatura
                  </button>
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg font-bold tracking-tight">
                    Método de Pagamento
                  </h2>
                  <button
                    onClick={() =>
                      showToast(
                        "Funcionalidade de gateway em ambiente de homologação.",
                        "info",
                      )
                    }
                    className={`${secondaryBtn} w-full sm:w-auto`}
                  >
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
                      onClick={() =>
                        showToast("Edição de cartão em manutenção.", "info")
                      }
                      className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-all text-zinc-300 cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        confirmAction({
                          title: "Remover Cartão de Crédito?",
                          description:
                            "Você precisará adicionar um novo cartão antes da próxima renovação para manter a assinatura ativa.",
                          confirmText: "Remover Cartão",
                          cancelText: "Cancelar",
                          type: "danger",
                          onConfirm: () =>
                            showToast("Cartão removido.", "info"),
                        });
                      }}
                      className="px-3 py-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative group">
              <div className={cardGlow} />
              <div className={cardBase}>
                <h2 className="text-lg font-bold tracking-tight mb-6">
                  Histórico de Faturamento
                </h2>

                <div className="space-y-3">
                  {billingHistory.map((invoice, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.04] transition-all gap-4"
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
                        <span className="px-2.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-semibold">
                          {invoice.status}
                        </span>
                        <button
                          onClick={() =>
                            handleDownloadInvoice(index, invoice.date)
                          }
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
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className={pageBg}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute left-[-200px] top-[-200px] w-[600px] h-[600px] ${glows.accent1} rounded-full blur-[140px] opacity-60 mix-blend-screen`}
        />
        <div
          className={`absolute right-[-200px] top-[-200px] w-[600px] h-[600px] ${glows.accent2} rounded-full blur-[140px] opacity-40 mix-blend-screen`}
        />
        <div
          className={`absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] ${glows.accent2} rounded-full blur-[140px] opacity-40 mix-blend-screen`}
        />
        <div
          className={`absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] ${glows.accent1} rounded-full blur-[140px] opacity-60 mix-blend-screen`}
        />
      </div>

      <div className="relative z-10">
        <Header />

        <div className="flex flex-col lg:flex-row">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 p-4 sm:p-8 max-w-[1400px] mt-20">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-sans">
                Configurações
              </h1>
              <p className="text-sm sm:text-base text-zinc-400">
                Gerencie as credenciais, segurança e preferências da sua conta
                corporativa
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-56 shrink-0">
                <div className="md:sticky md:top-28 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none border-b border-white/5 md:border-none">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => switchTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap active:scale-[0.97] cursor-pointer ${isActive ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg ${theme.shadow}` : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                key={fadeKey}
                className="flex-1 min-w-0"
                style={{ animation: "fadeIn 0.25s ease-out forwards" }}
              >
                {renderTabContent()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {modalConfig && modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-md bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getModalTheme()}`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {modalConfig.title}
              </h3>
            </div>
            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              {modalConfig.description}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setModalConfig({ ...modalConfig, isOpen: false })
                }
                className={secondaryBtn}
              >
                {modalConfig.cancelText}
              </button>
              <button
                onClick={() => {
                  modalConfig.onConfirm();
                  setModalConfig({ ...modalConfig, isOpen: false });
                }}
                className={getConfirmBtnStyle()}
              >
                {modalConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md transition-all duration-300 pointer-events-auto ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-300" : toast.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-300" : "bg-blue-500/10 border-blue-500/20 text-blue-300"}`}
            style={{
              animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div className="flex-1 text-xs font-semibold">{toast.message}</div>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="text-zinc-400 hover:text-white text-xs cursor-pointer focus:outline-none"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
