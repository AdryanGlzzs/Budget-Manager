import {
  Twitter,
  Linkedin,
  MessageCircle,
  Instagram,
  Youtube,
} from "lucide-react";
import Logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white px-12 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <img src={Logo} alt="" className="w-50" />
            </div>

            <p className="text-[18px] leading-relaxed max-w-md text-white">
              Comece a gerenciar seu dinheiro de forma mais inteligente e
              alcance seus objetivos financeiros com facilidade.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[18px] font-semibold mb-6">Links Rápidos</h3>
            <nav className="space-y-4">
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Início
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Funcionalidades
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Benefícios
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Preços
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Depoimentos
              </a>
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[18px] font-semibold mb-6">
              Suporte e Recursos
            </h3>
            <nav className="space-y-4">
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Central de Ajuda
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                FAQs
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="block text-[16px] text-gray-400 hover:text-white transition-colors"
              >
                Termos e Condições
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-[14px] text-gray-400">
            Copyright © 2025 eluxspace. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <p className="text-[14px] text-gray-400">
            Dinheiro Inteligente, Futuro Melhor.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
