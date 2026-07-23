import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export const routes = Router()

routes.use(UserController)
