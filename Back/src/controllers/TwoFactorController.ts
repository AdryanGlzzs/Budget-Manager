import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { generateSecret, generateURI, verifySync } from "otplib";
import QRCode from "qrcode";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { parseDevice, hashToken } from "./SessionController";

export class TwoFactorController {
  
  static async generate(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, twoFactorEnabled: true },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const secret = generateSecret();
      const otpauth = generateURI({
        issuer: "Budget Manager",
        label: user.email,
        secret,
      });

      await prisma.user.update({
        where: { id: userId },
        data: { twoFactorSecret: secret },
      });

      const qrCodeUrl = await QRCode.toDataURL(otpauth, {
        margin: 2,
        width: 250,
      });

      return res.status(200).json({
        secret,
        qrCodeUrl,
      });
    } catch (error) {
      console.error("Erro ao gerar 2FA:", error);
      return res.status(500).json({ message: "Erro ao gerar chave de autenticação em duas etapas" });
    }
  }

  static async enable(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      const { code } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      if (!code || typeof code !== "string" || code.trim().length !== 6) {
        return res.status(400).json({ message: "Código de 6 dígitos inválido" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, twoFactorSecret: true },
      });

      if (!user || !user.twoFactorSecret) {
        return res.status(400).json({
          message: "Nenhuma configuração de 2FA em andamento. Gere o QR Code novamente.",
        });
      }

      const check = verifySync({
        token: code.trim(),
        secret: user.twoFactorSecret,
      });

      if (!check || !check.valid) {
        return res.status(400).json({ message: "Código de autenticação incorreto ou expirado." });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
      });

      return res.status(200).json({
        message: "Autenticação em duas etapas ativada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao ativar 2FA:", error);
      return res.status(500).json({ message: "Erro ao ativar 2FA" });
    }
  }

 
  static async disable(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      const { password, code } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      let authorized = false;

      if (code && user.twoFactorSecret) {
        const check = verifySync({
          token: String(code).trim(),
          secret: user.twoFactorSecret,
        });
        authorized = !!(check && check.valid);
      }

      if (!authorized && password && user.password) {
        authorized = await bcrypt.compare(password, user.password);
      }

      if (!authorized && !user.password) {
        authorized = true;
      }

      if (!authorized) {
        return res.status(400).json({
          message: "Credencial inválida. Informe sua senha atual ou o código de autenticação para desativar.",
        });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
        },
      });

      return res.status(200).json({
        message: "Autenticação em duas etapas desativada com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao desativar 2FA:", error);
      return res.status(500).json({ message: "Erro ao desativar 2FA" });
    }
  }

  static async verifyLogin(req: Request, res: Response) {
    try {
      const { tempToken, code } = req.body;

      if (!tempToken || !code) {
        return res.status(400).json({ message: "Dados incompletos para validação 2FA" });
      }

      const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_FALLBACK;
      if (!secret) {
        return res.status(500).json({ message: "Erro de configuração no servidor" });
      }

      let decoded: any;
      try {
        decoded = jwt.verify(tempToken, secret);
      } catch (e) {
        return res.status(401).json({ message: "Sessão de verificação expirada. Faça login novamente." });
      }

      if (!decoded.is2faPending || !decoded.sub) {
        return res.status(400).json({ message: "Token inválido" });
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.sub },
      });

      if (!user || !user.twoFactorSecret) {
        return res.status(400).json({ message: "Configuração de 2FA não encontrada" });
      }

      const check = verifySync({
        token: String(code).trim(),
        secret: user.twoFactorSecret,
      });

      if (!check || !check.valid) {
        return res.status(400).json({ message: "Código 2FA incorreto ou expirado." });
      }

      const userAgent = req.headers["user-agent"];
      const { device, browser, os } = parseDevice(userAgent);
      const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || null;

      const appToken = jwt.sign(
        { sub: user.id, id: user.id, tenantId: user.tenantId },
        secret,
        { expiresIn: "7d" }
      );

      const session = await prisma.session.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(appToken),
          device,
          browser,
          os,
          ipAddress: typeof ip === "string" ? ip.split(",")[0].trim() : ip,
        },
      });

      res.cookie("token", appToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token: appToken,
        sessionId: session.id,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          twoFactorEnabled: user.twoFactorEnabled,
        },
      });
    } catch (error) {
      console.error("Erro no verifyLogin 2FA:", error);
      return res.status(500).json({ message: "Erro ao validar 2FA" });
    }
  }
}
