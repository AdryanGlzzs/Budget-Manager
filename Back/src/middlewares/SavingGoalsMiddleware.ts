import { Request, Response, NextFunction } from "express"
import z from "zod"

export const createSavingGoalSchema = z.object({
    name: z.string().trim().min(3, "O nome da meta deve ter no mínimo 3 caracteres").max(50, "O nome da meta deve ter no máximo 50 caracteres"),
    target: z.coerce.number().positive("O valor da meta deve ser maior que zero"),
    current: z.coerce.number().min(0, "O valor economizado não pode ser negativo").default(0),
    color: z.string().trim().min(1, "A cor da meta é obrigatória"),
    deadline: z.string().trim().min(1, "A data/prazo da meta é obrigatório"),
});

export const CreateSavingGoalsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = createSavingGoalSchema.safeParse(req.body)

    try {
        if (!result.success) {
            res.status(400).json({
                message: "Erro na criação de meta",
                data: result
            })
        }

        req.body = result.data

        return next()

    } catch (error) {
        res.json({
            erro: error
        })
    }
} 