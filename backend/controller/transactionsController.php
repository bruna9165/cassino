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
    


    
}

?>