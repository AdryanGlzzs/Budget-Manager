import { Request, Response } from 'express'
import { createPaymentService } from '../services/MarketPaid'

export const PaymentController = {
    async processPayment(req: Request, res: Response) {
        try {
            const { transactionAmount, description, email, payerFirstName, payerLastName, identificationType, identificationNumber } = req.body

            const paymentResult = await createPaymentService({
                transactionAmount,
                description,
                email,
                payerFirstName,
                payerLastName,
                identificationType,
                identificationNumber
            })

            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                payment: paymentResult
            })
        } catch (error: any) {
            return res.status(400).json({ error: error.message || 'Erro ao processar pagamento' })
        
        }
    }
}
