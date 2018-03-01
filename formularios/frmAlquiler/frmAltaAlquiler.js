var oBtnAnadirAlquiler1 = document.frmAltaAlquiler.btnAltaAlquiler;
oBtnAnadirAlquiler1.addEventListener("click", anadirAlquiler, false);

var oBtnAnadirAlquiler2 = $('#menuAlquileres a[name="Alta"]')[0];
oBtnAnadirAlquiler2.addEventListener("click", cargainicialAltaAlquiler, false);

var oBtnAnadirAlquiler3 = $('#frmAltaAlquiler #filtrar')[0];
oBtnAnadirAlquiler3.addEventListener("click", function(){cargarMaquinasDisponiblesParaAlquilar("frmAltaAlquiler")}, false);

var oBtnAnadirAlquiler4 = $('#frmAltaAlquiler button[name="anadirMaquina"]')[0];
oBtnAnadirAlquiler4.addEventListener("click", pasarMaquina, false);

var oBtnAnadirAlquiler5 = $('#frmAltaAlquiler button[name="quitarMaquina"]')[0];
oBtnAnadirAlquiler5.addEventListener("click", quitarMaquina, false);

$('#frmAltaAlquiler .comboCliente').keyup(function(){cargarComboClientes("frmAltaAlquiler")});
$('#frmAltaAlquiler .comboEmpleado').keyup(function(){cargarComboEmpleados("frmAltaAlquiler")});

cargainicialAltaAlquiler();

function cargainicialAltaAlquiler(){
	
	$(document).ready(function(){	
		$("#frmAltaAlquiler #txtFechaIniAlquiler" ).datepicker({ dateFormat: 'dd/mm/yy', minDate: new Date(), maxDate: "+1M +10D" });
		$("#frmAltaAlquiler #txtFechaIniAlquiler").on("change", function() {recalcularImporte()});
		var mañana = new Date();
		mañana.setDate(mañana.getDate() + 1);
		$("#frmAltaAlquiler #txtFechaFinAlquiler" ).datepicker({ dateFormat: 'dd/mm/yy', minDate: mañana, maxDate: "+3M +10D" });
		$("#frmAltaAlquiler #txtFechaFinAlquiler").on("change", function() {recalcularImporte()});
		cargarMaquinasDisponiblesParaAlquilar("frmAltaAlquiler");
	});
}

function pasarMaquina(){
	$("#frmAltaAlquiler #maquinasDisponibles option").each(function(indice,option){
		//var yaPasado=false;
		if(option.selected){
			// $("#frmAltaAlquiler #maquinasSeleccionadas option").each(function(indice2,option2){
			// 	if(option.value==option2.value)
			// 		yaPasado=true;
			// });
			// if(!yaPasado){
				$("#frmAltaAlquiler #maquinasSeleccionadas").prepend($(option).clone());
			// }
		}
	});
	recalcularImporte();
}

function quitarMaquina(){
	$("#frmAltaAlquiler #maquinasSeleccionadas option").each(function(indice,option){
		if(option.selected)
			$(option).remove();
	});
	recalcularImporte();
}


function recalcularImporte(){
	var importeTotal=0;
	var fechaInicio = $('#txtFechaIniAlquiler').datepicker("getDate");
	var fechaFin = $('#txtFechaFinAlquiler').datepicker("getDate");

	if(fechaInicio!=null && fechaFin!=null){
		fechaInicio = fechaInicio.getTime();
		fechaFin = fechaFin.getTime();

		$("#frmAltaAlquiler #maquinasSeleccionadas option").each(function(indice,option){
			importeTotal+=parseInt(option.dataset.precio);
			//alert(importeTotal);
		});

		var msecPerMinute = 1000 * 60;
		var msecPerHour = msecPerMinute * 60;
		var msecPerDay = msecPerHour * 24;


		var interval = fechaFin-fechaInicio;

		var numDias = Math.floor(interval / msecPerDay );
		if (numDias == 0)
		    numDias=1;
		var importeTotal = importeTotal * numDias;

		$('#txtImporteAlquiler').val(importeTotal);
	}
}


function anadirAlquiler(){
	var formulario = document.frmAltaAlquiler;
	if(validarAlquiler(formulario)){

		var idAlquiler = formulario.txtIDAlquiler.value.trim();
		var fechaAlquiler = $('#txtFechaIniAlquiler').datepicker("getDate");
		var fechaAlquilerFin = $('#txtFechaFinAlquiler').datepicker("getDate");
		var importeAlquiler = parseFloat(formulario.txtImporteAlquiler.value.trim());
		var dniCliente = formulario.cliente.value.substring(0,9);
		var dniEmpleado = formulario.empleado.value.substring(0,9);
		var arrayMaquinas = new Array();

		$("#frmAltaAlquiler #maquinasSeleccionadas option").each(function(indice,option){
			arrayMaquinas.push(option.value);
		});

		var oAlquiler = new Alquiler(idAlquiler,fechaAlquiler, fechaAlquilerFin, importeAlquiler, dniCliente, arrayMaquinas, dniEmpleado) ;

		var sDatos = "datos=" + JSON.stringify(oAlquiler);

    	$.post("formularios/frmAlquiler/php/altaAlquiler.php", sDatos, respuestaAltaAlquiler, 'json');
    	 // oDatosDevueltos[0]  --- si hay o no error
	}
}

function respuestaAltaAlquiler(oDatosDevueltos, sStatus, oAjax){
	 if (oDatosDevueltos[0] == false) {
		        // Mensaje
		sMensaje = oDatosDevueltos[1];
		mostrarMensaje(sMensaje, true);
		$('#frmAltaAlquiler')[0].reset();
		$('#frmAltaAlquiler #maquinasSeleccionadas').find('option').remove()
	 } 
	 else{
		sMensaje = oDatosDevueltos[1];
		mostrarMensaje(sMensaje, false);
	 }

}

// /*************************AJAX CARGA MAQUINAS*************************/

// function cargarMaquinasDisponiblesParaAlquilar(){
// 	sMensaje = "Cargando Datos.";
//     mostrarMensaje(sMensaje, false);

// 	var filtro = $('#frmAltaAlquiler #filtrarMaquinasDisponibles').val();
	
// 	sDatos="buscar="+filtro+"&estado=1";

// 	$.get( "formularios/frmAlquiler/php/getMaquinas.php", sDatos ,respuestaCargarMaquinas);

// }

// function respuestaCargarMaquinas(oDatosDevueltos, sStatus, oAjax) {
// 	if(oDatosDevueltos!=null)
// 		$("#maquinasDisponibles").html(oDatosDevueltos);
// 	else{
// 		sMensaje = "No hay máquinas disponibles";
//       	mostrarMensaje(sMensaje, false);
// 	}

// }

