import { LayoutHome } from "@/layout/LayoutHome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CircleDollarSign } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { DepositSection } from "@/components/Deposito/deposito";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "game";
  title: string;
  subtitle?: string;
  amount: number;
  date: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
}

export function Transactions() {
  const [balance] = useState(5250.0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Todos");

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "deposit",
      title: "Depósito via PIX",
      amount: 1000.0,
      date: "15/05/2023, 14:30",
      status: "COMPLETED",
    },
    {
      id: "2",
      type: "game",
      title: "Vitória na mesa #4532",
      subtitle: "Poker Texas Hold'em",
      amount: 2500.0,
      date: "15/05/2023, 16:45",
      status: "COMPLETED",
    },
    {
      id: "3",
      type: "game",
      title: "Aposta em vermelho",
      subtitle: "Roleta Europeia",
      amount: -1200.0,
      date: "16/05/2023, 10:15",
      status: "COMPLETED",
    },
    {
      id: "4",
      type: "withdrawal",
      title: "Saque via transferência bancária",
      amount: -2000.0,
      date: "17/05/2023, 09:30",
      status: "COMPLETED",
    },
    {
      id: "5",
      type: "game",
      title: "Rodada bônus",
      subtitle: "Caça-níqueis Fortune Tiger",
      amount: 3500.0,
      date: "18/05/2023, 20:10",
      status: "COMPLETED",
    },
    {
      id: "6",
      type: "game",
      title: "Mesa VIP",
      subtitle: "Blackjack",
      amount: -800.0,
      date: "19/05/2023, 15:20",
      status: "COMPLETED",
    },
  ];

  const tabs = ["Todos", "Depósitos", "Saques", "Histórico de Jogadas"];
  const handleDeposit = (amount: number, method: string) => {
    // In a real app, this would call an API to process the deposit
    const newTransaction = {
      id: `tx${transactions.length + 1}`,
      type: "deposit",
      method,
      amount,
      date: new Date(),
      status: "completed",
    }
  }
  

  return (
    <LayoutHome>
      <Heading className="mb-10" >Saldo e Transações</Heading>
      <div className="max-h-screen">
        <div className="grid grid-cols-12 gap-6">
          {/* Transaction History - Left Column */}
          <div className="col-span-8">
            <div className="bg-[#1D1F2C] rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  Histórico de Transações
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between space-x-4">
                    <div className="w-full">
                      <Input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-[#282B3B] border-[#45474F] text-white"
                      />
                    </div>
                    <select
                      className="bg-[#282B3B] border border-[#45474F] rounded-md px-4 py-2 text-white"
                      defaultValue="Todos"
                    >
                      <option>Todos</option>
                    </select>
                  </div>
                  <div className="flex space-x-4 border-b border-[#45474F]">
                    {tabs.map((tab) => (
                      <Button
                        key={tab}
                        className={`pb-2 px-4 text-sm font-medium ${
                          selectedTab === tab
                            ? "text-white border-b-2 border-yellow-500"
                            : "text-black hover:text-white"
                        }`}
                        onClick={() => setSelectedTab(tab)}
                      >
                        {tab}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#282B3B] hover:bg-[#2F324A] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0
                              ? "bg-emerald-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          <CircleDollarSign
                            className={
                              transaction.amount > 0
                                ? "text-emerald-500"
                                : "text-red-500"
                            }
                            size={20}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {transaction.title}
                          </h3>
                          {transaction.subtitle && (
                            <p className="text-sm text-gray-400">
                              {transaction.subtitle}
                            </p>
                          )}
                          <p className="text-sm text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.amount > 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}R${" "}
                          {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <span className="text-xs text-gray-400">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Balance Section - Right Column */}
          <div className="col-span-4 space-y-4">
            <div className="bg-[#1D1F2C] rounded-lg border border-gray-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Saldo</h2>
                <span className="font-bold text-white">R$0,01</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Saque disponível</span>
                  <span className="text-white">R$0,01</span>
                </div>
                <div className="space-y-2">
                  <Button>Sacar</Button>
                  <Button className="bg-green-600">Depositar</Button>
                </div>
              </div>
            </div>
            <div>
              <DepositSection onDeposit={handleDeposit} />
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
}