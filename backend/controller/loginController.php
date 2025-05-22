<?php

include_once __DIR__ . "/../db/db.php";
class LoginController
{
    private $conn; // Variável para armazenar a conexão com o banco de dados

    // Construtor da classe, inicializa a conexão com o banco de dados
    public function __construct(){
        // Cria uma instância da classe Database para obter a conexão
        $database = new Bd();
        // Armazena a conexão na variável $conn
        $this->conn = $database->connect();
    }
    public function ValidaLogin($email,$senha_hash){
        $sql = "SELECT * FROM usuarios WHERE email = :email AND senha_hash = :senha_hash";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":email",$email);
        $db->bindParam(":senha_hash",$senha_hash);
        $db->execute();
        $usuario = $db->fetchAll(PDO::FETCH_ASSOC);
        if($usuario){
            $_SESSION["id_usuario"] = $usuario[0]["id"];
            return true;
        }else{
            return false;
        }

    }

    public function BuscarLogin($email, $senha){
        try {
            $sql = "SELECT * FROM usuarios WHERE email = :email and senha_hash = :senha";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":email", $email);
            $db->bindParam(":senha", $senha);
            $db->execute();
            $user = $db->fetchAll(PDO::FETCH_ASSOC);
            if($user){

                 setcookie("id_usuario",$user[0]["id_usuario"] , [
                    'expires' => time() + 3600, // 1 hour
                    'path' => '/',
                    'domain' => $_SERVER['HTTP_HOST'],
                    'secure' => true,
                    'httponly' => true,
                 ]);
                // setcookie("user", "JohnDoe", time() + 3600, "/");
                return true;
            }else{
                return false;
            }
            
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }


    // Método responsável por realizar o login
    // public function Login($email, $senha){
    //     try {
    //         // Prepara a consulta SQL para verificar se o nome e a senha coincidem com um usuário no banco de dados
    //         $sql = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
    //         // Prepara a consulta SQL com a conexão do banco de dados
    //         $db = $this->conn->prepare($sql);
    //         // Vincula os parâmetros da consulta SQL com os valores fornecidos para nome e senha
    //         $db->bindParam(":email", $email);
    //         $db->bindParam(":senha", $senha);
    //         // Executa a consulta no banco de dados
    //         $db->execute();
    //         // Recupera os resultados da consulta (todos os usuários que atendem aos critérios)
    //         $usuario = $db->fetchAll(PDO::FETCH_ASSOC);

    //         // Verifica se um usuário foi encontrado com os dados fornecidos
    //         if ($usuario) {
    //             // Inicia a sessão para armazenar informações do usuário logado
    //             session_start();
    //             // Armazena o ID do usuário na sessão para uso posterior
    //             $_SESSION["id_usuario"] = $usuario[0]["id"];
    //             $_SESSION["nome"] = $usuario[0]["id"];
    //             // Retorna verdadeiro para indicar que o login foi bem-sucedido
    //             return true;
    //         } else {
    //             // Se o usuário não for encontrado, retorna falso indicando falha no login
    //             return false;
    //         }

    //     } catch (\Exception $e) {
    //         // Caso ocorra algum erro durante o processo, exibe uma mensagem de erro
    //         echo "Erro: " . $e->getMessage();
    //     }
    // }
}
?>