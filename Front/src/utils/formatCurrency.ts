import { CURRENCY_CONFIGS } from "../contexts/CurrencyContext";
import type { SupportedCurrency } from "../contexts/CurrencyContext"

export const formatCurrency = (
  value: number | string | null | undefined,
  overrideCurrency?: SupportedCurrency
): string => {
  const numericValue = Number(value || 0);

  const preferredCurrency =
    overrideCurrency ||
    (localStorage.getItem("preferred_currency") as SupportedCurrency) ||
    "BRL";

  const config =
    CURRENCY_CONFIGS[preferredCurrency] || CURRENCY_CONFIGS["BRL"];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(numericValue);
};
