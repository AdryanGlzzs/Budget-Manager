import { Request, Response } from "express";
import {prisma} from '../lib/prisma'

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password} = req.body;

    const user = await prisma.user.create({
      data:{
        name,
        email,
        password,
      }
    })

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso",
      user
    })
  }
  
  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    return res.status(200).json({
      message: "Logado com sucesso!",
      user: { email, password }
    });
  }
}