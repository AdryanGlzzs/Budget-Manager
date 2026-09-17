import Logo from "../images/logo.png";
import { Search, Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useThemeColors } from "../contexts/ThemeContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const { themeAccentColors, accentColor } = useThemeColors();
  const theme = themeAccentColors[accentColor];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const Hour = time.getHours();

  function handleOpenMenu() {
    setOpen(!open);
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b ${theme.border} ${theme.bg} backdrop-blur-xl w-full lg:h-22.5 overflow-hidden transition-colors duration-500`}>
    
      <div
        className={`pointer-events-none absolute -top-20 right-1/4 h-56 w-[500px] rounded-full bg-gradient-to-r ${theme.glow} blur-3xl opacity-90 transition-all duration-700`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -bottom-24 left-10 h-48 w-80 rounded-full bg-gradient-to-tr ${theme.glow} blur-3xl opacity-70 transition-all duration-700`}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={Logo} className="w-32" alt="Daryan Logo" />
            <div className="hidden sm:flex h-8 w-px bg-white/10 md:hidden lg:flex"></div>
            <div className="hidden sm:flex md:hidden lg:flex">
              <div className="text-[13px] text-gray-500">
                {Hour <= 12 ? "Bom dia" : Hour < 18 ? "Boa tarde" : "Boa noite"}
              </div>
              <div className="text-[17px] font-semibold ml-1">Adryan Glzzs</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex">
              <div className="hidden sm:flex relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  className={`bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[14px] w-72 focus:outline-none ${theme.focus} placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all`}
                />
              </div>

              <div className="flex justify-center place-items-center gap-4 md:ml-10 lg:hidden">
                <div className="flex sm:hidden relative md:flex">
                  <Bell className={`w-5 h-5 text-gray-400 hover:${theme.text} transition-colors cursor-pointer`} />
                  <div className={`absolute -top-1 -right-1 w-2 h-2 ${theme.activeBg} rounded-full ${theme.shadow}`}></div>
                </div>

                <div className="flex sm:hidden relative md:flex lg:hidden">
                  <Search className={`text-gray-400 hover:${theme.text} transition-colors cursor-pointer`} />
                </div>

                <div className="flex sm:hidden md:flex lg:hidden">
                  <button onClick={handleOpenMenu}>
                    <Menu className={`text-gray-400 hover:${theme.text} transition-colors cursor-pointer`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex relative md:hidden">
              <Bell className={`w-5 h-5 text-gray-400 hover:${theme.text} transition-colors cursor-pointer`} />
              <div className={`absolute -top-1 -right-1 w-2 h-2 ${theme.activeBg} rounded-full ${theme.shadow}`}></div>
            </div>

            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10 md:hidden lg:flex">
              <div className={`w-10 h-10 ${theme.activeBg} rounded-full flex items-center justify-center font-semibold text-white`}>
                AG
              </div>
              <div>
                <div className="text-[14px] font-medium">Adryan G</div>
                <div className={`text-[12px] ${theme.text}`}>Plano Pro</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
