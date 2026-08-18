import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class BudgetController {
    static async CreateBudget(req: Request, res: Response) {
        const { name, color, spent, limit, description, period } = req.body

        try {

            const createBudget = await prisma.budget.create({
                data: {
                    name,
                    color,
                    spent,
                    limit,
                    description,
                    period
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

    static async EditBudget(req: Request, res: Response) {
        const id = req.body.id;
        const { name, color, spent, limit, description, period } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'O ID do orçamento é obrigatório.' });
        }

        try {
            const editBudget = await prisma.budget.update({
                where: {
                    id: String(id)
                },
                data: {
                    name,
                    color,
                    spent,
                    limit,
                    description,
                    period
                }
            })

            return res.status(200).json({
                message: 'Orçamento atualizado com sucesso!',
                budget: editBudget,
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Orçamento não encontrado.' });
            }

            console.error('Erro ao editar orçamento:', error);
            return res.status(500).json({ error: 'Erro interno ao atualizar o orçamento.' });
        }
    }

    static async getBudgets(req: Request, res: Response) {
        try {
            const response = await prisma.budget.findMany()
            
            res.status(200).json({
                message: "Dados Puxados",
                data: response
            })
        } catch (error) {
            console.error("Erro ao buscar os orçamentos",error)
            res.status(500).json({
                message: "Erro ao carregar os orçamentos",
                error
            })
        }
    }
}