<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/../controller/transactionsController.php";
$transactionsController = new TransactionsController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_GET["acao"]) {
        case 'saldo':
            $valores = json_decode(file_get_contents("php://input"), true);
            if(!isset($_COOKIE["id_usuario"])) {
                echo json_encode(array("status" => 400, "message" => "Usuário não logado"));
                break;
            }
            $saldo = $transactionsController->BuscarSaldo($_COOKIE["id_usuario"]);
            if($saldo){
                echo json_encode(array("status" => 200, "message" => "Saldo encontrado!", "saldo" => $saldo[0]["saldo"]));
            } else {
                echo json_encode(array("status" => 404, "message" => "Erro ao buscar saldo!"));
            }
            break;
        default:
            echo "Não achei";
            break;
    }
}
?>