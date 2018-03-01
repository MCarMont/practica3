<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sCliente=$_REQUEST['datos'];

$oCliente = json_decode($sCliente);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select dniCliente from cliente where dniCliente = '".$oCliente->dniCliente."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador==1){
	$mensaje='Cliente Actualizado';
	$error = false;
	// Inserto el registro
	$sql ="UPDATE `cliente` SET `nombreCliente`='".$oCliente->nombreCliente."',`apellidoCliente`='".$oCliente->apellidoCliente."',`telCliente`=".$oCliente->telCliente.",`dirCliente`='".$oCliente->dirCliente."',`localidadCliente`='".$oCliente->localidadCliente."',`cpCliente`=".$oCliente->cpCliente.",`estado`=".$oCliente->estado." WHERE `dniCliente`='".$oCliente->dniCliente."';" ;
	//print_r($sql);
	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
}
	
else{
	$mensaje='Cliente No encontrado';
	$error = true;
}


// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 