import { Request, Response, NextFunction } from 'express'
import z from 'zod'

const SchemaTransaction = z.object({
    name: z.string().min(5, "Nome obrigatorio").trim(),
    category: z.string().trim().min(1, "Categoria é obrigatoria"),
    date: z.string().trim(),
    amount: z.coerce.number().min(1, "Valor é obrigatorio"),
    color: z.string().trim().min(1, "Cor obrigatoria"),
    type: z.string().trim().min(1, "Tipo obrigatorio"),
    status: z.boolean()
})

const schemaDeleteTransaction = z.object({
    id: z.string().uuid()
})



export const TransactionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, category, date, amount, color, type, status } = req.body

    const result = SchemaTransaction.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Dados invalidos ou faltando",
            errors: result.error.issues
        })
    }


    next()
}

export const TransactionMiddlewareDelete = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const result = schemaDeleteTransaction.safeParse(req.params)



    if (!result.success) {
        return res.status(400).json({
            message: "Dados invalidos",
            errors: result.error.issues
        })
    }

    next()
}

