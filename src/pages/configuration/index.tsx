"use client"

import { useState } from "react"
import { Bell, ChevronRight, DollarSign, Globe, Lock, User, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heading } from "@/components/ui/heading"
import { LayoutHome } from "@/layout/LayoutHome"

export function Configuration() {
  const [soundVolume, setSoundVolume] = useState(75)
  const [musicVolume, setMusicVolume] = useState(50)
  const [notifications, setNotifications] = useState({
    promocoes: true,
    atualizacoes: false,
    jogos: false,
    torneios: false,
  })
  const [security, setSecurity] = useState({
    doisFatores: false,
    verificacaoLogin: true,
  })

  const CustomSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-yellow-500' : 'bg-black'}`}>
        <span className={`absolute left-1 top-1 h-4 w-4 bg-white rounded-full transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`} />
      </div>
    </label>
  )

  return (
    <LayoutHome>
      <div className="flex items-center">
        <Heading className="flex w-full font-bold text-white">
          Configurações
        </Heading>
        <Button className="w-80 mr-[610px] bg-yellow-500 hover:bg-yellow-500 text-black">
          Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-col mt-7 gap-6 w-full">
        {/* Notificações */}
        <Card className="bg-[#282B3B] border border-[#45474F] w-full  max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
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
                <CustomSwitch
                  checked={notifications.promocoes}
                  onChange={() => setNotifications({ ...notifications, promocoes: !notifications.promocoes })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Atualizações do sistema</span>
                <CustomSwitch
                  checked={notifications.atualizacoes}
                  onChange={() => setNotifications({ ...notifications, atualizacoes: !notifications.atualizacoes })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Novos jogos</span>
                <CustomSwitch
                  checked={notifications.jogos}
                  onChange={() => setNotifications({ ...notifications, jogos: !notifications.jogos })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Torneios</span>
                <CustomSwitch
                  checked={notifications.torneios}
                  onChange={() => setNotifications({ ...notifications, torneios: !notifications.torneios })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Som e Áudio */}
        <Card className="bg-[#282B3B] border border-[#45474F] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
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
        <Card className="bg-[#282B3B] border border-[#45474F] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500 p-1 rounded-full">
                  <Lock className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-lg font-semibold text-yellow-500">Segurança</h2>
              </div>  
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Autenticação de dois fatores</span>
                <CustomSwitch
                  checked={security.doisFatores}
                  onChange={() => setSecurity({ ...security, doisFatores: !security.doisFatores })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Verificação de login</span>
                <CustomSwitch
                  checked={security.verificacaoLogin}
                  onChange={() => setSecurity({ ...security, verificacaoLogin: !security.verificacaoLogin })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Alterar senha</span>
                <Button className="border-yellow-500 text-black hover:bg-white text-sm py-1 px-3">
                  Alterar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Idioma */}
        <Card className="bg-[#282B3B] border border-[#45474F] max-w-[55rem] shadow-xl shadow-blue-gray-900/5">
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
                  <SelectTrigger className="w-28 bg-yellow-500 border-yellow-400/30 text-black text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-yellow-500 border-yellow-400/30">
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