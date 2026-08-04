import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class BudgetController {
    static async CreateBudget(req: Request, res: Response) {
        const { name, icon, color, spent, limit, description } = req.body

        try {

            const createBudget = await prisma.budget.create({
                data: {
                    name,
                    icon,
                    color,
                    spent,
                    limit,
                    description,
                }
            })

            res.status(201).json({
                message: "Orçamento criado com Sucesso",
                budget: createBudget
            })

        } catch (error) {
            res.status(404).json({
                message: "Orçamento criado com Sucesso",
                error: error
            })

        }

    }
}