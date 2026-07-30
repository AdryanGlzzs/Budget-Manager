import { Router } from 'express'
import { LoginUserMiddleware, SignUpUserMiddleware } from '../middlewares/UserMiddleware'
import { TransactionController } from '../controllers/TransactionController'
import { TransactionMiddleware } from '../middlewares/TransactionMiddleware'
import { UserController } from '../controllers/UserController'

export const routes = Router()

routes.post('/login', LoginUserMiddleware , UserController.login)
routes.post('/signup', SignUpUserMiddleware, UserController.signup)

routes.post('/transactions', TransactionMiddleware, TransactionController.HandleSave)

