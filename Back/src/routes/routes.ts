import { Router } from 'express'
import { LoginUserMiddleware, SignUpUserMiddleware } from '../middlewares/UserMiddleware'
import { TransactionController } from '../controllers/TransactionController'
import { TransactionMiddleware, TransactionMiddlewareDelete } from '../middlewares/TransactionMiddleware'
import { UserController } from '../controllers/UserController'
import { BudgetController } from '../controllers/BudgetController'
import { BudgetMiddleware } from '../middlewares/BudgetMiddleware'

export const routes = Router()

routes.post('/login', LoginUserMiddleware , UserController.login)
routes.post('/signup', SignUpUserMiddleware, UserController.signup)

routes.post('/transactions', TransactionMiddleware, TransactionController.HandleSaveTransaction)
routes.delete('/transactions/delete/:id', TransactionMiddlewareDelete, TransactionController.HandleDeleteTransaction)

routes.post('/budgets', BudgetMiddleware ,BudgetController.CreateBudget)

