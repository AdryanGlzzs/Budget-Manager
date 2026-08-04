import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class TransactionController {
    
    static async HandleSaveTransaction(req: Request, res: Response) {
        try {
            const { name, category, date, amount, icon, color, type, status } = req.body;
            

            const transaction = await prisma.transaction.create({
                data: {
                    name,
                    category,
                    date: new Date(date),
                    amount,
                    icon,
                    color,
                    type,
                    status
                }
            });

            return res.status(201).json({
                message: "Transação criada com sucesso",
                data: transaction
            });
        } catch (error) {
            console.error("Erro ao salvar transação:", error);
            return res.status(500).json({
                message: "Erro interno do servidor ao salvar transação",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    static async HandleDeleteTransaction(req: Request, res: Response) {
        const { id } = req.params


        try {

            if (Array.isArray(id)) {
                return res.status(400).json({
                    message: "ID inválido."
                });
            }

            const remove = await prisma.transaction.delete({
                where: {
                    id,
                }
            })

            res.status(200).json({
                message: "Transação deletada com sucesso",
                data: remove
            })
        } catch (error) {

            return res.status(404).json({
                error: error
            })
        }
    }
}