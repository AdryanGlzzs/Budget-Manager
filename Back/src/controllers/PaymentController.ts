import { Request, Response } from 'express'
import { createPaymentService } from '../services/MarketPaid'

const PlanPrices: Record<string, { price: number, description: string }> = {
    Pro: {
        price: 50.00,
        description: "Assinatura Plano Pro - Budget Manager"
    },

    Business: {
        price: 100.00,
        description: "Assinatura Plano Business - Budget Manager"
    },

    Free: {
        price: 0.01,
        description: "Teste"
    }
}

export const PaymentController = {
    async processPayment(req: Request, res: Response) {
        try {
            const { planName, email, payerFirstName, payerLastName, identificationType, identificationNumber } = req.body

            const selectedPlan = PlanPrices[planName]

            if (!selectedPlan) {
                return res.status(400).json({
                    message: "Plano invalido ou não encontrado",
                })
            }

            const PaymentResult = await createPaymentService({ planName, transactionAmount: selectedPlan.price, description: selectedPlan.description, email, payerFirstName, payerLastName, identificationType, identificationNumber })

            return res.status(201).json({
                message: "Pagamento criado com sucesso",
                payment: PaymentResult
            })
        } catch (error: any) {
            return res.status(400).json({ error: error.message || 'Erro ao processar pagamento' })

        }
    }
}
