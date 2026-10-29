import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedCurrency = "BRL" | "USD" | "EUR" | "GBP";

interface CurrencyConfig {
  locale: string;
  currency: SupportedCurrency;
  label: string;
}

export const CURRENCY_CONFIGS: Record<SupportedCurrency, CurrencyConfig> = {
  BRL: {
    locale: "pt-BR",
    currency: "BRL",
    label: "BRL - Real Brasileiro",
  },
  USD: {
    locale: "en-US",
    currency: "USD",
    label: "USD - Dólar Americano",
  },
  EUR: {
    locale: "de-DE",
    currency: "EUR",
    label: "EUR - Euro",
  },
  GBP: {
    locale: "en-GB",
    currency: "GBP",
    label: "GBP - Libra Esterlina",
  },
};

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  format: (value: number | string | null | undefined) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    const saved = localStorage.getItem("preferred_currency") as SupportedCurrency;
    return saved && CURRENCY_CONFIGS[saved] ? saved : "BRL";
  });

  const setCurrency = (newCurrency: SupportedCurrency) => {
    if (CURRENCY_CONFIGS[newCurrency]) {
      setCurrencyState(newCurrency);
      localStorage.setItem("preferred_currency", newCurrency);

      window.dispatchEvent(new Event("currency_changed"));
    }
  };

  const format = (value: number | string | null | undefined): string => {
    const numericValue = Number(value || 0);
    const config = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS["BRL"];

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
    }).format(numericValue);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency deve ser usado dentro de um CurrencyContextProvider");
  }
  return context;
};
