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


$sql = "select dniEmpleado from empleado where dniEmpleado = '".$oEmpleado->dniEmpleado."' ";


$resultados = mysql_query($sql, $conexion) or die(mysql_error());

$contador=mysql_num_rows($resultados);

if($contador>0)
{
	$mensaje= 'YA EXISTE ESE EMPLEADO';
	$error = true;

}
else
{
	$mensaje='INSERTADO CON EXITO';
	$error = false;
	$estado = 1;
	// Inserto el registro
	$sql = "insert into empleado (dniEmpleado,nombreEmpleado,apellidoEmpleado,telEmpleado,dirEmpleado,localidadEmpleado,cpEmpleado,estado) VALUES ('$oEmpleado->dniEmpleado','$oEmpleado->nombreEmpleado','$oEmpleado->apellidoEmpleado',$oEmpleado->telEmpleado,'$oEmpleado->dirEmpleado','$oEmpleado->localidadEmpleado',$oEmpleado->cpEmpleado,".$estado.")";
	//echo $sql;
	//print_r($sql);

	$resultados = @mysql_query($sql, $conexion) or die(mysql_error());
		
}

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysql_close($conexion);

?> 