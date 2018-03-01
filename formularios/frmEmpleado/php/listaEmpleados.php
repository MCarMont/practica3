<?php

header('Content-Type: application/json');
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
$sql = "select * from empleado";

$resultado = mysql_query($sql, $conexion) or die(mysql_error());

/*$sXML = '<?xml version="1.0" encoding="UTF-8"?>';
$sXML .= '<empleados>';

while ( $fila = mysql_fetch_array($resultado)){
    $sXML .= '<empleado>';
    $sXML .= '<id>'.$fila["dniEmpleado"].'</id>';
    $sXML .= '<nombre>'.$fila["nombreEmpleado"].'</nombre>';
    $sXML .= '<apellidos>'.$fila["apellidoEmpleado"].'</apellidos>';;
    $sXML .= '<tel>'.$fila["telEmpleado"].'</tel>';
    $sXML .= '<dir>'.$fila["dirEmpleado"].'</dir>';
    $sXML .= '<loc>'.$fila["localidadEmpleado"].'</loc>';
    $sXML .= '<cp>'.$fila["cpEmpleado"].'</cp>';
    $sXML .= '<estado>'.$fila["estado"].'</estado>';
    $sXML .= '</empleado>';
}
$sXML .= '</empleados>';
mysql_close($conexion);

header("Content-Type: text/xml");

echo $sXML;*/

    $sTabla = '<table class="table table-bordered table-striped table-hover">';
    $sTabla .= '<thead class="thead-dark"><tr>';
    $sTabla .= '<th>DNI</th><th>Nombre</th><th>Apellidos</th>';
    $sTabla .= '<th>Teléfono</th><th>Dirección</th><th>Localidad</th><th>C.P.</th><th>Estado</th></tr></thead>';
    $sTabla .= '<tbody>';

while ( $fila = mysql_fetch_array($resultado))
{
    $sTabla .= "<tr>";
    $sTabla .= '<td>'.$fila["dniEmpleado"].'</td>';
    $sTabla .= '<td>'.$fila["nombreEmpleado"].'</td>';
    $sTabla .= '<td>'.$fila["apellidoEmpleado"].'</td>';;
    $sTabla .= '<td>'.$fila["telEmpleado"].'</td>';
    $sTabla .= '<td>'.$fila["dirEmpleado"].'</td>';
    $sTabla .= '<td>'.$fila["localidadEmpleado"].'</td>';
    $sTabla .= '<td>'.$fila["cpEmpleado"].'</td>';
    $sTabla .= "<td class='estado' data-estatus='".$fila['estado']."'' >".$fila['estado']."</td>";
    $sTabla .= '</tr>';
}
$sTabla .= '</tbody></table>';
mysql_close($conexion);

header("Content-Type: text/html");

echo $sTabla;

?>