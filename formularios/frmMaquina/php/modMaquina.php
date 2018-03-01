<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sEmpleado=$_REQUEST['datos'];

$oMaq = json_decode($sEmpleado);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select idMaquina from maquinaria where idMaquina = '".$oMaq->iIdMaquina."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador==1){
	$mensaje='Maquina Actualizada';
	$error = false;
	// Inserto el registro
	$sql ="UPDATE `maquinaria` SET `modelo`='".$oMaq->sModelo."',`nombreMaquina`='".$oMaq->sNombreMaquina."',`descMaquina`='".$oMaq->sDescMaquina."',`precioAlquiler`='".$oMaq->iPrecioAlquiler."',`fechaCompra`='".$oMaq->dFechaCompra."',`importeCompra`=".$oMaq->iCompraMaq.",`proveedor`='".$oMaq->sProv."' ,`estado`=".$oMaq->estado." WHERE `idMaquina`='".$oMaq->iIdMaquina."';" ;
//echo $sql;
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