import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../middlewares/AuthMiddleware';
import { MercadoPagoConfig, Payment, PreApproval } from 'mercadopago';

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

  async handleWebhook(req: Request, res: Response) {
    try {
      const type = req.body?.type || req.query?.type || req.body?.topic || req.query?.topic || req.body?.action;
      const resourceId = req.body?.data?.id || req.query?.['data.id'] || req.query?.id;

      if (!resourceId) {
        return res.status(200).json({ received: true });
      }

      const client = new MercadoPagoConfig({
        accessToken: process.env.MARKETPAID_ACESS_TOKEN || '',
        options: { timeout: 8000 }
      });

      let userId: string | null = null;
      let planName: string = 'Pro';
      let billingCycle: string = 'monthly';
      let status: string = 'active';
      let amount: number = 29.9;
      let paymentId: string = String(resourceId);
      let cardLastFour: string | null = null;
      let cardBrand: string | null = null;

      const isPreApproval = String(type).includes('preapproval');

      if (isPreApproval) {
        try {
          const preapproval = new PreApproval(client);
          const subInfo = await preapproval.get({ id: String(resourceId) });

          if (subInfo.external_reference) {
            try {
              const parsed = JSON.parse(subInfo.external_reference);
              userId = parsed.userId;
              planName = parsed.planName || 'Pro';
              billingCycle = parsed.billingCycle || 'monthly';
            } catch {
              userId = subInfo.external_reference;
            }
          }

          status = subInfo.status === 'authorized' ? 'active' : subInfo.status || 'inactive';
          amount = subInfo.auto_recurring?.transaction_amount || (planName === 'Business' ? 79.9 : 29.9);
        } catch (err) {
          console.error('[handleWebhook preapproval.get error]', err);
        }
      } else {
        try {
          const payment = new Payment(client);
          const paymentInfo = await payment.get({ id: String(resourceId) });

          if (paymentInfo.external_reference) {
            try {
              const parsed = JSON.parse(paymentInfo.external_reference);
              userId = parsed.userId;
              planName = parsed.planName || 'Pro';
              billingCycle = parsed.billingCycle || 'monthly';
            } catch {
              userId = paymentInfo.external_reference;
            }
          }

          status = paymentInfo.status === 'approved' ? 'active' : paymentInfo.status || 'pending';
          amount = paymentInfo.transaction_amount || (planName === 'Business' ? 79.9 : 29.9);
          cardLastFour = paymentInfo.card?.last_four_digits || null;
          cardBrand = paymentInfo.payment_method_id || null;
        } catch (err) {
          console.error('[handleWebhook payment.get error]', err);
        }
      }

      if (!userId) {
        const existingSub = await prisma.subscription.findFirst({
          where: { mercadoPagoPaymentId: paymentId }
        });
        if (existingSub) {
          userId = existingSub.userId;
          planName = existingSub.plan;
          billingCycle = existingSub.billingCycle;
        }
      }

      if (!userId) {
        console.warn(`[Webhook MP] Ignorando notificação: nenhum usuário associado ao id ${resourceId}`);
        return res.status(200).json({ received: true, note: 'No user identified' });
      }

      if (status === 'active') {
        const periodDays = billingCycle === 'yearly' ? 365 : 30;
        const currentPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000);

        const subscription = await prisma.subscription.upsert({
          where: { userId },
          update: {
            status: 'active',
            plan: planName,
            price: amount,
            billingCycle,
            currentPeriodStart: new Date(),
            currentPeriodEnd,
            mercadoPagoPaymentId: paymentId,
            ...(cardLastFour && { cardLastFour }),
            ...(cardBrand && { cardBrand }),
          },
          create: {
            userId,
            status: 'active',
            plan: planName,
            price: amount,
            billingCycle,
            currentPeriodStart: new Date(),
            currentPeriodEnd,
            mercadoPagoPaymentId: paymentId,
            cardLastFour,
            cardBrand,
          },
        });

        await prisma.invoice.create({
          data: {
            subscriptionId: subscription.id,
            amount,
            status: 'paid',
            date: new Date(),
          },
        });
      } else if (['cancelled', 'paused', 'rejected'].includes(status)) {
        await prisma.subscription.updateMany({
          where: { userId },
          data: { status },
        });
      }

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error('[BillingController.handleWebhook]', error);
      return res.status(500).json({ message: 'Erro ao processar webhook' });
    }
  },
};

