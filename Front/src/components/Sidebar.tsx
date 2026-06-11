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

export interface SidebarMobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarMobileMenuProps) => {
  const { pathname } = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Visão Geral",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transações",
      icon: Receipt,
      path: "/transactions",
    },
    { id: "budgets", label: "Orçamento", icon: Wallet, path: "/budgets" },
    { id: "savings", label: "Metas", icon: Target, path: "/savings-goals" },
    {
      id: "analytics",
      label: "Relatórios",
      icon: BarChart3,
      path: "/analytics",
    },
    { id: "pricing", label: "Planos", icon: CreditCard, path: "/pricing" },
    {
      id: "settings",
      label: "Configurações",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={`fixed h-[calc(100vh-89px)] z-[100] top-0 lg:top-[89px] w-64 min-h-screen border-l lg:border-l-0 lg:border-r border-white/10 bg-[#050510]/80 backdrop-blur-xl p-6 flex flex-col transition-transform duration-300 
    ${open ? "translate-x-0" : "translate-x-full lg:translate-x-0"} 
    right-0 lg:right-auto lg:left-0 lg:flex lg:mt-0`}
    >
      <button
        onClick={() => setOpen(false)}
        className="mb-6 text-gray-400 sm:hidden md:flex lg:hidden"
      >
        <X />
      </button>

      <nav className="space-y-2 flex-1">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-3 px-3">
          Menu
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-4.5 rounded-xl font-medium text-[14px] transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
