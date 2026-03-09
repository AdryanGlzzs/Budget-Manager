import {
  LayoutGrid,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  Plus,
  ArrowRightLeft,
  FileText,
  Target,
  CreditCard,
  Home,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";


export interface SidebarMobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarMobileMenuProps) => {
  const { pathname } = useLocation();

  const menuItems = [
    { id: "home", label: "Início", icon: Home, path: "/" },
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
      className={`sm:left-0 fixed h-[calc(100vh-89px)] z-[100] top-0 sm:top-10 right-0 w-64 min-h-screen border-r border-white/10 bg-[#08080f]/90 backdrop-blur-sm p-6 flex-col transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full sm:translate-x-0"
      }`}
    >
      <button onClick={() => setOpen(false)} className="mb-6 text-gray-400">
        <X/>
      </button>

      <div className="space-y-3 mb-8">
        <button className="w-full mt-10 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Transação
        </button>

        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all flex items-center justify-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Transferência
        </button>

        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Criar Orçamento
        </button>
      </div>

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
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-[14px] transition-all ${
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
