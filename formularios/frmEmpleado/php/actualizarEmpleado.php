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

$oEmpleado = json_decode($sEmpleado);

// Abrir conexion con la BD
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

mysql_select_db($basedatos, $conexion) or die(mysql_error());


$sql = "select dniEmpleado from Empleado where dniEmpleado = '".$oEmpleado->dniEmpleado."' ";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador==1){
	$mensaje='Empleado Actualizado';
	$error = false;
	// Inserto el registro
	$sql ="UPDATE `Empleado` SET `nombreEmpleado`='".$oEmpleado->nombreEmpleado."',`apellidoEmpleado`='".$oEmpleado->apellidoEmpleado."',`telEmpleado`=".$oEmpleado->telEmpleado.",`dirEmpleado`='".$oEmpleado->dirEmpleado."',`localidadEmpleado`='".$oEmpleado->localidadEmpleado."',`cpEmpleado`=".$oEmpleado->cpEmpleado.",`estado`=".$oEmpleado->estado." WHERE `dniEmpleado`='".$oEmpleado->dniEmpleado."';" ;
	//print_r($sql);
	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
}
	
else{
	$mensaje='Empleado No encontrado';
	$error = true;
}


// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 