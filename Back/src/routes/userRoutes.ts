import express from 'express'
const routerUser = express.Router()
import { UserController } from '../controllers/UserController'
import { SignUpUserMiddleware, LoginUserMiddleware } from '../midlewares/UserMiddleware'

routerUser.post('/signup', SignUpUserMiddleware, UserController.signup)
routerUser.post('/login', LoginUserMiddleware, UserController.login)


export default routerUser
