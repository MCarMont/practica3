<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para insertar en la bbdd
$sql = "select * from `devolucion`";
//echo $sql;
$resultado = mysql_query($sql, $conexion) or die(mysql_error());

$sXML = '<?xml version="1.0" encoding="UTF-8"?>';
$sXML .= '<devoluciones>';

while ( $fila = mysql_fetch_array($resultado)){
    $sXML .= '<devolucion>';
    $sXML .= '<idDevolucion>'.$fila["idDevolucion"].'</idDevolucion>';
    $sXML .= '<idAlquiler>'.$fila["idAlquiler"].'</idAlquiler>';
    $sXML .= '<fechaDevolucion>'.$fila["fechaDevolucion"].'</fechaDevolucion>';;
    $sXML .= '<sMotivo>'.$fila["sMotivo"].'</sMotivo>';
    $sXML .= '<empleado>'.$fila["empleado"].'</empleado>';
    $sXML .= '</devolucion>';
}
$sXML .= '</devoluciones>';
mysql_close($conexion);

header("Content-Type: text/xml");

echo $sXML;

?>