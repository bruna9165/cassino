export async function Cadastro(nome: string, email: string, cpf: string, data_nascimento: string, senha : string) {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/userRouter.php?acao=cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, cpf, data_nascimento, senha }),
            credentials: "include"
        });
       
        const dados = await resposta.json();
        
        console.log(dados.status)
        return dados;
    } catch (error) {
        console.error("Error in Cadastro:", error);
        throw error;
    }
}
export async function LoginVerificar(email: string, senha : string) {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/loginRouter.php?acao=validarLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha }),
            credentials: "include"
        });
       
        const dados = await resposta.json();
        console.log(dados.status)
        return dados;
    } catch (error) {
        console.error("Error in Logar:", error);
        throw error;
    }
}

  export async function BuscarSaldo() {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/transactionsRouter.php?acao=saldo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include" 
        });

        const dados = await resposta.json();
        console.log(dados.status);
        return dados;
    } catch (error) {
        console.error("Erro em saldo:", error);
        throw error;
    }
}
  export async function BuscarPerfil() {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/profileRouter.php?acao=perfil", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include" 
        });

        const dados = await resposta.json();
        console.log(dados.status);
        return dados;
    } catch (error) {
        console.error("Erro em perfil:", error);
        throw error;
    }
}

export async function MudarPerfil(nome: string, email: string) {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/profileRouter.php?acao=mudarPerfil", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email }),
            credentials: "include"
        });
       
        const dados = await resposta.json();
        
        console.log(dados.status)
        return dados;
    } catch (error) {
        console.error("Error in Editar:", error);
        throw error;
    }
}