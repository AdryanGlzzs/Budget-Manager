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
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  currentPage: string;
}

const Sidebar = ({ currentPage }: SidebarProps) => {
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
    <aside className="w-64 min-h-screen border-r border-white/10 bg-[#08080f]/90 backdrop-blur-sm p-6 top-[83px] h-[calc(100vh-89px)] fixed z-10 flex-col">
      <div className="space-y-3 mb-8">
        <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3.5 rounded-xl text-[14px] font-semibold shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>

        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all flex items-center justify-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Transfer
        </button>

        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Create Budget
        </button>
      </div>

      <nav className="space-y-2 flex-1">
        <div className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-3 px-3">
          Menu
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

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
