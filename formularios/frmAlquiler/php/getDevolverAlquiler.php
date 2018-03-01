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
$sql = "SELECT alquiler.* , alquiler.dniCliente, nombreCliente, apellidoCliente, alquiler.dniEmpleado, nombreEmpleado, apellidoEmpleado FROM `alquiler`,`empleado`,`cliente` WHERE alquiler.dniCliente = cliente.dniCliente AND alquiler.dniEmpleado = empleado.dniEmpleado AND `idAlquiler` = '".$buscar."'";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$Alquiler = mysql_fetch_array($resultados, MYSQL_ASSOC);

// función de PHP que convierte a formato JSON el array.
echo json_encode($Alquiler); 

mysql_close($conexion);

?> 