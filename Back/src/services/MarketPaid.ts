import 'dotenv/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

interface CreatePaymentDTO {
    transactionAmount: number
    description: string
    email: string
    payerFirstName?: string
    payerLastName?: string
    identificationType?: string
    identificationNumber?: string
}

export const createPaymentService = async (data: CreatePaymentDTO) => {
    const client = new MercadoPagoConfig({
        accessToken: process.env.MARKETPAID_ACESS_TOKEN || '',
        options: { timeout: 5000 }
    });

    const preference = new Preference(client);

    try {
         const response = await preference.create({
            body: {
                items: [
                    {
                        id: 'plan-premium',
                        title: data.description || 'Assinatura Budget Manager',
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
                back_urls: {
                    success: 'http://localhost:5173',
                    failure: 'http://localhost:5173',
                    pending: 'http://localhost:5173'
                }
            },
        });


        return {
            id: response.id,
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point
        };
    } catch (error) {
        console.error('Erro no Mercado Pago:', error);
        throw error;
    }
};
