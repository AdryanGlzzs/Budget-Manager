import { Request, Response } from 'express'
import { createPaymentService } from '../services/MarketPaid'

export interface PlanConfig {
    priceMonthly: number
    priceYearly: number
    description: string
    features: string[]
    popular: boolean
}

export const PlanPrices: Record<string, PlanConfig> = {
    Free: {
        priceMonthly: 0,
        priceYearly: 0,
        description: "Plano Gratuito - Budget Manager",
        features: [
            "Acesso ao Dashboard Básico",
            "Até 2 contas bancárias",
            "Categorização automática",
            "Relatórios mensais simples",
            "Suporte por email",
        ],
        popular: false,
    },
    Pro: {
        priceMonthly: 29.90,
        priceYearly: 23.90,
        description: "Assinatura Plano Pro - Budget Manager",
        features: [
            "Tudo no plano Free",
            "Contas ilimitadas",
            "Metas de economia ilimitadas",
            "Relatórios avançados & AI Insights",
            "Exportação de dados (CSV, PDF)",
            "Suporte prioritário 24/7",
        ],
        popular: true,
    },
    Business: {
        priceMonthly: 79.90,
        priceYearly: 63.90,
        description: "Assinatura Plano Business - Budget Manager",
        features: [
            "Tudo no plano Pro",
            "Gestão de múltiplas moedas",
            "Faturamento & Notas Fiscais",
            "Acesso para contador",
            "API de Integração",
            "Manager dedicado",
        ],
        popular: false,
    },
}

export const PaymentController = {
    async getPlans(req: Request, res: Response) {
        const plans = Object.entries(PlanPrices).map(([name, config]) => ({
            name,
            priceMonthly: config.priceMonthly,
            priceYearly: config.priceYearly,
            description: config.description,
            features: config.features,
            popular: config.popular
        }))

        return res.status(200).json({ plans })
    },

    async processPayment(req: Request, res: Response) {
        try {
            const {
                planName,
                billingCycle,
                email,
                payerFirstName,
                payerLastName,
                identificationType,
                identificationNumber,
            } = req.body

            const selectedPlan = PlanPrices[planName]

            if (!selectedPlan) {
                return res.status(400).json({
                    message: "Plano inválido ou não encontrado",
                })
            }

            const isYearly = billingCycle === 'yearly'
            const unitPrice = isYearly ? selectedPlan.priceYearly : selectedPlan.priceMonthly

            if (unitPrice === 0) {
                return res.status(200).json({
                    message: "Plano gratuito ativado com sucesso",
                    payment: null,
                })
            }

            const PaymentResult = await createPaymentService({
                planName,
                transactionAmount: unitPrice,
                description: selectedPlan.description,
                email,
                payerFirstName,
                payerLastName,
                identificationType,
                identificationNumber,
            })

            return res.status(201).json({
                message: "Pagamento criado com sucesso",
                payment: PaymentResult,
            })
        } catch (error: any) {
            return res.status(400).json({ error: error.message || 'Erro ao processar pagamento' })
        }
    },
}
