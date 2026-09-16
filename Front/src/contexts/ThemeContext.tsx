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
    themeAccentColors: Record<accentColor, { bg: string, border: string, activeBg: string, primaryHover: string, focus: string, text: string, bgLight: string, ring: string, shadow: string, glow: string }>
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

    const [accentColor, setAccentColor] = useState<accentColor>("blue")

    const themeAccentColors = {
        purple: {
            bg: "bg-purple-500",
            border: "border-purple-500",
            activeBg:
                "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30",
            primary: "from-purple-600 to-purple-500",
            primaryHover:
                "hover:shadow-purple-600/40 bg-gradient-to-r from-purple-600 to-purple-500",
            focus: "focus:border-purple-500/50 focus:ring-purple-500/10",
            text: "text-purple-400",
            textMuted: "text-purple-300",
            bgLight: "bg-purple-500/10 border-purple-500/20",
            ring: "ring-purple-500",
            shadow: "shadow-purple-500/20",
            glow: "from-purple-500/10 via-transparent to-blue-500/10",
        },
        blue: {
            primary: "from-blue-600 to-blue-500",
            primaryHover:
                "hover:shadow-blue-600/40 bg-gradient-to-r from-blue-600 to-blue-500",
            focus: "focus:border-blue-500/50 focus:ring-blue-500/10",
            text: "text-blue-400",
            textMuted: "text-blue-300",
            bg: "bg-blue-500/20",
            bgLight: "bg-blue-500/10 border-blue-500/20",
            border: "border-blue-500/30",
            ring: "ring-blue-500",
            shadow: "shadow-blue-500/20",
            glow: "from-blue-500/10 via-transparent to-purple-500/10",
            activeBg:
                "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30",
        },
        emerald: {
            primary: "from-emerald-600 to-emerald-500",
            primaryHover:
                "hover:shadow-emerald-600/40 bg-gradient-to-r from-emerald-600 to-emerald-500",
            focus: "focus:border-emerald-500/50 focus:ring-emerald-500/10",
            text: "text-emerald-400",
            textMuted: "text-emerald-300",
            bg: "bg-emerald-500/20",
            bgLight: "bg-emerald-500/10 border-emerald-500/20",
            border: "border-emerald-500/30",
            ring: "ring-emerald-500",
            shadow: "shadow-emerald-500/20",
            glow: "from-emerald-500/10 via-transparent to-teal-500/10",
            activeBg:
                "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/30",
        },
        pink: {
            primary: "from-pink-600 to-pink-500",
            primaryHover:
                "hover:shadow-pink-600/40 bg-gradient-to-r from-pink-600 to-pink-500",
            focus: "focus:border-pink-500/50 focus:ring-pink-500/10",
            text: "text-pink-400",
            textMuted: "text-pink-300",
            bg: "bg-pink-500/20",
            bgLight: "bg-pink-500/10 border-pink-500/20",
            border: "border-pink-500/30",
            ring: "ring-pink-500",
            shadow: "shadow-pink-500/20",
            glow: "from-pink-500/10 via-transparent to-rose-500/10",
            activeBg:
                "bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-600/30",
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
                primaryBtn,

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