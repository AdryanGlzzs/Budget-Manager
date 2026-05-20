import { themes } from "../themes/themes";
import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";

export const Preferences = () => {
  const [currency, setCurrency] = useState("USD - Dólar Americano");
  const [language, setLanguage] = useState("Português (BR)");
  const [timezone, setTimezone] = useState("GMT-3 (Horário de Brasília)");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [accentColor, setAccentColor] = useState<
    "purple" | "blue" | "emerald" | "pink"
  >("purple");
  const [toasts, setToasts] = useState<
    { id: string; message: string; type: "success" | "info" | "error" }[]
  >([]);

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

  const handleSavePreferences = () => {
    showToast("Preferências gerais salvas com sucesso!", "success");
  };

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

  const theme = themes[accentColor];

  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;

  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";

  const inputBase = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none ${theme.focus} focus:bg-white/10 focus:ring-4 backdrop-blur-sm hover:bg-white/10 transition-all text-zinc-100 placeholder-zinc-500`;
  const labelBase =
    "text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider";

  const colors = ["purple", "blue", "emerald", "pink"] as const;

  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;

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

          <div className="md:col-span-2 mt-4 pt-4 border-t border-white/5">
            <label className={labelBase}>Cor de Destaque da Interface</label>
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
                    <span className={`w-3.5 h-3.5 rounded-full ${c.bg}`} />
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
};
