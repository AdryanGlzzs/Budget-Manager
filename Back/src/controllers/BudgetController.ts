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

    static async DeleteBudget(req: Request, res: Response) {

        const id = String(req.params.id);

        try {
            const deleteBudget = await prisma.budget.delete({
                where: {
                    id
                }
            });

            return res.status(200).json({
                message: "Orçamento deletado com sucesso",
                budget: deleteBudget
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Erro ao deletar orçamento"
            });
        }
    }
}