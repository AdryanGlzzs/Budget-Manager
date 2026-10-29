import { themes } from "../themes/themes";
import { useState } from "react";
import { ChevronDown, Save } from "lucide-react";
import { useThemeColors } from "../contexts/ThemeContext";
import { useToast } from "../contexts/ToastContext";
import { useTranslation } from "react-i18next";
import { useCurrency, CURRENCY_CONFIGS } from "../contexts/CurrencyContext";
import type { SupportedCurrency } from "../contexts/CurrencyContext";
import {
  useDatePreferences,
  TIMEZONE_CONFIGS,
  DATE_FORMAT_CONFIGS,
} from "../contexts/DatePreferencesContext";
import type {
  SupportedTimezone,
  SupportedDateFormat,
} from "../contexts/DatePreferencesContext";

export const Preferences = () => {
  const { accentColor, setAccentColor, themeAccentColors } = useThemeColors();
  const { showToast } = useToast();
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const { timezone, setTimezone, dateFormat, setDateFormat } =
    useDatePreferences();

  const [language, setLanguage] = useState(i18n.language || "pt");

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleSavePreferences = () => {
    i18n.changeLanguage(language);
    showToast(t("preferences.saveSuccess"), "success");
  };

  const themeLabels: Record<string, string> = {
    purple: t("preferences.themes.purple"),
    blue: t("preferences.themes.blue"),
    emerald: t("preferences.themes.emerald"),
    pink: t("preferences.themes.pink"),
  };

  const colors = ["purple", "blue", "emerald", "pink"] as const;
  const theme = themes[accentColor];

  const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;
  const cardBase =
    "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";
  const inputBase = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none ${theme.focus} focus:bg-white/10 focus:ring-4 backdrop-blur-sm hover:bg-white/10 transition-all text-zinc-100 placeholder-zinc-500`;
  const labelBase =
    "text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider";
  const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;

  return (
    <section className="relative group">
      <div className={cardGlow} />
      <div className={cardBase}>
        <h2 className="text-lg font-bold tracking-tight mb-6">
          {t("preferences.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Moeda Local */}
          <div>
            <label className={labelBase}>{t("preferences.localCurrency")}</label>
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                className={`${inputBase} appearance-none pr-10`}
              >
                {(Object.keys(CURRENCY_CONFIGS) as SupportedCurrency[]).map((curKey) => (
                  <option key={curKey} value={curKey} className="bg-[#050510] text-white">
                    {CURRENCY_CONFIGS[curKey].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Idioma da Interface com i18n */}
          <div>
            <label className={labelBase}>{t("preferences.interfaceLanguage")}</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value="pt" className="bg-[#050510] text-white">
                  {t("preferences.languages.pt")}
                </option>
                <option value="en" className="bg-[#050510] text-white">
                  {t("preferences.languages.en")}
                </option>
                <option value="es" className="bg-[#050510] text-white">
                  {t("preferences.languages.es")}
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Fuso Horário */}
          <div>
            <label className={labelBase}>{t("preferences.timezone")}</label>
            <div className="relative">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value as SupportedTimezone)}
                className={`${inputBase} appearance-none pr-10`}
              >
                {(Object.keys(TIMEZONE_CONFIGS) as SupportedTimezone[]).map((tzKey) => (
                  <option key={tzKey} value={tzKey} className="bg-[#050510] text-white">
                    {TIMEZONE_CONFIGS[tzKey].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Formato de Data */}
          <div>
            <label className={labelBase}>{t("preferences.dateFormat")}</label>
            <div className="relative">
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value as SupportedDateFormat)}
                className={`${inputBase} appearance-none pr-10`}
              >
                {(Object.keys(DATE_FORMAT_CONFIGS) as SupportedDateFormat[]).map((fmtKey) => (
                  <option key={fmtKey} value={fmtKey} className="bg-[#050510] text-white">
                    {DATE_FORMAT_CONFIGS[fmtKey].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Cor do Tema */}
          <div className="md:col-span-2 mt-4 pt-4 border-t border-white/5">
            <label className={labelBase}>{t("preferences.theme")}</label>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {colors.map((color) => {
                const isActive = accentColor === color;
                const c = themeAccentColors[color];
                const dotColors: Record<typeof color, string> = {
                  purple: "bg-purple-500 shadow-purple-500/50",
                  blue: "bg-blue-500 shadow-blue-500/50",
                  emerald: "bg-emerald-500 shadow-emerald-500/50",
                  pink: "bg-pink-500 shadow-pink-500/50",
                };
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setAccentColor(color);
                      showToast(
                        `${themeLabels[color]}!`,
                        "success"
                      );
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? `${c.activeBg} ${c.border} text-white shadow-lg ${theme.shadow}`
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${dotColors[color]} shadow-sm`} />
                    {themeLabels[color]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 border-t border-white/5 pt-5">
          <button onClick={handleSavePreferences} className={primaryBtn}>
            <Save className="w-4 h-4" /> {t("preferences.saveButton")}
          </button>
        </div>
      </div>
    </section>
  );
};
