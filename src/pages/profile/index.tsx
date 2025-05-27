import { Heading } from "@/components/ui/heading";
import { LayoutHome } from "@/layout/LayoutHome";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { BuscarPerfil, MudarPerfil } from "@/api/api";

export function Profile() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [data_nascimento, setDataNascimento] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const dados = await BuscarPerfil();
        if (dados.status === 200) {
          setNome(dados.nome || "");
          setEmail(dados.email || "");
          setCpf(dados.cpf || "");
          setDataNascimento(dados.data_nascimento || "");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }
    fetchPerfil();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    

    const mudarPerfil = await MudarPerfil(nome, email );
    if (mudarPerfil.status === 200) {
      console.log("Perfil atualizado com sucesso!");
    } else {
      console.log("Erro ao atualizar perfil:");
    }
  }



  return (
    <LayoutHome>
      <Heading className="mb-10">Perfil</Heading>
      <div className="bg-[#1D1F2C] w-1/2 rounded-lg border border-gray-800 p-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-6 justify-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3 w-80">
              <Button className="rounded">Adicionar Foto</Button>
              <Button className="rounded">Excluir foto</Button>
            </div>
          </div>
          <form className="space-y-6" onSubmit={submit}>
            <Input
              type="text"
              label="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              readOnly={!isEditing}
              className={
                isEditing
                  ? "bg-gray-900 text-white"
                  : "bg-gray-800 text-slate-400 cursor-not-allowed"
              }
            />
            <Input
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing}
              className={
                isEditing
                  ? "bg-gray-900 text-white"
                  : "bg-gray-800 text-slate-400 cursor-not-allowed"
              }
            />
            <Input
              type="text"
              label="CPF"
              value={cpf}
              readOnly
              className="bg-gray-800 text-slate-400 cursor-not-allowed"
            />
            <Input
              type="text"
              label="Data de Nascimento"
              value={data_nascimento}
              readOnly
              className="bg-gray-800 text-slate-400 cursor-not-allowed"
            />
            <div className="mt-2 flex w-full justify-end">
              <Button
                className="h-12 w-64"
                onClick={(submit) => setIsEditing(!isEditing)}
              >
                {isEditing ? "Salvar" : "Editar informações"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </LayoutHome>
  );
}