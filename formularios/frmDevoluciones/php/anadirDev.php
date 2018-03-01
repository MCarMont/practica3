<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sDev=$_POST['datos'];

$oDev = json_decode($sDev);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Inserto el registro
$sql = "insert into devolucion (idAlquiler,fechaDevolucion,sMotivo,empleado) VALUES ('".$oDev->idAlquiler."','".$oDev->fechaDevolucion."','".$oDev->sMotivo."','".$oDev->empleado."')";
//print_r($sql);
if(@mysql_query($sql, $conexion))
{	
	$sql = "UPDATE `alquiler` SET `estado`=0 WHERE `idAlquiler` ='".$oDev->idAlquiler."';";
	if(@mysql_query($sql, $conexion))
	{
		$mensaje='INSERTADO CON EXITO';
		$error = false;
	}
	else
	{
		$mensaje= 'Fallo al cambiar el estado del alquiler';
		$error = true;
	}
}
else
{
	$mensaje= 'El Alquiler o el empleado no existe en la base de datos.';
	$error = true;
}

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 