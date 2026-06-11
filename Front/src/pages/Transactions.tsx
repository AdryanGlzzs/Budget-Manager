import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { TransactionModal } from "../components/TransactionModal";  
import type { TransactionProps } from "../components/TransactionModal";

const Transactions = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [transaction, setTransactions] = useState<TransactionProps[]>([]);

  const TotalRevenue = transaction.filter(t => t.type === 'revenue').reduce((sun, t) => sun + t.amount , 0)
  const TotalExpense = transaction.filter(t => t.type === 'expense').reduce((decrease , t) => decrease + t.amount, 0)
  const TotalBalance = [TotalExpense, TotalRevenue].reduce((total, t) => total + t, 0)
  console.log(TotalBalance)


  const HandleSaveTransaction = (NewTransaction: TransactionProps) => {
    setTransactions((prev) => [...prev, NewTransaction]);
    setOpenModal(false);
  };

  const HandleRemove = (id: number) => {
    console.log("clicado")
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const selectedFilter = "Tudo";
  const selectedCategory = "Todas as Categorias";

  const filterOptions = ["Tudo", "Receita", "Despesas", "Pendente"];

  const filteredTransactions = transaction;

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <div>
          <Header />
        </div>

        <div className="flex ">
          <div className="lg:pr-60">
            <Sidebar open={open} setOpen={setOpen} />
          </div>

          <main className="flex-1 w-full p-4 sm:p-8 max-w-[1400px] overflow-x-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-[42px] font-bold mb-3 mt-20">Transações</h1>
                <p className="w-full sm:text-[16px] text-gray-400">
                  Acompanhe e gerencie todas as suas transações financeiras
                </p>
              </div>
              <button
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all hover:scale-[1.02] w-full sm:w-auto flex-shrink-0 sm:mt-20 z-[20]"
                onClick={() => setOpenModal(true)}
              >
                <Plus className="w-5 h-5" />
                Nova Transação
              </button>
            </div>

            <section className="flex flex-col items-center justify-center w-full">
              <div className="w-full p-4 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">
                        Receita Total
                      </div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{TotalRevenue.toFixed(2)}</div>
                    <div className="text-[13px] text-green-400">Este mês</div>
                  </div>
                </div>

                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-cyan-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/10 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <TrendingDown className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">
                        Despesas Totais
                      </div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{TotalExpense.toFixed(2)}</div>
                    <div className="text-[13px] text-red-400">Este mês</div>
                  </div>
                </div>

                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-green-600/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/10 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                        <ArrowUpRight className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="text-[14px] text-gray-400">Saldo</div>
                    </div>
                    <div className="text-[32px] font-bold mb-1">{TotalBalance.toFixed(2)}</div>
                    <div className="text-[13px] text-green-400">Este mês</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                      {filterOptions.map((filter) => (
                        <button
                          key={filter}
                          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[13px] sm:text-[14px] font-medium transition-all ${
                            selectedFilter === filter
                              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[13px] sm:text-[14px] hover:bg-white/10 transition-all">
                      <Filter className="w-4 h-4" />
                      {selectedCategory}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[13px] sm:text-[14px] hover:bg-white/10 transition-all">
                      <Calendar className="w-4 h-4" />
                      Este Mês
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[13px] sm:text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                      <Download className="w-4 h-4 sm:ml-1" />
                      Exportar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-white/5 text-[13px] text-gray-400 font-medium">
                  <div className="col-span-4">Transação</div>
                  <div className="col-span-2">Categoria</div>
                  <div className="col-span-2">Data e Hora</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-1 text-right">Valor</div>
                  <div className="col-span-1 text-right">Ações</div>
                </div>

                <div className="divide-y divide-white/5">
                  {filteredTransactions.map((transaction) => {
                    const Icon = transaction.icon;
                    return (
                      <div
                        key={transaction.id}
                        className="px-4 py-4 sm:px-6 sm:py-5 hover:bg-white/5 transition-all cursor-pointer group/item"
                      >
                        <div className="flex flex-col gap-4 sm:hidden">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                                style={{
                                  backgroundColor: `${transaction.color}20`,
                                  boxShadow: `0 4px 12px ${transaction.color}20`,
                                }}
                              >
                                <Icon
                                  className="w-4 h-4"
                                  style={{ color: transaction.color }}
                                />
                              </div>
                              <div>
                                <div className="text-[14px] font-medium mb-0.5">
                                  {transaction.name}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                  ID: #
                                  {transaction.id.toString().padStart(6, "0")}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div
                                className={`text-[16px] font-bold ${
                                  transaction.amount > 0
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {transaction.amount > 0 ? "+" : ""}$
                                {Math.abs(transaction.amount).toFixed(2)}
                              </div>
                              <button
                                onClick={() => HandleRemove(transaction.id)}
                                className="p-2 bg-red-500/10 text-red-400 rounded-lg z-20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-[11px]">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: transaction.color,
                                  boxShadow: `0 0 6px ${transaction.color}60`,
                                }}
                              ></div>
                              {transaction.category}
                            </div>
                            <div className="text-[12px] text-gray-400 flex-1 text-center px-2">
                              {transaction.dateString}
                            </div>
                            <span
                              className={`px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                                transaction.status === true
                                  ? "bg-green-400/10 text-green-400"
                                  : "bg-yellow-400/10 text-yellow-400"
                              }`}
                            >
                              {transaction.status === true
                                ? "Concluído"
                                : "Pendente"}
                            </span>
                          </div>
                        </div>

                        <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-4 flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                              style={{
                                backgroundColor: `${transaction.color}20`,
                                boxShadow: `0 4px 12px ${transaction.color}20`,
                              }}
                            >
                              <Icon
                                className="w-5 h-5"
                                style={{ color: transaction.color }}
                              />
                            </div>
                            <div>
                              <div className="text-[15px] font-medium mb-1">
                                {transaction.name}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                ID: #
                                {transaction.id.toString().padStart(6, "0")}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-[13px]">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: transaction.color,
                                  boxShadow: `0 0 6px ${transaction.color}60`,
                                }}
                              ></div>
                              {transaction.category}
                            </div>
                          </div>

                          <div className="col-span-2 text-[14px] text-gray-400">
                            {transaction.dateString}
                          </div>

                          <div className="col-span-2 flex justify-center">
                            <span
                              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${
                                transaction.status === true
                                  ? "bg-green-400/10 text-green-400"
                                  : "bg-yellow-400/10 text-yellow-400"
                              }`}
                            >
                              {transaction.status === true
                                ? "Concluído"
                                : "Pendente"}
                            </span>
                          </div>

                          <div className="col-span-1 text-right">
                            <div
                              className={`text-[16px] font-bold ${
                                transaction.amount > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : "-"}$
                              {Math.abs(transaction.amount).toFixed(2)}
                            </div>
                          </div>

                          <div className="col-span-1 text-right">
                            <button
                              onClick={() => HandleRemove(transaction.id)}
                              className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 opacity-0 group-hover/item:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-500" />
                    </div>
                    <div className="text-[18px] font-semibold mb-2">
                      Nenhuma transação encontrada
                    </div>
                    <div className="text-[14px] text-gray-500">
                      Tente ajustar seus filtros
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <div>
        <TransactionModal
          Isopen={openModal}
          close={() => setOpenModal(false)}
          onSave={HandleSaveTransaction}
        />
      </div>
    </div>
  );
};

export default Transactions;
