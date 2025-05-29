<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once __DIR__ . "/../controller/profileController.php";
$profileController = new ProfileController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_GET["acao"]) {
        case 'perfil':
            if (!isset($_COOKIE["id_usuario"])) {
                echo json_encode(array("status" => 400, "message" => "Usuário não logado"));
                break;
            }
            $perfil = $profileController->BuscarPerfil($_COOKIE["id_usuario"]);
            if ($perfil !== false) {
                echo json_encode(array(
                    "status" => 200,
                    "message" => "Dados do perfil encontrado!",
                    "nome" => $perfil["nome"],
                    "email" => $perfil["email"],
                    "cpf" => $perfil["cpf"],
                    "data_nascimento" => $perfil["data_nascimento"]
                ));
            } else {
                echo json_encode(array("status" => 404, "message" => "Usuário não encontrado"));
            }
            break;

        case 'mudarPerfil':
            $valores = json_decode(file_get_contents("php://input"), true);
            $nome = $valores["nome"];
            $email = $valores["email"];
            $mudarPerfil = $profileController->MudarPerfil($nome, $email, $_COOKIE["id_usuario"]);
            if (!isset($_COOKIE["id_usuario"])) {
                echo json_encode(array("status" => 400, "message" => "Usuário não logado"));
                break;
            }

            if ($mudarPerfil) {
                echo json_encode(array("status" => 200, "message" => "Nome e E-mail editados com sucesso!"));
            } else {
                echo json_encode(array("status" => 400, "message" => "Erro ao editar!"));
            }
            break;

        default:
            echo json_encode(array("status" => 400, "message" => "Ação não encontrada"));
            break;
    }
}
?>