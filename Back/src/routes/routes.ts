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

export const routes = Router()  

routes.post('/login', TurnstileMiddleware,  LoginUserMiddleware, UserController.login)
routes.post('/signup', TurnstileMiddleware, SignUpUserMiddleware, UserController.signup)
routes.get('/users/me', AuthMiddleware,  UserController.GetUsers)
routes.post("/auth/google", UserController.GoogleLoginController);
routes.post('/auth/facebook', UserController.FacebookLoginController)
routes.post('/auth/github', UserController.GitHubLoginController)

routes.get('/transactions', AuthTenantId, TransactionController.getTransaction)
routes.post('/transactions', AuthTenantId, TransactionMiddleware, TransactionController.HandleSaveTransaction)
routes.delete('/transactions/delete/:id', AuthTenantId, TransactionMiddlewareDelete, TransactionController.HandleDeleteTransaction)

routes.post('/budgets', AuthTenantId, BudgetMiddleware, BudgetController.CreateBudget)
routes.delete('/budgets/delete/:id', AuthTenantId, DeleteBudgetMiddleware, BudgetController.DeleteBudget)
routes.put('/budgets/edit/:id', AuthTenantId, EditBudget, BudgetController.EditBudget)
routes.get('/budgets', AuthTenantId, BudgetController.getBudgets)

routes.get('/savings-goals', AuthTenantId, SavingGoalsController.getGoals)
routes.post('/savings-goals', AuthTenantId, CreateSavingGoalsMiddleware, SavingGoalsController.CreateGoal)
routes.delete('/savings-goals/delete/:id', AuthTenantId, SavingGoalsController.deleteGoal)
routes.put('/savings-goals/edit/:id', AuthTenantId, SavingGoalsController.EditGoal)

routes.post('/process_payment', PaymentController.processPayment)

