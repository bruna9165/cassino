import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Lock, Mail, PartyPopper, UserRound } from "lucide-react";
import { useState } from "react";
import { Cadastro } from "@/api/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { differenceInYears } from "date-fns";

const validateCpf = (cpf: string): boolean => {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (cleanedCpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cleanedCpf)) return false;

  const calculateCheckDigit = (cpf: string, length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(cpf[i]) * (length + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calculateCheckDigit(cleanedCpf, 9);
  if (firstCheckDigit !== parseInt(cleanedCpf[9])) return false;

  const secondCheckDigit = calculateCheckDigit(cleanedCpf, 10);
  if (secondCheckDigit !== parseInt(cleanedCpf[10])) return false;

  return true;
};

export function Register() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [cpfError, setCpfError] = useState<string>(""); 
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const validateAge = (date: string): boolean => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = differenceInYears(today, birthDate);
    return age >= 18;
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setEmailError("");
    setCpfError(""); 
    setFieldErrors({});

    const errors: { [key: string]: string } = {};

    if (!nome) errors.nome = "Esse campo é obrigatório.";
    if (!email) errors.email = "Esse campo é obrigatório.";
    if (!cpf) {
      errors.cpf = "Esse campo é obrigatório";
    } else if (!validateCpf(cpf)) {
      errors.cpf = "CPF inválido.";
    }
    if (!dataNascimento) errors.dataNascimento = "Esse campo é obrigatório.";
    if (!senha) errors.senha = "Esse campo é obrigatório.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!validateAge(dataNascimento)) {
      setError("Você deve ter pelo menos 18 anos para criar uma conta.");
      return;
    }

    const resultado = await Cadastro(nome, email, cpf, dataNascimento, senha);
    if (resultado.status === 200) {
      setShowDialog(true);
    } else if (resultado.status === 500) {
      setEmailError("Email já cadastrado.");
    } else if (resultado.status === 404) {
      setCpfError("CPF já cadastrado."); 
    } else {
      setError("Erro ao cadastrar. Tente novamente.");
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setEmailError("");
    setCpfError(""); 
    setError("");
    switch (field) {
      case "nome":
        setNome(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "cpf":
        const cleanedValue = value.replace(/\D/g, "");
        const formattedCpf = cleanedValue
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
          .slice(0, 14);
        setCpf(formattedCpf);
        break;
      case "dataNascimento":
        setDataNascimento(value);
        break;
      case "senha":
        setSenha(value);
        break;
    }
  };

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background: linear-gradient(to bottom, #07080D, #1D1F2C);
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeUp {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.8s ease-out forwards;
          }
        `}
      </style>

      <div className="flex items-center bg-gradient-to-b from-[#07080D] to-[#1D1F2C] w-screen h-[100vh] animate-fadeUp p-0 m-0">
        <div className="w-1/2 flex justify-center items-center">
          <img src="../../../banner.png" alt="banner" />
        </div>
        <div className="flex flex-col justify-center items-center gap-8 h-screen w-1/2">
          <div className="text-white h-full flex justify-center items-center flex-col gap-6 animate-fadeUp">
            <Heading className="flex w-full font-bold text-white animate-fadeUp">
              Criar Conta
            </Heading>
            <form className="space-y-6" onSubmit={submit}>
              <div className="relative">
                <Input
                  name="nome"
                  value={nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  type="text"
                  label="Nome Completo"
                  placeholder="Digite seu nome completo"
                  iconRight={<Mail />}
                  className={`w-96 ${fieldErrors.nome ? "border-red-500" : ""}`}
                />
                {fieldErrors.nome && (
                  <label className="absolute text-red-500 text-sm mt-1">
                    {fieldErrors.nome}
                  </label>
                )}
              </div>
              <div className="relative">
                <Input
                  name="email"
                  value={email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="email"
                  label="Endereço de E-mail"
                  placeholder="Digite seu e-mail"
                  iconRight={<Mail />}
                  className={`w-96 ${fieldErrors.email || emailError ? "border-red-500" : ""}`}
                />
                {(fieldErrors.email || emailError) && (
                  <label className="absolute text-red-500 text-sm mt-1">
                    {fieldErrors.email || emailError}
                  </label>
                )}
              </div>
              <div className="relative">
                <Input
                  name="cpf"
                  value={cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  type="text"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  iconRight={<UserRound />}
                  className={`w-96 ${fieldErrors.cpf || cpfError ? "border-red-500" : ""}`}
                />
                {(fieldErrors.cpf || cpfError) && (
                  <label className="absolute text-red-500 text-sm mt-1">
                    {fieldErrors.cpf || cpfError}
                  </label>
                )}
              </div>
              <div className="relative">
                <Input
                  name="data_nascimento"
                  value={dataNascimento}
                  onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                  type="date"
                  label="Data de Nascimento"
                  placeholder="Digite sua data de nascimento"
                  className={`text-slate-300 w-96 placeholder:text-slate-500 ${
                    fieldErrors.dataNascimento || error ? "border-red-500" : ""
                  }`}
                />
                {(fieldErrors.dataNascimento || error) && (
                  <label className="absolute text-red-500 text-sm mt-1">
                    {fieldErrors.dataNascimento || error}
                  </label>
                )}
              </div>
              <div className="relative">
                <Input
                  name="senha"
                  value={senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  type="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  iconRight={<Lock />}
                  className={`text-slate-300 w-96 placeholder:text-slate-500 ${
                    fieldErrors.senha ? "border-red-500" : ""
                  }`}
                />
                {fieldErrors.senha && (
                  <label className="absolute text-red-500 text-sm mt-1">
                    {fieldErrors.senha}
                  </label>
                )}
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button type="submit" className="text-lg mt-2 h-12 w-96 text-black">
                  Cadastrar
                </Button>
                <p className="text-gray-400">
                  Já tem uma conta?{" "}
                  <Link
                    className="text-yellow-500 hover:underline hover:text-yellow-600 no-underline"
                    to={"/"}
                  >
                    Entrar
                  </Link>
                </p>
              </div>
            </form>
            {showDialog && (
              <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-yellow-500 text-3xl">
                      Parabéns{" "}
                      <PartyPopper className="text-yellow-500 w-6 h-6" />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-lg">
                      Conta criada com sucesso!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Link to={"/"} className="w-full">
                      <AlertDialogAction>Avançar</AlertDialogAction>
                    </Link>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </>
  );
}