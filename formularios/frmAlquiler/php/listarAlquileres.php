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
$sql = "select * from alquiler";

$resultado = mysql_query($sql, $conexion) or die(mysql_error());

/*$sXML = '<?xml version="1.0" encoding="UTF-8"?>';
$sXML .= '<alquileres>';

while ( $fila = mysql_fetch_array($resultado)){
    $sXML .= '<alquiler>';
        $sXML .= '<id>'.$fila["idAlquiler"].'</id>';
        $sXML .= '<fechaInicio>'.$fila["fechaInicio"].'</fechaInicio>';
        $sXML .= '<fechaFinal>'.$fila["fechaFinal"].'</fechaFinal>';;
        $sXML .= '<importe>'.$fila["importe"].'</importe>';
        $sXML .= '<dniCliente>'.$fila["dniCliente"].'</dniCliente>';
        $sXML .= '<dniEmpleado>'.$fila["dniEmpleado"].'</dniEmpleado>';
        $sXML .= '<estado>'.$fila["estado"].'</estado>';
    $sXML .= '</alquiler>';
}
$sXML .= '</alquileres>';
mysql_close($conexion);

header("Content-Type: text/xml");

echo $sXML;*/

   $sTabla = '<table class="table table-bordered table-striped table-hover">';
    //$sTabla .= '<thead class="thead-dark"><tr>';
    /*$sTabla .= '<th>ID</th><th>Fecha Inicio</th><th>Fecha Final</th>';
    $sTabla .= '<th>Importe</th><th>Cliente</th><th>Empleado</th><th>Estado</th></tr></thead>';*/
    $sTabla .= '<tbody>';

while ( $fila = mysql_fetch_array($resultado))
{
    $sTabla .= '<thead class="thead-dark"><tr>';
    $sTabla .= '<th>ID</th><th>Fecha Inicio</th><th>Fecha Final</th>';
    $sTabla .= '<th>Importe</th><th>Cliente</th><th>Empleado</th><th>Estado</th></tr></thead>';
    $sTabla .= "<tr class='datos'>";
    $sTabla .= "<td class='".$fila["idAlquiler"]."'>".$fila["idAlquiler"]."</td>";
    $sTabla .= '<td>'.$fila["fechaInicio"].'</td>';
    $sTabla .= '<td>'.$fila["fechaFinal"].'</td>';;
    $sTabla .= '<td>'.$fila["importe"].'</td>';
    $sTabla .= '<td>'.$fila["dniCliente"].'</td>';
    $sTabla .= '<td>'.$fila["dniEmpleado"].'</td>';
    $sTabla .= "<td class='estado' data-estatus='".$fila['estado']."'' >".$fila['estado']."</td>";
    $sTabla .= '</tr>';

    $sql2 = "select * from lineasalquiler where idAlquiler='".$fila["idAlquiler"]."'";
    //echo $sql2;

    $resultado2 = mysql_query($sql2, $conexion) or die(mysql_error());

    while ($fila2 = mysql_fetch_array($resultado2))
    {
        $sTabla .= "<tr  class='table-active lineas'>";
        $sTabla .= '<td colspan="4">ID Máquina</td>';
        $sTabla .= '<td colspan="3">Unidades</td>';
        $sTabla .= "</tr>";
        $sTabla .= "<tr>";
        $sTabla .= '<td  colspan="4">'.$fila2["idMaquina"].'</td>';
        $sTabla .= '<td colspan="3">'.$fila2["unidades"].'</td>';
        $sTabla .= '</tr>';
    }
}
$sTabla .= '</tbody></table>';
mysql_close($conexion);

header("Content-Type: text/html");

echo $sTabla;
?>