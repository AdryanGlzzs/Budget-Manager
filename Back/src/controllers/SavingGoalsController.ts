import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
export class SavingGoalsController {
  static async CreateGoal(req: Request, res: Response) {
    const { name, target, current, color, deadline } = req.body

    try {
      const response = await prisma.savingGoals.create({
        data: {
          name,
          target,
          current,
          color,
          deadline
        }
      })

      res.status(201).json({
        message: "Meta criada",
        body: response
      })
    } catch (error) {

      res.status(500).json({
        message: "Erro interno",
        data: error
      })

    }
  }

  static async getGoals(req: Request, res: Response) {

    const response = await prisma.savingGoals.findMany()

    try {
      res.status(200).json({
        message: "Dados puxados",
        data: response
      })
    } catch (error) {
      res.status(500).json({
        message: "Erro interno",
        data: error
      })
    }

  }

  static async deleteGoal(req: Request, res: Response) {
    const id = String(req.params.id)

    try {

      if (Array.isArray(id)) {
        res.status(404).json({
          message: "ID invalido",
        })
      }

      const deleteGoal = await prisma.savingGoals.delete({
        where: {
          id
        }
      })

      res.status(201).json({
        message: "Meta deletada",
        data: deleteGoal
      })

    } catch (error) {
      res.status(404).json({
        message: "Erro interno",
        error
      })
    }
  }

  static async EditGoal(req: Request, res: Response) {
    const id = req.params.id
    const { name, target, current, color, deadline } = req.body

    if (!id) {
      throw new Error("Id invalido")
    }

    try {
      const editResponse = await prisma.savingGoals.update({
        where: {
          id: String(id)
        },
        data: {
          name,
          target,
          current,
          color,
          deadline
        }
      }
      )

      res.status(201).json({
        message: "Orçamento Editado",
        data: editResponse
      })
    } catch (error) {
      res.status(400).json({
        message: "Orçamento não encontrado",
        data: error
      })
    }
  }
}  