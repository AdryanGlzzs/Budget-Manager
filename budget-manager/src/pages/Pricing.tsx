import { Check, Star } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Pricing = () => {
  const billingCycle = "monthly";

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfeito para começar a organizar suas finanças.",
      features: [
        "Acesso ao Dashboard Básico",
        "Até 2 contas bancárias",
        "Categorização automática",
        "Relatórios mensais simples",
        "Suporte por email",
      ],
      cta: "Começar Grátis",
      popular: false,
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? 12 : 10,
      description: "Tudo o que você precisa para controle total.",
      features: [
        "Tudo no plano Free",
        "Contas ilimitadas",
        "Metas de economia ilimitadas",
        "Relatórios avançados & AI Insights",
        "Exportação de dados (CSV, PDF)",
        "Suporte prioritário 24/7",
      ],
      cta: "Assinar Pro",
      popular: true,
    },
    {
      name: "Business",
      price: billingCycle === "monthly" ? 29 : 24,
      description: "Para freelancers e pequenos negócios.",
      features: [
        "Tudo no plano Pro",
        "Gestão de múltiplas moedas",
        "Faturamento & Notas Fiscais",
        "Acesso para contador",
        "API de Integração",
        "Manager dedicado",
      ],
      cta: "Falar com Vendas",
      popular: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <Sidebar currentPage="pricing" />

      <main className="flex-1 p-8 max-w-[1400px] relative z-10 overflow-y-auto h-screen flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-12 pt-8">
          <h1 className="text-[42px] font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Escolha o plano ideal para você
          </h1>
          <p className="text-gray-400 text-[18px]">
            Desbloqueie todo o potencial do seu dinheiro com nossos planos
            premium. Cancele a qualquer momento.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl border border-white/10 mb-12">
          <button
            className={`px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-white/10 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Mensal
          </button>
          <button
            className={`px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-white/10 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Anual
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
              -20%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {plans.map((plan) => (
            <div key={plan.name} className="relative group">
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[12px] font-bold px-4 py-1 rounded-full shadow-lg shadow-purple-600/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Mais Popular
                  </span>
                </div>
              )}

              <div
                className={`
                        relative h-full p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300
                        ${
                          plan.popular
                            ? "bg-[#0a0a14]/80 border-purple-500/50 shadow-2xl shadow-purple-900/20 hover:border-purple-500/80 hover:shadow-purple-900/40 translate-y-[-8px]"
                            : "bg-[#0a0a14]/40 border-white/10 hover:border-white/20 hover:bg-[#0a0a14]/60"
                        }
                    `}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 rounded-3xl pointer-events-none"></div>
                )}

                <div className="mb-8">
                  <h3 className="text-[20px] font-semibold mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-[42px] font-bold">${plan.price}</span>
                    <span className="text-gray-500">
                      /{billingCycle === "monthly" ? "mês" : "ano"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[14px] h-10">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[14px] text-gray-300"
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? "bg-purple-500/20 text-purple-400" : "bg-white/10 text-gray-400"}`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`
                            w-full py-4 rounded-xl text-[14px] font-bold transition-all
                            ${
                              plan.popular
                                ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-600/40 hover:scale-[1.02]"
                                : "bg-white text-slate-900 hover:bg-gray-100 hover:scale-[1.02]"
                            }
                        `}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center space-y-4 max-w-2xl">
          <h2 className="text-[24px] font-semibold">Dúvidas Frequentes?</h2>
          <p className="text-gray-400">
            Entre em contato com nosso suporte para qualquer questão sobre os
            planos.
          </p>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 text-[14px] font-medium underline underline-offset-4"
          >
            Fale Conosco
          </a>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
