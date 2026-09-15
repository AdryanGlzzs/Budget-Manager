import z from "zod";
import { NextFunction, Request, Response } from "express";

const schemaMarkedPaid = z.object({
    payerFirstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    payerLastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    identificationType: z.string().min(2, "Tipo de documento inválido"),
    identificationNumber: z.string().min(11, "O documento deve ter pelo menos 11 dígitos").max(14, "O documento deve ter no máximo 14 dígitos"),
    planName: z.string().min(2, "Plano invalido"),
})

const MarketPaidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = schemaMarkedPaid.safeParse(req.body)

    if(!result){
        return res.status(404).json({
            message: "Requisição invalida",
        })
    }

    res.status(500).json({
        message: "Requisição validada",
        data: result.success
    })

    next()
}