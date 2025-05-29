<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
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

            case 'transacao':
                $valores = json_decode(file_get_contents("php://input"), true);
                if (empty($valores)) {
                    echo json_encode(array("status" => 400, "message" => "Nenhum dado recebido"));
                    break;
                }
                // $valores = json_decode($input, true);
                if ($valores === null) {
                    echo json_encode(array("status" => 400, "message" => "JSON inválido"));
                    break;
                }
                if (!isset($valores["metodoPagamento"]) || !isset($valores["valor"]) || !isset($valores["estado"])) {
                    echo json_encode(array("status" => 400, "message" => "Dados incompletos"));
                    break;
                }
                $metodoPagamento = $valores["metodoPagamento"];
                $valor = $valores["valor"];
                $estado = $valores["estado"];
                if (!isset($_COOKIE["id_usuario"])) {
                    echo json_encode(array("status" => 400, "message" => "Usuário não logado"));
                    break;
                }
                $transacao = $transactionsController->Transacao($metodoPagamento, $_COOKIE["id_usuario"], $valor, $estado);
                if ($transacao) {
                    echo json_encode(array("status" => 200, "message" => "Transação realizada com sucesso!"));
                } else {
                    echo json_encode(array("status" => 400, "message" => "Erro ao realizar transação!"));
                }
                break;
        default:
            echo "Não achei";
            break;
    }
}
?>