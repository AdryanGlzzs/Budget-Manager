import { useState, useRef } from "react";
import { themes } from "../themes/themes";
import {
  Camera,
  UserCircle,
  Save,
  AlertTriangle,
  FileDown,
} from "lucide-react";
export const Profile = () => {
  const [name, setName] = useState("Adryan Gomes");
  const [email, setEmail] = useState("adryan.gomes@email.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [birthdate, setBirthdate] = useState("1995-03-15");
  const currency = "USD - Dólar Americano";
  const language = "Português (BR)";
  const timezone = "GMT-3 (Horário de Brasília)";
  const dateFormat = "DD/MM/YYYY";

  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "info" | "error" }[]
  >([]);
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
  const accentColor = "purple";

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  } | null>(null);

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

  const completedCount = steps.filter((s) => s.done).length;
  const completionPercentage = Math.round(
    (completedCount / steps.length) * 100,
  );

  const handleSaveProfile = () => {
    showToast("Informações pessoais salvas com sucesso!", "success");
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

  const theme = themes[accentColor];

  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;

  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";

  const dangerBtn =
    "px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium active:scale-[0.98] transition-all cursor-pointer";

  const secondaryBtn =
    "px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white text-zinc-200 active:scale-[0.98] transition-all cursor-pointer";

  const inputBase = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none ${theme.focus} focus:bg-white/10 focus:ring-4 backdrop-blur-sm hover:bg-white/10 transition-all text-zinc-100 placeholder-zinc-500`;
  const labelBase =
    "text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider";

  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;

  return (
    <div className="space-y-6">
      <section className="relative group">
        <div className={cardGlow} />
        <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02]">
          <div className={`h-32 bg-gradient-to-r ${theme.primary} relative`} />
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
                  Baixe todos os seus dados e históricos em formato JSON de
                  forma segura.
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
                  Esta ação apagará de forma definitiva todos os seus dados e
                  assinaturas vigentes.
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
};
