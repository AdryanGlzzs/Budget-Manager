import { Request, Response, NextFunction } from "express";
import { z } from "zod"

const SchemaUserSignUp = z.object({
    name: z.string().min(3, "O nome tem que ter no minimo 3 caracteres").trim(),
    email: z.string().trim().min(1, "Email é obrigatorio").pipe(z.email("Email invalido")),
    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

const SchemaUserLogin = z.object({
    email: z.string().trim().pipe(z.email("Email invalido")),
    password: z.string().min(8, "A senha deve possuir 8 caracteres")
})

export const SignUpUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body

    const result = SchemaUserSignUp.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    }

    next()
}

export const LoginUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const result = SchemaUserLogin.safeParse(req.body)

    if (!result.success) {
        res.status(400).json({
            errors: result.error.issues,
        })
    }

    next()
}



