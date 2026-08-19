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
}