import React, { useState, useRef, useEffect, useCallback } from "react";
import { useThemeColors } from "../contexts/ThemeContext";
import {
  UserCircle,
  Save,
  AlertTriangle,
  FileDown,
} from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../contexts/authContext";
import { useToast } from "../contexts/ToastContext";

interface PhotoProps {
  currentPhotoUrl?: string;
  onPhotoChange: (file: File, previewUrl: string) => void;
  maxSizeMB: number;
  acceptTypes?: string[];
  size?: number;
}

const TypesPhoto = ['image/jpeg', 'image/png', 'image/webp'];

export const Profile = ({ onPhotoChange, maxSizeMB = 5, acceptTypes = TypesPhoto }: Partial<PhotoProps>) => {
  const { User, setUser } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(User?.name || "");
  const [email, setEmail] = useState(User?.email || "");
  const [phone, setPhone] = useState(User?.phone || "");
  const [birthdate, setBirthdate] = useState(User?.birthdate ? User.birthdate.split("T")[0] : "");
  const [address, setAddress] = useState(User?.address || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(User?.avatar || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (User) {
      if (User.name) setName(User.name);
      if (User.email) setEmail(User.email);
      if (User.phone) setPhone(User.phone);
      if (User.birthdate) setBirthdate(User.birthdate.split("T")[0]);
      if (User.address) setAddress(User.address);
      if (User.avatar) setPreviewUrl(User.avatar);
    }
  }, [User]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validatedFile = useCallback((file: File): string | null => {
    if (!acceptTypes.includes(file.type)) {
      return `Formato de imagem não suportado. Use ${acceptTypes.map((t) => t.split("/")[1]).join(", ")}.`;
    }

    const MaxBytes = maxSizeMB * 1024 * 1024;

    if (file.size > MaxBytes) {
      return `A imagem deve ter no máximo ${maxSizeMB}MB.`;
    }

    return null;
  }, [acceptTypes, maxSizeMB]);

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const convertAndCompressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Gera imagem leve comprimida em JPEG
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const HandleSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const validationError = validatedFile(file);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    try {
      showToast("Processando e enviando imagem...", "info");
      const base64Image = await convertAndCompressImage(file);
      setPreviewUrl(base64Image);
      onPhotoChange?.(file, base64Image);

      const response = await api.put("/users/me", { avatarUrl: base64Image });
      const updatedAvatar = response.data?.avatarUrl || base64Image;

      if (User) {
        setUser({
          ...User,
          avatar: updatedAvatar,
          avatarUrl: updatedAvatar,
        });
      }
      showToast("Foto de perfil atualizada no banco de dados!", "success");
    } catch (err) {
      console.error("Erro ao salvar foto:", err);
      showToast("Não foi possível salvar a foto no servidor.", "error");
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await api.put("/users/me", { avatarUrl: null });
      setPreviewUrl(null);
      if (User) {
        setUser({
          ...User,
          avatar: undefined,
          avatarUrl: undefined,
        });
      }
      showToast("Foto de perfil removida com sucesso.", "info");
    } catch (err) {
      console.error("Erro ao remover foto:", err);
      showToast("Erro ao remover foto do servidor.", "error");
    }
  };

  const { accentColor, themeAccentColors } = useThemeColors();

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
    { key: "photo", label: "Foto de perfil", done: !!(previewUrl || User?.avatar) },
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

  const completedCount = steps.filter((s) => s.done).length;
  const completionPercentage = Math.round(
    (completedCount / steps.length) * 100,
  );

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      showToast("O nome completo não pode ficar vazio.", "warning");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim() || null,
        birthdate: birthdate || null,
        address: address.trim() || null,
        avatarUrl: previewUrl || null,
      };

      const response = await api.put("/users/me", payload);

      if (response?.data) {
        setUser({
          ...User,
          ...response.data,
          avatar: response.data.avatarUrl || previewUrl || User?.avatar,
        });
      } else if (User) {
        setUser({
          ...User,
          name: payload.name,
          phone: payload.phone || undefined,
          birthdate: payload.birthdate || undefined,
          address: payload.address || undefined,
          avatar: previewUrl || User?.avatar,
        });
      }

      showToast("Perfil atualizado com sucesso no banco!", "success");
    } catch (err: any) {
      console.error("Erro ao salvar perfil:", err);
      showToast("Erro ao salvar dados no servidor.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      setExporting(true);
      let transactions = [];
      try {
        const res = await api.get("/transactions");
        if (res?.data?.data) {
          transactions = res.data.data;
        }
      } catch (e) {
        console.warn("Não foi possível buscar transações para o backup:", e);
      }

      const backupData = {
        exportedAt: new Date().toISOString(),
        user: {
          name,
          email,
          phone,
          birthdate,
          address,
        },
        transactions,
      };

      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `budget-backup-${new Date().toISOString().split("T")[0]}.json`,
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast("Dados exportados com sucesso!", "success");
    } catch (err) {
      showToast("Erro ao exportar dados.", "error");
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "ESTA AÇÃO É IRREVERSÍVEL. Todos os seus dados financeiros, orçamentos, históricos de transações e metas serão apagados permanentemente do sistema.\n\nTem certeza absoluta de que deseja excluir sua conta?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      showToast("Excluindo conta e limpando dados...", "info");

      await api.delete("/users/me");

      localStorage.removeItem("token");
      setUser(null);
      showToast("Conta excluída com sucesso.", "success");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      showToast("Erro ao excluir conta. Verifique sua conexão.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const theme = themeAccentColors[accentColor];

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
                {previewUrl || User?.avatar ? (
                  <img
                    src={previewUrl || User?.avatar}
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
                  ref={inputRef}
                  onChange={HandleSelectFile}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <div className="pb-1 flex-1">
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <h2 className="text-xl font-bold tracking-tight">
                    {name}
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
                  onClick={() => handleAvatarClick()}
                  className={secondaryBtn}
                >
                  Alterar Foto
                </button>
                {(previewUrl || User?.avatar) && (
                  <button
                    onClick={handleRemovePhoto}
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
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className={`${primaryBtn} ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <Save className="w-4 h-4" /> {saving ? "Salvando..." : "Salvar Alterações"}
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
                disabled={exporting}
                className={`${secondaryBtn} w-full sm:w-auto flex items-center justify-center gap-2 ${exporting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <FileDown className="w-4 h-4" /> {exporting ? "Exportando..." : "Exportar"}
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
                disabled={deleting}
                className={`w-full sm:w-auto px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold active:scale-[0.98] transition-all cursor-pointer ${deleting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {deleting ? "Excluindo..." : "Excluir Conta"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
