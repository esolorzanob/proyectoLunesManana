<?php
$usuario = "root";
$password = "Solorzano84";
$servername = "18.219.254.158";
$dbname = "proyecto_lunes_noche";
$conn = new mysqli($servername, $usuario, $password, $dbname);
mysqli_set_charset($conn,"utf8");
if(isset($_POST["metodo"]) && $_POST["metodo"] == "select"){
    
}else if(isset($_POST["metodo"]) && $_POST["metodo"] == "listar"){
   
}else{
    $sql = "insert into Pedidos (fecha, idUsuarios, total, estado) values(
        '".$_POST["fecha"]."',
        ".$_POST["idUsuarios"].",
        '".$_POST["total"]."',
        'Pendiente'
    )";
    if($conn->query($sql) === TRUE){
        $last_id = $conn->insert_id;
    }else{
        die('Error al guardar Pedido');
    }
    
    $producto = current($_POST["idProductos"]);
    while($producto){
        $sql = "insert into pedido_has_productos (idProductos, idPedido)
        values (".$producto.",".$last_id.")";
        if($conn->query($sql) === TRUE){
            $error = false;
        }else{
            die('Error al guardar Pedido');
        }
        $producto = next($_POST["idProductos"]);
    }
    echo "Pedido procesado con éxito";
}

$conn->close();
?>