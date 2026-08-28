import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


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

    const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK

    if(!secret){
      return res.status(401).json({
        message: "Não autorizado"
      })
    }
    const token = jwt.sign(
      {id: user.id}, secret , {
        expiresIn: '7d'
      }
    )

    return res.status(201).json({
      message: "Cliente cadastrado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
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

      const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK

      if(!secret){
        return res.status(401).json({
          message: "Não autorizado"
        })
      }

      const token = jwt.sign(
        {id: userLogin.id}, 
        secret,
        {expiresIn: "7d"}
      )

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        user: {
          id: userLogin.id,
          name: userLogin.name,
          email: userLogin.email
        }
      });
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  }

  static async GetUsers(req: Request, res: Response) {

    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Não autorizado"
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      if (!user) {
        return res.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      return res.status(200).json(user);
    }
    catch(error) {
      console.log(error);
      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }
}