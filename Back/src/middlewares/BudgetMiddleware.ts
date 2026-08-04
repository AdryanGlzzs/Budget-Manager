import z, { string } from "zod";
import { Request, Response, NextFunction } from "express";

const schemaBudget = z.object({
    name: z.string().min(4, "O minimo de caracteres são 4").trim().max(20),
    icon: z.string(),
    color: z.string(),
    spent: z.number().min(2),
    limit: z.number().min(2),
    description: z.string().min(10, "Minimo 10 caracteres").max(100).trim(),
})

export const BudgetMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const {} = req.body

    const result = schemaBudget.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            message: "Dados invalidos",
            errors: result.error.issues
        })
    }
}