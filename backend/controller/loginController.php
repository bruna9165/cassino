<?php
include_once __DIR__ . "/../db/db.php";
class LoginController
{
    private $conn;

    public function __construct(){
        $database = new Bd();
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
                return true;
            }else{
                return false;
            }
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }
}
?>