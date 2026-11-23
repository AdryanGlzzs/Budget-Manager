import 'dotenv/config';
import { MercadoPagoConfig, Preference, PreApproval } from 'mercadopago';

export interface CreatePaymentDTO {
    userId: string;
    transactionAmount: number;
    planName: string;
    billingCycle?: 'monthly' | 'yearly';
    description: string;
    email: string;
    payerFirstName?: string;
    payerLastName?: string;
    identificationType?: string;
    identificationNumber?: string;
    recurring?: boolean;
}

export const createPaymentService = async (data: CreatePaymentDTO) => {
    const client = new MercadoPagoConfig({
        accessToken: process.env.MARKETPAID_ACESS_TOKEN || '',
        options: { timeout: 8000 }
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    const externalReference = JSON.stringify({
        userId: data.userId,
        planName: data.planName,
        billingCycle: data.billingCycle || 'monthly'
    });

    // Se solicitado fluxo de assinatura recorrente automática
    if (data.recurring) {
        try {
            const preapproval = new PreApproval(client);
            const subResponse = await preapproval.create({
                body: {
                    reason: data.description || `Assinatura ${data.planName} - Budget Manager`,
                    auto_recurring: {
                        frequency: data.billingCycle === 'yearly' ? 12 : 1,
                        frequency_type: 'months',
                        transaction_amount: Number(data.transactionAmount),
                        currency_id: 'BRL',
                    },
                    back_url: `${frontendUrl}/settings?tab=billing&status=success`,
                    payer_email: data.email,
                    external_reference: externalReference,
                }
            });

            if (subResponse.init_point) {
                return {
                    id: subResponse.id,
                    init_point: subResponse.init_point,
                    sandbox_init_point: subResponse.init_point,
                    type: 'subscription'
                };
            }
        } catch (recurringError) {
            console.warn('[MercadoPago PreApproval] Assinatura automática não disponível ou rejeitada no ambiente. Usando checkout preference como fallback:', recurringError);
        }
    }

    // Checkout via Preference (Pagamento pontual / Cartão / Pix / Boleto) com vínculo seguro
    const preference = new Preference(client);

    try {
        const response = await preference.create({
            body: {
                items: [
                    {
                        id: `plan-${data.planName.toLowerCase()}`,
                        title: data.description || `Assinatura ${data.planName} - Budget Manager`,
                        quantity: 1,
                        unit_price: Number(data.transactionAmount),
                        currency_id: 'BRL'
                    }
                ],
                payer: {
                    email: data.email,
                    name: data.payerFirstName,
                    surname: data.payerLastName,
                    identification: {
                        type: data.identificationType,
                        number: data.identificationNumber,
                    },
                },
                external_reference: externalReference,
                back_urls: {
                    success: `${frontendUrl}/settings?tab=billing&status=success`,
                    failure: `${frontendUrl}/pricing?status=failure`,
                    pending: `${frontendUrl}/settings?tab=billing&status=pending`
                },
                auto_return: 'approved',
                notification_url: `${backendUrl}/webhooks/mercadopago`,
            },
        });

        return {
            id: response.id,
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point || response.init_point,
            type: 'preference'
        };
    } catch (error) {
        console.error('Erro no Mercado Pago:', error);
        throw error;
    }
};
