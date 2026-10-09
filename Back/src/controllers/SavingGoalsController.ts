import { Request, Response } from "express"

function parseDate(dateStr?: string | Date | null): Date | null {
  if (!dateStr) return null
  if (dateStr instanceof Date) return isNaN(dateStr.getTime()) ? null : dateStr

  let parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) return parsed

  if (typeof dateStr === 'string' && dateStr.includes('/')) {
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const year = parseInt(parts[2], 10)
      parsed = new Date(year, month, day)
      if (!isNaN(parsed.getTime())) return parsed
    }
  }
  return null
}

export class SavingGoalsController {
  static async CreateGoal(req: Request, res: Response) {
    const { name, target, current, color, deadline } = req.body

    try {
      const response = await req.prisma.savingGoal.create({
        data: {
          name,
          target,
          current,
          color,
          deadline: parseDate(deadline),
          tenantId: req.tenantId!
        }
      })

      return res.status(201).json({
        message: "Meta criada",
        body: response
      })
    } catch (error) {
      console.error("Erro ao criar meta:", error)
      return res.status(500).json({
        message: "Erro interno ao criar meta",
        data: String(error)
      })
    }
  }

  static async getGoals(req: Request, res: Response) {
    try {
      const response = await req.prisma.savingGoal.findMany()

      return res.status(200).json({
        message: "Dados puxados",
        data: response
      })
    } catch (error) {
      console.error("Erro ao puxar metas:", error)
      return res.status(500).json({
        message: "Erro interno ao buscar metas",
        data: String(error)
      })
    }
  }

  static async deleteGoal(req: Request, res: Response) {
    const id = String(req.params.id)

    try {
      if (!id) {
        return res.status(400).json({
          message: "ID inválido",
        })
      }

      const deleteGoal = await req.prisma.savingGoal.delete({
        where: {
          id
        }
      })

      return res.status(200).json({
        message: "Meta deletada",
        data: deleteGoal
      })

    } catch (error) {
      console.error("Erro ao deletar meta:", error)
      return res.status(500).json({
        message: "Erro interno ao deletar meta",
        error: String(error)
      })
    }
  }

  static async EditGoal(req: Request, res: Response) {
    const id = req.params.id
    const { name, target, current, color, deadline } = req.body

    if (!id) {
      return res.status(400).json({ message: "ID inválido" })
    }

    try {
      const editResponse = await req.prisma.savingGoal.update({
        where: {
          id: String(id)
        },
        data: {
          name,
          target,
          current,
          color,
          deadline: parseDate(deadline)
        }
      })

      return res.status(200).json({
        message: "Meta editada com sucesso",
        data: editResponse
      })
    } catch (error) {
      console.error("Erro ao editar meta:", error)
      return res.status(500).json({
        message: "Erro ao editar meta",
        data: String(error)
      })
    }
  }
}  