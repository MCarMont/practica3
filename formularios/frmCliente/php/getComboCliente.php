<?php
// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 


$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$buscar=$_REQUEST['buscar'];

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los propietarios
$sql = "SELECT * FROM `cliente` WHERE `nombreCliente` like '%".$buscar."%' or `apellidoCliente` like '%".$buscar."%' or `dniCliente` like '%".$buscar."%'";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$datos=[];

while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    //print_r($fila);
    $datos[] = $fila;
}

// función de PHP que convierte a formato JSON el array.
echo json_encode($datos); 

mysql_close($conexion);

?> 