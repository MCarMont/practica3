<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sProveedor=$_REQUEST['datos'];

$oProveedor = json_decode($sProveedor);
//print_r($oProveedor);
// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select dniProv from Proveedor where dniProv = '".$oProveedor->dni."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador==1){
	$mensaje='Proveedor Actualizado';
	$error = false;
	// Inserto el registro
	$sql ="UPDATE `proveedor` SET `estado` = 0 WHERE `dniProv`='".$oProveedor->dni."';" ;
	//print_r($sql);
	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
}
	
else{
	$mensaje='Proveedor No encontrado';
	$error = true;
}


// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 