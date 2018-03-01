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
$conexion = mysqli_connect($servidor, $usuario, $password, $basedatos);
mysqli_set_charset($conexion,"SET NAMES 'utf8'");

mysqli_autocommit($conexion, FALSE);

$error=false;
// Consulta SQL para borrar
$sql = "DELETE FROM `lineasalquiler` WHERE `idAlquiler` = '".$oAlquiler->idAlquiler."'";
// echo $sql;
$resultados = mysqli_query($conexion, $sql);
	
if (!$resultados) {
	$mensaje='FALLO AL BORRAR LAS LINEAS DE ALQUILER';
	$error = true;
}
else{
	$sql = "UPDATE `alquiler` SET `fechaInicio`='".$oAlquiler->fechaInicio."',`fechaFinal`='".$oAlquiler->fechaFinal."',`importe`=".$oAlquiler->importe.",`dniCliente`='".$oAlquiler->dniCliente."',`dniEmpleado`='".$oAlquiler->dniEmpleado."',`estado`=".$oAlquiler->estado." WHERE `idAlquiler` = '".$oAlquiler->idAlquiler."'";

	$resultados = mysqli_query($conexion, $sql);

	if (!$resultados) {
	$mensaje='FALLO AL ACTUALIZAR EL ALQUILER';
	$error = true;
	}
	else{

		foreach ($oAlquiler->arrayMaquinas as $indice => $maquina) {
		$sql = "SELECT `unidades` FROM `lineasalquiler` WHERE `idAlquiler`='".$oAlquiler->idAlquiler."' AND `idMaquina`='".$maquina."';";
		$resultados = mysqli_query($conexion, $sql);

		if(mysqli_num_rows($resultados)==0 && !$error){

			$sql = "INSERT INTO `lineasalquiler`(`idAlquiler`, `idMaquina`, `unidades`) VALUES ('".$oAlquiler->idAlquiler."','".$maquina."',1)";

			$resultados = mysqli_query($conexion, $sql );

			if (!$resultados) {
				$mensaje='ERROR AL INSERTAR FILA DE ALQUILER';
				$error = true;
			}
		}
		else{
			$fila=mysqli_fetch_array($resultados, MYSQLI_ASSOC);
			$sql = "UPDATE `lineasalquiler` SET `unidades` = ".($fila['unidades'] + 1)." WHERE `idAlquiler`='".$oAlquiler->idAlquiler."' AND `idMaquina`='".$maquina."';";

			$resultados = mysqli_query($conexion, $sql);

			if (!$resultados) {
				$mensaje='ERROR AL ACTUALIZAR FILA DE ALQUILER';
				$error = true;
			}

		}
	}

	}
}

if (!$error) {
	mysqli_commit($conexion);
	$mensaje="ALQUILER ACTUALIZADO";
}
else {
	mysqli_rollback($conexion);
	$mensaje="HA OCURRIDO UN ERROR INESPERADO";
}

$respuesta = array($error,$mensaje);

echo json_encode($respuesta);

mysqli_close($conexion);

?> 