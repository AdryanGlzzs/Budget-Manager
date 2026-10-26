import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { hashToken } from "../controllers/SessionController";

interface TokenPayLoad {
  id: string;
  sub?: string;
  sessionId?: string;
  tenantId?: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
  sessionId?: string;
}

export const AuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token = authHeader ? authHeader.split(" ")[1] : null;

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Token de autenticação não fornecido",
    });
  }

  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK;

  if (!secret) {
    throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as TokenPayLoad;
    const userId = decoded.id || decoded.sub;

    if (!userId) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    const currentHash = hashToken(token);
    const session = await prisma.session.findUnique({
      where: { tokenHash: currentHash },
    });

    if (session) {
      req.sessionId = session.id;
      prisma.session
        .update({
          where: { id: session.id },
          data: { lastActiveAt: new Date() },
        })
        .catch(() => { });
    }

    req.user = { id: userId };
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
};
