import { Request, Response } from "express";

export class UserController {
  static signup(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: { name, email, password, confirmPassword }
    });
  }
  
  static login(req: Request, res: Response) {
    const { email, password } = req.body;

    return res.status(200).json({
      message: "Logado com sucesso!",
      user: { email, password }
    });
  }
}