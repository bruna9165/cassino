"use client"

import { useState } from "react"
import { Bell, ChevronRight, DollarSign, Globe, Lock, User, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heading } from "@/components/ui/heading"
import { LayoutHome } from "@/layout/LayoutHome"

type CustomSwitchProps = {
  checked: boolean;
  onChange: () => void;
};

export function Configuration() {
  const [soundVolume, setSoundVolume] = useState(75);
  const [musicVolume, setMusicVolume] = useState(50);
  const [notifications, setNotifications] = useState({
    promocoes: true,
    atualizacoes: false,
    jogos: false,
    torneios: false,
  });
  const [security, setSecurity] = useState({
    doisFatores: false,
    verificacaoLogin: true,
  });

  const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => (
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
  );

  return (
    <LayoutHome>
      <div className="w-full">

        <div className="flex items-center">
          <Heading className="flex w-full font-bold text-white">
            Configurações
          </Heading>
          
        </div>

        <div className="flex flex-col mt-9 gap-6 w-full">
          {/* Notificações */}
          <Card className="bg-[#1D1F2C] border border-[#45474F] w-full shadow-xl shadow-blue-gray-900/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 flex items-center justify-center p-1 rounded-full">
                    <Bell className="h-4 w-4 text-black" />
                  </div>
                  <h2 className="text-xl font-semibold text-yellow-500 font-sans">Notificações</h2>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Promoções e bônus</span>
                  <CustomSwitch
                    checked={notifications.promocoes}
                    onChange={() => setNotifications({ ...notifications, promocoes: !notifications.promocoes })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Atualizações do sistema</span>
                  <CustomSwitch
                    checked={notifications.atualizacoes}
                    onChange={() => setNotifications({ ...notifications, atualizacoes: !notifications.atualizacoes })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Novos jogos</span>
                  <CustomSwitch
                    checked={notifications.jogos}
                    onChange={() => setNotifications({ ...notifications, jogos: !notifications.jogos })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Torneios</span>
                  <CustomSwitch
                    checked={notifications.torneios}
                    onChange={() => setNotifications({ ...notifications, torneios: !notifications.torneios })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Som e Áudio */}
          <Card className="bg-[#1D1F2C] border border-[#45474F] shadow-xl shadow-blue-gray-900/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 p-1 rounded-full flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-black" />
                  </div>
                  <h2 className="text-xl font-bold text-yellow-500 font-sans">Som e Áudio</h2>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-base font-sans font-medium">Efeitos sonoros</span>
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
                    <span className="text-gray-300 text-base font-sans font-medium">Música de fundo</span>
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
          <Card className="bg-[#1D1F2C] border border-[#45474F] shadow-xl shadow-blue-gray-900/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 p-1 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4 text-black" />
                  </div>
                  <h2 className="text-xl font-semibold text-yellow-500">Segurança</h2>
                </div>  
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Autenticação de dois fatores</span>
                  <CustomSwitch
                    checked={security.doisFatores}
                    onChange={() => setSecurity({ ...security, doisFatores: !security.doisFatores })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Verificação de login</span>
                  <CustomSwitch
                    checked={security.verificacaoLogin}
                    onChange={() => setSecurity({ ...security, verificacaoLogin: !security.verificacaoLogin })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Alterar senha</span>
                  <Button className="w-1/4">
                    Alterar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Idioma */}
          <Card className="bg-[#1D1F2C] border border-[#45474F] shadow-xl shadow-blue-gray-900/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 p-1 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-black" />
                  </div>
                  <h2 className="text-xl font-semibold text-yellow-500 font-sans">Idioma</h2>
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-base font-sans font-medium">Idioma do sistema</span>
                  <Select  defaultValue="pt-BR">
                    <SelectTrigger className="w-28 bg-yellow-500 border-yellow-400/30 text-black font-medium font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-yellow-500 border-yellow-400/30">
                      <SelectItem className="text-base font-sans" value="pt-BR">Português</SelectItem>
                      <SelectItem className="text-base font-sans" value="en-US">English</SelectItem>
                      <SelectItem className="text-base font-sans" value="es-ES">Español</SelectItem>
                      <SelectItem className="text-base font-sans" value="fr-FR">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutHome>
  );
}