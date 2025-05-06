"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, QrCode, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/Label"

interface DepositSectionProps {
  onDeposit: (amount: number, method: string) => void
}

export function DepositSection({ onDeposit }: DepositSectionProps) {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      onDeposit(Number(amount), paymentMethod)
      setAmount("")
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <Card className="bg-[#1D1F2C] rounded-lg border border-gray-800 p-6">
      <CardHeader>
        <CardTitle>Depósito</CardTitle>
        <CardDescription>Escolha um método de pagamento para adicionar fundos à sua conta.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Quantia</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid items-center h-auto grid-cols-2 gap-4">
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
                <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
                <Label
                  htmlFor="credit"
                  className="flex flex-col h-24 items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Cartão de Crédito
                </Label>
              </div>


              <div>
                <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                <Label
                  htmlFor="wallet"
                  className="flex flex-col h-24 items-center justify-center rounded-md border border-solid bg-[#1D1F2C] p-4 hover:border-yellow-600 hover:text-yellow-600 peer-data-[state=checked]:text-yellow-600 [&:has([data-state=checked])]:border-yellow-600 [&:has([data-state=checked])]:text-yellow-600"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  Cartão de Débito
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
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full mt-4"
            
          >
            Depositar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
