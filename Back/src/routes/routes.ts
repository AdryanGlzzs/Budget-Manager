import { NotificationPreferenceController } from '../controllers/NotificationPreferenceController';
import { BillingController } from '../controllers/BillingController';
import { SessionController } from '../controllers/SessionController'
import { TwoFactorController } from '../controllers/TwoFactorController'
import { Router } from 'express'
import { LoginUserMiddleware, SignUpUserMiddleware } from '../middlewares/UserMiddleware'
import { TransactionController } from '../controllers/TransactionController'
import { TransactionMiddleware, TransactionMiddlewareDelete } from '../middlewares/TransactionMiddleware'
import { UserController } from '../controllers/UserController'
import { BudgetController } from '../controllers/BudgetController'
import { BudgetMiddleware, DeleteBudgetMiddleware, EditBudget } from '../middlewares/BudgetMiddleware'
import { CreateSavingGoalsMiddleware } from '../middlewares/SavingGoalsMiddleware'
import { SavingGoalsController } from '../controllers/SavingGoalsController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { PaymentController } from '../controllers/PaymentController'
import { AuthTenantId } from '../middlewares/authTenant'
import { TurnstileMiddleware } from '../middlewares/TurnstileMiddleware'
import { checkPlanLimit, PLAN_LIMITS } from '../middlewares/PlanLimitsMiddleware'
import { prisma } from '../lib/prisma'

export const routes = Router()  

routes.post('/login', TurnstileMiddleware,  LoginUserMiddleware, UserController.login)
routes.post('/signup', TurnstileMiddleware, SignUpUserMiddleware, UserController.signup)
routes.get('/users/me', AuthMiddleware,  UserController.GetUsers)
routes.put('/users/me', AuthMiddleware, UserController.UpdateUser)
routes.put('/users/password', AuthMiddleware, UserController.ChangePassword)
routes.patch('/users/change-password', AuthMiddleware, UserController.ChangePassword)
routes.delete('/users/me', AuthMiddleware, UserController.DeleteAccount)
routes.post("/auth/google", UserController.GoogleLoginController);
routes.post('/auth/facebook', UserController.FacebookLoginController)
routes.post('/auth/github', UserController.GitHubLoginController)

routes.get('/transactions', AuthTenantId, TransactionController.getTransaction)
routes.post('/transactions', AuthTenantId, TransactionMiddleware, TransactionController.HandleSaveTransaction)
routes.delete('/transactions/delete/:id', AuthTenantId, TransactionMiddlewareDelete, TransactionController.HandleDeleteTransaction)

routes.post('/budgets', AuthTenantId, checkPlanLimit('budgets'), BudgetMiddleware, BudgetController.CreateBudget)
routes.delete('/budgets/delete/:id', AuthTenantId, DeleteBudgetMiddleware, BudgetController.DeleteBudget)
routes.put('/budgets/edit/:id', AuthTenantId, EditBudget, BudgetController.EditBudget)
routes.get('/budgets', AuthTenantId, BudgetController.getBudgets)

routes.get('/savings-goals', AuthTenantId, SavingGoalsController.getGoals)
routes.post('/savings-goals', AuthTenantId, checkPlanLimit('savingGoals'), CreateSavingGoalsMiddleware, SavingGoalsController.CreateGoal)
routes.delete('/savings-goals/delete/:id', AuthTenantId, SavingGoalsController.deleteGoal)
routes.put('/savings-goals/edit/:id', AuthTenantId, SavingGoalsController.EditGoal)

routes.get('/users/plan-limits', AuthTenantId, async (req: any, res) => {
    try {
        const userId = req.userId;
        const tenantId = req.tenantId;

        const subscription = userId ? await prisma.subscription.findUnique({ where: { userId } }) : null;
        const plan = (subscription && subscription.status === 'active') ? subscription.plan : 'Free';
        const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.Free;

        const [budgetsCount, savingGoalsCount] = await Promise.all([
            prisma.budget.count({ where: { tenantId } }),
            prisma.savingGoal.count({ where: { tenantId } }),
        ]);

        return res.status(200).json({
            plan,
            status: subscription?.status || 'active',
            billingCycle: subscription?.billingCycle || 'monthly',
            usage: {
                budgets: { count: budgetsCount, limit: limits.budgets },
                savingGoals: { count: savingGoalsCount, limit: limits.savingGoals },
                canExport: limits.export,
            }
        });
    } catch (error) {
        console.error('[plan-limits error]', error);
        return res.status(500).json({ message: 'Erro ao consultar limites do plano' });
    }
});

routes.get('/plans', PaymentController.getPlans)
routes.post('/process_payment', AuthMiddleware, PaymentController.processPayment)

routes.get('/users/sessions', AuthMiddleware, SessionController.listSessions)
routes.delete('/users/sessions/other', AuthMiddleware, SessionController.revokeOtherSessions)
routes.delete('/users/sessions/:id', AuthMiddleware, SessionController.revokeSession)

routes.post('/users/2fa/generate', AuthMiddleware, TwoFactorController.generate)
routes.post('/users/2fa/enable', AuthMiddleware, TwoFactorController.enable)
routes.post('/users/2fa/disable', AuthMiddleware, TwoFactorController.disable)
routes.post('/auth/2fa/verify', TwoFactorController.verifyLogin)

routes.get('/users/notifications/preferences', AuthMiddleware, NotificationPreferenceController.getPreferences);
routes.put('/users/notifications/preferences', AuthMiddleware, NotificationPreferenceController.updatePreferences);

routes.get('/users/billing', AuthMiddleware, BillingController.getBilling);
routes.post('/users/billing/cancel', AuthMiddleware, BillingController.cancelSubscription);
routes.post('/webhooks/mercadopago', BillingController.handleWebhook);
