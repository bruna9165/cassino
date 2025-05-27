<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/../controller/loginController.php";
$loginController = new LoginController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_GET["acao"]) {
            case 'validarLogin':
                $valores = json_decode(file_get_contents("php://input"), true);
                $email = $valores["email"];
                $senha = $valores["senha"];
                $senha_hash = hash("sha256", $senha);
                $resultado = $loginController->BuscarLogin($email, $senha_hash);
                if ($resultado) {
                    echo json_encode(array("status" => 200, "message" => "Login realizado com sucesso!"));
                } else {
                    echo json_encode(array("status" => 400, "message" => "Erro ao realizar login!"));
                }
                break;
        default:
            echo "Não achei";
            break;
    }
}
?>