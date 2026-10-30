import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../middlewares/AuthMiddleware';

export const BillingController = {
  async getBilling(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Não autorizado' });

    try {
      const subscription = await prisma.subscription.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          plan: 'Free',
          status: 'active',
          price: 0,
          billingCycle: 'monthly',
          currentPeriodStart: new Date(),
        },
        include: {
          invoices: {
            orderBy: { date: 'desc' },
          },
        },
      });

      return res.status(200).json(subscription);
    } catch (error) {
      console.error('[BillingController.getBilling]', error);
      return res.status(500).json({ message: 'Erro ao buscar dados de faturamento' });
    }
  },

  async cancelSubscription(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Não autorizado' });

    try {
      const subscription = await prisma.subscription.findUnique({ where: { userId } });

      if (!subscription) {
        return res.status(404).json({ message: 'Nenhuma assinatura ativa encontrada' });
      }

      if (subscription.status === 'cancelled') {
        return res.status(400).json({ message: 'Assinatura já está cancelada' });
      }

      const updated = await prisma.subscription.update({
        where: { userId },
        data: {
          status: 'cancelled',
          currentPeriodEnd: subscription.currentPeriodEnd ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      return res.status(200).json({ message: 'Assinatura cancelada com sucesso', subscription: updated });
    } catch (error) {
      console.error('[BillingController.cancelSubscription]', error);
      return res.status(500).json({ message: 'Erro ao cancelar assinatura' });
    }
  },

  async handleWebhook(req: AuthenticatedRequest, res: Response) {
    try {
      const { type, data } = req.body;

      if (type !== 'payment' || !data?.id) {
        return res.status(200).json({ received: true });
      }

      const paymentId = String(data.id);

      const subscription = await prisma.subscription.findFirst({
        where: { mercadoPagoPaymentId: paymentId },
      });

      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: 'active',
            plan: 'Pro',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });

        await prisma.invoice.create({
          data: {
            subscriptionId: subscription.id,
            amount: subscription.price,
            status: 'paid',
            date: new Date(),
          },
        });
      }

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error('[BillingController.handleWebhook]', error);
      return res.status(500).json({ message: 'Erro ao processar webhook' });
    }
  },
};

