<?php
include_once __DIR__ . "/../db/db.php";

class ProfileController{
    private $conn;
    public $table = "usuarios";

    public function __construct()
    {
        $objDb = new Bd();
        $this->conn = $objDb->connect();
    }

    public function BuscarPerfil($id_usuario){
        try {
            $sql = "SELECT nome, email, cpf, data_nascimento FROM usuarios WHERE id_usuario = :id_usuario";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
            $db->execute();
            $usuario = $db->fetch(PDO::FETCH_ASSOC);
            return $usuario;
        } catch (\Exception $th) {
            return false;
        }
    }

    public function MudarPerfil($nome, $email, $id_usuario){
        try {
            $sql = "UPDATE usuarios SET nome = :nome, email = :email WHERE id_usuario = :id_usuario";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":nome", $nome);
            $db->bindParam(":email", $email);
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