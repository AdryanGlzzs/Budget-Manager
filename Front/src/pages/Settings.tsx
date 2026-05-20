import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  User,
  type LucideIcon,
} from "lucide-react";

import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { Billing } from "../components/billing";
import { Notifications } from "../components/notifications";
import { Preferences } from "../components/Preferences";
import { Profile } from "../components/Profile";
import { Security } from "../components/Security";

import { themes } from "../themes/themes";

type TabId =
  | "profile"
  | "security"
  | "notifications"
  | "preferences"
  | "billing";

type AccentColor = "purple" | "blue" | "emerald" | "pink";

type ToastType = "success" | "info" | "error";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type TabItem = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const tabs: TabItem[] = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "security", label: "Segurança", icon: Lock },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "preferences", label: "Preferências", icon: Globe },
  { id: "billing", label: "Faturamento", icon: CreditCard },
];

const glowColors = {
  purple: {
    accent1: "bg-purple-600/15",
    accent2: "bg-blue-600/10",
  },

  blue: {
    accent1: "bg-blue-600/15",
    accent2: "bg-purple-600/10",
  },

  emerald: {
    accent1: "bg-emerald-600/15",
    accent2: "bg-teal-600/10",
  },

  pink: {
    accent1: "bg-pink-600/15",
    accent2: "bg-rose-600/10",
  },
};

const pageBg = "min-h-screen bg-[#050510] text-white overflow-x-hidden pb-12";

const Settings = () => {
  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const [fadeKey, setFadeKey] = useState(0);

  const [accentColor] = useState<AccentColor>("purple");

  const [toasts, setToasts] = useState<Toast[]>([]);

  const theme = themes[accentColor];

  const glows = glowColors[accentColor];

  function switchTab(id: TabId) {
    setActiveTab(id);
    setFadeKey((prev) => prev + 1);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  function renderTabContent() {
    switch (activeTab) {
      case "profile":
        return <Profile />;

      case "security":
        return <Security />;

      case "notifications":
        return <Notifications />;

      case "preferences":
        return <Preferences />;

      case "billing":
        return <Billing />;

      default:
        return null;
    }
  }

  return (
    <div className={pageBg}>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute left-[-200px] top-[-200px] w-[600px] h-[600px] rounded-full blur-[140px] opacity-60 mix-blend-screen ${glows.accent1}`}
        />

        <div
          className={`absolute right-[-200px] top-[-200px] w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 mix-blend-screen ${glows.accent2}`}
        />

        <div
          className={`absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 mix-blend-screen ${glows.accent2}`}
        />

        <div
          className={`absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] rounded-full blur-[140px] opacity-60 mix-blend-screen ${glows.accent1}`}
        />
      </div>

      <div className="relative z-10">
        <Header />

        <div className="flex flex-col lg:flex-row">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 max-w-[1400px] p-4 sm:p-8 mt-20">
            {/* Header */}
            <section className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Configurações
              </h1>

              <p className="text-sm sm:text-base text-zinc-400">
                Gerencie as credenciais, segurança e preferências da sua conta
                corporativa
              </p>
            </section>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Tabs */}
              <aside className="w-full md:w-56 shrink-0">
                <div className="md:sticky md:top-28 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none border-b border-white/5 md:border-none">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;

                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => switchTab(tab.id)}
                        className={`
                          flex items-center gap-3 px-4 py-3
                          rounded-xl text-sm font-semibold
                          whitespace-nowrap transition-all
                          active:scale-[0.97] cursor-pointer
                          
                          ${
                            isActive
                              ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg ${theme.shadow}`
                              : "text-zinc-400 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <Icon className="w-4 h-4 shrink-0" />

                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <section
                key={fadeKey}
                className="flex-1 min-w-0"
                style={{
                  animation: "fadeIn 0.25s ease-out forwards",
                }}
              >
                {renderTabContent()}
              </section>
            </div>
          </main>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              p-4 rounded-xl border shadow-2xl
              flex items-center gap-3
              backdrop-blur-md
              transition-all duration-300
              pointer-events-auto

              ${
                toast.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-300"
                  : toast.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-300"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-300"
              }
            `}
            style={{
              animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div className="flex-1 text-xs font-semibold">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
