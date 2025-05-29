<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/../controller/userController.php";
$userController = new UserController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_GET["acao"]) {
        case 'cadastrar':
            $valores = json_decode(file_get_contents("php://input"), true);
            $nome = $valores["nome"];
            $email = $valores["email"];
            $cpf = $valores["cpf"];
            $data_nascimento = $valores["data_nascimento"];
            $senha = $valores["senha"];
            $senha_hash = hash("sha256", $senha);
            $verificarEmail = $userController->BuscarEmail($email);
            $verificarCPF = $userController->BuscarCPF($cpf);
            if ($verificarEmail) {
                echo json_encode(array("status" => 500, "message" => "Email já cadastrado!"));
            }else if ($verificarCPF){
                echo json_encode(array("status" => 404, "message" => "CPF já cadastrado!"));
            } else {
                $resposta = $userController->CriarUsuario($nome, $email, $cpf, $data_nascimento, $senha_hash);
                if ($resposta) {
                    echo json_encode(array("status" => 200, "message" => "Usuário cadastrado com sucesso!"));
                } else {
                    echo json_encode(array("status" => 400, "message" => "Erro ao cadastrar usuário!"));
                }
            }
            break;
        default:
            echo "Não achei";
            break;
    }
}
?>