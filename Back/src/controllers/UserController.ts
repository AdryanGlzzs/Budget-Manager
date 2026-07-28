import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export class UserController {

  static async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Usuário já registrado"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }


  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {


      const userLogin = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (!userLogin) {
        return res.status(404).json({
          message: "Usuário não encontrado"
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        userLogin.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Senha inválida"
        });
      }

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: userLogin.id,
          name: userLogin.name,
          email: userLogin.email
        }
      });
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }
}