import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { TransactionController } from '../controllers/TransactionController'
import  routerUser  from "../routes/userRoutes"

export const routes = Router()

routes.use(routerUser)