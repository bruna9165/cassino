export async function Cadastro(nome: string, email: string, cpf: string, data_nascimento: string, senha : string) {
    try {
        const resposta = await fetch("http://localhost/cassino/backend/router/userRouter.php?acao=cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, cpf, data_nascimento, senha })
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
            body: JSON.stringify({ email, senha })
        });
       
        const dados = await resposta.json();
        console.log(dados.status)
        return dados;
    } catch (error) {
        console.error("Error in Logar:", error);
        throw error;
    }
}
