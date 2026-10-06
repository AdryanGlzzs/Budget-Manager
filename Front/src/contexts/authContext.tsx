import React, { useState, useContext, useEffect, createContext, type ReactNode } from "react";
import { api } from "../services/api";
import axios from "axios";

export interface User {
    id: string;
    email?: string;
    name?: string;
    avatar?: string;
}

interface AuthContextType {
    User: User | null;
    Loading: boolean;
    Register: (name: string, email: string, password: string, turnstileToken?: string) => Promise<void>;
    Login: (email: string, password: string, turnstileToken?: string) => Promise<void>;
    Logout: () => Promise<void>;
    ValidateToken: () => Promise<void>;
    setUser: (user: User | null) => void;
}

interface AuthContextProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {

    const [isUser, setIsUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const ValidateToken = async () => {
        try {
            const response = await api.get<User>("/users/me")
            setIsUser(response.data)
        } catch (error) {
            setIsUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        ValidateToken()
    }, [])

    const Register = async (name: string, email: string, password: string, turnstileToken?: string) => {
        try {
            const response = await api.post('/signup', { name, email, password, turnstileToken })
            const userData = response.data.user || response.data

            setIsUser(userData)
        } catch (error) {
            console.error("Erro no registro", error);
            throw error;
        }
    }

    const Login = async (email: string, password: string, turnstileToken?: string) => {
        try {
            const response = await api.post('/login', { email, password, turnstileToken })
            const userData = response.data.user || response.data
            setIsUser(userData)
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    }

    const Logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Erro no logout:", error);
        } finally {
            setIsUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ Login, Register, Logout, User: isUser, Loading: loading, ValidateToken, setUser: setIsUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthContextProvider")
    }

    return context
}