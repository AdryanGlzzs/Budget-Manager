import { Router } from "express";
import { Request, Response } from "express";

export const UserController = Router()

UserController.post('/register', (req: Request, res: Response) =>{
    const {name, email, password, confirmPassword} = req.body
    console.log(req.body)

    return res.status(201).send({
        message: "Usuário cadastrado com sucesso!",
        user: { name, email, password, confirmPassword }
    })
})

UserController.post('/login', (req: Request, res: Response) => {
    const {email, password} = req.body

    return res.status(201).send({
        message: "Usuário cadastrado com sucesso!",
        user: {email, password}
    })
})