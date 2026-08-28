import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

interface TokenPayLoad {
    id: string,
    iat?: number,
    exp?: number
}

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string
    }
}

export const AuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Token de autenticação não fornecido"
        })
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        return res.status(401).json({
            message: "Token não encontrado"
        })
    }


    const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK

    if (!secret) {
        throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
    }

    try {
        const decoded = jwt.verify(token, secret) as unknown as TokenPayLoad

        req.user = { id: decoded.id }

        return next()
    } catch (error) {
        return res.status(401).json({
            message: "Token invalido ou expirado"
        })
    }
}