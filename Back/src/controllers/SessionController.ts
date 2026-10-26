import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { UAParser } from "ua-parser-js";
import crypto from "crypto";

export function parseDevice(userAgentHeader?: string) {
  if (!userAgentHeader) {
    return {
      device: "Navegador Web",
      browser: "Desconhecido",
      os: "Desconhecido",
    };
  }

  const parser = new UAParser(userAgentHeader);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const browserStr = browser.name ? `${browser.name}${browser.major ? " " + browser.major : ""}` : "Navegador";
  const osStr = os.name ? `${os.name}${os.version ? " " + os.version : ""}` : "Sistema";

  let deviceName = `${browserStr} no ${osStr}`;
  if (device.vendor || device.model) {
    deviceName = `${device.vendor || ""} ${device.model || ""}`.trim() + ` (${browserStr})`;
  }

  return {
    device: deviceName,
    browser: browser.name || "Navegador",
    os: os.name || "Sistema",
  };
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export class SessionController {
  static async listSessions(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      const currentSessionId = (req as Request & { sessionId?: string }).sessionId;

      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      const sessions = await prisma.session.findMany({
        where: { userId },
        orderBy: { lastActiveAt: "desc" },
        select: {
          id: true,
          device: true,
          browser: true,
          os: true,
          ipAddress: true,
          lastActiveAt: true,
          createdAt: true,
        },
      });

      const formattedSessions = sessions.map((s) => ({
        id: s.id,
        device: s.device,
        browser: s.browser,
        os: s.os,
        location: s.ipAddress === "::1" || s.ipAddress === "127.0.0.1" ? "Localhost" : s.ipAddress || "Desconhecido",
        time: s.lastActiveAt,
        current: currentSessionId ? s.id === currentSessionId : false,
      }));

      if (formattedSessions.length > 0 && !formattedSessions.some((s) => s.current)) {
        formattedSessions[0].current = true;
      }

      return res.status(200).json(formattedSessions);
    } catch (error) {
      console.error("Erro ao listar sessões:", error);
      return res.status(500).json({ message: "Erro ao buscar sessões ativas" });
    }
  }

  static async revokeSession(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      const idParam = req.params.id;
      const sessionId = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!session || session.userId !== userId) {
        return res.status(404).json({ message: "Sessão não encontrada" });
      }

      await prisma.session.delete({
        where: { id: sessionId },
      });

      return res.status(200).json({ message: "Sessão revogada com sucesso" });
    } catch (error) {
      console.error("Erro ao revogar sessão:", error);
      return res.status(500).json({ message: "Erro ao revogar sessão" });
    }
  }

  static async revokeOtherSessions(req: Request, res: Response) {
    try {
      const userId = (req as Request & { user?: { id: string } }).user?.id;
      const currentSessionId = (req as Request & { sessionId?: string }).sessionId;

      if (!userId) {
        return res.status(401).json({ message: "Não autorizado" });
      }

      if (currentSessionId) {
        await prisma.session.deleteMany({
          where: {
            userId,
            id: { not: currentSessionId },
          },
        });
      } else {
        const latest = await prisma.session.findFirst({
          where: { userId },
          orderBy: { lastActiveAt: "desc" },
        });

        if (latest) {
          await prisma.session.deleteMany({
            where: {
              userId,
              id: { not: latest.id },
            },
          });
        }
      }

      return res.status(200).json({ message: "Todas as outras sessões foram encerradas" });
    } catch (error) {
      console.error("Erro ao revogar outras sessões:", error);
      return res.status(500).json({ message: "Erro ao encerrar outras sessões" });
    }
  }
}
