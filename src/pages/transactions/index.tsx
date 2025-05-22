import { LayoutHome } from "@/layout/LayoutHome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { CircleDollarSign, CreditCard, Landmark, QrCode, Wallet, DollarSign } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { DepositSection } from "@/components/Deposito/deposito";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/Label";
import { BuscarSaldo } from "@/api/api";

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
  const [saldo, setSaldo] = useState<number>(0);
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

  // Busca o saldo ao montar o componente
  useEffect(() => {
    async function fetchSaldo() {
      try {
        const dados = await BuscarSaldo();
        if (dados.status === 200) {
          setSaldo(dados.saldo); // Atualiza o estado com o saldo retornado
        }
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
    }
    fetchSaldo();
  }, []);

  const handleDeposit = (amount: number, method: string) => {
    const newTransaction: Transaction = {
      id: `tx${transactions.length + 1}`,
      type: "deposit",
      title: `Depósito via ${method}`,
      amount,
      date: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "COMPLETED",
    };
    // Aqui você pode adicionar lógica para atualizar a lista de transações ou enviar ao servidor
  };

  return (
    <LayoutHome>
      <div className="flex items-center">
        <Heading className="flex w-full font-bold text-white">Saldo e Transações</Heading>
      </div>
      <div className="w-auto mt-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Transaction History - Left Column */}
          <div className="col-span-8">
            <div className="bg-[#1D1F2C] rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Histórico de Transações</h2>
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
                      value={selectedTab}
                      onChange={(e) => setSelectedTab(e.target.value)}
                    >
                      {tabs.map((tab) => (
                        <option key={tab} value={tab}>
                          {tab}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-4 border-b border-[#45474F]">
                    {tabs.map((tab) => (
                      <Button
                        key={tab}
                        className={`pb-2 px-4 text-sm font-medium ${
                          selectedTab === tab
                            ? "text-white border-b-2 border-yellow-500"
                            : "text-gray-400 hover:text-white"
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
                          <h3 className="font-medium text-white">{transaction.title}</h3>
                          {transaction.subtitle && (
                            <p className="text-sm text-gray-400">{transaction.subtitle}</p>
                          )}
                          <p className="text-sm text-gray-400">{transaction.date}</p>
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
                        <span className="text-xs text-gray-400">{transaction.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 space-y-4">
            <div className="bg-[#1D1F2C] rounded-lg border border-gray-800 p-7">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl font-semibold leading-none tracking-tight text-white">
                      Saldo Disponível
                    </h2>
                  </div>
                </div>
                <div>
                  <span className="font-medium font-sans text-2xl text-white">
                    R$ {saldo}
                  </span>
                </div>
                <div className="space-y-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex items-center space-x-2 w-full">
                        <DollarSign className="h-4 w-4" />
                        <span>Sacar</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[900px]">
                      <AlertDialogHeader>
                        <Heading className="mb-4" align="center">
                          Método de Pagamento
                        </Heading>
                        <AlertDialogDescription>
                          <RadioGroup className="grid items-center h-auto grid-cols-2 gap-4">
                            <div className="h-full w-full">
                              <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                              <Label
                                htmlFor="pix"
                                className="flex flex-col h-24 items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                              >
                                <QrCode className="mb-2 h-6 w-6" />
                                Pix
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                              <Label
                                htmlFor="bank"
                                className="flex flex-col h-24 text-center items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                              >
                                <Landmark className="mb-2 h-6 w-6" />
                                Transferência Bancária
                              </Label>
                            </div>
                          </RadioGroup>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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