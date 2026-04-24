import { Plus } from "lucide-react";
import { useState } from "react";


type TransactionModalProps = {
  Isopen : boolean,
  close: () => void;
}



export const TransactionModal = ({Isopen, close}:TransactionModalProps) => {
    
  if(!Isopen) return null

   
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative w-full max-w-lg bg-[#0a0a1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-[80px]"></div>

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Nova Transação</h2>
              <p className="text-gray-400 text-sm">
                Preencha os detalhes abaixo
              </p>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            onClick={() => close()}
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Descrição
              </label>
              <input
                type="text"
                placeholder="Ex: Assinatura Netflix"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tipo
                </label>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    className="flex-1 py-2 text-xs font-semibold rounded-lg bg-red-500/20 text-red-400"
                  >
                    Despesa
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-2 text-xs font-semibold rounded-lg text-gray-400 hover:text-white"
                  >
                    Receita
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Categoria
                </label>
                <select className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 appearance-none transition-colors">
                  <option>Alimentação</option>
                  <option>Lazer</option>
                  <option>Trabalho</option>
                  <option>Saúde</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
              onClick={() => close()}
                type="button"
                className="flex-1 px-6 py-3.5 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-[2] px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-purple-600/30 transition-all active:scale-95"
              >
                Salvar Transação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
