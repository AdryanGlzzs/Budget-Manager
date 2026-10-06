import { z } from 'zod'
import { Request, Response, NextFunction } from 'express';

interface TurnstileSiteVerifyResponse {
    success: boolean;
    'error-codes': string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
    metadata?: {
        interactive?: boolean;
    };
}

export const turnstileResponseSchema = z.object({
    success: z.boolean(),
    'error-codes': z.array(z.string()).default([]),
    challenge_ts: z.string().optional(),
    hostname: z.string().optional(),
    action: z.string().optional(),
    cdata: z.string().optional(),
    metadata: z
        .object({
            interactive: z.boolean().optional(),
        })
        .optional(),
});


export const turnstileInputSchema = z.object({
    token: z.string().min(1, 'O token do Turnstile é obrigatório.'),
    remoteip: z.string().optional(),
});

export const TurnstileMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {


        const Rawtoken = (req.headers['x-turnstile-token'] as string) || req.body?.turnstileToken

        const inputValidation = turnstileInputSchema.safeParse({ token: Rawtoken })

        if (!inputValidation.success) {
            return res.status(400).json({
                message: 'Token do Turnstile ausente ou inválido.',
                errors: inputValidation
            });
        }

        const { token } = inputValidation.data
        const secret = process.env.TURNSTILE_SECRET_KEY

        if (!secret) {
            console.error('TURNSTILE_SECRET_KEY não foi encontrada nas variáveis de ambiente.');
            return res.status(500).json({ message: 'Erro interno de configuração no servidor.' });
        }

        const remoteip = req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0]

        const formData = new URLSearchParams();
        formData.append('secret', secret)
        formData.append('response', token)

        if (remoteip) {
            formData.append('remoteip', remoteip)
        }

        const cloudflareRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
        });
        const rawData = await cloudflareRes.json();

        const parsedResponse = turnstileResponseSchema.safeParse(rawData);

        if (!parsedResponse.success || !parsedResponse.data.success) {
            const errorCodes = parsedResponse.success ? parsedResponse.data['error-codes'] : [];
            return res.status(403).json({
                message: 'Falha na verificação de segurança do Captcha.',
                errorCodes,
            });
        }
        return next();

    } catch (error) {
        console.error('Erro no TurnstileMiddleware:', error);
        return res.status(500).json({
            message: 'Erro interno ao validar a verificação de segurança.',
        });
    }

}


