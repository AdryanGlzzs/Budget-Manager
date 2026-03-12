import Logo from "../images/logo.png";
import { Search, Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  function handleOpenMenu() {
    setOpen(!open);
  }

  return (
    <header className="border-b sm:z-20 border-white/10 bg-[#050510]/80 backdrop-blur-xl w-[100%] top-0 fixed lg:h-22.5">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={Logo} className="w-32" alt="Daryan Logo" />
            <div className="hidden sm:flex h-8 w-px bg-white/10 md:hidden lg:flex"></div>
            <div className="hidden sm:flex md:hidden lg:flex">
              <div className="text-[13px] text-gray-500">
                Bem-vindo de volta,
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
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[14px] w-72 focus:outline-none focus:border-purple-500/50 placeholder-gray-600 backdrop-blur-sm hover:bg-white/10 transition-all"
                />
              </div>

              <div className="flex justify-center place-items-center gap-4 md:ml-10 lg:hidden">
                <div className="flex sm:hidden relative md:flex">
                  <Bell className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                  <div className="absolute -top-1 -right- 1 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                </div>

                <div className="flex sm:hidden relative md:flex lg:hidden">
                  <Search className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                </div>

                <div className="flex sm:hidden md:flex lg:hidden">
                  <button onClick={handleOpenMenu}>
                    <Menu className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex relative md:hidden">
              <Bell className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>

            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10 md:hidden lg:flex">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center font-semibold">
                AG
              </div>
              <div>
                <div className="text-[14px] font-medium">Adryan G</div>
                <div className="text-[12px] text-gray-500">Plano Pro</div>
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
