import {
  TIMEZONE_CONFIGS,
  DATE_FORMAT_CONFIGS,
} from "../contexts/DatePreferencesContext";

import type {
  SupportedTimezone,
  SupportedDateFormat,
} from "../contexts/DatePreferencesContext"

export const formatDate = (
  dateInput: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const savedTzKey =
    (localStorage.getItem("preferred_timezone") as SupportedTimezone) || "GMT-3";
  const savedFormatKey =
    (localStorage.getItem("preferred_date_format") as SupportedDateFormat) ||
    "DD/MM/YYYY";

  const timeZone = TIMEZONE_CONFIGS[savedTzKey]?.timeZone || "America/Sao_Paulo";
  const locale = DATE_FORMAT_CONFIGS[savedFormatKey]?.locale || "pt-BR";

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  }).format(date);
};

