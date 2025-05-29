<?php
include_once __DIR__ . "/../db/db.php";

class TransactionsController{
    private $conn;
    public $table = "usuario";
    
    public function __construct()
    {
        $objDb = new Bd();
        $this->conn = $objDb->connect();

    }

    public function BuscarSaldo($id_usuario){
        try {
            $sql = "SELECT saldo FROM usuarios WHERE id_usuario = :id_usuario";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id_usuario", $id_usuario);
            $db->execute();
            $usuario = $db->fetchAll(PDO::FETCH_ASSOC);
            return $usuario;
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }

    public function Transacao($metodoPagamento, $id_usuario, $valor, $estado){
        try {
            $sql = "INSERT INTO transacoes (id_metodoPagamento, id_usuario, valor, estado) VALUES(:id_metodoPagamento, :id_usuario, :valor, :estado);";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id_metodoPagamento", $metodoPagamento);
            $db->bindParam(":id_usuario", $id_usuario);
            $db->bindParam(":valor", $valor);
            $db->bindParam(":estado", $estado);
            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Exception $th) {
            //throw $th;
        }
    }

    public function AtualizarSaldo($saldo, $id_usuario){
        try {
            $sql = "UPDATE usuarios SET saldo = :saldo WHERE id_usuario = :id_usuario";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":saldo", $saldo);
            $db->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Exception $th) {
            //throw $th;
        }
    }
}
?>