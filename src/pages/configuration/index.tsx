"use client"

import { useState } from "react"
import { Bell, ChevronRight, DollarSign, Globe, Lock, User, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heading } from "@/components/ui/heading"
import { LayoutHome } from "@/layout/LayoutHome"
import { Switch } from "@/components/ui/switch"

export function Configuration() {
  const [soundVolume, setSoundVolume] = useState(75)
  const [musicVolume, setMusicVolume] = useState(50)

  return (
    <LayoutHome>
      <div className="flex items-center">
        <Heading className="flex w-full font-bold text-white">
          Configurações
        </Heading>
        <Button className="w-80 mr-[610px] rounded">
          Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* Notificações */}
        <Card className="border border-solid w-full border-border border-r-[#07080D] border-t-[#07080D] border-b-[#07080D] border-l-[#07080D] bg-gradient-to-b from-[#07080D] to-[#1D1F2C] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 p-1 rounded-full">
                  <Bell className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-lg font-semibold text-yellow-500">Notificações</h2>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Promoções e bônus</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Atualizações do sistema</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Novos jogos</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Torneios</span>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Som e Áudio */}
        <Card className="border border-solid border-border border-r-[#07080D] border-t-[#07080D] border-b-[#07080D] border-l-[#07080D] bg-gradient-to-b from-[#07080D] to-[#1D1F2C] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 p-1 rounded-full">
                  <Volume2 className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-lg font-bold text-yellow-500">Som e Áudio</h2>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Efeitos sonoros</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-yellow-500" />
                </div>
                <div className="pt-2">
                  <Slider
                    value={[soundVolume]}
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-yellow-500"
                    onValueChange={(value) => setSoundVolume(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>{soundVolume}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Música de fundo</span>
                  <Switch defaultChecked className="data-[state=checked]:bg-yellow-500" />
                </div>
                <div className="pt-2">
                  <Slider
                    value={[musicVolume]}
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-yellow-500"
                    onValueChange={(value) => setMusicVolume(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>{musicVolume}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card className="border border-solid border-border border-r-[#07080D] border-t-[#07080D] border-b-[#07080D] border-l-[#07080D] bg-gradient-to-b from-[#07080D] to-[#1D1F2C] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 p-1 rounded-full">
                  <Lock className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-lg font-semibold text-yellow-500">Segurança</h2>
              </div>
              <ChevronRight className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Autenticação de dois fatores</span>
                <Switch className="data-[state=checked]:bg-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Verificação de login</span>
                <Switch defaultChecked className="data-[state=checked]:bg-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Alterar senha</span>
                <Button className=" text-sm py-1 px-3">
                  Alterar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Idioma */}
        <Card className="border border-solid border-border border-r-[#07080D] border-t-[#07080D] border-b-[#07080D] border-l-[#07080D] bg-gradient-to-b from-[#07080D] to-[#1D1F2C] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 p-1 rounded-full">
                  <Globe className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-lg font-semibold text-yellow-500">Idioma</h2>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Idioma do sistema</span>
                <Select defaultValue="pt-BR">
                  <SelectTrigger className="w-28 bg-zinc-800 border-yellow-400/30 text-yellow-500 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-yellow-400/30">
                    <SelectItem value="pt-BR">Português</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                    <SelectItem value="fr-FR">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutHome>
  );
}