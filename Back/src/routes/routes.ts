import express from 'express'
import { Router } from 'express'
import { Request, Response } from 'express'

export const routes = Router()  



routes.post('/register', (req: Request, res: Response) =>{
    const {name, email, password, confirmPassword} = req.body
    console.log(req.body)

    return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: { name, email, password, confirmPassword }
    })
})