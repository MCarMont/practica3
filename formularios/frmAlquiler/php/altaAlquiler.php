<?php
// Va a devolver una respuesta JSON que no se debe cachear 
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');


$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$sAlquiler=$_REQUEST['datos'];

$oAlquiler = json_decode($sAlquiler);

// Abrir conexion con la BD
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"SET NAMES 'utf8'");

mysqli_autocommit($conexion, FALSE);

$sql = "select idAlquiler from alquiler where idAlquiler = '".$oAlquiler->idAlquiler."' ";

$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$contador=mysqli_num_rows($resultados);

$error=false;

if($contador>0)
{
	$mensaje= 'YA EXISTE UN ALQUILER CON ESE ID';
	$error = true;

}
else
{
	$estado = 1;
		$sql = "INSERT INTO `alquiler`(`idAlquiler`, `fechaInicio`, `fechaFinal`, `importe`, `dniCliente`, `dniEmpleado`,`estado`) VALUES ('".$oAlquiler->idAlquiler."','".$oAlquiler->fechaInicio."','".$oAlquiler->fechaFinal."',".$oAlquiler->importe.",'".$oAlquiler->dniCliente."','".$oAlquiler->dniEmpleado."',".$estado.")";
		$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
		//echo $sql;
		if (!$resultados) {
			$mensaje='ERROR AL INSERTAR ALQUILER';
			$error = true;
		}
	
	if (!$error){

		foreach ($oAlquiler->arrayMaquinas as $indice => $maquina) {
		$sql = "SELECT `unidades` FROM `lineasalquiler` WHERE `idAlquiler`='".$oAlquiler->idAlquiler."' AND `idMaquina`='".$maquina."';";
		$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

		if(mysqli_num_rows($resultados)==0 && !$error){

			$sql = "INSERT INTO `lineasalquiler`(`idAlquiler`, `idMaquina`, `unidades`) VALUES ('".$oAlquiler->idAlquiler."','".$maquina."',1)";

			$resultados = mysqli_query($conexion, $sql ) or die(mysqli_error($conexion));

			if (!$resultados) {
				$mensaje='ERROR AL INSERTAR FILA DE ALQUILER';
				$error = true;
			}
		}
		else{
			$fila=mysqli_fetch_array($resultados, MYSQLI_ASSOC);
			$sql = "UPDATE `lineasalquiler` SET `unidades` = ".($fila['unidades'] + 1)." WHERE `idAlquiler`='".$oAlquiler->idAlquiler."' AND `idMaquina`='".$maquina."';";

			$resultados = mysqli_query($conexion, $sql ) or die(mysqli_error($conexion));

			if (!$resultados) {
				$mensaje='ERROR AL ACTUALIZAR FILA DE ALQUILER';
				$error = true;
			}

		}
	}
		

		if (!$error){
			$mensaje='INSERTADO CON EXITO';
			mysqli_commit($conexion);
			
		}
		else{
			mysqli_rollback($conexion);
		}
	}
		
}

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysqli_close($conexion);

?> 