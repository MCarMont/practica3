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
// Maquina(sModelo,iIdMaquina, sNombreMaquina, sDescMaquina, iPrecioAlquiler, dFechaCompra, iCompraMaq, sProv) 
$oMaq = json_decode($sMaq);

// Abrir conexion con la BD
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"SET NAMES 'utf8'");

mysqli_autocommit($conexion, FALSE);

$sql = "select idMaquina from maquinaria where idMaquina = '".$oMaq->iIdMaquina."' ";


$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$contador=mysqli_num_rows($resultados);

$error=false;

if($contador>0)
{
	$mensaje= 'YA EXISTE UNA MAQUINA CON ESE ID';
	$error = true;

}
else
{  
	$estado = 1;
		$sql = "INSERT INTO `maquinaria`(`modelo`, `idMaquina`, `nombreMaquina`, `descMaquina`, `precioAlquiler`, `fechaCompra`, `importeCompra`, `proveedor`,`estado`) VALUES ('".$oMaq->sModelo."','".$oMaq->iIdMaquina."','".$oMaq->sNombreMaquina."','".$oMaq->sDescMaquina."',".$oMaq->iPrecioAlquiler.",'".$oMaq->dFechaCompra."',".$oMaq->iCompraMaq.",'".$oMaq->sProv."'," .$estado.")";
//echo $sql; 
		$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

		if (!$resultados) {
			$mensaje='ERROR AL INSERTAR LA MAQUINA';
			$error = true;
		}
	

		if (!$error){
			$mensaje='INSERTADO CON EXITO';
			mysqli_commit($conexion);
			
		}
		else{
			mysqli_rollback($conexion);
		}
	}

// Formateo la respuesa como un array JSON
$respuesta = array($error,$mensaje);

echo json_encode($respuesta); 

mysqli_close($conexion);

?> 