import jwt from 'jsonwebtoken'
import { createTenantPrisma } from '../lib/prisma'
import { Request, Response, NextFunction } from 'express'

interface TokenPayload {
    sub: string;
    tenantId: string;
}

export function AuthTenantId(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Formato do token inválido' });
    }

    const token = parts[1]



    try {
        const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK
        if (!secret) {
            return res.status(500).json({ error: 'Chave secreta não configurada no servidor' })
        }

        const decoded = jwt.verify(token, secret) as TokenPayload

        req.userId = decoded.sub
        req.tenantId = decoded.tenantId

        req.prisma = createTenantPrisma(decoded.tenantId)

        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}