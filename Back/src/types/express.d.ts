import { createTenantPrisma } from "../lib/prisma";

export type TenantPrismaClient = ReturnType<typeof createTenantPrisma>

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      tenantId?: string;
      prisma: TenantPrismaClient;
    }
  }
}