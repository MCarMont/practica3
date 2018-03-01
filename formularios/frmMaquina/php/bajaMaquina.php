<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sMaq=$_REQUEST['datos'];

$oMaq = json_decode($sMaq);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select idMaquina from maquinaria where idMaquina = '".$oMaq->idMaquina."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador==1)
{
	$mensaje='Maquina dada de baja';
	$error = false;
	// Actualizo el registro
	$sql ="UPDATE `maquinaria` SET `estado`=0 WHERE `idMaquina`='".$oMaq->idMaquina."';" ;
	//print_r($sql);
	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
}
else
{
	$mensaje='Maquina No encontrada';
	$error = true;
}

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 