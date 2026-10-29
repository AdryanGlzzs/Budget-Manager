import React, { createContext, useContext, useState } from "react";

export type SupportedTimezone = "GMT-3" | "PST" | "EST" | "GMT+0";
export type SupportedDateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

export interface TimezoneConfig {
  timeZone: string;
  label: string;
}

export const TIMEZONE_CONFIGS: Record<SupportedTimezone, TimezoneConfig> = {
  "GMT-3": {
    timeZone: "America/Sao_Paulo",
    label: "GMT-3 (Horário de Brasília)",
  },
  PST: {
    timeZone: "America/Los_Angeles",
    label: "PST - Pacific Standard Time",
  },
  EST: {
    timeZone: "America/New_York",
    label: "EST - Eastern Standard Time",
  },
  "GMT+0": {
    timeZone: "UTC",
    label: "GMT+0 - Greenwich Mean Time",
  },
};

export const DATE_FORMAT_CONFIGS: Record<SupportedDateFormat, { label: string; locale: string }> = {
  "DD/MM/YYYY": { label: "DD/MM/YYYY", locale: "pt-BR" },
  "MM/DD/YYYY": { label: "MM/DD/YYYY", locale: "en-US" },
  "YYYY-MM-DD": { label: "YYYY-MM-DD", locale: "sv-SE" },
};

interface DatePreferencesContextType {
  timezone: SupportedTimezone;
  setTimezone: (tz: SupportedTimezone) => void;
  dateFormat: SupportedDateFormat;
  setDateFormat: (format: SupportedDateFormat) => void;
}

const DatePreferencesContext = createContext<DatePreferencesContextType | undefined>(undefined);

export const DatePreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timezone, setTimezoneState] = useState<SupportedTimezone>(() => {
    const saved = localStorage.getItem("preferred_timezone") as SupportedTimezone;
    return saved && TIMEZONE_CONFIGS[saved] ? saved : "GMT-3";
  });

  const [dateFormat, setDateFormatState] = useState<SupportedDateFormat>(() => {
    const saved = localStorage.getItem("preferred_date_format") as SupportedDateFormat;
    return saved && DATE_FORMAT_CONFIGS[saved] ? saved : "DD/MM/YYYY";
  });

  const setTimezone = (newTz: SupportedTimezone) => {
    if (TIMEZONE_CONFIGS[newTz]) {
      setTimezoneState(newTz);
      localStorage.setItem("preferred_timezone", newTz);
      window.dispatchEvent(new Event("timezone_changed"));
    }
  };

  const setDateFormat = (newFormat: SupportedDateFormat) => {
    if (DATE_FORMAT_CONFIGS[newFormat]) {
      setDateFormatState(newFormat);
      localStorage.setItem("preferred_date_format", newFormat);
      window.dispatchEvent(new Event("date_format_changed"));
    }
  };

  return (
    <DatePreferencesContext.Provider
      value={{
        timezone,
        setTimezone,
        dateFormat,
        setDateFormat,
      }}
    >
      {children}
    </DatePreferencesContext.Provider>
  );
};

export const useDatePreferences = (): DatePreferencesContextType => {
  const context = useContext(DatePreferencesContext);
  if (!context) {
    throw new Error("useDatePreferences deve ser usado dentro de DatePreferencesProvider");
  }
  return context;
};

