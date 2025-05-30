import type React from "react";
import { useState, useRef } from "react";
import { CreditCard, QrCode, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/Label";
import { Transacao } from "@/api/api";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
} from "../ui/alert-dialog";
import { Heading } from "../ui/heading";

type MetodoPagamento = "pix" | "credito" | "debito" | "transferencia";

interface DepositSectionProps {
  onDeposit: (amount: number, method: string) => void;
}

export function DepositSection({ onDeposit }: DepositSectionProps) {
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [valor, setValor] = useState<string>("");
  const [estado, setEstado] = useState<string>("deposito");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const metodoMap: Record<MetodoPagamento, number> = {
    pix: 1,
    credito: 2,
    debito: 3,
    transferencia: 4,
  };

  const handleMetodoChange = (value: MetodoPagamento) => {
    setMetodoPagamento(value);
    console.log("Método de pagamento selecionado:", value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(""); // Limpa a mensagem de erro ao digitar
    let input = e.target.value.replace(/[^0-9]/g, "");
    if (input === "") {
      setValor("");
      return;
    }

    const num = parseFloat(input) / 100;
    if (!isNaN(num)) {
      setValor(num.toFixed(2));
    } else {
      setValor("");
    }
  };

  const handleBlur = () => {
    const num = parseFloat(valor);
    if (!isNaN(num)) {
      setValor(num.toFixed(2));
    } else {
      setValor("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(valor);

    if (!valor || isNaN(amount) || amount <= 0) {
      setErrorMessage("Digite um valor válido para depositar.");
      return;
    }

    if (amount < 5) {
      setErrorMessage("Valor mínimo para depósito é cinco reais.");
      return;
    }

    if (amount > 3000) {
      setErrorMessage("Valor máximo para depósito é três mil reais.");
      return;
    }

    setErrorMessage("");

    const metodoNumero = metodoMap[metodoPagamento];
    console.log("Estado atual:", estado);
    console.log("Valores enviados para Transacao:", { metodoNumero, amount, estado });
    const resultado = await Transacao(metodoNumero, amount, estado);
    if (resultado.status === 200) {
      console.log("Transação realizada com sucesso!");
      onDeposit(amount, metodoPagamento);
      setValor("");
      setMetodoPagamento("pix");
    } else {
      console.error("Erro ao realizar transação:", resultado);
      setErrorMessage("Falha ao processar a transação. Tente novamente.");
    }
  };

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleDepositClick = () => {
    const amount = parseFloat(valor);
    if (!valor || isNaN(amount) || amount <= 0) {
      setErrorMessage("Digite um valor válido para depositar.");
    } else if (amount < 5) {
      setErrorMessage("Valor mínimo para depósito é cinco reais.");
    } else if (amount > 3000) {
      setErrorMessage("Valor máximo para depósito é três mil reais.");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <Card className="bg-[#1D1F2C] rounded-lg border border-gray-800 p-6">
      <CardHeader>
        <CardTitle>Depósito</CardTitle>
        <CardDescription>Escolha um método de pagamento para adicionar fundos à sua conta.</CardDescription>
      </CardHeader>
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Quantia</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={`pl-7 ${errorMessage ? "border-red-500" : ""}`}
                value={valor}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              {errorMessage && (
                <Label className="text-red-500 text-sm mt-1">{errorMessage}</Label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <RadioGroup
              value={metodoPagamento}
              onValueChange={(value) => handleMetodoChange(value as MetodoPagamento)}
              className="grid items-center h-auto grid-cols-2 gap-4"
            >
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
                <RadioGroupItem value="credito" id="credito" className="peer sr-only" />
                <Label
                  htmlFor="credito"
                  className="flex flex-col h-24 items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Cartão de Crédito
                </Label>
              </div>

              <div>
                <RadioGroupItem value="debito" id="debito" className="peer sr-only" />
                <Label
                  htmlFor="debito"
                  className="flex flex-col h-24 items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Cartão de Débito
                </Label>
              </div>

              <div>
                <RadioGroupItem value="transferencia" id="transferencia" className="peer sr-only" />
                <Label
                  htmlFor="transferencia"
                  className="flex flex-col h-24 text-center items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                >
                  <Landmark className="mb-2 h-6 w-6" />
                  Transferência Bancária
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleDepositClick} className="w-full mt-4">Depositar</Button>
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <Heading align="center">Confirmar Depósito</Heading>
                <AlertDialogDescription className="text-center text-base text-slate-400">
                  Tem certeza de que deseja confirmar esse depósito?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </form>
    </Card>
  );
}