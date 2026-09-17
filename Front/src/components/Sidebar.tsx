import { useEffect } from "react";
import {
  LayoutGrid,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  Target,
  CreditCard,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useThemeColors } from "../contexts/ThemeContext";

export interface SidebarMobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Visão Geral", icon: LayoutGrid, path: "/dashboard" },
  { id: "transactions", label: "Transações", icon: Receipt, path: "/transactions" },
  { id: "budgets", label: "Orçamento", icon: Wallet, path: "/budgets" },
  { id: "savings", label: "Metas", icon: Target, path: "/savings-goals" },
  { id: "analytics", label: "Relatórios", icon: BarChart3, path: "/analytics" },
  { id: "pricing", label: "Planos", icon: CreditCard, path: "/pricing" },
  { id: "settings", label: "Configurações", icon: Settings, path: "/settings" },
];

const Sidebar = ({ open, setOpen }: SidebarMobileMenuProps) => {
  const { pathname } = useLocation();
  const { accentColor, themeAccentColors } = useThemeColors();
  const theme = themeAccentColors[accentColor];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      <aside
        className={`fixed h-[calc(100vh-89px)] z-[100] top-0 lg:top-[89px] w-64 border-l lg:border-l-0 lg:border-r ${theme.border} ${theme.bg} backdrop-blur-xl p-5 flex flex-col transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        right-0 lg:right-auto lg:left-0 lg:flex lg:mt-0 overflow-hidden`}
      >
        <div
          className={`pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-gradient-to-br ${theme.glow} blur-3xl opacity-90 transition-all duration-700`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-gradient-to-tl ${theme.glow} blur-3xl opacity-80 transition-all duration-700`}
          aria-hidden="true"
        />

        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
          className={`relative mb-6 self-end text-gray-400 hover:text-white transition-colors sm:hidden md:flex lg:hidden focus:outline-none focus-visible:ring-2 ${theme.ring} rounded-lg p-1`}
        >
          <X className="w-5 h-5" />
        </button>

        <nav className="relative space-y-2.5 flex-1">
          <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-3 px-3">
            Menu
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-10 px-4 py-5 rounded-xl font-medium text-[14px] transition-all duration-200 focus:outline-none focus-visible:ring-2 ${theme.ring} ${isActive
                    ? theme.activeBg
                    : `text-gray-400 hover:text-white ${theme.bgLight} hover:bg-opacity-100 bg-opacity-0 hover:${theme.bgLight}`
                  }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-white transition-opacity duration-200 ${isActive ? "opacity-90" : "opacity-0"
                    }`}
                  aria-hidden="true"
                />

                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isActive ? "" : `group-hover:${theme.text} group-hover:scale-110`
                    }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>  

      </aside>

    </div>
  );
};

export default Sidebar;