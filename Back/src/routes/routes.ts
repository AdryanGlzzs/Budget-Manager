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

export const routes = Router()

routes.post('/login', LoginUserMiddleware, UserController.login)
routes.post('/signup', SignUpUserMiddleware, UserController.signup)
routes.get('/users/me', AuthMiddleware,  UserController.GetUsers)
routes.post("/auth/google", UserController.GoogleLoginController);

routes.get('/transactions', TransactionController.getTransaction)
routes.post('/transactions', TransactionMiddleware, TransactionController.HandleSaveTransaction)
routes.delete('/transactions/delete/:id', TransactionMiddlewareDelete, TransactionController.HandleDeleteTransaction)

routes.post('/budgets', BudgetMiddleware, BudgetController.CreateBudget)
routes.delete('/budgets/delete/:id', DeleteBudgetMiddleware, BudgetController.DeleteBudget)
routes.put('/budgets/edit/:id', EditBudget, BudgetController.EditBudget)
routes.get('/budgets', BudgetController.getBudgets)

routes.get('/savings-goals', SavingGoalsController.getGoals)
routes.post('/savings-goals', CreateSavingGoalsMiddleware, SavingGoalsController.CreateGoal)
routes.delete('/savings-goals/delete/:id', SavingGoalsController.deleteGoal)
routes.put('/savings-goals/edit/:id', SavingGoalsController.EditGoal)