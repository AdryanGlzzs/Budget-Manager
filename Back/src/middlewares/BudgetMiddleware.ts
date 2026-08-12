import z, { string } from "zod";
import { Request, Response, NextFunction } from "express";

const schemaBudget = z.object({
    name: z.string().trim().min(4, "O mínimo de caracteres são 4").max(20, "O máximo de caracteres são 20"),
    icon: z.string().trim(),
    color: z.string().trim(),
    spent: z.coerce.number().min(0, "O valor gasto não pode ser negativo"),
    limit: z.coerce.number().min(1, "O limite deve ser maior que zero"),
    description: z.string().trim().min(10, "Mínimo de 10 caracteres").max(100, "Máximo de 100 caracteres"),
});

const schemaDeleteBudget = z.object({
    id: z.string().uuid("ID do orçamento inválido")
})


export const BudgetMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = schemaBudget.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Dados inválidos.",
            errors: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    req.body = result.data;
    next();
};

export const DeleteBudgetMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = schemaDeleteBudget.safeParse(req.params);

    if (!result.success) {
        return res.status(400).json({
            message: "ID do orçamento inválido",
            errors: result.error.issues
        });
    }

    next();
};