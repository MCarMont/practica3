<?php

$servidor  = "localhost";
$basedatos = "maquinaria";
$usuario   = "root";
$password  = "";

$buscar=$_GET['buscar'];
//$buscar="";
// Creamos la conexión al servidor.
$conexion = mysql_connect($servidor, $usuario, $password) or die(mysql_error());
mysql_query("SET NAMES 'utf8'", $conexion);

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos, $conexion) or die(mysql_error());

// Consulta SQL para obtener los datos de los propietarios
$sql = "SELECT lineasalquiler.*, maquinaria.* FROM `lineasalquiler`,`maquinaria` WHERE `idAlquiler` = '".$_GET['buscar']."' AND lineasalquiler.idMaquina = maquinaria.idMaquina";

$resultados = mysql_query($sql, $conexion) or die(mysql_error());
// $contador=mysql_num_rows($resultados);
$optionsDelSelect="";

while ($fila = mysql_fetch_array($resultados, MYSQL_ASSOC)) {
    // Almacenamos en un array cada una de las filas que vamos leyendo del recordset.
    //print_r($fila);
    for ($i=0; $i < $fila['unidades']  ; $i++) { 
    	$optionsDelSelect .= "<option data-precio=".$fila['precioAlquiler']." value=".$fila['idMaquina'].">".$fila['idMaquina']." - ".$fila['modelo']." - ".$fila['nombreMaquina']."</option>";
    }    
}

echo $optionsDelSelect; 

// función de PHP que convierte a formato JSON el array.


mysql_close($conexion);

?> 