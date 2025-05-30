import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { LoginVerificar } from "@/api/api";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [authError, setAuthError] = useState<string>("");

  const InputChange = (field: string, value: string) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setAuthError("");
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "senha":
        setSenha(value);
        break;
    }
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setAuthError("");

    const errors: { [key: string]: string } = {};

    if (!email) errors.email = "Esse campo é obrigatório.";
    if (!senha) errors.senha = "Esse campo é obrigatório.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const resultado = await LoginVerificar(email, senha);
    if (resultado.status === 200) {
      window.location.href = "/home";
    } else {
      setFieldErrors({
        email: "error",
        senha: "error",
      });
      setAuthError("Email ou senha inválidos");
    }
  }

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
              Entrar
            </Heading>
            <form onSubmit={submit} className="flex flex-col gap-5 w-96">
              <div className="flex flex-col">
                <Input
                  name="email"
                  value={email}
                  onChange={(e) => InputChange("email", e.target.value)}
                  type="email"
                  label="Endereço de E-mail"
                  placeholder="Digite seu e-mail"
                  iconRight={<Mail />}
                  className={`w-full ${fieldErrors.email ? "border-red-500" : ""}`}
                />
                {fieldErrors.email && (
                  <label className="text-red-500 text-sm mt-1">
                    {authError || fieldErrors.email}
                  </label>
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  name="senha"
                  value={senha}
                  onChange={(e) => InputChange("senha", e.target.value)}
                  type="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  iconRight={<Lock />}
                  className={`w-full ${fieldErrors.senha ? "border-red-500" : ""}`}
                />
                {fieldErrors.senha && (
                  <label className="text-red-500 text-sm mt-1">
                    {authError || fieldErrors.senha}
                  </label>
                )}
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button type="submit" className="text-lg h-12 mt-2 w-full text-black">
                  Entrar
                </Button>
                <p className="text-gray-400">
                  Não tem uma conta?{" "}
                  <Link
                    className="text-yellow-500 hover:underline hover:text-yellow-600 no-underline"
                    to="/cadastrar"
                  >
                    Criar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}