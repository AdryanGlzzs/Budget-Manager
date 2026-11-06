import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import Logo from "../images/logo.png";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 w-120 h-120 bg-emerald-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute -right-40 -bottom-40 w-120 h-120 bg-purple-600/15 rounded-full blur-[120px]"></div>
      </div>

      <header className="relative z-10 w-full border-b border-white/10 py-5 bg-[#050510]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <img src={Logo} alt="Budget Manager" className="h-8 w-auto" />
            <span className="font-bold text-lg tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Budget Manager
            </span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacidade & Segurança
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Política de Privacidade
          </h1>
          <p className="text-gray-400 text-sm">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="space-y-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-sm text-gray-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">1. Informações que Coletamos</h2>
            <p>
              Coletamos informações necessárias para a prestação de nossos serviços, tais como:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
              <li><strong>Dados cadastrais:</strong> nome completo, endereço de e-mail e dados de contato.</li>
              <li><strong>Dados financeiros inseridos:</strong> transações, categorias, orçamentos e metas de economia voluntariamente cadastrados.</li>
              <li><strong>Dados de navegação e autenticação:</strong> registros de acesso, endereço IP, tipo de navegador e tokens de segurança (incluindo validações do Cloudflare Turnstile).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">2. Como Usamos as Informações</h2>
            <p>
              Seus dados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
              <li>Fornecer, personalizar e manter as funcionalidades da sua conta e painéis de controle;</li>
              <li>Gerar relatórios de fluxo de caixa, análises inteligentes e previsões financeiras solicitadas;</li>
              <li>Garantir a segurança da plataforma, prevenindo fraudes e abusos;</li>
              <li>Processar cobranças e faturamentos dos serviços contratados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">3. Armazenamento e Segurança</h2>
            <p>
              Adotamos práticas de ponta em segurança da informação, como criptografia em trânsito (HTTPS/TLS) e criptografia em repouso. Nunca armazenamos dados de cartão de crédito em nossos servidores; todos os dados de pagamento são transmitidos de forma segura e tokenizada diretamente aos processadores homologados (ex.: Mercado Pago).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">4. Compartilhamento de Dados</h2>
            <p>
              Não comercializamos, alugamos ou compartilhamos seus dados financeiros pessoais com terceiros para fins de marketing. O compartilhamento ocorre unicamente com prestadores de infraestrutura e serviços essenciais (hospedagem em nuvem, provedores de autenticação como Google/Firebase e processadores de pagamento), sob estritos acordos de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">5. Seus Direitos (LGPD)</h2>
            <p>
              Você possui total controle sobre seus dados. A qualquer momento, você pode:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
              <li>Acessar e exportar seus dados em formato padrão (como CSV);</li>
              <li>Corrigir informações inexatas ou desatualizadas no painel de configurações;</li>
              <li>Solicitar a exclusão definitiva da sua conta e de todos os registros vinculados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">6. Contato com o Encarregado de Dados</h2>
            <p>
              Caso tenha dúvidas ou queira exercer quaisquer dos seus direitos de privacidade, entre em contato com nosso time de privacidade através do e-mail de suporte da plataforma.
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center justify-between text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Budget Manager. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-gray-300 underline">Termos de Serviço</Link>
            <Link to="/login" className="hover:text-gray-300 underline">Fazer Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;

