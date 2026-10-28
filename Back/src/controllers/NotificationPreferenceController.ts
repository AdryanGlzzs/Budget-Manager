import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";
import { prisma } from "../lib/prisma";

export class NotificationPreferenceController {
  static async getPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      let preferences = await prisma.notificationPreference.findUnique({
        where: { userId },
      });

      if (!preferences) {
        preferences = await prisma.notificationPreference.create({
          data: {
            userId,
            transactions: true,
            budgetAlerts: true,
            savingsGoals: true,
            monthlyReports: false,
            marketing: false,
          },
        });
      }

      return res.status(200).json(preferences);
    } catch (error) {
      console.error("Erro ao buscar preferências de notificação:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }

  static async updatePreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      const {
        transactions,
        budgetAlerts,
        savingsGoals,
        monthlyReports,
        marketing,
      } = req.body;

      const updated = await prisma.notificationPreference.upsert({
        where: { userId },
        update: {
          ...(typeof transactions === "boolean" && { transactions }),
          ...(typeof budgetAlerts === "boolean" && { budgetAlerts }),
          ...(typeof savingsGoals === "boolean" && { savingsGoals }),
          ...(typeof monthlyReports === "boolean" && { monthlyReports }),
          ...(typeof marketing === "boolean" && { marketing }),
        },
        create: {
          userId,
          transactions: transactions ?? true,
          budgetAlerts: budgetAlerts ?? true,
          savingsGoals: savingsGoals ?? true,
          monthlyReports: monthlyReports ?? false,
          marketing: marketing ?? false,
        },
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Erro ao atualizar preferências de notificação:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}
