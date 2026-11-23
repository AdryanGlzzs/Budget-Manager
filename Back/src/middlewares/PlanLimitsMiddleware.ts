import { Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

export type LimitResource = "budgets" | "savingGoals" | "export";

export interface PlanLimitsConfig {
  budgets: number;
  savingGoals: number;
  export: boolean;
}

export const PLAN_LIMITS: Record<string, PlanLimitsConfig> = {
  Free: {
    budgets: 2,
    savingGoals: 2,
    export: false,
  },
  Pro: {
    budgets: Infinity,
    savingGoals: Infinity,
    export: true,
  },
  Business: {
    budgets: Infinity,
    savingGoals: Infinity,
    export: true,
  },
};

export function checkPlanLimit(resource: LimitResource) {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId || req.user?.id;
      const tenantId = req.tenantId;

      if (!userId && !tenantId) {
        return res.status(401).json({ message: "Usuário não autenticado." });
      }

      // Buscar plano atual do usuário
      let userPlan = "Free";
      if (userId) {
        const subscription = await prisma.subscription.findUnique({
          where: { userId },
        });

        if (subscription && subscription.status === "active") {
          userPlan = subscription.plan;
        }
      }

      const planConfig = PLAN_LIMITS[userPlan] || PLAN_LIMITS.Free;

      if (resource === "budgets") {
        const currentCount = await prisma.budget.count({
          where: { tenantId: tenantId! },
        });

        if (currentCount >= planConfig.budgets) {
          return res.status(403).json({
            code: "PLAN_LIMIT_REACHED",
            resource: "budgets",
            plan: userPlan,
            limit: planConfig.budgets,
            currentCount,
            message: `Você atingiu o limite de ${planConfig.budgets} orçamentos do plano ${userPlan}. Faça upgrade para o plano Pro para orçamentos ilimitados!`,
          });
        }
      } else if (resource === "savingGoals") {
        const currentCount = await prisma.savingGoal.count({
          where: { tenantId: tenantId! },
        });

        if (currentCount >= planConfig.savingGoals) {
          return res.status(403).json({
            code: "PLAN_LIMIT_REACHED",
            resource: "savingGoals",
            plan: userPlan,
            limit: planConfig.savingGoals,
            currentCount,
            message: `Você atingiu o limite de ${planConfig.savingGoals} metas do plano ${userPlan}. Faça upgrade para o plano Pro para metas ilimitadas!`,
          });
        }
      } else if (resource === "export") {
        if (!planConfig.export) {
          return res.status(403).json({
            code: "FEATURE_LOCKED",
            resource: "export",
            plan: userPlan,
            message: `A exportação de dados é um recurso exclusivo dos planos Pro e Business. Faça upgrade para desbloquear!`,
          });
        }
      }

      return next();
    } catch (error) {
      console.error("[checkPlanLimit error]", error);
      return next();
    }
  };
}
