import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type PrismaScopedArgs = {
    where?: Record<string, unknown>
    data?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const createTenantPrisma = (tenantId: string) => {
    return prisma.$extends({
        query: {
            $allModels: {
                async $allOperations({ operation, args, query }) {
                    const anyArgs = args as PrismaScopedArgs;

                    if (
                        ['findMany', 'findFirst', 'updateMany', 'deleteMany', 'count', 'aggregate'].includes(operation)
                    ) {
                        anyArgs.where = { ...anyArgs.where, tenantId };
                    }

                    if (operation === 'create') {
                        anyArgs.data = { ...anyArgs.data, tenantId };
                    }
                    if (operation === 'createMany' && Array.isArray(anyArgs.data)) {
                        anyArgs.data = anyArgs.data.map((item: any) => ({
                            ...item,
                            tenantId,
                        }));
                    }

                    return query(args);
                },
            },
        },
    }) as unknown as PrismaClient;
};