<?php
$usuario = "root";
$password = "Solorzano84";
$servername = "18.217.173.77";
$dbname = "proyecto_lunes";
$conn = new mysqli($servername, $usuario, $password, $dbname);
mysqli_set_charset($conn,"utf8");
if($_POST["metodo"] == "select"){
    $sql = "select * from usuarios where usuario ='".$_POST["usuario"]."'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "traerProducto"){
    $sql = "select * from productos where idproductos =".$_POST["id"];
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo json_encode(mysqli_fetch_assoc($result));
    }else{
        echo "Error";
    }
}else if($_POST["metodo"] == "listar"){
    $sql = "select * from categorias";
    $categorias = array();
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($categorias, $row);
        }
        echo json_encode($categorias);
    }else{
        echo "Error";
    }
}else{
    if($_POST["metodo"] == "registro"){
        $sql = "insert into usuarios (nombre,apellidos,telefono,correo,
        direccion,usuario,password,rol) values ('"
        .$_POST["nombre"]."', '"
        .$_POST["apellidos"]."', '"
        .$_POST["telefono"]."', '"
        .$_POST["correo"]."', '"
        .$_POST["direccion"]."', '"
        .$_POST["usuario"]."', '"
        .$_POST["password"]."', '"
        .$_POST["rol"]."')";
    }else if($_POST["metodo"] == "editar"){
        $sql = "update usuarios set 
        nombre='".$_POST["nombre"]."',
        apellidos='".$_POST["apellidos"]."',
        telefono='".$_POST["telefono"]."',
        correo='".$_POST["correo"]."',
        direccion='".$_POST["direccion"]."',
        usuario='".$_POST["usuario"]."',
        password='".$_POST["password"]."' where idusuarios = ".$_POST["idusuarios"];
    }

    if($conn->query($sql) === TRUE){
        echo "Exito";
    }else{
        echo "Error";
    }

}

$conn->close();
?>