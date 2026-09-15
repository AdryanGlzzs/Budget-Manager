import { X, CreditCard } from "lucide-react";
import { getIdentificationTypes } from "@mercadopago/sdk-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../services/api";

interface MarkedPaid {
    isOpen: boolean;
    onClose?: () => void;
    planName: string | null
}

interface IdentificationType {
    id: string,
    name: string,
}

export const MarketPaidCheckout = ({ isOpen, onClose, planName }: MarkedPaid) => {
    const [identificationTypes, setIdentificationTypes] = useState<IdentificationType[]>([]);
    const [selectedDocType, setSelectedDocType] = useState<string>('');

    useEffect(() => {
        if (!isOpen) return;
        const fetchDocTypes = async () => {
            try {
                const types = await getIdentificationTypes();
                if (types && types.length > 0) {
                    setIdentificationTypes(types);
                    setSelectedDocType(types[0].id);
                }
            } catch (error) {
                console.error("Error ao buscar tipos de documento", error);
            }
        };
        fetchDocTypes();
    }, [isOpen]);


    if (!isOpen) return null;


    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const PaymentData = {
            planName: formData.get("planName"),
            payerFirstName: formData.get("payerFirstName"),
            payerLastName: formData.get("payerLastName"),
            email: formData.get("email"),
            identificationType: selectedDocType,
            identificationNumber: formData.get("identificationNumber"),
        }

        console.log(PaymentData)

        try {


            const response = await api.post("/process_payment", PaymentData)

            console.log("Pagamento processado", response.data)

            const checkoutUrl = response.data.payment.sandbox_init_point || response.data.payment.init_point;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }

            if (onClose) onClose()
        } catch (error: any) {
            console.error("Erro detalhado:", error.response?.data);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-[#0a0a14]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/50 text-white backdrop-blur-xl overflow-hidden">

                <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                                Checkout de Pagamento
                            </h2>
                            <p className="text-xs text-gray-400">Preencha os dados abaixo para continuar</p>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            type="button"
                            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <form className="space-y-4" onSubmit={HandleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="payerFirstName" className="block text-xs font-medium text-gray-300 mb-1.5">
                                Nome
                            </label>
                            <input
                                id="form-checkout__payerFirstName"
                                name="payerFirstName"
                                type="text"
                                defaultValue="Test"
                                placeholder="Seu nome"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="payerLastName" className="block text-xs font-medium text-gray-300 mb-1.5">
                                Sobrenome
                            </label>
                            <input
                                id="form-checkout__payerLastName"
                                name="payerLastName"
                                type="text"
                                defaultValue="User"
                                placeholder="Seu sobrenome"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">
                            E-mail
                        </label>
                        <input
                            id="form-checkout__email"
                            name="email"
                            type="email"
                            placeholder="Insira o e-mail (ex: user@testuser.com)"
                            className="w-full px-4 py-3 bg-white/5 border border-purple-500/40 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="identificationType" className="block text-xs font-medium text-gray-300 mb-1.5">
                                Tipo de documento
                            </label>
                            <select
                                id="form-checkout__identificationType"
                                name="identificationType"
                                value={selectedDocType}
                                onChange={(e) => setSelectedDocType(e.target.value)}
                                className="w-full px-4 py-3 bg-[#0d0d1a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            >
                                {identificationTypes.map((type) => (
                                    <option key={type.id} value={type.id}> {type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="identificationNumber" className="block text-xs font-medium text-gray-300 mb-1.5">
                                Número do documento
                            </label>
                            <input
                                id="form-checkout__identificationNumber"
                                name="identificationNumber"
                                type="text"
                                placeholder="000.000.000-00"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <input type="hidden" name="planName" value={planName || "Free"} />
                    <input type="hidden" name="description" id="description" value="Nome do Produto" />

                    <div className="pt-4 flex items-center gap-3">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-1/3 py-3.5 rounded-xl text-sm font-semibold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                            >
                                Cancelar
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex-1 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            Finalizar Pagamento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketPaidCheckout;

