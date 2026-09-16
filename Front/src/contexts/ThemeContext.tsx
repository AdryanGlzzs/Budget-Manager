import { useContext, createContext, type ReactNode, useState } from "react";
import { themes } from "../themes/themes";

export type accentColor = "purple" | "blue" | "emerald" | "pink"

interface ThemeProps {
    children: ReactNode
}

interface ThemeContextType {
    accentColor: accentColor;
    setAccentColor: (color: accentColor) => void;
    colors: readonly accentColor[];
    themeAccentColors: Record<accentColor, { bg: string, border: string, activeBg: string }>
    styles: {
        cardGlow: string;
        cardBase: string;
        inputBase: string;
        labelBase: string;
        primaryBtn: string
    }
}

const ThemeContext = createContext<ThemeContextType | null>(null)


export const ThemeContextProvider = ({ children }: ThemeProps) => {

    const [accentColor, setAccentColor] = useState<accentColor>("pink")

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

    const theme = themes[accentColor] ?? themes.purple;

    const cardGlow = `absolute inset-0 bg-gradient-to-br ${theme.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`;
    const cardBase =
        "relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl";
    const inputBase = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none ${theme.focus} focus:bg-white/10 focus:ring-4 backdrop-blur-sm hover:bg-white/10 transition-all text-zinc-100 placeholder-zinc-500`;
    const labelBase =
        "text-xs font-semibold text-zinc-300 mb-2 block uppercase tracking-wider";
    const primaryBtn = `flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${theme.primary} rounded-xl text-sm font-semibold hover:shadow-lg ${theme.primaryHover} active:scale-[0.98] transition-all cursor-pointer`;

    const colors: readonly accentColor[] = ["purple", "blue", "emerald", "pink"] as const;



    return (
        <ThemeContext.Provider value={{
            accentColor, setAccentColor, colors, themeAccentColors, styles: {
                cardBase,
                cardGlow,
                inputBase,
                labelBase,
                primaryBtn
            }, 
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeColors = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useThemeColors tem que ser usado dentro de um ThemeContextProvider")
    }

    return context
}