import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";
import Logo from "../images/logo.png";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 w-120 h-120 bg-purple-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute -right-40 -bottom-40 w-120 h-120 bg-blue-600/15 rounded-full blur-[120px]"></div>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            Documento Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Termos de Serviço
          </h1>
          <p className="text-gray-400 text-sm">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="space-y-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10 backdrop-blur-sm text-gray-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar os serviços do <strong>Budget Manager</strong>, você concorda expressamente em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Caso discorde de qualquer parte destes termos, você não deverá utilizar a aplicação.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">2. Descrição do Serviço</h2>
            <p>
              O Budget Manager é uma plataforma de gestão financeira pessoal e empresarial, que oferece ferramentas para planejamento orçamentário, controle de receitas e despesas, projeção de metas e geração de relatórios analíticos.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">3. Cadastro e Segurança da Conta</h2>
            <p>
              Para acessar as funcionalidades completas, é necessário efetuar um cadastro com informações verídicas e atualizadas. Você é o único responsável pela confidencialidade de sua senha e por todas as atividades realizadas em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">4. Assinaturas e Pagamentos</h2>
            <p>
              Determinadas funcionalidades avançadas podem exigir a contratação de planos de assinatura pagos. Os pagamentos são processados por gateways seguros parceiros (ex.: Mercado Pago). O cancelamento pode ser efetuado a qualquer momento pelo usuário na aba de faturamento, com manutenção do acesso até o final do período vigente faturado.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">5. Privacidade e Proteção de Dados</h2>
            <p>
              Sua privacidade é fundamental para nós. O tratamento de seus dados pessoais e financeiros segue rigorosamente as diretrizes da nossa{" "}
              <Link to="/privacy" className="text-purple-400 hover:text-purple-300 underline font-medium">
                Política de Privacidade
              </Link>
              , em total conformidade com a legislação aplicável (como a LGPD).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">6. Modificações dos Termos</h2>
            <p>
              Podemos atualizar estes Termos de Serviço periodicamente para refletir melhorias no sistema ou alterações na legislação. Notificaremos os usuários cadastrados sobre alterações materiais através da plataforma ou via e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">7. Contato</h2>
            <p>
              Dúvidas sobre estes Termos de Serviço podem ser enviadas diretamente para o nosso suporte através do canal oficial de atendimento.
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center justify-between text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} Budget Manager. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-300 underline">Política de Privacidade</Link>
            <Link to="/login" className="hover:text-gray-300 underline">Fazer Login</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;

